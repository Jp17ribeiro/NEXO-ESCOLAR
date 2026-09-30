import type { Role } from "./types";

export const roleBasePath: Record<Role, string> = {
  student: "/aluno",
  parent: "/responsavel",
  teacher: "/professor",
  coordinator: "/coordenacao",
  director: "/direcao",
};

export const roleLabels: Record<Role, string> = {
  student: "Aluno",
  parent: "Responsável",
  teacher: "Professor",
  coordinator: "Coordenação",
  director: "Direção",
};

export const can = (role: Role, action: "edit-grades" | "edit-attendance" | "publish" | "view-school") => {
  const rules: Record<typeof action, Role[]> = {
    "edit-grades": ["teacher", "coordinator", "director"],
    "edit-attendance": ["teacher", "coordinator", "director"],
    publish: ["coordinator", "director"],
    "view-school": ["coordinator", "director"],
  };
  return rules[action].includes(role);
};
