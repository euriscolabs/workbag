import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, fonts, layout } from "../brand";

/**
 * Calibration variable animation layout.
 *
 * Split view: left = info panel with animated slider, right = mechanism diagram.
 * The slider sweeps from 0 (too low) through 0.5 (correct) to 1 (too high) over time.
 * The `renderDiagram` function receives the current slider value and renders the
 * animated diagram that responds to it in real-time.
 *
 * Timeline:
 *   0–30f:   Entrance animations (title, description fade in)
 *   30–60f:  Slider sweeps from 0 → 0.5 (too low → correct), diagram responds
 *   60–90f:  Hold at correct
 *   90–150f: Slider sweeps 0.5 → 1 (correct → too high), diagram responds
 *   150–180f: Hold at too high
 *   180–210f: Slider returns to 0.5 (correct)
 *   210–240f: Hold at correct, fade out
 */

interface CalibrationVarProps {
  index: number;
  category: string;
  title: string;
  description: string;
  unit: string;
  /** Min / correct / max display values for the slider labels */
  rangeLabels: { min: string; correct: string; max: string };
  /** Impact descriptions for each zone */
  impacts: {
    low: string;
    correct: string;
    high: string;
  };
  dependencies: string[];
  note?: string;
  /** Custom diagram renderer — receives normalized value 0..1 where 0.5 = correct */
  renderDiagram: (value: number) => React.ReactNode;
}

/** Returns the slider's normalized value (0..1) based on current frame */
function getSliderValue(frame: number): number {
  // Entrance: hold at 0
  if (frame < 30) return 0;
  // Sweep 0 → 0.5 (too low → correct)
  if (frame < 60) return interpolate(frame, [30, 60], [0, 0.5], { extrapolateRight: "clamp" });
  // Hold at correct
  if (frame < 90) return 0.5;
  // Sweep 0.5 → 1 (correct → too high)
  if (frame < 150) return interpolate(frame, [90, 150], [0.5, 1], { extrapolateRight: "clamp" });
  // Hold at too high
  if (frame < 180) return 1;
  // Return to correct
  if (frame < 210) return interpolate(frame, [180, 210], [1, 0.5], { extrapolateRight: "clamp" });
  // Hold at correct
  return 0.5;
}

/** Returns the color for the current slider zone */
function getZoneColor(value: number): string {
  if (value < 0.3) return colors.tooLow;
  if (value > 0.7) return colors.tooHigh;
  return colors.correct;
}

