import { agency } from "@/lib/site";
import type { ContactInput } from "@/lib/contact-schema";

/**
 * Where contact-form submissions go.
 *
 * NOT YET WIRED TO AN EMAIL PROVIDER. Set the env vars below and inquiries are
 * emailed; leave them unset and submissions are logged to the server console in
 * development, while production refuses the submission and tells the visitor to
 * use email or WhatsApp instead — so nobody is told "sent" when nothing was.
 *
 *   CONTACT_TO_EMAIL   address that should receive inquiries
 *   CONTACT_FROM_EMAIL verified sender on your email provider
 *   RESEND_API_KEY     API key, if you use Resend
 *
 * Swapping providers means changing only `sendEmail` below.
 */

export type DeliveryResult =
  | { delivered: true }
  | { delivered: false; reason: "not-configured" | "provider-error" };

function plainText(input: ContactInput) {
  return [
    `New inquiry from the ${agency.name} website`,
    "",
    `Name:         ${input.name}`,
    `Email:        ${input.email}`,
    `Company:      ${input.company || "—"}`,
    `Project type: ${input.projectType}`,
    `Budget:       ${input.budget}`,
    "",
    "Message:",
    input.message,
  ].join("\n");
}

async function sendEmail(input: ContactInput): Promise<DeliveryResult> {
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;

  if (!to || !from || !apiKey) return { delivered: false, reason: "not-configured" };

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: input.email,
        subject: `New inquiry — ${input.name} (${input.projectType})`,
        text: plainText(input),
      }),
    });

    if (!res.ok) {
      console.error("[contact] provider rejected the send", {
        status: res.status,
        body: await res.text().catch(() => ""),
      });
      return { delivered: false, reason: "provider-error" };
    }

    return { delivered: true };
  } catch (error) {
    console.error("[contact] send failed", error);
    return { delivered: false, reason: "provider-error" };
  }
}

export async function deliverInquiry(input: ContactInput): Promise<DeliveryResult> {
  const result = await sendEmail(input);

  if (!result.delivered && result.reason === "not-configured") {
    // Nothing configured yet: keep the form usable locally, loudly.
    console.warn(
      "[contact] no email provider configured — inquiry logged, not sent.\n" +
        "Set CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL and RESEND_API_KEY to deliver it.\n" +
        plainText(input),
    );
  }

  return result;
}
