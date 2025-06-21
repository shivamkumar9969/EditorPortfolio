import React, { useState, useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css"; // VSCode dark-ish theme

import "prismjs/components/prism-javascript"; // load languages you need
import "prismjs/components/prism-markdown";
// Add more languages as required

const files = [
  {
    id: 1,
    name: "About.md",
    lang: "markdown",
    content: `# Hello, I'm John Doe

I'm a **Software Engineer** specializing in full-stack development.

- JavaScript
- React
- Node.js
- CSS`,
  },
  {
    id: 2,
    name: "Projects.js",
    lang: "javascript",
    content: `// My Projects
const projects = [
  { id: 1, name: "Portfolio Website", tech: "React, Tailwind" },
  { id: 2, name: "Chat App", tech: "Node.js, Socket.IO" },
];
`,
  },
  // Add your files here
];

export default function VSCodePortfolio() {
  const [openFiles, setOpenFiles] = useState([files[0]]);
  const [activeFileId, setActiveFileId] = useState(files[0].id);

  // Prism highlight effect after render
  useEffect(() => {
    Prism.highlightAll();
  }, [activeFileId, openFiles]);

  function openFile(file) {
    if (!openFiles.find(f => f.id === file.id)) {
      setOpenFiles([...openFiles, file]);
    }
    setActiveFileId(file.id);
  }

  const activeFile = openFiles.find(f => f.id === activeFileId);

  return (
    <div className="vscode-portfolio">
      <aside className="sidebar" aria-label="Sidebar">
        <div className="sidebar-header">JD</div>
        {files.map(file => (
          <button
            key={file.id}
            onClick={() => openFile(file)}
            aria-pressed={activeFileId === file.id}
            className={`sidebar-file-btn ${
              activeFileId === file.id ? "active" : ""
            }`}
          >
            {file.name}
          </button>
        ))}
      </aside>

      <main className="main-panel">
        <nav className="tabs" role="tablist">
          {openFiles.map(file => (
            <button
              key={file.id}
              onClick={() => setActiveFileId(file.id)}
              role="tab"
              aria-selected={activeFileId === file.id}
              className={`tab ${activeFileId === file.id ? "active" : ""}`}
              id={`tab-${file.id}`}
              aria-controls={`panel-${file.id}`}
            >
              {file.name}
            </button>
          ))}
        </nav>

        <section
          className="editor"
          role="tabpanel"
          tabIndex={0}
          id={`panel-${activeFile.id}`}
          aria-labelledby={`tab-${activeFile.id}`}
        >
          <pre className={`language-${activeFile.lang}`}>
            <code>{activeFile.content}</code>
          </pre>
        </section>

        <footer className="status-bar" aria-label="Status Bar">
          <div>VS Code Portfolio - John Doe</div>
          <div>UTF-8</div>
          <div>Ln 1, Col 1</div>
        </footer>
      </main>
    </div>
  );
}