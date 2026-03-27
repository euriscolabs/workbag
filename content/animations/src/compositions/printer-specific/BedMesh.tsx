import React from "react";
import { interpolate } from "remotion";
import { CalibrationVar, getZoneColor } from "../../components/CalibrationVar";
import { colors } from "../../brand";

/**
 * Diagram: Top-down bed surface heatmap with nozzle path.
 * Slider value controls mesh compensation:
 *   0.0 = no mesh — nozzle follows flat plane over warped bed
 *   0.5 = good mesh — nozzle compensates for bed topology
 *   1.0 = stale mesh — compensating for wrong bed state
 */
const BedMeshDiagram: React.FC<{ value: number }> = ({ value }) => {
  const zoneColor = getZoneColor(value);
  const gridSize = 5;
  const cellSize = 80;
  const offsetX = 60;
  const offsetY = 80;

  // Simulated bed warp — center is high, corners dip
  const bedHeight = (row: number, col: number): number => {
    const cx = (gridSize - 1) / 2;
    const dist = Math.sqrt((row - cx) ** 2 + (col - cx) ** 2);
    return Math.sin(dist * 0.8) * 0.3 - (row * 0.05) + 0.15;
  };

  // Nozzle Z based on compensation quality
  const nozzleZ = (row: number, col: number): number => {
    const bed = bedHeight(row, col);
    // 0 = no compensation (flat), 0.5 = perfect compensation, 1 = wrong compensation
    const compensation = interpolate(value, [0, 0.5, 1], [0, bed, -bed * 0.6]);
    return bed - compensation;
  };

  // Color based on effective gap (how far nozzle is from ideal)
  const gapColor = (gap: number): string => {
    const abs = Math.abs(gap);
    if (abs < 0.05) return colors.correct;
    if (abs < 0.15) return colors.accentAmber;
    return gap > 0 ? colors.tooLow : colors.tooHigh;
  };

  return (
    <svg width="700" height="580" viewBox="0 0 700 580">
      {/* Title */}
      <text x="350" y="40" textAnchor="middle" fill={colors.muted} fontSize="16" fontFamily="Space Grotesk">
        BED SURFACE — First Layer Gap
      </text>

      {/* Heatmap grid */}
      {Array.from({ length: gridSize }, (_, row) =>
        Array.from({ length: gridSize }, (_, col) => {
          const gap = nozzleZ(row, col);
          const cellColor = gapColor(gap);
          const x = offsetX + col * cellSize;
          const y = offsetY + row * cellSize;

          return (
            <g key={`${row}-${col}`}>
              <rect
                x={x}
                y={y}
                width={cellSize - 4}
                height={cellSize - 4}
                rx="4"
                fill={cellColor + "33"}
                stroke={cellColor + "66"}
                strokeWidth="1"
              />
              <text
                x={x + (cellSize - 4) / 2}
                y={y + (cellSize - 4) / 2 + 5}
                textAnchor="middle"
                fill={cellColor}
                fontSize="14"
                fontWeight="bold"
                fontFamily="Space Grotesk"
              >
                {gap > 0 ? "+" : ""}{gap.toFixed(2)}
              </text>
            </g>
          );
        })
      )}

      {/* Nozzle path (zigzag first layer) */}
      {(() => {
        const pathPoints: string[] = [];
        for (let row = 0; row < gridSize; row++) {
          const cols = row % 2 === 0
            ? Array.from({ length: gridSize }, (_, i) => i)
            : Array.from({ length: gridSize }, (_, i) => gridSize - 1 - i);
          for (const col of cols) {
            const x = offsetX + col * cellSize + (cellSize - 4) / 2;
            const y = offsetY + row * cellSize + (cellSize - 4) / 2;
            pathPoints.push(`${x},${y}`);
          }
        }
        return (
          <polyline
            points={pathPoints.join(" ")}
            fill="none"
            stroke={colors.white + "44"}
            strokeWidth="2"
            strokeDasharray="4,8"
          />
        );
      })()}

      {/* Legend */}
      <g transform={`translate(${offsetX}, ${offsetY + gridSize * cellSize + 20})`}>
        <rect x="0" y="0" width="20" height="20" rx="3" fill={colors.correct + "33"} stroke={colors.correct} strokeWidth="1" />
        <text x="28" y="15" fill={colors.muted} fontSize="13" fontFamily="Space Grotesk">Good contact</text>

        <rect x="150" y="0" width="20" height="20" rx="3" fill={colors.tooLow + "33"} stroke={colors.tooLow} strokeWidth="1" />
        <text x="178" y="15" fill={colors.muted} fontSize="13" fontFamily="Space Grotesk">Too far (no adhesion)</text>

        <rect x="360" y="0" width="20" height="20" rx="3" fill={colors.tooHigh + "33"} stroke={colors.tooHigh} strokeWidth="1" />
        <text x="388" y="15" fill={colors.muted} fontSize="13" fontFamily="Space Grotesk">Too close (squished)</text>
      </g>

      {/* Side cross-section */}
      <g transform={`translate(${offsetX}, ${offsetY + gridSize * cellSize + 60})`}>
        <text x="0" y="0" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          Side view — nozzle height across bed
        </text>
        {/* Bed surface (wavy) */}
        {(() => {
          const bedPoints: string[] = [];
          const nozzlePoints: string[] = [];
          const width = gridSize * cellSize - 4;
          for (let i = 0; i <= width; i += 4) {
            const t = i / width;
            const col = t * (gridSize - 1);
            const bed = bedHeight(2, col) * 60;
            bedPoints.push(`${i},${40 - bed}`);

            const gap = nozzleZ(2, col) * 60;
            nozzlePoints.push(`${i},${40 - bed - 20 + gap}`);
          }
          return (
            <>
              <polyline points={bedPoints.join(" ")} fill="none" stroke={colors.muted + "88"} strokeWidth="3" transform="translate(0, 20)" />
              <polyline points={nozzlePoints.join(" ")} fill="none" stroke={zoneColor} strokeWidth="2" strokeDasharray="6,4" transform="translate(0, 20)" />
            </>
          );
        })()}
        <text x={gridSize * cellSize + 10} y="50" fill={colors.muted + "88"} fontSize="11" fontFamily="Space Grotesk">bed</text>
        <text x={gridSize * cellSize + 10} y="35" fill={zoneColor} fontSize="11" fontFamily="Space Grotesk">nozzle</text>
      </g>
    </svg>
  );
};

export const BedMesh: React.FC = () => (
  <CalibrationVar
    index={4}
    category="Printer-Specific"
    title="Bed Mesh / ABL"
    description="Maps the bed surface to compensate for warps and tilt. Ensures uniform first layer height across the entire print area."
    unit="mm Z-offset grid"
    rangeLabels={{ min: "No mesh", correct: "Mapped ±0.1–0.5mm", max: "Stale mesh" }}
    impacts={{
      low: "First layer too close in some spots, too far in others. Partial adhesion.",
      correct: "Uniform first layer across the entire bed. Consistent adhesion everywhere.",
      high: "Compensating for old bed state. Adhesion problems in shifted areas.",
    }}
    dependencies={["Axis Steps/mm"]}
    note="Already automatable via G29. Redo after bed removal or leveling knob changes."
    renderDiagram={(v) => <BedMeshDiagram value={v} />}
  />
);
