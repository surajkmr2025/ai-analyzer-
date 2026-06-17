export interface AnalysisResult {
  performance: number;
  seo: number;
  accessibility: number;
  best_practices: number;
  tech_stack: string[];
  seo_checklist: { label: string; status: "ok" | "warn" | "bad" }[];
  suggestions: { title: string; body: string; priority: "high" | "med" | "low" }[];
}

export async function analyzeUrl(url: string): Promise<AnalysisResult> {
  let siteHtml = "";
  try {
    const siteResponse = await fetch(url);
    siteHtml = await siteResponse.text();
  } catch (error) {
    throw new Error(`Failed to fetch HTML from ${url}. Check your network or CORS policies.`);
  }

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const model = "gemini-2.5-flash";
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  // 2. Feed the raw HTML into the prompt so the model has actual data to analyze
  const prompt = `Analyze this raw website HTML for SEO, accessibility, and best practices. 
Context URL: ${url}

Raw HTML:
${siteHtml}

Return ONLY valid JSON matching this exact structure:
{
  "performance": <0-100>,
  "seo": <0-100>,
  "accessibility": <0-100>,
  "best_practices": <0-100>,
  "tech_stack": ["React", "Nginx"],
  "seo_checklist": [
    {"label": "Meta title", "status": "ok|warn|bad"},
    {"label": "Meta description", "status": "ok|warn|bad"},
    {"label": "Open Graph tags", "status": "ok|warn|bad"},
    {"label": "Mobile friendly", "status": "ok|warn|bad"},
    {"label": "HTTPS", "status": "ok|warn|bad"},
    {"label": "Sitemap", "status": "ok|warn|bad"},
    {"label": "robots.txt", "status": "ok|warn|bad"},
    {"label": "Canonical URL", "status": "ok|warn|bad"}
  ],
  "suggestions": [
    {"title": "...", "body": "...", "priority": "high|med|low"}
  ]
}
No markdown. Only JSON.`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      // Using Structured Output JSON mode
      generationConfig: { response_mime_type: "application/json" },
    }),
  });

  const data = await res.json();

  if (!data.candidates || data.candidates.length === 0) {
    throw new Error("API failed to return content. Check payload or safety ratings.");
  }

  const text = data.candidates[0].content.parts[0].text;
  return JSON.parse(text) as AnalysisResult;
}