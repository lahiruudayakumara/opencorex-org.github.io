import { Calendar, Github, MessageCircle, Users } from "lucide-react";

import Link from "next/link";

export default function Contribute() {
  const primaryColor = "#8D153A";
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <div className="inline-flex items-center px-4 py-2 border-[#8D153A] border-2 rounded-full text-sm font-semibold mb-6 text-[#8D153A]">
          <Users className="w-4 h-4 mr-2" />
          Contribute
        </div>
        <p className="text-xl text-gray-600">
          Join our community and help shape the future of open source
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
          <h3
            className="text-2xl font-semibold mb-6"
            style={{ color: primaryColor }}
          >
            Getting Started
          </h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                style={{ backgroundColor: primaryColor }}
              >
                1
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-gray-800">Fork & Clone</h4>
                <p className="text-gray-600">
                  Start by forking our repository and cloning it to your local
                  machine.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                style={{ backgroundColor: primaryColor }}
              >
                2
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-gray-800">Read Guidelines</h4>
                <p className="text-gray-600">
                  Familiarize yourself with our contribution guidelines and code
                  standards.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                style={{ backgroundColor: primaryColor }}
              >
                3
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-gray-800">Create & Submit</h4>
                <p className="text-gray-600">
                  Create your branch, make changes, and submit a pull request.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3
            className="text-2xl font-semibold mb-6"
            style={{ color: primaryColor }}
          >
            Ways to Contribute
          </h3>
          <div className="space-y-4">
            {[
              "🐛 Report bugs and issues",
              "✨ Suggest new features",
              "💻 Submit code improvements",
              "📚 Improve documentation",
              "🎨 Design and UX improvements",
              "🧪 Write and improve tests",
              "🌍 Help with translations",
              "💬 Support community members",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <span className="text-lg">{item.split(" ")[0]}</span>
                <span className="text-gray-700">{item.slice(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#8d1539d5] to-[#8D153A] rounded-xl p-8 text-white text-center">
        <h3 className="text-2xl font-semibold mb-4">Join Our Community</h3>
        <p className="text-gray-300 mb-6">
          Connect with fellow developers, get help, and stay updated with the
          latest news
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="https://discord.gg/EyfpRmEn9v" className="flex items-center gap-2 px-6 py-3 text-[#8D153A] bg-white hover:bg-slate-100 rounded-lg font-medium transition-colors cursor-pointer">
            <MessageCircle className="w-5 h-5" />
            Discord Server
          </Link>
          <Link href="https://github.com/opencorex-org" className="flex items-center gap-2 px-6 py-3 text-[#8D153A] bg-white hover:bg-slate-100 rounded-lg font-medium transition-colors cursor-pointer">
            <Github className="w-5 h-5" />
            GitHub
          </Link>
          <Link href="https://calendar.google.com/calendar/u/3?cid=aW5mby5vcGVuY29yZXhAZ21haWwuY29t" className="flex items-center gap-2 px-6 py-3 text-[#8D153A] bg-white hover:bg-slate-100 rounded-lg font-medium transition-colors cursor-pointer">
            <Calendar className="w-5 h-5" />
            Community Events
          </Link>
        </div>
      </div>
    </div>
  );
}
