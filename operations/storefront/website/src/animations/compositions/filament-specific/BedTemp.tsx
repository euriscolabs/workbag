import React from "react";
import { interpolate } from "remotion";
import { CalibrationVar, getZoneColor } from "../../components/CalibrationVar";
import { colors } from "../../brand";

/**
 * Diagram: Part on heated bed, showing adhesion and warping.
 * Slider controls bed temperature:
 *   0.0 = too cold — part warps and detaches
 *   0.5 = correct — flat, good adhesion
 *   1.0 = too hot — elephant foot, soft bottom, stuck to bed
 */
const BedTempDiagram: React.FC<{ value: number }> = ({ value }) => {
  const zoneColor = getZoneColor(value);

  const bedTemp = interpolate(value, [0, 0.5, 1], [30, 60, 100]);
  // Warp amount (cold = warping up at corners)
  const warpAmount = interpolate(value, [0, 0.35], [25, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // Elephant foot (hot = bottom layer spreads)
  const elephantFoot = interpolate(value, [0.65, 1], [0, 15], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // Adhesion force
  const adhesion = interpolate(value, [0, 0.5, 1], [0.1, 0.8, 1]);

  const bedY = 320;
  const partWidth = 250;
  const partHeight = 120;
  const partX = 225;

  return (
    <svg width="700" height="580" viewBox="0 0 700 580">
      {/* Temperature display */}
      <g transform="translate(350, 25)">
        <text x="0" y="0" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          BED TEMPERATURE
        </text>
        <text x="0" y="32" textAnchor="middle" fill={zoneColor} fontSize="36" fontWeight="bold" fontFamily="Space Grotesk">
          {bedTemp.toFixed(0)}°C
        </text>
      </g>

      {/* Side view: part on bed */}
      <g>
        {/* Bed */}
        <rect x="120" y={bedY} width="460" height="16" rx="4"
          fill={interpolate(value, [0, 0.5, 1], [0.2, 0.5, 0.9]) > 0.5 ? colors.tooHigh + "44" : colors.muted + "33"}
          stroke={colors.muted + "66"}
          strokeWidth="1.5"
        />
        {/* Heater coils inside bed */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1={160 + i * 85}
            y1={bedY + 25}
            x2={200 + i * 85}
            y2={bedY + 25}
            stroke={interpolate(value, [0, 1], [0.2, 1]) > 0.5 ? colors.tooHigh + "66" : colors.muted + "33"}
            strokeWidth="3"
            strokeLinecap="round"
          />
        ))}
        <rect x="120" y={bedY + 16} width="460" height="25" rx="4" fill={colors.deepBlue} stroke={colors.muted + "22"} strokeWidth="1" />
        <text x="350" y={bedY + 55} textAnchor="middle" fill={colors.muted + "66"} fontSize="12" fontFamily="Space Grotesk">
          HEATED BED
        </text>

        {/* Part — shape changes with warp and elephant foot */}
        <path
          d={`
            M ${partX + elephantFoot},${bedY}
            L ${partX + elephantFoot},${bedY - partHeight}
            L ${partX + partWidth - elephantFoot},${bedY - partHeight}
            L ${partX + partWidth - elephantFoot},${bedY}
            Z
          `}
          fill={colors.lightBlue + "33"}
          stroke={colors.lightBlue + "88"}
          strokeWidth="2"
        />

        {/* Elephant foot bulge (bottom wider than top) */}
        {elephantFoot > 2 && (
          <>
            <path
              d={`
                M ${partX},${bedY}
                Q ${partX + elephantFoot / 2},${bedY - 8} ${partX + elephantFoot},${bedY - 15}
              `}
              fill="none" stroke={colors.tooHigh} strokeWidth="2"
            />
            <path
              d={`
                M ${partX + partWidth},${bedY}
                Q ${partX + partWidth - elephantFoot / 2},${bedY - 8} ${partX + partWidth - elephantFoot},${bedY - 15}
              `}
              fill="none" stroke={colors.tooHigh} strokeWidth="2"
            />
            <text x={partX - 15} y={bedY - 5} textAnchor="end" fill={colors.tooHigh} fontSize="12" fontFamily="Space Grotesk">
              elephant foot
            </text>
          </>
        )}

        {/* Warping (corners lift) */}
        {warpAmount > 3 && (
          <>
            {/* Left corner lifting */}
            <path
              d={`M ${partX},${bedY} Q ${partX + 20},${bedY - warpAmount} ${partX + 50},${bedY - warpAmount * 0.3}`}
              fill="none" stroke={colors.tooLow} strokeWidth="2.5"
            />
            {/* Right corner lifting */}
            <path
              d={`M ${partX + partWidth},${bedY} Q ${partX + partWidth - 20},${bedY - warpAmount} ${partX + partWidth - 50},${bedY - warpAmount * 0.3}`}
              fill="none" stroke={colors.tooLow} strokeWidth="2.5"
            />
            {/* Warp arrows */}
            <polygon points={`${partX + 10},${bedY - warpAmount - 5} ${partX + 5},${bedY - warpAmount + 5} ${partX + 15},${bedY - warpAmount + 5}`} fill={colors.tooLow} />
            <polygon points={`${partX + partWidth - 10},${bedY - warpAmount - 5} ${partX + partWidth - 15},${bedY - warpAmount + 5} ${partX + partWidth - 5},${bedY - warpAmount + 5}`} fill={colors.tooLow} />
            <text x="350" y={bedY - warpAmount - 15} textAnchor="middle" fill={colors.tooLow} fontSize="14" fontWeight="bold" fontFamily="Space Grotesk">
              WARPING
            </text>
          </>
        )}
      </g>

      {/* Adhesion indicator */}
      <g transform="translate(120, 400)">
        <text x="230" y="0" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          Bed adhesion
        </text>
        <rect x="0" y="15" width="460" height="20" rx="6" fill={colors.deepBlue} stroke={colors.muted + "33"} strokeWidth="1" />
        <rect x="0" y="15" width={460 * adhesion} height="20" rx="6" fill={zoneColor + "55"} />
        {/* Labels */}
        <text x="5" y="50" fill={colors.muted} fontSize="11" fontFamily="Space Grotesk">none</text>
        <text x="230" y="50" textAnchor="middle" fill={colors.muted} fontSize="11" fontFamily="Space Grotesk">good</text>
        <text x="455" y="50" textAnchor="end" fill={colors.muted} fontSize="11" fontFamily="Space Grotesk">permanent</text>

        {value > 0.85 && (
          <text x="230" y="72" textAnchor="middle" fill={colors.tooHigh} fontSize="12" fontFamily="Space Grotesk">
            part fused to bed — damage risk on removal
          </text>
        )}
      </g>

      {/* Temperature gradient through part */}
      <g transform="translate(120, 490)">
        <text x="230" y="0" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          Temperature gradient through part
        </text>
        {Array.from({ length: 6 }, (_, i) => {
          const layerTemp = bedTemp * Math.exp(-i * 0.3);
          const warmth = layerTemp / 100;
          return (
            <rect
              key={i}
              x="80"
              y={15 + i * 12}
              width={300}
              height={10}
              rx="2"
              fill={`rgba(255, ${Math.floor(145 - warmth * 100)}, ${Math.floor(64 - warmth * 64)}, ${Math.max(warmth, 0.15)})`}
            />
          );
        })}
        <text x="395" y="30" fill={colors.muted} fontSize="11" fontFamily="Space Grotesk">← bed (hot)</text>
        <text x="395" y="78" fill={colors.muted} fontSize="11" fontFamily="Space Grotesk">← top (cool)</text>
      </g>
    </svg>
  );
};

export const BedTemp: React.FC = () => (
  <CalibrationVar
    index={6}
    category="Filament-Specific"
    title="Bed Temperature"
    description="Heated bed temperature for adhesion and warp prevention. Keeps the bottom layers warm so they don't shrink and curl."
    unit="°C"
    rangeLabels={{ min: "30°C (cold)", correct: "50–70°C (PLA)", max: "100°C (hot)" }}
    impacts={{
      low: "Poor adhesion, warping, corners lift off the bed. Parts detach mid-print.",
      correct: "Flat first layer, good adhesion, easy removal when cooled.",
      high: "Elephant foot, soft bottom layers, part fuses to bed. Removal risks damage.",
    }}
    dependencies={["Bed Mesh"]}
    note="Filament type determines the range. PLA: 50-70°C, PETG: 70-90°C, ABS: 90-110°C."
    renderDiagram={(v) => <BedTempDiagram value={v} />}
  />
);
