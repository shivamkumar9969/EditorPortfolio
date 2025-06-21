import React from "react";
import "../CSS/AchivCer.css";

export default function AchievementCertifacte() {
  const certifications = [
    {
      title: "DevOps Culture and Mindset",
      issuer: "University of California, Davis (Coursera)",
      year: "2023",
    },
    {
      title: "Scientific Computing with Python",
      issuer: "FreeCodeCamp",
      year: "2023",
    },
    {
      title: "React.js & Node.js",
      issuer: "Infosys",
      year: "2022",
    },
    {
      title: "AI/ML Foundations",
      issuer: "University of Washington (Coursera)",
      year: "2023",
    },
    {
      title: "C/C++/Java/Linux Training",
      issuer: "Spoken Tutorial – IIT Bombay",
      year: "2021",
    },
  ];

  const awards = [
    {
      title: "Engineers Day 2023 – 1st Prize",
      description: "🏆 For Drive Buddy – driver safety & drowsiness detection system.",
    },
    {
      title: "Project Expo – 2nd Prize",
      description: "🥈 Smart military-grade security project presented at national expo.",
    },
    {
      title: "Academic Excellence Award",
      description: "🎓 Honored for consistent academic performance during MCA (2024).",
    },
  ];

  return (
    <section className="text-white font-mono text-sm px-4">
      <h2 className="text-base font-bold text-gray-400 mb-6">// Achievements & Certifications</h2>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Certifications */}
        <div>
          <h3 className="text-[#5a50f1] font-semibold mb-2">const certifications = [</h3>
          <div className="ml-6 text-[#DCDCAA] space-y-4">
            {certifications.map((cert, index) => (
              <div key={index} className="text-sm leading-relaxed">
                <span className="text-[#c23041]">title</span>: <span className="text-[#CE9178]">"{cert.title}"</span>,<br />
                <span className="text-[#c23041]">issuer</span>: <span className="text-[#CE9178]">"{cert.issuer}"</span>,<br />
                <span className="text-[#9CDCFE]">year</span>: <span className="text-[#CE9178]">"{cert.year}"</span>
              </div>
            ))}
          </div>
          <span className="text-[#4EC9B0] mt-1 block">]</span>
        </div>

        {/* Awards */}
        <div>
          <h3 className="text-[#5a50f1] font-semibold mb-2">const awards = [</h3>
          <div className="ml-6 text-[#DCDCAA] space-y-4">
            {awards.map((award, index) => (
              <div key={index} className="text-sm leading-relaxed">
                <span className="text-[#c23041]">title</span>: <span className="text-[#CE9178]">"{award.title}"</span>,<br />
                <span className="text-[#9CDCFE]">description</span>: <span className="text-[#CE9178]">"{award.description}"</span>
              </div>
            ))}
          </div>
          <span className="text-[#4EC9B0] mt-1 block">]</span>
        </div>
      </div>
    </section>
  );
}
