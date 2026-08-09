import {
  Braces, Code2, FileImage, FileText, ImageDown, KeyRound, NotebookText,
  Palette, ReceiptText, ScanLine,
} from "lucide-react";

export const CV_GENERATOR_URL = "https://cv.opencorex.org";

export const tools = [
  { slug: "qr-code", label: "Utility", title: "QR Code Generator", description: "Create styled QR codes for links, Wi-Fi, contacts, menus, and more.", icon: ScanLine, accent: "#8D153A", href: "/tools/qr-code" },
  { slug: "cv-generator", label: "External", title: "CV Generator", description: "Build a professional CV and export a print-ready document.", icon: FileText, accent: "#205493", href: CV_GENERATOR_URL, external: true },
  { slug: "json-formatter", label: "Developer", title: "JSON Formatter", description: "Validate, format, minify, and download JSON instantly.", icon: Braces, accent: "#7C3AED" },
  { slug: "image-compressor", label: "Media", title: "Image Compressor", description: "Resize and compress images locally in your browser.", icon: ImageDown, accent: "#0F766E" },
  { slug: "password-generator", label: "Security", title: "Password Generator", description: "Generate strong, customizable passwords offline.", icon: KeyRound, accent: "#D97706" },
  { slug: "markdown-editor", label: "Writing", title: "Markdown Editor", description: "Write Markdown with a live preview and file export.", icon: NotebookText, accent: "#2563EB" },
  { slug: "pdf-toolkit", label: "Documents", title: "PDF Toolkit", description: "Select PDFs, inspect them, and prepare a printable bundle.", icon: FileImage, accent: "#DC2626" },
  { slug: "developer-encoder", label: "Developer", title: "Developer Encoder", description: "Encode URLs and Base64, create UUIDs, and calculate hashes.", icon: Code2, accent: "#0891B2" },
  { slug: "color-toolkit", label: "Design", title: "Color Toolkit", description: "Convert colors, build palettes, and check accessibility contrast.", icon: Palette, accent: "#DB2777" },
  { slug: "invoice-generator", label: "Business", title: "Invoice Generator", description: "Create a clean invoice and print or save it as PDF.", icon: ReceiptText, accent: "#EA580C" },
].map((tool) => ({ ...tool, href: tool.href ?? `/tools/${tool.slug}`, external: tool.external ?? false }));

export type ToolSlug = (typeof tools)[number]["slug"];
