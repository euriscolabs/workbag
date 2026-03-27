import React from "react";
import { interpolate } from "remotion";
import { CalibrationVar, getZoneColor } from "../../components/CalibrationVar";
import { colors } from "../../brand";

/**
 * Diagram: Single-wall calibration cube with wall thickness measurement.
 * Slider controls flow multiplier:
 *   0.0 = under-extrusion — thin walls, gaps, visible infill
 *   0.5 = correct — walls match target thickness
 *   1.0 = over-extrusion — thick walls, bulging, dimensional inaccuracy
 */
const FlowRateDiagram: React.FC<{ value: number }> = ({ value }) => {
  const zoneColor = getZoneColor(value);

  const flowMultiplier = interpolate(value, [0, 0.5, 1], [0.85, 1.0, 1.15]);
  const targetWall = 0.4; // mm, single nozzle width
  const actualWall = targetWall * flowMultiplier;

  // Visual wall thickness in SVG units
  const targetPx = 20;
  const actualPx = targetPx * flowMultiplier;

  // Gap between perimeters (negative = overlap)
  const perimeterGap = interpolate(value, [0, 0.5, 1], [6, 0, -4]);

  return (
    <svg width="700" height="580" viewBox="0 0 700 580">
      {/* Flow multiplier display */}
      <g transform="translate(350, 30)">
        <text x="0" y="0" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          EXTRUSION MULTIPLIER
        </text>
        <text x="0" y="32" textAnchor="middle" fill={zoneColor} fontSize="36" fontWeight="bold" fontFamily="Space Grotesk">
          {flowMultiplier.toFixed(2)}
        </text>
      </g>

      {/* Calibration cube — top-down cross-section */}
      <g transform="translate(100, 90)">
        <text x="250" y="0" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          Single-wall cube — top-down view
        </text>

        {/* Outer target square (dashed) */}
        <rect x="100" y="20" width="300" height="200" fill="none" stroke={colors.correct + "33"} strokeWidth="1.5" strokeDasharray="6,4" rx="2" />

        {/* Actual printed walls */}
        {/* Top wall */}
        <rect x="100" y={20 - (actualPx - targetPx) / 2} width="300" height={actualPx} fill={zoneColor + "55"} stroke={zoneColor} strokeWidth="1.5" />
        {/* Bottom wall */}
        <rect x="100" y={220 - actualPx + (actualPx - targetPx) / 2} width="300" height={actualPx} fill={zoneColor + "55"} stroke={zoneColor} strokeWidth="1.5" />
        {/* Left wall */}
        <rect x={100 - (actualPx - targetPx) / 2} y="20" width={actualPx} height="200" fill={zoneColor + "55"} stroke={zoneColor} strokeWidth="1.5" />
        {/* Right wall */}
        <rect x={400 - actualPx + (actualPx - targetPx) / 2} y="20" width={actualPx} height="200" fill={zoneColor + "55"} stroke={zoneColor} strokeWidth="1.5" />

        {/* Wall thickness measurement callout (top wall) */}
        <g transform="translate(250, -5)">
          <line x1="-20" y1={25 - (actualPx - targetPx) / 2} x2="-20" y2={25 + actualPx - (actualPx - targetPx) / 2} stroke={zoneColor} strokeWidth="2" />
          <line x1="-25" y1={25 - (actualPx - targetPx) / 2} x2="-15" y2={25 - (actualPx - targetPx) / 2} stroke={zoneColor} strokeWidth="2" />
          <line x1="-25" y1={25 + actualPx - (actualPx - targetPx) / 2} x2="-15" y2={25 + actualPx - (actualPx - targetPx) / 2} stroke={zoneColor} strokeWidth="2" />
          <text x="-35" y={25 + actualPx / 2} textAnchor="end" fill={zoneColor} fontSize="14" fontWeight="bold" fontFamily="Space Grotesk">
            {actualWall.toFixed(2)}mm
          </text>
          <text x="-35" y={25 + actualPx / 2 + 16} textAnchor="end" fill={colors.muted} fontSize="11" fontFamily="Space Grotesk">
            (target: {targetWall.toFixed(2)}mm)
          </text>
        </g>

        {/* Infill hint showing through thin walls */}
        {value < 0.25 && (
          <g>
            {Array.from({ length: 8 }, (_, i) => (
              <line
                key={i}
                x1={140 + i * 30}
                y1="50"
                x2={140 + i * 30}
                y2="190"
                stroke={colors.tooLow + "33"}
                strokeWidth="2"
              />
            ))}
            <text x="250" y="130" textAnchor="middle" fill={colors.tooLow} fontSize="13" fontFamily="Space Grotesk">
              infill visible through walls
            </text>
          </g>
        )}
      </g>

      {/* Double-wall cross-section detail */}
      <g transform="translate(100, 360)">
        <text x="250" y="0" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          Wall cross-section (2 perimeters)
        </text>

        {/* Two perimeter lines side by side */}
        <g transform="translate(130, 20)">
          {/* Outer perimeter */}
          <rect x="0" y="0" width={actualPx * 3} height="100" rx={actualPx * 1.5} fill={zoneColor + "44"} stroke={zoneColor} strokeWidth="1.5" />
          {/* Inner perimeter */}
          <rect x={actualPx * 3 + perimeterGap} y="0" width={actualPx * 3} height="100" rx={actualPx * 1.5} fill={zoneColor + "44"} stroke={zoneColor} strokeWidth="1.5" />

          {/* Gap indicator */}
          {perimeterGap > 2 && (
            <g>
              <line x1={actualPx * 3} y1="50" x2={actualPx * 3 + perimeterGap} y2="50" stroke={colors.tooLow} strokeWidth="1.5" />
              <text x={actualPx * 3 + perimeterGap / 2} y="42" textAnchor="middle" fill={colors.tooLow} fontSize="11" fontFamily="Space Grotesk">
                gap
              </text>
            </g>
          )}

          {/* Overlap indicator */}
          {perimeterGap < -2 && (
            <text x={actualPx * 3} y="-8" textAnchor="middle" fill={colors.tooHigh} fontSize="11" fontFamily="Space Grotesk">
              overlap (bulge)
            </text>
          )}

          {/* Third + fourth perimeters */}
          <rect x={(actualPx * 3 + perimeterGap) * 2} y="0" width={actualPx * 3} height="100" rx={actualPx * 1.5} fill={zoneColor + "33"} stroke={zoneColor + "66"} strokeWidth="1" />
          <rect x={(actualPx * 3 + perimeterGap) * 3} y="0" width={actualPx * 3} height="100" rx={actualPx * 1.5} fill={zoneColor + "22"} stroke={zoneColor + "44"} strokeWidth="1" />

          {/* Labels */}
          <text x={actualPx * 1.5} y="130" textAnchor="middle" fill={colors.muted} fontSize="11" fontFamily="Space Grotesk">outer</text>
          <text x={actualPx * 4.5 + perimeterGap} y="130" textAnchor="middle" fill={colors.muted} fontSize="11" fontFamily="Space Grotesk">inner</text>
        </g>

        {/* Total wall thickness */}
        <g transform="translate(380, 20)">
          <text x="0" y="15" fill={colors.muted} fontSize="13" fontFamily="Space Grotesk">Total wall:</text>
          <text x="0" y="40" fill={zoneColor} fontSize="22" fontWeight="bold" fontFamily="Space Grotesk">
            {(actualWall * 4 + (actualWall * perimeterGap / targetPx) * 3).toFixed(2)}mm
          </text>
          <text x="0" y="60" fill={colors.muted} fontSize="12" fontFamily="Space Grotesk">
            target: {(targetWall * 4).toFixed(2)}mm
          </text>
          <text x="0" y="85" fill={zoneColor} fontSize="14" fontFamily="Space Grotesk">
            error: {value < 0.3 ? "−" : value > 0.7 ? "+" : ""}
            {Math.abs((actualWall * 4) - (targetWall * 4)).toFixed(2)}mm
          </text>
        </g>
      </g>
    </svg>
  );
};

export const FlowRate: React.FC = () => (
  <CalibrationVar
    index={2}
    category="Filament-Specific"
    title="Flow Rate"
    description="Fine-tuning multiplier on top of E-steps. Compensates for filament-specific melt behavior — different plastics flow differently even at the same E-steps."
    unit="multiplier"
    rangeLabels={{ min: "0.85 (under)", correct: "0.95–1.00", max: "1.15 (over)" }}
    impacts={{
      low: "Gaps between perimeters, weak walls, infill visible through shell.",
      correct: "Wall thickness matches slicer target. Solid, dimensionally accurate.",
      high: "Bulging walls, over-sized dimensions, rough surfaces from excess material.",
    }}
    dependencies={["E-Steps", "Extrusion Temp"]}
    note="Measured via single-wall cube: print, measure wall thickness, adjust multiplier."
    renderDiagram={(v) => <FlowRateDiagram value={v} />}
  />
);
