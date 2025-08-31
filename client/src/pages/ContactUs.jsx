import { useState } from "react";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("✅ Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("❌ Failed to send. Try again.");
      }
    } catch (err) {
      setStatus("❌ Something went wrong.");
    }
  };

  return (
    <div className="h-screen flex mt-5 justify-center px-4">
      <div className="max-w-5xl w-full h-[80%] grid md:grid-cols-2 bg-white shadow-lg rounded-2xl overflow-hidden">
        
        {/* Left Side Image */}
        <div className="hidden md:flex items-center justify-center bg-blue-50">
          <img
            src="/ContactUs.jpg"   // 👉 place in /public
            alt="Contact"
            className=" h-auto w-fit"
          />
        </div>

        {/* Right Side Form */}
        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-6 flex flex-col justify-center h-full"
        >
          <h1 className="text-2xl font-bold text-gray-800">Contact Us</h1>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none"
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="3"
            value={form.message}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none resize-none"
            required
          />

          <button
            type="submit"
            className="px-6 py-3 text-white font-medium shadow-md transition"
            style={{
              borderRadius: "20px",
              backgroundColor: "#1565c0",
              textTransform: "none",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0d47a1")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#1565c0")}
          >
            Send Message
          </button>

          {status && <p className="text-sm text-gray-600">{status}</p>}
        </form>
      </div>
    </div>
  );
}
