import React from "react";

export function GitIgnore() {
  const lines = [
    { text: "# Ignored node modules", type: "comment" },
    { text: "node_modules/", type: "value" },
    { text: "", type: "blank" },
    { text: "# Build output", type: "comment" },
    { text: "dist/", type: "value" },
    { text: "build/", type: "value" },
    { text: "", type: "blank" },
    { text: "# Logs", type: "comment" },
    { text: "*.log", type: "value" },
    { text: "", type: "blank" },
    { text: "# Environment config", type: "comment" },
    { text: ".env", type: "value" },
    { text: ".env.local", type: "value" },
    { text: ".env.production", type: "value" },
    { text: "", type: "blank" },
    { text: "# Editor folders", type: "comment" },
    { text: ".vscode/", type: "value" },
    { text: ".idea/", type: "value" },
    { text: "", type: "blank" },
    { text: "# Misc", type: "comment" },
    { text: ".DS_Store", type: "value" },
    { text: "Thumbs.db", type: "value" },
  ];

  return (
    <div className="text-sm font-mono">
      <h2 className="text-lg font-bold mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
        <span className="text-gray-600">{`//`}</span>
        <span className="text-[#e84e31] ml-2">.gitignore</span>
      </h2>
      <div className="space-y-0">
        {lines.map((line, i) => (
          <div key={i} className="flex">
            <span className="text-gray-600 text-xs w-6 text-right mr-4 select-none flex-shrink-0">
              {i + 1}
            </span>
            {line.type === "comment" ? (
              <span className="text-[#6a9955]">{line.text}</span>
            ) : line.type === "value" ? (
              <span className="text-[#ce9178]">{line.text}</span>
            ) : (
              <span>&nbsp;</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function PackageJson() {
  const json = `{
  "name": "shivam-portfolio",
  "version": "2.0.0",
  "private": true,
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test"
  },
  "dependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-icons": "^5.5.0",
    "emailjs-com": "^3.2.0",
    "lucide-react": "^0.525.0",
    "tailwindcss": "^3.4.17"
  }
}`;

  return (
    <div className="text-sm font-mono">
      <h2 className="text-lg font-bold mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
        <span className="text-gray-600">{`//`}</span>
        <span className="text-[#5bb974] ml-2">package.json</span>
      </h2>
      <pre className="text-[13px] leading-relaxed">
        {json.split("\n").map((line, i) => (
          <div key={i} className="flex">
            <span className="text-gray-600 text-xs w-6 text-right mr-4 select-none flex-shrink-0">
              {i + 1}
            </span>
            <span
              dangerouslySetInnerHTML={{
                __html: line
                  .replace(/"([^"]*)":/g, '<span style="color: #9cdcfe">"$1"</span>:')
                  .replace(/: "([^"]*)"/g, ': <span style="color: #ce9178">"$1"</span>')
                  .replace(/: (\^[^,\n]*)/g, ': <span style="color: #ce9178">$1</span>')
                  .replace(/[{}[\]]/g, '<span style="color: #d4d4d4">$&</span>'),
              }}
            />
          </div>
        ))}
      </pre>
    </div>
  );
}

export function Readme() {
  return (
    <div className="text-sm font-mono">
      <h2 className="text-lg font-bold mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
        <span className="text-gray-600">{`//`}</span>
        <span className="text-[#519aba] ml-2">README.md</span>
      </h2>

      <div className="glass-card p-5 rounded-lg space-y-3">
        <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
          Shivam Kumar's VSCode Portfolio
        </h3>
        <p className="text-gray-400 text-xs leading-relaxed">
          A modern VS Code-style portfolio built using React and Tailwind CSS,
          mimicking the Visual Studio Code interface for a developer-centric presentation.
        </p>
        <div className="border-t border-gray-700/50 pt-3">
          <h4 className="text-[#007acc] text-xs font-semibold mb-2">## Features</h4>
          <ul className="text-gray-400 text-xs space-y-1.5">
            <li className="flex items-center gap-2"><span className="text-[#4ec9b0]">✦</span> Interactive file tree navigation</li>
            <li className="flex items-center gap-2"><span className="text-[#4ec9b0]">✦</span> Integrated terminal with commands</li>
            <li className="flex items-center gap-2"><span className="text-[#4ec9b0]">✦</span> Command palette (Ctrl+Shift+P)</li>
            <li className="flex items-center gap-2"><span className="text-[#4ec9b0]">✦</span> Particle background & cursor glow</li>
            <li className="flex items-center gap-2"><span className="text-[#4ec9b0]">✦</span> Cinematic boot sequence</li>
            <li className="flex items-center gap-2"><span className="text-[#4ec9b0]">✦</span> Skills, Projects, Experience & more</li>
            <li className="flex items-center gap-2"><span className="text-[#4ec9b0]">✦</span> GitHub style .gitignore and package.json</li>
          </ul>
        </div>
        <div className="border-t border-gray-700/50 pt-3">
          <h4 className="text-[#007acc] text-xs font-semibold mb-1">## Keyboard Shortcuts</h4>
          <div className="text-xs text-gray-400 space-y-1">
            <div><kbd className="bg-gray-800 px-1.5 py-0.5 rounded text-[10px] border border-gray-600">Ctrl+Shift+P</kbd> — Command Palette</div>
            <div><kbd className="bg-gray-800 px-1.5 py-0.5 rounded text-[10px] border border-gray-600">Ctrl+`</kbd> — Toggle Terminal</div>
            <div><kbd className="bg-gray-800 px-1.5 py-0.5 rounded text-[10px] border border-gray-600">Ctrl+B</kbd> — Toggle Sidebar</div>
          </div>
        </div>
        <p className="text-gray-600 text-[10px] italic border-l-2 border-gray-700 pl-3 mt-3">
          This README is for display purposes only.
        </p>
      </div>
    </div>
  );
}
