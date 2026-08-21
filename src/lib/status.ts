// Visual tone per project status, shared by StatusPill and the projects
// filter bar. Unknown statuses fall back to the default blue.
const tones: Record<string, string> = {
  "In Progress": "text-blue bg-blue/10",
  Design: "text-navy bg-light-blue/25",
  Planning: "text-navy bg-orange/20",
  Idea: "text-muted bg-border",
};

export function statusTone(status: string): string {
  return tones[status] ?? "text-blue bg-blue/10";
}
