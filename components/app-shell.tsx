"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Bell, CalendarRange, Check, ChevronDown, ChevronsLeft, ChevronsRight, LogOut, Menu, Search, Settings, X } from "lucide-react";
import clsx from "clsx";
import { Logo } from "./logo";
import { Avatar, StatusBadge } from "./ui";
import { getIcon } from "./icon-map";
import { navigation } from "@/lib/navigation";
import { notifications, profiles, students } from "@/lib/mock-data";
import { roleLabels } from "@/lib/permissions";
import type { Role } from "@/lib/types";

export function AppShell({ role, children }: { role: Role; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [read, setRead] = useState<number[]>([]);
  const profile = profiles[role];
  const items = navigation[role];

  useEffect(() => { setMobileOpen(false); }, [pathname]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setSearchOpen(true); }
      if (event.key === "Escape") { setSearchOpen(false); setNotificationsOpen(false); setMobileOpen(false); }
    };
    window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey);
  }, []);

  const logout = () => { localStorage.removeItem("nexo-demo-role"); router.push("/login"); };

  return <div className="min-h-screen bg-[#f6f7f9]">
    <aside className={clsx("fixed inset-y-0 left-0 z-40 hidden border-r border-slate-200 bg-white transition-[width] duration-200 lg:flex lg:flex-col", collapsed ? "w-[76px]" : "w-[248px]")}>
      <div className={clsx("flex h-[68px] items-center border-b border-slate-100", collapsed ? "justify-center" : "px-5")}><Logo compact={collapsed} /></div>
      <div className={clsx("border-b border-slate-100 py-4", collapsed ? "px-3" : "px-4")}>
        <div className={clsx("flex items-center", collapsed ? "justify-center" : "gap-3")}><Avatar index={profile.avatar} />{!collapsed && <div className="min-w-0"><p className="truncate text-xs font-bold text-slate-900">{profile.name}</p><p className="mt-0.5 truncate text-[10px] text-slate-500">{roleLabels[role]}</p></div>}</div>
      </div>
      <nav className="mobile-scroll flex-1 overflow-y-auto px-3 py-4" aria-label="Menu principal">
        {!collapsed && <p className="mb-2 px-2 text-[9px] font-bold uppercase tracking-[.12em] text-slate-400">Navegação</p>}
        <div className="space-y-1">{items.map((item) => { const Icon = getIcon(item.icon); const active = item.href === pathname || (item.href !== `/${pathname.split("/")[1]}` && pathname.startsWith(`${item.href}/`)); return <Link title={collapsed ? item.label : undefined} key={item.href} href={item.href} className={clsx("flex h-10 items-center rounded-md text-xs font-medium transition", collapsed ? "justify-center" : "gap-3 px-2.5", active ? "bg-blue-50 text-blue-800" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900")}><Icon className="h-[17px] w-[17px] shrink-0" />{!collapsed && <span>{item.label}</span>}</Link>; })}</div>
      </nav>
      <button onClick={() => setCollapsed((v) => !v)} className="flex h-12 items-center justify-center border-t border-slate-100 text-slate-400 hover:bg-slate-50 hover:text-slate-700" aria-label={collapsed ? "Expandir menu" : "Recolher menu"}>{collapsed ? <ChevronsRight className="h-4 w-4" /> : <><ChevronsLeft className="mr-2 h-4 w-4" /><span className="text-[11px] font-medium">Recolher menu</span></>}</button>
    </aside>

    {mobileOpen && <div className="fixed inset-0 z-50 lg:hidden"><button aria-label="Fechar menu" className="absolute inset-0 bg-slate-950/30 backdrop-blur-[1px]" onClick={() => setMobileOpen(false)} /><aside className="relative h-full w-[292px] bg-white shadow-2xl"><div className="flex h-16 items-center justify-between border-b px-4"><Logo /><button className="grid h-9 w-9 place-items-center rounded-md hover:bg-slate-100" onClick={() => setMobileOpen(false)}><X className="h-5 w-5" /></button></div><div className="flex items-center gap-3 border-b p-4"><Avatar index={profile.avatar} /><div><p className="text-xs font-bold">{profile.name}</p><p className="text-[10px] text-slate-500">{roleLabels[role]}</p></div></div><nav className="h-[calc(100%-129px)] overflow-y-auto p-3">{items.map((item) => { const Icon = getIcon(item.icon); return <Link key={item.href} href={item.href} className={clsx("mb-1 flex h-11 items-center gap-3 rounded-md px-3 text-xs font-medium", item.href === pathname ? "bg-blue-50 text-blue-800" : "text-slate-600")}><Icon className="h-[17px] w-[17px]" />{item.label}</Link>; })}<button onClick={logout} className="mt-4 flex h-11 w-full items-center gap-3 rounded-md border-t px-3 text-xs font-medium text-red-600"><LogOut className="h-[17px] w-[17px]" />Sair do ambiente demo</button></nav></aside></div>}

    <div className={clsx("transition-[padding] duration-200", collapsed ? "lg:pl-[76px]" : "lg:pl-[248px]")}>
      <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/95 px-4 backdrop-blur md:px-6">
        <button className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-slate-200 lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Abrir menu"><Menu className="h-4 w-4" /></button>
        <button onClick={() => setSearchOpen(true)} className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 text-left text-xs text-slate-400 transition hover:border-slate-300 sm:max-w-[380px]"><Search className="h-4 w-4 shrink-0" /><span className="truncate">Buscar aluno, professor, turma...</span><kbd className="ml-auto hidden rounded border bg-white px-1.5 py-0.5 text-[9px] text-slate-400 sm:block">Ctrl K</kbd></button>
        <div className="ml-auto hidden items-center gap-2 text-xs text-slate-500 md:flex"><CalendarRange className="h-4 w-4" /><span>2026</span><span className="mx-1 h-4 w-px bg-slate-200" /><span className="font-medium text-slate-700">Colégio Modelo Horizonte</span></div>
        <div className="relative"><button onClick={() => setNotificationsOpen((v) => !v)} className="relative grid h-9 w-9 place-items-center rounded-md border border-slate-200 bg-white hover:bg-slate-50" aria-label="Notificações"><Bell className="h-4 w-4" />{read.length < notifications.length && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-red-500" />}</button>{notificationsOpen && <div className="absolute right-0 top-11 w-[min(360px,calc(100vw-24px))] rounded-lg border border-slate-200 bg-white p-2 shadow-xl"><div className="flex items-center justify-between px-2 py-2"><div><p className="text-xs font-bold">Notificações</p><p className="mt-0.5 text-[10px] text-slate-500">{notifications.length - read.length} não lidas</p></div><button onClick={() => setRead(notifications.map((_, i) => i))} className="text-[10px] font-semibold text-blue-700">Marcar como lidas</button></div>{notifications.map((n, index) => <button key={n.title} onClick={() => setRead((r) => r.includes(index) ? r : [...r, index])} className={clsx("flex w-full gap-3 rounded-md p-3 text-left hover:bg-slate-50", !read.includes(index) && "bg-blue-50/60")}><span className={clsx("mt-1.5 h-2 w-2 shrink-0 rounded-full", read.includes(index) ? "bg-slate-300" : "bg-blue-600")} /><div><p className="text-xs font-semibold text-slate-800">{n.title}</p><p className="mt-1 text-[11px] text-slate-500">{n.detail} · {n.time}</p></div></button>)}</div>}</div>
        <div className="relative hidden sm:block"><button onClick={() => setProfileOpen((v) => !v)} className="flex h-9 items-center gap-2 rounded-md px-1 hover:bg-slate-50" aria-label="Abrir menu do usuário"><Avatar index={profile.avatar} size="sm" /><ChevronDown className="h-3.5 w-3.5 text-slate-400" /></button>{profileOpen && <div className="absolute right-0 top-11 w-56 rounded-lg border border-slate-200 bg-white p-2 shadow-xl"><div className="border-b px-2 py-2"><p className="text-xs font-bold">{profile.name}</p><p className="mt-1 text-[10px] text-slate-500">{profile.subtitle}</p></div><button onClick={() => { setProfileOpen(false); router.push(`${pathname.split('/').slice(0, 2).join('/')}/perfil`); }} className="mt-1 flex h-9 w-full items-center gap-2 rounded-md px-2 text-xs text-slate-600 hover:bg-slate-50"><Settings className="h-4 w-4" />Configurações do perfil</button><button onClick={logout} className="flex h-9 w-full items-center gap-2 rounded-md px-2 text-xs text-red-600 hover:bg-red-50"><LogOut className="h-4 w-4" />Sair do ambiente demo</button></div>}</div>
      </header>
      <main className="mx-auto max-w-[1560px] p-4 pb-24 md:p-6 lg:pb-8">{children}</main>
      <nav className="fixed inset-x-0 bottom-0 z-30 flex h-[66px] items-center justify-around border-t border-slate-200 bg-white px-1 lg:hidden" aria-label="Navegação rápida">{items.slice(0, 4).map((item) => { const Icon = getIcon(item.icon); const active = item.href === pathname; return <Link key={item.href} href={item.href} className={clsx("flex min-w-16 flex-col items-center gap-1 py-1 text-[9px] font-medium", active ? "text-blue-700" : "text-slate-500")}><Icon className="h-[18px] w-[18px]" />{item.label.split(" ")[0]}</Link>; })}<button onClick={() => setMobileOpen(true)} className="flex min-w-16 flex-col items-center gap-1 py-1 text-[9px] font-medium text-slate-500"><Menu className="h-[18px] w-[18px]" />Menu</button></nav>
    </div>
    {searchOpen && <SearchCommand role={role} onClose={() => setSearchOpen(false)} onNavigate={(path) => { setSearchOpen(false); router.push(path); }} />}
  </div>;
}

function SearchCommand({ role, onClose, onNavigate }: { role: Role; onClose: () => void; onNavigate: (path: string) => void }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => query.length < 2 ? [] : students.filter((student) => `${student.name} ${student.className}`.toLowerCase().includes(query.toLowerCase())).slice(0, 6), [query]);
  const targetFor = (id: string) => role === "coordinator" ? `/coordenacao/alunos/${id}` : role === "director" ? `/direcao/alunos/${id}` : role === "teacher" ? "/professor/turmas/1" : role === "parent" ? "/responsavel" : "/aluno/perfil";
  return <div className="fixed inset-0 z-[70] flex items-start justify-center bg-slate-950/35 px-3 pt-[12vh] backdrop-blur-[2px]" onMouseDown={onClose}><div className="w-full max-w-xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl" onMouseDown={(e) => e.stopPropagation()}><div className="flex items-center gap-3 border-b px-4"><Search className="h-5 w-5 text-slate-400" /><input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar aluno, professor ou turma..." className="h-14 flex-1 border-0 bg-transparent text-sm outline-none" /><button onClick={onClose} className="text-[10px] text-slate-400">ESC</button></div><div className="max-h-80 overflow-y-auto p-2">{query.length < 2 && <p className="px-3 py-8 text-center text-xs text-slate-400">Digite pelo menos 2 caracteres para buscar.</p>}{query.length >= 2 && !results.length && <p className="px-3 py-8 text-center text-xs text-slate-400">Nenhum resultado encontrado.</p>}{results.map((student) => <button key={student.id} onClick={() => onNavigate(targetFor(student.id))} className="flex w-full items-center gap-3 rounded-md p-3 text-left hover:bg-slate-50"><div className="grid h-9 w-9 place-items-center rounded-full bg-blue-50 text-xs font-bold text-blue-700">{student.name.split(" ").map((n) => n[0]).join("")}</div><div className="flex-1"><p className="text-xs font-bold text-slate-800">{student.name}</p><p className="mt-0.5 text-[11px] text-slate-500">Aluno · {student.className} · {student.registration}</p></div><StatusBadge tone={student.average < 6 ? "danger" : "success"}>{student.average < 6 ? "Atenção" : "Regular"}</StatusBadge></button>)}</div><div className="flex items-center justify-between border-t bg-slate-50 px-4 py-2 text-[10px] text-slate-400"><span>Busca universal Nexo</span><span>30 alunos indexados</span></div></div></div>;
}
