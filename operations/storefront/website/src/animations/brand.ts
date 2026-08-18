// Eurisco Labs Brand Constants
// Source: operations/company/identity/index.md

export const colors = {
  primaryBlue: "#1a73e8",
  darkBlue: "#0d47a1",
  deepBlue: "#06224c",
  lightBlue: "#4fc3f7",
  skyBlue: "#6da6f0",
  accentAmber: "#ffab40",
  white: "#ffffff",
  nearBlack: "#1a1a1a",

  // Semantic aliases
  background: "#06224c",
  text: "#ffffff",
  heading: "#ffffff",
  accent: "#ffab40",
  primary: "#1a73e8",
  secondary: "#4fc3f7",
  muted: "#6da6f0",

  // Calibration-specific
  tooLow: "#ff5252",
  correct: "#69f0ae",
  tooHigh: "#ff9100",
} as const;

export const fonts = {
  primary: "Space Grotesk",
} as const;

export const layout = {
  width: 1920,
  height: 1080,
  fps: 30,
  padding: 80,
} as const;
