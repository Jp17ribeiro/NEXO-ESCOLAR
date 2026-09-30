import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { Workspace } from "@/components/workspace";
import type { Role } from "@/lib/types";

const roleMap: Record<string, Role> = { aluno: "student", responsavel: "parent", professor: "teacher", coordenacao: "coordinator", direcao: "director" };

export default async function RolePage({ params }: { params: Promise<{ role: string; slug?: string[] }> }) {
  const { role: routeRole, slug = [] } = await params;
  const role = roleMap[routeRole];
  if (!role) notFound();
  return <AppShell role={role}><Workspace role={role} slug={slug} /></AppShell>;
}
