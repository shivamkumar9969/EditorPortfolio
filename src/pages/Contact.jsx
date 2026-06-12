import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import "../CSS/Contact.css";

export default function Contacts() {
  const form = useRef();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setSending(true);

    emailjs
      .sendForm("service_iyw1s0b", "template_mwtb8od", form.current, "Mw_Kfh0fzia_Psg_Q")
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
          setSending(false);
          setSent(true);
          setTimeout(() => setSent(false), 4000);
          sendAutoReply(form.current.elements.email.value, form.current.elements.name.value);
        },
        (error) => {
          console.error("Failed to send email:", error.text);
          setSending(false);
          alert("Failed to send message. Please try again.");
        }
      );

    e.target.reset();
  };

  const sendAutoReply = (toEmail, fromName) => {
    emailjs
      .send(
        "service_iyw1s0b",
        "template_c0719ww",
        {
          to_email: toEmail,
          from_name: "Shivam Kumar",
          message_html: `Hello ${fromName},\n\nThank you for your message. We have received your inquiry and will respond shortly.\n\nBest regards,\nShivam Kumar`,
        },
        "YOUR_USER_ID"
      )
      .then(
        (result) => console.log("Auto-reply sent successfully:", result.text),
        (error) => console.error("Failed to send auto-reply:", error.text)
      );
  };

  const fields = [
    { id: "name", type: "text", label: "name", placeholder: "Your Name", lineNum: 3 },
    { id: "email", type: "email", label: "email", placeholder: "your@email.com", lineNum: 4 },
    { id: "subject", type: "text", label: "subject", placeholder: "Let's connect", lineNum: 5 },
  ];

  return (
    <section className="text-white font-mono text-sm px-2 py-4">
      <h2 className="text-lg font-bold mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
        <span className="text-gray-600">{`//`}</span>
        <span className="ml-2" style={{
          background: "linear-gradient(90deg, #007acc, #4ec9b0)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>Contact Me</span>
      </h2>

      {/* Code-style header */}
      <div className="text-gray-500 text-xs mb-3">
        <span className="text-gray-600">1 </span>
        <span className="text-[#c586c0]">import</span> {`{ `}
        <span className="text-[#dcdcaa]">sendMessage</span>
        {` } `}
        <span className="text-[#c586c0]">from</span>
        <span className="text-[#ce9178]"> 'portfolio/contact'</span>;
      </div>
      <div className="text-gray-500 text-xs mb-4">
        <span className="text-gray-600">2 </span>
      </div>

      <form
        ref={form}
        onSubmit={sendEmail}
        className="max-w-2xl glass-card p-6 rounded-lg space-y-4"
        style={{ borderLeft: "3px solid #007acc" }}
      >
        {fields.map(({ id, type, label, placeholder, lineNum }) => (
          <div key={id} className="text-gray-400 group">
            <div className="flex flex-wrap items-center gap-y-1">
              <span className="text-gray-600 text-xs w-5 text-right flex-shrink-0">{lineNum}</span>
              <span className="text-[#c586c0] ml-2">const</span>{" "}
              <span className="text-[#9cdcfe]">{label}</span>{" "}
              <span className="text-white">= "</span>
              <div className="relative flex-1">
                <input
                  id={id}
                  name={id}
                  type={type}
                  required
                  placeholder={placeholder}
                  onFocus={() => setFocusedField(id)}
                  onBlur={() => setFocusedField(null)}
                  className="contact-input-enhanced"
                  style={{
                    borderBottomColor: focusedField === id ? "#007acc" : "transparent",
                    boxShadow: focusedField === id ? "0 1px 0 0 #007acc, 0 2px 8px rgba(0,122,204,0.15)" : "none",
                  }}
                />
              </div>
              <span className="text-white">";</span>
            </div>
          </div>
        ))}

        <div className="text-gray-400">
          <div className="flex items-start gap-1">
            <span className="text-gray-600 text-xs w-5 text-right flex-shrink-0 mt-1">6</span>
            <span className="text-[#c586c0] ml-2 mt-1">const</span>{" "}
            <span className="text-[#9cdcfe] mt-1">message</span>{" "}
            <span className="text-white mt-1">= `</span>
          </div>
          <div className="ml-8">
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              placeholder="Your message here..."
              onFocus={() => setFocusedField("message")}
              onBlur={() => setFocusedField(null)}
              className="contact-textarea-enhanced"
              style={{
                borderColor: focusedField === "message" ? "rgba(0,122,204,0.3)" : "rgba(255,255,255,0.06)",
                boxShadow: focusedField === "message" ? "0 0 12px rgba(0,122,204,0.15)" : "none",
              }}
            />
          </div>
          <div className="ml-8">
            <span className="text-white">`;</span>
          </div>
        </div>

        {/* Send button */}
        <div className="pt-2 ml-8">
          <button
            type="submit"
            disabled={sending}
            className="contact-submit-btn group relative overflow-hidden"
          >
            {sending ? (
              <span className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span className="text-[#4ec9b0]">Sending...</span>
              </span>
            ) : sent ? (
              <span className="flex items-center gap-2">
                <span className="text-[#4ec9b0]">✓</span>
                <span className="text-[#4ec9b0]">Message sent!</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span className="text-[#c586c0]">return</span>
                <span className="text-[#ce9178]">"Send Message"</span>
                <span className="text-white">;</span>
                <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">🚀</span>
              </span>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
