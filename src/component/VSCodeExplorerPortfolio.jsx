import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  VscFolder,
  VscFolderOpened,
  VscFile,

  VscChevronDown,
  VscChromeClose,
  VscFiles,
  VscSearch,
  VscSourceControl,
  VscExtensions,
  VscSettingsGear,
  VscTerminal,
  VscSplitHorizontal,
} from "react-icons/vsc";

import About from "../pages/About";
import Skills from "../pages/Skills";
import Experience from "../pages/Experience";
import Projects from "../pages/Projects";
import Contact from "../pages/Contact";
import AchievementCertifacte from "../pages/AchievementCertifacte";
import { GitIgnore, PackageJson, Readme } from "../pages/ShowCaseOnly";
import Terminal from "./Terminal";
import CommandPalette from "./CommandPalette";
import ShivamResume from "../assests/ShivamResume.pdf";

/* ─── File Tree Data ─── */
const portfolioSections = [
  {
    id: "portfolio",
    name: "PORTFOLIO",
    type: "folder",
    isExpanded: true,
    children: [
      {
        id: "public",
        name: "public",
        type: "folder",
        isExpanded: true,
        children: [
          { id: "about", name: "index.html", type: "file", component: About, icon: "html" },
        ],
      },
      {
        id: "src",
        name: "src",
        type: "folder",
        isExpanded: true,
        children: [
          { id: "skills", name: "Skills.js", type: "file", component: Skills, icon: "js" },
          { id: "experience", name: "Experience.js", type: "file", component: Experience, icon: "js" },
          { id: "projects", name: "Projects.js", type: "file", component: Projects, icon: "js" },
          { id: "achievements", name: "Achievements.js", type: "file", component: AchievementCertifacte, icon: "js" },
          { id: "contact", name: "Contact.js", type: "file", component: Contact, icon: "js" },
        ],
      },
      { id: "gitignore", name: ".gitignore", type: "file", component: GitIgnore, icon: "git" },
      { id: "package", name: "package.json", type: "file", component: PackageJson, icon: "json" },
      { id: "readme", name: "README.md", type: "file", component: Readme, icon: "md" },
    ],
  },
];

/* ─── File Icon Colors ─── */
function getFileIconColor(icon) {
  switch (icon) {
    case "html": return "#e44d26";
    case "js": return "#f7df1e";
    case "json": return "#5bb974";
    case "md": return "#519aba";
    case "git": return "#e84e31";
    default: return "#8b8b8b";
  }
}

/* ─── Flat file lookup ─── */
function flattenFiles(nodes) {
  const files = [];
  for (const node of nodes) {
    if (node.type === "file") files.push(node);
    if (node.children) files.push(...flattenFiles(node.children));
  }
  return files;
}
const ALL_FILES = flattenFiles(portfolioSections);

/* ─── Explorer Node ─── */
function ExplorerNode({ node, indent = 0, onSelectFile, selectedFileId }) {
  const [expanded, setExpanded] = useState(node.isExpanded ?? false);

  if (node.type === "folder") {
    return (
      <div>
        <div
          className="flex items-center cursor-pointer select-none py-[3px] hover:bg-[#2a2d2e] rounded-sm transition-colors duration-150 group"
          style={{ paddingLeft: indent * 14 + 8 }}
          onClick={() => setExpanded((prev) => !prev)}
        >
          <span className="mr-1 text-gray-500 transition-transform duration-200"
            style={{ transform: expanded ? "rotate(0deg)" : "rotate(-90deg)", display: "inline-flex" }}>
            <VscChevronDown size={14} />
          </span>
          <span className="mr-1.5" style={{ color: expanded ? "#dcb67a" : "#8b8b8b" }}>
            {expanded ? <VscFolderOpened size={15} /> : <VscFolder size={15} />}
          </span>
          <span className="text-[12px] text-gray-300 font-medium tracking-wide"
            style={{ fontFamily: "'Inter', sans-serif" }}>
            {node.name}
          </span>
        </div>
        <div style={{
          overflow: "hidden",
          maxHeight: expanded ? "1000px" : "0",
          transition: "max-height 0.3s ease-in-out",
        }}>
          {node.children.map((child) => (
            <ExplorerNode
              key={child.id}
              node={child}
              indent={indent + 1}
              onSelectFile={onSelectFile}
              selectedFileId={selectedFileId}
            />
          ))}
        </div>
      </div>
    );
  }

  if (node.type === "file") {
    const isSelected = selectedFileId === node.id;
    return (
      <div
        className={`flex items-center cursor-pointer select-none py-[3px] rounded-sm transition-all duration-150 ${
          isSelected
            ? "bg-[#37373d] text-white"
            : "text-gray-400 hover:bg-[#2a2d2e] hover:text-gray-200"
        }`}
        style={{ paddingLeft: indent * 14 + 24 }}
        onClick={() => onSelectFile(node)}
      >
        <VscFile size={14} className="mr-1.5 flex-shrink-0" style={{ color: getFileIconColor(node.icon) }} />
        <span className="text-[12px] truncate" style={{ fontFamily: "'Inter', sans-serif" }}>
          {node.name}
        </span>
      </div>
    );
  }
  return null;
}

