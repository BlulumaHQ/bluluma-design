/** Strip internal concept suffixes ("Client - A", "Client – B", "Client - 2") for display only. */
export const displayTitle = (title: string) => title.replace(/\s*[-–]\s*[A-Z0-9]$/i, "").trim();

/** "Client - A" → "A". Only letter suffixes count as design versions (shown as "Version A"). */
export const versionLetter = (title: string): string | null => {
  const m = title.match(/\s[-–]\s*([A-Z])$/i);
  return m ? m[1].toUpperCase() : null;
};
