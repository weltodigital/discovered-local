import { z } from "zod";

import { LEAD_BUSINESS_TYPES } from "@/lib/constants";
import { normaliseUrl } from "@/lib/validation/creator";

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Please keep this under ${max} characters.`)
    .optional()
    .or(z.literal(""));

const optionalUrl = (message: string) =>
  z
    .string()
    .trim()
    .transform(normaliseUrl)
    .refine((value) => value === "" || z.url().safeParse(value).success, {
      message,
    });

/**
 * Deliberately short. This is a conversation-starter, not an application — the
 * only truly required answers are who you are and how we reach you.
 */
export const businessLeadSchema = z.object({
  businessName: z
    .string()
    .trim()
    .min(2, "Please tell us the name of your business.")
    .max(160, "That name is a little too long."),
  contactName: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(120, "That name is a little too long."),
  email: z.string().trim().pipe(z.email("Enter a valid email address.")),
  phone: optionalText(40),
  website: optionalUrl("That doesn't look like a valid link."),
  instagram: optionalText(120),
  businessType: z.enum(LEAD_BUSINESS_TYPES, {
    message: "Please choose the closest match.",
  }),
  location: optionalText(120),
  notes: optionalText(1500),
});

export type BusinessLeadFormValues = z.input<typeof businessLeadSchema>;
export type BusinessLeadInput = z.output<typeof businessLeadSchema>;

export const businessLeadDefaults: BusinessLeadFormValues = {
  businessName: "",
  contactName: "",
  email: "",
  phone: "",
  website: "",
  instagram: "",
  businessType: undefined as unknown as BusinessLeadFormValues["businessType"],
  location: "",
  notes: "",
};
