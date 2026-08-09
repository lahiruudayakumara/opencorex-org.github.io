import { notFound } from "next/navigation";
import ToolWorkbench from "@/components/tools/tool-workbench";
import { tools } from "@/lib/tools";

export function generateStaticParams() {
  return tools.filter(tool => !tool.external && tool.slug !== "qr-code").map(tool => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = tools.find(item => item.slug === slug && !item.external);
  return tool ? { title: `${tool.title} | OpenCorex Tools`, description: tool.description } : {};
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = tools.find(item => item.slug === slug && !item.external && item.slug !== "qr-code");
  if (!tool) notFound();
  return <ToolWorkbench slug={tool.slug} title={tool.title} description={tool.description}/>;
}
