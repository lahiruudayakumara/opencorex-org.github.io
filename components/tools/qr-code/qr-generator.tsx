"use client";

import {
  AlignLeft,
  ArrowLeft,
  Building2,
  Check,
  Copy,
  CreditCard,
  Download,
  Facebook,
  FileText,
  Globe,
  Image as ImageIcon,
  type LucideIcon,
  Palette,
  QrCode,
  RefreshCw,
  Share2,
  Smartphone,
  Square,
  Star,
  Trash2,
  Utensils,
  Video,
  Wifi,
} from "lucide-react";
import Link from "next/link";
import QRCode from "qrcode";
import { useEffect, useRef, useState } from "react";

/* ══════════════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════════════ */

type QRTypeId =
  | "url" | "vcard" | "pdf" | "images" | "social"
  | "video" | "text" | "business" | "facebook"
  | "wifi" | "app" | "menu";

type FrameType = "none" | "simple" | "rounded" | "scan-me" | "corners" | "badge";
type TabId = "content" | "style" | "frame";
type ECLevel = "L" | "M" | "Q" | "H";

type Theme = { id: string; name: string; dark: string; light: string };
type FrameDef = { id: FrameType; label: string };

/* ══════════════════════════════════════════════════════════
   CONSTANTS
══════════════════════════════════════════════════════════ */

const THEMES: Theme[] = [
  { id: "classic",  name: "Classic",  dark: "#000000", light: "#ffffff" },
  { id: "brand",    name: "Brand",    dark: "#8D153A", light: "#ffffff" },
  { id: "ocean",    name: "Ocean",    dark: "#0369a1", light: "#e0f2fe" },
  { id: "forest",   name: "Forest",   dark: "#15803d", light: "#dcfce7" },
  { id: "midnight", name: "Midnight", dark: "#f1f5f9", light: "#0f172a" },
  { id: "sunset",   name: "Sunset",   dark: "#c2410c", light: "#fff7ed" },
  { id: "purple",   name: "Purple",   dark: "#6d28d9", light: "#f5f3ff" },
  { id: "gold",     name: "Gold",     dark: "#b45309", light: "#fffbeb" },
];

const FRAMES: FrameDef[] = [
  { id: "none",    label: "No Frame" },
  { id: "simple",  label: "Square"   },
  { id: "rounded", label: "Rounded"  },
  { id: "scan-me", label: "Scan Me"  },
  { id: "corners", label: "Corners"  },
  { id: "badge",   label: "Badge"    },
];

type QRTypeDef = {
  id: QRTypeId;
  label: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  mostUsed?: boolean;
};

const QR_TYPES: QRTypeDef[] = [
  { id: "url",      label: "Website URL",   description: "Link to a website of your choice",         icon: Globe,     accent: "#8D153A", mostUsed: true },
  { id: "vcard",    label: "vCard",          description: "Share your electronic business card",       icon: CreditCard,accent: "#205493" },
  { id: "pdf",      label: "PDF",            description: "Show a PDF",                                icon: FileText,  accent: "#A95B2A" },
  { id: "images",   label: "Images",         description: "Display an image gallery",                  icon: ImageIcon, accent: "#0F766E" },
  { id: "social",   label: "Social Media",   description: "Share your social media channels",          icon: Share2,    accent: "#7C3AED" },
  { id: "video",    label: "Video",          description: "Share one or multiple videos",               icon: Video,     accent: "#D97706" },
  { id: "text",     label: "Simple Text",    description: "Display a body of text",                    icon: AlignLeft, accent: "#64748B" },
  { id: "business", label: "Business Page",  description: "Share your business information",           icon: Building2, accent: "#B45309" },
  { id: "facebook", label: "Facebook",       description: "Share your Facebook page",                  icon: Facebook,  accent: "#1877F2" },
  { id: "wifi",     label: "Wi-Fi",          description: "Connect to a wireless network",             icon: Wifi,      accent: "#06B6D4" },
  { id: "app",      label: "App",            description: "Link to the iOS App Store / Google Play",  icon: Smartphone,accent: "#10B981" },
  { id: "menu",     label: "Menu",           description: "Create a digital restaurant menu",          icon: Utensils,  accent: "#F59E0B" },
];

/* ══════════════════════════════════════════════════════════
   FORM STATE
══════════════════════════════════════════════════════════ */

