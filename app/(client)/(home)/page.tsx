"use client";

import {
  BookOpen,
  Code,
  Globe,
  Rocket,
  ShieldCheck,
  Users,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="w-full">
        <div className="bg-slate-50 py-12">
          <div className="text-center max-w-4xl mx-auto px-6">
            <div className="mb-8">
              <div className="w-full h-24 mx-auto mb-6 rounded-full flex items-center justify-center  transform hover:scale-105 transition-transform duration-300">
                <Image
                  src="/logo.png"
                  alt="Platform Logo"
                  width={500}
                  height={500}
                />
              </div>
              <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Welcome to Our Open Source Community
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Building the future of open-source development through
                innovation, collaboration, and community-driven solutions.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link
                href="/projects"
                className="px-8 py-4 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer bg-[#8D153A]"
              >
                Explore Projects
              </Link>
              <Link
                href="/contribute"
                className="px-8 py-4 text-[#8D153A] font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointe border-[#8D153A] border-2 hover:bg-[#8D153A] hover:text-white cursor-pointer"
              >
                Get Involved
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center max-w-4xl mx-auto px-6 mb-12">
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              {
                icon: Rocket,
                title: "Innovation",
                desc: "Pioneering open-source technologies to tackle real-world challenges.",
              },
              {
                icon: Users,
                title: "Community",
                desc: "A global network of contributors united by passion and purpose.",
              },
              {
                icon: BookOpen,
                title: "Knowledge",
                desc: "Well-structured resources, guides, and documentation for all levels.",
              },
              {
                icon: Code,
                title: "Collaboration",
                desc: "Build together, review together — open contributions welcome.",
              },
              {
                icon: ShieldCheck,
                title: "Quality & Security",
                desc: "Peer-reviewed code and strong practices for secure, reliable software.",
              },
              {
                icon: Globe,
                title: "Open Access",
                desc: "Inclusive and transparent — open to everyone, everywhere.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <item.icon className="w-12 h-12 mx-auto mb-4 text-[#8D153A]" />
                <h3 className="text-xl font-semibold mb-2 text-[#8D153A]">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
