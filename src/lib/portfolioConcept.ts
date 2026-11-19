/** A portfolio project is a design concept when it has no official domain (no URL, or a temporary preview host). */
const TEMP_HOSTS = [/\.workers\.dev$/i, /\.netlify\.app$/i, /\.lovable\.app$/i, /\.pages\.dev$/i, /\.vercel\.app$/i, /(^|\.)bluluma\.com$/i];

export const isConceptProject = (liveUrl: string | null | undefined) => {
  if (!liveUrl || !liveUrl.trim()) return true;
  try {
    const host = new URL(liveUrl.trim().startsWith("http") ? liveUrl.trim() : `https://${liveUrl.trim()}`).hostname;
    return TEMP_HOSTS.some((re) => re.test(host));
  } catch {
    return true;
  }
};
