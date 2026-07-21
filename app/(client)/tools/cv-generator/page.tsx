import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV Generator | OpenCorex Tools",
  description: "Build a professional CV in minutes and export a print-ready PDF. Free, no sign-up required.",
};

export default function CvGeneratorToolPage() {
  return (
    <div className="space-y-8 pb-10 lg:space-y-12">
      <section className="section-grid">
        <div className="panel-strong rounded-[2rem] p-8 sm:p-10 lg:p-12">
          <div className="accent-rule" />
          <p className="eyebrow mt-6">Coming soon</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl">
            CV Generator
          </h1>
          <p className="mt-4 max-w-xl text-[var(--muted)]">
            This tool is under construction. Soon you will be able to fill in your details, pick a clean layout, and export a print-ready PDF — all in the browser.
          </p>
        </div>
      </section>
    </div>
  );
}
