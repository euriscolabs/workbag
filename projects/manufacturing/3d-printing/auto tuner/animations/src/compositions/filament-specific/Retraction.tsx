import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { CalibrationVar, getZoneColor } from "../../components/CalibrationVar";
import { colors } from "../../brand";

/**
 * Diagram: Two print towers with travel move between them.
 * Slider controls retraction:
 *   0.0 = no retraction — severe stringing between towers
 *   0.5 = correct — clean travel, no strings
 *   1.0 = too much — grinding, gaps after retraction
 */
const RetractionDiagram: React.FC<{ value: number }> = ({ value }) => {
  const frame = useCurrentFrame();
  const zoneColor = getZoneColor(value);

  const retractionDist = interpolate(value, [0, 0.5, 1], [0, 1.2, 5]);
  const retractionSpeed = interpolate(value, [0, 0.5, 1], [0, 35, 60]);

  // Stringing severity
  const stringCount = Math.floor(interpolate(value, [0, 0.4], [8, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  // Gap after retraction (too much retraction starves next line)
  const gapAfter = interpolate(value, [0.6, 1], [0, 20], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Filament position in extruder (animated retraction)
  const filamentRetract = interpolate(value, [0, 0.5, 1], [0, 12, 35]);

  const towerL = 180;
  const towerR = 480;
  const towerTop = 100;
  const towerBottom = 340;

  return (
    <svg width="700" height="580" viewBox="0 0 700 580">
      {/* Retraction values display */}
      <g transform="translate(350, 25)">
        <text x="-100" y="0" textAnchor="middle" fill={colors.muted} fontSize="13" fontFamily="Space Grotesk">DISTANCE</text>
        <text x="-100" y="22" textAnchor="middle" fill={zoneColor} fontSize="22" fontWeight="bold" fontFamily="Space Grotesk">
          {retractionDist.toFixed(1)}mm
        </text>
        <text x="100" y="0" textAnchor="middle" fill={colors.muted} fontSize="13" fontFamily="Space Grotesk">SPEED</text>
        <text x="100" y="22" textAnchor="middle" fill={zoneColor} fontSize="22" fontWeight="bold" fontFamily="Space Grotesk">
          {retractionSpeed.toFixed(0)}mm/s
        </text>
      </g>

      {/* Left tower */}
      <rect x={towerL - 25} y={towerTop} width="50" height={towerBottom - towerTop} rx="4" fill={colors.lightBlue + "33"} stroke={colors.lightBlue + "88"} strokeWidth="2" />
      <text x={towerL} y={towerBottom + 20} textAnchor="middle" fill={colors.muted} fontSize="12" fontFamily="Space Grotesk">Tower A</text>

      {/* Right tower */}
      <rect x={towerR - 25} y={towerTop} width="50" height={towerBottom - towerTop} rx="4" fill={colors.lightBlue + "33"} stroke={colors.lightBlue + "88"} strokeWidth="2" />
      <text x={towerR} y={towerBottom + 20} textAnchor="middle" fill={colors.muted} fontSize="12" fontFamily="Space Grotesk">Tower B</text>

      {/* Travel move (dashed line) */}
      <line x1={towerL + 25} y1={towerTop + 20} x2={towerR - 25} y2={towerTop + 20} stroke={colors.muted + "44"} strokeWidth="1.5" strokeDasharray="8,6" />
      <text x={(towerL + towerR) / 2} y={towerTop + 10} textAnchor="middle" fill={colors.muted} fontSize="12" fontFamily="Space Grotesk">
        travel move
      </text>

      {/* Strings between towers */}
      {Array.from({ length: stringCount }, (_, i) => {
        const y = towerTop + 30 + i * 35;
        const sag = interpolate(value, [0, 0.3], [20, 5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <path
            key={i}
            d={`M ${towerL + 25},${y} Q ${(towerL + towerR) / 2},${y + sag + Math.random() * 10} ${towerR - 25},${y + 5}`}
            fill="none"
            stroke={colors.tooLow + "aa"}
            strokeWidth={interpolate(value, [0, 0.3], [2.5, 0.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          />
        );
      })}

      {/* Blob at start of right tower (no retraction) */}
      {value < 0.25 && (
        <circle cx={towerR - 25} cy={towerTop + 30} r={8} fill={colors.tooLow + "88"} />
      )}

      {/* Gap after retraction (too much — under-extrusion on restart) */}
      {gapAfter > 3 && (
        <g>
          <rect x={towerR - 25} y={towerTop + 25} width="50" height={gapAfter} fill={colors.background} stroke={colors.tooHigh + "88"} strokeWidth="1.5" strokeDasharray="4,3" />
          <text x={towerR + 35} y={towerTop + 25 + gapAfter / 2} fill={colors.tooHigh} fontSize="12" fontFamily="Space Grotesk">
            gap (starved)
          </text>
        </g>
      )}

      {/* Extruder cutaway showing retraction mechanism */}
      <g transform="translate(270, 380)">
        <text x="80" y="0" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          Extruder during travel
        </text>

        {/* Extruder body */}
        <rect x="40" y="20" width="80" height="100" rx="6" fill={colors.darkBlue} stroke={colors.muted + "44"} strokeWidth="1.5" />

        {/* Gear */}
        <circle cx="80" cy="55" r="14" fill="none" stroke={colors.accentAmber} strokeWidth="2.5" />

        {/* Filament */}
        <rect x="76" y={20 - filamentRetract} width="8" height={80 + filamentRetract} fill={colors.lightBlue} rx="2" />

        {/* Retraction arrow */}
        {filamentRetract > 2 && (
          <g>
            <line x1="65" y1={35} x2="65" y2={35 - filamentRetract} stroke={zoneColor} strokeWidth="2" />
            <polygon points={`60,${35 - filamentRetract} 65,${28 - filamentRetract} 70,${35 - filamentRetract}`} fill={zoneColor} />
            <text x="50" y={30 - filamentRetract / 2} textAnchor="end" fill={zoneColor} fontSize="12" fontFamily="Space Grotesk">
              retract
            </text>
          </g>
        )}

        {/* Nozzle */}
        <polygon points="55,120 105,120 95,140 65,140" fill={colors.muted + "88"} stroke={colors.muted} strokeWidth="1.5" />

        {/* Molten chamber — pressure release */}
        <rect x="72" y="100" width="16" height="20" rx="3" fill={colors.accentAmber + (value > 0.3 ? "44" : "aa")} />

        {/* Pressure indicator */}
        <text x="130" y="115" fill={colors.muted} fontSize="12" fontFamily="Space Grotesk">
          pressure: {value < 0.2 ? "HIGH" : value > 0.7 ? "EMPTY" : "released"}
        </text>

        {/* Grinding indicator for too much retraction */}
        {value > 0.8 && (
          <g>
            {[0, 1, 2].map((i) => (
              <line
                key={i}
                x1={95 + i * 4}
                y1="48"
                x2={99 + i * 4}
                y2="62"
                stroke={colors.tooHigh}
                strokeWidth="2"
              />
            ))}
            <text x="115" y="58" fill={colors.tooHigh} fontSize="11" fontWeight="bold" fontFamily="Space Grotesk">
              GRINDING
            </text>
          </g>
        )}
      </g>
    </svg>
  );
};

export const Retraction: React.FC = () => (
  <CalibrationVar
    index={3}
    category="Filament-Specific"
    title="Retraction"
    description="Pulls filament back during travel moves to relieve pressure and prevent oozing. Distance and speed both matter."
    unit="mm @ mm/s"
    rangeLabels={{ min: "0mm (none)", correct: "0.5–2mm (DD)", max: "5mm+ (grinding)" }}
    impacts={{
      low: "Severe stringing between features. Blobs at travel endpoints. Hairy prints.",
      correct: "Clean travels, no strings. Crisp transitions between features.",
      high: "Filament grinding, clogs, gaps after retraction. Extruder chews filament.",
    }}
    dependencies={["E-Steps", "Extrusion Temp"]}
    note="Higher temps need more retraction. Pressure Advance reduces retraction needs."
    renderDiagram={(v) => <RetractionDiagram value={v} />}
  />
);