type FormValues = {
  url: string;
  vcard_firstName: string; vcard_lastName: string;
  vcard_phone: string; vcard_email: string;
  vcard_org: string; vcard_website: string;
  pdf_url: string;
  images_url: string;
  social_platform: string; social_url: string;
  video_url: string;
  text_content: string;
  business_name: string; business_phone: string;
  business_email: string; business_address: string;
  business_website: string;
  facebook_url: string;
  wifi_ssid: string; wifi_password: string;
  wifi_type: "WPA" | "WEP" | "nopass"; wifi_hidden: boolean;
  app_ios: string; app_android: string;
  menu_url: string;
};

const DEFAULTS: FormValues = {
  url: "",
  vcard_firstName: "", vcard_lastName: "",
  vcard_phone: "", vcard_email: "",
  vcard_org: "", vcard_website: "",
  pdf_url: "",
  images_url: "",
  social_platform: "instagram", social_url: "",
  video_url: "",
  text_content: "",
  business_name: "", business_phone: "",
  business_email: "", business_address: "",
  business_website: "",
  facebook_url: "",
  wifi_ssid: "", wifi_password: "",
  wifi_type: "WPA", wifi_hidden: false,
  app_ios: "", app_android: "",
  menu_url: "",
};

/* ══════════════════════════════════════════════════════════
   QR DATA BUILDERS
══════════════════════════════════════════════════════════ */