/* ─── Main Component ─── */
export default function VSCodeExplorerPortfolio() {
  const defaultFile = ALL_FILES[0]; // index.html
  const [openTabs, setOpenTabs] = useState([defaultFile]);
  const [selectedFile, setSelectedFile] = useState(defaultFile);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeActivity, setActiveActivity] = useState("explorer");
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [statusItems] = useState({ branch: "main", errors: 0, warnings: 0 });
  const editorRef = useRef(null);

  /* ─── Tab Management ─── */
  const handleTabClick = useCallback(
    (file) => {
      setOpenTabs((prev) =>
        prev.find((tab) => tab.id === file.id) ? prev : [...prev, file]
      );
      setSelectedFile(file);
    },
    []
  );

  const handleTabClose = useCallback(
    (file) => {
      setOpenTabs((prev) => {
        const filtered = prev.filter((tab) => tab.id !== file.id);
        if (selectedFile.id === file.id && filtered.length > 0) {
          setSelectedFile(filtered[filtered.length - 1]);
        }
        return filtered;
      });
    },
    [selectedFile]
  );

  /* ─── Open file by id (for terminal & command palette) ─── */
  const openFileById = useCallback(
    (fileId) => {
      const file = ALL_FILES.find((f) => f.id === fileId);
      if (file) handleTabClick(file);
    },
    [handleTabClick]
  );

  /* ─── Command Palette Execution ─── */
  const handlePaletteExecute = useCallback(
    (cmd) => {
      if (cmd.fileId) {
        openFileById(cmd.fileId);
      } else if (cmd.action === "toggleTerminal") {
        setTerminalOpen((p) => !p);
      } else if (cmd.action === "toggleSidebar") {
        setSidebarOpen((p) => !p);
      } else if (cmd.action === "downloadResume") {
        const a = document.createElement("a");
        a.href = ShivamResume;
        a.download = "ShivamResume.pdf";
        a.click();
      } else if (cmd.action === "openGithub") {
        window.open("https://github.com/shivamkumar9969", "_blank");
      } else if (cmd.action === "openLinkedin") {
        window.open("https://www.linkedin.com/in/shivam-kumar-7b896a254/", "_blank");
      }
    },
    [openFileById]
  );

  /* ─── Keyboard Shortcuts ─── */
  useEffect(() => {
    const handleKey = (e) => {
      // Ctrl+Shift+P → Command Palette
      if (e.ctrlKey && e.shiftKey && e.key === "P") {
        e.preventDefault();
        setPaletteOpen((p) => !p);
      }
      // Ctrl+` → Toggle Terminal
      if (e.ctrlKey && e.key === "`") {
        e.preventDefault();
        setTerminalOpen((p) => !p);
      }
      // Ctrl+B → Toggle Sidebar
      if (e.ctrlKey && e.key === "b") {
        e.preventDefault();
        setSidebarOpen((p) => !p);
      }
      // Escape → Close palette
      if (e.key === "Escape") {
        setPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  /* ─── Activity bar icons ─── */
  const activityItems = [
    { id: "explorer", icon: VscFiles, tooltip: "Explorer (Ctrl+Shift+E)" },
    { id: "search", icon: VscSearch, tooltip: "Search (Ctrl+Shift+F)" },
    { id: "git", icon: VscSourceControl, tooltip: "Source Control (Ctrl+Shift+G)" },
    { id: "extensions", icon: VscExtensions, tooltip: "Extensions (Ctrl+Shift+X)" },
  ];

  return (
    <div className="flex h-screen w-screen font-mono text-gray-300 relative" style={{ background: "#181818" }}>
      {/* ─── Activity Bar (far left icon strip) ─── */}
      <div className="w-12 flex flex-col items-center py-2 border-r border-[#2b2b2b] flex-shrink-0"
        style={{ background: "#181818" }}>
        {activityItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeActivity === item.id;
          return (
            <button
              key={item.id}
              title={item.tooltip}
              className={`w-full flex items-center justify-center py-3 transition-all duration-200 relative group ${
                isActive
                  ? "text-white"
                  : "text-gray-500 hover:text-gray-300"
              }`}
              onClick={() => {
                if (item.id === "explorer") {
                  setActiveActivity("explorer");
                  setSidebarOpen(true);
                } else {
                  setActiveActivity(item.id);
                  setSidebarOpen(true);
                }
              }}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-6 bg-white rounded-r" />
              )}
              <Icon size={22} />
            </button>
          );
        })}

        {/* Bottom icons */}
        <div className="mt-auto flex flex-col items-center gap-1">
          <button
            title="Toggle Terminal (Ctrl+`)"
            className={`w-full flex items-center justify-center py-3 transition-colors duration-200 ${
              terminalOpen ? "text-white" : "text-gray-500 hover:text-gray-300"
            }`}
            onClick={() => setTerminalOpen((p) => !p)}
          >
            <VscTerminal size={20} />
          </button>
          <button
            title="Settings"
            className="w-full flex items-center justify-center py-3 text-gray-500 hover:text-gray-300 transition-colors duration-200"
          >
            <VscSettingsGear size={20} />
          </button>
        </div>
      </div>

      {/* ─── Sidebar ─── */}
      <aside
        className="border-r border-[#2b2b2b] flex flex-col flex-shrink-0 transition-all duration-300 overflow-hidden"
        style={{
          width: sidebarOpen ? "240px" : "0px",
          background: "#1f1f1f",
          minWidth: sidebarOpen ? "200px" : "0px",
        }}
      >
        {/* Sidebar Header */}
        <div className="flex items-center px-4 py-3 border-b border-[#2b2b2b] min-h-[40px]">
          <span className="uppercase font-semibold text-[11px] text-gray-400 tracking-wider"
            style={{ fontFamily: "'Inter', sans-serif" }}>
            Explorer
          </span>
        </div>

        {/* File Tree */}
        <div className="flex-1 overflow-y-auto py-1.5 px-1">
          {portfolioSections.map((node) => (
            <ExplorerNode
              key={node.id}
              node={node}
              onSelectFile={handleTabClick}
              selectedFileId={selectedFile.id}
            />
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="px-3 py-2 border-t border-[#2b2b2b] text-[10px] text-gray-600">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Portfolio v2.0 — Active</span>
          </div>
        </div>
      </aside>

      {/* ─── Main Editor ─── */}
      <main className="flex-1 flex flex-col min-w-0 relative" style={{ background: "#1e1e1e" }}>
        {/* ─── Tabs ─── */}
        <nav className="flex items-center border-b border-[#2b2b2b] min-h-[36px] overflow-x-auto"
          style={{ background: "#1f1f1f" }}>
          {openTabs.map((tab) => {
            const isActive = selectedFile.id === tab.id;
            return (
              <div
                key={tab.id}
                className={`flex items-center px-3 py-[7px] cursor-pointer border-r border-[#2b2b2b] transition-all duration-150 group min-w-0 ${
                  isActive
                    ? "bg-[#1e1e1e] text-white"
                    : "bg-[#1f1f1f] text-gray-500 hover:text-gray-300 hover:bg-[#2a2a2a]"
                }`}
                onClick={() => handleTabClick(tab)}
                style={{ position: "relative" }}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-[1px]"
                    style={{ background: "linear-gradient(90deg, #007acc, #4ec9b0)" }} />
                )}
                <VscFile size={13} className="mr-1.5 flex-shrink-0"
                  style={{ color: getFileIconColor(tab.icon) }} />
                <span className="text-[12px] truncate mr-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {tab.name}
                </span>
                <VscChromeClose
                  size={14}
                  className="flex-shrink-0 opacity-0 group-hover:opacity-100 hover:bg-[#444] rounded p-[1px] transition-all duration-150"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTabClose(tab);
                  }}
                />
              </div>
            );
          })}

          {/* Right side buttons */}
          <div className="ml-auto flex items-center px-2 gap-1">
            <button
              title="Split Editor"
              className="p-1 text-gray-600 hover:text-gray-300 transition-colors"
            >
              <VscSplitHorizontal size={15} />
            </button>
          </div>
        </nav>

        {/* ─── Breadcrumb ─── */}
        <div className="flex items-center px-4 py-1 border-b border-[#2b2b2b] text-[11px] text-gray-500"
          style={{ background: "#1e1e1e", fontFamily: "'Inter', sans-serif" }}>
          <span className="hover:text-gray-300 cursor-pointer transition-colors">portfolio</span>
          <span className="mx-1 text-gray-600">›</span>
          {selectedFile.id === "about" && (
            <>
              <span className="hover:text-gray-300 cursor-pointer transition-colors">public</span>
              <span className="mx-1 text-gray-600">›</span>
            </>
          )}
          {["skills", "experience", "projects", "achievements", "contact"].includes(selectedFile.id) && (
            <>
              <span className="hover:text-gray-300 cursor-pointer transition-colors">src</span>
              <span className="mx-1 text-gray-600">›</span>
            </>
          )}
          <span className="text-gray-300">{selectedFile.name}</span>
        </div>

        {/* ─── Editor Content ─── */}
        <section
          ref={editorRef}
          className="flex-1 overflow-auto relative"
          style={{ background: "#1e1e1e" }}
        >
          {/* Line numbers gutter */}
          <div className="absolute left-0 top-0 bottom-0 w-[50px] border-r border-[#2b2b2b] pointer-events-none select-none"
            style={{ background: "#1e1e1e", zIndex: 2 }}>
            <div className="pt-6 px-2 text-right text-[12px] text-gray-600 leading-[22px]" style={{ fontFamily: "'Fira Code', monospace" }}>
              {Array.from({ length: 40 }, (_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
          </div>

          {/* Content area */}
          <div className="pl-[58px] pr-6 py-6" style={{ minHeight: "100%" }}>
            {selectedFile.component ? (
              <div className="animate-fade-in" key={selectedFile.id}>
                <selectedFile.component />
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No preview available.
              </div>
            )}
          </div>

          {/* Minimap (decorative) */}
          <div
            className="absolute right-0 top-0 bottom-0 w-[60px] border-l border-[#2b2b2b] pointer-events-none hidden lg:block"
            style={{ background: "#1e1e1e", zIndex: 2 }}
          >
            <div className="pt-6 px-1.5 opacity-30">
              {Array.from({ length: 30 }, (_, i) => (
                <div
                  key={i}
                  className="mb-[2px] rounded-sm"
                  style={{
                    height: "2px",
                    background: "#666",
                    width: `${Math.random() * 70 + 20}%`,
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ─── Terminal Panel ─── */}
        <Terminal
          isOpen={terminalOpen}
          onToggle={() => setTerminalOpen(false)}
          onOpenFile={openFileById}
        />

        {/* ─── Status Bar ─── */}
        <footer
          className="h-[22px] flex items-center px-3 text-[11px] select-none border-t flex-shrink-0"
          style={{
            background: "linear-gradient(90deg, #007acc, #0065a9)",
            color: "rgba(255,255,255,0.9)",
            borderColor: "rgba(255,255,255,0.1)",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {/* Left */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 hover:bg-white/10 px-1.5 rounded cursor-pointer transition-colors">
              <VscSourceControl size={12} />
              {statusItems.branch}
            </span>
            <span className="flex items-center gap-1 hover:bg-white/10 px-1.5 rounded cursor-pointer transition-colors">
              ⊘ {statusItems.errors}
              <span className="ml-1">⚠ {statusItems.warnings}</span>
            </span>
          </div>

          {/* Right */}
          <div className="ml-auto flex items-center gap-3">
            <span className="hover:bg-white/10 px-1.5 rounded cursor-pointer transition-colors">
              Ln 1, Col 1
            </span>
            <span className="hover:bg-white/10 px-1.5 rounded cursor-pointer transition-colors">
              Spaces: 2
            </span>
            <span className="hover:bg-white/10 px-1.5 rounded cursor-pointer transition-colors">
              UTF-8
            </span>
            <span className="hover:bg-white/10 px-1.5 rounded cursor-pointer transition-colors">
              JavaScript
            </span>
            <span className="flex items-center gap-1 hover:bg-white/10 px-1.5 rounded cursor-pointer transition-colors">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              Shivam Kumar
            </span>
          </div>
        </footer>
      </main>

      {/* ─── Command Palette ─── */}
      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onExecute={handlePaletteExecute}
      />
    </div>
  );
}