export const CalibrationVar: React.FC<CalibrationVarProps> = ({
  index,
  category,
  title,
  description,
  unit,
  rangeLabels,
  impacts,
  dependencies,
  note,
  renderDiagram,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sliderValue = getSliderValue(frame);
  const zoneColor = getZoneColor(sliderValue);

  // Entrance springs
  const enterTitle = spring({ frame, fps, from: 0, to: 1, durationInFrames: 20 });
  const enterDesc = spring({ frame: frame - 8, fps, from: 0, to: 1, durationInFrames: 20 });
  const enterSlider = spring({ frame: frame - 16, fps, from: 0, to: 1, durationInFrames: 20 });
  const enterDiagram = spring({ frame: frame - 20, fps, from: 0, to: 1, durationInFrames: 25 });
  const enterDeps = spring({ frame: frame - 24, fps, from: 0, to: 1, durationInFrames: 20 });

  // Current impact text
  const impactText = sliderValue < 0.3 ? impacts.low : sliderValue > 0.7 ? impacts.high : impacts.correct;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        fontFamily: fonts.primary,
        display: "flex",
        flexDirection: "row",
      }}
    >
      {/* LEFT PANEL — Info */}
      <div
        style={{
          width: "45%",
          padding: 60,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Top: Title + Description */}
        <div>
          <div
            style={{
              opacity: enterTitle,
              transform: `translateY(${interpolate(enterTitle, [0, 1], [20, 0])}px)`,
            }}
          >
            <span
              style={{
                fontSize: 22,
                color: colors.accentAmber,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              {category} #{index}
            </span>
            <div
              style={{
                fontSize: 52,
                fontWeight: 700,
                color: colors.heading,
                marginTop: 8,
                lineHeight: 1.1,
              }}
            >
              {title}
            </div>
          </div>
          <div
            style={{
              opacity: enterDesc,
              transform: `translateY(${interpolate(enterDesc, [0, 1], [15, 0])}px)`,
              fontSize: 22,
              color: colors.muted,
              marginTop: 16,
              lineHeight: 1.4,
            }}
          >
            {description}
          </div>
        </div>

        {/* Middle: Slider + Impact */}
        <div
          style={{
            opacity: enterSlider,
            transform: `translateY(${interpolate(enterSlider, [0, 1], [15, 0])}px)`,
          }}
        >
          {/* Range labels */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 16,
              color: colors.muted,
              marginBottom: 8,
            }}
          >
            <span>{rangeLabels.min}</span>
            <span style={{ color: colors.correct }}>{rangeLabels.correct}</span>
            <span>{rangeLabels.max}</span>
          </div>

          {/* Slider track */}
          <div
            style={{
              position: "relative",
              height: 12,
              borderRadius: 6,
              overflow: "hidden",
              display: "flex",
            }}
          >
            <div style={{ flex: 1, backgroundColor: colors.tooLow + "44" }} />
            <div style={{ flex: 1, backgroundColor: colors.correct + "44" }} />
            <div style={{ flex: 1, backgroundColor: colors.tooHigh + "44" }} />

            {/* Slider thumb */}
            <div
              style={{
                position: "absolute",
                top: -6,
                left: `${sliderValue * 100}%`,
                transform: "translateX(-50%)",
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: zoneColor,
                border: `3px solid ${colors.white}`,
                boxShadow: `0 0 12px ${zoneColor}88`,
              }}
            />
          </div>

          {/* Unit label */}
          <div
            style={{
              fontSize: 14,
              color: colors.muted,
              marginTop: 8,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            {unit}
          </div>

          {/* Dynamic impact text */}
          <div
            style={{
              marginTop: 24,
              padding: "16px 20px",
              backgroundColor: zoneColor + "18",
              borderLeft: `4px solid ${zoneColor}`,
              borderRadius: "0 8px 8px 0",
              fontSize: 20,
              color: colors.text,
              lineHeight: 1.4,
              minHeight: 64,
            }}
          >
            {impactText}
          </div>
        </div>

        {/* Bottom: Dependencies + Note */}
        <div
          style={{
            opacity: enterDeps,
            transform: `translateY(${interpolate(enterDeps, [0, 1], [10, 0])}px)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <span style={{ fontSize: 15, color: colors.muted, letterSpacing: 1, textTransform: "uppercase" }}>
              Depends on:
            </span>
            {dependencies.length === 0 ? (
              <span
                style={{
                  fontSize: 15,
                  color: colors.accentAmber,
                  fontWeight: 600,
                  padding: "3px 12px",
                  border: `2px solid ${colors.accentAmber}`,
                  borderRadius: 6,
                }}
              >
                FOUNDATION
              </span>
            ) : (
              dependencies.map((dep, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: 15,
                    color: colors.lightBlue,
                    padding: "3px 10px",
                    backgroundColor: colors.lightBlue + "18",
                    borderRadius: 6,
                  }}
                >
                  {dep}
                </span>
              ))
            )}
          </div>
          {note && (
            <div style={{ fontSize: 15, color: colors.muted, fontStyle: "italic", marginTop: 8 }}>
              {note}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT PANEL — Animated Diagram */}
      <div
        style={{
          width: "55%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: enterDiagram,
          transform: `scale(${interpolate(enterDiagram, [0, 1], [0.95, 1])})`,
        }}
      >
        {renderDiagram(sliderValue)}
      </div>
    </AbsoluteFill>
  );
};

/** Re-export for diagram helpers */
export { getZoneColor };
