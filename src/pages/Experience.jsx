import React, { useState } from "react";

export default function Experience() {
  const [openItem, setOpenItem] = useState(0);

  const experiences = [
    {
      id: "rackron",
      title: "function RackronExperience()",
      company: "// Rackron Technologies Pvt Ltd",
      duration: "// June 2024 – Present",
      lines: [
        "const stack = ['MERN Stack', 'PHP', 'Laravel', 'Node.js', 'SQL'];",
        "const focus = 'Building scalable, full-stack applications';",
        "optimizeUX();",
        "implementAPIs();",
        "deployWithCloud();",
      ]
    },
    {
      id: "devtown",
      title: "function DevTownInternship()",
      company: "// DevTown (Internship)",
      duration: "// Sep 2023 – Nov 2023",
      lines: [
        "const tech = ['React', 'Node.js', 'MongoDB'];",
        "contributeToFeatures();",
        "learnAgileWorkflow();",
        "collaborateWithTeam();",
        "reviewCode();",
      ]
    }
  ];

  const handleToggle = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <div className="text-white font-mono text-sm">
      <h2 className="text-xl font-bold mb-4 text-gray-500"> <span className="text-gray-500">//</span> Work Experience</h2>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={exp.id}>
            <div
              className="cursor-pointer text-blue-600 hover:text-blue-400 transition"
              onClick={() => handleToggle(index)}
            >
              {openItem === index ? "▼" : "▶"} {exp.title}
            </div>
            {openItem === index && (
              <div className="ml-6 mt-2 text-gray-300 border-l-2 border-blue-500 pl-4">
                <div className="text-gray-500">{exp.company}</div>
                <div className="text-green-400 mb-2">{exp.duration}</div>
                <pre className="whitespace-pre-wrap text-sm">
                  {exp.lines.map((line, i) => (
                    <div key={i} className="text-blue-200">{line}</div>
                  ))}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
