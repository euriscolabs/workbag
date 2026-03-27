import React from "react";
import { interpolate } from "remotion";
import { CalibrationVar, getZoneColor } from "../../components/CalibrationVar";
import { colors } from "../../brand";

/**
 * Diagram: Hotend cross-section with temperature gradient.
 * Slider controls extrusion temperature:
 *   0.0 = too cold — filament not fully melted, rough extrusion, clogging
 *   0.5 = correct — smooth flow, good layer adhesion
 *   1.0 = too hot — oozing, stringing, discoloration
 *
 * Shows: melt zone visualization, extruded line quality, temperature tower concept.
 */
const ExtrusionTempDiagram: React.FC<{ value: number }> = ({ value }) => {
  const zoneColor = getZoneColor(value);

  // Temperature value display
  const temp = interpolate(value, [0, 0.5, 1], [180, 210, 260]);
  // Melt zone length (how much filament is molten)
  const meltZone = interpolate(value, [0, 0.5, 1], [8, 30, 45]);
  // Stringing severity
  const stringing = interpolate(value, [0.6, 1], [0, 30], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // Surface roughness (from under-temp)
  const roughness = interpolate(value, [0, 0.3], [8, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // Layer adhesion quality
  const adhesionGap = interpolate(value, [0, 0.3, 0.5, 1], [6, 2, 0, 0]);

  // Heater block color intensity
  const heatIntensity = interpolate(value, [0, 0.5, 1], [0.3, 0.7, 1]);

  return (
    <svg width="700" height="580" viewBox="0 0 700 580">
      {/* Temperature display */}
      <g transform="translate(350, 30)">
        <text x="0" y="0" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          HOTEND TEMPERATURE
        </text>
        <text x="0" y="32" textAnchor="middle" fill={zoneColor} fontSize="36" fontWeight="bold" fontFamily="Space Grotesk">
          {temp.toFixed(0)}°C
        </text>
      </g>

      {/* Hotend cross-section */}
      <g transform="translate(200, 80)">
        {/* Heat sink (top, cool) */}
        <rect x="60" y="0" width="80" height="50" rx="4" fill={colors.darkBlue} stroke={colors.muted + "44"} strokeWidth="1.5" />
        {/* Fins */}
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x="50" y={5 + i * 12} width="100" height="6" rx="2" fill={colors.darkBlue} stroke={colors.muted + "33"} strokeWidth="1" />
        ))}
        <text x="100" y="42" textAnchor="middle" fill={colors.muted} fontSize="11" fontFamily="Space Grotesk">HEATSINK</text>

        {/* Heatbreak (transition zone) */}
        <rect x="80" y="50" width="40" height="30" rx="3" fill={colors.muted + "33"} stroke={colors.muted + "44"} strokeWidth="1" />
        <text x="155" y="70" fill={colors.muted} fontSize="11" fontFamily="Space Grotesk">HEATBREAK</text>

        {/* Heater block */}
        <rect x="55" y="80" width="90" height="50" rx="6"
          fill={`rgba(255, ${Math.floor(145 - heatIntensity * 100)}, ${Math.floor(64 - heatIntensity * 64)}, ${heatIntensity})`}
          stroke={colors.tooHigh}
          strokeWidth="2"
        />
        <text x="100" y="110" textAnchor="middle" fill={colors.white} fontSize="13" fontWeight="bold" fontFamily="Space Grotesk">
          {temp.toFixed(0)}°C
        </text>

        {/* Heat waves */}
        {heatIntensity > 0.5 && [0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M${155 + i * 12},85 Q${160 + i * 12},100 ${155 + i * 12},115 Q${150 + i * 12},130 ${155 + i * 12},130`}
            fill="none"
            stroke={`rgba(255, 145, 0, ${heatIntensity * 0.3})`}
            strokeWidth="2"
          />
        ))}

        {/* Filament path inside */}
        {/* Solid filament (cool) */}
        <rect x="96" y="0" width="8" height={80 - meltZone} fill={colors.lightBlue} rx="2" />
        {/* Transition zone */}
        <defs>
          <linearGradient id="meltGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colors.lightBlue} />
            <stop offset="100%" stopColor={colors.accentAmber} />
          </linearGradient>
        </defs>
        <rect x="96" y={80 - meltZone} width="8" height={meltZone * 0.6} fill="url(#meltGrad)" rx="2" />
        {/* Molten filament */}
        <rect x="94" y={80 - meltZone * 0.4} width="12" height={meltZone * 0.4 + 50} fill={colors.accentAmber} rx="3" opacity="0.8" />

        {/* Nozzle */}
        <polygon points="70,130 130,130 115,155 85,155" fill={colors.muted + "aa"} stroke={colors.muted} strokeWidth="2" />
        <rect x="93" y="155" width="14" height="6" rx="2" fill={colors.muted} />

        {/* Melt zone label */}
        <line x1="55" y1={80 - meltZone} x2="45" y2={80 - meltZone} stroke={zoneColor} strokeWidth="1.5" />
        <line x1="55" y1="130" x2="45" y2="130" stroke={zoneColor} strokeWidth="1.5" />
        <line x1="48" y1={80 - meltZone} x2="48" y2="130" stroke={zoneColor} strokeWidth="1.5" />
        <text x="40" y={(80 - meltZone + 130) / 2} textAnchor="end" fill={zoneColor} fontSize="11" fontFamily="Space Grotesk">
          melt zone
        </text>
      </g>

      {/* Extruded filament coming out — quality varies */}
      <g transform="translate(300, 245)">
        {/* Extrusion line with variable quality */}
        {(() => {
          const points: string[] = [];
          for (let i = 0; i < 200; i += 2) {
            const wobble = roughness > 0
              ? Math.sin(i * 0.5) * roughness * Math.random()
              : 0;
            points.push(`${i},${wobble}`);
          }
          return (
            <polyline
              points={points.join(" ")}
              fill="none"
              stroke={zoneColor}
              strokeWidth={interpolate(value, [0, 0.5, 1], [3, 5, 7])}
              strokeLinejoin="round"
              transform="translate(0, 20)"
            />
          );
        })()}

        {/* Stringing between points */}
        {stringing > 3 && (
          <g>
            {[0, 1, 2].map((i) => {
              const x1 = 40 + i * 60;
              const x2 = x1 + 30;
              return (
                <g key={i}>
                  <line
                    x1={x1} y1="15"
                    x2={x2} y2={15 + stringing * 0.4}
                    stroke={colors.tooHigh + "88"}
                    strokeWidth="1.5"
                  />
                  <line
                    x1={x2} y1="15"
                    x2={x1 + 15} y2={15 + stringing * 0.6}
                    stroke={colors.tooHigh + "66"}
                    strokeWidth="1"
                  />
                </g>
              );
            })}
            <text x="100" y={30 + stringing} fill={colors.tooHigh} fontSize="12" fontFamily="Space Grotesk">
              stringing
            </text>
          </g>
        )}
      </g>

      {/* Layer adhesion cross-section */}
      <g transform="translate(150, 340)">
        <text x="200" y="0" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          Layer adhesion cross-section
        </text>
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x="100"
            y={20 + i * (16 + adhesionGap)}
            width="200"
            height="14"
            rx="3"
            fill={zoneColor + (i === 3 ? "aa" : "55")}
            stroke={zoneColor + "88"}
            strokeWidth="1"
          />
        ))}
        {adhesionGap > 3 && (
          <g>
            <text x="320" y="50" fill={colors.tooLow} fontSize="12" fontFamily="Space Grotesk">
              ← weak bond
            </text>
            <text x="320" y="70" fill={colors.tooLow} fontSize="12" fontFamily="Space Grotesk">
              ← gaps
            </text>
          </g>
        )}
        {adhesionGap < 1 && value > 0.4 && value < 0.6 && (
          <text x="320" y="60" fill={colors.correct} fontSize="12" fontFamily="Space Grotesk">
            ← strong bond
          </text>
        )}
      </g>

      {/* Temperature tower concept */}
      <g transform="translate(480, 340)">
        <text x="60" y="0" textAnchor="middle" fill={colors.muted} fontSize="13" fontFamily="Space Grotesk">
          Temp tower
        </text>
        {[0, 1, 2, 3, 4].map((i) => {
          const blockTemp = 240 - i * 10;
          const isActive = Math.abs(blockTemp - temp) < 6;
          return (
            <g key={i}>
              <rect
                x="20"
                y={15 + i * 35}
                width="80"
                height="30"
                rx="3"
                fill={isActive ? zoneColor + "44" : colors.deepBlue}
                stroke={isActive ? zoneColor : colors.muted + "33"}
                strokeWidth={isActive ? 2 : 1}
              />
              <text
                x="60"
                y={35 + i * 35}
                textAnchor="middle"
                fill={isActive ? zoneColor : colors.muted + "66"}
                fontSize="13"
                fontWeight={isActive ? "bold" : "normal"}
                fontFamily="Space Grotesk"
              >
                {blockTemp}°C
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
};

export const ExtrusionTemp: React.FC = () => (
  <CalibrationVar
    index={1}
    category="Filament-Specific"
    title="Extrusion Temperature"
    description="Hotend temperature for optimal melt. Too cold and the filament won't flow properly. Too hot and it oozes, strings, and degrades."
    unit="°C"
    rangeLabels={{ min: "180°C (cold)", correct: "200–220°C (PLA)", max: "260°C (hot)" }}
    impacts={{
      low: "Under-extrusion, poor layer adhesion, clogging. Filament not fully melted.",
      correct: "Smooth flow, strong layer bonds, clean surfaces. Optimal melt viscosity.",
      high: "Stringing, oozing, discoloration. Filament degrades and drools between moves.",
    }}
    dependencies={["E-Steps"]}
    note="Every filament brand/color can have a different sweet spot. Always re-test."
    renderDiagram={(v) => <ExtrusionTempDiagram value={v} />}
  />
);
