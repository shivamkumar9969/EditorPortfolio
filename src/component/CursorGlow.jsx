import React, { useState, useEffect } from "react";

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const handler = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div
      className="fixed pointer-events-none"
      style={{
        left: pos.x - 200,
        top: pos.y - 200,
        width: 400,
        height: 400,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(0,122,204,0.06) 0%, rgba(0,122,204,0.02) 40%, transparent 70%)",
        zIndex: 1,
        transition: "left 0.08s ease-out, top 0.08s ease-out",
        willChange: "left, top",
      }}
    />
  );
}
