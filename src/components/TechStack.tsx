interface Props {
  stack: string[];
}

export default function TechStack({ stack }: Props) {
  return (
    <div>
      <p className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-3">Tech Stack</p>
      <div className="flex flex-wrap gap-2">
        {stack.map((tech) => (
          <span
            key={tech}
            className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full border border-blue-100"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}