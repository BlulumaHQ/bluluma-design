/** A portfolio project is a design concept when its site lives on a temporary preview host. Projects with no URL are past client work that is simply offline. */
const TEMP_HOSTS = [/\.workers\.dev$/i, /\.netlify\.app$/i, /\.lovable\.app$/i, /\.pages\.dev$/i, /\.vercel\.app$/i, /(^|\.)bluluma\.com$/i];

export const isConceptProject = (liveUrl: string | null | undefined) => {
  if (!liveUrl || !liveUrl.trim()) return false;
  try {
    const host = new URL(liveUrl.trim().startsWith("http") ? liveUrl.trim() : `https://${liveUrl.trim()}`).hostname;
    return TEMP_HOSTS.some((re) => re.test(host));
  } catch {
    return false;
  }
};
