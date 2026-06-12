import React, { useState, useEffect } from "react";
import "../CSS/AchivCer.css";

export default function AchievementCertifacte() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const certifications = [
    { title: "DevOps Culture and Mindset", issuer: "University of California, Davis (Coursera)", year: "2023", icon: "🔄" },
    { title: "Scientific Computing with Python", issuer: "FreeCodeCamp", year: "2023", icon: "🐍" },
    { title: "React.js & Node.js", issuer: "Infosys", year: "2022", icon: "⚛️" },
    { title: "AI/ML Foundations", issuer: "University of Washington (Coursera)", year: "2023", icon: "🤖" },
    { title: "C/C++/Java/Linux Training", issuer: "Spoken Tutorial – IIT Bombay", year: "2021", icon: "💻" },
  ];

  const awards = [
    { title: "Engineers Day 2023 – 1st Prize", description: "For Drive Buddy – driver safety & drowsiness detection system.", icon: "🏆", color: "#ffd700" },
    { title: "Project Expo – 2nd Prize", description: "Smart military-grade security project presented at national expo.", icon: "🥈", color: "#c0c0c0" },
    { title: "Academic Excellence Award", description: "Honored for consistent academic performance during MCA (2024).", icon: "🎓", color: "#4ec9b0" },
  ];

  return (
    <section className="text-white font-mono text-sm px-2 py-4">
      <h2 className="text-lg font-bold mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
        <span className="text-gray-600">{`//`}</span>
        <span className="ml-2" style={{
          background: "linear-gradient(90deg, #dcdcaa, #ce9178)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>Achievements & Certifications</span>
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Certifications */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[#c586c0] font-semibold text-xs">const</span>
            <span className="text-[#9cdcfe] text-xs">certifications</span>
            <span className="text-white text-xs">= [</span>
          </div>
          <div className="space-y-2 ml-2">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="glass-card p-3 rounded-lg transition-all duration-500 hover-glow"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(-20px)",
                  transitionDelay: `${index * 0.1}s`,
                }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0 mt-0.5">{cert.icon}</span>
                  <div className="min-w-0">
                    <div className="text-[#ce9178] text-xs font-medium truncate">"{cert.title}"</div>
                    <div className="text-gray-500 text-[11px] truncate">{cert.issuer}</div>
                    <div className="text-[#9cdcfe] text-[10px] mt-0.5">{cert.year}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <span className="text-[#4ec9b0] mt-2 block ml-2 text-xs">];</span>
        </div>

        {/* Awards */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[#c586c0] font-semibold text-xs">const</span>
            <span className="text-[#9cdcfe] text-xs">awards</span>
            <span className="text-white text-xs">= [</span>
          </div>
          <div className="space-y-2 ml-2">
            {awards.map((award, index) => (
              <div
                key={index}
                className="glass-card p-4 rounded-lg transition-all duration-500 group"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(20px)",
                  transitionDelay: `${index * 0.15 + 0.2}s`,
                  borderLeft: `3px solid ${award.color}`,
                }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0 group-hover:animate-pulse-scale transition-transform">
                    {award.icon}
                  </span>
                  <div className="min-w-0">
                    <div className="text-[#ce9178] text-xs font-medium">"{award.title}"</div>
                    <div className="text-gray-400 text-[11px] mt-1 leading-relaxed">{award.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <span className="text-[#4ec9b0] mt-2 block ml-2 text-xs">];</span>
        </div>
      </div>
    </section>
  );
}
