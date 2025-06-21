import React from "react";

export function GitIgnore() {
  return (
    <div className="text-white font-mono text-sm whitespace-pre-wrap">
      <h2 className="text-base font-bold text-gray-400 mb-2"><span className="text-gray-500">//</span>  .gitignore</h2>
      <code>
        # Ignored node modules
        {"\n"}node_modules/

        {"\n\n"}# Build output
        {"\n"}dist/
        {"\n"}build/

        {"\n\n"}# Logs
        {"\n"}*.log

        {"\n\n"}# Environment config
        {"\n"}.env
        {"\n"}.env.local
        {"\n"}.env.production

        {"\n\n"}# Editor folders
        {"\n"}.vscode/
        {"\n"}.idea/

        {"\n\n"}# Misc
        {"\n"}.DS_Store
        {"\n"}Thumbs.db

        {"\n\n"}// This .gitignore lists files typically excluded from version control
        {"\n"}// For demo purpose only — not used for actual Git tracking in this portfolio
      </code>
    </div>
  );
}

export function PackageJson() {
  return (
    <div className="text-white font-mono text-sm whitespace-pre-wrap">
      <h2 className="text-base font-bold text-gray-400 mb-2"><span className="text-gray-500">//</span> package.json</h2>
      <code>
        {`{
  "name": "shivam-portfolio",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-icons": "^4.10.1",
    "emailjs-com": "^3.2.0",
    "tailwindcss": "^3.4.1"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.24"
  }
}`}
      </code>
      <p className="text-xs text-gray-400 mt-4">
        <span className="text-gray-500">//</span> Showcase only: Represents packages used in building this portfolio
      </p>
    </div>
  );
}

export function Readme() {
  return (
    <div className="text-white font-mono text-sm whitespace-pre-wrap">
      <h2 className="text-base font-bold text-gray-400 mb-2"><span className="text-gray-500">//</span> README.md</h2>
      <code>
        {`# Shivam Kumar's VSCode Portfolio\n\nThis portfolio is built using React, Tailwind CSS, and mimics the Visual Studio Code interface for developer-centric presentation.\n\n## Features\n- File tree navigation\n- Markdown-style sections\n- Skills, Projects, Experience, and more\n- GitHub style .gitignore and package.json for realism\n\n> This README is for display purposes only.`}
      </code>
    </div>
  );
}