"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { performance, subjects } from "@/lib/mock-data";

const tooltipStyle = { border: "1px solid #e7eaf0", borderRadius: 8, boxShadow: "0 8px 24px rgba(16,24,40,.08)", fontSize: 11 };

export function PerformanceChart({ mode = "area" }: { mode?: "area" | "line" }) {
  return <div className="h-64 w-full" aria-label="Gráfico de evolução acadêmica"><ResponsiveContainer width="100%" height="100%">{mode === "area" ? <AreaChart data={performance} margin={{ top: 8, right: 4, left: -22, bottom: 0 }}><defs><linearGradient id="nexoFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2563eb" stopOpacity={0.22} /><stop offset="100%" stopColor="#2563eb" stopOpacity={0.01} /></linearGradient></defs><CartesianGrid vertical={false} stroke="#edf0f4" /><XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#7b8495" }} /><YAxis domain={[0, 10]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#7b8495" }} /><Tooltip contentStyle={tooltipStyle} formatter={(value) => [String(value).replace(".", ","), "Média"]} /><Area type="monotone" dataKey="media" stroke="#1e4ed8" strokeWidth={2.5} fill="url(#nexoFill)" dot={{ r: 4, fill: "#fff", stroke: "#1e4ed8", strokeWidth: 2 }} /></AreaChart> : <LineChart data={performance} margin={{ top: 8, right: 8, left: -22, bottom: 0 }}><CartesianGrid vertical={false} stroke="#edf0f4" /><XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#7b8495" }} /><YAxis domain={[70, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#7b8495" }} /><Tooltip contentStyle={tooltipStyle} /><Line type="monotone" dataKey="frequencia" stroke="#148766" strokeWidth={2.5} dot={{ r: 4, fill: "#fff", stroke: "#148766", strokeWidth: 2 }} /></LineChart>}</ResponsiveContainer></div>;
}

export function SubjectChart() {
  return <div className="h-64 w-full"><ResponsiveContainer width="100%" height="100%"><BarChart data={subjects} layout="vertical" margin={{ top: 2, right: 15, left: 10, bottom: 0 }}><CartesianGrid horizontal={false} stroke="#edf0f4" /><XAxis type="number" domain={[0, 10]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#7b8495" }} /><YAxis type="category" dataKey="name" width={74} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#50586a" }} /><Tooltip contentStyle={tooltipStyle} formatter={(value) => [String(value).replace(".", ","), "Média"]} /><Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={10}>{subjects.map((subject) => <Cell key={subject.name} fill={subject.score >= 8.5 ? "#148766" : subject.score < 7.8 ? "#d49a24" : "#3774dd"} />)}</Bar></BarChart></ResponsiveContainer></div>;
}

const schoolSeries = [
  { period: "Fev", frequencia: 91, media: 7.2, ocorrencias: 18 }, { period: "Mar", frequencia: 92, media: 7.4, ocorrencias: 14 }, { period: "Abr", frequencia: 89, media: 7.3, ocorrencias: 22 }, { period: "Mai", frequencia: 93, media: 7.7, ocorrencias: 12 }, { period: "Jun", frequencia: 94, media: 7.8, ocorrencias: 10 }, { period: "Ago", frequencia: 95, media: 8.0, ocorrencias: 8 },
];

export function SchoolTrendChart({ dataKey = "frequencia" }: { dataKey?: "frequencia" | "media" | "ocorrencias" }) {
  const color = dataKey === "frequencia" ? "#1e4ed8" : dataKey === "media" ? "#148766" : "#d49a24";
  return <div className="h-64 w-full"><ResponsiveContainer width="100%" height="100%"><LineChart data={schoolSeries} margin={{ top: 8, right: 8, left: -22, bottom: 0 }}><CartesianGrid vertical={false} stroke="#edf0f4" /><XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#7b8495" }} /><YAxis domain={dataKey === "media" ? [5, 10] : [0, "auto"]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#7b8495" }} /><Tooltip contentStyle={tooltipStyle} /><Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2.5} dot={{ r: 3, fill: "#fff", stroke: color, strokeWidth: 2 }} /></LineChart></ResponsiveContainer></div>;
}

const distribution = [{ name: "6º ano", value: 118 }, { name: "7º ano", value: 126 }, { name: "8º ano", value: 132 }, { name: "9º ano", value: 121 }, { name: "Ensino Médio", value: 351 }];
const pieColors = ["#1e4ed8", "#3b82f6", "#148766", "#d49a24", "#7c3aed"];

export function DistributionChart() {
  return <div className="h-64 w-full"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={distribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={54} outerRadius={88} paddingAngle={3} strokeWidth={0}>{distribution.map((entry, index) => <Cell key={entry.name} fill={pieColors[index]} />)}</Pie><Tooltip contentStyle={tooltipStyle} /></PieChart></ResponsiveContainer></div>;
}
