import React from "react";
import { interpolate } from "remotion";
import { CalibrationVar, getZoneColor } from "../../components/CalibrationVar";
import { colors } from "../../brand";

/**
 * Diagram: Different move types with individual speed bars.
 * Slider controls overall speed aggressiveness:
 *   0.0 = too conservative — all speeds low, wasting time
 *   0.5 = optimal — each move type at its own ideal speed
 *   1.0 = too aggressive — some move types exceed their limits
 *
 * Each move type has a different speed ceiling, which is the key insight.
 */
const SpeedProfileDiagram: React.FC<{ value: number }> = ({ value }) => {
  const zoneColor = getZoneColor(value);

  const moveTypes = [
    { name: "Infill", max: 300, icon: "///", ceiling: "volumetric flow" },
    { name: "Inner perimeter", max: 200, icon: "┃", ceiling: "surface quality" },
    { name: "Outer perimeter", max: 120, icon: "│", ceiling: "surface finish" },
    { name: "Top surface", max: 80, icon: "▬", ceiling: "ironing quality" },
    { name: "Bridges", max: 180, icon: "─", ceiling: "sag / stringing" },
    { name: "Overhangs", max: 60, icon: "╲", ceiling: "droop / cooling" },
    { name: "First layer", max: 30, icon: "▁", ceiling: "bed adhesion" },
  ];

  const globalMax = 300;

  return (
    <svg width="700" height="580" viewBox="0 0 700 580">
      {/* Overall speed multiplier */}
      <g transform="translate(350, 25)">
        <text x="0" y="0" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          SPEED AGGRESSIVENESS
        </text>
        <text x="0" y="30" textAnchor="middle" fill={zoneColor} fontSize="28" fontWeight="bold" fontFamily="Space Grotesk">
          {interpolate(value, [0, 0.5, 1], [30, 100, 170]).toFixed(0)}%
        </text>
      </g>

      {/* Speed bars per move type */}
      <g transform="translate(50, 70)">
        {moveTypes.map((type, i) => {
          const speed = interpolate(value, [0, 0.5, 1], [type.max * 0.2, type.max * 0.85, type.max * 1.4]);
          const exceeded = speed > type.max;
          const barWidth = (Math.min(speed, type.max * 1.4) / globalMax) * 380;
          const maxLine = (type.max / globalMax) * 380;
          const barColor = exceeded ? colors.tooHigh : value < 0.2 ? colors.tooLow : colors.correct;
          const y = i * 65;

          return (
            <g key={i} transform={`translate(0, ${y})`}>
              {/* Move type label */}
              <text x="0" y="15" fill={colors.text} fontSize="16" fontWeight="600" fontFamily="Space Grotesk">
                {type.name}
              </text>
              <text x="0" y="32" fill={colors.muted} fontSize="11" fontFamily="Space Grotesk">
                limit: {type.ceiling}
              </text>

              {/* Bar background */}
              <rect x="170" y="5" width="380" height="24" rx="4" fill={colors.deepBlue} stroke={colors.muted + "22"} strokeWidth="1" />

              {/* Speed bar */}
              <rect x="170" y="5" width={barWidth} height="24" rx="4" fill={barColor + "55"} stroke={barColor} strokeWidth="1.5" />

              {/* Max speed line */}
              <line x1={170 + maxLine} y1="2" x2={170 + maxLine} y2="32" stroke={colors.accentAmber} strokeWidth="2" />

              {/* Speed value */}
              <text
                x={170 + barWidth + 8}
                y="22"
                fill={barColor}
                fontSize="14"
                fontWeight="bold"
                fontFamily="Space Grotesk"
              >
                {speed.toFixed(0)} mm/s
              </text>

              {/* Exceeded warning */}
              {exceeded && (
                <text
                  x={170 + maxLine + 5}
                  y="46"
                  fill={colors.tooHigh}
                  fontSize="10"
                  fontFamily="Space Grotesk"
                >
                  exceeded!
                </text>
              )}
            </g>
          );
        })}
      </g>

      {/* Key insight callout */}
      <g transform="translate(50, 530)">
        <rect x="0" y="-5" width="600" height="30" rx="6" fill={zoneColor + "12"} stroke={zoneColor + "33"} strokeWidth="1" />
        <text x="300" y="15" textAnchor="middle" fill={zoneColor} fontSize="14" fontFamily="Space Grotesk">
          {value < 0.3
            ? "All moves running far below their potential — prints take much longer than needed"
            : value > 0.7
            ? "Some move types pushed past their physical limits — quality will suffer"
            : "Each move type running near its own optimal speed — fast AND high quality"}
        </text>
      </g>
    </svg>
  );
};

export const SpeedProfile: React.FC = () => (
  <CalibrationVar
    index={8}
    category="Filament-Specific"
    title="Speed Profile"
    description="Optimal speed for each move type. Infill can go fast, overhangs need to go slow — each has a different physical ceiling."
    unit="mm/s per type"
    rangeLabels={{ min: "30% (slow)", correct: "Per-type optimized", max: "170% (reckless)" }}
    impacts={{
      low: "All moves crawl at the same slow speed. Hours of wasted print time.",
      correct: "Each move type at its own sweet spot. Fast where it can be, careful where it must be.",
      high: "Overhangs droop, surfaces degrade, bridges fail. Speed exceeds physics.",
    }}
    dependencies={["Max Volumetric Flow", "Cooling / Fan", "Extrusion Temp", "Pressure Advance"]}
    note="Capstone of filament-specific tuning. The auto-tuner generates a complete slicer profile."
    renderDiagram={(v) => <SpeedProfileDiagram value={v} />}
  />
);
