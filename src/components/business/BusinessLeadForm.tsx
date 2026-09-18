"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { Controller, useForm, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { submitBusinessLead } from "@/app/get-started/actions";
import { buttonStyles } from "@/components/ui/button";
import {
  CheckboxField,
  Field,
  OptionList,
  TextArea,
  TextInput,
} from "@/components/ui/fields";
import { trackEvent } from "@/lib/analytics";
import { LEAD_BUSINESS_TYPES } from "@/lib/constants";
import {
  businessLeadDefaults,
  businessLeadSchema,
  type BusinessLeadFormValues,
  type BusinessLeadInput,
} from "@/lib/validation/business";

/**
 * One short screen, no steps. A restaurant owner filling this in on their phone
 * between services should be done in under a minute — everything past the first
 * four fields is optional.
 */
export function BusinessLeadForm() {
  const [banner, setBanner] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const startedRef = useRef(false);

  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<BusinessLeadFormValues, unknown, BusinessLeadInput>({
    resolver: zodResolver(businessLeadSchema),
    defaultValues: businessLeadDefaults,
    mode: "onTouched",
  });

  const markStarted = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent("business_lead_started");
  }, []);

  const onSubmit = handleSubmit(async (values) => {
    setBanner(null);

    let result;
    try {
      result = await submitBusinessLead(values);
    } catch (error) {
      console.error("[get-started] submission failed", error);
      setBanner(
        "Something went wrong while sending your details. Please try again.",
      );
      return;
    }

    if (result.status === "ok") {
      trackEvent("business_lead_submitted");
      setSent(true);
      return;
    }

    if (result.status === "invalid") {
      for (const [field, message] of Object.entries(result.fieldErrors)) {
        setError(field as FieldPath<BusinessLeadFormValues>, { message });
      }
      setBanner(result.message);
      return;
    }

    setBanner(result.message);
  });

  if (sent) {
    return (
      <div className="text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl border border-line bg-paper">
          <svg viewBox="0 0 24 24" className="size-7 text-accent-deep" aria-hidden>
            <path
              d="M4.5 12.5l5 5 10-11"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        <h2 className="h-section mt-7">
          Thanks, <span className="serif-accent">we&rsquo;ll be in touch.</span>
        </h2>
        <div className="mx-auto mt-5 max-w-md space-y-4 text-lg leading-relaxed text-ink-muted">
          <p>
            We&rsquo;ve got your details. We&rsquo;ll come back to you shortly to talk
            through how Discovered Local would work for your business.
          </p>
          <p className="text-ink">
            No payment needed yet. This is just the start of a conversation.
          </p>
        </div>

        <Link
          href="/"
          className={buttonStyles({
            variant: "ghost",
            size: "lg",
            className: "mt-8 w-full sm:w-auto",
          })}
        >
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <>
      {banner ? (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-danger/30 bg-danger-soft px-4 py-3.5 text-[0.95rem] text-danger"
        >
          {banner}
        </div>
      ) : null}

      <form
        onSubmit={onSubmit}
        onFocusCapture={markStarted}
        noValidate
        className="flex flex-col gap-6"
      >
        <Field
          label="Business name"
          htmlFor="businessName"
          error={errors.businessName?.message}
        >
          <TextInput
            id="businessName"
            autoComplete="organization"
            placeholder="The Southsea Bistro"
            aria-invalid={Boolean(errors.businessName)}
            {...register("businessName")}
          />
        </Field>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field
            label="Your name"
            htmlFor="contactName"
            error={errors.contactName?.message}
          >
            <TextInput
              id="contactName"
              autoComplete="name"
              placeholder="Alex Morgan"
              aria-invalid={Boolean(errors.contactName)}
              {...register("contactName")}
            />
          </Field>

          <Field label="Email" htmlFor="email" error={errors.email?.message}>
            <TextInput
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@yourbusiness.co.uk"
              aria-invalid={Boolean(errors.email)}
              {...register("email")}
            />
          </Field>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field
            label="Phone number"
            htmlFor="phone"
            optional
            error={errors.phone?.message}
          >
            <TextInput
              id="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="023 9200 0000"
              {...register("phone")}
            />
          </Field>

          <Field
            label="Where are you based?"
            htmlFor="location"
            optional
            hint="Town, area or postcode."
            error={errors.location?.message}
          >
            <TextInput
              id="location"
              placeholder="Southsea, Portsmouth"
              {...register("location")}
            />
          </Field>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field
            label="Website"
            htmlFor="website"
            optional
            error={errors.website?.message}
          >
            <TextInput
              id="website"
              inputMode="url"
              autoCapitalize="none"
              autoCorrect="off"
              placeholder="yourbusiness.co.uk"
              aria-invalid={Boolean(errors.website)}
              {...register("website")}
            />
          </Field>

          <Field
            label="Instagram"
            htmlFor="instagram"
            optional
            error={errors.instagram?.message}
          >
            <TextInput
              id="instagram"
              prefix="@"
              autoCapitalize="none"
              autoCorrect="off"
              placeholder="yourbusiness"
              {...register("instagram")}
            />
          </Field>
        </div>

        <Field
          label="What kind of business is it?"
          error={errors.businessType?.message}
        >
          <Controller
            control={control}
            name="businessType"
            render={({ field }) => (
              <OptionList
                name="Business type"
                layout="inline"
                options={LEAD_BUSINESS_TYPES}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </Field>

        <Field
          label="Anything else?"
          htmlFor="notes"
          optional
          hint="What you’d want out of it, questions, anything we should know."
          error={errors.notes?.message}
        >
          <TextArea
            id="notes"
            placeholder="We’re a 40-cover bistro in Southsea and we’d love more people to find us at lunchtime…"
            {...register("notes")}
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
              I&rsquo;m happy for Discovered Local to store these details and contact
              me about the service. See our{" "}
              <Link href="/privacy" className="underline underline-offset-2">
                privacy policy
              </Link>
              .
            </CheckboxField>
          )}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={buttonStyles({ size: "lg", className: "mt-2 w-full" })}
        >
          {isSubmitting ? "Sending..." : "Tell me more"}
        </button>

        <p className="text-sm leading-relaxed text-ink-muted">
          We&rsquo;ll only use your details to talk to you about Discovered Local.
          You can ask us to stop or delete them at any time.
        </p>
      </form>
    </>
  );
}
