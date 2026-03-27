import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { CalibrationVar, getZoneColor } from "../../components/CalibrationVar";
import { colors } from "../../brand";

/**
 * Diagram: Gear teeth with mechanical play.
 * Slider controls backlash compensation:
 *   0.0 = uncompensated — visible dead zone gap between gears
 *   0.5 = compensated — no effective play
 *   1.0 = over-compensated — gears overlap/jam
 */
const BacklashDiagram: React.FC<{ value: number }> = ({ value }) => {
  const frame = useCurrentFrame();
  const zoneColor = getZoneColor(value);

  // Gap between gear teeth (dead zone)
  const gapSize = interpolate(value, [0, 0.5, 1], [12, 0, -4]);
  // Direction indicator — oscillates to show reversal
  const direction = Math.sin(frame * 0.08);
  const directionOffset = direction * 8;

  // Circle print quality — backlash makes circles oval
  const ovalStretch = interpolate(value, [0, 0.5, 1], [15, 0, -6]);

  return (
    <svg width="700" height="550" viewBox="0 0 700 550">
      {/* Title */}
      <text x="350" y="35" textAnchor="middle" fill={colors.muted} fontSize="16" fontFamily="Space Grotesk">
        Gear engagement — direction reversal
      </text>

      {/* Drive gear (left, motor-driven) */}
      <g transform={`translate(250, 150) rotate(${frame * 2})`}>
        <circle r="60" fill="none" stroke={colors.lightBlue} strokeWidth="2" />
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i * 30) * Math.PI / 180;
          const innerR = 48;
          const outerR = 60;
          return (
            <rect
              key={i}
              x={-5}
              y={-outerR}
              width={10}
              height={outerR - innerR}
              rx={2}
              fill={colors.lightBlue}
              transform={`rotate(${i * 30})`}
            />
          );
        })}
        <circle r="15" fill={colors.darkBlue} />
      </g>
      <text x="250" y="230" textAnchor="middle" fill={colors.muted} fontSize="13" fontFamily="Space Grotesk">
        DRIVE (motor)
      </text>

      {/* Driven gear (right, connected to axis) — has gap from drive */}
      <g transform={`translate(${370 + gapSize}, 150) rotate(${-frame * 2 + directionOffset})`}>
        <circle r="60" fill="none" stroke={colors.accentAmber} strokeWidth="2" />
        {Array.from({ length: 12 }, (_, i) => (
          <rect
            key={i}
            x={-5}
            y={-60}
            width={10}
            height={12}
            rx={2}
            fill={colors.accentAmber}
            transform={`rotate(${i * 30})`}
          />
        ))}
        <circle r="15" fill={colors.darkBlue} />
      </g>
      <text x={370 + gapSize} y="230" textAnchor="middle" fill={colors.muted} fontSize="13" fontFamily="Space Grotesk">
        DRIVEN (axis)
      </text>

      {/* Dead zone indicator */}
      {gapSize > 2 && (
        <g>
          <line x1="310" y1="140" x2={310 + gapSize} y2="140" stroke={colors.tooLow} strokeWidth="2" />
          <text x={310 + gapSize / 2} y="130" textAnchor="middle" fill={colors.tooLow} fontSize="14" fontWeight="bold" fontFamily="Space Grotesk">
            dead zone
          </text>
          <text x={310 + gapSize / 2} y="115" textAnchor="middle" fill={colors.tooLow} fontSize="12" fontFamily="Space Grotesk">
            {(gapSize * 0.008).toFixed(2)}mm
          </text>
        </g>
      )}

      {/* Over-compensation indicator */}
      {gapSize < -2 && (
        <text x="330" y="115" textAnchor="middle" fill={colors.tooHigh} fontSize="14" fontWeight="bold" fontFamily="Space Grotesk">
          JAM — teeth overlap!
        </text>
      )}

      {/* Direction reversal indicator */}
      <g transform="translate(350, 270)">
        <text x="0" y="0" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          On direction reversal:
        </text>
        <text x="0" y="22" textAnchor="middle" fill={zoneColor} fontSize="14" fontFamily="Space Grotesk">
          {value < 0.3
            ? "Motor turns but axis doesn't move — then jumps"
            : value > 0.7
            ? "Axis overcorrects past the target"
            : "Axis follows motor immediately"}
        </text>
      </g>

      {/* Circle print test */}
      <g transform="translate(350, 380)">
        <text x="0" y="0" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          Circle print test
        </text>

        {/* Target circle */}
        <circle cx="0" cy="75" r="55" fill="none" stroke={colors.correct + "33"} strokeWidth="2" strokeDasharray="6,4" />

        {/* Actual circle (oval if backlash) */}
        <ellipse
          cx="0"
          cy="75"
          rx={55 + ovalStretch}
          ry={55 - ovalStretch}
          fill={zoneColor + "18"}
          stroke={zoneColor}
          strokeWidth="2.5"
        />

        {/* Dimension labels */}
        {Math.abs(ovalStretch) > 2 && (
          <>
            <line x1={-55 - ovalStretch} y1="75" x2={55 + ovalStretch} y2="75" stroke={zoneColor} strokeWidth="1" strokeDasharray="4,4" />
            <text x="0" y="62" textAnchor="middle" fill={zoneColor} fontSize="12" fontFamily="Space Grotesk">
              {(110 + ovalStretch * 2).toFixed(1)}mm
            </text>
            <line x1="0" y1={75 - 55 + ovalStretch} x2="0" y2={75 + 55 - ovalStretch} stroke={zoneColor} strokeWidth="1" strokeDasharray="4,4" />
            <text x="20" y="75" fill={zoneColor} fontSize="12" fontFamily="Space Grotesk">
              {(110 - ovalStretch * 2).toFixed(1)}mm
            </text>
          </>
        )}
      </g>
    </svg>
  );
};

export const Backlash: React.FC = () => (
  <CalibrationVar
    index={8}
    category="Printer-Specific"
    title="Backlash Compensation"
    description="Mechanical play in the motion system. The dead zone when an axis reverses direction — motor turns but nothing moves."
    unit="mm"
    rangeLabels={{ min: "0.05–0.1mm play", correct: "~0mm", max: "Over-compensated" }}
    impacts={{
      low: "Dimensional errors on direction changes. Circles print as ovals. Shifted layers.",
      correct: "Accurate dimensions. Circles are round. Clean direction changes.",
      high: "Overcorrection artifacts. Ridges appear at reversal points.",
    }}
    dependencies={["Axis Steps/mm", "Belt Tension"]}
    renderDiagram={(v) => <BacklashDiagram value={v} />}
  />
);
