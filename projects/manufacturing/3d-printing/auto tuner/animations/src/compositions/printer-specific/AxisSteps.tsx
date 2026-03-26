import React from "react";
import { interpolate } from "remotion";
import { CalibrationVar, getZoneColor } from "../../components/CalibrationVar";
import { colors } from "../../brand";

/**
 * Diagram: Side view of a belt-driven axis.
 * Motor turns → belt moves → toolhead slides along rail.
 * Slider value controls how far the toolhead moves per step:
 *   0.0 = undersized movement (too few steps/mm → prints too small)
 *   0.5 = correct distance
 *   1.0 = oversized movement (too many steps/mm → prints too large)
 *
 * Shows a target marker and the actual position diverging from it.
 */
const AxisDiagram: React.FC<{ value: number }> = ({ value }) => {
  // Target position is always at center
  const targetX = 400;
  // Actual position shifts based on value: too-low undershoots, too-high overshoots
  const offset = interpolate(value, [0, 0.5, 1], [-80, 0, 80]);
  const actualX = targetX + offset;
  const zoneColor = getZoneColor(value);

  // Motor gear rotation driven by value
  const gearAngle = value * 720;

  return (
    <svg width="700" height="600" viewBox="0 0 700 600">
      {/* Rail */}
      <rect x="60" y="280" width="580" height="8" rx="4" fill={colors.muted + "44"} />

      {/* Rail ticks (mm markers) */}
      {Array.from({ length: 13 }, (_, i) => (
        <g key={i}>
          <line
            x1={60 + i * 48.3}
            y1="295"
            x2={60 + i * 48.3}
            y2={i % 5 === 0 ? 315 : 305}
            stroke={colors.muted + "66"}
            strokeWidth="2"
          />
          {i % 5 === 0 && (
            <text
              x={60 + i * 48.3}
              y="332"
              textAnchor="middle"
              fill={colors.muted}
              fontSize="14"
              fontFamily="Space Grotesk"
            >
              {i * 10}mm
            </text>
          )}
        </g>
      ))}

      {/* Target position marker */}
      <line x1={targetX} y1="240" x2={targetX} y2="275" stroke={colors.correct} strokeWidth="2" strokeDasharray="6,4" />
      <text x={targetX} y="232" textAnchor="middle" fill={colors.correct} fontSize="16" fontFamily="Space Grotesk">
        TARGET
      </text>

      {/* Toolhead (carriage) */}
      <rect x={actualX - 40} y="248" width="80" height="32" rx="6" fill={zoneColor} opacity="0.9" />
      <rect x={actualX - 30} y="258" width="60" height="12" rx="3" fill={colors.white + "33"} />

      {/* Nozzle */}
      <polygon
        points={`${actualX - 8},280 ${actualX + 8},280 ${actualX + 3},300 ${actualX - 3},300`}
        fill={zoneColor}
      />

      {/* Motor (left side) */}
      <rect x="20" y="350" width="80" height="80" rx="8" fill={colors.darkBlue} stroke={colors.muted + "44"} strokeWidth="2" />
      <text x="60" y="385" textAnchor="middle" fill={colors.muted} fontSize="12" fontFamily="Space Grotesk">
        MOTOR
      </text>

      {/* Motor gear */}
      <g transform={`translate(60, 410) rotate(${gearAngle})`}>
        <circle r="18" fill="none" stroke={colors.lightBlue} strokeWidth="3" />
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <line
            key={a}
            x1="0" y1="0"
            x2={Math.cos((a * Math.PI) / 180) * 14}
            y2={Math.sin((a * Math.PI) / 180) * 14}
            stroke={colors.lightBlue}
            strokeWidth="2"
          />
        ))}
      </g>

      {/* Belt connecting motor to toolhead */}
      <line x1="78" y1="410" x2={actualX} y2="280" stroke={colors.muted + "66"} strokeWidth="2" strokeDasharray="4,4" />

      {/* Distance error indicator */}
      {Math.abs(offset) > 5 && (
        <g>
          {/* Error bracket */}
          <line x1={targetX} y1="360" x2={actualX} y2="360" stroke={zoneColor} strokeWidth="2" />
          <line x1={targetX} y1="355" x2={targetX} y2="365" stroke={colors.correct} strokeWidth="2" />
          <line x1={actualX} y1="355" x2={actualX} y2="365" stroke={zoneColor} strokeWidth="2" />
          <text
            x={(targetX + actualX) / 2}
            y="385"
            textAnchor="middle"
            fill={zoneColor}
            fontSize="16"
            fontWeight="bold"
            fontFamily="Space Grotesk"
          >
            {offset > 0 ? "+" : ""}{offset.toFixed(1)}mm error
          </text>
        </g>
      )}

      {/* Result cube preview */}
      <g transform="translate(350, 450)">
        <text x="0" y="-10" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          20mm calibration cube
        </text>
        {/* Target cube (outline) */}
        <rect x="-50" y="0" width="100" height="100" fill="none" stroke={colors.correct + "44"} strokeWidth="2" strokeDasharray="6,4" />
        {/* Actual cube (filled, scaled by error) */}
        <rect
          x={-50 + offset * 0.6}
          y={0 + (value < 0.5 ? (0.5 - value) * 20 : 0)}
          width={100 + offset * 1.2}
          height={100 + offset * 1.2}
          fill={zoneColor + "33"}
          stroke={zoneColor}
          strokeWidth="2"
          rx="2"
        />
      </g>
    </svg>
  );
};

export const AxisSteps: React.FC = () => (
  <CalibrationVar
    index={1}
    category="Printer-Specific"
    title="Axis Steps/mm"
    description="Motor steps needed to move each axis exactly 1mm. Set by hardware geometry — belt pitch, pulley teeth, motor steps, and driver microstepping."
    unit="steps/mm"
    rangeLabels={{ min: "Too few", correct: "80–400", max: "Too many" }}
    impacts={{
      low: "Prints come out undersized. Gaps between walls. Parts too small to fit.",
      correct: "Dimensions match the model exactly. Accurate, repeatable prints.",
      high: "Prints oversized. Walls squished together. Interference fits everywhere.",
    }}
    dependencies={[]}
    note="Rarely drifts. Only redo after changing motors, drivers, belts, or lead screws."
    renderDiagram={(v) => <AxisDiagram value={v} />}
  />
);