function buildQRData(type: QRTypeId, v: FormValues): string {
  const esc = (s: string) => s.replace(/[\\;,:"]/g, (c) => `\\${c}`);
  switch (type) {
    case "url":      return v.url.trim() || "https://opencorex.org";
    case "vcard":    return ["BEGIN:VCARD","VERSION:3.0",
      `FN:${v.vcard_firstName} ${v.vcard_lastName}`.trim(),
      v.vcard_phone && `TEL:${v.vcard_phone}`,
      v.vcard_email && `EMAIL:${v.vcard_email}`,
      v.vcard_org && `ORG:${v.vcard_org}`,
      v.vcard_website && `URL:${v.vcard_website}`,
      "END:VCARD"].filter(Boolean).join("\n");
    case "pdf":      return v.pdf_url.trim() || "https://example.com/document.pdf";
    case "images":   return v.images_url.trim() || "https://example.com/gallery";
    case "social":   return v.social_url.trim() || "https://instagram.com/";
    case "video":    return v.video_url.trim() || "https://youtube.com/";
    case "text":     return v.text_content.trim() || "Hello from OpenCorex!";
    case "business": return ["BEGIN:VCARD","VERSION:3.0",
      v.business_name && `FN:${v.business_name}`,
      v.business_phone && `TEL:${v.business_phone}`,
      v.business_email && `EMAIL:${v.business_email}`,
      v.business_address && `ADR:;;${v.business_address};;;;`,
      v.business_website && `URL:${v.business_website}`,
      "END:VCARD"].filter(Boolean).join("\n");
    case "facebook": return v.facebook_url.trim() || "https://facebook.com/";
    case "wifi":     return `WIFI:T:${v.wifi_type};S:${esc(v.wifi_ssid)};P:${esc(v.wifi_password)};H:${v.wifi_hidden};`;
    case "app":      return (v.app_ios && v.app_android)
      ? `${v.app_ios.trim()}\n${v.app_android.trim()}`
      : v.app_ios.trim() || v.app_android.trim() || "https://apps.apple.com/";
    case "menu":     return v.menu_url.trim() || "https://example.com/menu";
  }
}

/* ══════════════════════════════════════════════════════════
   CANVAS UTILITIES
══════════════════════════════════════════════════════════ */

/** Cross-browser rounded rect path (fallback using quadraticCurveTo) */
function rr(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number,
  radii: number | [number, number, number, number]
) {
  const [tl, tr, br, bl] =
    typeof radii === "number"
      ? [radii, radii, radii, radii]
      : radii;
  ctx.beginPath();
  ctx.moveTo(x + tl, y);
  ctx.lineTo(x + w - tr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + tr);
  ctx.lineTo(x + w, y + h - br);
  ctx.quadraticCurveTo(x + w, y + h, x + w - br, y + h);
  ctx.lineTo(x + bl, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - bl);
  ctx.lineTo(x, y + tl);
  ctx.quadraticCurveTo(x, y, x + tl, y);
  ctx.closePath();
}

async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function renderQR(config: {
  data: string;
  theme: Theme;
  size: number;
  ec: ECLevel;
  frame: FrameType;
  frameLabel: string;
  frameSubLabel: string;
  logo: string | null;
  logoSize: number;
}): Promise<string> {
  const { data, theme, size, ec, frame, frameLabel, frameSubLabel, logo, logoSize } = config;

  /* 1 – QR onto temp canvas — always H when logo is present */
  const actualEc: ECLevel = logo ? "H" : ec;
  const qrCanvas = document.createElement("canvas");
  await QRCode.toCanvas(qrCanvas, data, {
    width: size,
    margin: 2,
    errorCorrectionLevel: actualEc,
    color: { dark: theme.dark, light: theme.light },
  });

  /* 2 – Layout math */
  const pad = frame === "none" ? 14 : 28;
  const topExtra  = frame === "badge" ? 56 : 0;
  const botExtra  = (frame === "scan-me") ? 46 : frame === "badge" ? 56 : 0;
  const cW = size + pad * 2;
  const cH = size + pad * 2 + topExtra + botExtra;

  /* 3 – Output canvas (2× retina) */
  const sc = 2;
  const out = document.createElement("canvas");
  out.width  = cW * sc;
  out.height = cH * sc;
  const ctx = out.getContext("2d")!;
  ctx.scale(sc, sc);

  /* 4 – Background */
  ctx.fillStyle = theme.light;
  if (frame === "rounded" || frame === "scan-me") {
    rr(ctx, 0, 0, cW, cH, 24);
    ctx.fill();
  } else if (frame === "badge") {
    rr(ctx, 0, 0, cW, cH, 24);
    ctx.fill();
  } else {
    ctx.fillRect(0, 0, cW, cH);
  }

  /* 5 – Frame decorations */
  const m = 6;
  ctx.strokeStyle = theme.dark;

  if (frame === "simple") {
    ctx.lineWidth = 3;
    ctx.strokeRect(m, m, cW - m * 2, cH - m * 2);

  } else if (frame === "rounded") {
    ctx.lineWidth = 3;
    rr(ctx, m, m, cW - m * 2, cH - m * 2, 20);
    ctx.stroke();

  } else if (frame === "corners") {
    const cs = 20; const lm = 8;
    ctx.lineWidth = 4; ctx.lineCap = "square";
    const drawL = (ax: number, ay: number, bx: number, by: number, cx: number, cy: number) => {
      ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.lineTo(cx, cy); ctx.stroke();
    };
    drawL(lm, lm + cs, lm, lm, lm + cs, lm);
    drawL(cW - lm - cs, lm, cW - lm, lm, cW - lm, lm + cs);
    drawL(lm, cH - lm - cs, lm, cH - lm, lm + cs, cH - lm);
    drawL(cW - lm - cs, cH - lm, cW - lm, cH - lm, cW - lm, cH - lm - cs);

  } else if (frame === "scan-me") {
    ctx.lineWidth = 3;
    rr(ctx, m, m, cW - m * 2, cH - m * 2, 20);
    ctx.stroke();
    ctx.fillStyle = theme.dark;
    ctx.font = "bold 14px 'Ubuntu', 'Segoe UI', Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText((frameLabel || "SCAN ME").toUpperCase(), cW / 2, cH - botExtra / 2 + 1);

  } else if (frame === "badge") {
    // top bar
    ctx.fillStyle = theme.dark;
    rr(ctx, 0, 0, cW, topExtra, [24, 24, 0, 0]);
    ctx.fill();
    ctx.fillStyle = theme.light;
    ctx.font = "bold 16px 'Ubuntu', 'Segoe UI', Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText((frameLabel || "SCAN ME").toUpperCase(), cW / 2, topExtra / 2);
    // bottom bar
    ctx.fillStyle = theme.dark;
    rr(ctx, 0, cH - botExtra, cW, botExtra, [0, 0, 24, 24]);
    ctx.fill();
    if (frameSubLabel) {
      ctx.fillStyle = theme.light;
      ctx.font = "13px 'Ubuntu', 'Segoe UI', Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(frameSubLabel, cW / 2, cH - botExtra / 2);
    }
  }

  /* 6 – Draw QR */
  const qrX = pad;
  const qrY = pad + topExtra;
  ctx.drawImage(qrCanvas, qrX, qrY, size, size);

  /* 7 – Logo overlay (damage-free: clear → fill → clip → draw) */
  if (logo) {
    const lsz = Math.round(size * (logoSize / 100));
    // Center within the actual QR data area (accounting for quiet-zone margin)
    const lx = qrX + (size - lsz) / 2;
    const ly = qrY + (size - lsz) / 2;
    const lpad = 6;

    // Step 1: Completely erase the pixel data under the logo (no bleed-through)
    ctx.clearRect(lx - lpad, ly - lpad, lsz + lpad * 2, lsz + lpad * 2);

    // Step 2: Fill with the QR's own light color so it matches perfectly
    ctx.fillStyle = theme.light;
    rr(ctx, lx - lpad, ly - lpad, lsz + lpad * 2, lsz + lpad * 2, 10);
    ctx.fill();

    // Step 3: Thin ring outline so the logo area reads as intentional
    ctx.strokeStyle = theme.dark + "33"; // 20% opacity
    ctx.lineWidth = 1;
    rr(ctx, lx - lpad, ly - lpad, lsz + lpad * 2, lsz + lpad * 2, 10);
    ctx.stroke();

    // Step 4: Draw logo image clipped to rounded square
    try {
      const img = await loadImage(logo);
      ctx.save();
      rr(ctx, lx, ly, lsz, lsz, 6);
      ctx.clip();
      // Ensure opaque white base behind any transparent logo pixels
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(lx, ly, lsz, lsz);
      ctx.drawImage(img, lx, ly, lsz, lsz);
      ctx.restore();
    } catch { /* ignore load errors */ }
  }

  return out.toDataURL("image/png");
}

/* ══════════════════════════════════════════════════════════
   FORM FIELD HELPERS
══════════════════════════════════════════════════════════ */

const inputCls =
  "w-full rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.05)] px-4 py-3 text-sm text-[var(--foreground)] placeholder-[var(--muted)] outline-none transition focus:border-[var(--brand)] focus:ring-2 focus:ring-[rgba(141,21,58,0.22)]";

const selectCls =
  "w-full rounded-xl border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--brand)] focus:ring-2 focus:ring-[rgba(141,21,58,0.22)]";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.68rem] font-bold uppercase tracking-widest text-[var(--muted)]">{label}</label>
      {children}
    </div>
  );
}

