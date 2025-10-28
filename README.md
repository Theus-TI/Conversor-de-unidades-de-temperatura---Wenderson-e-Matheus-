# 🌡️ Conversor de Temperatura

[![Licença: MIT](https://img.shields.io/badge/Licença-MIT-blue.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/Theus-TI/Conversor-de-unidades-de-temperatura---Wenderson-e-Matheus-?style=social)](https://github.com/Theus-TI/Conversor-de-unidades-de-temperatura---Wenderson-e-Matheus-/stargazers)

Um conversor de temperatura moderno, responsivo e acessível que permite conversões precisas entre as escalas Celsius, Fahrenheit e Kelvin. Desenvolvido com JavaScript puro, HTML5 e CSS3.

## ✨ Funcionalidades

- **Conversão instantânea** entre Celsius (°C), Fahrenheit (°F) e Kelvin (K)
- **Interface intuitiva** com design responsivo para todos os dispositivos
- **Tema claro/escuro** que respeita as preferências do sistema
- **Histórico de conversões** para referência rápida
- **Acessibilidade total** com suporte a teclado e leitores de tela
- **Precisão avançada** com arredondamento inteligente
- **Validação em tempo real** para entradas inválidas
- **Animações suaves** para melhor experiência do usuário
- **Offline-first** - funciona mesmo sem conexão com a internet
- **Leve e rápido** - sem dependências externas

## 🚀 Como usar

1. **Insira um valor** no campo de entrada
2. **Selecione a unidade de origem** no menu suspenso
3. **Veja o resultado convertido** automaticamente
4. **Use o botão de inverter** para trocar as unidades rapidamente
5. **Acesse o histórico** para ver conversões anteriores

## 🛠️ Tecnologias

- **Frontend**: HTML5, CSS3 (com variáveis CSS), JavaScript puro (ES6+)
- **Ferramentas**: Git, Prettier, ESLint
- **Testes**: Jest
- **CI/CD**: GitHub Actions

## 📦 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/Theus-TI/Conversor-de-unidades-de-temperatura---Wenderson-e-Matheus-.git
   cd Conversor-de-unidades-de-temperatura---Wenderson-e-Matheus-
   ```

2. Abra o arquivo `index.html` no seu navegador ou use um servidor local:
   ```bash
   # Usando Python (qualquer versão)
   python -m http.server 8000
   ```

## 🧪 Testes

Para executar os testes unitários:

```bash
npm test
```

## 🌍 Acessibilidade

Este projeto segue as diretrizes de acessibilidade WCAG 2.1, incluindo:
- Navegação por teclado
- Suporte a leitores de tela
- Contraste adequado
- Foco visível
- Textos alternativos

## 🤝 Contribuição

Contribuições são bem-vindas! Siga estes passos:

1. Faça um Fork do projeto
2. Crie sua Branch (`git checkout -b feature/nova-funcionalidade`)
3. Faça o Commit das suas alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Faça o Push para a Branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Distribuído sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais informações.

## ✉️ Contato

Seu Nome - [@Theus-TI](https://github.com/Theus-TI)

Link do Projeto: [https://github.com/Theus-TI/Conversor-de-unidades-de-temperatura---Wenderson-e-Matheus-](https://github.com/Theus-TI/Conversor-de-unidades-de-temperatura---Wenderson-e-Matheus-)

## ⌨️ Atalhos de Teclado

- Ctrl+I: Inverter unidades
- Ctrl+L: Limpar histórico de conversões
- Ctrl+1: Focar campo de origem (valor de entrada)
- Ctrl+2: Focar campo de destino (valor convertido)

## 🗂️ Histórico e Persistência

- O histórico de conversões é salvo no `localStorage` (até 50 itens).
- As preferências de tema e o último estado (valores e unidades) também são persistidos no `localStorage`.
