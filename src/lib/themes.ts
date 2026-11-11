/** Section colour themes. The stage background morphs between these as you scroll. */
export const themes = {
  paper: { bg: "#ebeae6", fg: "#0e0e0e", ac: "#4f46e5" },
  ink: { bg: "#111111", fg: "#dff1ff", ac: "#ffe94d" },
  violet: { bg: "#1b1442", fg: "#d3ccff", ac: "#ffe94d" },
  yellow: { bg: "#ffe94d", fg: "#121212", ac: "#4f46e5" },
  lilac: { bg: "#cfc8ff", fg: "#160f3b", ac: "#4f46e5" },
  mint: { bg: "#0b2420", fg: "#a6f4dc", ac: "#ffe94d" },
} as const;

export type ThemeName = keyof typeof themes;
