import React, { useState } from 'react';
import { Menu, X, CheckCircle, Shield, MapPin, Zap, Users, Mail, Phone } from 'lucide-react';

const LandingPage = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  const challenges = [
    {
      title: "Inefficient Site Validation",
      description: "Without proper validation of nearby solar, wind, industrial, and residential infrastructure, hydrogen plants risk being set up in unsuitable locations, leading to poor efficiency and higher costs."
    },
    {
      title: "Lack Of Transparency In Subsidies",
      description: "Current subsidy disbursement processes are often manual and opaque, allowing scope for misuse and fraud while discouraging investor trust."
    },
    {
      title: "Limited Visibility & Slow Adoption",
      description: "The absence of centralized mapping and tracking of hydrogen projects slows adoption, creates information gaps for stakeholders, and hinders large-scale green hydrogen integration."
    }
  ];

  const solutions = [
    {
      title: "GIS Layer: Strategic Infrastructure Planning",
      description: "Visualizes existing and planned assets, renewable sources, demand centers, and transport logistics. Advanced models guide optimal site selection based on renewable proximity, demand hotspots, regulatory zones, and cost efficiency.",
      icon: <MapPin className="w-8 h-8 text-blue-600" />
    },
    {
      title: "Smart Contract Layer: Transparent Subsidy Automation",
      description: "Automates real-time government subsidy distribution directly to producers based on predefined production or milestone data. Provides immutable audit trails for complete accountability and integrates seamlessly with existing financial systems.",
      icon: <Shield className="w-8 h-8 text-green-600" />
    }
  ];

  const workflowSteps = [
    "Company Application: Companies submit applications for green hydrogen plant approval.",
    "Validation Process: System validates site suitability based on proximity to renewable energy sources and demand centres.",
    "Approval & Mapping: Validated companies are approved and marked on an interactive map for enhanced visibility.",
    "Blockchain Verification: IoT and Oracle integrate production data onto blockchain for trusted validation.",
    "Subsidy Disbursement: Smart contracts automatically transfer subsidies upon meeting conditions."
  ];

  const blockchainSteps = [
    {
      title: "Government Authority (Admin)",
      description: "Deploys Solidity smart contract on Ethereum, defining subsidy rules and holding the government subsidy wallet for distribution."
    },
    {
      title: "Renewable Energy Company",
      description: "Registers on the platform with an Ethereum wallet and installs IoT meters to track actual renewable energy production."
    },
    {
      title: "Oracle Blockchain Network (Data Layer)",
      description: "IoT devices record real-time energy production. Oracles fetch, verify, and securely send this data to the Ethereum blockchain, ensuring tamper-proof input."
    },
    {
      title: "Smart Contract (Ethereum Layer)",
      description: "Receives production data from the Oracle, checks it against government-defined rules. If criteria are met, it triggers automatic subsidy release."
    },
    {
      title: "Subsidy Disbursement",
      description: "The smart contract transfers subsidies from the government wallet to the company's wallet. All transactions are transparent, immutable, and auditable."
    }
  ];

  const HomePage = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-3xl p-8 md:p-12 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          HydroTrust
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Smart Validation & Transparent Subsidies
        </p>
        <p className="text-lg mb-8 max-w-4xl mx-auto">
          Our solution streamlines hydrogen plant adoption by validating nearby renewable resources, 
          mapping approved companies, and ensuring transparent subsidy distribution using blockchain.
        </p>
        <button 
          onClick={() => setCurrentPage('about')}
          className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Learn More
        </button>
      </div>

      {/* Key Features */}
      <div className="bg-white rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Why Choose HydroTrust?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3">Smart Site Validation</h3>
            <p className="text-gray-600">
              GIS-powered infrastructure planning for optimal hydrogen plant locations
            </p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
            <Shield className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3">Transparent Subsidies</h3>
            <p className="text-gray-600">
              Blockchain-based automation ensuring fraud-proof subsidy distribution
            </p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
            <Zap className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3">Accelerated Adoption</h3>
            <p className="text-gray-600">
              Centralized mapping and tracking for faster green hydrogen integration
            </p>
          </div>
        </div>
      </div>

      {/* Challenges Preview */}
      <div className="bg-white rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Addressing Key Challenges</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {challenges.map((challenge, index) => (
            <div key={index} className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
              <h3 className="text-lg font-bold text-red-700 mb-3">{challenge.title}</h3>
              <p className="text-gray-700 text-sm">{challenge.description.substring(0, 120)}...</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button 
            onClick={() => setCurrentPage('about')}
            className="text-blue-600 font-semibold hover:text-blue-800 transition-colors"
          >
            Learn more about our solutions →
          </button>
        </div>
      </div>
    </div>
  );

  const AboutPage = () => (
    <div className="space-y-8">
      {/* About Hero */}
      <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">About HydroTrust</h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto">
          Revolutionizing green hydrogen development through intelligent validation, 
          transparent processes, and blockchain-powered automation.
        </p>
      </div>

      {/* Challenges Section */}
      <div className="bg-white rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Barriers to Green Hydrogen Adoption
        </h2>
        <div className="space-y-6">
          {challenges.map((challenge, index) => (
            <div key={index} className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-6 rounded-r-xl">
              <h3 className="text-xl font-bold text-red-700 mb-3">
                {index + 1}. {challenge.title}
              </h3>
              <p className="text-gray-700">{challenge.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Solution */}
      <div className="bg-white rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Integrated Planning & Automated Incentives
        </h2>
        <p className="text-lg text-gray-600 text-center mb-8">
          We propose a map-based digital platform seamlessly integrating a Geographic Information System (GIS) 
          to revolutionize green hydrogen development
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {solutions.map((solution, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center mb-4">
                {solution.icon}
                <h3 className="text-xl font-bold ml-3 text-gray-800">{solution.title}</h3>
              </div>
              <p className="text-gray-700">{solution.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Blockchain System Overview */}
      <div className="bg-white rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Blockchain-Based Renewable Energy Subsidy System
        </h2>
        <div className="space-y-6">
          {blockchainSteps.map((step, index) => (
            <div key={index} className="flex items-start space-x-4 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                {index + 1}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-700">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Workflow */}
      <div className="bg-white rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Green Hydrogen Approval & Subsidy System: Workflow
        </h2>
        <div className="space-y-4">
          {workflowSteps.map((step, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
              <p className="text-gray-700">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div className="space-y-8">
      {/* Contact Hero */}
      <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Contact Us</h1>
        <p className="text-xl text-gray-600">
          Ready to revolutionize green hydrogen development? Get in touch with our team.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Send us a Message</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                type="email" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Your company name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea 
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                placeholder="Tell us about your project or inquiry..."
              ></textarea>
            </div>
            <button 
              type="button"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105"
              onClick={() => alert('Thank you for your message! We will get back to you soon.')}
            >
              Send Message
            </button>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Get in Touch</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Mail className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-800">Email</p>
                  <p className="text-gray-600">contact@hydrotrust.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-800">Phone</p>
                  <p className="text-gray-600">+91 9876543210</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-800">Address</p>
                  <p className="text-gray-600">Ahmedabad, Gujarat, India</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-bold mb-4">Ready to Transform Green Hydrogen?</h3>
            <p className="mb-6 opacity-90">
              Join the revolution in sustainable energy with our cutting-edge validation and subsidy management platform.
            </p>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Trusted by leading renewable energy companies</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600">
              HydroTrust
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`font-medium transition-colors duration-300 ${
                    currentPage === item.id 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-gray-200">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left py-2 px-4 rounded transition-colors ${
                    currentPage === item.id 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-blue-400">HydroTrust</h3>
            <p className="text-gray-400">Smart Validation & Transparent Subsidies</p>
          </div>
          <div className="border-t border-gray-700 pt-4">
            <p className="text-gray-400">
              © 2025 HydroTrust. All rights reserved. | Revolutionizing Green Hydrogen Development
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;