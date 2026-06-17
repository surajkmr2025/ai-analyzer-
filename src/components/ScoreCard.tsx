import type { AnalysisResult } from "@/utils/analyzeUrl";

interface Props {
  result: AnalysisResult;
}

function scoreColor(n: number) {
  if (n >= 75) return "text-green-600";
  if (n >= 50) return "text-yellow-600";
  return "text-red-600";
}

const scores = [
  { key: "performance", label: "Performance" },
  { key: "seo", label: "SEO" },
  { key: "accessibility", label: "Accessibility" },
  { key: "best_practices", label: "Best Practices" },
] as const;

export default function ScoreCards({ result }: Props) {
  return (
    <div>
      <p className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-3">Scores</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {scores.map(({ key, label }) => (
          <div key={key} className="bg-white rounded-xl border border-zinc-200 p-4">
            <p className="text-xs text-zinc-500 mb-1">{label}</p>
            <p className={`text-3xl font-semibold ${scoreColor(result[key])}`}>
              {result[key]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}