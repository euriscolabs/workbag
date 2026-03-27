import React from "react";
import { interpolate } from "remotion";
import { CalibrationVar, getZoneColor } from "../../components/CalibrationVar";
import { colors } from "../../brand";

/**
 * Diagram: Side view of nozzle approaching bed.
 * Slider controls Z-offset:
 *   0.0 = too high (nozzle too far) — filament doesn't stick
 *   0.5 = correct — perfect squish
 *   1.0 = too low (nozzle too close) — digs into bed
 */
const ZOffsetDiagram: React.FC<{ value: number }> = ({ value }) => {
  const zoneColor = getZoneColor(value);

  // Nozzle height: too far → correct → too close
  const nozzleY = interpolate(value, [0, 0.5, 1], [180, 260, 290]);
  // Bed surface at y=300
  const bedY = 300;
  const gap = bedY - nozzleY - 40; // 40 = nozzle tip height

  // First layer shape based on gap
  const layerHeight = interpolate(value, [0, 0.5, 1], [1.5, 8, 14]);
  const layerWidth = interpolate(value, [0, 0.5, 1], [3, 40, 60]);

  return (
    <svg width="700" height="550" viewBox="0 0 700 550">
      {/* Hotend body */}
      <rect x="300" y={nozzleY - 80} width="100" height="60" rx="6" fill={colors.darkBlue} stroke={colors.muted + "44"} strokeWidth="2" />
      <text x="350" y={nozzleY - 45} textAnchor="middle" fill={colors.muted} fontSize="12" fontFamily="Space Grotesk">
        HOTEND
      </text>

      {/* Heater block */}
      <rect x="310" y={nozzleY - 20} width="80" height="30" rx="4" fill={colors.tooHigh + "66"} stroke={colors.tooHigh + "88"} strokeWidth="1" />

      {/* Nozzle cone */}
      <polygon
        points={`320,${nozzleY + 10} 380,${nozzleY + 10} 360,${nozzleY + 35} 340,${nozzleY + 35}`}
        fill={colors.muted + "cc"}
        stroke={colors.muted}
        strokeWidth="2"
      />
      {/* Nozzle tip */}
      <rect x="343" y={nozzleY + 35} width="14" height="8" rx="2" fill={colors.muted} />

      {/* Filament coming out of nozzle */}
      {value > 0.1 && (
        <ellipse
          cx="350"
          cy={nozzleY + 43 + gap / 2}
          rx={layerWidth / 3}
          ry={Math.max(gap / 2, 2)}
          fill={zoneColor + "88"}
        />
      )}

      {/* Gap measurement */}
      <g>
        <line x1="420" y1={nozzleY + 43} x2="420" y2={bedY} stroke={zoneColor} strokeWidth="2" />
        <line x1="415" y1={nozzleY + 43} x2="425" y2={nozzleY + 43} stroke={zoneColor} strokeWidth="2" />
        <line x1="415" y1={bedY} x2="425" y2={bedY} stroke={zoneColor} strokeWidth="2" />
        <text
          x="435"
          y={(nozzleY + 43 + bedY) / 2 + 5}
          fill={zoneColor}
          fontSize="16"
          fontWeight="bold"
          fontFamily="Space Grotesk"
        >
          {gap > 0 ? gap.toFixed(0) : "0"}px gap
        </text>
      </g>

      {/* Bed surface */}
      <rect x="100" y={bedY} width="500" height="12" rx="4" fill={colors.muted + "44"} />
      <rect x="100" y={bedY + 12} width="500" height="60" rx="4" fill={colors.deepBlue} stroke={colors.muted + "22"} strokeWidth="1" />
      <text x="350" y={bedY + 48} textAnchor="middle" fill={colors.muted + "66"} fontSize="14" fontFamily="Space Grotesk">
        BUILD PLATE
      </text>

      {/* First layer cross-section */}
      <g transform="translate(350, 420)">
        <text x="0" y="0" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          First layer result
        </text>

        {/* Deposited lines (3 adjacent) showing cross-section */}
        {[-1, 0, 1].map((i) => {
          const lineGap = interpolate(value, [0, 0.5, 1], [8, 0, -4]);
          return (
            <ellipse
              key={i}
              cx={i * (layerWidth + lineGap)}
              cy={40}
              rx={layerWidth / 2}
              ry={layerHeight / 2}
              fill={zoneColor + "66"}
              stroke={zoneColor}
              strokeWidth="1.5"
            />
          );
        })}

        {/* Bed line under the cross-section */}
        <line x1="-100" y1={40 + layerHeight / 2} x2="100" y2={40 + layerHeight / 2} stroke={colors.muted + "44"} strokeWidth="2" />
      </g>

      {/* Labels for extremes */}
      {value < 0.2 && (
        <text x="350" y={nozzleY - 95} textAnchor="middle" fill={colors.tooLow} fontSize="18" fontWeight="bold" fontFamily="Space Grotesk">
          Nozzle too far — filament won't stick
        </text>
      )}
      {value > 0.8 && (
        <g>
          <text x="350" y={nozzleY - 95} textAnchor="middle" fill={colors.tooHigh} fontSize="18" fontWeight="bold" fontFamily="Space Grotesk">
            Nozzle too close — digging into bed
          </text>
          {/* Scratch marks on bed */}
          {[0, 1, 2].map((i) => (
            <line
              key={i}
              x1={300 + i * 30}
              y1={bedY - 2}
              x2={320 + i * 30}
              y2={bedY + 2}
              stroke={colors.tooHigh}
              strokeWidth="2"
            />
          ))}
        </g>
      )}
    </svg>
  );
};

export const ProbeZOffset: React.FC = () => (
  <CalibrationVar
    index={5}
    category="Printer-Specific"
    title="Probe Z-Offset"
    description="Distance between the probe trigger point and the actual nozzle tip. Determines first layer height."
    unit="mm (negative)"
    rangeLabels={{ min: "Too far", correct: "-0.5 to -3.0mm", max: "Too close" }}
    impacts={{
      low: "Nozzle too far from bed. First layer doesn't stick, spaghetti on first move.",
      correct: "Perfect first layer squish. Good adhesion without bed damage.",
      high: "Nozzle digs into bed. Scratches PEI, elephant foot, filament can't flow.",
    }}
    dependencies={["Axis Steps/mm", "Bed Mesh"]}
    note="Changes with nozzle swaps or probe mount adjustments."
    renderDiagram={(v) => <ZOffsetDiagram value={v} />}
  />
);
