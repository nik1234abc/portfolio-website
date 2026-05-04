import { useEffect, useRef, useState } from "react";

let mermaidInstance = null;
let idCounter = 0;

async function getMermaid() {
  if (mermaidInstance) return mermaidInstance;
  const { default: mermaid } = await import("mermaid");
  mermaid.initialize({
    startOnLoad: false,
    theme: "base",
    themeVariables: {
      primaryColor: "#1e293b",
      primaryTextColor: "#f1f5f9",
      primaryBorderColor: "#38bdf8",
      lineColor: "#94a3b8",
      secondaryColor: "#0f172a",
      tertiaryColor: "#1e293b",
      background: "#0f172a",
      mainBkg: "#1e293b",
      nodeBorder: "#38bdf8",
      clusterBkg: "#1e293b",
      titleColor: "#f1f5f9",
      edgeLabelBackground: "#1e293b",
      fontFamily: "ui-sans-serif, system-ui, sans-serif",
      fontSize: "14px",
    },
    flowchart: { htmlLabels: true, curve: "basis", padding: 20 },
    securityLevel: "loose",
  });
  mermaidInstance = mermaid;
  return mermaid;
}

export default function MermaidDiagram({ chart }) {
  const ref = useRef(null);
  const [svg, setSvg] = useState("");
  const [error, setError] = useState(null);
  const idRef = useRef(`mermaid-${++idCounter}`);

  useEffect(() => {
    if (!chart) return;
    const render = async () => {
      try {
        setError(null);
        const mermaid = await getMermaid();
        const { svg: rendered } = await mermaid.render(idRef.current, chart);
        setSvg(rendered);
        idRef.current = `mermaid-${++idCounter}`;
      } catch (e) {
        setError(e.message);
      }
    };
    render();
  }, [chart]);

  if (error) {
    return (
      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400 font-mono">
        Diagram error: {error}
      </div>
    );
  }

  if (!svg) return null;

  return (
    <div
      ref={ref}
      className="mermaid-diagram w-full overflow-x-auto flex justify-center"
      dangerouslySetInnerHTML={{ __html: svg }}
      style={{ minHeight: "80px" }}
    />
  );
}
