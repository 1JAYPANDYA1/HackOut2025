import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans w-full">
      
      {/* Home Section */}
      <section id="home" className="h-screen flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-5xl font-bold mb-4">Welcome to Hydrogen Solutions</h1>
        <p className="text-xl max-w-xl">
          Driving sustainable energy with smart hydrogen plant approvals, map visualization, and blockchain-based subsidies.
        </p>
      </section>

      {/* About Section */}
      <section id="about" className="h-screen flex flex-col justify-center items-center text-center px-4 bg-gray-100">
        <h2 className="text-4xl font-semibold mb-4">About Our Platform</h2>
        <p className="text-lg max-w-2xl">
          We help hydrogen companies get approved efficiently by checking proximity to solar and wind farms, industries, and residences. Our platform visualizes company locations on maps and ensures transparent subsidy distribution using blockchain validation.
        </p>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="h-screen flex flex-col justify-center items-center text-center px-4 bg-white">
        <h2 className="text-4xl font-semibold mb-4">Contact Us</h2>
        <p className="text-lg mb-6">Have questions or want to collaborate? Reach out to us!</p>
        <form className="flex flex-col gap-4 w-full max-w-md">
          <input type="text" placeholder="Your Name" className="p-3 rounded border border-gray-300" />
          <input type="email" placeholder="Your Email" className="p-3 rounded border border-gray-300" />
          <textarea placeholder="Your Message" className="p-3 rounded border border-gray-300"></textarea>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold">
            Send Message
          </button>
        </form>
      </section>

    </div>
  );
}
