// Eurisco Labs brand — the single source of truth.
//
// Every color on the site, in the animations, and in the logos comes from
// here. Consumers:
//   - BaseLayout.astro injects these as `--brand-*` CSS variables on :root
//   - styles/global.css maps them to Tailwind tokens (@theme inline)
//   - the Remotion compositions (src/animations/) import them directly
//   - assets/logos/ — the SVGs are built from these values (each logo
//     gradient runs light → brand color at 50% → dark, see `gradients`)
//
// Brand name: Eurisco Labs
// Voice: curious, hands-on, educational; direct and honest; scientific but
//        accessible. Keywords: agency, direct action, hands-on, curiosity.
//
// Logo variants (assets/logos/):
//   logo.svg            primary logo
//   logo-icon.svg       favicon, small contexts
//   logo-circle.svg     profile pictures (YouTube, Instagram, …)
//   logo-chip-icon.svg  tech/electronics context
//   logo-gear-icon.svg  engineering/maker context
//   logo-shell-icon.svg science/research context
//   wordmark.svg        text-only brand mark

export const colors = {
  primaryBlue: "#1a73e8", // buttons, links, primary actions
  darkBlue: "#0d47a1", // headings, emphasis
  deepBlue: "#06224c", // dark backgrounds, dark UI
  lightBlue: "#4fc3f7", // secondary elements, highlights
  skyBlue: "#6da6f0", // subtle accents, gradients
  accentAmber: "#ffab40", // CTAs, warmth, the "eureka" moment
  white: "#ffffff", // backgrounds
  nearBlack: "#1a1a1a", // body text on light backgrounds

  // Derived UI tones — Deep Blue mixed toward white, so neutral chrome
  // stays in the brand's color temperature instead of generic gray.
  muted: "#5d6f8b", // secondary text (deepBlue 65% + white; 5.1:1 on white)
  border: "#ebedf1", // hairlines, card borders (deepBlue 8% + white)
  borderLight: "#f5f6f8", // subtle row dividers (deepBlue 4% + white)
} as const;

// The three gradient ramps the logos are drawn with. Midpoint (50%) is
// always the brand color; ends are its light/dark shading.
export const gradients = {
  primary: ["#6da6f0", colors.primaryBlue, "#0f4a97"],
  light: ["#a7e1fb", colors.lightBlue, "#0a9ee0"],
  deep: ["#1d6eed", colors.darkBlue, colors.deepBlue],
} as const;

export const fonts = {
  primary: "Space Grotesk",
  stack: '"Space Grotesk", system-ui, sans-serif',
} as const;

// Semantic status colors for the calibration animations
// (too low / correct / too high readings).
export const calibration = {
  tooLow: "#ff5252",
  correct: "#69f0ae",
  tooHigh: "#ff9100",
} as const;

// Remotion composition canvas used by all animations.
export const layout = {
  width: 1920,
  height: 1080,
  fps: 30,
  padding: 80,
} as const;

// CSS custom properties injected on :root by BaseLayout.astro.
export const cssVariables: Record<string, string> = {
  "--brand-primary-blue": colors.primaryBlue,
  "--brand-dark-blue": colors.darkBlue,
  "--brand-deep-blue": colors.deepBlue,
  "--brand-light-blue": colors.lightBlue,
  "--brand-sky-blue": colors.skyBlue,
  "--brand-accent-amber": colors.accentAmber,
  "--brand-white": colors.white,
  "--brand-near-black": colors.nearBlack,
  "--brand-muted": colors.muted,
  "--brand-border": colors.border,
  "--brand-border-light": colors.borderLight,
  "--brand-font-sans": fonts.stack,
};

export function brandCss(): string {
  const decls = Object.entries(cssVariables)
    .map(([k, v]) => `${k}:${v}`)
    .join(";");
  return `:root{${decls}}`;
}
