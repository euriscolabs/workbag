import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { CalibrationVar, getZoneColor } from "../../components/CalibrationVar";
import { colors } from "../../brand";

/**
 * Diagram: Toolhead moving along a path with speed ramp.
 * Slider controls max accel/velocity limits:
 *   0.0 = too conservative — slow trapezoidal profile
 *   0.5 = optimal — fast but within hardware limits
 *   1.0 = too aggressive — overshoot, layer shifts shown
 */
const AccelDiagram: React.FC<{ value: number }> = ({ value }) => {
  const frame = useCurrentFrame();
  const zoneColor = getZoneColor(value);

  // Speed profile parameters
  const maxSpeed = interpolate(value, [0, 0.5, 1], [80, 300, 500]);
  const accel = interpolate(value, [0, 0.5, 1], [500, 5000, 12000]);

  // Time to reach max speed
  const rampTime = maxSpeed / accel;
  const graphWidth = 480;
  const graphHeight = 140;
  const gx = 100;
  const gy = 60;

  // Generate speed profile (trapezoid)
  const speedPoints: string[] = [];
  for (let i = 0; i <= graphWidth; i += 2) {
    const t = i / graphWidth;
    let speed;
    if (t < 0.2) {
      speed = Math.min(t / 0.2 * maxSpeed, maxSpeed);
    } else if (t < 0.6) {
      speed = maxSpeed;
    } else if (t < 0.8) {
      speed = maxSpeed * (1 - (t - 0.6) / 0.2);
    } else {
      speed = 0;
    }
    // Add overshoot oscillation for too-aggressive
    if (value > 0.7) {
      const overshoot = interpolate(value, [0.7, 1], [0, 15]);
      speed += Math.sin(t * 40) * overshoot * Math.exp(-t * 5);
    }
    const y = gy + graphHeight - (speed / 500) * graphHeight;
    speedPoints.push(`${gx + i},${y}`);
  }

  // Toolhead position along print path
  const toolheadProgress = interpolate(frame, [0, 240], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Print path (L-shape to show corner behavior)
  const pathStartX = 100;
  const pathStartY = 350;
  const pathMidX = 400;
  const pathEndX = 400;
  const pathEndY = 500;

  // Layer shift for too-aggressive settings
  const layerShift = interpolate(value, [0.7, 1], [0, 12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Print time indicator
  const printTime = interpolate(value, [0, 0.5, 1], [45, 12, 6]);

  return (
    <svg width="700" height="550" viewBox="0 0 700 550">
      {/* Speed profile graph */}
      <text x={gx + graphWidth / 2} y="40" textAnchor="middle" fill={colors.muted} fontSize="16" fontFamily="Space Grotesk">
        Speed profile
      </text>

      <rect x={gx} y={gy} width={graphWidth} height={graphHeight} fill={colors.deepBlue + "88"} rx="6" />

      {/* Speed curve */}
      <polyline points={speedPoints.join(" ")} fill="none" stroke={zoneColor} strokeWidth="3" strokeLinejoin="round" />

      {/* Max speed label */}
      <line x1={gx} y1={gy} x2={gx + graphWidth} y2={gy} stroke={colors.muted + "33"} strokeWidth="1" strokeDasharray="4,4" />
      <text x={gx - 8} y={gy + 5} textAnchor="end" fill={colors.muted} fontSize="12" fontFamily="Space Grotesk">
        500
      </text>

      {/* Current max speed indicator */}
      <line
        x1={gx}
        y1={gy + graphHeight - (maxSpeed / 500) * graphHeight}
        x2={gx + graphWidth}
        y2={gy + graphHeight - (maxSpeed / 500) * graphHeight}
        stroke={zoneColor + "44"}
        strokeWidth="1"
        strokeDasharray="4,4"
      />
      <text
        x={gx + graphWidth + 8}
        y={gy + graphHeight - (maxSpeed / 500) * graphHeight + 4}
        fill={zoneColor}
        fontSize="14"
        fontWeight="bold"
        fontFamily="Space Grotesk"
      >
        {maxSpeed.toFixed(0)} mm/s
      </text>

      {/* Accel value */}
      <text x={gx + graphWidth + 8} y={gy + graphHeight - 5} fill={colors.muted} fontSize="12" fontFamily="Space Grotesk">
        {accel.toFixed(0)} mm/s²
      </text>

      {/* Axes labels */}
      <text x={gx + graphWidth / 2} y={gy + graphHeight + 20} textAnchor="middle" fill={colors.muted} fontSize="12" fontFamily="Space Grotesk">
        Time →
      </text>
      <text x={gx - 30} y={gy + graphHeight / 2} textAnchor="middle" fill={colors.muted} fontSize="12" fontFamily="Space Grotesk" transform={`rotate(-90, ${gx - 30}, ${gy + graphHeight / 2})`}>
        Speed (mm/s)
      </text>

      {/* Print time estimate */}
      <g transform={`translate(${gx + graphWidth / 2}, ${gy + graphHeight + 40})`}>
        <text x="0" y="0" textAnchor="middle" fill={zoneColor} fontSize="20" fontWeight="bold" fontFamily="Space Grotesk">
          Est. print time: {printTime.toFixed(0)} min
        </text>
      </g>

      {/* Print path with quality */}
      <g transform="translate(0, 20)">
        <text x="250" y="280" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          Print result
        </text>

        {/* Ideal path */}
        <path d={`M ${pathStartX},${pathStartY} L ${pathMidX},${pathStartY} L ${pathEndX},${pathEndY}`} fill="none" stroke={colors.correct + "33"} strokeWidth="2" strokeDasharray="6,4" />

        {/* Actual printed layers (stacked, with potential shift) */}
        {Array.from({ length: 5 }, (_, i) => {
          const shift = i > 2 ? layerShift * Math.sin(i * 1.5) : 0;
          return (
            <path
              key={i}
              d={`M ${pathStartX + shift},${pathStartY - i * 6} L ${pathMidX + shift},${pathStartY - i * 6} L ${pathEndX + shift},${pathEndY - i * 6}`}
              fill="none"
              stroke={zoneColor}
              strokeWidth="3"
              opacity={0.4 + i * 0.15}
            />
          );
        })}

        {/* Layer shift warning */}
        {layerShift > 3 && (
          <text x={pathMidX + 20} y={pathStartY - 20} fill={colors.tooHigh} fontSize="14" fontWeight="bold" fontFamily="Space Grotesk">
            layer shift!
          </text>
        )}

        {/* "Too slow" indicator */}
        {value < 0.2 && (
          <text x={pathMidX - 100} y={pathStartY - 40} fill={colors.tooLow} fontSize="14" fontFamily="Space Grotesk">
            unnecessarily slow...
          </text>
        )}
      </g>
    </svg>
  );
};

export const MaxAccelVelocity: React.FC = () => (
  <CalibrationVar
    index={10}
    category="Printer-Specific"
    title="Max Acceleration & Velocity"
    description="Speed and acceleration limits per axis. The capstone — how fast can your printer go before quality degrades?"
    unit="mm/s² & mm/s"
    rangeLabels={{ min: "Too conservative", correct: "Hardware sweet spot", max: "Beyond limits" }}
    impacts={{
      low: "Prints take much longer than necessary. No quality benefit beyond a point.",
      correct: "Fast prints with no quality loss. Hardware fully utilized.",
      high: "Layer shifts, ringing, skipped steps. Pushing past mechanical limits.",
    }}
    dependencies={["Belt Tension", "Input Shaper", "Backlash", "Skew"]}
    note="Capstone of printer-specific tuning — everything else must be dialed in first."
    renderDiagram={(v) => <AccelDiagram value={v} />}
  />
);
