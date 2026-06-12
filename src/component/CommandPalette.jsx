import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  VscFile,
  VscTerminal,
  VscGithubInverted,
  VscColorMode,
  VscCloudDownload,
  VscInfo,
  VscSymbolMisc,
} from "react-icons/vsc";

const COMMANDS_LIST = [
  { id: "about", label: "Open About (index.html)", icon: VscFile, category: "Files", fileId: "about" },
  { id: "skills", label: "Open Skills.js", icon: VscFile, category: "Files", fileId: "skills" },
  { id: "experience", label: "Open Experience.js", icon: VscFile, category: "Files", fileId: "experience" },
  { id: "projects", label: "Open Projects.js", icon: VscFile, category: "Files", fileId: "projects" },
  { id: "achievements", label: "Open Achievements.js", icon: VscFile, category: "Files", fileId: "achievements" },
  { id: "contact", label: "Open Contact.js", icon: VscFile, category: "Files", fileId: "contact" },
  { id: "toggle-terminal", label: "Toggle Terminal", icon: VscTerminal, category: "View", action: "toggleTerminal" },
  { id: "toggle-sidebar", label: "Toggle Sidebar", icon: VscSymbolMisc, category: "View", action: "toggleSidebar" },
  { id: "download-resume", label: "Download Resume (PDF)", icon: VscCloudDownload, category: "Actions", action: "downloadResume" },
  { id: "github", label: "Open GitHub Profile", icon: VscGithubInverted, category: "Links", action: "openGithub" },
  { id: "linkedin", label: "Open LinkedIn Profile", icon: VscInfo, category: "Links", action: "openLinkedin" },
  { id: "theme", label: "Toggle Theme (Coming Soon)", icon: VscColorMode, category: "Preferences", action: "toggleTheme" },
];

export default function CommandPalette({ isOpen, onClose, onExecute }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return COMMANDS_LIST;
    const q = query.toLowerCase();
    return COMMANDS_LIST.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(q) ||
        cmd.category.toLowerCase().includes(q)
    );
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const active = listRef.current.querySelector("[data-active='true']");
      if (active) active.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  const handleExecute = (cmd) => {
    onExecute(cmd);
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[selectedIndex]) handleExecute(filtered[selectedIndex]);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[999] bg-black/50"
        onClick={onClose}
      />

      {/* Palette */}
      <div
        className="fixed top-[15%] left-1/2 -translate-x-1/2 z-[1000] w-[560px] max-w-[90vw] animate-slide-down"
        style={{
          background: "rgba(30, 30, 30, 0.98)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(0, 122, 204, 0.3)",
          borderRadius: "8px",
          boxShadow:
            "0 25px 60px rgba(0,0,0,0.6), 0 0 30px rgba(0, 122, 204, 0.1)",
          fontFamily: "'Fira Code', monospace",
        }}
      >
        {/* Search input */}
        <div className="flex items-center px-4 py-3 border-b border-gray-700">
          <span className="text-gray-500 text-sm mr-2">{">"}</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-gray-500"
            style={{ fontFamily: "'Fira Code', monospace" }}
            autoComplete="off"
            spellCheck="false"
          />
          <kbd className="text-[10px] text-gray-500 bg-gray-800 px-1.5 py-0.5 rounded border border-gray-600">
            ESC
          </kbd>
        </div>

        {/* Command list */}
        <div
          ref={listRef}
          className="max-h-[320px] overflow-y-auto py-1"
        >
          {filtered.length === 0 ? (
            <div className="text-center text-gray-500 text-xs py-6">
              No matching commands
            </div>
          ) : (
            filtered.map((cmd, i) => {
              const Icon = cmd.icon;
              const isActive = i === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  data-active={isActive}
                  onClick={() => handleExecute(cmd)}
                  onMouseEnter={() => setSelectedIndex(i)}
                  className="w-full flex items-center px-4 py-2 text-left transition-colors duration-75"
                  style={{
                    background: isActive
                      ? "rgba(0, 122, 204, 0.15)"
                      : "transparent",
                    color: isActive ? "#ffffff" : "#cccccc",
                  }}
                >
                  <Icon
                    size={16}
                    className="mr-3 flex-shrink-0"
                    style={{ color: isActive ? "#007acc" : "#666" }}
                  />
                  <span className="text-xs flex-1">{cmd.label}</span>
                  <span
                    className="text-[10px] ml-2 px-1.5 py-0.5 rounded"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      color: "#666",
                    }}
                  >
                    {cmd.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-gray-800 text-[10px] text-gray-600">
          <span>↑↓ Navigate</span>
          <span>⏎ Execute</span>
          <span>ESC Close</span>
        </div>
      </div>
    </>
  );
}
