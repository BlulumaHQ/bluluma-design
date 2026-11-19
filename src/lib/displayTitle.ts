/** Strip internal concept suffixes ("Client - A", "Client – B", "Client - 2") for display only. */
export const displayTitle = (title: string) => title.replace(/\s*[-–]\s*[A-Z0-9]$/i, "").trim();
