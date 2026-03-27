import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { CalibrationVar, getZoneColor } from "../../components/CalibrationVar";
import { colors } from "../../brand";

/**
 * Diagram: Flow rate gauge showing actual vs. commanded extrusion.
 * Slider controls how close to the flow limit you're pushing:
 *   0.0 = way below limit — wasting speed potential
 *   0.5 = at the sweet spot — near max but reliable
 *   1.0 = exceeding limit — extruder can't keep up
 */
const MaxVolFlowDiagram: React.FC<{ value: number }> = ({ value }) => {
  const frame = useCurrentFrame();
  const zoneColor = getZoneColor(value);

  const maxFlow = 12; // mm³/s for a standard hotend
  const commandedFlow = interpolate(value, [0, 0.5, 1], [4, 11, 20]);
  const actualFlow = Math.min(commandedFlow, maxFlow + interpolate(value, [0.7, 1], [0, -2], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const deficit = commandedFlow - actualFlow;

  // Gauge
  const gaugeWidth = 400;
  const commandedWidth = (commandedFlow / 25) * gaugeWidth;
  const actualWidth = (actualFlow / 25) * gaugeWidth;
  const maxLine = (maxFlow / 25) * gaugeWidth;

  // Extruder gear skipping for exceeded flow
  const skipping = interpolate(value, [0.75, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const skipAngle = skipping > 0 ? Math.sin(frame * 0.3) * 15 * skipping : 0;

  return (
    <svg width="700" height="580" viewBox="0 0 700 580">
      {/* Flow rate display */}
      <g transform="translate(350, 25)">
        <text x="-120" y="0" textAnchor="middle" fill={colors.muted} fontSize="13" fontFamily="Space Grotesk">COMMANDED</text>
        <text x="-120" y="24" textAnchor="middle" fill={zoneColor} fontSize="24" fontWeight="bold" fontFamily="Space Grotesk">
          {commandedFlow.toFixed(1)} mm³/s
        </text>
        <text x="120" y="0" textAnchor="middle" fill={colors.muted} fontSize="13" fontFamily="Space Grotesk">ACTUAL</text>
        <text x="120" y="24" textAnchor="middle" fill={deficit > 0.5 ? colors.tooHigh : colors.correct} fontSize="24" fontWeight="bold" fontFamily="Space Grotesk">
          {actualFlow.toFixed(1)} mm³/s
        </text>
      </g>

      {/* Flow gauge bar */}
      <g transform="translate(140, 75)">
        <text x={gaugeWidth / 2} y="0" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          Volumetric flow
        </text>

        {/* Background */}
        <rect x="0" y="15" width={gaugeWidth} height="35" rx="6" fill={colors.deepBlue} stroke={colors.muted + "33"} strokeWidth="1" />

        {/* Actual flow bar */}
        <rect x="0" y="15" width={actualWidth} height="35" rx="6" fill={zoneColor + "55"} />

        {/* Commanded flow bar (outline only if exceeding actual) */}
        {deficit > 0.5 && (
          <rect x={actualWidth} y="15" width={commandedWidth - actualWidth} height="35" rx="6" fill={colors.tooHigh + "22"} stroke={colors.tooHigh} strokeWidth="1.5" strokeDasharray="4,3" />
        )}

        {/* Max flow line */}
        <line x1={maxLine} y1="10" x2={maxLine} y2="55" stroke={colors.accentAmber} strokeWidth="2.5" />
        <text x={maxLine} y="70" textAnchor="middle" fill={colors.accentAmber} fontSize="13" fontWeight="bold" fontFamily="Space Grotesk">
          MAX: {maxFlow} mm³/s
        </text>

        {/* Scale ticks */}
        {[0, 5, 10, 15, 20, 25].map((v) => (
          <g key={v}>
            <line x1={(v / 25) * gaugeWidth} y1="50" x2={(v / 25) * gaugeWidth} y2="58" stroke={colors.muted + "44"} strokeWidth="1" />
            <text x={(v / 25) * gaugeWidth} y="70" textAnchor="middle" fill={colors.muted + "66"} fontSize="10" fontFamily="Space Grotesk">{v}</text>
          </g>
        ))}

        {/* Deficit label */}
        {deficit > 0.5 && (
          <text x={(actualWidth + commandedWidth) / 2} y="37" textAnchor="middle" fill={colors.tooHigh} fontSize="12" fontWeight="bold" fontFamily="Space Grotesk">
            −{deficit.toFixed(1)}
          </text>
        )}
      </g>

      {/* Extruder with roller encoder */}
      <g transform="translate(180, 180)">
        <text x="160" y="0" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          Extruder gear + roller encoder
        </text>

        {/* Extruder body */}
        <rect x="100" y="20" width="120" height="130" rx="8" fill={colors.darkBlue} stroke={colors.muted + "44"} strokeWidth="1.5" />

        {/* Drive gear with potential skipping */}
        <g transform={`translate(140, 70) rotate(${frame * 3 + skipAngle})`}>
          <circle r="22" fill="none" stroke={colors.accentAmber} strokeWidth="3" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <line key={a} x1={Math.cos(a * Math.PI / 180) * 16} y1={Math.sin(a * Math.PI / 180) * 16} x2={Math.cos(a * Math.PI / 180) * 22} y2={Math.sin(a * Math.PI / 180) * 22} stroke={colors.accentAmber} strokeWidth="2.5" />
          ))}
        </g>

        {/* Filament */}
        <rect x="156" y="20" width="8" height="130" fill={colors.lightBlue} rx="2" />

        {/* Roller encoder (monitoring actual movement) */}
        <g transform="translate(185, 60)">
          <circle r="12" fill="none" stroke={colors.correct} strokeWidth="2" />
          <text x="0" y="4" textAnchor="middle" fill={colors.correct} fontSize="8" fontFamily="Space Grotesk">ENC</text>
          <line x1="12" y1="0" x2="30" y2="0" stroke={colors.correct} strokeWidth="1.5" strokeDasharray="3,3" />
          <text x="35" y="4" fill={colors.correct} fontSize="10" fontFamily="Space Grotesk">
            {actualFlow.toFixed(1)}
          </text>
        </g>

        {/* Skipping indicator */}
        {skipping > 0.3 && (
          <g>
            <text x="160" y="165" textAnchor="middle" fill={colors.tooHigh} fontSize="14" fontWeight="bold" fontFamily="Space Grotesk">
              GEAR SKIPPING
            </text>
            {/* Click marks */}
            {[0, 1, 2].map((i) => (
              <line key={i} x1={130 + i * 20} y1="170" x2={135 + i * 20} y2="180" stroke={colors.tooHigh} strokeWidth="2" />
            ))}
          </g>
        )}
      </g>

      {/* Print quality comparison */}
      <g transform="translate(100, 430)">
        <text x="250" y="0" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          Deposited layers (cross-section)
        </text>

        {/* Layers — consistent if within limit, inconsistent if exceeded */}
        {Array.from({ length: 5 }, (_, i) => {
          const layerFlow = deficit > 0.5
            ? actualFlow / commandedFlow // under-extruded
            : 1;
          const layerWidth = 350 * layerFlow;
          const wobble = deficit > 0.5 ? (Math.sin(i * 2.5) * deficit * 3) : 0;
          return (
            <rect
              key={i}
              x={250 - layerWidth / 2 + wobble}
              y={15 + i * 20}
              width={layerWidth}
              height={16}
              rx="3"
              fill={zoneColor + (i === 4 ? "88" : "44")}
              stroke={zoneColor + "66"}
              strokeWidth="1"
            />
          );
        })}

        {deficit > 1 && (
          <text x="250" y="130" textAnchor="middle" fill={colors.tooHigh} fontSize="13" fontFamily="Space Grotesk">
            inconsistent layers — extruder can't keep up
          </text>
        )}
        {value < 0.2 && (
          <text x="250" y="130" textAnchor="middle" fill={colors.tooLow} fontSize="13" fontFamily="Space Grotesk">
            consistent but printing much slower than needed
          </text>
        )}
      </g>
    </svg>
  );
};

export const MaxVolumetricFlow: React.FC = () => (
  <CalibrationVar
    index={5}
    category="Filament-Specific"
    title="Max Volumetric Flow"
    description="Maximum mm³/s the hotend can reliably melt and push through. This is the ceiling for all speed calculations."
    unit="mm³/s"
    rangeLabels={{ min: "4 (under-utilizing)", correct: "10–12 (standard)", max: "20+ (exceeding)" }}
    impacts={{
      low: "Printing much slower than your hardware allows. No quality benefit.",
      correct: "Near the limit but reliable. Fast prints with consistent extrusion.",
      high: "Extruder skips, under-extrusion, inconsistent layers. Hotend can't melt fast enough.",
    }}
    dependencies={["Extrusion Temp"]}
    note="Higher temp = higher flow capacity. High-flow hotends push 25+ mm³/s."
    renderDiagram={(v) => <MaxVolFlowDiagram value={v} />}
  />
);
