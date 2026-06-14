import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  VscChevronDown,
  VscChromeClose,
  VscTerminal,
} from "react-icons/vsc";

const COMMANDS = {
  help: () => [
    "Available commands:",
    "",
    "  whoami          — Who am I?",
    "  about           — About me",
    "  skills          — List my tech skills",
    "  ls projects     — List all projects",
    "  experience      — Work experience",
    "  contact         — Contact info",
    "  open <file>     — Open a file tab",
    "  clear           — Clear terminal",
    "  echo <text>     — Echo text",
    "  date            — Current date",
    "  sudo hire-me    — 🤫",
    "  help            — Show this message",
    "",
    "  Tip: Use ↑↓ arrow keys for command history",
  ],

  whoami: () => [
    "┌──────────────────────────────────────┐",
    "│  Shivam Kumar                        │",
    "│  Senior Web Developer                │",
    "│  Full-Stack | MERN | Laravel | AWS   │",
    "│  shivamkumar9969@github              │",
    "└──────────────────────────────────────┘",
  ],

  about: () => [
    "",
    "  Hi! I'm Shivam Kumar 👋",
    "",
    "  I specialize in building high-performance",
    "  backend systems with Node.js, Next.js, and Laravel.",
    "  I design secure REST APIs, optimize database ops,",
    "  and deliver architectures that scale effortlessly.",
    "",
    "  I believe in writing code that's not just functional",
    "  — but maintainable, efficient, and built to scale.",
    "",
  ],

  skills: () => [
    "",
    "  ┌─────────────────┬──────────────────┐",
    "  │ Languages        │ JS, PHP, Python, │",
    "  │                  │ C++, TS, Java    │",
    "  ├─────────────────┼──────────────────┤",
    "  │ Frontend         │ React, HTML, CSS │",
    "  ├─────────────────┼──────────────────┤",
    "  │ Backend          │ Laravel, Node,   │",
    "  │                  │ Express, Next.js │",
    "  ├─────────────────┼──────────────────┤",
    "  │ Database         │ SQL, MongoDB     │",
    "  ├─────────────────┼──────────────────┤",
    "  │ Tools            │ Git, Linux, AWS, │",
    "  │                  │ DevOps, REST API │",
    "  └─────────────────┴──────────────────┘",
    "",
  ],

  experience: () => [
    "",
    "  🏢 Guru Kashi University",
    "     Senior Web Developer | Nov 2024 – Present",
    "     → React, Node.js, Laravel, PHP, Databases",
    "",
    "  🏢 Rackron Technologies Pvt Ltd",
    "     Software Developer | June 2024 – Present",
    "     → Node.js, Laravel, MERN, AWS",
    "",
    "  🎓 DevTown",
    "     Full Stack Intern | Sep – Nov 2023",
    "     → React.js, Node.js, MongoDB",
    "",
  ],

  contact: () => [
    "",
    "  📧 Email:    shivamkumar9969@gmail.com",
    "  🐙 GitHub:   github.com/shivamkumar9969",
    "  💼 LinkedIn: linkedin.com/in/shivam-kumar-7b896a254",
    "  🐦 Twitter:  @shivamkumar9969",
    "",
  ],

  date: () => [
    `  ${new Date().toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })}`,
  ],

  "sudo hire-me": () => [
    "",
    "  🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉",
    "  🚀 CONGRATULATIONS! You've unlocked:",
    "  ",
    "  ╔═══════════════════════════════════════╗",
    "  ║   ✅ A highly motivated developer     ║",
    "  ║   ✅ Full-stack expertise              ║",
    "  ║   ✅ Clean code enthusiast             ║",
    "  ║   ✅ Team player & fast learner        ║",
    "  ║   ✅ Available for exciting roles!     ║",
    "  ╚═══════════════════════════════════════╝",
    "  ",
    "  📩 Let's connect: shivamkumar9969@gmail.com",
    "  🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉",
    "",
  ],

  "ls projects": () => [
    "",
    "  drwxr-xr-x  crypto-automation/",
    "  drwxr-xr-x  easy-peasy/",
    "  drwxr-xr-x  invoice-generator/",
    "  drwxr-xr-x  e-commerce/",
    "  drwxr-xr-x  drive-buddy/",
    "  drwxr-xr-x  defiance-system/",
    "  drwxr-xr-x  education-admin/",
    "",
    "  7 directories",
    "",
  ],
};

const FILE_MAP = {
  "index.html": "about",
  "about": "about",
  "skills.js": "skills",
  "skills": "skills",
  "experience.js": "experience",
  "experience": "experience",
  "projects.js": "projects",
  "projects": "projects",
  "achievements.js": "achievements",
  "achievements": "achievements",
  "contact.js": "contact",
  "contact": "contact",
  ".gitignore": "gitignore",
  "gitignore": "gitignore",
  "package.json": "package",
  "readme.md": "readme",
  "readme": "readme",
};

