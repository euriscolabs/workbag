import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { CalibrationVar, getZoneColor } from "../../components/CalibrationVar";
import { colors } from "../../brand";

/**
 * Diagram: Part with overhangs showing cooling effect.
 * Slider controls fan speed:
 *   0.0 = no cooling — overhangs droop, bridges sag
 *   0.5 = correct — clean overhangs, solid bridges
 *   1.0 = too much — layer adhesion weakens, warping (ABS), cracking
 */
const CoolingFanDiagram: React.FC<{ value: number }> = ({ value }) => {
  const frame = useCurrentFrame();
  const zoneColor = getZoneColor(value);

  const fanSpeed = interpolate(value, [0, 0.5, 1], [0, 70, 100]);
  // Overhang droop
  const droopAmount = interpolate(value, [0, 0.4], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // Bridge sag
  const bridgeSag = interpolate(value, [0, 0.4], [25, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // Layer delamination from too much cooling
  const delamination = interpolate(value, [0.7, 1], [0, 8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Fan blade rotation
  const fanRotation = frame * fanSpeed * 0.1;

  return (
    <svg width="700" height="580" viewBox="0 0 700 580">
      {/* Fan speed display */}
      <g transform="translate(350, 25)">
        <text x="0" y="0" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          PART COOLING FAN
        </text>
        <text x="0" y="32" textAnchor="middle" fill={zoneColor} fontSize="36" fontWeight="bold" fontFamily="Space Grotesk">
          {fanSpeed.toFixed(0)}%
        </text>
      </g>

      {/* Fan visualization */}
      <g transform={`translate(580, 200) rotate(${fanRotation})`}>
        {[0, 90, 180, 270].map((a) => (
          <ellipse
            key={a}
            cx="0" cy="-18"
            rx="8" ry="18"
            fill={colors.lightBlue + "66"}
            transform={`rotate(${a})`}
          />
        ))}
        <circle r="6" fill={colors.darkBlue} />
      </g>
      <text x="580" y="240" textAnchor="middle" fill={colors.muted} fontSize="11" fontFamily="Space Grotesk">FAN</text>

      {/* Airflow lines */}
      {fanSpeed > 10 && Array.from({ length: 4 }, (_, i) => (
        <line
          key={i}
          x1={555}
          y1={185 + i * 12}
          x2={555 - 30 - fanSpeed * 0.5}
          y2={185 + i * 12}
          stroke={colors.lightBlue + "33"}
          strokeWidth="2"
          strokeDasharray="8,4"
        />
      ))}

      {/* Overhang test — graduated angles */}
      <g transform="translate(80, 80)">
        <text x="200" y="0" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          Overhang test
        </text>

        {/* Base */}
        <rect x="50" y="200" width="300" height="16" rx="3" fill={colors.muted + "33"} stroke={colors.muted + "66"} strokeWidth="1.5" />

        {/* Overhang steps at 20°, 35°, 50°, 65°, 80° */}
        {[20, 35, 50, 65, 80].map((angle, i) => {
          const stepX = 80 + i * 55;
          const overhangLength = 40;
          const rad = (angle * Math.PI) / 180;
          const dx = Math.cos(rad) * overhangLength;
          const dy = Math.sin(rad) * overhangLength;

          // Droop increases with angle and decreases with fan
          const stepDroop = droopAmount * (angle / 80) * (angle / 80);

          return (
            <g key={angle}>
              {/* Support column */}
              <rect x={stepX - 8} y="130" width="16" height="70" fill={colors.lightBlue + "44"} stroke={colors.lightBlue + "66"} strokeWidth="1" />

              {/* Overhang (with potential droop) */}
              <path
                d={`M ${stepX},${130} L ${stepX - dx},${130 - dy + stepDroop}`}
                fill="none"
                stroke={stepDroop > 5 ? colors.tooLow : zoneColor}
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Ideal line (dashed) */}
              <path
                d={`M ${stepX},${130} L ${stepX - dx},${130 - dy}`}
                fill="none"
                stroke={colors.correct + "33"}
                strokeWidth="1.5"
                strokeDasharray="4,4"
              />

              {/* Angle label */}
              <text x={stepX} y="218" textAnchor="middle" fill={colors.muted} fontSize="11" fontFamily="Space Grotesk">{angle}°</text>
            </g>
          );
        })}
      </g>

      {/* Bridge test */}
      <g transform="translate(80, 340)">
        <text x="200" y="0" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          Bridge test
        </text>

        {/* Two pillars */}
        <rect x="80" y="30" width="30" height="80" rx="3" fill={colors.lightBlue + "44"} stroke={colors.lightBlue + "66"} strokeWidth="1.5" />
        <rect x="290" y="30" width="30" height="80" rx="3" fill={colors.lightBlue + "44"} stroke={colors.lightBlue + "66"} strokeWidth="1.5" />

        {/* Bridge (with sag) */}
        <path
          d={`M 110,30 Q 200,${30 + bridgeSag} 290,30`}
          fill="none"
          stroke={bridgeSag > 5 ? colors.tooLow : zoneColor}
          strokeWidth="4"
        />

        {/* Ideal bridge line */}
        <line x1="110" y1="30" x2="290" y2="30" stroke={colors.correct + "33"} strokeWidth="1.5" strokeDasharray="4,4" />

        {bridgeSag > 10 && (
          <text x="200" y={40 + bridgeSag} textAnchor="middle" fill={colors.tooLow} fontSize="12" fontFamily="Space Grotesk">
            sagging
          </text>
        )}
      </g>

      {/* Layer adhesion / delamination for too much cooling */}
      <g transform="translate(420, 340)">
        <text x="100" y="0" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          Layer adhesion
        </text>

        {Array.from({ length: 5 }, (_, i) => {
          const gap = i > 2 ? delamination : 0;
          return (
            <rect
              key={i}
              x="30"
              y={15 + i * (18 + gap)}
              width="140"
              height="14"
              rx="3"
              fill={gap > 2 ? colors.tooHigh + "44" : zoneColor + "44"}
              stroke={gap > 2 ? colors.tooHigh : zoneColor + "66"}
              strokeWidth="1.5"
            />
          );
        })}

        {delamination > 3 && (
          <>
            <text x="100" y="130" textAnchor="middle" fill={colors.tooHigh} fontSize="12" fontFamily="Space Grotesk">
              delamination
            </text>
            <text x="100" y="146" textAnchor="middle" fill={colors.tooHigh} fontSize="11" fontFamily="Space Grotesk">
              (layers don't bond)
            </text>
          </>
        )}
      </g>
    </svg>
  );
};

export const CoolingFan: React.FC = () => (
  <CalibrationVar
    index={7}
    category="Filament-Specific"
    title="Cooling / Fan Speed"
    description="Part cooling fan speed. Solidifies deposited plastic quickly. Critical for overhangs and bridges but can weaken layer bonds."
    unit="%"
    rangeLabels={{ min: "0% (off)", correct: "50–100% (PLA)", max: "100% (max)" }}
    impacts={{
      low: "Overhangs droop, bridges sag, fine details melt. Plastic stays soft too long.",
      correct: "Clean overhangs, solid bridges, sharp details. Material solidifies just in time.",
      high: "Weak layer adhesion, cracking (ABS), warping from thermal stress.",
    }}
    dependencies={["Extrusion Temp"]}
    note="PLA loves cooling (100%). PETG: 30-50%. ABS: 0-20%. Faster printing needs more cooling."
    renderDiagram={(v) => <CoolingFanDiagram value={v} />}
  />
);
