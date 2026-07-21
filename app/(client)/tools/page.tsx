import { ArrowRight, FileText, QrCode, Wrench } from "lucide-react";
import type { Metadata } from "next";

import Link from "next/link";

export const metadata: Metadata = {
  title: "Tools | OpenCorex",
  description: "Explore free, open-source tools built by the OpenCorex community — QR code generator, CV builder, and more.",
};

const tools = [
  {
    slug: "qr-code",
    label: "Utility",
    title: "QR Code Generator",
    description:
      "Generate clean, scannable QR codes from any URL or text. Download as PNG — no sign-up, no tracking, no limits.",
    icon: QrCode,
    accent: "#8D153A",
    href: "/tools/qr-code",
    available: true,
  },
  {
    slug: "cv-generator",
    label: "Productivity",
    title: "CV Generator",
    description:
      "Build a professional CV in minutes. Fill in your details, pick a clean layout, and export a print-ready PDF.",
    icon: FileText,
    accent: "#205493",
    href: "/tools/cv-generator",
    available: true,
  },
];

export default function ToolsPage() {
  return (
    <div className="space-y-10 pb-12 lg:space-y-14">

      {/* ── Hero ── */}
      <section className="section-grid">
        <div className="panel-strong rounded-[2rem] p-8 sm:p-10 lg:p-12">
          <div className="accent-rule" />
          <p className="eyebrow mt-6">
            <Wrench className="h-4 w-4" />
            Community tools
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl">
            Open-source tools<br className="hidden sm:block" /> built for everyone
          </h1>
          <p className="mt-4 max-w-2xl text-[var(--muted)] text-base leading-relaxed">
            Free, no-account-required utilities crafted by the OpenCorex community.
            Every tool runs in your browser and respects your privacy.
          </p>
        </div>
      </section>

      {/* ── Tool Grid ── */}
      <section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.slug}
                href={tool.href}
                className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface-strong)] p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--line-strong)] hover:shadow-[0_24px_48px_rgba(0,0,0,0.5)]"
                style={{ boxShadow: "0 12px 32px rgba(0,0,0,0.35)" }}
              >
                {/* Accent glow blob */}
                <div
                  className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full opacity-20 blur-3xl transition-opacity duration-300 group-hover:opacity-35"
                  style={{ background: tool.accent }}
                />

                {/* Icon */}
                <div
                  className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{
                    background: `${tool.accent}22`,
                    border: `1px solid ${tool.accent}44`,
                  }}
                >
                  <Icon className="h-5 w-5" style={{ color: tool.accent }} />
                </div>

                {/* Label */}
                <span
                  className="mb-2 text-[0.7rem] font-bold uppercase tracking-widest"
                  style={{ color: tool.accent }}
                >
                  {tool.label}
                </span>

                {/* Title */}
                <h2 className="text-lg font-bold leading-snug text-[var(--foreground)]">
                  {tool.title}
                </h2>

                {/* Description */}
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                  {tool.description}
                </p>

                {/* CTA */}
                <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-[var(--foreground)] transition-colors duration-150 group-hover:text-white">
                  Open tool
                  <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" />
                </div>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, ${tool.accent}, transparent)` }}
                />
              </Link>
            );
          })}
        </div>
      </section>

    </div>
  );
}
