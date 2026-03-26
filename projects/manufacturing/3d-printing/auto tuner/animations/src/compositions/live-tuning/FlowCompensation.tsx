import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { CalibrationVar, getZoneColor } from "../../components/CalibrationVar";
import { colors } from "../../brand";

/**
 * Diagram: Roller encoder monitoring filament movement in real-time.
 * Shows commanded vs. actual flow, with live correction.
 * Slider controls compensation:
 *   0.0 = no monitoring — slip/grind goes undetected
 *   0.5 = active monitoring + correction
 *   1.0 = over-correcting — oscillation in flow rate
 */
const FlowCompDiagram: React.FC<{ value: number }> = ({ value }) => {
  const frame = useCurrentFrame();
  const zoneColor = getZoneColor(value);

  const compensation = interpolate(value, [0, 0.5, 1], [0, 1, 2]);

  const graphX = 60;
  const graphY = 60;
  const graphWidth = 560;
  const graphHeight = 130;

  // Simulated flow events
  // Slip event at ~30% through, grind at ~70%
  const slipEvent = (t: number) => {
    const dist = Math.abs(t - 0.3);
    return dist < 0.05 ? (1 - dist / 0.05) * 0.3 : 0;
  };
  const grindEvent = (t: number) => {
    const dist = Math.abs(t - 0.7);
    return dist < 0.08 ? (1 - dist / 0.08) * 0.2 : 0;
  };

  return (
    <svg width="700" height="580" viewBox="0 0 700 580">
      {/* Title */}
      <g transform="translate(350, 25)">
        <text x="0" y="0" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          FLOW COMPENSATION
        </text>
        <text x="0" y="28" textAnchor="middle" fill={zoneColor} fontSize="26" fontWeight="bold" fontFamily="Space Grotesk">
          {value < 0.3 ? "Unmonitored" : value > 0.7 ? "Over-correcting" : "Active correction"}
        </text>
      </g>

      {/* Commanded vs Actual flow graph */}
      <g>
        <text x={graphX + graphWidth / 2} y={graphY - 8} textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          Commanded vs. actual filament flow
        </text>

        <rect x={graphX} y={graphY} width={graphWidth} height={graphHeight} rx="6" fill={colors.deepBlue + "88"} />

        {/* Commanded flow (steady line) */}
        <line x1={graphX} y1={graphY + 30} x2={graphX + graphWidth} y2={graphY + 30} stroke={colors.lightBlue + "66"} strokeWidth="2" strokeDasharray="6,4" />
        <text x={graphX + graphWidth + 5} y={graphY + 34} fill={colors.lightBlue} fontSize="11" fontFamily="Space Grotesk">cmd</text>

        {/* Actual flow (with events) */}
        {(() => {
          const points: string[] = [];
          for (let i = 0; i <= graphWidth; i += 2) {
            const t = i / graphWidth;
            const slip = slipEvent(t);
            const grind = grindEvent(t);
            const totalDrop = slip + grind;

            let corrected;
            if (compensation === 0) {
              corrected = 0;
            } else if (compensation <= 1) {
              corrected = totalDrop * compensation * 0.85;
            } else {
              const overshoot = Math.sin(t * 80) * (compensation - 1) * 0.1;
              corrected = totalDrop * 0.85 + overshoot;
            }

            const deviation = totalDrop - corrected;
            const y = graphY + 30 + deviation * graphHeight * 1.5;
            points.push(`${graphX + i},${y}`);
          }
          return (
            <polyline points={points.join(" ")} fill="none" stroke={zoneColor} strokeWidth="2.5" strokeLinejoin="round" />
          );
        })()}

        {/* Event markers */}
        <g>
          <line x1={graphX + graphWidth * 0.3} y1={graphY} x2={graphX + graphWidth * 0.3} y2={graphY + graphHeight} stroke={colors.accentAmber + "44"} strokeWidth="1" strokeDasharray="3,3" />
          <text x={graphX + graphWidth * 0.3} y={graphY + graphHeight + 14} textAnchor="middle" fill={colors.accentAmber} fontSize="10" fontFamily="Space Grotesk">
            slip event
          </text>
        </g>
        <g>
          <line x1={graphX + graphWidth * 0.7} y1={graphY} x2={graphX + graphWidth * 0.7} y2={graphY + graphHeight} stroke={colors.tooHigh + "44"} strokeWidth="1" strokeDasharray="3,3" />
          <text x={graphX + graphWidth * 0.7} y={graphY + graphHeight + 14} textAnchor="middle" fill={colors.tooHigh} fontSize="10" fontFamily="Space Grotesk">
            partial grind
          </text>
        </g>
      </g>

      {/* Encoder hardware diagram */}
      <g transform="translate(100, 240)">
        <text x="250" y="0" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          Roller encoder — inline filament monitor
        </text>

        {/* Filament path */}
        <rect x="220" y="20" width="8" height="130" fill={colors.lightBlue} rx="2" />

        {/* Extruder gear (top) */}
        <g transform={`translate(224, 50) rotate(${frame * 3})`}>
          <circle r="18" fill="none" stroke={colors.accentAmber} strokeWidth="2.5" />
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <line key={a} x1={Math.cos(a * Math.PI / 180) * 13} y1={Math.sin(a * Math.PI / 180) * 13} x2={Math.cos(a * Math.PI / 180) * 18} y2={Math.sin(a * Math.PI / 180) * 18} stroke={colors.accentAmber} strokeWidth="2" />
          ))}
        </g>
        <text x="260" y="55" fill={colors.muted} fontSize="11" fontFamily="Space Grotesk">Drive gear</text>
        <text x="260" y="68" fill={colors.muted} fontSize="10" fontFamily="Space Grotesk">(commanded)</text>

        {/* Roller encoder (below) */}
        <g transform={`translate(224, 110) rotate(${frame * 3 * (1 - slipEvent(frame / 240) - grindEvent(frame / 240))})`}>
          <circle r="14" fill="none" stroke={colors.correct} strokeWidth="2.5" />
          {[0, 90, 180, 270].map((a) => (
            <line key={a} x1={Math.cos(a * Math.PI / 180) * 8} y1={Math.sin(a * Math.PI / 180) * 8} x2={Math.cos(a * Math.PI / 180) * 14} y2={Math.sin(a * Math.PI / 180) * 14} stroke={colors.correct} strokeWidth="2" />
          ))}
        </g>
        <text x="260" y="115" fill={colors.correct} fontSize="11" fontFamily="Space Grotesk">Roller encoder</text>
        <text x="260" y="128" fill={colors.correct} fontSize="10" fontFamily="Space Grotesk">(actual movement)</text>

        {/* Comparison box */}
        <rect x="340" y="60" width="150" height="60" rx="6"
          fill={compensation > 0.3 ? zoneColor + "18" : colors.deepBlue}
          stroke={compensation > 0.3 ? zoneColor + "44" : colors.muted + "22"}
          strokeWidth="1.5"
        />
        <text x="415" y="82" textAnchor="middle" fill={colors.text} fontSize="13" fontWeight="600" fontFamily="Space Grotesk">
          Compare
        </text>
        <text x="415" y="100" textAnchor="middle" fill={colors.muted} fontSize="11" fontFamily="Space Grotesk">
          cmd ≠ actual → correct
        </text>

        {/* Arrows */}
        <line x1="260" y1="55" x2="340" y2="80" stroke={colors.muted + "44"} strokeWidth="1.5" />
        <line x1="260" y1="115" x2="340" y2="100" stroke={colors.muted + "44"} strokeWidth="1.5" />
      </g>

      {/* Print result comparison */}
      <g transform="translate(60, 430)">
        <text x="280" y="0" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          Print result during slip event
        </text>

        {/* Layers deposited — some thin without compensation */}
        {Array.from({ length: 8 }, (_, i) => {
          const isSlipLayer = i >= 3 && i <= 5;
          let width;
          if (!isSlipLayer) {
            width = 200;
          } else if (compensation < 0.3) {
            width = 200 - (i - 2) * 25; // progressively thinner
          } else if (compensation > 1.5) {
            width = 200 + Math.sin(i) * 20; // oscillating
          } else {
            width = 200 - (i - 2) * 3; // barely noticeable
          }

          const layerColor = isSlipLayer
            ? (compensation < 0.3 ? colors.tooLow : compensation > 1.5 ? colors.tooHigh : colors.correct)
            : zoneColor;

          return (
            <rect
              key={i}
              x={280 - width / 2}
              y={20 + i * 16}
              width={width}
              height="13"
              rx="3"
              fill={layerColor + "44"}
              stroke={layerColor + "88"}
              strokeWidth="1"
            />
          );
        })}

        {value < 0.3 && (
          <text x="420" y="80" fill={colors.tooLow} fontSize="12" fontFamily="Space Grotesk">
            ← thin layers (undetected slip)
          </text>
        )}
        {value > 0.35 && value < 0.65 && (
          <text x="420" y="80" fill={colors.correct} fontSize="12" fontFamily="Space Grotesk">
            ← corrected in real-time
          </text>
        )}
      </g>
    </svg>
  );
};

export const FlowCompensation: React.FC = () => (
  <CalibrationVar
    index={3}
    category="Live Tuning"
    title="Flow Compensation"
    description="Real-time extrusion rate correction using a roller encoder. Detects actual filament movement vs. commanded, and adjusts on the fly."
    unit="dynamic mm³/s"
    rangeLabels={{ min: "Unmonitored", correct: "Active correction", max: "Over-correcting" }}
    impacts={{
      low: "Slip and grind events go undetected. Thin layers, weak spots, invisible defects.",
      correct: "Slip detected instantly, flow increased to compensate. Consistent layers throughout.",
      high: "Feedback loop oscillation. Flow rate hunts, layers alternate thick/thin.",
    }}
    dependencies={["E-Steps", "Max Volumetric Flow"]}
    note="The roller encoder is the key sensor — cheap, accurate, and inline."
    renderDiagram={(v) => <FlowCompDiagram value={v} />}
  />
);
