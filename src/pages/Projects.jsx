import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Github, ExternalLink, Play, Code, Database, Smartphone, Shield, GraduationCap, Zap } from 'lucide-react';

const projects = [
  {
    title: "Crypto Automation",
    description: "A powerful SaaS platform for automating crypto portfolio management, syncing real-time exchange data, executing secure API-based trades, and providing smart analytics for multi-user environments.",
    tech: ["Next.js", "Node.js", "Express.js", "MongoDB", "JWT", "AES-256"],
    link: "https://cryptoautomation.vercel.app/login",
    github: "https://github.com/shivamkumar9969/cryptomanager.git",
    icon: <Code className="w-6 h-6" />,
    color: "from-yellow-500 to-orange-500",
    category: "SaaS / Automation"
  },
  {
    title: "EasyPeasy",
    description: "A full-featured rental platform for listing and managing rental properties with real-time availability, secure messaging, and payment gateway integration.",
    tech: ["React.js", "Node.js", "Tailwind CSS", "Express.js", "MongoDB"],
    link: "https://github.com/shivamkumar9969/EasyPesy",
    icon: <Code className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
    category: "Full Stack"
  },
  {
    title: "Invoice Generator",
    description: "An invoicing tool tailored for freelancers to manage clients, generate downloadable PDF invoices, track payments, and automate billing cycles.",
    tech: ["React.js", "Node.js", "MongoDB"],
    link: "https://github.com/shivamkumar9969/invoice-generator/tree/master",
    icon: <Database className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500",
    category: "Web App"
  },
  {
    title: "E-Commerce",
    description: "An e-commerce platform with dynamic product browsing, admin dashboard, cart/wishlist logic, authentication, and Stripe payment integration.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB"],
    link: "https://github.com/shivamkumar9969/MernStackProject",
    icon: <Zap className="w-6 h-6" />,
    color: "from-green-500 to-emerald-500",
    category: "E-Commerce"
  },
  {
    title: "Drive Buddy",
    description: "A real-time vehicle safety system that detects driver drowsiness using sensors and alerts emergency contacts using GPS + GSM modules.",
    tech: ["IoT", "Arduino", "C++", "GSM", "GPS"],
    icon: <Smartphone className="w-6 h-6" />,
    color: "from-orange-500 to-red-500",
    category: "IoT"
  },
  {
    title: "Defiance System",
    description: "Military-grade base security prototype featuring intruder detection using IR sensors, sound detection, and emergency alert triggers.",
    tech: ["Sensors", "Microcontrollers", "Embedded C"],
    icon: <Shield className="w-6 h-6" />,
    color: "from-red-500 to-pink-500",
    category: "Security"
  },
  {
    title: "Education Admin Management",
    description: "A school automation system to manage timetables, grades, assignments, announcements, and parent/student portals in real-time.",
    tech: ["React.js", "Node.js", "MongoDB"],
    icon: <GraduationCap className="w-6 h-6" />,
    color: "from-indigo-500 to-purple-500",
    category: "Education"
  }
];

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [lineCount, setLineCount] = useState(1);
  const containerRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const currentProject = projects[currentIndex];

  // Mouse tracking for 3D effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Typing animation effect
  // Typing animation effect
