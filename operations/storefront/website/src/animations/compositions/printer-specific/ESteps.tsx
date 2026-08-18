import React from "react";
import { interpolate } from "remotion";
import { CalibrationVar, getZoneColor } from "../../components/CalibrationVar";
import { colors } from "../../brand";

/**
 * Diagram: Cross-section of a direct-drive extruder.
 * Gear grips filament → pushes into heatbreak → melts in hotend → exits nozzle.
 * Slider value controls how much filament gets pushed per step:
 *   0.0 = too little (under-extrusion)
 *   0.5 = correct amount
 *   1.0 = too much (over-extrusion)
 *
 * The filament flow thickness and deposited line width respond to the slider.
 */
const ExtruderDiagram: React.FC<{ value: number }> = ({ value }) => {
  const zoneColor = getZoneColor(value);

  // Filament flow: width of extruded line
  const flowWidth = interpolate(value, [0, 0.5, 1], [2, 6, 12]);
  // Gear rotation
  const gearRotation = value * 540;
  // Deposited line width on the "bed"
  const lineWidth = interpolate(value, [0, 0.5, 1], [1.5, 4, 10]);
  // Filament speed indicator (arrow length)
  const filamentSpeed = interpolate(value, [0, 0.5, 1], [15, 40, 70]);

  return (
    <svg width="700" height="600" viewBox="0 0 700 600">
      {/* Filament spool hint (top) */}
      <text x="350" y="30" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
        FILAMENT (1.75mm)
      </text>
      <line x1="350" y1="38" x2="350" y2="80" stroke={colors.lightBlue} strokeWidth="4" />

      {/* Extruder body */}
      <rect x="290" y="80" width="120" height="140" rx="10" fill={colors.darkBlue} stroke={colors.muted + "44"} strokeWidth="2" />
      <text x="350" y="105" textAnchor="middle" fill={colors.muted} fontSize="13" fontFamily="Space Grotesk">
        EXTRUDER
      </text>

      {/* Drive gear (left) */}
      <g transform={`translate(315, 155) rotate(${gearRotation})`}>
        <circle r="22" fill="none" stroke={colors.accentAmber} strokeWidth="3" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <line
            key={a}
            x1={Math.cos((a * Math.PI) / 180) * 16}
            y1={Math.sin((a * Math.PI) / 180) * 16}
            x2={Math.cos((a * Math.PI) / 180) * 22}
            y2={Math.sin((a * Math.PI) / 180) * 22}
            stroke={colors.accentAmber}
            strokeWidth="3"
          />
        ))}
      </g>

      {/* Idler gear (right) */}
      <g transform={`translate(385, 155) rotate(${-gearRotation})`}>
        <circle r="18" fill="none" stroke={colors.muted + "88"} strokeWidth="2" />
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <line
            key={a}
            x1={Math.cos((a * Math.PI) / 180) * 12}
            y1={Math.sin((a * Math.PI) / 180) * 12}
            x2={Math.cos((a * Math.PI) / 180) * 18}
            y2={Math.sin((a * Math.PI) / 180) * 18}
            stroke={colors.muted + "88"}
            strokeWidth="2"
          />
        ))}
      </g>

      {/* Filament between gears */}
      <rect x="346" y="80" width="8" height="60" rx="2" fill={colors.lightBlue} />

      {/* Filament flow speed arrow */}
      <polygon
        points={`342,${160 + filamentSpeed} 350,${170 + filamentSpeed} 358,${160 + filamentSpeed}`}
        fill={zoneColor}
      />
      <rect x="347" y="140" width="6" height={filamentSpeed} fill={zoneColor} opacity="0.6" />

      {/* Heatbreak */}
      <rect x="335" y="220" width="30" height="40" rx="4" fill={colors.muted + "44"} stroke={colors.muted + "66"} strokeWidth="1" />
      <text x="420" y="245" fill={colors.muted} fontSize="12" fontFamily="Space Grotesk">
        HEATBREAK
      </text>

      {/* Filament through heatbreak */}
      <rect x="347" y="220" width="6" height="40" fill={colors.lightBlue} />

      {/* Heater block */}
      <rect x="320" y="260" width="60" height="50" rx="6" fill={colors.tooHigh + "88"} stroke={colors.tooHigh} strokeWidth="2" />
      <text x="350" y="290" textAnchor="middle" fill={colors.white} fontSize="13" fontWeight="bold" fontFamily="Space Grotesk">
        HEATER
      </text>

      {/* Heat waves */}
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${390 + i * 14},268 Q${396 + i * 14},278 ${390 + i * 14},288 Q${384 + i * 14},298 ${390 + i * 14},308`}
          fill="none"
          stroke={colors.tooHigh + "44"}
          strokeWidth="2"
        />
      ))}

      {/* Filament melting (transitions from solid to molten) */}
      <rect x="347" y="260" width="6" height="20" fill={colors.lightBlue} />
      <rect x="347" y="280" width="6" height="30" fill={colors.accentAmber} rx="2" />

      {/* Nozzle */}
      <polygon
        points="330,310 370,310 358,340 342,340"
        fill={colors.muted + "88"}
        stroke={colors.muted}
        strokeWidth="2"
      />

      {/* Nozzle opening */}
      <rect x={350 - flowWidth / 2} y="340" width={flowWidth} height="6" rx="2" fill={colors.muted} />

      {/* Extruded material coming out */}
      <rect
        x={350 - flowWidth / 2}
        y="346"
        width={flowWidth}
        height={40}
        rx={flowWidth / 2}
        fill={zoneColor}
        opacity="0.8"
      />

      {/* Bed surface */}
      <rect x="200" y="420" width="300" height="8" rx="4" fill={colors.muted + "44"} />

      {/* Deposited line on bed — shows layer quality */}
      <g>
        {/* Previous layers (faded) */}
        <rect x="200" y={420 - lineWidth} width="140" height={lineWidth} rx={lineWidth / 2} fill={zoneColor + "44"} />
        {/* Current deposit */}
        <rect x="340" y={420 - lineWidth} width={60} height={lineWidth} rx={lineWidth / 2} fill={zoneColor} />
      </g>

      {/* Layer cross-section detail */}
      <g transform="translate(350, 480)">
        <text x="0" y="-5" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          Layer cross-section
        </text>
        {/* Three stacked layers */}
        {[0, 1, 2].map((i) => {
          const gap = interpolate(value, [0, 0.5, 1], [4, 0, -2]);
          return (
            <rect
              key={i}
              x={-40}
              y={10 + i * (lineWidth + gap + 8)}
              width={80}
              height={lineWidth + 4}
              rx={2}
              fill={zoneColor + (i === 2 ? "cc" : "66")}
              stroke={zoneColor}
              strokeWidth="1"
            />
          );
        })}
        {/* Gap indicator for under-extrusion */}
        {value < 0.3 && (
          <text x="60" y="35" fill={colors.tooLow} fontSize="12" fontFamily="Space Grotesk">
            gaps!
          </text>
        )}
        {/* Squish indicator for over-extrusion */}
        {value > 0.7 && (
          <text x="60" y="35" fill={colors.tooHigh} fontSize="12" fontFamily="Space Grotesk">
            squished!
          </text>
        )}
      </g>
    </svg>
  );
};

export const ESteps: React.FC = () => (
  <CalibrationVar
    index={2}
    category="Printer-Specific"
    title="E-Steps"
    description="Motor steps to push exactly 1mm of filament through the extruder gear. Controls how much plastic is deposited per move."
    unit="steps/mm"
    rangeLabels={{ min: "Under-extrusion", correct: "90–140 (DD)", max: "Over-extrusion" }}
    impacts={{
      low: "Thin walls, gaps between layers, weak parts. Not enough material deposited.",
      correct: "Consistent extrusion, solid layer bonding, accurate wall thickness.",
      high: "Blobs, rough surfaces, elephant foot, nozzle clogs. Too much material.",
    }}
    dependencies={["Axis Steps/mm"]}
    note="Can drift with gear wear. The roller encoder approach measures this continuously."
    renderDiagram={(v) => <ExtruderDiagram value={v} />}
  />
);
