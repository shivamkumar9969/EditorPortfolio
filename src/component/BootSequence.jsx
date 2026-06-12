import React, { useState, useEffect, useCallback } from "react";

const BOOT_LINES = [
  { text: "", delay: 200, type: "blank" },
  { text: "██╗   ██╗███████╗ ██████╗ ██████╗ ██████╗ ███████╗", delay: 0, type: "ascii" },
  { text: "██║   ██║██╔════╝██╔════╝██╔═══██╗██╔══██╗██╔════╝", delay: 0, type: "ascii" },
  { text: "██║   ██║███████╗██║     ██║   ██║██║  ██║█████╗  ", delay: 0, type: "ascii" },
  { text: "╚██╗ ██╔╝╚════██║██║     ██║   ██║██║  ██║██╔══╝  ", delay: 0, type: "ascii" },
  { text: " ╚████╔╝ ███████║╚██████╗╚██████╔╝██████╔╝███████╗", delay: 0, type: "ascii" },
  { text: "  ╚═══╝  ╚══════╝ ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝", delay: 0, type: "ascii" },
  { text: "", delay: 300, type: "blank" },
  { text: "  Shivam Kumar — Developer Portfolio v2.0", delay: 100, type: "info" },
  { text: "", delay: 200, type: "blank" },
  { text: "[SYS] Initializing VS Code environment...", delay: 80, type: "system" },
  { text: "[SYS] Kernel: React 19.1.0 | Runtime: Node.js", delay: 60, type: "system" },
  { text: "[OK]  Core modules loaded", delay: 50, type: "success" },
  { text: "[OK]  Theme: One Dark Pro (Modified)", delay: 40, type: "success" },
  { text: "", delay: 100, type: "blank" },
  { text: "Loading extensions...", delay: 100, type: "loading" },
  { text: "  ✓ ES7+ React Snippets", delay: 40, type: "ext" },
  { text: "  ✓ Prettier - Code Formatter", delay: 30, type: "ext" },
  { text: "  ✓ GitLens — Git supercharged", delay: 30, type: "ext" },
  { text: "  ✓ Tailwind CSS IntelliSense", delay: 30, type: "ext" },
  { text: "  ✓ Portfolio.skills.loader", delay: 30, type: "ext" },
  { text: "  ✓ Portfolio.projects.engine", delay: 30, type: "ext" },
  { text: "  ✓ Portfolio.experience.timeline", delay: 30, type: "ext" },
  { text: "  ✓ Portfolio.contact.mailer", delay: 30, type: "ext" },
  { text: "", delay: 100, type: "blank" },
  { text: "[OK]  8 extensions activated", delay: 60, type: "success" },
  { text: "[SYS] Opening workspace: ~/portfolio/", delay: 80, type: "system" },
  { text: "[SYS] Indexing files...", delay: 60, type: "system" },
  { text: "[OK]  Workspace ready — 7 files indexed", delay: 50, type: "success" },
  { text: "", delay: 100, type: "blank" },
  { text: "[SYS] Starting development server...", delay: 80, type: "system" },
  { text: "[OK]  Compiled successfully!", delay: 80, type: "success" },
  { text: "", delay: 150, type: "blank" },
  { text: "  Ready. Welcome to the portfolio.", delay: 100, type: "welcome" },
];

function getLineColor(type) {
  switch (type) {
    case "ascii": return "#007acc";
    case "system": return "#808080";
    case "success": return "#4ec9b0";
    case "ext": return "#9cdcfe";
    case "loading": return "#c586c0";
    case "info": return "#dcdcaa";
    case "welcome": return "#4ec9b0";
    default: return "#d4d4d4";
  }
}

export default function BootSequence({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("booting"); // booting, progress, done
  const [opacity, setOpacity] = useState(1);

  const finish = useCallback(() => {
    setPhase("done");
    setTimeout(() => {
      setOpacity(0);
      setTimeout(() => onComplete(), 600);
    }, 400);
  }, [onComplete]);

  // Line-by-line typing
  useEffect(() => {
    if (phase !== "booting") return;
    if (currentLine >= BOOT_LINES.length) {
      setPhase("progress");
      return;
    }

    const line = BOOT_LINES[currentLine];
    const timer = setTimeout(() => {
      setLines((prev) => [...prev, line]);
      setCurrentLine((prev) => prev + 1);
    }, line.delay);

    return () => clearTimeout(timer);
  }, [currentLine, phase]);

  // Progress bar after lines
  useEffect(() => {
    if (phase !== "progress") return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          finish();
          return 100;
        }
        return prev + 4;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [phase, finish]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        background: "#0a0a0a",
        opacity,
        transition: "opacity 0.6s ease-out",
      }}
    >
      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
          zIndex: 2,
        }}
      />

      {/* CRT vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.7) 100%)",
          zIndex: 3,
        }}
      />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-3xl px-6" style={{ fontFamily: "'Fira Code', monospace" }}>
        {/* Terminal output */}
        <div
          className="overflow-hidden"
          style={{
            maxHeight: "70vh",
            fontSize: "13px",
            lineHeight: "1.6",
          }}
        >
          {lines.map((line, i) => (
            <div
              key={i}
              className="animate-fade-in"
              style={{
                color: getLineColor(line.type),
                fontWeight: line.type === "ascii" ? 700 : line.type === "welcome" ? 600 : 400,
                fontSize: line.type === "ascii" ? "min(11px, 2.2vw)" : line.type === "welcome" ? "15px" : "13px",
                letterSpacing: line.type === "ascii" ? "0.5px" : "0",
                whiteSpace: "pre",
              }}
            >
              {line.text}
            </div>
          ))}

          {/* Blinking cursor */}
          {phase === "booting" && (
            <span
              className="inline-block animate-blink"
              style={{
                width: "8px",
                height: "15px",
                backgroundColor: "#4ec9b0",
                marginLeft: "2px",
                verticalAlign: "middle",
              }}
            />
          )}
        </div>

        {/* Progress bar */}
        {phase === "progress" && (
          <div className="mt-6 animate-fade-in">
            <div className="flex justify-between text-xs mb-1" style={{ color: "#808080" }}>
              <span>Launching workspace...</span>
              <span>{Math.min(progress, 100)}%</span>
            </div>
            <div
              style={{
                height: "3px",
                background: "#252526",
                borderRadius: "2px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #007acc, #4ec9b0)",
                  borderRadius: "2px",
                  transition: "width 0.05s linear",
                  boxShadow: "0 0 10px rgba(0, 122, 204, 0.5)",
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Skip button */}
      {phase !== "done" && (
        <button
          onClick={finish}
          className="absolute bottom-8 right-8 z-20 text-xs px-4 py-2 rounded-md transition-all duration-300 hover:bg-[#333]"
          style={{
            color: "#666",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            fontFamily: "'Fira Code', monospace",
          }}
        >
          Skip ⏎
        </button>
      )}
    </div>
  );
}
