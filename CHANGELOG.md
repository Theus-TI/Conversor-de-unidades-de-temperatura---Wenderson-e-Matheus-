# Changelog

Todas as mudanças notáveis neste projeto serão documentadas aqui.

## v1.0.0 - 2025-10-27

- chore(init): scaffold do projeto estático
- feat(core): conversão básica Celsius ↔ Fahrenheit com eventos de input
- feat(core): suporte a Kelvin e conversão genérica C/F/K
- feat(ui): UI reativa completa com botão de inversão e destaque visual
- feat(validation): validação de entrada acessível com mensagens em aria-live
- style(ui): melhorias de responsividade e foco visível
- refactor(modules): mover funções de conversão para ES module e importar no app
- feat(format): formatação numérica amigável no campo de saída
- fix(core): melhorar precisão com EPSILON e normalização de -0 nas conversões

## v1.1.0 - 2025-10-28

- feat(ui): alternância de tema claro/escuro com persistência
- feat(ui): histórico de conversões com opção de limpar e persistência (localStorage)
- feat(a11y+ux): aceitar vírgula como separador decimal
- feat(a11y): atalhos de teclado (Ctrl+I inverter, Ctrl+L limpar histórico, Ctrl+1 foco origem, Ctrl+2 foco destino)
- feat(a11y): reduzir movimento quando 'prefers-reduced-motion: reduce' estiver ativo
- feat(ux): favicon, theme-color, placeholders e step=any nos inputs
- feat(state): persistência de valores e unidades e restauração ao carregar
- ci: adicionar workflow do GitHub Actions (lint e testes com Jest)
- docs: README atualizado e versão no HTML ajustada para v1.1.0
