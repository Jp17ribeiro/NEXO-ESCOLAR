import type { Role, Student } from "./types";

export const profiles: Record<Role, { name: string; short: string; subtitle: string; avatar: number }> = {
  student: { name: "Lucas Silva", short: "Lucas", subtitle: "8º A · Ensino Fundamental", avatar: 0 },
  parent: { name: "Mariana Silva", short: "Mariana", subtitle: "Responsável por Lucas e Ana", avatar: 1 },
  teacher: { name: "Rafael Almeida", short: "Prof. Rafael", subtitle: "Professor de Matemática", avatar: 2 },
  coordinator: { name: "Fernanda Oliveira", short: "Fernanda", subtitle: "Coordenação Pedagógica", avatar: 3 },
  director: { name: "Carlos Martins", short: "Carlos", subtitle: "Direção Geral", avatar: 4 },
};

export const performance = [
  { period: "1º bim.", media: 7.4, frequencia: 91 },
  { period: "2º bim.", media: 7.9, frequencia: 93 },
  { period: "3º bim.", media: 8.4, frequencia: 94 },
  { period: "4º bim.", media: 8.7, frequencia: 96 },
];

export const subjects = [
  { name: "Português", score: 8.7, teacher: "Juliana Costa" },
  { name: "Matemática", score: 7.5, teacher: "Rafael Almeida" },
  { name: "História", score: 9.0, teacher: "Paulo Mendes" },
  { name: "Geografia", score: 8.2, teacher: "Camila Rocha" },
  { name: "Ciências", score: 8.9, teacher: "Beatriz Santos" },
  { name: "Inglês", score: 7.8, teacher: "Juliana Costa" },
];

const firstNames = ["Lucas", "Ana", "Beatriz", "Caio", "Daniel", "Eduarda", "Felipe", "Gabriela", "Heitor", "Isabela", "João", "Karen", "Leonardo", "Marina", "Nicolas", "Olívia", "Pedro", "Rafaela", "Samuel", "Vitória", "Arthur", "Bianca", "Cecília", "Davi", "Elisa", "Gustavo", "Helena", "Igor", "Laura", "Miguel"];
const lastNames = ["Silva", "Souza", "Oliveira", "Santos", "Lima", "Costa", "Almeida", "Pereira", "Rocha", "Martins"];

export const students: Student[] = firstNames.map((name, index) => ({
  id: `ALU-${String(index + 1).padStart(3, "0")}`,
  name: `${name} ${lastNames[index % lastNames.length]}`,
  registration: `2026${String(1031 + index)}`,
  className: ["8º A", "8º B", "9º A"][index % 3],
  average: Number((5.2 + ((index * 7) % 40) / 10).toFixed(1)),
  attendance: 74 + ((index * 7) % 25),
  occurrences: (index * 3) % 5,
  lateActivities: (index * 2) % 4,
}));

students[0] = { id: "lucas-silva", name: "Lucas Silva", registration: "20261031", className: "8º A", average: 8.4, attendance: 94, occurrences: 1, lateActivities: 2 };

export const notifications = [
  { title: "Nova nota publicada", detail: "História · 9,0", time: "Há 12 min", tone: "success" },
  { title: "Atividade próxima do prazo", detail: "Ciências · entrega amanhã", time: "Há 1 h", tone: "warning" },
  { title: "Novo comunicado", detail: "Reunião de responsáveis", time: "Ontem", tone: "info" },
];

export const assessments = [
  { subject: "Matemática", title: "Prova bimestral", date: "25 SET", time: "08:00", content: "Capítulos 4 ao 7", tone: "blue" },
  { subject: "Ciências", title: "Projeto em grupo", date: "28 SET", time: "10:20", content: "Ecossistemas brasileiros", tone: "green" },
  { subject: "Português", title: "Produção textual", date: "02 OUT", time: "07:10", content: "Crônica narrativa", tone: "yellow" },
];

export const activities = [
  { subject: "Ciências", title: "Mapa dos biomas", teacher: "Beatriz Santos", due: "Amanhã, 18:00", status: "Pendente", tone: "warning", score: "—" },
  { subject: "Matemática", title: "Lista de equações", teacher: "Rafael Almeida", due: "26 set", status: "Entregue", tone: "info", score: "—" },
  { subject: "História", title: "Linha do tempo", teacher: "Paulo Mendes", due: "20 set", status: "Corrigida", tone: "success", score: "9,0" },
  { subject: "Português", title: "Resenha literária", teacher: "Juliana Costa", due: "18 set", status: "Atrasada", tone: "danger", score: "—" },
];

export const classes = [
  { name: "8º A", subject: "Matemática", students: 32, average: 7.8, attendance: 93, room: "Sala 12" },
  { name: "8º B", subject: "Matemática", students: 29, average: 7.2, attendance: 89, room: "Sala 14" },
  { name: "9º A", subject: "Matemática", students: 31, average: 8.1, attendance: 95, room: "Sala 16" },
];

export const schedule = [
  ["07:10", "Português", "Juliana Costa", "12"],
  ["08:00", "Matemática", "Rafael Almeida", "12"],
  ["08:50", "Ciências", "Beatriz Santos", "Lab. 2"],
  ["10:20", "História", "Paulo Mendes", "12"],
  ["11:10", "Geografia", "Camila Rocha", "12"],
];
