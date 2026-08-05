/** Envoi d'email optionnel (Resend). Sans clé : log serveur uniquement. */

export type MailPayload = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

export async function sendMail(payload: MailPayload): Promise<{ sent: boolean }> {
  const key = process.env.RESEND_API_KEY || "";
  const from =
    process.env.EMAIL_FROM || "Video Games Battle <onboarding@resend.dev>";

  if (!key) {
    console.warn("[mail] RESEND_API_KEY absent — email non envoyé:", {
      to: payload.to,
      subject: payload.subject,
    });
    if (process.env.NODE_ENV !== "production") {
      console.info("[mail:dev]", payload.text || payload.html);
    }
    return { sent: false };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [payload.to],
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error("[mail] Resend error", res.status, body);
    return { sent: false };
  }
  return { sent: true };
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
}

export function normalizeEmail(email: string): string {
  return String(email || "").trim().toLowerCase();
}
