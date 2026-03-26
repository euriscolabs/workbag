import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { CalibrationVar, getZoneColor } from "../../components/CalibrationVar";
import { colors } from "../../brand";

/**
 * Diagram: Camera view of a print bed with anomaly detection overlays.
 * Shows different failure modes being detected.
 * Slider controls detection sensitivity:
 *   0.0 = no detection — failures waste hours of print time
 *   0.5 = calibrated detection — catches real problems, ignores noise
 *   1.0 = too sensitive — false positives, pauses on normal artifacts
 */
const AnomalyDetectionDiagram: React.FC<{ value: number }> = ({ value }) => {
  const frame = useCurrentFrame();
  const zoneColor = getZoneColor(value);

  const sensitivity = interpolate(value, [0, 0.5, 1], [0, 1, 2]);

  // Simulated print progress — cycles through different scenarios
  const scenario = Math.floor(interpolate(frame, [30, 210], [0, 3.99], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }));

  const scenarios = [
    { name: "Normal printing", hasAnomaly: false, type: "none" },
    { name: "Spaghetti detected", hasAnomaly: true, type: "spaghetti" },
    { name: "Layer shift detected", hasAnomaly: true, type: "layer-shift" },
    { name: "Warping detected", hasAnomaly: true, type: "warping" },
  ];

  const current = scenarios[scenario] || scenarios[0];
  const detected = current.hasAnomaly && sensitivity > 0.3;
  const falsePositive = !current.hasAnomaly && sensitivity > 1.5;

  return (
    <svg width="700" height="580" viewBox="0 0 700 580">
      {/* Title */}
      <g transform="translate(350, 25)">
        <text x="0" y="0" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          ANOMALY DETECTION
        </text>
        <text x="0" y="28" textAnchor="middle" fill={zoneColor} fontSize="26" fontWeight="bold" fontFamily="Space Grotesk">
          {value < 0.3 ? "Disabled" : value > 0.7 ? "Over-sensitive" : "Calibrated"}
        </text>
      </g>

      {/* Camera view frame */}
      <g transform="translate(100, 70)">
        <rect x="0" y="0" width="500" height="280" rx="8" fill={colors.deepBlue} stroke={colors.muted + "44"} strokeWidth="2" />

        {/* Camera label */}
        <circle cx="25" cy="20" r="6" fill={detected || falsePositive ? colors.tooLow : colors.correct} />
        <text x="38" y="24" fill={colors.muted} fontSize="12" fontFamily="Space Grotesk">
          CAM — {current.name}
        </text>

        {/* Print bed */}
        <rect x="50" y="180" width="400" height="60" rx="4" fill={colors.muted + "11"} stroke={colors.muted + "22"} strokeWidth="1" />

        {/* Printed part (normal state) */}
        <rect x="150" y="100" width="200" height="80" rx="4" fill={colors.lightBlue + "22"} stroke={colors.lightBlue + "44"} strokeWidth="1.5" />

        {/* Anomaly overlays based on scenario */}
        {current.type === "spaghetti" && (
          <g>
            {/* Spaghetti mess */}
            {Array.from({ length: 12 }, (_, i) => {
              const x1 = 180 + Math.sin(i * 1.3) * 60;
              const y1 = 70 + Math.cos(i * 0.9) * 40;
              const x2 = 200 + Math.sin(i * 2.1 + 1) * 80;
              const y2 = 90 + Math.cos(i * 1.7 + 2) * 30;
              return (
                <path
                  key={i}
                  d={`M ${x1},${y1} Q ${(x1 + x2) / 2 + Math.sin(i) * 20},${(y1 + y2) / 2} ${x2},${y2}`}
                  fill="none"
                  stroke={colors.tooLow + "88"}
                  strokeWidth="2"
                />
              );
            })}
            {/* Detection box */}
            {detected && (
              <rect x="130" y="50" width="240" height="130" rx="4" fill="none" stroke={colors.tooLow} strokeWidth="3" strokeDasharray="8,4" />
            )}
          </g>
        )}

        {current.type === "layer-shift" && (
          <g>
            {/* Shifted layers */}
            <rect x="150" y="140" width="200" height="40" rx="2" fill={colors.lightBlue + "22"} stroke={colors.lightBlue + "44"} strokeWidth="1" />
            <rect x="170" y="100" width="200" height="40" rx="2" fill={colors.tooLow + "22"} stroke={colors.tooLow + "66"} strokeWidth="1.5" />
            {/* Shift arrow */}
            <line x1="155" y1="120" x2="175" y2="120" stroke={colors.tooLow} strokeWidth="2" />
            <polygon points="173,115 180,120 173,125" fill={colors.tooLow} />
            {detected && (
              <rect x="140" y="90" width="240" height="100" rx="4" fill="none" stroke={colors.tooLow} strokeWidth="3" strokeDasharray="8,4" />
            )}
          </g>
        )}

        {current.type === "warping" && (
          <g>
            {/* Warped corner */}
            <path d="M 150,180 Q 140,160 150,140" fill="none" stroke={colors.tooLow} strokeWidth="3" />
            <path d="M 350,180 Q 360,160 350,140" fill="none" stroke={colors.tooLow} strokeWidth="3" />
            {detected && (
              <>
                <circle cx="150" cy="160" r="25" fill="none" stroke={colors.tooLow} strokeWidth="2.5" strokeDasharray="6,4" />
                <circle cx="350" cy="160" r="25" fill="none" stroke={colors.tooLow} strokeWidth="2.5" strokeDasharray="6,4" />
              </>
            )}
          </g>
        )}

        {/* False positive overlay for over-sensitive */}
        {falsePositive && (
          <g>
            <rect x="140" y="90" width="220" height="100" rx="4" fill="none" stroke={colors.tooHigh} strokeWidth="3" strokeDasharray="8,4" />
            <text x="250" y="85" textAnchor="middle" fill={colors.tooHigh} fontSize="14" fontWeight="bold" fontFamily="Space Grotesk">
              FALSE ALARM
            </text>
          </g>
        )}

        {/* Status bar */}
        <rect x="0" y="250" width="500" height="30" rx="0 0 8 8" fill={
          detected ? colors.tooLow + "33"
          : falsePositive ? colors.tooHigh + "33"
          : colors.correct + "18"
        } />
        <text x="250" y="270" textAnchor="middle" fill={
          detected ? colors.tooLow
          : falsePositive ? colors.tooHigh
          : colors.correct
        } fontSize="14" fontWeight="bold" fontFamily="Space Grotesk">
          {detected ? "ANOMALY DETECTED — PAUSING PRINT"
           : falsePositive ? "FALSE POSITIVE — UNNECESSARY PAUSE"
           : sensitivity < 0.3 && current.hasAnomaly ? "ANOMALY MISSED — PRINTING CONTINUES"
           : "STATUS: OK"}
        </text>
      </g>

      {/* Action matrix */}
      <g transform="translate(60, 380)">
        <text x="290" y="0" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          Detection → Action
        </text>

        {[
          { anomaly: "Spaghetti", action: "Pause + alert", icon: "⏸", severity: "critical" },
          { anomaly: "Layer shift", action: "Pause + alert", icon: "⏸", severity: "critical" },
          { anomaly: "Warping", action: "Adjust bed temp / fan", icon: "⚙", severity: "correctable" },
          { anomaly: "Stringing", action: "Flag for review", icon: "📋", severity: "minor" },
        ].map((item, i) => {
          const active = sensitivity > 0.3;
          return (
            <g key={i} transform={`translate(${i * 140}, 15)`}>
              <rect x="0" y="0" width="130" height="55" rx="6"
                fill={active ? zoneColor + "12" : colors.deepBlue}
                stroke={active ? zoneColor + "33" : colors.muted + "22"}
                strokeWidth="1"
              />
              <text x="65" y="20" textAnchor="middle" fill={colors.text} fontSize="12" fontWeight="600" fontFamily="Space Grotesk">
                {item.anomaly}
              </text>
              <text x="65" y="38" textAnchor="middle" fill={colors.muted} fontSize="10" fontFamily="Space Grotesk">
                {item.action}
              </text>
              <text x="65" y="50" textAnchor="middle" fill={item.severity === "critical" ? colors.tooLow : item.severity === "correctable" ? colors.accentAmber : colors.muted} fontSize="9" fontFamily="Space Grotesk">
                {item.severity}
              </text>
            </g>
          );
        })}
      </g>

      {/* Cost of missed detection */}
      <g transform="translate(60, 470)">
        <rect x="0" y="0" width="580" height="40" rx="6" fill={zoneColor + "12"} stroke={zoneColor + "33"} strokeWidth="1" />
        <text x="290" y="16" textAnchor="middle" fill={zoneColor} fontSize="13" fontFamily="Space Grotesk">
          {value < 0.3
            ? "A spaghetti failure at hour 6 wastes 6 hours of filament, time, and electricity"
            : value > 0.7
            ? "False pauses interrupt good prints — you stop trusting the system and disable it"
            : "Real problems caught early, normal variation ignored — saves hours and material"}
        </text>
        <text x="290" y="33" textAnchor="middle" fill={colors.muted} fontSize="11" fontFamily="Space Grotesk">
          {value < 0.3 ? "No detection = gambling on every long print"
           : value > 0.7 ? "The boy who cried wolf — over-alerting causes alert fatigue"
           : "Trust the system — it only interrupts when it matters"}
        </text>
      </g>
    </svg>
  );
};

export const AnomalyDetection: React.FC = () => (
  <CalibrationVar
    index={4}
    category="Live Tuning"
    title="Anomaly Detection"
    description="Detects print failures in real-time using camera vision. Catches spaghetti, layer shifts, warping, and stringing — pauses or adjusts before wasting hours."
    unit="sensitivity"
    rangeLabels={{ min: "Disabled", correct: "Calibrated", max: "Over-sensitive" }}
    impacts={{
      low: "Failures go undetected. Hours of filament and time wasted on failed prints.",
      correct: "Real problems caught within seconds. Normal variation ignored. Trust the system.",
      high: "False positives. Good prints get paused. Alert fatigue — you disable it.",
    }}
    dependencies={[]}
    note="Camera is the primary sensor. Works best with consistent lighting and a clean background."
    renderDiagram={(v) => <AnomalyDetectionDiagram value={v} />}
  />
);
