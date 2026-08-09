import type { Metadata } from "next";

import QRCodeGenerator from "@/components/tools/qr-code/qr-generator";

export const metadata: Metadata = {
  title: "QR Code Generator | OpenCorex Tools",
  description:
    "Generate QR codes for websites, vCards, Wi-Fi, social media, PDFs, apps and more. Free, no sign-up, runs entirely in your browser.",
};

export default function QrCodeToolPage() {
  return <QRCodeGenerator />;
}
