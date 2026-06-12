import React, { useEffect, useState } from "react";

const experiences = [
  {
    functionCall: "GuruKashiUniversityExperience();",
    company: "Guru Kashi University",
    role: "Senior Web Developer",
    duration: "Nov 2024 – Present",
    isActive: true,
    lines: [
      "const responsibilities = [",
      "  'Lead development of web portals, academic systems, and university websites',",
      "  'Optimize application performance and database queries for student and staff portals',",
      "  'Implement secure authentication, API integrations, and modern UI/UX components',",
      "  'Mentor junior developers and drive technical decisions for web architecture'",
      "];",
      "developUniversityPortals(responsibilities);",
    ],
  },
  {
    functionCall: "RackronExperience();",
    company: "Rackron Technologies Pvt Ltd",
    role: "Software Developer",
    duration: "June 2024 – Present",
    isActive: true,
    lines: [
      "const responsibilities = [",
      "  'Develop and maintain scalable backend systems using Node.js and Laravel',",
      "  'Design and integrate secure RESTful APIs across multiple modules',",
      "  'Collaborate with frontend teams to deliver complete features using the MERN stack',",
      "  'Write efficient SQL and MongoDB queries for optimized performance',",
      "  'Deploy and manage applications on cloud infrastructure (AWS)',",
      "  'Follow Agile methodology for sprint planning and delivery'",
      "];",
      "deliverProjects(responsibilities);",
    ],
  },
  {
    functionCall: "DevTownInternship();",
    company: "DevTown",
    role: "Full Stack Intern",
    duration: "Sep 2023 – Nov 2023",
    isActive: false,
    lines: [
      "const contributions = [",
      "  'Built dynamic UI components using React.js',",
      "  'Integrated Node.js APIs and managed MongoDB data flow',",
      "  'Participated in daily standups and Agile task tracking',",
      "  'Worked closely with mentors to debug production-level issues',",
      "  'Contributed to project documentation and team reviews'",
      "];",
      "gainHandsOnExperience(contributions);",
    ],
  },
];

export default function Experience() {
  const [renderedItems, setRenderedItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedCommand, setTypedCommand] = useState("");

  useEffect(() => {
    if (currentIndex >= experiences.length) return;

    const exp = experiences[currentIndex];
    let i = 0;

    const typing = setInterval(() => {
      if (i <= exp.functionCall.length) {
        setTypedCommand(exp.functionCall.slice(0, i));
        i++;
      } else {
        clearInterval(typing);
        setTimeout(() => {
          setRenderedItems((prev) => [
            ...prev,
            { ...exp, show: true, typed: exp.functionCall },
          ]);
          setTypedCommand("");
          setCurrentIndex((prev) => prev + 1);
        }, 600);
      }
    }, 50);

    return () => clearInterval(typing);
  }, [currentIndex]);

  return (
    <div className="text-white font-mono text-sm px-2 py-4">
      <h2 className="text-lg font-bold mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
        <span className="text-gray-600">{`//`}</span>
        <span className="ml-2" style={{
          background: "linear-gradient(90deg, #007acc, #4ec9b0)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>Work Experience</span>
      </h2>

      {/* Timeline */}
      <div className="relative pl-6">
        {/* Glowing timeline line */}
        <div className="absolute left-[9px] top-0 bottom-0 w-[2px]"
          style={{
            background: "linear-gradient(180deg, #007acc, #4ec9b0, #c586c0, transparent)",
            boxShadow: "0 0 8px rgba(0, 122, 204, 0.3)",
          }}
        />

        {/* Rendered experience blocks */}
        {renderedItems.map((item, idx) => (
          <div key={idx} className="relative mb-8 animate-fade-in-up" style={{ animationDelay: `${idx * 0.2}s` }}>
            {/* Timeline dot */}
            <div className="absolute -left-[18px] top-2 w-4 h-4 rounded-full border-2 flex items-center justify-center"
              style={{
                borderColor: item.isActive ? "#4ec9b0" : "#007acc",
                background: "#1e1e1e",
              }}
            >
              {item.isActive && (
                <div className="w-2 h-2 rounded-full bg-[#4ec9b0] animate-pulse" />
              )}
            </div>

            {/* Command */}
            <div className="text-[#007acc] text-base mb-2 ml-3">
              <span className="text-[#4ec9b0]">&gt;</span> {item.typed}
            </div>

            {/* Output card */}
            <div className="ml-3 glass-card p-4 rounded-lg"
              style={{ borderLeft: `3px solid ${item.isActive ? "#4ec9b0" : "#007acc"}` }}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-gray-300 font-semibold text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {item.company}
                  </div>
                  <div className="text-gray-500 text-xs">{item.role}</div>
                </div>
                <div className="flex items-center gap-2">
                  {item.isActive && (
                    <span className="flex items-center gap-1 text-[10px] text-[#4ec9b0] bg-[#4ec9b0]/10 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 bg-[#4ec9b0] rounded-full animate-pulse" />
                      Active
                    </span>
                  )}
                  <span className="text-gray-600 text-xs">{item.duration}</span>
                </div>
              </div>

              <pre className="whitespace-pre-wrap leading-relaxed text-[12px] font-mono mt-2">
                {item.lines.map((line, i) => {
                  if (line.includes("const")) {
                    return (
                      <div key={i}>
                        <span className="text-[#c586c0]">const</span>{" "}
                        <span className="text-[#dcdcaa]">{line.split("const ")[1].split(" =")[0]}</span>{" "}
                        = <span className="text-gray-300">[</span>
                      </div>
                    );
                  } else if (line.startsWith("]") || line === "];") {
                    return <div key={i} className="text-gray-300">{line}</div>;
                  } else if (line.includes("(") && line.includes(");")) {
                    return (
                      <div key={i}>
                        <span className="text-[#dcdcaa]">{line.split("(")[0]}</span>
                        <span className="text-white">(</span>
                        <span className="text-white">{line.split("(")[1].replace(");", "")}</span>
                        <span className="text-white">);</span>
                      </div>
                    );
                  } else {
                    return <div key={i} className="text-[#6a9955]">{line}</div>;
                  }
                })}
              </pre>
            </div>
          </div>
        ))}
      </div>

      {/* Typing area */}
      {typedCommand && (
        <div className="relative pl-6">
          <div className="absolute left-[9px] top-0 w-[2px] h-full"
            style={{ background: "linear-gradient(180deg, #c586c0, transparent)" }} />
          <div className="text-[#007acc] text-base ml-3">
            <span className="text-[#4ec9b0]">&gt;</span> {typedCommand}
            <span className="inline-block w-[2px] h-4 bg-white ml-0.5 animate-blink" style={{ verticalAlign: "text-bottom" }} />
          </div>
        </div>
      )}
    </div>
  );
}