export default function Terminal({ isOpen, onToggle, onOpenFile, height = 220 }) {
  const [history, setHistory] = useState([
    { type: "system", text: "Welcome to Shivam's Portfolio Terminal" },
    { type: "system", text: 'Type "help" for available commands.\n' },
  ]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  }, [isOpen]);

  const processCommand = useCallback(
    (cmd) => {
      const trimmed = cmd.trim().toLowerCase();
      const newEntries = [{ type: "input", text: cmd.trim() }];

      if (!trimmed) {
        setHistory((prev) => [...prev, ...newEntries]);
        return;
      }

      if (trimmed === "clear") {
        setHistory([]);
        return;
      }

      // echo command
      if (trimmed.startsWith("echo ")) {
        newEntries.push({ type: "output", text: cmd.trim().slice(5) });
        setHistory((prev) => [...prev, ...newEntries]);
        return;
      }

      // open command
      if (trimmed.startsWith("open ")) {
        const filename = trimmed.slice(5).trim();
        const fileId = FILE_MAP[filename];
        if (fileId) {
          newEntries.push({
            type: "success",
            text: `Opening ${filename}...`,
          });
          setHistory((prev) => [...prev, ...newEntries]);
          if (onOpenFile) onOpenFile(fileId);
          return;
        } else {
          newEntries.push({
            type: "error",
            text: `File not found: ${filename}`,
          });
          newEntries.push({
            type: "system",
            text: 'Available files: index.html, skills.js, experience.js, projects.js, achievements.js, contact.js, .gitignore, package.json, readme.md',
          });
          setHistory((prev) => [...prev, ...newEntries]);
          return;
        }
      }

      // ls without arguments
      if (trimmed === "ls") {
        const output = COMMANDS["ls projects"]();
        newEntries.push(...output.map((t) => ({ type: "output", text: t })));
        setHistory((prev) => [...prev, ...newEntries]);
        return;
      }

      // Check known commands
      if (COMMANDS[trimmed]) {
        const output = COMMANDS[trimmed]();
        newEntries.push(...output.map((t) => ({ type: "output", text: t })));
      } else {
        newEntries.push({
          type: "error",
          text: `command not found: ${cmd.trim()}`,
        });
        newEntries.push({
          type: "system",
          text: 'Type "help" for available commands.',
        });
      }

      setHistory((prev) => [...prev, ...newEntries]);
    },
    [onOpenFile]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    processCommand(input);
    if (input.trim()) {
      setCmdHistory((prev) => [input.trim(), ...prev]);
    }
    setInput("");
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < cmdHistory.length - 1) {
        const newIdx = historyIndex + 1;
        setHistoryIndex(newIdx);
        setInput(cmdHistory[newIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIdx = historyIndex - 1;
        setHistoryIndex(newIdx);
        setInput(cmdHistory[newIdx]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Simple tab completion
      const allCmds = [
        "help", "whoami", "about", "skills", "experience",
        "contact", "date", "clear", "echo", "open", "ls projects",
        "sudo hire-me",
      ];
      const match = allCmds.find((c) => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  const getColor = (type) => {
    switch (type) {
      case "input": return "#d4d4d4";
      case "output": return "#9cdcfe";
      case "success": return "#4ec9b0";
      case "error": return "#f44747";
      case "system": return "#666666";
      default: return "#d4d4d4";
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="border-t border-gray-700 flex flex-col animate-slide-up"
      style={{
        height: `${height}px`,
        background: "rgba(15, 15, 15, 0.95)",
        backdropFilter: "blur(10px)",
        fontFamily: "'Fira Code', monospace",
      }}
    >
      {/* Terminal header */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-gray-800 bg-[#1a1a1a]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-gray-400 text-xs">
            <VscTerminal size={14} />
            <span className="font-semibold uppercase text-[11px] tracking-wide">Terminal</span>
          </div>
          <span className="text-[10px] text-gray-600 ml-2">bash</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onToggle}
            className="p-1 hover:bg-gray-700 rounded transition-colors text-gray-500 hover:text-white"
            title="Minimize"
          >
            <VscChevronDown size={14} />
          </button>
          <button
            onClick={onToggle}
            className="p-1 hover:bg-[#c53030] rounded transition-colors text-gray-500 hover:text-white"
            title="Close"
          >
            <VscChromeClose size={14} />
          </button>
        </div>
      </div>

      {/* Terminal output */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-2 text-xs leading-5"
        onClick={() => inputRef.current?.focus({ preventScroll: true })}
      >
        {history.map((entry, i) => (
          <div key={i} style={{ color: getColor(entry.type) }}>
            {entry.type === "input" ? (
              <span>
                <span className="text-[#4ec9b0]">shivam</span>
                <span className="text-gray-500">@</span>
                <span className="text-[#c586c0]">portfolio</span>
                <span className="text-gray-500">:~$ </span>
                <span className="text-white">{entry.text}</span>
              </span>
            ) : (
              <span style={{ whiteSpace: "pre" }}>{entry.text}</span>
            )}
          </div>
        ))}

        {/* Input line */}
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-[#4ec9b0]">shivam</span>
          <span className="text-gray-500">@</span>
          <span className="text-[#c586c0]">portfolio</span>
          <span className="text-gray-500">:~$ </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-white text-xs ml-1"
            style={{ fontFamily: "'Fira Code', monospace", caretColor: "#4ec9b0" }}
            autoComplete="off"
            spellCheck="false"
          />
        </form>
      </div>
    </div>
  );
}
