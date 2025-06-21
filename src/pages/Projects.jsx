import React from "react";
import easyPeasyImg from "../assests/images/easypeasy.jpeg";
import invoice from "../assests/images/invoice.png";
import eCommerceImg from "../assests/images/ecommerce.jpeg";
import driveBuddyImg from "../assests/images/drivebuddy.jpeg";
import defianceSystemImg from "../assests/images/defiancesystem.jpeg";
import educationManagementImg from "../assests/images/educationmanagement.jpeg";

const projects = [
  {
    title: "EasyPeasy",
    description:
      "A full-featured rental platform for listing and managing rental properties with real-time availability, secure messaging, and payment gateway integration.",
    tech: ["React.js", "Node.js", "Tailwind CSS", "Express.js", "MongoDB"],
    link: "https://github.com/shivamkumar9969/EasyPesy",
    image: easyPeasyImg,
  },
  {
    title: "Invoice Generator",
    description:
      "An invoicing tool tailored for freelancers to manage clients, generate downloadable PDF invoices, track payments, and automate billing cycles.",
    tech: ["React.js", "Node.js", "MongoDB"],
    link: "https://github.com/shivamkumar9969/invoice-generator/tree/master",
    image: invoice,
  },
  {
    title: "E-Commerce",
    description:
      "An e-commerce platform with dynamic product browsing, admin dashboard, cart/wishlist logic, authentication, and Stripe payment integration.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB"],
    link: "https://github.com/shivamkumar9969/MernStackProject",
    image: eCommerceImg,
  },
  {
    title: "Drive Buddy",
    description:
      "A real-time vehicle safety system that detects driver drowsiness using sensors and alerts emergency contacts using GPS + GSM modules.",
    tech: ["IoT", "Arduino", "C++", "GSM", "GPS"],
    image: driveBuddyImg,
  },
  {
    title: "Defiance System",
    description:
      "Military-grade base security prototype featuring intruder detection using IR sensors, sound detection, and emergency alert triggers.",
    tech: ["Sensors", "Microcontrollers", "Embedded C"],
    image: defianceSystemImg,
  },
  {
    title: "Education Admin Management",
    description:
      "A school automation system to manage timetables, grades, assignments, announcements, and parent/student portals in real-time.",
    tech: ["React.js", "Node.js", "MongoDB"],
    image: educationManagementImg,
  },
];

export default function Projects() {
  return (
    <section className="text-white font-mono text-sm max-w-5xl mx-auto px-4">
      <h2 className="text-base font-bold text-gray-500 mb-4"><span className="text-gray-500">{`//`}</span> Projects</h2>
      <div className="space-y-6">
        {projects.map((project, i) => (
          <div
            key={i}
            className="border border-gray-700 rounded overflow-hidden shadow-sm bg-[#1e1e1e]"
          >
            <div className="bg-[#2d2d2d] text-xs flex justify-between items-center px-4 py-1 text-gray-300 border-b border-gray-700">
              <span className="text-green-400">
                {project.title.toLowerCase().replace(/\s+/g, "_")}.js
              </span>
              <span className="text-red-400 hover:text-red-300 cursor-pointer">
                ×
              </span>
            </div>
            <div className="flex px-4 py-3">
              <div className="pr-4 text-gray-600 text-right select-none">
                <code className="leading-6 block">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <div key={n}>{n}</div>
                  ))}
                </code>
              </div>
              <div className="flex-1 text-gray-300">
                <code className="leading-6 block whitespace-pre-wrap text-xs">
                  {`/**\n * Title: ${project.title}\n * Description: ${
                    project.description
                  }\n * Tech Stack: ${project.tech.join(", ")}\n */`}
                </code>
                {project.image && (
                  <div className="mt-3 w-full max-w-xs rounded border border-gray-700 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-28"
                    />
                  </div>
                )}
                {project.link && (
                  <div className="mt-3">
                    <code className="text-green-400">
                      return{" "}
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        "View on GitHub"
                      </a>
                      ;
                    </code>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
