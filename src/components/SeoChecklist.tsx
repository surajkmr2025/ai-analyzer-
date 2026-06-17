interface Item {
  label: string;
  status: "ok" | "warn" | "bad";
}

interface Props {
  checklist: Item[];
}

const statusConfig = {
  ok:   { icon: "✓", className: "bg-green-50 text-green-700 border-green-100" },
  warn: { icon: "⚠", className: "bg-yellow-50 text-yellow-700 border-yellow-100" },
  bad:  { icon: "✕", className: "bg-red-50 text-red-700 border-red-100" },
};

export default function SeoChecklist({ checklist }: Props) {
  return (
    <div>
      <p className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-3">SEO Checklist</p>
      <div className="flex flex-wrap gap-2">
        {checklist.map((item) => {
          const { icon, className } = statusConfig[item.status];
          return (
            <span
              key={item.label}
              className={`text-xs font-medium px-3 py-1 rounded-full border ${className}`}
            >
              {icon} {item.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}