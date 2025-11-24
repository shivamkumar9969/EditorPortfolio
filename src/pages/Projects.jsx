import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Github,
  ExternalLink,
  Play,
  Code,
  Database,
  Smartphone,
  Shield,
  GraduationCap,
  Zap,
} from "lucide-react";

const projects = [
  {
    title: "Crypto Automation",
    description:
      "A fully automated crypto trading and portfolio management SaaS platform built for multi-exchange, multi-user workflows. It securely connects with Binance and CoinDCX APIs to fetch real-time balances, trade history, open orders, and live market prices. The system supports automated trading logic, portfolio insights, risk analysis, PnL tracking, and background cron-based sync. Advanced encryption (AES-256 + JWT) ensures enterprise-grade security, while a clean Next.js UI delivers a smooth dashboard experience. Designed for traders who want hands-off management with accurate analytics and effortless execution.",
    tech: ["Next.js", "Node.js", "Express.js", "MongoDB", "JWT", "AES-256"],
    link: "https://cryptoautomation.vercel.app/login",
    github: "https://github.com/shivamkumar9969/cryptomanager.git",
    icon: <Code className="w-6 h-6" />,
    color: "from-[#0a0a0a] to-[#d4af37]",
    category: "SaaS / Automation",
  },

  {
    title: "EasyPeasy",
    description:
      "A complete rental management platform that streamlines the process of listing, discovering, and renting properties. The system includes real-time availability checks, tenant–owner chat messaging, image uploading, booking workflows, and property search filters. Admins can manage listings, users, earnings, and requests from a dedicated dashboard. Built as a scalable MERN application, it provides a seamless experience for both property owners and renters with optimized API performance and secure authentication.",
    tech: ["React.js", "Node.js", "Tailwind CSS", "Express.js", "MongoDB"],
    link: "https://github.com/shivamkumar9969/EasyPesy",
    icon: <Code className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
    category: "Full Stack",
  },

  {
    title: "Invoice Generator",
    description:
      "A productivity-focused invoicing system created for freelancers and small businesses to generate and manage invoices effortlessly. Users can create clients, define billable items, generate GST-friendly invoices, and export them as polished PDF documents. The platform includes payment tracking, due date reminders, and historical invoice management. The interface is designed to work instantly without any learning curve, making it a practical tool for quick and professional billing.",
    tech: ["React.js", "Node.js", "MongoDB"],
    link: "https://github.com/shivamkumar9969/invoice-generator/tree/master",
    icon: <Database className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500",
    category: "Web App",
  },

  {
    title: "E-Commerce",
    description:
      "A complete e-commerce ecosystem featuring dynamic product browsing, category filtering, user authentication, cart/wishlist logic, and a secure checkout workflow. The admin dashboard includes product CRUD, inventory control, user management, and order tracking. Stripe-powered payments ensure reliable global transactions. The entire system is designed with modular, scalable APIs and optimized frontend rendering for a smooth shopping experience.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB"],
    link: "https://github.com/shivamkumar9969/MernStackProject",
    icon: <Zap className="w-6 h-6" />,
    color: "from-green-500 to-emerald-500",
    category: "E-Commerce",
  },

  {
    title: "Drive Buddy",
    description:
      "A real-time smart safety system designed to reduce road accidents by monitoring driver alertness. Built using Arduino, the device detects drowsiness and abnormal driving behavior through sensors, instantly triggering alerts and sending SMS notifications via GSM to emergency contacts. GPS tracking helps locate the vehicle during emergencies. This IoT solution won multiple awards for its practical accuracy and real-world impact.",
    tech: ["IoT", "Arduino", "C++", "GSM", "GPS"],
    icon: <Smartphone className="w-6 h-6" />,
    color: "from-orange-500 to-red-500",
    category: "IoT",
  },

  {
    title: "Defiance System",
    description:
      "A defense-grade prototype built to secure restricted military zones. The system uses IR sensors, motion detection, and sound analysis to detect intruders in real-time. Once triggered, it activates alarms and sends alerts to security personnel instantly. Designed with embedded C and microcontroller logic, this project demonstrated how low-cost hardware can provide strong perimeter security for defense environments.",
    tech: ["Sensors", "Microcontrollers", "Embedded C"],
    icon: <Shield className="w-6 h-6" />,
    color: "from-red-500 to-pink-500",
    category: "Security",
  },

  {
    title: "Education Admin Management",
    description:
      "A school automation platform developed to digitize academic operations. It includes modules for timetable creation, assignment uploads, grade tracking, attendance, announcements, and parent-student portals. Teachers can manage exams and homework, students can track progress, and admins can control all academic data from a unified dashboard. Built using the MERN stack, it ensures fast performance and clean UI workflows.",
    tech: ["React.js", "Node.js", "MongoDB"],
    icon: <GraduationCap className="w-6 h-6" />,
    color: "from-indigo-500 to-purple-500",
    category: "Education",
  },
];

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [lineCount, setLineCount] = useState(1);

  const containerRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const currentProject = projects[currentIndex];

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  // Typing animation logic
  useEffect(() => {
    const codeLines = [
      "import React from 'react';",
      `import { ${currentProject.tech
        .slice(0, 3)
        .join(", ")} } from 'tech-stack';`,
      "`",
      `const ${currentProject.title.replace(/\s+/g, "")} = () => {`,
      `// ${currentProject.description}`,
      "`",
      "const techStack = [",
      ...currentProject.tech.map((tech) => `'${tech}',`),
      "];",
      "`",
      "const handleDeploy = () => {",
      `console.log('🚀 Deploying ${currentProject.title}...');`,
      "return 'Success! Project is live 🎉';",
      "};",
      "`",
      "return (",
      '<div className="project-container">',
      `<h1 className="project-title">${currentProject.title}</h1>`,
      `<p className="description">${currentProject.description}</p>`,
      '<div className="tech-stack">',
      "{techStack.map(tech => (",
      '<span key={tech} className="tech-badge">{tech}</span>',
      "))}",
      "</div>",
      "<button onClick={handleDeploy}>Deploy Project</button>",
      "</div>",
      ");",
      "};",
      "`",
      `export default ${currentProject.title.replace(/\s+/g, "")};`,
    ];

    setTypingText("");
    setIsTyping(true);
    setShowOutput(false);
    setLineCount(1);

    let currentLine = 0;
    let currentText = "";

    const typeLine = () => {
      if (currentLine < codeLines.length) {
        currentText += codeLines[currentLine] + "\n";
        currentLine++;
        setTypingText(currentText);
        setLineCount(currentLine + 2);

        typingTimeoutRef.current = setTimeout(typeLine, 30);
      } else {
        setIsTyping(false);
        setTimeout(() => setShowOutput(true), 200);
      }
    };

    const startTyping = setTimeout(typeLine, 100);

    return () => {
      clearTimeout(startTyping);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [currentProject]);

  const nextProject = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const prevProject = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const goToProject = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
  <div
    ref={containerRef}
    className="h-full bg-[#1e1e1e] text-gray-300 overflow-hidden relative"
  >
    {/* Header */}
    <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-[#252526]">
      <div className="flex items-center space-x-4">
        <h2 className="text-lg font-semibold text-white"> Projects.js </h2>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <span>
            Project {currentIndex + 1} of {projects.length}
          </span>
          <span>•</span>
          <span className="text-blue-400">{currentProject.category}</span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={prevProject}
          disabled={isAnimating}
          className="p-2 hover:bg-gray-700 rounded disabled:opacity-50 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex space-x-1">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToProject(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-blue-400 scale-125"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextProject}
          disabled={isAnimating}
          className="p-2 hover:bg-gray-700 rounded disabled:opacity-50 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>

    {/* Main */}
    <div className="flex flex-col md:flex-row h-[calc(100%-80px)]">
      {/* Code editor */}
      <div className="flex-1 flex">
        <div className="w-12 bg-[#1e1e1e] text-right pr-2 py-4 text-gray-500 select-none text-sm border-r border-gray-700">
          {Array.from({ length: lineCount + 5 }, (_, i) => (
            <div key={i + 1} className="leading-6">
              {i + 1}
            </div>
          ))}
        </div>

        <div className="flex-1 p-4 overflow-auto">
          <div
            className="transition-all duration-500 transform-gpu"
            style={{
              transform: `perspective(1000px) rotateY(${
                (mousePosition.x - 0.5) * 3
              }deg) rotateX(${(mousePosition.y - 0.5) * -3}deg)`,
            }}
          >
            <div className="font-mono text-sm leading-6">
              <pre className="text-gray-300 whitespace-pre-wrap">
                <span
                  dangerouslySetInnerHTML={{
                    __html: typingText
                      .replace(
                        /\/\/(.*)/g,
                        '<span style="color: #6a9955;">// $1</span>'
                      )
                      .replace(
                        /import|from|const|return|export|default/g,
                        '<span style="color: #c586c0;">$&</span>'
                      )
                      .replace(
                        /'([^']*)'/g,
                        "<span style=\"color: #ce9178;\">'$1'</span>"
                      )
                      .replace(
                        /\b(React|className|onClick|key|map)\b/g,
                        '<span style="color: #9cdcfe;">$1</span>'
                      )
                      .replace(
                        /\b(console\.log|handleDeploy)\b/g,
                        '<span style="color: #dcdcaa;">$1</span>'
                      ),
                  }}
                />
                {isTyping && (
                  <span className="inline-block w-2 h-5 bg-white animate-pulse ml-1" />
                )}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Output preview */}
      <div className="w-full md:w-1/2 border-t md:border-t-0 md:border-l border-gray-700 flex flex-col bg-[#1e1e1e]">
        {/* Header */}
        <div className="p-3 border-b border-gray-700 bg-[#252526] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Play className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium">Live Preview</span>
          </div>

          {showOutput && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-gray-400">Running</span>
            </div>
          )}
        </div>

        {/* Main Output Box */}
        <div className="flex-1 p-4 overflow-auto">
          {showOutput ? (
            <div
              className="min-h-full transform transition-all duration-700 hover:scale-105 flex flex-col"
              style={{
                transform: `perspective(1000px) rotateY(${
                  (mousePosition.x - 0.5) * -5
                }deg) rotateX(${(mousePosition.y - 0.5) * 5}deg)`,
              }}
            >
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-[#2a2a2a] to-black shadow-2xl flex-1 flex flex-col border border-yellow-500/20 overflow-auto">
                {/* Subtle Gold Overlay */}
                <div className="absolute inset-0 bg-yellow-500/5 rounded-2xl" />

                <div className="relative z-10 flex flex-col gap-4">
                  {/* HEADER */}
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-yellow-500/20 border border-yellow-400/60 rounded-xl flex items-center justify-center text-yellow-300 shadow-md">
                      {currentProject.icon}
                    </div>

                    <div>
                      <div className="text-xs text-yellow-200/70 uppercase tracking-wide">
                        {currentProject.category}
                      </div>
                      <h3 className="text-xl font-bold text-yellow-300 drop-shadow">
                        {currentProject.title}
                      </h3>
                    </div>
                  </div>

                  {/* DESCRIPTION */}
                  <p className="text-[#f5f5f5]/90 text-sm leading-relaxed">
                    {currentProject.description}
                  </p>

                  {/* HEADER */}
                  <div>
                    <div className="text-xs text-yellow-300/70 uppercase tracking-wide">
                      {currentProject.category}
                    </div>
                    <h3 className="text-2xl font-bold text-yellow-300 drop-shadow-sm">
                      {currentProject.title}
                    </h3>
                  </div>

                  {/* TECH STACK */}
                  <div>
                    <div className="text-xs text-yellow-400 mb-1 font-semibold tracking-wide">
                      TECH STACK
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {currentProject.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-yellow-500/10 border border-yellow-400/40 rounded-md 
              text-xs text-yellow-200/90 font-medium shadow-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* BUTTONS */}
                  <div className="flex flex-wrap gap-3 mt-1">
                    {currentProject.github && (
                      <a
                        href={currentProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors shadow-sm"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Source Code
                      </a>
                    )}

                    {currentProject.link && (
                      <a
                        href={currentProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-4 py-2 bg-blue-950 border border-blue-950 text-white rounded-lg text-sm font-medium hover:bg-blue-500/20 transition-colors shadow-sm"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <div className="text-center">
                <Code className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm">Compiling project...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

}
