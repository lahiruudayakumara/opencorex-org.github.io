"use client";

import { BookOpen, Home, MapPin, Rocket, Target, Users } from "lucide-react";
import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const navItems = [
    { id: "/", label: "Home", icon: Home },
    { id: "mission", label: "Mission", icon: Target },
    { id: "projects", label: "Projects", icon: Rocket },
    { id: "blog", label: "Blog", icon: BookOpen },
    { id: "roadmap", label: "Roadmap", icon: MapPin },
    { id: "contribute", label: "Contribute", icon: Users },
  ];

  const [activeSection, setActiveSection] = useState("home");
  const primaryColor = "#8D153A";
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let currentSection = "home";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < window.innerHeight) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="bg-[#8D153A] text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Image
                src="/logo-white.png"
                alt="Platform Logo"
                width={150}
                height={150}
              />
            </div>
            <p className="text-gray-300">
              Building the future through open-source innovation and community
              collaboration.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {navItems.slice(1).map((item) => (
                <Link id={item.id} key={item.id} href={item.id}>
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className="block text-gray-300 hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <div className="space-y-2">
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Discord
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Twitter
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Newsletter
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <div className="space-y-2">
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Documentation
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                API Reference
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Tutorials
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Support
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white mt-8 pt-8 text-center text-white">
          <p>&copy; 2025 OpenCorex. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