useEffect(() => {
  const codeLines = [
    `// ${currentProject.title} - ${currentProject.category}`,
    `import React from 'react';`,
    `import { ${currentProject.tech.slice(0, 3).join(', ')} } from 'tech-stack';`,
    ``,
    `const ${currentProject.title.replace(/\s+/g, '')} = () => {`,
    `  // ${currentProject.description}`,
    ``,
    `  const techStack = [`,
    ...currentProject.tech.map(tech => `    '${tech}',`),
    `  ];`,
    ``,
    `  const handleDeploy = () => {`,
    `    console.log('🚀 Deploying ${currentProject.title}...');`,
    `    return 'Success! Project is live 🎉';`,
    `  };`,
    ``,
    `  return (`,
    `    <div className="project-container">`,
    `      <h1 className="project-title">${currentProject.title}</h1>`,
    `      <p className="description">${currentProject.description}</p>`,
    `      <div className="tech-stack">`,
    `        {techStack.map(tech => (`,
    `          <span key={tech} className="tech-badge">{tech}</span>`,
    `        ))}`,
    `      </div>`,
    `      <button onClick={handleDeploy}>Deploy Project</button>`,
    `    </div>`,
    `  );`,
    `};`,
    ``,
    `export default ${currentProject.title.replace(/\s+/g, '')};`
  ];

  setTypingText('');
  setIsTyping(true);
  setShowOutput(false);
  setLineCount(1);

  let currentLine = 0;
  let currentText = '';

  const typeLine = () => {
    if (currentLine < codeLines.length) {
      currentText += codeLines[currentLine] + '\n';
      currentLine++;
      setTypingText(currentText);
      setLineCount(currentLine + 2);
      typingTimeoutRef.current = setTimeout(typeLine, 30); // fast line-by-line
    } else {
      setIsTyping(false);
      setTimeout(() => setShowOutput(true), 200); // short compile delay
    }
  };

  const startTyping = setTimeout(typeLine, 100); // short initial delay

  return () => {
    clearTimeout(startTyping);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
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
      {/* Animated Background */}
     

      {/* Project Navigation Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-[#252526]">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-white">
            Projects.js
          </h2>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span>Project {currentIndex + 1} of {projects.length}</span>
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
                    ? 'bg-blue-400 scale-125' 
                    : 'bg-gray-600 hover:bg-gray-500'
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

      <div className="flex h-[calc(100%-80px)]">
        {/* Code Editor Section */}
        <div className="flex-1 flex">
          {/* Line Numbers */}
          <div className="w-12 bg-[#1e1e1e] text-right pr-2 py-4 text-gray-500 select-none text-sm border-r border-gray-700">
            {Array.from({ length: lineCount + 5 }, (_, i) => (
              <div key={i + 1} className="leading-6">{i + 1}</div>
            ))}
          </div>

          {/* Code Area */}
          <div className="flex-1 p-4 overflow-auto">
            <div 
              className="transition-all duration-500 transform-gpu"
              style={{
                transform: `perspective(1000px) rotateY(${(mousePosition.x - 0.5) * 3}deg) rotateX(${(mousePosition.y - 0.5) * -3}deg)`,
              }}
            >
              <div className="font-mono text-sm leading-6">
                <pre className="text-gray-300 whitespace-pre-wrap">
                  <span 
                    dangerouslySetInnerHTML={{
                      __html: typingText
                        .replace(/\/\/(.*)/g, '<span style="color: #6a9955;">// $1</span>')
                        .replace(/import|from|const|return|export|default/g, '<span style="color: #c586c0;">$&</span>')
                        .replace(/'([^']*)'/g, '<span style="color: #ce9178;">\'$1\'</span>')
                        .replace(/\b(React|className|onClick|key|map)\b/g, '<span style="color: #9cdcfe;">$1</span>')
                        .replace(/\b(console\.log|handleDeploy)\b/g, '<span style="color: #dcdcaa;">$1</span>')
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

        {/* Output/Preview Section */}
        <div className="w-1/2 border-l border-gray-700 flex flex-col">
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

          <div className="flex-1 p-4 overflow-auto">
            {showOutput ? (
              <div 
                className="h-full transform transition-all duration-700 hover:scale-105"
                style={{
                  transform: `perspective(1000px) rotateY(${(mousePosition.x - 0.5) * -5}deg) rotateX(${(mousePosition.y - 0.5) * 5}deg)`,
                }}
              >
                {/* Rendered Project Card */}
                <div className={`relative p-6 rounded-2xl bg-gradient-to-br ${currentProject.color} shadow-2xl h-full flex flex-col`}>
                  <div className="absolute inset-0 bg-black/10 rounded-2xl" />
                  <div className="relative z-10 flex-1 flex flex-col">
                    {/* Project Icon */}
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white">
                        {currentProject.icon}
                      </div>
                      <div>
                        <div className="text-xs text-white/80 uppercase tracking-wide">
                          {currentProject.category}
                        </div>
                        <h3 className="text-xl font-bold text-white">
                          {currentProject.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-white/90 text-sm leading-relaxed mb-4 flex-1">
                      {currentProject.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="mb-4">
                      <div className="text-xs text-white/70 mb-2 font-medium">
                        TECH STACK
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {currentProject.tech.map((tech, i) => (
                          <span 
                            key={i}
                            className="px-2 py-1 bg-white/20 rounded-md text-xs text-white font-medium backdrop-blur-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-auto">
                      {currentProject.link && (
                        <a
                          href={currentProject.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-4 py-2 bg-white/20 text-white rounded-lg text-sm font-medium hover:bg-white/30 transition-colors backdrop-blur-sm"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Source Code
                        </a>
                      )}
                      <button className="flex items-center px-4 py-2 bg-white/20 text-white rounded-lg text-sm font-medium hover:bg-white/30 transition-colors backdrop-blur-sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </button>
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
