"use client";

import { useRouter } from "next/navigation";
import { BookOpen, BriefcaseBusiness, GraduationCap, HeartHandshake, ShieldCheck, UsersRound, ArrowRight, CheckCircle2 } from "lucide-react";
import { Logo } from "@/components/logo";
import type { Role } from "@/lib/types";
import { roleBasePath } from "@/lib/permissions";

const roles: { role: Role; label: string; description: string; icon: typeof GraduationCap; accent: string }[] = [
  { role: "student", label: "Aluno", description: "Notas, atividades e rotina escolar", icon: GraduationCap, accent: "bg-blue-50 text-blue-700" },
  { role: "teacher", label: "Professor", description: "Turmas, chamadas e planejamento", icon: BookOpen, accent: "bg-emerald-50 text-emerald-700" },
  { role: "parent", label: "Responsável", description: "Acompanhamento próximo e simples", icon: HeartHandshake, accent: "bg-amber-50 text-amber-700" },
  { role: "coordinator", label: "Coordenação", description: "Gestão e acompanhamento pedagógico", icon: UsersRound, accent: "bg-violet-50 text-violet-700" },
  { role: "director", label: "Direção", description: "Visão estratégica de toda a escola", icon: BriefcaseBusiness, accent: "bg-rose-50 text-rose-700" },
];

export default function LoginPage() {
  const router = useRouter();
  const access = (role: Role) => {
    localStorage.setItem("nexo-demo-role", role);
    router.push(roleBasePath[role]);
  };

  return <main className="min-h-screen bg-white lg:grid lg:grid-cols-[minmax(360px,0.82fr)_1.18fr]">
    <section className="relative hidden min-h-screen overflow-hidden bg-[#17326b] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
      <div className="absolute inset-0 opacity-[.08] subtle-grid" />
      <div className="relative"><Logo inverse /></div>
      <div className="relative max-w-lg">
        <span className="inline-flex items-center gap-2 text-xs font-semibold text-blue-100"><span className="h-2 w-2 rounded-full bg-emerald-400" />Ambiente demonstrativo 2026</span>
        <h1 className="mt-6 text-4xl font-bold leading-[1.12] xl:text-5xl">Gestão escolar conectada.</h1>
        <p className="mt-5 max-w-md text-base leading-7 text-blue-100">Informação, acompanhamento e educação em um só lugar.</p>
        <div className="mt-10 grid gap-4 text-sm text-blue-50">
          {["Uma visão clara para cada perfil", "Dados acadêmicos organizados", "Comunicação que aproxima"].map((item) => <div key={item} className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4 text-emerald-300" />{item}</div>)}
        </div>
      </div>
      <p className="relative text-xs text-blue-200">Colégio Modelo Horizonte · São Paulo, SP</p>
    </section>
    <section className="flex min-h-screen items-center justify-center bg-[#f7f8fa] px-4 py-10 sm:px-8">
      <div className="w-full max-w-2xl">
        <div className="mb-8 flex justify-center lg:hidden"><Logo /></div>
        <div className="mb-7 text-center lg:text-left"><p className="text-xs font-bold uppercase text-blue-700">Acesso demonstrativo</p><h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">Como você quer acessar?</h2><p className="mt-2 text-sm text-slate-500">Escolha um perfil para conhecer sua experiência no Nexo.</p></div>
        <div className="grid gap-3 sm:grid-cols-2">
          {roles.map(({ role, label, description, icon: Icon, accent }, index) => <button key={role} onClick={() => access(role)} className={`group card soft-shadow flex min-h-28 items-center gap-4 p-4 text-left transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md ${index === 4 ? "sm:col-span-2" : ""}`}>
            <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg ${accent}`}><Icon className="h-5 w-5" /></div><div className="min-w-0 flex-1"><p className="text-sm font-bold text-slate-900">{label}</p><p className="mt-1 text-xs leading-5 text-slate-500">{description}</p></div><ArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-blue-700" />
          </button>)}
        </div>
        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-slate-500"><ShieldCheck className="h-3.5 w-3.5" />Seus dados reais não são necessários nesta demonstração.</div>
      </div>
    </section>
  </main>;
}
