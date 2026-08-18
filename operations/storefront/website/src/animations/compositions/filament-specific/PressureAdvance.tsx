import React from "react";
import { interpolate } from "remotion";
import { CalibrationVar, getZoneColor } from "../../components/CalibrationVar";
import { colors } from "../../brand";

/**
 * Diagram: Nozzle depositing a line, showing pressure buildup/release.
 * Slider controls Pressure Advance:
 *   0.0 = no PA — bulging corners, blobs at line starts
 *   0.5 = correct PA — uniform line width through corners
 *   1.0 = too much PA — gaps at corners, thin starts
 *
 * Shows: line width variation at start/corner/stop of extrusion,
 * and a pressure gauge visualization.
 */
const PressureAdvanceDiagram: React.FC<{ value: number }> = ({ value }) => {
  const zoneColor = getZoneColor(value);

  const paValue = interpolate(value, [0, 0.5, 1], [0, 0.045, 0.12]);

  // Line width at different positions
  const startWidth = interpolate(value, [0, 0.5, 1], [8, 5, 2]);
  const cornerWidth = interpolate(value, [0, 0.5, 1], [10, 5, 1.5]);
  const straightWidth = 5;
  const endWidth = interpolate(value, [0, 0.5, 1], [2, 5, 8]);

  // Pressure visualization
  const pressureAtCorner = interpolate(value, [0, 0.5, 1], [0.9, 0.5, 0.1]);

  return (
    <svg width="700" height="580" viewBox="0 0 700 580">
      {/* PA value display */}
      <g transform="translate(350, 25)">
        <text x="0" y="0" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          PRESSURE ADVANCE
        </text>
        <text x="0" y="30" textAnchor="middle" fill={zoneColor} fontSize="34" fontWeight="bold" fontFamily="Space Grotesk">
          {paValue.toFixed(3)}
        </text>
      </g>

      {/* Extrusion line — L-shape path showing line width variation */}
      <g transform="translate(60, 80)">
        <text x="280" y="0" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          Deposited line — L-shape path
        </text>

        {/* Target line width (dashed) */}
        <path
          d="M 50,100 L 280,100 L 280,250"
          fill="none"
          stroke={colors.correct + "33"}
          strokeWidth={straightWidth}
          strokeLinejoin="round"
          strokeDasharray="8,6"
        />

        {/* Actual deposited line with varying width */}
        {/* Start section */}
        {(() => {
          const points: string[] = [];
          const topPoints: string[] = [];
          for (let i = 0; i <= 230; i += 3) {
            let w;
            if (i < 40) {
              // Start: ramp from startWidth to straight
              w = interpolate(i, [0, 40], [startWidth, straightWidth]);
            } else if (i > 190) {
              // Approaching corner: bulge or thin
              w = interpolate(i, [190, 230], [straightWidth, cornerWidth]);
            } else {
              w = straightWidth;
            }
            points.push(`${50 + i},${100 + w / 2}`);
            topPoints.unshift(`${50 + i},${100 - w / 2}`);
          }
          return (
            <polygon
              points={[...points, ...topPoints].join(" ")}
              fill={zoneColor + "55"}
              stroke={zoneColor}
              strokeWidth="1.5"
            />
          );
        })()}

        {/* Corner section (vertical) */}
        {(() => {
          const points: string[] = [];
          const rightPoints: string[] = [];
          for (let i = 0; i <= 150; i += 3) {
            let w;
            if (i < 30) {
              // Just after corner
              w = cornerWidth;
            } else if (i < 60) {
              w = interpolate(i, [30, 60], [cornerWidth, straightWidth]);
            } else if (i > 120) {
              // End: ramp to endWidth
              w = interpolate(i, [120, 150], [straightWidth, endWidth]);
            } else {
              w = straightWidth;
            }
            points.push(`${280 - w / 2},${100 + i}`);
            rightPoints.unshift(`${280 + w / 2},${100 + i}`);
          }
          return (
            <polygon
              points={[...points, ...rightPoints].join(" ")}
              fill={zoneColor + "55"}
              stroke={zoneColor}
              strokeWidth="1.5"
            />
          );
        })()}

        {/* Annotations */}
        {/* Start blob/gap */}
        {value < 0.25 && (
          <text x="60" y="80" fill={colors.tooLow} fontSize="12" fontFamily="Space Grotesk">
            blob at start
          </text>
        )}
        {value > 0.75 && (
          <text x="60" y="80" fill={colors.tooHigh} fontSize="12" fontFamily="Space Grotesk">
            thin / gap at start
          </text>
        )}

        {/* Corner annotation */}
        <circle cx="280" cy="100" r="4" fill={colors.accentAmber} />
        {value < 0.25 && (
          <text x="295" y="95" fill={colors.tooLow} fontSize="12" fontFamily="Space Grotesk">
            bulging corner
          </text>
        )}
        {value > 0.75 && (
          <text x="295" y="95" fill={colors.tooHigh} fontSize="12" fontFamily="Space Grotesk">
            gap at corner
          </text>
        )}

        {/* Movement direction arrows */}
        <polygon points="140,85 150,88 140,91" fill={colors.muted + "88"} />
        <polygon points="295,180 292,190 289,180" fill={colors.muted + "88"} />
      </g>

      {/* Pressure gauge / nozzle pressure visualization */}
      <g transform="translate(420, 100)">
        <text x="100" y="0" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          Nozzle pressure
        </text>

        {/* Three states: approaching corner, at corner, leaving corner */}
        {["Straight", "At Corner", "After Corner"].map((label, i) => {
          let pressure;
          if (i === 0) pressure = 0.5; // steady state
          else if (i === 1) pressure = pressureAtCorner;
          else pressure = 1 - pressureAtCorner;

          const barHeight = pressure * 80;
          const barColor = pressure > 0.7 ? colors.tooLow : pressure < 0.3 ? colors.tooHigh : colors.correct;

          return (
            <g key={i} transform={`translate(${i * 70}, 20)`}>
              {/* Bar background */}
              <rect x="10" y="0" width="40" height="80" rx="4" fill={colors.deepBlue} stroke={colors.muted + "33"} strokeWidth="1" />
              {/* Pressure fill */}
              <rect x="10" y={80 - barHeight} width="40" height={barHeight} rx="4" fill={barColor + "66"} />
              {/* Target line */}
              <line x1="8" y1="40" x2="52" y2="40" stroke={colors.correct + "44"} strokeWidth="1" strokeDasharray="3,3" />
              {/* Label */}
              <text x="30" y="98" textAnchor="middle" fill={colors.muted} fontSize="10" fontFamily="Space Grotesk">
                {label}
              </text>
            </g>
          );
        })}

        {/* Explanation */}
        <text x="100" y="125" textAnchor="middle" fill={zoneColor} fontSize="12" fontFamily="Space Grotesk">
          {value < 0.25
            ? "Pressure builds at corners → excess material"
            : value > 0.75
            ? "Pressure drops too much → material starved"
            : "Pressure stays consistent through corners"}
        </text>
      </g>

      {/* PA test pattern */}
      <g transform="translate(60, 440)">
        <text x="280" y="0" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          PA calibration pattern — line width should be uniform
        </text>
        {Array.from({ length: 8 }, (_, i) => {
          const linePA = i * 0.015;
          const isActive = Math.abs(linePA - paValue) < 0.008;
          const w = isActive ? straightWidth : interpolate(Math.abs(linePA - paValue), [0, 0.06], [straightWidth, 8]);
          return (
            <g key={i}>
              <rect
                x="80"
                y={20 + i * 16}
                width={400}
                height={w}
                rx={w / 2}
                fill={isActive ? colors.correct + "44" : colors.muted + "22"}
                stroke={isActive ? colors.correct : colors.muted + "44"}
                strokeWidth="1"
              />
              <text
                x="70"
                y={20 + i * 16 + w / 2 + 4}
                textAnchor="end"
                fill={isActive ? colors.correct : colors.muted + "66"}
                fontSize="10"
                fontFamily="Space Grotesk"
              >
                {linePA.toFixed(3)}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
};

export const PressureAdvance: React.FC = () => (
  <CalibrationVar
    index={4}
    category="Filament-Specific"
    title="Pressure Advance"
    description="Compensates for pressure buildup in the melt zone. Pre-decompresses before stopping, pre-compresses before starting."
    unit="factor"
    rangeLabels={{ min: "0 (none)", correct: "0.01–0.10 (DD)", max: "0.12+ (too much)" }}
    impacts={{
      low: "Bulging corners, blobs at line starts, rounded edges. Excess pressure at direction changes.",
      correct: "Uniform line width through corners and speed changes. Clean, sharp details.",
      high: "Gaps at corners, under-extrusion at line starts. Not enough pressure to deposit material.",
    }}
    dependencies={["E-Steps", "Flow Rate", "Extrusion Temp"]}
    note="Good PA significantly reduces retraction needs. Interacts with retraction settings."
    renderDiagram={(v) => <PressureAdvanceDiagram value={v} />}
  />
);
