"use client";

import { AlertTriangle, CheckCircle2, ChevronRight, Circle, Info, LoaderCircle, LucideIcon } from "lucide-react";
import clsx from "clsx";
import type { ReactNode } from "react";
import type { Tone } from "@/lib/types";

export function Avatar({ index, size = "md", className }: { index: number; size?: "sm" | "md" | "lg" | "xl"; className?: string }) {
  const sizes = { sm: "h-8 w-8", md: "h-10 w-10", lg: "h-14 w-14", xl: "h-20 w-20" };
  return <div role="img" aria-label="Foto do perfil" className={clsx("avatar-sheet shrink-0 rounded-full border-2 border-white bg-gray-100 shadow-sm", `avatar-${index}`, sizes[size], className)} />;
}

const toneStyles: Record<Tone, string> = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  warning: "border-amber-200 bg-amber-50 text-amber-800",
  danger: "border-red-200 bg-red-50 text-red-700",
  info: "border-blue-200 bg-blue-50 text-blue-700",
  neutral: "border-gray-200 bg-gray-50 text-gray-700",
};

export function StatusBadge({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  const Icon = tone === "success" ? CheckCircle2 : tone === "warning" || tone === "danger" ? AlertTriangle : tone === "info" ? Info : Circle;
  return <span className={clsx("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap", toneStyles[tone])}><Icon className="h-3 w-3" aria-hidden="true" />{children}</span>;
}

export function PageHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: ReactNode }) {
  return <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
    <div>{eyebrow && <p className="mb-1 text-xs font-bold uppercase text-blue-700">{eyebrow}</p>}<h1 className="text-2xl font-bold text-slate-900 md:text-[28px]">{title}</h1>{description && <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">{description}</p>}</div>{action}
  </div>;
}

export function SectionHeader({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return <div className="mb-4 flex items-start justify-between gap-3"><div><h2 className="text-[15px] font-bold text-slate-900">{title}</h2>{description && <p className="mt-1 text-xs text-slate-500">{description}</p>}</div>{action}</div>;
}

export function StatCard({ label, value, detail, icon: Icon, tone = "info", trend }: { label: string; value: string; detail: string; icon: LucideIcon; tone?: Tone; trend?: string }) {
  const accents: Record<Tone, string> = { success: "bg-emerald-50 text-emerald-700", warning: "bg-amber-50 text-amber-700", danger: "bg-red-50 text-red-700", info: "bg-blue-50 text-blue-700", neutral: "bg-slate-100 text-slate-700" };
  return <article className="card soft-shadow min-w-0 p-4 md:p-5"><div className="flex items-start justify-between"><div className={clsx("grid h-9 w-9 place-items-center rounded-md", accents[tone])}><Icon className="h-[18px] w-[18px]" aria-hidden="true" /></div>{trend && <span className="text-[11px] font-semibold text-emerald-700">{trend}</span>}</div><p className="mt-4 text-xs font-medium text-slate-500">{label}</p><p className="mt-1 text-2xl font-bold text-slate-900">{value}</p><p className="mt-1 text-[11px] text-slate-500">{detail}</p></article>;
}

export function Insight({ tone, icon: Icon, title, text }: { tone: Tone; icon: LucideIcon; title: string; text: string }) {
  return <div className={clsx("flex gap-3 rounded-lg border p-4", toneStyles[tone])}><div className="mt-0.5"><Icon className="h-4 w-4" /></div><div><p className="text-xs font-bold">{title}</p><p className="mt-1 text-xs leading-5 opacity-80">{text}</p></div></div>;
}

export function ProgressBar({ value, tone = "info", label }: { value: number; tone?: Tone; label?: string }) {
  const colors: Record<Tone, string> = { success: "bg-emerald-500", warning: "bg-amber-500", danger: "bg-red-500", info: "bg-blue-600", neutral: "bg-slate-500" };
  return <div>{label && <div className="mb-1.5 flex justify-between text-[11px] text-slate-500"><span>{label}</span><span>{value}%</span></div>}<div className="h-1.5 overflow-hidden rounded-full bg-slate-100"><div className={clsx("h-full rounded-full transition-all", colors[tone])} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} /></div></div>;
}

export function Button({ children, variant = "primary", icon: Icon, onClick, type = "button", disabled }: { children: ReactNode; variant?: "primary" | "secondary" | "ghost"; icon?: LucideIcon; onClick?: () => void; type?: "button" | "submit"; disabled?: boolean }) {
  return <button type={type} disabled={disabled} onClick={onClick} className={clsx("inline-flex h-9 items-center justify-center gap-2 rounded-md px-3.5 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-50", variant === "primary" && "bg-blue-700 text-white hover:bg-blue-800", variant === "secondary" && "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50", variant === "ghost" && "text-slate-600 hover:bg-slate-100")}>{Icon && <Icon className="h-4 w-4" />}{children}</button>;
}

export function EmptyState({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return <div className="grid min-h-52 place-items-center rounded-lg border border-dashed border-slate-300 p-8 text-center"><div><div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-slate-100"><Icon className="h-5 w-5 text-slate-500" /></div><h3 className="mt-3 text-sm font-bold">{title}</h3><p className="mt-1 text-xs text-slate-500">{text}</p></div></div>;
}

export function LoadingState() { return <div className="flex min-h-48 items-center justify-center gap-2 text-sm text-slate-500"><LoaderCircle className="h-4 w-4 animate-spin" /> Carregando informações...</div>; }

export function LinkRow({ icon: Icon, title, detail, onClick }: { icon: LucideIcon; title: string; detail: string; onClick?: () => void }) {
  return <button onClick={onClick} className="flex w-full items-center gap-3 border-b border-slate-100 px-1 py-3.5 text-left last:border-0 hover:bg-slate-50"><div className="grid h-8 w-8 place-items-center rounded-md bg-slate-100"><Icon className="h-4 w-4 text-slate-600" /></div><div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold text-slate-800">{title}</p><p className="mt-0.5 truncate text-[11px] text-slate-500">{detail}</p></div><ChevronRight className="h-4 w-4 text-slate-400" /></button>;
}
