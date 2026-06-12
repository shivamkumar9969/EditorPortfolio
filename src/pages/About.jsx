import React, { useEffect, useState, useRef } from "react";
import ShivamResume from "../assests/ShivamResume.pdf";
import "../CSS/About.css";

const FULL_NAME = "Shivam Kumar";
const FULL_ROLE = '"Senior Web Developer"';

export default function About() {
  const [activeLink, setActiveLink] = useState(-1);
  const [nameText, setNameText] = useState("");
  const [roleText, setRoleText] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [ripplePos, setRipplePos] = useState(null);
  const containerRef = useRef(null);

  // Typewriter for name
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= FULL_NAME.length) {
        setNameText(FULL_NAME.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        // Start typing role
        let j = 0;
        const roleInterval = setInterval(() => {
          if (j <= FULL_ROLE.length) {
            setRoleText(FULL_ROLE.slice(0, j));
            j++;
          } else {
            clearInterval(roleInterval);
            setShowContent(true);
          }
        }, 40);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  // Social link cycling
  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveLink((prev) => (prev + 1) % 5);
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const socialLinks = [
    { href: "https://github.com/shivamkumar9969", icon: "fa-github", color: "#333", ariaLabel: "GitHub" },
    { href: "https://www.linkedin.com/in/shivam-kumar-7b896a254/", icon: "fa-linkedin-in", color: "#0077b5", ariaLabel: "LinkedIn" },
    { href: "https://www.instagram.com/mainshivhoon_/", icon: "fa-instagram", color: "#e4405f", ariaLabel: "Instagram" },
    { href: "https://www.facebook.com/profile.php?id=100011586043603", icon: "fa-facebook", color: "#4267B2", ariaLabel: "Facebook" },
    { href: "https://twitter.com/shivamkumar9969", icon: "fa-twitter", color: "#1DA1F2", ariaLabel: "Twitter" },
  ];

  const handleRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipplePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setTimeout(() => setRipplePos(null), 600);
  };

  return (
    <div ref={containerRef} id="About" className="about-container" role="region" aria-label="About section">
      <div className="about-content max-w-4xl mx-auto px-6 py-8 select-text">
        {/* Greeting line */}
        <div className="text-left mb-2">
          <span className="text-gray-500 text-sm font-mono">1 </span>
          <span className="text-gray-500">{`//`}</span>
          <span className="text-green-400 text-sm"> Hi, I'm</span>
        </div>

        {/* Name with typewriter */}
        <h1 className="text-left text-3xl md:text-5xl font-bold mb-4 relative">
          <span className="text-gray-500 text-sm font-mono mr-2">2 </span>
          <span style={{
            background: "linear-gradient(135deg, #007acc, #4ec9b0, #c586c0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            {nameText}
          </span>
          {nameText.length < FULL_NAME.length && (
            <span className="inline-block w-[3px] h-[1.1em] bg-[#007acc] ml-1 animate-blink"
              style={{ verticalAlign: "text-bottom" }} />
          )}
        </h1>

        {/* Role */}
        <h2 className="text-left font-mono text-sm text-gray-400 mb-6">
          <span className="text-gray-500 text-sm mr-2">3 </span>
          <span className="text-yellow-400">const</span> role{" "}
          <span className="text-white">=</span>{" "}
          <span className="text-[#ce9178]">{roleText}</span>
          {roleText.length < FULL_ROLE.length && nameText.length >= FULL_NAME.length && (
            <span className="inline-block w-[2px] h-[1em] bg-[#ce9178] ml-0.5 animate-blink"
              style={{ verticalAlign: "text-bottom" }} />
          )}
          <span className="text-white">;</span>
        </h2>

        {/* Description block with glassmorphism */}
        <div
          className={`glass-card p-5 mb-8 border-l-4 transition-all duration-700 ${
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ borderLeftColor: "#007acc" }}
        >
          <div className="text-sm text-gray-400 font-mono leading-relaxed whitespace-pre-wrap">
            <span className="text-gray-500">4 </span>
            <span className="text-green-500">{`/**`}</span>
            {`\n`}
            <span className="text-gray-500">5 </span>
            <span className="text-green-500"> * I specialize in building high-performance backend systems</span>{`\n`}
            <span className="text-gray-500">6 </span>
            <span className="text-green-500"> * with Node.js, Next.js, Laravel — designing secure REST APIs,</span>{`\n`}
            <span className="text-gray-500">7 </span>
            <span className="text-green-500"> * optimizing database operations, and delivering architectures</span>{`\n`}
            <span className="text-gray-500">8 </span>
            <span className="text-green-500"> * that scale effortlessly under real-world load.</span>{`\n`}
            <span className="text-gray-500">9 </span>
            <span className="text-green-500"> *</span>{`\n`}
            <span className="text-gray-500">10</span>
            <span className="text-green-500"> * I believe in writing code that's not just functional</span>{`\n`}
            <span className="text-gray-500">11</span>
            <span className="text-green-500"> * — but maintainable, efficient, and built to scale.</span>{`\n`}
            <span className="text-gray-500">12</span>
            <span className="text-green-500"> {`*/`}</span>
          </div>
        </div>

        {/* Social Links with glow */}
        <nav
          className={`flex justify-center gap-4 text-3xl mb-8 transition-all duration-700 ${
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "0.2s" }}
          aria-label="Social media links"
        >
          {socialLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.ariaLabel}
              className="social-icon-enhanced relative overflow-hidden"
              style={{
                "--glow-color": link.color,
                borderColor: idx === activeLink ? link.color : "rgba(255,255,255,0.1)",
                background: idx === activeLink ? `${link.color}22` : "transparent",
                boxShadow: idx === activeLink
                  ? `0 0 15px ${link.color}44, 0 0 30px ${link.color}22`
                  : "none",
              }}
              onClick={handleRipple}
            >
              <i className={`fa-brands ${link.icon}`} aria-hidden="true"></i>
            </a>
          ))}
        </nav>

        {/* Download CV with gradient border */}
        <div
          className={`flex justify-center transition-all duration-700 ${
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "0.4s" }}
        >
          <a
            href={ShivamResume}
            download="ShivamResume.pdf"
            className="cv-button-enhanced relative overflow-hidden group"
            aria-label="Download Resume PDF"
            onClick={handleRipple}
          >
            <span className="relative z-10 flex items-center gap-2">
              <i className="fa-solid fa-file-arrow-down" aria-hidden="true"></i>
              <span>Download CV</span>
            </span>
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(135deg, #007acc33, #4ec9b033, #c586c033)",
              }}
            />
            {ripplePos && (
              <span
                className="absolute rounded-full bg-white/20"
                style={{
                  left: ripplePos.x,
                  top: ripplePos.y,
                  width: "4px",
                  height: "4px",
                  animation: "ripple 0.6s ease-out forwards",
                  transform: "translate(-50%, -50%)",
                }}
              />
            )}
          </a>
        </div>
      </div>
    </div>
  );
}
