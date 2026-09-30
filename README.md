# Nexo Escolar

Demonstração funcional de uma plataforma SaaS de gestão escolar com cinco perfis: aluno, responsável, professor, coordenação e direção.

## Executar

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000/login` e escolha um perfil. A autenticação é demonstrativa e não usa dados reais.

## Estrutura

- `app/`: App Router, login, shell e rotas por perfil.
- `components/`: dashboards, páginas operacionais, gráficos e componentes compartilhados.
- `lib/`: dados fictícios, navegação, tipos e regras iniciais de RBAC.
- `supabase/schema.sql`: modelo conceitual para a futura persistência, auditoria e autenticação.
- `public/nexo-people.png`: retratos demonstrativos gerados para o produto.

## Segurança futura

Antes de conectar dados reais, habilite Row Level Security no Supabase, valide o vínculo entre escola e usuário em todas as consultas, restrinja professores às próprias turmas e disciplinas, aplique vínculo responsável-aluno e implemente consentimento, retenção, anonimização e auditoria conforme a LGPD.
