import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { CalibrationVar, getZoneColor } from "../../components/CalibrationVar";
import { colors } from "../../brand";

/**
 * Diagram: Toolhead changing direction at a corner.
 * Shows vibration wave propagating from the corner.
 * Slider controls input shaper quality:
 *   0.0 = no shaping — full ringing
 *   0.5 = well tuned — vibration cancelled
 *   1.0 = over-damped — corners rounded, detail lost
 */
const InputShaperDiagram: React.FC<{ value: number }> = ({ value }) => {
  const frame = useCurrentFrame();
  const zoneColor = getZoneColor(value);

  // Ringing amplitude (how much vibration remains after corner)
  const ringAmp = interpolate(value, [0, 0.5, 1], [20, 0.5, 3]);
  // Corner rounding from over-damping
  const cornerRound = interpolate(value, [0, 0.5, 1], [2, 2, 25]);
  // Ringing decay rate
  const ringDecay = interpolate(value, [0, 0.5, 1], [2, 20, 8]);

  // Generate toolhead path with ringing
  const pathAfterCorner: string[] = [];
  for (let i = 0; i < 200; i += 2) {
    const x = 350 + i;
    const ringing = Math.sin(i * 0.15 + frame * 0.1) * ringAmp * Math.exp(-i * ringDecay * 0.01);
    pathAfterCorner.push(`${x},${250 + ringing}`);
  }

  // Acceleration graph below
  const accelPoints: string[] = [];
  for (let i = 0; i < 300; i += 2) {
    const t = i / 300;
    // Shaped acceleration has smooth profile, unshaped has sharp spike
    const shaping = interpolate(value, [0, 0.5, 1], [0, 1, 1.5]);
    const spike = Math.exp(-((t - 0.3) ** 2) / (0.002 + shaping * 0.02)) * 80;
    // Add counter-pulse for shaping
    const counter = shaping > 0.5
      ? Math.exp(-((t - 0.35) ** 2) / 0.003) * 40 * (shaping - 0.3)
      : 0;
    accelPoints.push(`${100 + i * 1.6},${430 - spike + counter}`);
  }

  return (
    <svg width="700" height="550" viewBox="0 0 700 550">
      {/* Print path visualization */}
      <text x="350" y="40" textAnchor="middle" fill={colors.muted} fontSize="16" fontFamily="Space Grotesk">
        Toolhead path at corner
      </text>

      {/* Approach (vertical line going up) */}
      <line x1="350" y1="350" x2="350" y2="250" stroke={colors.lightBlue} strokeWidth="3" />

      {/* Corner point */}
      <circle cx="350" cy="250" r="6" fill={colors.accentAmber} />

      {/* Path after corner (horizontal with ringing) */}
      <polyline
        points={pathAfterCorner.join(" ")}
        fill="none"
        stroke={zoneColor}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Ideal path (straight horizontal) */}
      <line
        x1="350"
        y1="250"
        x2="550"
        y2="250"
        stroke={colors.correct + "33"}
        strokeWidth="2"
        strokeDasharray="6,4"
      />

      {/* Direction arrows */}
      <polygon points="345,290 350,280 355,290" fill={colors.lightBlue} />
      <polygon points="500,245 510,250 500,255" fill={zoneColor} />

      {/* Ringing amplitude label */}
      {ringAmp > 2 && (
        <g>
          <line x1="400" y1={250 - ringAmp} x2="400" y2={250 + ringAmp} stroke={zoneColor} strokeWidth="1.5" />
          <text x="415" y="250" fill={zoneColor} fontSize="13" fontFamily="Space Grotesk">
            ±{ringAmp.toFixed(1)}mm
          </text>
        </g>
      )}

      {/* Print result — corner detail */}
      <g transform="translate(100, 160)">
        <text x="75" y="0" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          Printed corner
        </text>

        {/* Corner shape */}
        <path
          d={`M 20,140 L 20,${20 + cornerRound} Q 20,20 ${20 + cornerRound},20 L 130,20`}
          fill="none"
          stroke={zoneColor}
          strokeWidth="3"
        />

        {/* Ghost lines for ringing */}
        {ringAmp > 3 && Array.from({ length: 4 }, (_, i) => {
          const offset = (i + 1) * ringAmp * 0.4 * Math.exp(-i * 0.5);
          return (
            <line
              key={i}
              x1={20 + cornerRound + offset}
              y1="20"
              x2={20 + cornerRound + offset}
              y2="70"
              stroke={zoneColor + (44 - i * 10).toString(16).padStart(2, "0")}
              strokeWidth="2"
            />
          );
        })}

        {/* Target corner (ideal 90°) */}
        <path d="M 20,140 L 20,20 L 130,20" fill="none" stroke={colors.correct + "33"} strokeWidth="1.5" strokeDasharray="4,4" />
      </g>

      {/* Acceleration profile graph */}
      <g>
        <text x="350" y="385" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          Acceleration command at corner
        </text>
        <rect x="100" y="395" width="500" height="80" rx="6" fill={colors.deepBlue + "88"} />
        <polyline
          points={accelPoints.join(" ")}
          fill="none"
          stroke={zoneColor}
          strokeWidth="2.5"
        />
        {/* Baseline */}
        <line x1="100" y1="430" x2="600" y2="430" stroke={colors.muted + "44"} strokeWidth="1" />

        {value > 0.35 && value < 0.65 && (
          <text x="500" y="420" fill={colors.correct} fontSize="12" fontFamily="Space Grotesk">
            shaped ✓
          </text>
        )}
        {value < 0.2 && (
          <text x="500" y="420" fill={colors.tooLow} fontSize="12" fontFamily="Space Grotesk">
            uncompensated
          </text>
        )}
      </g>
    </svg>
  );
};

export const InputShaper: React.FC = () => (
  <CalibrationVar
    index={7}
    category="Printer-Specific"
    title="Input Shaper"
    description="Firmware vibration compensation. Sends counter-pulses to cancel the printer's resonant frequencies at direction changes."
    unit="Hz + shaper type"
    rangeLabels={{ min: "No shaping", correct: "ZV/MZV/EI tuned", max: "Over-damped" }}
    impacts={{
      low: "Ghosting and ringing at every corner. Limits max print speed.",
      correct: "Clean corners even at high speed. Vibrations cancelled at source.",
      high: "Rounded corners, loss of fine detail. Over-compensation blurs edges.",
    }}
    dependencies={["Belt Tension"]}
    note="Automatable via Klipper + ADXL345 accelerometer."
    renderDiagram={(v) => <InputShaperDiagram value={v} />}
  />
);
