"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Controller, useForm, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { submitApplication } from "@/app/apply/actions";
import { buttonStyles } from "@/components/ui/button";
import {
  CheckboxField,
  ChipGroup,
  Field,
  OptionList,
  TextArea,
  TextInput,
} from "@/components/apply/fields";
import { trackEvent } from "@/lib/analytics";
import {
  BUSINESS_TYPES,
  COLLABORATION_FREQUENCIES,
  COMPLIMENTARY_ANSWERS,
  CONTENT_TYPES,
  LOCATIONS,
  PRIMARY_PLATFORMS,
} from "@/lib/constants";
import {
  FORM_STEPS,
  applicationDefaults,
  applicationSchema,
  type ApplicationFormValues,
  type ApplicationInput,
} from "@/lib/validation/creator";

const DRAFT_KEY = "dl.application.draft.v1";

type Banner = { tone: "error" | "info"; message: string } | null;

export function ApplicationForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [banner, setBanner] = useState<Banner>(null);
  const startedRef = useRef(false);
  const topRef = useRef<HTMLDivElement>(null);

  const {
    control,
    register,
    handleSubmit,
    trigger,
    reset,
    getValues,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationFormValues, unknown, ApplicationInput>({
    resolver: zodResolver(applicationSchema),
    defaultValues: applicationDefaults,
    mode: "onTouched",
  });

  const location = watch("location");

  /** Restore an unfinished draft so a refresh or a lost connection costs nothing. */
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(DRAFT_KEY);
      if (!saved) return;
      const parsed = JSON.parse(saved) as Partial<ApplicationFormValues>;
      reset({ ...applicationDefaults, ...parsed }, { keepDefaultValues: true });
    } catch {
      // A corrupt draft is not worth surfacing.
    }
  }, [reset]);

  useEffect(() => {
    const subscription = watch((values) => {
      try {
        window.localStorage.setItem(DRAFT_KEY, JSON.stringify(values));
      } catch {
        // Storage full or blocked — the form still works.
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const markStarted = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent("application_started");
  }, []);

  /**
   * Reads the live form value rather than the value captured at render, so a
   * burst of taps can't drop a selection.
   */
  const toggleValue = useCallback(
    (name: "contentTypes" | "preferredBusinessTypes", option: string) => {
      const current = (getValues(name) ?? []) as string[];
      return current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option];
    },
    [getValues],
  );

  const goToStep = useCallback((next: number) => {
    setStep(next);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleNext = async () => {
    const fields = FORM_STEPS[step].fields as readonly FieldPath<ApplicationFormValues>[];
    const valid = await trigger(fields as FieldPath<ApplicationFormValues>[], {
      shouldFocus: true,
    });
    if (!valid) return;
    setBanner(null);
    goToStep(Math.min(step + 1, FORM_STEPS.length - 1));
  };

  const onSubmit = handleSubmit(async (values) => {
    setBanner(null);

    let result;
    try {
      result = await submitApplication(values);
    } catch (error) {
      console.error("[apply] submission failed", error);
      setBanner({
        tone: "error",
        message:
          "Something went wrong while submitting your application. Please try again.",
      });
      return;
    }

    if (result.status === "ok") {
      trackEvent("application_submitted");
      try {
        window.localStorage.removeItem(DRAFT_KEY);
      } catch {
        // Ignore.
      }
      router.push("/success");
      return;
    }

    if (result.status === "invalid") {
      let firstStep = FORM_STEPS.length - 1;
      for (const [field, message] of Object.entries(result.fieldErrors)) {
        setError(field as FieldPath<ApplicationFormValues>, { message });
        const index = FORM_STEPS.findIndex((formStep) =>
          (formStep.fields as readonly string[]).includes(field),
        );
        if (index >= 0) firstStep = Math.min(firstStep, index);
      }
      goToStep(firstStep);
      setBanner({ tone: "error", message: result.message });
      return;
    }

    setBanner({
      tone: result.status === "duplicate" ? "info" : "error",
      message: result.message,
    });
  });

  /** Steps stay mounted so nothing is lost when moving back and forth. */
  const stepClass = (index: number) =>
    index === step ? "flex flex-col gap-6" : "hidden";

  const isLastStep = step === FORM_STEPS.length - 1;
  const progress = ((step + 1) / FORM_STEPS.length) * 100;

  return (
    <div ref={topRef} className="scroll-mt-24">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm">
          <p className="font-medium">{FORM_STEPS[step].title}</p>
          <p className="text-ink-muted">
            Step {step + 1} of {FORM_STEPS.length}
          </p>
        </div>
        <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-accent-deep transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {banner ? (
        <div
          role="alert"
          className={`mb-6 rounded-xl border px-4 py-3.5 text-[0.95rem] ${
            banner.tone === "error"
              ? "border-danger/30 bg-danger-soft text-danger"
              : "border-line-strong bg-paper-deep text-ink"
          }`}
        >
          {banner.message}
        </div>
      ) : null}

      <form onSubmit={onSubmit} onFocusCapture={markStarted} noValidate>
        {/* ------------------------------------------------ Step 1: About you */}
        <fieldset className={stepClass(0)}>
          <Field label="Full name" htmlFor="fullName" error={errors.fullName?.message}>
            <TextInput
              id="fullName"
              autoComplete="name"
              placeholder="Alex Morgan"
              aria-invalid={Boolean(errors.fullName)}
              {...register("fullName")}
            />
          </Field>

          <Field label="Email" htmlFor="email" error={errors.email?.message}>
            <TextInput
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@email.com"
              aria-invalid={Boolean(errors.email)}
              {...register("email")}
            />
          </Field>

          <Field label="Phone number" htmlFor="phone" optional error={errors.phone?.message}>
            <TextInput
              id="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="07700 900123"
              {...register("phone")}
            />
          </Field>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field
              label="Instagram username"
              htmlFor="instagramUsername"
              error={errors.instagramUsername?.message}
            >
              <TextInput
                id="instagramUsername"
                prefix="@"
                autoCapitalize="none"
                autoCorrect="off"
                placeholder="yourhandle"
                aria-invalid={Boolean(errors.instagramUsername)}
                {...register("instagramUsername")}
              />
            </Field>

            <Field
              label="TikTok username"
              htmlFor="tiktokUsername"
              optional
              error={errors.tiktokUsername?.message}
            >
              <TextInput
                id="tiktokUsername"
                prefix="@"
                autoCapitalize="none"
                autoCorrect="off"
                placeholder="yourhandle"
                {...register("tiktokUsername")}
              />
            </Field>
          </div>

          <Field label="Where are you based?" error={errors.location?.message}>
            <Controller
              control={control}
              name="location"
              render={({ field }) => (
                <OptionList
                  name="Location"
                  layout="inline"
                  options={LOCATIONS}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </Field>

          {location === "Other" ? (
            <Field
              label="Where exactly?"
              htmlFor="locationOther"
              error={errors.locationOther?.message}
            >
              <TextInput
                id="locationOther"
                placeholder="e.g. Gosport"
                aria-invalid={Boolean(errors.locationOther)}
                {...register("locationOther")}
              />
            </Field>
          ) : null}
        </fieldset>

        {/* --------------------------------------------- Step 2: Your content */}
        <fieldset className={stepClass(1)}>
          <Field
            label="What type of content do you create?"
            hint="Pick everything that applies."
            error={errors.contentTypes?.message}
          >
            <Controller
              control={control}
              name="contentTypes"
              render={({ field }) => (
                <ChipGroup
                  name="Content types"
                  options={CONTENT_TYPES}
                  value={field.value ?? []}
                  onToggle={(option) => field.onChange(toggleValue("contentTypes", option))}
                />
              )}
            />
          </Field>

          <Field
            label="Tell us about your content"
            htmlFor="bio"
            optional
            error={errors.bio?.message}
          >
            <TextArea
              id="bio"
              placeholder="What do you normally post? Who is your audience? What sort of businesses or places do you enjoy featuring?"
              {...register("bio")}
            />
          </Field>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field
              label="Instagram followers"
              htmlFor="instagramFollowers"
              optional
              error={errors.instagramFollowers?.message}
            >
              <TextInput
                id="instagramFollowers"
                inputMode="numeric"
                placeholder="4200"
                aria-invalid={Boolean(errors.instagramFollowers)}
                {...register("instagramFollowers")}
              />
            </Field>

            <Field
              label="TikTok followers"
              htmlFor="tiktokFollowers"
              optional
              error={errors.tiktokFollowers?.message}
            >
              <TextInput
                id="tiktokFollowers"
                inputMode="numeric"
                placeholder="8100"
                aria-invalid={Boolean(errors.tiktokFollowers)}
                {...register("tiktokFollowers")}
              />
            </Field>
          </div>

          <Field
            label="Which platform do you mainly create on?"
            error={errors.primaryPlatform?.message}
          >
            <Controller
              control={control}
              name="primaryPlatform"
              render={({ field }) => (
                <OptionList
                  name="Primary platform"
                  layout="inline"
                  options={PRIMARY_PLATFORMS}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </Field>

          <Field
            label="Link to your best piece of content"
            hint="A TikTok, a Reel, a post — whatever you're proudest of."
            htmlFor="contentLink1"
            error={errors.contentLink1?.message}
          >
            <TextInput
              id="contentLink1"
              inputMode="url"
              autoCapitalize="none"
              autoCorrect="off"
              placeholder="tiktok.com/@you/video/..."
              aria-invalid={Boolean(errors.contentLink1)}
              {...register("contentLink1")}
            />
          </Field>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field
              label="Additional content link"
              htmlFor="contentLink2"
              optional
              error={errors.contentLink2?.message}
            >
              <TextInput
                id="contentLink2"
                inputMode="url"
                autoCapitalize="none"
                autoCorrect="off"
                placeholder="instagram.com/reel/..."
                aria-invalid={Boolean(errors.contentLink2)}
                {...register("contentLink2")}
              />
            </Field>

            <Field
              label="Portfolio or website"
              htmlFor="portfolioUrl"
              optional
              error={errors.portfolioUrl?.message}
            >
              <TextInput
                id="portfolioUrl"
                inputMode="url"
                autoCapitalize="none"
                autoCorrect="off"
                placeholder="yoursite.com"
                aria-invalid={Boolean(errors.portfolioUrl)}
                {...register("portfolioUrl")}
              />
            </Field>
          </div>
        </fieldset>

        {/* -------------------------------------------- Step 3: Collaborating */}
        <fieldset className={stepClass(2)}>
          <Field
            label="What kinds of places would you most like to discover?"
            hint="Pick everything that appeals."
            optional
            error={errors.preferredBusinessTypes?.message}
          >
            <Controller
              control={control}
              name="preferredBusinessTypes"
              render={({ field }) => (
                <ChipGroup
                  name="Preferred business types"
                  options={BUSINESS_TYPES}
                  value={field.value ?? []}
                  onToggle={(option) =>
                    field.onChange(toggleValue("preferredBusinessTypes", option))
                  }
                />
              )}
            />
          </Field>

          <Field
            label="How often would you be interested in collaborations?"
            error={errors.collaborationFrequency?.message}
          >
            <Controller
              control={control}
              name="collaborationFrequency"
              render={({ field }) => (
                <OptionList
                  name="Collaboration frequency"
                  options={COLLABORATION_FREQUENCIES}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </Field>

          <Field
            label="Are you happy creating content in exchange for a complimentary experience?"
            error={errors.complimentaryExperience?.message}
          >
            <Controller
              control={control}
              name="complimentaryExperience"
              render={({ field }) => (
                <OptionList
                  name="Complimentary experience"
                  layout="inline"
                  options={COMPLIMENTARY_ANSWERS}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </Field>

          <Field
            label="If you're accepted, are you comfortable committing to agreed visit dates and posting agreed content afterwards?"
            error={undefined}
          >
            <Controller
              control={control}
              name="commitmentAck"
              render={({ field }) => (
                <CheckboxField
                  id="commitmentAck"
                  checked={Boolean(field.value)}
                  onChange={field.onChange}
                  error={errors.commitmentAck?.message}
                >
                  I understand that creator opportunities depend on availability and
                  that repeated no-shows or failure to post may affect future
                  opportunities.
                </CheckboxField>
              )}
            />
          </Field>

          <Field
            label="Why do you want to join Discovered Local?"
            htmlFor="whyJoin"
            optional
            error={errors.whyJoin?.message}
          >
            <TextArea
              id="whyJoin"
              placeholder="Tell us why you'd be a great Discovered Local creator."
              {...register("whyJoin")}
            />
          </Field>

          <Controller
            control={control}
            name="consent"
            render={({ field }) => (
              <CheckboxField
                id="consent"
                checked={Boolean(field.value)}
                onChange={field.onChange}
                error={errors.consent?.message}
              >
                I&rsquo;d like to hear from Discovered Local about creator
                opportunities and collaborations. See our{" "}
                <Link href="/privacy" className="underline underline-offset-2">
                  privacy policy
                </Link>
                .
              </CheckboxField>
            )}
          />
        </fieldset>

        {/* --------------------------------------------------------- Actions */}
        <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => goToStep(step - 1)}
              className={buttonStyles({ variant: "ghost", size: "lg" })}
            >
              Back
            </button>
          ) : (
            <span className="hidden sm:block" />
          )}

          {isLastStep ? (
            <button
              type="submit"
              disabled={isSubmitting}
              className={buttonStyles({ size: "lg", className: "w-full sm:w-auto" })}
            >
              {isSubmitting ? "Submitting application..." : "Apply to become a creator"}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className={buttonStyles({ size: "lg", className: "w-full sm:w-auto" })}
            >
              Continue
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
