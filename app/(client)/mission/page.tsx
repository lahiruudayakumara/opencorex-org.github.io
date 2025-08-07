import { Target } from "lucide-react";

export default function Mission() {
  const primaryColor = "#8D153A";
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <div className="inline-flex items-center px-4 py-2 border-[#8D153A] border-2 rounded-full text-sm font-semibold mb-6 text-[#8D153A]">
          <Target className="w-4 h-4 mr-2" />
          Our Mission & Vision
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Empowering developers worldwide through open-source innovation and
          collaborative development
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h3
            className="text-2xl font-semibold mb-6"
            style={{ color: primaryColor }}
          >
            What We Believe
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div
                className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                style={{ backgroundColor: primaryColor }}
              ></div>
              <p className="text-gray-700">
                Open source software drives innovation and creates opportunities
                for everyone
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div
                className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                style={{ backgroundColor: primaryColor }}
              ></div>
              <p className="text-gray-700">
                Collaboration transcends geographical and cultural boundaries
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div
                className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                style={{ backgroundColor: primaryColor }}
              ></div>
              <p className="text-gray-700">
                Knowledge sharing accelerates technological advancement
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div
                className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                style={{ backgroundColor: primaryColor }}
              ></div>
              <p className="text-gray-700">
                Inclusive communities create better solutions
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl">
          <h3
            className="text-2xl font-semibold mb-6"
            style={{ color: primaryColor }}
          >
            Our Impact
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <div
                className="text-3xl font-bold mb-2"
                style={{ color: primaryColor }}
              >
                1
              </div>
              <div className="text-gray-600">Developers</div>
            </div>
            <div className="text-center">
              <div
                className="text-3xl font-bold mb-2"
                style={{ color: primaryColor }}
              >
                3
              </div>
              <div className="text-gray-600">Projects</div>
            </div>
            <div className="text-center">
              <div
                className="text-3xl font-bold mb-2"
                style={{ color: primaryColor }}
              >
                200+
              </div>
              <div className="text-gray-600">Downloads</div>
            </div>
            <div className="text-center">
              <div
                className="text-3xl font-bold mb-2"
                style={{ color: primaryColor }}
              >
                1
              </div>
              <div className="text-gray-600">Countries</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
