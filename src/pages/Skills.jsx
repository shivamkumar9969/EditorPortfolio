import React, { useEffect, useState, useRef, useCallback } from "react";
import "../CSS/Skills.css";

import Pic1 from "../assests/images/images.jpg";
import Pic2 from "../assests/images/CSS3_logo.svg.png";
import Pic3 from "../assests/images/JavaScript-logo.png";
import Pic4 from "../assests/images/react-1-logo-png-transparent-removebg-preview.png";
import Pic5 from "../assests/images/C.png";
import Pic6 from "../assests/images/java.webp";
import Pic7 from "../assests/images/python.png";
import Pic8 from "../assests/images/sql-img-removebg.png";
import Pic9 from "../assests/images/monogo.png";
import Pic10 from "../assests/images/—Pngtree—php file document icon_4175828.png";
import Pic11 from "../assests/images/linux.png";
import Pic12 from "../assests/images/git.png";
import Pic13 from "../assests/images/cc-removebg-preview.png";
import Pic14 from "../assests/images/devops.svg";
import Pic15 from "../assests/images/express-js.png";
import Pic16 from "../assests/images/node.png";
import Next from "../assests/images/next.png";
import Laravel from "../assests/images/laravel.png";
import Ts from "../assests/images/ts.png";
import aws from "../assests/images/Aws.png";
import api from "../assests/images/api.webp";

const CATEGORY_COLORS = {
  Languages: { bar: "#c586c0", glow: "rgba(197, 134, 192, 0.3)" },
  Frontend: { bar: "#007acc", glow: "rgba(0, 122, 204, 0.3)" },
  "Backend / Frameworks": { bar: "#4ec9b0", glow: "rgba(78, 201, 176, 0.3)" },
  Database: { bar: "#dcdcaa", glow: "rgba(220, 220, 170, 0.3)" },
  "Tools & Platforms": { bar: "#f44747", glow: "rgba(244, 71, 71, 0.3)" },
};

const skillCategories = [
  {
    category: "Languages",
    skills: [
      { name: "JavaScript", imgSrc: Pic3, level: 90, note: "2 years, core web interactivity" },
      { name: "PHP", imgSrc: Pic10, level: 95, note: "Laravel & core PHP" },
      { name: "Python", imgSrc: Pic7, level: 75, note: "Scripting & automation" },
      { name: "C++", imgSrc: Pic5, level: 75, note: "Fundamentals clear" },
      { name: "TypeScript", imgSrc: Ts, level: 60, note: "Static typing in JS" },
      { name: "Java", imgSrc: Pic6, level: 55, note: "OOP & backend familiarity" },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "HTML", imgSrc: Pic1, level: 90, note: "2+ years, used daily" },
      { name: "CSS", imgSrc: Pic2, level: 85, note: "Good design & layout skills" },
      { name: "React", imgSrc: Pic4, level: 75, note: "Used in major projects" },
    ],
  },
  {
    category: "Backend / Frameworks",
    skills: [
      { name: "Laravel", imgSrc: Laravel, level: 90, note: "Used in team projects" },
      { name: "Node.js", imgSrc: Pic16, level: 75, note: "REST APIs, backend" },
      { name: "Express.js", imgSrc: Pic15, level: 70, note: "Backend routing & APIs" },
      { name: "Next.js", imgSrc: Next, level: 65, note: "SSR & routing basics" },
    ],
  },
  {
    category: "Database",
    skills: [
      { name: "SQL", imgSrc: Pic8, level: 85, note: "DBMS, joins & queries" },
      { name: "MongoDB", imgSrc: Pic9, level: 85, note: "Used in MERN projects" },
    ],
  },
  {
    category: "Tools & Platforms",
    skills: [
      { name: "Git", imgSrc: Pic12, level: 90, note: "Daily version control" },
      { name: "Linux", imgSrc: Pic11, level: 60, note: "Command line basics" },
      { name: "AWS", imgSrc: aws, level: 65, note: "EC2, S3 basic usage" },
      { name: "DevOps", imgSrc: Pic14, level: 65, note: "CI/CD familiarity" },
      { name: "Cloud Computing", imgSrc: Pic13, level: 65, note: "Basics of cloud services" },
      { name: "REST API", imgSrc: api, level: 80, note: "Integration & design" },
    ],
  },
];

