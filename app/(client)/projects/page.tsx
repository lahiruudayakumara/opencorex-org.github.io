import { Github, Rocket } from "lucide-react";

import Link from "next/link";

export default function Projects() {
  const primaryColor = "#8D153A";

  const projects = [
    {
      title: "OpenHealth",
      description:
        "A platform for sharing and collaborating on health-related open-source projects.",
      status: "Active",
      tech: ["Go", "Healthcare", "Open Source"],
      projectLink: "https://openhealth.org",
      githubLink: "https://github.com/OpenHealth",
    },
    {
      title: "BackStem",
      description:
        "TypeScript backend framework for building scalable applications.",
      status: "Private",
      tech: ["Typescript", "Framework"],
      projectLink: "https://backstem.com",
      githubLink: "https://github.com/BackStem",
    },
    {
      title: "React Helmet Pro",
      description:
        "React Helmet Pro is a powerful tool for managing document head in React applications.",
      status: "Active",
      tech: ["React", "Typescript", "Seo"],
      projectLink: "https://www.npmjs.com/package/react-helmet-pro",
      githubLink: "https://github.com/lahiruudayakumara/react-helmet-pro",
    },
  ];
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
                      <div
                className="inline-flex items-center px-4 py-2 border-[#8D153A] border-2 rounded-full text-sm font-semibold mb-6 text-[#8D153A]"
              >
                <Rocket className="w-4 h-4 mr-2" />
                Projects
              </div>
        <p className="text-xl text-gray-600">
          Innovative solutions built by and for the developer community
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    project.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : project.status === "Beta"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <p className="text-gray-600 mb-6">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, j) => (
                  <span
                    key={j}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <Link href={project.projectLink} target="_blank" className="flex-1 py-2 px-4 text-white rounded-lg font-medium hover:opacity-90 transition-opacity bg-[#8D153A] cursor-pointer text-center">
                    View Project
                </Link>
                <Link href={project.githubLink} target="_blank" className="p-2 border rounded-lg hover:bg-gray-50 transition-colors border-[#8D153A]">
                    <Github
                      className="w-5 h-5"
                      style={{ color: primaryColor }}
                    />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
