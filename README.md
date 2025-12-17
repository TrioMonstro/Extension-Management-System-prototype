# Sistema de Gestão de Extensão - UFMA

Protótipo de sistema para gestão de atividades de extensão universitária da UFMA, desenvolvido como parte do projeto da disciplina de Laboratório de Engenharia de Software.

## 📋 Sobre o Projeto

Este é um protótipo funcional que implementa um sistema completo de gestão de extensão com diferentes perfis de usuário, incluindo:

- **Discente**: Visualização e candidatura a oportunidades, solicitação de validação de horas complementares, emissão de certificados
- **Discente Diretor**: Gerenciamento de grupos estudantis (Diretórios, Ligas, Atléticas) e criação de iniciativas
- **Docente**: Criação de oportunidades, aprovação de iniciativas estudantis, gerenciamento de grupos sob responsabilidade
- **Coordenador UCE**: Validação de solicitações, emissão de certificados, gerenciamento geral de grupos

## 🚀 Tecnologias Utilizadas

- **React 19.2.0** - Biblioteca JavaScript para construção de interfaces
- **Vite 7.2.4** - Build tool e dev server
- **Tailwind CSS 3.4.19** - Framework CSS utility-first
- **Lucide React** - Biblioteca de ícones
- **Nenhum backend** - Projeto frontend com dados mockados

## 🔧 Como Rodar o Projeto

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

1. **Clone o repositório e navegue até a pasta do projeto:**

```bash
cd prototype
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Inicie o servidor de desenvolvimento:**

```bash
npm run dev
```

4. **Acesse no navegador:**

```
http://localhost:5173
```

### Outros Comandos

```bash
npm run build
```

## 👥 Perfis de Usuário para Teste

O sistema possui dados mockados com os seguintes usuários de teste:

### Discente Comum

- **Nome:** Talyson Renan
- **Email:** talyson.r@discente.ufma.br
- **Funcionalidades:**
  - Visualizar oportunidades (cursos, eventos, projetos)
  - Candidatar-se a oportunidades
  - Solicitar validação de horas complementares
  - Visualizar certificados
  - Ver grupos estudantis (se for Diretor)

### Discente Diretor

- **Nome:** Lucas Farias
- **Email:** lucas.farias@discente.ufma.br
- **Entidade:** DACOMP
- **Funcionalidades:**
  - Todas do discente comum
  - Gerenciar grupo estudantil (se for Diretor)
  - Criar iniciativas estudantis (eventos, workshops, etc.)
  - Solicitar aprovação de iniciativas ao Docente Responsável

### Docente

- **Nome:** Prof. Dr. Anselmo Paiva
- **Email:** anselmo.paiva@ufma.br
- **Funcionalidades:**
  - Criar oportunidades (cursos, projetos, oficinas)
  - Aprovar iniciativas estudantis
  - Gerenciar candidatos em suas oportunidades
  - Emitir certificados
  - Visualizar grupos sob sua responsabilidade

### Coordenador UCE

- **Nome:** Prof. Alexandre Cesar
- **Email:** alexandre.cesar@ufma.br
- **Funcionalidades:**
  - Validar solicitações de horas complementares
  - Gerenciar grupos estudantis (criar, editar, inativar)
  - Emitir certificados
  - Processar relatórios de conclusão
  - Enviar notificações em massa

## 🎨 Características de Design

- Design system governamental BaseGOV.BR
- Navegação intuitiva por perfil

## 📝 Observações Importantes

- **Dados Mockados**: Todos os dados são simulados e armazenados em memória
- **Sem Persistência**: Ao recarregar a página, os dados retornam ao estado inicial
- **Protótipo**: Este é um protótipo focado em demonstrar funcionalidades e fluxos, não é um sistema em produção

## 👨‍💻 Desenvolvimento

O projeto foi desenvolvido utilizando:

- Componentes funcionais React com Hooks
- Estado local gerenciado via useState
- Navegação por views condicionais
- Mock data para simular backend
