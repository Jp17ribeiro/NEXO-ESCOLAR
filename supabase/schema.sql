-- Nexo Escolar: modelo conceitual inicial para uma futura instalação Supabase.
-- Não execute em produção sem revisar RLS, retenção e políticas LGPD.

create type public.user_role as enum ('student', 'parent', 'teacher', 'coordinator', 'director');
create type public.attendance_status as enum ('present', 'absent', 'excused', 'late');

create table public.schools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table public.users (
  id uuid primary key references auth.users(id),
  school_id uuid not null references public.schools(id),
  role public.user_role not null,
  full_name text not null,
  created_at timestamptz not null default now()
);

create table public.students (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references public.users(id),
  school_id uuid not null references public.schools(id),
  registration text not null,
  birth_date date,
  unique (school_id, registration)
);

create table public.parents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique not null references public.users(id)
);

create table public.student_parents (
  student_id uuid references public.students(id) on delete cascade,
  parent_id uuid references public.parents(id) on delete cascade,
  relationship text,
  primary key (student_id, parent_id)
);

create table public.teachers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique not null references public.users(id)
);

create table public.academic_periods (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references public.schools(id),
  name text not null,
  starts_on date not null,
  ends_on date not null
);

create table public.classes (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references public.schools(id),
  academic_period_id uuid not null references public.academic_periods(id),
  name text not null,
  grade_level text not null,
  shift text not null
);

create table public.subjects (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references public.schools(id),
  name text not null
);

create table public.enrollments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id),
  class_id uuid not null references public.classes(id),
  active boolean not null default true,
  unique (student_id, class_id)
);

create table public.teacher_classes (
  teacher_id uuid references public.teachers(id),
  class_id uuid references public.classes(id),
  subject_id uuid references public.subjects(id),
  primary key (teacher_id, class_id, subject_id)
);

create table public.assessments (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes(id),
  subject_id uuid not null references public.subjects(id),
  teacher_id uuid not null references public.teachers(id),
  academic_period_id uuid not null references public.academic_periods(id),
  name text not null,
  kind text not null,
  due_at timestamptz,
  max_score numeric(4,2) not null check (max_score > 0)
);

create table public.grades (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references public.assessments(id),
  student_id uuid not null references public.students(id),
  score numeric(4,2) check (score >= 0),
  notes text,
  updated_by uuid not null references public.users(id),
  updated_at timestamptz not null default now(),
  unique (assessment_id, student_id)
);

create table public.attendance (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id),
  class_id uuid not null references public.classes(id),
  subject_id uuid not null references public.subjects(id),
  occurred_at timestamptz not null,
  status public.attendance_status not null,
  recorded_by uuid not null references public.users(id)
);

create table public.occurrences (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id),
  category text not null,
  description text not null,
  status text not null,
  created_by uuid not null references public.users(id),
  created_at timestamptz not null default now()
);

create table public.activities (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes(id),
  subject_id uuid not null references public.subjects(id),
  teacher_id uuid not null references public.teachers(id),
  title text not null,
  description text,
  due_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.activity_submissions (
  id uuid primary key default gen_random_uuid(),
  activity_id uuid not null references public.activities(id),
  student_id uuid not null references public.students(id),
  status text not null,
  score numeric(4,2),
  submitted_at timestamptz,
  unique (activity_id, student_id)
);

create table public.materials (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references public.teachers(id),
  class_id uuid not null references public.classes(id),
  subject_id uuid not null references public.subjects(id),
  title text not null,
  kind text not null,
  url text not null,
  created_at timestamptz not null default now()
);

create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references public.schools(id),
  title text not null,
  description text not null,
  audience text not null,
  priority text not null,
  published_by uuid not null references public.users(id),
  published_at timestamptz not null default now()
);

create table public.school_calendar (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references public.schools(id),
  title text not null,
  category text not null,
  starts_at timestamptz not null,
  ends_at timestamptz
);

create table public.lesson_plans (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references public.teachers(id),
  class_id uuid not null references public.classes(id),
  subject_id uuid not null references public.subjects(id),
  lesson_date date not null,
  objective text not null,
  content text not null,
  methodology text,
  resources text,
  notes text
);

create table public.lesson_content (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references public.teachers(id),
  class_id uuid not null references public.classes(id),
  subject_id uuid not null references public.subjects(id),
  taught_on date not null,
  content text not null
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id),
  title text not null,
  body text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.audit_logs (
  id bigint generated always as identity primary key,
  school_id uuid not null references public.schools(id),
  actor_id uuid not null references public.users(id),
  entity_type text not null,
  entity_id uuid not null,
  action text not null,
  before_data jsonb,
  after_data jsonb,
  created_at timestamptz not null default now()
);

-- RLS deve ser ativada por tabela. Políticas futuras devem restringir escola,
-- papel, vínculo responsável-aluno e atribuições professor-turma-disciplina.
