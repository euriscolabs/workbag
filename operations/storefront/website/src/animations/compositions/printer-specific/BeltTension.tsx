import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { CalibrationVar, getZoneColor } from "../../components/CalibrationVar";
import { colors } from "../../brand";

/**
 * Diagram: Belt between two pulleys, vibrating.
 * Slider controls tension:
 *   0.0 = too loose — floppy wave, ghosting on print
 *   0.5 = correct — taut, clean motion
 *   1.0 = too tight — rigid, motor strain indicators
 */
const BeltDiagram: React.FC<{ value: number }> = ({ value }) => {
  const frame = useCurrentFrame();
  const zoneColor = getZoneColor(value);

  // Belt sag / wave amplitude
  const waveAmp = interpolate(value, [0, 0.5, 1], [25, 2, 0.5]);
  // Vibration frequency
  const waveFreq = interpolate(value, [0, 0.5, 1], [0.02, 0.06, 0.1]);
  // Motor strain indicator
  const motorStrain = interpolate(value, [0.7, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const pulleyL = 120;
  const pulleyR = 580;
  const beltY = 180;
  const pulleyR_radius = 30;

  // Generate belt path with wave
  const beltPoints: string[] = [];
  for (let i = 0; i <= pulleyR - pulleyL; i += 3) {
    const x = pulleyL + i;
    const t = i / (pulleyR - pulleyL);
    // Wave with time animation
    const wave = Math.sin(t * Math.PI * 8 * waveFreq * 100 + frame * 0.15) * waveAmp * Math.sin(t * Math.PI);
    beltPoints.push(`${x},${beltY + wave}`);
  }

  // Print corner quality based on tension
  const ghostOffset = interpolate(value, [0, 0.5, 1], [8, 0, 0]);
  const cornerRound = interpolate(value, [0, 0.5, 1], [12, 2, 2]);

  return (
    <svg width="700" height="550" viewBox="0 0 700 550">
      {/* Left pulley (motor) */}
      <circle cx={pulleyL} cy={beltY} r={pulleyR_radius} fill="none" stroke={colors.muted} strokeWidth="3" />
      <circle cx={pulleyL} cy={beltY} r="8" fill={colors.darkBlue} />
      <text x={pulleyL} y={beltY + 50} textAnchor="middle" fill={colors.muted} fontSize="13" fontFamily="Space Grotesk">
        MOTOR
      </text>

      {/* Right pulley (idler) */}
      <circle cx={pulleyR} cy={beltY} r={pulleyR_radius} fill="none" stroke={colors.muted} strokeWidth="3" />
      <circle cx={pulleyR} cy={beltY} r="6" fill={colors.muted + "88"} />
      <text x={pulleyR} y={beltY + 50} textAnchor="middle" fill={colors.muted} fontSize="13" fontFamily="Space Grotesk">
        IDLER
      </text>

      {/* Belt (top strand — the one that matters) */}
      <polyline
        points={beltPoints.join(" ")}
        fill="none"
        stroke={zoneColor}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Belt (bottom strand — return, shown subtle) */}
      <line
        x1={pulleyL}
        y1={beltY + pulleyR_radius * 2}
        x2={pulleyR}
        y2={beltY + pulleyR_radius * 2}
        stroke={colors.muted + "33"}
        strokeWidth="3"
      />

      {/* Frequency indicator */}
      <g transform={`translate(350, ${beltY - 60})`}>
        <text x="0" y="0" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          Resonant frequency
        </text>
        <text x="0" y="24" textAnchor="middle" fill={zoneColor} fontSize="22" fontWeight="bold" fontFamily="Space Grotesk">
          {interpolate(value, [0, 0.5, 1], [40, 110, 180]).toFixed(0)} Hz
        </text>
      </g>

      {/* Motor strain warning for too-tight */}
      {motorStrain > 0 && (
        <g opacity={motorStrain}>
          <text x={pulleyL} y={beltY + 75} textAnchor="middle" fill={colors.tooHigh} fontSize="12" fontFamily="Space Grotesk">
            STRAIN
          </text>
          {/* Stress lines around motor */}
          {[0, 1, 2, 3].map((i) => {
            const angle = (i * 90 + 45) * Math.PI / 180;
            return (
              <line
                key={i}
                x1={pulleyL + Math.cos(angle) * 38}
                y1={beltY + Math.sin(angle) * 38}
                x2={pulleyL + Math.cos(angle) * 48}
                y2={beltY + Math.sin(angle) * 48}
                stroke={colors.tooHigh}
                strokeWidth="2"
              />
            );
          })}
        </g>
      )}

      {/* Print quality comparison */}
      <g transform="translate(150, 320)">
        <text x="200" y="0" textAnchor="middle" fill={colors.muted} fontSize="16" fontFamily="Space Grotesk">
          Print corner quality
        </text>

        {/* Target square (outline) */}
        <rect x="120" y="20" width="160" height="120" fill="none" stroke={colors.correct + "33"} strokeWidth="2" strokeDasharray="6,4" rx="2" />

        {/* Actual printed square */}
        <rect
          x="120"
          y="20"
          width="160"
          height="120"
          fill={zoneColor + "22"}
          stroke={zoneColor}
          strokeWidth="2.5"
          rx={cornerRound}
        />

        {/* Ghost lines (ringing artifact for loose belts) */}
        {ghostOffset > 1 && (
          <>
            {[1, 2, 3].map((i) => (
              <rect
                key={i}
                x={120 + ghostOffset * i}
                y={20 + ghostOffset * i * 0.3}
                width="160"
                height="120"
                fill="none"
                stroke={colors.tooLow + (30 - i * 8).toString(16)}
                strokeWidth="1"
                rx={cornerRound}
              />
            ))}
            <text x="200" y="160" textAnchor="middle" fill={colors.tooLow} fontSize="13" fontFamily="Space Grotesk">
              ← ghosting / ringing
            </text>
          </>
        )}

        {/* Clean corners label for correct */}
        {value > 0.35 && value < 0.65 && (
          <text x="200" y="160" textAnchor="middle" fill={colors.correct} fontSize="13" fontFamily="Space Grotesk">
            sharp, clean corners
          </text>
        )}
      </g>
    </svg>
  );
};

export const BeltTension: React.FC = () => (
  <CalibrationVar
    index={6}
    category="Printer-Specific"
    title="Belt Tension"
    description="X/Y timing belt tension. Measured by the resonant frequency when the belt is plucked — like tuning a guitar string."
    unit="Hz"
    rangeLabels={{ min: "< 80 Hz (loose)", correct: "80–140 Hz", max: "> 140 Hz (tight)" }}
    impacts={{
      low: "Ringing, ghosting, layer shifts, rounded corners. Belt flops on direction changes.",
      correct: "Sharp corners, clean motion, no ghosting artifacts.",
      high: "Increased motor load, premature bearing wear, frame stress.",
    }}
    dependencies={[]}
    note="Must be set before Input Shaper — belt tension changes resonant frequency."
    renderDiagram={(v) => <BeltDiagram value={v} />}
  />
);