/* ─── Skill Card with 3D tilt and animated progress ─── */
function SkillCard({ skill, categoryColor, animDelay, isVisible }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [displayLevel, setDisplayLevel] = useState(0);
  const cardRef = useRef(null);
  const hasAnimated = useRef(false);

  // Count-up animation
  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true;
      let start = 0;
      const step = Math.max(1, Math.floor(skill.level / 30));
      const timer = setInterval(() => {
        start += step;
        if (start >= skill.level) {
          setDisplayLevel(skill.level);
          clearInterval(timer);
        } else {
          setDisplayLevel(start);
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [isVisible, skill.level]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      ref={cardRef}
      className="skill-card-enhanced"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        animationDelay: `${animDelay}s`,
        opacity: isVisible ? 1 : 0,
        transition: "transform 0.15s ease-out, opacity 0.5s ease, box-shadow 0.3s ease",
      }}
    >
      <div className="skill-card-inner">
        <div className="flex items-center gap-3 mb-2">
          <img
            src={skill.imgSrc}
            alt={skill.name}
            className="w-7 h-7 object-contain"
            loading="lazy"
            draggable={false}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-white font-semibold text-sm truncate">{skill.name}</span>
              <span className="text-xs font-mono" style={{ color: categoryColor.bar }}>
                {displayLevel}%
              </span>
            </div>
            <div className="text-[11px] text-gray-500 truncate">{skill.note}</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="progress-bar-enhanced">
          <div
            className="progress-fill-enhanced"
            style={{
              width: isVisible ? `${skill.level}%` : "0%",
              background: `linear-gradient(90deg, ${categoryColor.bar}, ${categoryColor.bar}88)`,
              boxShadow: `0 0 8px ${categoryColor.glow}`,
              transition: "width 1s cubic-bezier(0.4, 0, 0.2, 1)",
              transitionDelay: `${animDelay + 0.3}s`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Main Skills Component ─── */
export default function Skills() {
  const [visibleGroups, setVisibleGroups] = useState(new Set());
  const observerRef = useRef(null);

  const observeCallback = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setVisibleGroups((prev) => new Set([...prev, entry.target.dataset.group]));
      }
    });
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(observeCallback, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    });

    document.querySelectorAll("[data-group]").forEach((el) => {
      observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [observeCallback]);

  return (
    <div className="skills-section-enhanced">
      <h2 className="skills-title-enhanced">
        <span className="text-gray-600">{`//`}</span>
        <span className="ml-2" style={{
          background: "linear-gradient(90deg, #007acc, #4ec9b0)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>Skills & Technologies</span>
      </h2>

      {skillCategories.map((group, groupIndex) => {
        const isVisible = visibleGroups.has(group.category);
        const colors = CATEGORY_COLORS[group.category] || CATEGORY_COLORS.Languages;
        return (
          <div
            key={group.category}
            data-group={group.category}
            className="category-section-enhanced"
          >
            <h3 className="category-title-enhanced" style={{ borderLeftColor: colors.bar }}>
              <span style={{ color: colors.bar }}>{group.category}</span>
              <span className="text-gray-600 text-xs ml-2 font-normal">
                ({group.skills.length})
              </span>
            </h3>

            <div className="skills-grid-enhanced">
              {group.skills.map((skill, index) => (
                <SkillCard
                  key={skill.name}
                  skill={skill}
                  categoryColor={colors}
                  animDelay={(groupIndex * 0.1) + (index * 0.08)}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
