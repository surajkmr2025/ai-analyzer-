interface Suggestion {
  title: string;
  body: string;
  priority: "high" | "med" | "low";
}

interface Props {
  suggestions: Suggestion[];
}

const priorityConfig = {
  high: "bg-red-50 text-red-700 border-red-100",
  med:  "bg-yellow-50 text-yellow-700 border-yellow-100",
  low:  "bg-green-50 text-green-700 border-green-100",
};

export default function Suggestions({ suggestions }: Props) {
  return (
    <div>
      <p className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-3">AI Suggestions</p>
      <div className="space-y-3">
        {suggestions.map((s) => (
          <div key={s.title} className="bg-white border border-zinc-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-sm font-medium text-zinc-800">{s.title}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${priorityConfig[s.priority]}`}>
                {s.priority}
              </span>
            </div>
            <p className="text-sm text-zinc-500">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}