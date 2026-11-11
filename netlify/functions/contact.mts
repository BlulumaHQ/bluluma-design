// Netlify Function (v2): contact
// Accepts the form as FormData or JSON and emails every field to the owner via Resend.
// Required Netlify env var: RESEND_API_KEY (Sending access, domain send.bluluma.com)

const TO = "sony@bluluma.com";
const FROM = "Bluluma Design Website <noreply@send.bluluma.com>";
const SITE = "Bluluma Design";

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

export default async (req: Request) => {
  if (req.method !== "POST") return json(405, { ok: false });
  const key = Netlify.env.get("RESEND_API_KEY");
  if (!key) return json(500, { ok: false, error: "not_configured" });

  const fields: Record<string, string> = {};
  try {
    if ((req.headers.get("content-type") || "").includes("application/json")) {
      for (const [k, v] of Object.entries(await req.json())) fields[k] = String(v ?? "");
    } else {
      for (const [k, v] of (await req.formData()).entries()) if (typeof v === "string") fields[k] = fields[k] ? `${fields[k]}, ${v}` : v;
    }
  } catch {
    return json(400, { ok: false, error: "invalid_body" });
  }
  if (fields._gotcha || fields["bot-field"] || fields.website_hp) return json(200, { ok: true });

  const email = (fields.email || "").trim();
  const name = (fields.name || [fields.firstName, fields.lastName].filter(Boolean).join(" ") || "Website visitor").trim();
  const rows = Object.entries(fields)
    .filter(([k, v]) => v && !k.startsWith("_"))
    .map(([k, v]) => `<tr><td style="padding:6px 14px 6px 0;font-weight:bold;vertical-align:top">${esc(k)}</td><td style="padding:6px 0;white-space:pre-wrap">${esc(v.slice(0, 5000))}</td></tr>`)
    .join("");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      ...(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? { reply_to: email } : {}),
      subject: `New inquiry from ${name.slice(0, 80)} — ${SITE}`,
      html: `<div style="font-family:Arial,sans-serif;color:#222"><h2>New website inquiry — ${SITE}</h2><table>${rows}</table></div>`,
    }),
  });
  if (!res.ok) {
    console.error("Resend failed", res.status, await res.text());
    return json(502, { ok: false, error: "delivery_failed" });
  }
  return json(200, { ok: true });
};
