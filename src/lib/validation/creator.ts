import { z } from "zod";

import {
  BUSINESS_TYPES,
  COLLABORATION_FREQUENCIES,
  COMPLIMENTARY_ANSWERS,
  CONTENT_TYPES,
  LOCATIONS,
  PRIMARY_PLATFORMS,
} from "@/lib/constants";

/** Users paste links without a scheme all the time — accept that and fix it. */
export function normaliseUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Please keep this under ${max} characters.`)
    .optional()
    .or(z.literal(""));

const urlField = (message: string) =>
  z
    .string()
    .trim()
    .transform(normaliseUrl)
    .refine((value) => value === "" || z.url().safeParse(value).success, {
      message,
    });

const requiredUrlField = (message: string) =>
  z
    .string()
    .trim()
    .transform(normaliseUrl)
    .refine((value) => z.url().safeParse(value).success, { message });

const followerField = z
  .string()
  .trim()
  .optional()
  .or(z.literal(""))
  .refine(
    (value) => !value || /^\d{1,9}$/.test(value.replace(/[,\s]/g, "")),
    "Enter a whole number, e.g. 4200.",
  );

export const applicationSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Please enter your full name.")
      .max(120, "That name is a little too long."),
    email: z.string().trim().pipe(z.email("Enter a valid email address.")),
    phone: optionalText(40),

    instagramUsername: z
      .string()
      .trim()
      .min(1, "Please add your Instagram username.")
      .max(60, "That username is too long."),
    tiktokUsername: optionalText(60),

    location: z.enum(LOCATIONS, { message: "Please choose your location." }),
    locationOther: optionalText(80),

    contentTypes: z
      .array(z.enum(CONTENT_TYPES))
      .min(1, "Pick at least one type of content."),
    bio: optionalText(1500),

    instagramFollowers: followerField,
    tiktokFollowers: followerField,
    primaryPlatform: z.enum(PRIMARY_PLATFORMS, {
      message: "Please choose where you mainly create.",
    }),

    contentLink1: requiredUrlField("Add a link to a piece of your content."),
    contentLink2: urlField("That doesn't look like a valid link."),
    portfolioUrl: urlField("That doesn't look like a valid link."),

    preferredBusinessTypes: z.array(z.enum(BUSINESS_TYPES)).default([]),
    collaborationFrequency: z.enum(COLLABORATION_FREQUENCIES, {
      message: "Let us know how often you'd like to collaborate.",
    }),
    complimentaryExperience: z.enum(COMPLIMENTARY_ANSWERS, {
      message: "Please answer this one.",
    }),

    commitmentAck: z.literal(true, {
      message: "Please confirm you're happy to commit to agreed visits.",
    }),
    whyJoin: optionalText(1500),
    consent: z.literal(true, {
      message: "We need your permission to contact you about opportunities.",
    }),
  })
  .refine(
    (data) => data.location !== "Other" || Boolean(data.locationOther?.trim()),
    { message: "Tell us where you're based.", path: ["locationOther"] },
  );

/** What the form fields hold before Zod runs (everything is a string/array). */
export type ApplicationFormValues = z.input<typeof applicationSchema>;
/** What the server receives after validation. */
export type ApplicationInput = z.output<typeof applicationSchema>;

export const applicationDefaults: ApplicationFormValues = {
  fullName: "",
  email: "",
  phone: "",
  instagramUsername: "",
  tiktokUsername: "",
  location: undefined as unknown as ApplicationFormValues["location"],
  locationOther: "",
  contentTypes: [],
  bio: "",
  instagramFollowers: "",
  tiktokFollowers: "",
  primaryPlatform: undefined as unknown as ApplicationFormValues["primaryPlatform"],
  contentLink1: "",
  contentLink2: "",
  portfolioUrl: "",
  preferredBusinessTypes: [],
  collaborationFrequency:
    undefined as unknown as ApplicationFormValues["collaborationFrequency"],
  complimentaryExperience:
    undefined as unknown as ApplicationFormValues["complimentaryExperience"],
  commitmentAck: false as unknown as true,
  whyJoin: "",
  consent: false as unknown as true,
};

/** Field groups, used to map server-side errors back onto the right step. */
export const FORM_STEPS = [
  {
    id: "about-you",
    title: "About you",
    fields: [
      "fullName",
      "email",
      "phone",
      "instagramUsername",
      "tiktokUsername",
      "location",
      "locationOther",
    ],
  },
  {
    id: "your-content",
    title: "Your content",
    fields: [
      "contentTypes",
      "bio",
      "instagramFollowers",
      "tiktokFollowers",
      "primaryPlatform",
      "contentLink1",
      "contentLink2",
      "portfolioUrl",
    ],
  },
  {
    id: "collaborating",
    title: "Collaborating",
    fields: [
      "preferredBusinessTypes",
      "collaborationFrequency",
      "complimentaryExperience",
      "commitmentAck",
      "whyJoin",
      "consent",
    ],
  },
] as const satisfies ReadonlyArray<{
  id: string;
  title: string;
  fields: ReadonlyArray<keyof ApplicationFormValues>;
}>;
