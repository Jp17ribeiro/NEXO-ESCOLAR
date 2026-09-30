export type Role = "student" | "parent" | "teacher" | "coordinator" | "director";

export type Tone = "success" | "warning" | "danger" | "info" | "neutral";

export type NavItem = {
  label: string;
  href: string;
  icon: string;
};

export type Student = {
  id: string;
  name: string;
  registration: string;
  className: string;
  average: number;
  attendance: number;
  occurrences: number;
  lateActivities: number;
};
