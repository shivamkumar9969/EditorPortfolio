import React, { useRef } from "react";
import emailjs from "emailjs-com";
import "../CSS/Contact.css";

export default function Contacts() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_iyw1s0b", "template_mwtb8od", form.current, "Mw_Kfh0fzia_Psg_Q")
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
          alert("Message sent successfully!");
          sendAutoReply(form.current.elements.email.value, form.current.elements.name.value);
        },
        (error) => {
          console.error("Failed to send email:", error.text);
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

  return (
    <section className="text-white font-mono text-sm px-4">
      <h2 className="text-base font-bold text-gray-400 mb-4">// Contact Me</h2>

      <form ref={form} onSubmit={sendEmail} className="max-w-2xl mx-auto space-y-4 bg-[#1e1e1e] p-6 border border-gray-700 rounded">
        {[
          { id: "name", type: "text", label: "name", placeholder: "Your Name" },
          { id: "email", type: "email", label: "email", placeholder: "your@email.com" },
          { id: "subject", type: "text", label: "subject", placeholder: "Let's connect" },
        ].map(({ id, type, label, placeholder }) => (
          <div key={id} className="text-gray-400">
            <span className="text-yellow-400">const</span>{" "}
            <span className="text-blue-400">{label}</span>{" "}
            <span className="text-white">= "</span>
            <input
              id={id}
              name={id}
              type={type}
              required
              placeholder={placeholder}
              className="bg-transparent border-none outline-none text-gray-200 placeholder-gray-500 w-56 inline-block"
            />
            <span className="text-white">";</span>
          </div>
        ))}

        <div className="text-gray-400">
          <span className="text-yellow-400">const</span>{" "}
          <span className="text-blue-400">message</span>{" "}
          <span className="text-white">= `</span>
          <textarea
            id="message"
            name="message"
            rows={3}
            required
            placeholder="Your message here..."
            className="bg-transparent border-none outline-none text-gray-200 placeholder-gray-500 w-full resize-none mt-1"
          />
          <span className="text-white">`;</span>
        </div>

        <div>
          <button
            type="submit"
            className="mt-4 bg-[#2a2360] hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            return <span className="text-green-400">"Send Message"</span>;
          </button>
        </div>
      </form>
    </section>
  );
}
