import type { NavItem, Role } from "./types";

export const navigation: Record<Role, NavItem[]> = {
  student: [
    ["Visão geral", "/aluno", "LayoutDashboard"], ["Minhas notas", "/aluno/notas", "NotebookTabs"], ["Boletim", "/aluno/boletim", "FileText"], ["Frequência", "/aluno/frequencia", "CalendarCheck"], ["Horário de aulas", "/aluno/horario", "Clock3"], ["Avaliações", "/aluno/avaliacoes", "ClipboardCheck"], ["Atividades", "/aluno/atividades", "ListTodo"], ["Materiais", "/aluno/materiais", "FolderOpen"], ["Calendário", "/aluno/calendario", "CalendarDays"], ["Registro escolar", "/aluno/ocorrencias", "HeartHandshake"], ["Avisos", "/aluno/avisos", "Megaphone"], ["Meu perfil", "/aluno/perfil", "UserRound"],
  ].map(([label, href, icon]) => ({ label, href, icon })),
  parent: [
    ["Visão geral", "/responsavel", "LayoutDashboard"], ["Central de alertas", "/responsavel/alertas", "BellRing"], ["Notas e boletim", "/responsavel/notas", "NotebookTabs"], ["Frequência", "/responsavel/frequencia", "CalendarCheck"], ["Atividades", "/responsavel/atividades", "ListTodo"], ["Avaliações", "/responsavel/avaliacoes", "ClipboardCheck"], ["Central da Família", "/responsavel/familia", "MessagesSquare"], ["Calendário", "/responsavel/calendario", "CalendarDays"], ["Documentos", "/responsavel/documentos", "Files"],
  ].map(([label, href, icon]) => ({ label, href, icon })),
  teacher: [
    ["Visão geral", "/professor", "LayoutDashboard"], ["Minhas turmas", "/professor/turmas", "UsersRound"], ["Diário de classe", "/professor/diario", "BookOpenCheck"], ["Chamada", "/professor/chamada", "ListChecks"], ["Notas", "/professor/notas", "NotebookPen"], ["Avaliações", "/professor/avaliacoes", "ClipboardPlus"], ["Atividades", "/professor/atividades", "ListTodo"], ["Planejamento", "/professor/planejamento", "PanelsTopLeft"], ["Conteúdo ministrado", "/professor/conteudo", "BookMarked"], ["Materiais", "/professor/materiais", "FolderOpen"], ["Calendário", "/professor/calendario", "CalendarDays"], ["Relatórios", "/professor/relatorios", "ChartNoAxesCombined"],
  ].map(([label, href, icon]) => ({ label, href, icon })),
  coordinator: [
    ["Visão geral", "/coordenacao", "LayoutDashboard"], ["Acompanhamento", "/coordenacao/acompanhamento", "Activity"], ["Alunos", "/coordenacao/alunos", "GraduationCap"], ["Turmas", "/coordenacao/turmas", "UsersRound"], ["Professores", "/coordenacao/professores", "Presentation"], ["Registros", "/coordenacao/ocorrencias", "HeartHandshake"], ["Avisos", "/coordenacao/avisos", "Megaphone"], ["Calendário", "/coordenacao/calendario", "CalendarDays"], ["Relatórios", "/coordenacao/relatorios", "ChartNoAxesCombined"],
  ].map(([label, href, icon]) => ({ label, href, icon })),
  director: [
    ["Visão geral", "/direcao", "LayoutDashboard"], ["Analytics", "/direcao/analytics", "ChartNoAxesCombined"], ["Turmas", "/direcao/turmas", "UsersRound"], ["Alunos", "/direcao/alunos", "GraduationCap"], ["Professores", "/direcao/professores", "Presentation"], ["Ocorrências", "/direcao/ocorrencias", "HeartHandshake"], ["Avisos", "/direcao/avisos", "Megaphone"], ["Calendário", "/direcao/calendario", "CalendarDays"], ["Relatórios", "/direcao/relatorios", "FileChartColumn"],
  ].map(([label, href, icon]) => ({ label, href, icon })),
};
