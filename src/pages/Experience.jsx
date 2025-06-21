import React, { useEffect, useState } from "react";

export default function Experience() {
  const experiences = [
    {
      functionCall: "RackronExperience();",
      company: "Rackron Technologies Pvt Ltd",
      duration: "June 2024 – Present",
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
      duration: "Sep 2023 – Nov 2023",
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
        }, 800);
      }
    }, 60);

    return () => clearInterval(typing);
  }, [currentIndex]);

  return (
    <div className="text-white font-mono text-sm px-4 md:px-8 py-6 bg-[#1e1e1e] rounded-xl shadow-lg border border-[#2c2c2c]">
      <h2 className="text-xl font-bold mb-6 text-gray-400">
        <span className="text-gray-500">{`//`}</span> Work Experience
      </h2>

      {/* Typing Area */}
      {typedCommand && (
        <div className="text-blue-400 text-lg mb-4 pl-1">
          <span className="text-green-400">&gt;</span> {typedCommand}
          <span className="blinking-cursor">|</span>
        </div>
      )}

      {/* Output Blocks */}
      {renderedItems.map((item, idx) => (
        <div
          key={idx}
          className="mb-6 bg-[#111] rounded-lg border border-[#333] shadow-inner px-4 py-3"
        >
          <div className="text-blue-400 text-md mb-2">
            <span className="text-green-400">&gt;</span> {item.typed}
          </div>
          <div className="ml-4 border-l-2 border-blue-500 pl-4">
            <div className="text-gray-500">{item.company}</div>
            <div className="text-blue-800 text-xs mb-2">{item.duration}</div>
            <pre className="whitespace-pre-wrap leading-relaxed text-[13px] font-mono">
              {item.lines.map((line, i) => {
                if (line.includes("const")) {
                  return (
                    <div key={i}>
                      <span className="text-pink-500">const</span>{" "}
                      <span className="text-yellow-500">
                        {line.split("const ")[1].split(" =")[0]}
                      </span>{" "}
                      = <span className="text-gray-300">[</span>
                    </div>
                  );
                } else if (line.startsWith("]") || line === "];") {
                  return (
                    <div key={i} className="text-gray-300">
                      {line}
                    </div>
                  );
                } else if (line.includes("(") && line.includes(");")) {
                  return (
                    <div key={i}>
                      <span className="text-cyan-400">
                        {line.split("(")[0]}
                      </span>
                      <span className="text-white">(</span>
                      <span className="text-white">
                        {line.split("(")[1].replace(");", "")}
                      </span>
                      <span className="text-white">);</span>
                    </div>
                  );
                } else {
                  return (
                    <div key={i} className="text-green-400">
                      {line}
                    </div>
                  );
                }
              })}
            </pre>
          </div>
        </div>
      ))}
    </div>
  );
}
