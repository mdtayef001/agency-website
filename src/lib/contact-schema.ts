import { z } from "zod";

import { budgetRanges, projectTypes } from "@/lib/site";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "That name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email.")
    .max(160, "That email is too long.")
    .pipe(z.email("That doesn't look like an email address.")),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  projectType: z.enum(projectTypes, {
    error: "Pick the closest project type.",
  }),
  budget: z.enum(budgetRanges, {
    error: "Pick a budget range.",
  }),
  message: z
    .string()
    .trim()
    .min(20, "A couple of sentences helps — 20 characters minimum.")
    .max(4000, "Please keep it under 4000 characters."),
  /** Hidden field. Bots fill it in; humans never see it. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Shape returned by POST /api/contact. */
export type ContactResponse =
  | { ok: true }
  | { ok: false; message: string; fieldErrors?: Record<string, string[]> };