function FormFields({
  type, values, onChange,
}: {
  type: QRTypeId;
  values: FormValues;
  onChange: (k: keyof FormValues, v: string | boolean) => void;
}) {
  const inp = (key: keyof FormValues, ph = "", label = "", type2 = "text") => (
    <Field label={label || String(key)}>
      <input className={inputCls} type={type2} placeholder={ph}
        value={values[key] as string} onChange={(e) => onChange(key, e.target.value)} />
    </Field>
  );

  switch (type) {
    case "url": return (
      <div className="space-y-4">
        <p className="text-sm text-[var(--muted)]">Paste any website address to encode it into a QR code.</p>
        {inp("url", "https://example.com", "Website URL", "url")}
      </div>
    );
    case "vcard": return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {inp("vcard_firstName", "John", "First name")}
          {inp("vcard_lastName", "Doe", "Last name")}
        </div>
        {inp("vcard_phone", "+1 555 000 0000", "Phone")}
        {inp("vcard_email", "john@example.com", "Email", "email")}
        {inp("vcard_org", "Acme Corp", "Organisation")}
        {inp("vcard_website", "https://example.com", "Website", "url")}
      </div>
    );
    case "pdf":      return <div className="space-y-4">{inp("pdf_url", "https://example.com/doc.pdf", "PDF URL", "url")}</div>;
    case "images":   return <div className="space-y-4">{inp("images_url", "https://example.com/gallery", "Gallery URL", "url")}</div>;
    case "social": return (
      <div className="space-y-4">
        <Field label="Platform">
          <select className={selectCls} value={values.social_platform}
            onChange={(e) => onChange("social_platform", e.target.value)}>
            {["Instagram","Twitter / X","LinkedIn","TikTok","YouTube","Pinterest","Snapchat","Reddit"]
              .map((p) => <option key={p} value={p.toLowerCase()}>{p}</option>)}
          </select>
        </Field>
        {inp("social_url", "https://instagram.com/yourhandle", "Profile URL", "url")}
      </div>
    );
    case "video":    return <div className="space-y-4">{inp("video_url", "https://youtube.com/watch?v=...", "Video URL", "url")}</div>;
    case "text": return (
      <div className="space-y-4">
        <Field label="Text content">
          <textarea className={`${inputCls} min-h-[120px] resize-y`} placeholder="Type anything here…"
            value={values.text_content} onChange={(e) => onChange("text_content", e.target.value)} />
        </Field>
      </div>
    );
    case "business": return (
      <div className="space-y-4">
        {inp("business_name", "Acme Restaurant", "Business name")}
        {inp("business_phone", "+1 555 000 0000", "Phone")}
        {inp("business_email", "info@business.com", "Email", "email")}
        {inp("business_address", "123 Main St, City", "Address")}
        {inp("business_website", "https://mybusiness.com", "Website", "url")}
      </div>
    );
    case "facebook": return <div className="space-y-4">{inp("facebook_url", "https://facebook.com/yourpage", "Facebook page URL", "url")}</div>;
    case "wifi": return (
      <div className="space-y-4">
        {inp("wifi_ssid", "MyNetwork", "Network name (SSID)")}
        {inp("wifi_password", "••••••••", "Password")}
        <Field label="Security">
          <select className={selectCls} value={values.wifi_type}
            onChange={(e) => onChange("wifi_type", e.target.value as "WPA" | "WEP" | "nopass")}>
            <option value="WPA">WPA / WPA2</option>
            <option value="WEP">WEP</option>
            <option value="nopass">None (open)</option>
          </select>
        </Field>
        <label className="flex cursor-pointer items-center gap-3 text-sm text-[var(--muted)]">
          <div className={`relative h-5 w-9 rounded-full transition ${values.wifi_hidden ? "bg-[var(--brand)]" : "bg-[var(--line-strong)]"}`}
            onClick={() => onChange("wifi_hidden", !values.wifi_hidden)}>
            <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${values.wifi_hidden ? "translate-x-4" : "translate-x-0.5"}`} />
          </div>
          Hidden network
        </label>
      </div>
    );
    case "app": return (
      <div className="space-y-4">
        <p className="text-sm text-[var(--muted)]">Fill one or both — both URLs will be encoded.</p>
        {inp("app_ios", "https://apps.apple.com/...", "iOS App Store URL", "url")}
        {inp("app_android", "https://play.google.com/...", "Google Play URL", "url")}
      </div>
    );
    case "menu": return <div className="space-y-4">{inp("menu_url", "https://myrestaurant.com/menu", "Menu URL", "url")}</div>;
  }
}

/* ══════════════════════════════════════════════════════════
   FRAME PREVIEW SVG (mini icon for each frame type)
══════════════════════════════════════════════════════════ */

function FrameIcon({ type, color }: { type: FrameType; color: string }) {
  const s = 36;
  const c = color;
  switch (type) {
    case "none":
      return <svg width={s} height={s}><rect x={6} y={6} width={24} height={24} fill={c} opacity={0.2} rx={2} /><rect x={10} y={10} width={16} height={16} fill={c} opacity={0.5} rx={1} /></svg>;
    case "simple":
      return <svg width={s} height={s}><rect x={3} y={3} width={30} height={30} fill="none" stroke={c} strokeWidth={2.5} /><rect x={9} y={9} width={18} height={18} fill={c} opacity={0.3} /></svg>;
    case "rounded":
      return <svg width={s} height={s}><rect x={3} y={3} width={30} height={30} rx={8} fill="none" stroke={c} strokeWidth={2.5} /><rect x={9} y={9} width={18} height={18} fill={c} opacity={0.3} rx={3} /></svg>;
    case "scan-me":
      return <svg width={s} height={s}><rect x={3} y={3} width={30} height={24} rx={6} fill="none" stroke={c} strokeWidth={2} /><rect x={8} y={8} width={20} height={14} fill={c} opacity={0.25} /><text x={18} y={33} textAnchor="middle" fontSize="5.5" fontWeight="bold" fill={c}>SCAN</text></svg>;
    case "corners":
      return <svg width={s} height={s}><path d="M3 11 L3 3 L11 3" fill="none" stroke={c} strokeWidth={2.5} strokeLinecap="square" /><path d="M25 3 L33 3 L33 11" fill="none" stroke={c} strokeWidth={2.5} strokeLinecap="square" /><path d="M3 25 L3 33 L11 33" fill="none" stroke={c} strokeWidth={2.5} strokeLinecap="square" /><path d="M25 33 L33 33 L33 25" fill="none" stroke={c} strokeWidth={2.5} strokeLinecap="square" /><rect x={9} y={9} width={18} height={18} fill={c} opacity={0.25} /></svg>;
    case "badge":
      return <svg width={s} height={s}><rect x={3} y={3} width={30} height={10} rx={4} fill={c} /><rect x={3} y={23} width={30} height={10} rx={4} fill={c} /><rect x={6} y={14} width={24} height={9} fill={c} opacity={0.25} /></svg>;
  }
}

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════ */

export default function QRCodeGenerator() {
  /* ── QR content ── */
  const [activeType, setActiveType] = useState<QRTypeId>("url");
  const [values, setValues]         = useState<FormValues>(DEFAULTS);

  /* ── Style ── */
  const [themeId, setThemeId]         = useState("classic");
  const [qrSize, setQrSize]           = useState(280);
  const [ec, setEc]                   = useState<ECLevel>("M");

  /* ── Frame ── */
  const [frame, setFrame]               = useState<FrameType>("none");
  const [frameLabel, setFrameLabel]     = useState("SCAN ME");
  const [frameSubLabel, setFrameSubLabel] = useState("");

  /* ── Logo ── */
  const [logo, setLogo]         = useState<string | null>(null);
  const [logoSize, setLogoSize] = useState(22);
  const logoInputRef            = useRef<HTMLInputElement>(null);

  /* ── Output ── */
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied]     = useState(false);
  const [copiedImg, setCopiedImg] = useState(false);

  /* ── UI ── */
  const [activeTab, setActiveTab] = useState<TabId>("content");

  const theme = THEMES.find((t) => t.id === themeId)!;
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Generate QR (debounced) ── */
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setGenerating(true);
      try {
        const data = buildQRData(activeType, values);
        const url = await renderQR({ data, theme, size: qrSize, ec, frame, frameLabel, frameSubLabel, logo, logoSize });
        setQrDataUrl(url);
      } catch { /* ignore */ }
      finally { setGenerating(false); }
    }, 320);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeType, values, themeId, qrSize, ec, frame, frameLabel, frameSubLabel, logo, logoSize]);

  const handleChange = (k: keyof FormValues, v: string | boolean) =>
    setValues((p) => ({ ...p, [k]: v }));

  /* ── Logo upload ── */
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setLogo(ev.target?.result as string);
      // high EC to keep QR readable under logo
      if (ec === "L" || ec === "M") setEc("H");
    };
    reader.readAsDataURL(file);
  };

  /* ── Download ── */
  const handleDownload = () => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = `opencorex-qr-${activeType}.png`;
    a.click();
  };

  /* ── Copy data string ── */
  const handleCopyData = async () => {
    await navigator.clipboard.writeText(buildQRData(activeType, values));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* ── Copy image ── */
  const handleCopyImage = async () => {
    if (!qrDataUrl) return;
    try {
      const res = await fetch(qrDataUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      setCopiedImg(true);
      setTimeout(() => setCopiedImg(false), 2000);
    } catch { /* browser may not support */ }
  };

  const activeTypeDef = QR_TYPES.find((t) => t.id === activeType)!;

  /* ════════════════ RENDER ════════════════ */
  return (
    <div className="space-y-6 pb-12">

      {/* Header */}
      <div>
        <Link href="/tools" className="mb-4 inline-flex items-center gap-2 text-sm text-[var(--muted)] transition hover:text-[var(--foreground)]">
          <ArrowLeft className="h-4 w-4" /> Back to Tools
        </Link>
        <div className="mt-2 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[rgba(141,21,58,0.3)] bg-[var(--brand-soft)]">
            <QrCode className="h-5 w-5 text-[var(--brand)]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">QR Code Generator</h1>
            <p className="text-sm text-[var(--muted)]">Create your QR code in seconds — free, no sign-up required.</p>
          </div>
        </div>
      </div>

      {/* Main 3-panel layout */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">

        {/* ── Type Sidebar ── */}
        <div className="panel-strong rounded-[1.75rem] p-3 lg:w-60 lg:flex-shrink-0">
          <p className="mb-2 px-2 text-[0.63rem] font-bold uppercase tracking-widest text-[var(--muted)]">QR Type</p>
          <nav className="flex flex-col gap-0.5">
            {QR_TYPES.map((t) => {
              const Icon = t.icon;
              const active = activeType === t.id;
              return (
                <button key={t.id} onClick={() => setActiveType(t.id)}
                  className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all ${
                    active ? "bg-[var(--brand-soft)] text-[var(--foreground)]" : "text-[var(--muted)] hover:bg-[rgba(255,255,255,0.05)] hover:text-[var(--foreground)]"
                  }`}>
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg transition"
                    style={{ background: active ? `${t.accent}28` : "transparent", border: active ? `1px solid ${t.accent}44` : "1px solid transparent" }}>
                    <Icon className="h-3.5 w-3.5" style={{ color: active ? t.accent : "currentColor" }} />
                  </div>
                  <div className="flex min-w-0 flex-1 items-center gap-1.5">
                    <span className="truncate text-sm font-medium">{t.label}</span>
                    {t.mostUsed && (
                      <span className="inline-flex items-center gap-0.5 rounded-full bg-[rgba(141,21,58,0.2)] px-1.5 py-0.5 text-[0.58rem] font-bold uppercase tracking-wide text-[var(--brand)]">
                        <Star className="h-2.5 w-2.5" />Hot
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* ── Tabs Panel ── */}
        <div className="panel-strong flex-1 overflow-hidden rounded-[1.75rem]">
          {/* Tab bar */}
          <div className="flex border-b border-[var(--line)]">
            {(["content", "style", "frame"] as TabId[]).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 py-3.5 text-sm font-semibold capitalize transition ${
                  activeTab === tab
                    ? "border-b-2 border-[var(--brand)] text-[var(--foreground)]"
                    : "border-b-2 border-transparent text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}>
                {tab === "content" ? "Content" : tab === "style" ? "Style & Size" : "Frame"}
              </button>
            ))}
          </div>

          {/* Tab body */}
          <div className="p-6">

            {/* ── Content tab ── */}
            {activeTab === "content" && (
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{ background: `${activeTypeDef.accent}22`, border: `1px solid ${activeTypeDef.accent}44` }}>
                    {(() => { const I = activeTypeDef.icon; return <I className="h-4 w-4" style={{ color: activeTypeDef.accent }} />; })()}
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--foreground)]">{activeTypeDef.label}</p>
                    <p className="text-xs text-[var(--muted)]">{activeTypeDef.description}</p>
                  </div>
                </div>
                <FormFields type={activeType} values={values} onChange={handleChange} />
              </div>
            )}

            {/* ── Style tab ── */}
            {activeTab === "style" && (
              <div className="space-y-7">
                {/* Color themes */}
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <Palette className="h-4 w-4 text-[var(--brand)]" />
                    <span className="text-sm font-semibold text-[var(--foreground)]">Color Theme</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2.5">
                    {THEMES.map((t) => (
                      <button key={t.id} onClick={() => setThemeId(t.id)}
                        className={`group relative flex flex-col items-center gap-2 rounded-xl border p-3 transition ${
                          themeId === t.id ? "border-[var(--brand)] bg-[var(--brand-soft)]" : "border-[var(--line)] hover:border-[var(--line-strong)]"
                        }`}>
                        {/* swatch */}
                        <div className="flex h-9 w-full overflow-hidden rounded-lg border border-[rgba(255,255,255,0.1)]">
                          <div className="flex-1" style={{ background: t.light }} />
                          <div className="w-1/3" style={{ background: t.dark }} />
                        </div>
                        <span className="text-[0.65rem] font-medium text-[var(--muted)]">{t.name}</span>
                        {themeId === t.id && (
                          <div className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--brand)]">
                            <Check className="h-2.5 w-2.5 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-semibold text-[var(--foreground)]">QR Size</span>
                    <span className="rounded-lg bg-[rgba(255,255,255,0.07)] px-2.5 py-1 text-xs font-mono text-[var(--muted)]">{qrSize}px</span>
                  </div>
                  <input type="range" min={200} max={420} step={20} value={qrSize}
                    onChange={(e) => setQrSize(Number(e.target.value))}
                    className="w-full accent-[var(--brand)]" />
                  <div className="mt-1 flex justify-between text-[0.65rem] text-[var(--muted)]">
                    <span>Small</span><span>Medium</span><span>Large</span>
                  </div>
                </div>

                {/* Error correction */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-semibold text-[var(--foreground)]">Error Correction</span>
                    {logo
                      ? <span className="inline-flex items-center gap-1 rounded-full bg-green-500/15 px-2 py-0.5 text-[0.65rem] font-bold text-green-400">🔒 Locked to H — logo safe</span>
                      : null
                    }
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {(["L","M","Q","H"] as ECLevel[]).map((level) => {
                      const desc = { L: "7%", M: "15%", Q: "25%", H: "30%" };
                      const lockedByLogo = !!logo;
                      const isActive = logo ? level === "H" : ec === level;
                      return (
                        <button key={level}
                          onClick={() => !lockedByLogo && setEc(level)}
                          disabled={lockedByLogo && level !== "H"}
                          className={`flex flex-col items-center gap-1 rounded-xl border p-3 transition ${
                            isActive
                              ? "border-[var(--brand)] bg-[var(--brand-soft)] text-[var(--foreground)]"
                              : lockedByLogo
                                ? "cursor-not-allowed border-[var(--line)] text-[var(--muted)] opacity-30"
                                : "border-[var(--line)] text-[var(--muted)] hover:border-[var(--line-strong)]"
                          }`}>
                          <span className="text-base font-bold">{level}</span>
                          <span className="text-[0.6rem]">{desc[level]}</span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-2 text-[0.68rem] text-[var(--muted)]">
                    {logo
                      ? "H error correction is required with a logo — the QR can recover up to 30% module loss."
                      : "Higher = better damage recovery. Use H when adding a logo."
                    }
                  </p>
                </div>
              </div>
            )}

            {/* ── Frame tab ── */}
            {activeTab === "frame" && (
              <div className="space-y-6">
                <div>
                  <p className="mb-3 text-sm font-semibold text-[var(--foreground)]">Frame Style</p>
                  <div className="grid grid-cols-3 gap-3">
                    {FRAMES.map((f) => (
                      <button key={f.id} onClick={() => setFrame(f.id)}
                        className={`flex flex-col items-center gap-2 rounded-xl border p-3.5 transition ${
                          frame === f.id ? "border-[var(--brand)] bg-[var(--brand-soft)]" : "border-[var(--line)] hover:border-[var(--line-strong)]"
                        }`}>
                        <FrameIcon type={f.id} color={frame === f.id ? "#8D153A" : "#888"} />
                        <span className={`text-xs font-medium ${frame === f.id ? "text-[var(--foreground)]" : "text-[var(--muted)]"}`}>{f.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {frame !== "none" && (
                  <Field label={frame === "badge" ? "Top label" : "Frame label"}>
                    <input className={inputCls} placeholder="SCAN ME" value={frameLabel}
                      onChange={(e) => setFrameLabel(e.target.value)} />
                  </Field>
                )}

                {frame === "badge" && (
                  <Field label="Bottom sub-label">
                    <input className={inputCls} placeholder="website.com" value={frameSubLabel}
                      onChange={(e) => setFrameSubLabel(e.target.value)} />
                  </Field>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Preview Panel ── */}
        <div className="panel-strong flex w-full flex-col gap-5 rounded-[1.75rem] p-5 md:w-64 md:flex-shrink-0">
          <p className="text-[0.63rem] font-bold uppercase tracking-widest text-[var(--muted)]">Preview</p>

          {/* QR image */}
          <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-white shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            {generating && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                <RefreshCw className="h-6 w-6 animate-spin text-gray-400" />
              </div>
            )}
            {qrDataUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={qrDataUrl} alt="Generated QR code" className="h-full w-full object-contain" />
            )}
          </div>
          {logo ? (
            <div className="flex items-center justify-center gap-1.5 rounded-full bg-green-500/12 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              <span className="text-[0.65rem] font-semibold text-green-400">Scan safe · H error correction</span>
            </div>
          ) : (
            <p className="text-center text-[0.65rem] text-[var(--muted)]">Point your camera to scan</p>
          )}

          {/* ── Logo section ── */}
          <div className="rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.03)] p-4">
            <p className="mb-3 text-[0.68rem] font-bold uppercase tracking-widest text-[var(--muted)]">Center Logo</p>

            {logo ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logo} alt="Logo preview" className="h-10 w-10 rounded-lg object-cover border border-[var(--line)]" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-[var(--foreground)]">Logo uploaded</p>
                    <p className="text-[0.65rem] text-[var(--muted)]">Use H error correction</p>
                  </div>
                  <button onClick={() => { setLogo(null); if (logoInputRef.current) logoInputRef.current.value = ""; }}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--line)] text-[var(--muted)] transition hover:border-red-500/50 hover:text-red-400">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-[0.65rem] text-[var(--muted)]">Logo size</span>
                    <span className="text-[0.65rem] font-mono text-[var(--muted)]">{logoSize}%</span>
                  </div>
                  <input type="range" min={12} max={30} step={1} value={logoSize}
                    onChange={(e) => setLogoSize(Number(e.target.value))}
                    className="w-full accent-[var(--brand)]" />
                </div>
              </div>
            ) : (
              <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed border-[var(--line)] p-4 text-center transition hover:border-[var(--brand)] hover:bg-[var(--brand-soft)]">
                <ImageIcon className="h-5 w-5 text-[var(--muted)]" />
                <span className="text-xs text-[var(--muted)]">Click to upload logo</span>
                <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
              </label>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <button onClick={handleDownload} disabled={!qrDataUrl}
              className="button-primary flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-40">
              <Download className="h-4 w-4" /> Download PNG
            </button>
            <button onClick={handleCopyImage} disabled={!qrDataUrl}
              className="button-secondary flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm disabled:opacity-40">
              {copiedImg ? <><Check className="h-4 w-4 text-green-400" /><span className="text-green-400">Image copied!</span></> : <><Square className="h-4 w-4" />Copy image</>}
            </button>
            <button onClick={handleCopyData}
              className="button-ghost flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm">
              {copied ? <><Check className="h-4 w-4 text-green-400" /><span className="text-green-400">Copied!</span></> : <><Copy className="h-4 w-4" />Copy data</>}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
