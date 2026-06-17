import { useState } from "react";
import { analyzeUrl } from "@/utils/analyzeUrl";
import type { AnalysisResult } from "@/utils/analyzeUrl";
import UrlInput from "@/components/UrlInput";
import ScoreCards from "@/components/ScoreCard";
import TechStack from "@/components/TechStack";
import SeoChecklist from "@/components/SeoChecklist";
import Suggestions from "@/components/Suggestions";
import { useTheme } from "@/components/theme-provider";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function App() {
  const { theme, setTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleAnalyze(url: string) {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await analyzeUrl(url);
      setResult(data);
    } catch (e) {
      setError("Analysis failed. Check your API key or URL.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-900 py-10 px-4 transition-colors">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100">🤖 AI Detective</h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">Analyze any website instantly</p>
          </div>
          <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </Button>
        </div>

        <UrlInput onAnalyze={handleAnalyze} loading={loading} />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {result && (
          <div className="space-y-6">
            <ScoreCards result={result} />
            <TechStack stack={result.tech_stack} />
            <SeoChecklist checklist={result.seo_checklist} />
            <Suggestions suggestions={result.suggestions} />
          </div>
        )}
      </div>
    </main>
  );
}