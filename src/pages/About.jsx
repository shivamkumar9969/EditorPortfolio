import React, { useEffect, useState } from "react";
import ShivamResume from "../assests/ShivamResume.pdf";
import "../CSS/About.css";

export default function About() {
  const [activeLink, setActiveLink] = useState(-1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveLink((prev) => (prev + 1) % 5);
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const socialLinks = [
    {
      href: "https://github.com/shivamkumar9969",
      icon: "fa-github",
      hoverClass: "hover-bg-black",
      ariaLabel: "GitHub",
    },
    {
      href: "https://www.linkedin.com/in/shivam-kumar-7b896a254/",
      icon: "fa-linkedin-in",
      hoverClass: "hover-bg-linkedin",
      ariaLabel: "LinkedIn",
    },
    {
      href: "https://www.instagram.com/mainshivhoon_/",
      icon: "fa-instagram",
      hoverClass: "hover-bg-instagram",
      ariaLabel: "Instagram",
    },
    {
      href: "https://www.facebook.com/profile.php?id=100011586043603",
      icon: "fa-facebook",
      hoverClass: "hover-bg-facebook",
      ariaLabel: "Facebook",
    },
    {
      href: "https://twitter.com/shivamkumar9969",
      icon: "fa-twitter",
      hoverClass: "hover-bg-twitter",
      ariaLabel: "Twitter",
    },
  ];

  const getActiveClasses = (index) => {
    if (index === activeLink) {
      switch (index) {
        case 0:
          return "text-white border-white bg-black opacity-[0.8]";
        case 1:
          return "text-white border-white bg-[#0077b5] opacity-[0.8]";
        case 2:
          return "text-white border-white bg-gradient-to-br from-red-500 to-blue-500";
        case 3:
          return "text-white border-white bg-[#4267B2] opacity-[.8]";
        case 4:
          return "text-white border-2 border-white bg-[#1DA1F2] opacity-[.8]";
        default:
          return "";
      }
    }
    return "";
  };

  return (
    <div
      id="About"
      className="about-container"
      role="region"
      aria-label="About section"
    >
      <div className="about-content max-w-4xl mx-auto text-center px-6 py-12 select-text">
        <h1 className="main-title text-left text-green-400 text-xl md:text-2xl">
          <span className="text-gray-500">//</span> Hi, I'm <span className="text-blue-400">Shivam Kumar</span>
        </h1>

        <h2 className="text-left font-mono text-sm text-gray-400 mb-4">
          <span className="text-yellow-400">const</span> role{" "}
          <span className="text-white">=</span>{" "}
          <span className="text-pink-400">"Web Developer"</span>;
        </h2>

        <div className="bg-[#1e1e1e] border-l-4 border-blue-600 pl-4 py-2 text-sm text-gray-400 font-mono leading-relaxed text-left">
          <p>
            <span className="text-gray-500">/**</span> <br />
            &nbsp;<span className="text-gray-500">*</span> I'm an experienced web developer with a focus on building scalable, production-ready systems that perform in real-world environments. <br />
            &nbsp;<span className="text-gray-500">*</span> I engineer dynamic frontends with React, and design robust, secure APIs using Node.js and Laravel — all seamlessly deployed on scalable AWS infrastructure. <br />
            &nbsp;<span className="text-gray-500">*</span> I specialize in scalable architecture, high-performance systems, and bridging the gap between engineering and business goals. <br />
            &nbsp;<span className="text-gray-500">*</span> I believe in writing code that’s not just functional — but maintainable, efficient, and built to scale. <br />
            <span className="text-gray-500">*/</span>
          </p>
        </div>

        <nav
          className="social-links mt-6 flex justify-center gap-5 text-4xl"
          aria-label="Social media links"
        >
          {socialLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.ariaLabel}
              className={`social-icon ${link.hoverClass} ${getActiveClasses(idx)}`}
              tabIndex={0}
            >
              <i className={`fa-brands ${link.icon}`} aria-hidden="true"></i>
            </a>
          ))}
        </nav>

        <div className="cv-download mt-6">
          <a
            href={ShivamResume}
            download="ShivamResume.pdf"
            className="cv-button inline-flex items-center font-medium px-4 py-2 rounded-lg transition-colors duration-200 select-none"
            aria-label="Download Resume PDF"
          >
            <i
              className="fa-solid fa-file-arrow-down mr-2"
              aria-hidden="true"
            ></i>
            Download CV
          </a>
        </div>
      </div>
    </div>
  );
}
