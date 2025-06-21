import React, { useState } from "react";
import {
  VscFolder,
  VscFolderOpened,
  VscFile,
  VscChevronRight,
  VscChevronDown,
  VscChromeClose,
  VscChevronDown as VIcon,
} from "react-icons/vsc";

import About from "../pages/About";
import Skills from "../pages/Skills";
import Experience from "../pages/Experience";
import Projects from "../pages/Projects";
import Contact from "../pages/Contact";
import AchievementCertifacte from "../pages/AchievementCertifacte";
import { GitIgnore, PackageJson, Readme } from "../pages/ShowCaseOnly";

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
          { id: "about", name: "index.html", type: "file", component: About },
        ],
      },
      {
        id: "src",
        name: "src",
        type: "folder",
        isExpanded: true,
        children: [
          { id: "skills", name: "Skills.js", type: "file", component: Skills },
          { id: "experience", name: "Experience.js", type: "file", component: Experience },
          { id: "projects", name: "Projects.js", type: "file", component: Projects },
          { id: "achievements", name: "Achievements.js", type: "file", component: AchievementCertifacte },
          { id: "contact", name: "Contact.js", type: "file", component: Contact },
        ],
      },
      { id: "gitignore", name: ".gitignore", type: "file", component: GitIgnore },
      { id: "package", name: "package.json", type: "file", component: PackageJson },
      { id: "readme", name: "README.md", type: "file", component: Readme },
    ],
  },
];

function ExplorerNode({ node, indent = 0, onSelectFile, selectedFileId }) {
  const [expanded, setExpanded] = useState(node.isExpanded ?? false);

  if (node.type === "folder") {
    return (
      <div>
        <div
          className="flex items-center cursor-default select-none px-2 py-1 hover:bg-gray-700 rounded"
          style={{ paddingLeft: indent * 16 }}
          onClick={() => setExpanded((prev) => !prev)}
        >
          <span className="mr-1">
            {expanded ? <VscChevronDown /> : <VscChevronRight />}
          </span>
          <span className="mr-1 text-gray-300">
            {expanded ? <VscFolderOpened /> : <VscFolder />}
          </span>
          <span className="font-semibold text-gray-400 uppercase text-xs">
            {node.name}
          </span>
        </div>
        {expanded &&
          node.children.map((child) => (
            <ExplorerNode
              key={child.id}
              node={child}
              indent={indent + 1}
              onSelectFile={onSelectFile}
              selectedFileId={selectedFileId}
            />
          ))}
      </div>
    );
  } else if (node.type === "file") {
    const isSelected = selectedFileId === node.id;
    return (
      <div
        className={`flex items-center cursor-pointer select-text text-gray-300 hover:bg-gray-800 rounded px-2 py-1 ${
          isSelected ? "bg-gray-800 font-semibold text-white" : ""
        }`}
        style={{ paddingLeft: indent * 16 + 16 }}
        onClick={() => onSelectFile(node)}
      >
        <VscFile className="mr-1" />
        <span>{node.name}</span>
      </div>
    );
  }
  return null;
}

export default function VSCodeExplorerPortfolio() {
  const defaultFile = portfolioSections[0].children[0].children[0];
  const [openTabs, setOpenTabs] = useState([defaultFile]);
  const [selectedFile, setSelectedFile] = useState(defaultFile);

  const handleTabClick = (file) => {
    if (!openTabs.find((tab) => tab.id === file.id)) {
      setOpenTabs([...openTabs, file]);
    }
    setSelectedFile(file);
  };

  const handleTabClose = (file) => {
    const filteredTabs = openTabs.filter((tab) => tab.id !== file.id);
    setOpenTabs(filteredTabs);
    if (selectedFile.id === file.id && filteredTabs.length > 0) {
      setSelectedFile(filteredTabs[filteredTabs.length - 1]);
    }
  };

  return (
    <div className="flex h-screen font-sans bg-[#1e1e1e] text-gray-300">
      {/* Sidebar */}
      <aside className="w-64 bg-[#252526] border-r border-gray-700 flex flex-col">
        <div className="flex items-center space-x-2 px-4 py-3 border-b border-gray-700 bg-[#333333]">
          <VscFolder size={20} />
          <span className="uppercase font-semibold text-gray-400 text-sm">EXPLORER</span>
          <div className="ml-auto flex space-x-2 text-gray-500">
            <button title="New File" className="hover:text-white" onClick={() => alert("Add new file feature coming soon!")}>...</button>
            <button title="Refresh" className="hover:text-white" onClick={() => alert("Refresh feature coming soon!")}>...</button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-2 py-3">
          {portfolioSections.map((node) => (
            <ExplorerNode
              key={node.id}
              node={node}
              onSelectFile={(file) => handleTabClick(file)}
              selectedFileId={selectedFile.id}
            />
          ))}
        </div>
      </aside>

      {/* Editor */}
      <main className="flex-1 flex flex-col bg-[#1e1e1e]">
        <nav className="flex bg-[#252526] border-b border-gray-700 h-9 px-2 items-center overflow-x-auto">
          {openTabs.map((tab) => {
            const isActive = selectedFile.id === tab.id;
            const isDefault = tab.id === defaultFile.id;
            return (
              <div
                key={tab.id}
                className={`flex items-center px-3 py-1 mr-1 border-b-2 rounded-t-sm cursor-pointer ${
                  isActive ? "border-blue-500 bg-[#1e1e1e] text-white font-semibold" : "border-transparent text-gray-400"
                }`}
                onClick={() => handleTabClick(tab)}
              >
                {isDefault && <VIcon className="mr-1" />}
                <span>{tab.name}</span>
                {!isDefault && (
                  <VscChromeClose
                    className="ml-2 hover:text-red-400"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTabClose(tab);
                    }}
                  />
                )}
              </div>
            );
          })}
        </nav>

        <section className="flex-1 p-6 overflow-auto font-mono text-sm whitespace-pre-wrap">
          {selectedFile.component ? (
            <selectedFile.component />
          ) : (
            "No preview available."
          )}
        </section>

        <footer className="h-6 bg-[#007acc] flex items-center px-4 text-white text-xs select-none border-t border-blue-700">
          <div>VS Code Portfolio - Shivam Kumar</div>
          <div className="ml-auto flex space-x-4">
            <div>UTF-8</div>
            <div>Ln 1, Col 1</div>
          </div>
        </footer>
      </main>
    </div>
  );
}