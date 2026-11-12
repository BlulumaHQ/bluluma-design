// Netlify Function (v2): contact
// Accepts the form as FormData or JSON and emails every field to the owner via Resend.
// Required Netlify env var: RESEND_API_KEY (Sending access, domain send.bluluma.com)
// Spam protection: honeypot field, minimum fill time, gibberish-name filter.
// Blocked submissions get a fake 200 so bots don't adapt.

const TO = "sony@bluluma.com";
const FROM = "Bluluma Design Website <noreply@send.bluluma.com>";
const SITE = "Bluluma Design";
const MIN_FILL_MS = 3000;
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000;

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

// Random-string names like "wLJlgaiNwqvkjhkqTv"
function looksLikeGibberish(name: string): boolean {
  const n = name.trim();
  if (!n) return false;
  if (/\s/.test(n)) return false; // real names usually have a space
  if (n.length < 10) return false;
  const innerCaps = (n.slice(1).match(/[A-Z]/g) || []).length;
  const vowels = (n.match(/[aeiouAEIOU]/g) || []).length;
  return innerCaps >= 2 || vowels / n.length < 0.2;
}

function spamReason(f: Record<string, string>): string | null {
  if (f._gotcha || f["bot-field"] || f.website_hp) return "honeypot";
  const t = Number(f._t);
  if (!t) return "no_timestamp";
  const age = Date.now() - t;
  if (age < MIN_FILL_MS) return "too_fast";
  if (age > MAX_FORM_AGE_MS) return "stale_form";
  const name = f.name || [f.firstName, f.lastName].filter(Boolean).join(" ");
  if (looksLikeGibberish(name)) return "gibberish_name";
  return null;
}

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

  const reason = spamReason(fields);
  if (reason) {
    console.log("Blocked spam submission:", reason, (fields.name || "").slice(0, 40), (fields.email || "").slice(0, 60));
    return json(200, { ok: true });
  }

  const email = (fields.email || "").trim();
  const name = (fields.name || [fields.firstName, fields.lastName].filter(Boolean).join(" ") || "Website visitor").trim();
  const rows = Object.entries(fields)
    .filter(([k, v]) => v && !k.startsWith("_") && k !== "website_hp")
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
