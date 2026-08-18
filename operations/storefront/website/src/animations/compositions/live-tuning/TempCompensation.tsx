import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { CalibrationVar, getZoneColor } from "../../components/CalibrationVar";
import { colors } from "../../brand";

/**
 * Diagram: Temperature graph over a long print showing drift.
 * Ambient temp changes, heat creep develops — system compensates.
 * Slider controls compensation:
 *   0.0 = no compensation — temp drifts, extrusion changes
 *   0.5 = active compensation — adjusts to maintain consistent melt
 *   1.0 = over-compensating — oscillation from feedback loop
 */
const TempCompDiagram: React.FC<{ value: number }> = ({ value }) => {
  const frame = useCurrentFrame();
  const zoneColor = getZoneColor(value);

  const compensationStrength = interpolate(value, [0, 0.5, 1], [0, 1, 2.5]);

  const graphX = 60;
  const graphY = 70;
  const graphWidth = 560;
  const graphHeight = 160;
  const targetTemp = 210;

  // Simulated print time in hours
  const printHours = 8;

  // Ambient temperature drift (room warms up during day, cools at night)
  const ambientDrift = (t: number) => Math.sin(t * Math.PI * 2) * 5 + Math.cos(t * Math.PI * 0.7) * 3;

  // Heat creep (gradual temperature increase in heatbreak over time)
  const heatCreep = (t: number) => t * 4;

  return (
    <svg width="700" height="580" viewBox="0 0 700 580">
      {/* Title */}
      <g transform="translate(350, 25)">
        <text x="0" y="0" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          TEMPERATURE COMPENSATION
        </text>
        <text x="0" y="28" textAnchor="middle" fill={zoneColor} fontSize="26" fontWeight="bold" fontFamily="Space Grotesk">
          {value < 0.3 ? "No compensation" : value > 0.7 ? "Over-compensating" : "Active compensation"}
        </text>
      </g>

      {/* Main temperature graph */}
      <g>
        <text x={graphX + graphWidth / 2} y={graphY - 10} textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          Hotend temperature over {printHours}h print
        </text>

        <rect x={graphX} y={graphY} width={graphWidth} height={graphHeight} rx="6" fill={colors.deepBlue + "88"} />

        {/* Target line */}
        <line x1={graphX} y1={graphY + graphHeight / 2} x2={graphX + graphWidth} y2={graphY + graphHeight / 2} stroke={colors.correct + "44"} strokeWidth="1.5" strokeDasharray="6,4" />
        <text x={graphX + graphWidth + 5} y={graphY + graphHeight / 2 + 4} fill={colors.correct} fontSize="12" fontFamily="Space Grotesk">
          {targetTemp}°C
        </text>

        {/* Tolerance band */}
        <rect x={graphX} y={graphY + graphHeight / 2 - 8} width={graphWidth} height="16" fill={colors.correct + "0a"} />

        {/* Actual temperature curve */}
        {(() => {
          const points: string[] = [];
          for (let i = 0; i <= graphWidth; i += 2) {
            const t = i / graphWidth; // 0 to 1 over full print

            // Disturbances
            const ambient = ambientDrift(t);
            const creep = heatCreep(t);
            const totalDisturbance = ambient + creep;

            // Compensation response
            let compensation;
            if (compensationStrength === 0) {
              compensation = 0;
            } else if (compensationStrength <= 1) {
              // Good: smooth correction, slight lag
              compensation = totalDisturbance * compensationStrength * 0.9;
            } else {
              // Over-compensating: oscillation
              const overshoot = Math.sin(t * 60) * (compensationStrength - 1) * 8;
              compensation = totalDisturbance * 0.9 + overshoot;
            }

            const deviation = totalDisturbance - compensation;
            const y = graphY + graphHeight / 2 - deviation * 3;
            points.push(`${graphX + i},${y}`);
          }
          return (
            <polyline points={points.join(" ")} fill="none" stroke={zoneColor} strokeWidth="2.5" strokeLinejoin="round" />
          );
        })()}

        {/* Time axis */}
        {Array.from({ length: 9 }, (_, i) => (
          <g key={i}>
            <line x1={graphX + (i / 8) * graphWidth} y1={graphY + graphHeight} x2={graphX + (i / 8) * graphWidth} y2={graphY + graphHeight + 5} stroke={colors.muted + "44"} strokeWidth="1" />
            <text x={graphX + (i / 8) * graphWidth} y={graphY + graphHeight + 18} textAnchor="middle" fill={colors.muted + "66"} fontSize="10" fontFamily="Space Grotesk">
              {i}h
            </text>
          </g>
        ))}
      </g>

      {/* Disturbance sources */}
      <g transform="translate(60, 280)">
        <text x="280" y="0" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          Sources of temperature drift
        </text>

        {/* Ambient temp */}
        <g transform="translate(0, 20)">
          <rect x="0" y="0" width="260" height="70" rx="6" fill={colors.deepBlue} stroke={colors.muted + "33"} strokeWidth="1" />
          <text x="130" y="22" textAnchor="middle" fill={colors.skyBlue} fontSize="14" fontWeight="600" fontFamily="Space Grotesk">
            Ambient Temperature
          </text>
          <text x="130" y="42" textAnchor="middle" fill={colors.muted} fontSize="12" fontFamily="Space Grotesk">
            Room warms during day, cools at night
          </text>
          <text x="130" y="58" textAnchor="middle" fill={colors.muted} fontSize="11" fontFamily="Space Grotesk">
            ±5°C swing over hours
          </text>
        </g>

        {/* Heat creep */}
        <g transform="translate(280, 20)">
          <rect x="0" y="0" width="260" height="70" rx="6" fill={colors.deepBlue} stroke={colors.muted + "33"} strokeWidth="1" />
          <text x="130" y="22" textAnchor="middle" fill={colors.tooHigh + "cc"} fontSize="14" fontWeight="600" fontFamily="Space Grotesk">
            Heat Creep
          </text>
          <text x="130" y="42" textAnchor="middle" fill={colors.muted} fontSize="12" fontFamily="Space Grotesk">
            Heat slowly travels up heatbreak
          </text>
          <text x="130" y="58" textAnchor="middle" fill={colors.muted} fontSize="11" fontFamily="Space Grotesk">
            +3-4°C effective over long prints
          </text>
        </g>
      </g>

      {/* Extrusion consistency comparison */}
      <g transform="translate(60, 410)">
        <text x="280" y="0" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          Extrusion consistency — hour 1 vs. hour 7
        </text>

        {/* Hour 1 (always fine) */}
        <g transform="translate(0, 20)">
          <text x="130" y="12" textAnchor="middle" fill={colors.muted} fontSize="12" fontFamily="Space Grotesk">Hour 1</text>
          <rect x="30" y="20" width="200" height="12" rx="6" fill={colors.correct + "44"} stroke={colors.correct} strokeWidth="1.5" />
        </g>

        {/* Hour 7 (depends on compensation) */}
        <g transform="translate(280, 20)">
          <text x="130" y="12" textAnchor="middle" fill={colors.muted} fontSize="12" fontFamily="Space Grotesk">Hour 7</text>
          {(() => {
            if (value < 0.3) {
              // No compensation: inconsistent
              return (
                <>
                  {Array.from({ length: 10 }, (_, i) => (
                    <rect key={i} x={30 + i * 20} y="20" width={14 + Math.sin(i) * 4} height={12 + Math.sin(i * 2) * 4} rx="3" fill={colors.tooLow + "44"} stroke={colors.tooLow} strokeWidth="1" />
                  ))}
                  <text x="130" y="50" textAnchor="middle" fill={colors.tooLow} fontSize="11" fontFamily="Space Grotesk">
                    inconsistent — temp drifted
                  </text>
                </>
              );
            } else if (value > 0.7) {
              // Over-compensating: wavy
              const pts: string[] = [];
              for (let i = 0; i < 200; i += 2) {
                pts.push(`${30 + i},${26 + Math.sin(i * 0.3) * 4}`);
              }
              return (
                <>
                  <polyline points={pts.join(" ")} fill="none" stroke={colors.tooHigh} strokeWidth="3" />
                  <text x="130" y="50" textAnchor="middle" fill={colors.tooHigh} fontSize="11" fontFamily="Space Grotesk">
                    oscillating — over-correcting
                  </text>
                </>
              );
            } else {
              return (
                <>
                  <rect x="30" y="20" width="200" height="12" rx="6" fill={colors.correct + "44"} stroke={colors.correct} strokeWidth="1.5" />
                  <text x="130" y="50" textAnchor="middle" fill={colors.correct} fontSize="11" fontFamily="Space Grotesk">
                    consistent — compensated
                  </text>
                </>
              );
            }
          })()}
        </g>
      </g>

      {/* Print time indicator */}
      <g transform="translate(60, 510)">
        <text x="280" y="0" textAnchor="middle" fill={colors.muted} fontSize="12" fontFamily="Space Grotesk">
          This matters most on long prints (4h+). Short prints rarely see significant drift.
        </text>
      </g>
    </svg>
  );
};

export const TempCompensation: React.FC = () => (
  <CalibrationVar
    index={2}
    category="Live Tuning"
    title="Temperature Compensation"
    description="Adjusts hotend and bed temperature during print to counteract ambient changes and heat creep. Keeps melt behavior consistent from hour 1 to hour 8."
    unit="dynamic °C"
    rangeLabels={{ min: "No adjustment", correct: "Active correction", max: "Over-correcting" }}
    impacts={{
      low: "Temperature drifts over long prints. Extrusion changes, layer adhesion varies, surface inconsistency.",
      correct: "Consistent melt behavior from start to finish. Long prints match short-print quality.",
      high: "Feedback loop oscillation. Temperature hunts around target, surface shows periodic artifacts.",
    }}
    dependencies={["PID Tuning"]}
    note="Most impactful on prints >4 hours. Short prints rarely need this."
    renderDiagram={(v) => <TempCompDiagram value={v} />}
  />
);
