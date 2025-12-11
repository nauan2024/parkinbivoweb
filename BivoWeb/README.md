# 🚗 Bivô - Sistema de Estacionamento (Versão Web)

> Aplicação web responsiva para gerenciamento de estacionamento, migrada a partir de uma solução mobile.

![Status do Projeto](https://img.shields.io/badge/Status-Em_Desenvolvimento-yellow) ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)

## 📋 Sobre o Projeto

Este projeto foi desenvolvido como parte de uma **Situação de Aprendizagem** com o objetivo de transformar um aplicativo mobile de estacionamento em uma **aplicação web multiplataforma**.

O foco principal foi manter a lógica de negócios original, adaptando a interface para navegadores desktop e mobile, utilizando **React** e boas práticas de componentização e consumo de API.

### 🎯 Objetivos
- Converter a lógica de um App React Native para React Web.
- Implementar autenticação (Login/Cadastro) integrada a uma API real.
- Gerenciar rotas e estados da aplicação.

---

## 🚀 Funcionalidades

- **Autenticação Segura:**
  - Login validado via API (MockAPI).
  - Cadastro de novos usuários com verificação de e-mail duplicado.
  - Proteção de rotas (Redirecionamento se não estiver logado).

- **Dashboard (Home):**
  - Visualização rápida das opções do sistema.
  - Exibição do nome do usuário logado.
  - Logout funcional.

- **Gestão de Veículos:**
  - **Entrada:** Registro de novos veículos (Placa, Modelo, Data/Hora).
  - **Saída:** Interface para finalização de estadia (Simulação).

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes ferramentas:

- **[React](https://react.dev/)**: Biblioteca para construção da interface.
- **[Vite](https://vitejs.dev/)**: Ferramenta de build rápida e otimizada.
- **[React Router Dom](https://reactrouter.com/)**: Gerenciamento de rotas e navegação.
- **[MockAPI](https://mockapi.io/)**: Simulação de Backend para persistência de dados (Usuários e Veículos).
- **CSS3**: Estilização responsiva e customizada.
- **Git/GitHub**: Controle de versão.

---

## 📂 Estrutura do Projeto

A organização de pastas segue o padrão de componentização:

```bash
src/
├── assets/          # Imagens e Logotipos
├── components/      # Componentes funcionais
│   ├── Cadastro/    # Tela de Login e Cadastro (Lógica Unificada)
│   ├── Home/        # Dashboard Principal
│   ├── Entrada/     # Registro de Veículos
│   ├── Saida/       # Finalização
│   └── InputText/   # Componentes Reutilizáveis
├── App.jsx          # Configuração de Rotas
└── main.jsx         # Ponto de entrada