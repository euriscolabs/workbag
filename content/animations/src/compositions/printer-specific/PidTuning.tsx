import React from "react";
import { interpolate } from "remotion";
import { CalibrationVar, getZoneColor } from "../../components/CalibrationVar";
import { colors } from "../../brand";

/**
 * Diagram: Temperature over time graph.
 * Slider value controls PID quality:
 *   0.0 = bad PID — large oscillations around target
 *   0.5 = good PID — tight, stable line at target
 *   1.0 = overshoot — spikes on heat-up, ringing
 */
const PidDiagram: React.FC<{ value: number }> = ({ value }) => {
  const zoneColor = getZoneColor(value);

  // Oscillation amplitude based on slider
  const amplitude = interpolate(value, [0, 0.5, 1], [40, 2, 25]);
  // Frequency of oscillation
  const frequency = interpolate(value, [0, 0.5, 1], [0.08, 0.15, 0.12]);

  const targetY = 200;
  const graphWidth = 580;
  const graphHeight = 300;
  const graphX = 80;
  const graphY = 60;
  const points: string[] = [];

  for (let i = 0; i <= graphWidth; i += 2) {
    const t = i / graphWidth;
    // Damping factor — bad PID doesn't damp, good PID damps fast
    const damping = interpolate(value, [0, 0.5, 1], [0.3, 5, 1.5]);
    const decay = Math.exp(-damping * t);
    const oscillation = Math.sin(t * graphWidth * frequency) * amplitude * decay;
    // Overshoot has initial spike
    const overshoot = value > 0.7 ? Math.exp(-t * 8) * 50 * (value - 0.5) : 0;
    const y = targetY - oscillation - overshoot;
    points.push(`${graphX + i},${graphY + y}`);
  }

  return (
    <svg width="700" height="500" viewBox="0 0 700 500">
      {/* Graph background */}
      <rect x={graphX} y={graphY} width={graphWidth} height={graphHeight} fill={colors.deepBlue + "88"} rx="8" />

      {/* Target temperature line */}
      <line
        x1={graphX}
        y1={graphY + targetY}
        x2={graphX + graphWidth}
        y2={graphY + targetY}
        stroke={colors.correct}
        strokeWidth="2"
        strokeDasharray="8,6"
      />
      <text
        x={graphX + graphWidth + 8}
        y={graphY + targetY + 5}
        fill={colors.correct}
        fontSize="14"
        fontFamily="Space Grotesk"
      >
        200°C
      </text>

      {/* Tolerance band (±0.5°C = good, shown as thin band) */}
      <rect
        x={graphX}
        y={graphY + targetY - 4}
        width={graphWidth}
        height={8}
        fill={colors.correct + "22"}
      />

      {/* ±5°C band (bad PID oscillation range) */}
      <rect
        x={graphX}
        y={graphY + targetY - 40}
        width={graphWidth}
        height={80}
        fill={colors.tooLow + "0a"}
      />

      {/* Temperature curve */}
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke={zoneColor}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Oscillation range indicator */}
      {amplitude > 5 && (
        <g>
          <line
            x1={graphX - 20}
            y1={graphY + targetY - amplitude}
            x2={graphX - 20}
            y2={graphY + targetY + amplitude}
            stroke={zoneColor}
            strokeWidth="2"
          />
          <text
            x={graphX - 25}
            y={graphY + targetY}
            textAnchor="end"
            fill={zoneColor}
            fontSize="13"
            fontFamily="Space Grotesk"
          >
            ±{(amplitude / 8).toFixed(1)}°C
          </text>
        </g>
      )}

      {/* Axis labels */}
      <text x={graphX + graphWidth / 2} y={graphY + graphHeight + 30} textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
        Time →
      </text>
      <text x={graphX - 40} y={graphY + graphHeight / 2} textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk" transform={`rotate(-90, ${graphX - 40}, ${graphY + graphHeight / 2})`}>
        Temperature
      </text>

      {/* Extrusion quality indicator at bottom */}
      <g transform={`translate(${graphX + 40}, ${graphY + graphHeight + 55})`}>
        <text x="0" y="0" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          Extrusion consistency:
        </text>
        {/* Simulated extrusion line — waviness matches PID quality */}
        {(() => {
          const extPoints: string[] = [];
          for (let i = 0; i < 300; i += 2) {
            const waviness = amplitude * 0.15;
            const y = Math.sin(i * 0.1) * waviness;
            extPoints.push(`${200 + i},${y}`);
          }
          return (
            <polyline
              points={extPoints.join(" ")}
              fill="none"
              stroke={zoneColor}
              strokeWidth={interpolate(value, [0, 0.5, 1], [4, 3, 4])}
              strokeLinejoin="round"
              transform="translate(0, 0)"
            />
          );
        })()}
      </g>
    </svg>
  );
};

export const PidTuning: React.FC = () => (
  <CalibrationVar
    index={3}
    category="Printer-Specific"
    title="PID Tuning"
    description="Control loop for hotend and bed heaters. Determines how accurately temperature is held at the target."
    unit="Kp / Ki / Kd"
    rangeLabels={{ min: "Oscillating", correct: "±0.5°C", max: "Overshoot" }}
    impacts={{
      low: "Temperature swings ±5-10°C. Inconsistent extrusion, stringing, weak layers.",
      correct: "Rock-steady temperature within ±0.5°C. Consistent melt and flow.",
      high: "Temperature spikes on heat-up, slow ringing. Oozing and degradation.",
    }}
    dependencies={[]}
    note="Already automatable via M303 G-code. Independent thermal control loop."
    renderDiagram={(v) => <PidDiagram value={v} />}
  />
);
