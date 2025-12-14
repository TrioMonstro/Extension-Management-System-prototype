import React, { useState, useEffect, useMemo } from "react";
import {
  User,
  BookOpen,
  CheckCircle,
  Bell,
  Menu,
  X,
  LogOut,
  BarChart2,
  Search,
  Filter,
  FileText,
  Upload,
  Calendar,
  Download,
  ChevronRight,
  AlertTriangle,
  Users,
  Award,
  ShieldCheck,
  Eye,
  PlusCircle,
  Clock,
  Check,
  XCircle,
} from "lucide-react";

/**
 * MOCK DATA & CONSTANTS
 * Dados simulados para atender aos cenários do projeto.
 */

const CURR_SEM = "2024.2";
const GOAL_HOURS = 345;

const USERS = {
  DISCENTE: {
    id: 1,
    name: "Talyson Renan",
    role: "discente",
    email: "talyson.r@discente.ufma.br",
    matricula: "2021003456",
    curso: "Ciência da Computação",
    periodo: "6º",
    hours: { approved: 120, pending: 40, total: 345 },
    notifications: 3,
  },
  DOCENTE: {
    id: 2,
    name: "Prof. Dr. Anselmo Paiva",
    role: "docente",
    email: "anselmo.paiva@ufma.br",
    department: "DEINF",
    notifications: 5,
  },
  COORD_UCE: {
    id: 3,
    name: "Prof. Alexandre Cesar",
    role: "coord_uce",
    email: "alexandre.cesar@ufma.br",
    notifications: 12,
  },
  COORD_CURSO: {
    id: 4,
    name: "Prof. Darlan Quintanilha",
    role: "coord_curso",
    email: "darlan.quintanilha@ufma.br",
    notifications: 2,
  },
  DISCENTE_DIRETOR: {
    id: 5,
    name: "Lucas Farias",
    role: "discente_diretor",
    email: "lucas.farias@discente.ufma.br",
    matricula: "2020001234",
    entity: "DACOMP",
    hours: { approved: 210, pending: 10, total: 345 },
    notifications: 8,
  },
};

const OPPORTUNITIES = [
  {
    id: 101,
    title: "Introdução à Inteligência Artificial",
    type: "Curso",
    status: "Abertas",
    ch: 40,
    vacancies: 30,
    filled: 12,
    deadline: "20/12/2024",
    description:
      "Curso introdutório sobre redes neurais e aprendizado de máquina.",
    author: "Prof. Dr. Anselmo Paiva",
    public: true,
  },
  {
    id: 102,
    title: "Maratona de Programação 2024",
    type: "Evento",
    status: "Em Execução",
    ch: 20,
    vacancies: 100,
    filled: 85,
    deadline: "10/12/2024",
    description: "Competição de programação para alunos de computação.",
    author: "DACOMP",
    public: true,
  },
  {
    id: 103,
    title: "Oficina de Robótica Educacional",
    type: "Oficina",
    status: "Encerrada",
    ch: 15,
    vacancies: 20,
    filled: 20,
    deadline: "01/11/2024",
    author: "Prof. Dr. Anselmo Paiva",
    public: false,
  },
  {
    id: 104,
    title: "Semana de Tecnologia da UFMA",
    type: "Evento",
    status: "Rascunho",
    ch: 60,
    vacancies: 200,
    filled: 0,
    deadline: "15/01/2025",
    author: "DACOMP",
    public: false,
  },
];

const REQUESTS = [
  {
    id: 501,
    student: "Talyson Renan",
    type: "Externo",
    activity: "Curso Udemy - React Avançado",
    ch_requested: 20,
    date: "12/12/2024",
    status: "Pendente",
    document: "cert_udemy.pdf",
  },
  {
    id: 502,
    student: "Maria Silva",
    type: "Externo",
    activity: "Bootcamp Rocketseat",
    ch_requested: 40,
    date: "10/12/2024",
    status: "Aprovado",
    document: "cert_rocket.pdf",
  },
  {
    id: 503,
    student: "João Souza",
    type: "Externo",
    activity: "Palestra Tech",
    ch_requested: 5,
    date: "08/12/2024",
    status: "Indeferido",
    reason: "Documento ilegível",
  },
];

const CERTIFICATES = [
  {
    id: "CERT-2024-88A9",
    student: "Talyson Renan",
    activity: "Introdução à Robótica",
    ch: 40,
    date: "20/10/2024",
    hash: "88a9f00d-fake-hash",
  },
  {
    id: "CERT-2024-B2C1",
    student: "Lucas Farias",
    activity: "Organização SEMCOMP",
    ch: 60,
    date: "15/09/2024",
    hash: "b2c1d33e-fake-hash",
  },
];

/**
 * COMPONENTS
 */

// --- Shared Components ---

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}
  >
    {children}
  </div>
);

const Badge = ({ status }) => {
  const styles = {
    Abertas: "bg-green-100 text-green-800",
    Aprovado: "bg-green-100 text-green-800",
    "Em Execução": "bg-blue-100 text-blue-800",
    Pendente: "bg-yellow-100 text-yellow-800",
    Rascunho: "bg-gray-100 text-gray-800",
    Encerrada: "bg-red-100 text-red-800",
    Indeferido: "bg-red-100 text-red-800",
    Curso: "bg-purple-100 text-purple-800",
    Evento: "bg-indigo-100 text-indigo-800",
    Oficina: "bg-pink-100 text-pink-800",
  };
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
};

const Button = ({
  children,
  variant = "primary",
  onClick,
  className = "",
  icon: Icon,
}) => {
  const base =
    "flex items-center justify-center px-4 py-2 rounded-md transition-all font-medium focus:outline-none focus:ring-2 focus:ring-offset-1";
  const variants = {
    primary: "bg-red-800 hover:bg-red-900 text-white focus:ring-red-500",
    secondary: "bg-blue-900 hover:bg-blue-800 text-white focus:ring-blue-500",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-300",
    danger: "bg-red-100 text-red-700 hover:bg-red-200",
    ghost: "text-gray-600 hover:bg-gray-100",
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {Icon && <Icon size={16} className="mr-2" />}
      {children}
    </button>
  );
};

// --- View: Landing Page (Public) ---

const LandingPage = ({ onLogin, onValidate }) => {
  const [certCode, setCertCode] = useState("");
  const [validationResult, setValidationResult] = useState(null);

  const handleValidation = (e) => {
    e.preventDefault();
    const cert = CERTIFICATES.find(
      (c) => c.id === certCode || c.hash === certCode
    );
    setValidationResult(cert ? { valid: true, data: cert } : { valid: false });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header Publico */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-800 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              U
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">
                Extensão UFMA
              </h1>
              <p className="text-xs text-gray-500">Ciência da Computação</p>
            </div>
          </div>
          <div className="flex gap-3">
            <a
              href="#mural"
              className="text-gray-600 hover:text-red-800 font-medium px-3 py-2"
            >
              Oportunidades
            </a>
            <a
              href="#validar"
              className="text-gray-600 hover:text-red-800 font-medium px-3 py-2"
            >
              Validar Certificado
            </a>
            <Button variant="primary" onClick={onLogin}>
              Acesso Restrito
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Conectando Universidade e Sociedade
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
            Gerencie suas atividades de extensão, acompanhe seu progresso e
            receba sua certificação em um único lugar.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              variant="primary"
              className="bg-red-600 hover:bg-red-700 text-lg px-8 py-3"
            >
              Sou Aluno
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-3"
            >
              Sou Comunidade Externa
            </Button>
          </div>
        </div>
      </div>

      {/* Mural de Oportunidades (RF013) */}
      <div id="mural" className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              Mural de Oportunidades
            </h3>
            <p className="text-gray-500">
              Inscrições abertas para comunidade interna e externa
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" icon={Filter}>
              Filtrar
            </Button>
            <div className="relative">
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Buscar..."
                className="pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {OPPORTUNITIES.filter((o) => o.public && o.status !== "Rascunho").map(
            (opp) => (
              <Card key={opp.id} className="hover:shadow-md transition-shadow">
                <div className="h-32 bg-gray-200 rounded-t-lg relative">
                  <div className="absolute top-4 left-4">
                    <Badge status={opp.type} />
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-bold text-gray-900">
                      {opp.title}
                    </h4>
                    <Badge status={opp.status} />
                  </div>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {opp.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock size={14} /> {opp.ch}h
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={14} /> {opp.vacancies} vagas
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Ver Detalhes
                  </Button>
                </div>
              </Card>
            )
          )}
        </div>
      </div>

      {/* Validação de Certificados (RF027) */}
      <div id="validar" className="bg-gray-100 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <ShieldCheck className="mx-auto text-blue-900 mb-4" size={48} />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Autenticidade de Documentos
          </h3>
          <p className="text-gray-500 mb-8">
            Digite o código de verificação impresso no certificado para validar
            sua autenticidade.
          </p>

          <form
            onSubmit={handleValidation}
            className="bg-white p-8 rounded-xl shadow-sm max-w-lg mx-auto"
          >
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={certCode}
                onChange={(e) => setCertCode(e.target.value)}
                placeholder="Ex: CERT-2024-88A9"
                className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none uppercase"
              />
              <Button variant="secondary">Verificar</Button>
            </div>

            {validationResult && (
              <div
                className={`p-4 rounded-md text-left ${
                  validationResult.valid
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                {validationResult.valid ? (
                  <div>
                    <div className="flex items-center gap-2 text-green-800 font-bold mb-2">
                      <CheckCircle size={18} /> Certificado Válido
                    </div>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>
                        <strong>Aluno:</strong> {validationResult.data.student}
                      </li>
                      <li>
                        <strong>Atividade:</strong>{" "}
                        {validationResult.data.activity}
                      </li>
                      <li>
                        <strong>Carga Horária:</strong>{" "}
                        {validationResult.data.ch}h
                      </li>
                      <li>
                        <strong>Emissão:</strong> {validationResult.data.date}
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-800 font-bold">
                    <XCircle size={18} /> Certificado não encontrado ou
                    inválido.
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

// --- Dashboard Layout ---

const DashboardLayout = ({ user, onLogout, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  // Menu items based on role
  const getMenuItems = () => {
    const common = [{ icon: BarChart2, label: "Dashboard", id: "dash" }];

    if (user.role.includes("discente")) {
      common.push(
        { icon: Search, label: "Oportunidades", id: "opps" },
        { icon: FileText, label: "Minhas Solicitações", id: "reqs" },
        { icon: Award, label: "Meus Certificados", id: "certs" }
      );
    }
    if (user.role === "discente_diretor") {
      common.push({ icon: Users, label: "Gestão Entidade", id: "entity" });
    }
    if (user.role === "docente") {
      common.push(
        { icon: BookOpen, label: "Meus Projetos", id: "projects" },
        { icon: Users, label: "Gerenciar Inscritos", id: "manage" }
      );
    }
    if (user.role.includes("coord")) {
      common.push(
        { icon: CheckCircle, label: "Validações", id: "validate" },
        { icon: FileText, label: "Relatórios", id: "reports" },
        { icon: Users, label: "Alunos Críticos", id: "critical" }
      );
    }
    return common;
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-blue-900 text-white transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="p-6 border-b border-blue-800 flex justify-between items-center">
          <div className="font-bold text-xl">Extensão UFMA</div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden">
            <X />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center text-sm font-bold border-2 border-white">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </div>
            <div className="overflow-hidden">
              <p className="font-medium truncate">{user.name}</p>
              <p className="text-xs text-blue-300 truncate capitalize">
                {user.role.replace("_", " ")}
              </p>
            </div>
          </div>

          <nav className="space-y-1">
            {getMenuItems().map((item) => (
              <button
                key={item.id}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-800 text-blue-100 transition-colors"
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 w-full p-6 border-t border-blue-800">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 text-red-300 hover:text-white transition-colors"
          >
            <LogOut size={18} /> Sair do Sistema
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 z-10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-gray-600"
          >
            <Menu />
          </button>

          <div className="flex-1 px-4 hidden md:block">
            <h2 className="text-lg font-semibold text-gray-800">
              Painel de Controle - Semestre {CURR_SEM}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full"
              >
                <Bell size={20} />
                {user.notifications > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></span>
                )}
              </button>

              {/* Notificações Dropdown (RF043) */}
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-gray-100 font-semibold text-sm">
                    Notificações
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-50 cursor-pointer">
                      <p className="text-sm text-gray-800">
                        Seu certificado de "Introdução à Robótica" foi emitido.
                      </p>
                      <span className="text-xs text-gray-400">Há 2 horas</span>
                    </div>
                    <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-50 cursor-pointer">
                      <p className="text-sm text-gray-800">
                        Solicitação de horas #503 foi indeferida.
                      </p>
                      <span className="text-xs text-gray-400">Há 1 dia</span>
                    </div>
                  </div>
                  <div className="px-4 py-2 text-center text-xs text-blue-600 cursor-pointer hover:underline">
                    Ver todas
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

// --- Dashboards Específicos por Persona ---

// 1. DISCENTE: Talyson
const DiscenteDashboard = ({ user }) => {
  const percentage = Math.round((user.hours.approved / user.hours.total) * 100);

  return (
    <div className="space-y-6">
      {/* Visão Geral (RF030) */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 md:col-span-2">
          <h3 className="font-semibold text-gray-700 mb-4">
            Progresso de Extensão
          </h3>
          <div className="flex items-center gap-6">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  stroke="#eee"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  stroke="#1e3a8a"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={2 * Math.PI * 60}
                  strokeDashoffset={2 * Math.PI * 60 * (1 - percentage / 100)}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute text-2xl font-bold text-blue-900">
                {percentage}%
              </div>
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Horas Aprovadas</span>
                  <span className="font-bold text-gray-900">
                    {user.hours.approved}h
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{
                      width: `${
                        (user.hours.approved / user.hours.total) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Pendente de Análise</span>
                  <span className="font-bold text-gray-900">
                    {user.hours.pending}h
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{
                      width: `${
                        (user.hours.pending / user.hours.total) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Meta: {user.hours.total} horas para integralização.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Award /> Ações Rápidas
          </h3>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 justify-start"
              icon={Upload}
            >
              Solicitar Horas Externas
            </Button>
            <Button
              variant="outline"
              className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 justify-start"
              icon={Search}
            >
              Buscar Oportunidades
            </Button>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Minhas Solicitações (RF024) */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">
              Minhas Solicitações Recentes
            </h3>
            <button className="text-sm text-blue-600 hover:underline">
              Ver todas
            </button>
          </div>
          <div className="space-y-4">
            {REQUESTS.filter((r) => r.student === user.name).map((req) => (
              <div
                key={req.id}
                className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50"
              >
                <div>
                  <p className="font-medium text-sm text-gray-900">
                    {req.activity}
                  </p>
                  <p className="text-xs text-gray-500">
                    Solicitado em: {req.date}
                  </p>
                </div>
                <div className="text-right">
                  <Badge status={req.status} />
                  <p className="text-xs text-gray-500 mt-1">
                    {req.ch_requested}h
                  </p>
                </div>
              </div>
            ))}
            {REQUESTS.filter((r) => r.student === user.name).length === 0 && (
              <p className="text-gray-400 text-center py-4">
                Nenhuma solicitação recente.
              </p>
            )}
          </div>
        </Card>

        {/* Oportunidades Inscritas (RF014) */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Minhas Inscrições</h3>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
              <div className="flex justify-between">
                <span className="font-medium text-blue-900">
                  Introdução à IA
                </span>
                <span className="text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded">
                  Confirmado
                </span>
              </div>
              <p className="text-xs text-blue-700 mt-1">
                Início: 20/12/2024 • Prof. Anselmo
              </p>
            </div>
            <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg opacity-70">
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">
                  Oficina de Robótica
                </span>
                <span className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded">
                  Concluído
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Certificado Disponível
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// 2. DOCENTE: Anselmo
const DocenteDashboard = ({ user }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Painel do Docente</h2>
        <Button variant="primary" icon={PlusCircle}>
          Nova Oportunidade
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-5 border-l-4 border-blue-500">
          <p className="text-gray-500 text-sm">Projetos Ativos</p>
          <p className="text-3xl font-bold text-gray-800">3</p>
        </Card>
        <Card className="p-5 border-l-4 border-yellow-500">
          <p className="text-gray-500 text-sm">Aprovações Pendentes</p>
          <p className="text-3xl font-bold text-gray-800">12</p>
        </Card>
        <Card className="p-5 border-l-4 border-green-500">
          <p className="text-gray-500 text-sm">Certificados a Emitir</p>
          <p className="text-3xl font-bold text-gray-800">45</p>
        </Card>
      </div>

      {/* Meus Projetos (RF011, RF019) */}
      <Card className="overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
          <h3 className="font-bold text-gray-800">
            Gerenciamento de Oportunidades
          </h3>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" icon={Filter}>
              Filtros
            </Button>
          </div>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              <th className="px-6 py-3">Título</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Vagas</th>
              <th className="px-6 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {OPPORTUNITIES.filter((o) => o.author.includes("Anselmo")).map(
              (op) => (
                <tr key={op.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{op.title}</td>
                  <td className="px-6 py-4">
                    <Badge status={op.status} />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {op.filled}/{op.vacancies}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3">
                      Gerenciar
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 text-sm">
                      Editar
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

// 3. COORDENADOR UCE: Alexandre
const CoordUCEDashboard = ({ user }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Validação de Créditos
        </h2>
        <div className="text-sm text-gray-500">
          <span className="font-bold text-red-600">8</span> solicitações
          vencendo em breve
        </div>
      </div>

      {/* Fila de Análise (RF021) */}
      <Card>
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h3 className="font-bold text-gray-800">
            Solicitações de Horas Externas
          </h3>
          <div className="flex gap-2">
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
              Pendente: 5
            </span>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {REQUESTS.filter((r) => r.status === "Pendente").map((req) => (
            <div
              key={req.id}
              className="p-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between hover:bg-blue-50/50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-gray-900">{req.student}</h4>
                  <span className="text-xs text-gray-400">• {req.date}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {req.activity} ({req.ch_requested}h)
                </p>
                <div className="flex items-center gap-2 text-sm text-blue-600 hover:underline cursor-pointer">
                  <FileText size={14} /> {req.document} (Visualizar PDF)
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="danger" className="text-sm py-1 px-3">
                  Indeferir
                </Button>
                <Button
                  variant="primary"
                  className="bg-green-600 hover:bg-green-700 text-sm py-1 px-3"
                >
                  Deferir
                </Button>
              </div>
            </div>
          ))}
          {REQUESTS.filter((r) => r.status === "Pendente").length === 0 && (
            <p className="text-gray-400 text-center py-8">
              Tudo limpo! Nenhuma solicitação pendente.
            </p>
          )}
        </div>
      </Card>

      {/* Alunos Críticos (RF031) */}
      <Card className="p-6">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <AlertTriangle className="text-red-500" /> Alunos em Situação Crítica
          (8º Período &lt; 50%)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-gray-500 border-b">
              <tr>
                <th className="text-left py-2">Matrícula</th>
                <th className="text-left py-2">Nome</th>
                <th className="text-left py-2">Progresso</th>
                <th className="text-right py-2">Ação</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2">2019005544</td>
                <td className="py-2">Carlos Eduardo</td>
                <td className="py-2 text-red-600 font-bold">20% (70h)</td>
                <td className="py-2 text-right">
                  <button className="text-blue-600 hover:underline">
                    Notificar
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-2">2019001122</td>
                <td className="py-2">Ana Clara</td>
                <td className="py-2 text-red-600 font-bold">35% (120h)</td>
                <td className="py-2 text-right">
                  <button className="text-blue-600 hover:underline">
                    Notificar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// 4. DISCENTE DIRETOR: Lucas (Híbrido)
const DiscenteDiretorDashboard = ({ user }) => {
  const [tab, setTab] = useState("pessoal"); // pessoal | entidade

  return (
    <div className="space-y-6">
      <div className="flex gap-4 border-b border-gray-200">
        <button
          onClick={() => setTab("pessoal")}
          className={`pb-3 px-1 font-medium text-sm transition-colors ${
            tab === "pessoal"
              ? "border-b-2 border-red-800 text-red-800"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Meu Progresso Pessoal
        </button>
        <button
          onClick={() => setTab("entidade")}
          className={`pb-3 px-1 font-medium text-sm transition-colors ${
            tab === "entidade"
              ? "border-b-2 border-red-800 text-red-800"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Gestão {user.entity}
        </button>
      </div>

      {tab === "pessoal" ? (
        <DiscenteDashboard user={user} />
      ) : (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Painel do {user.entity}
              </h2>
              <p className="text-gray-500">
                Gerencie iniciativas estudantis e emita certificados
              </p>
            </div>
            <Button variant="primary" icon={PlusCircle}>
              Nova Iniciativa
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-bold text-gray-800 mb-4">
                Minhas Iniciativas (RF012)
              </h3>
              <div className="space-y-4">
                {OPPORTUNITIES.filter((o) => o.author === "DACOMP").map(
                  (op) => (
                    <div key={op.id} className="border p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="font-bold text-gray-800">
                          {op.title}
                        </span>
                        <Badge status={op.status} />
                      </div>
                      {op.status === "Rascunho" && (
                        <div className="bg-yellow-50 text-yellow-800 text-xs p-2 rounded mt-2">
                          Aguardando submissão para Prof. Responsável
                        </div>
                      )}
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" className="text-xs py-1 h-8">
                          Editar
                        </Button>
                        <Button variant="ghost" className="text-xs py-1 h-8">
                          Participantes ({op.filled})
                        </Button>
                      </div>
                    </div>
                  )
                )}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-gray-800 mb-4">
                Status de Validação Docente
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <CheckCircle className="text-green-500 mt-0.5" size={16} />
                  <div>
                    <p className="font-bold text-gray-900">
                      Maratona de Programação
                    </p>
                    <p>Aprovado por Prof. Anselmo em 10/11/2024</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <Clock className="text-yellow-500 mt-0.5" size={16} />
                  <div>
                    <p className="font-bold text-gray-900">
                      Semana de Tecnologia
                    </p>
                    <p>Aguardando análise de Prof. Darlan</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

// 5. COORDENADOR CURSO: Darlan
const CoordCursoDashboard = ({ user }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-800">
      Visão Institucional - Ciência da Computação
    </h2>

    <div className="grid md:grid-cols-4 gap-4">
      <Card className="p-4 bg-white border-l-4 border-blue-800">
        <p className="text-xs text-gray-500 uppercase">
          Total de Horas (Semestre)
        </p>
        <p className="text-2xl font-bold">12.450h</p>
      </Card>
      <Card className="p-4 bg-white border-l-4 border-green-600">
        <p className="text-xs text-gray-500 uppercase">Concluintes Extensão</p>
        <p className="text-2xl font-bold">24 Alunos</p>
      </Card>
      <Card className="p-4 bg-white border-l-4 border-red-600">
        <p className="text-xs text-gray-500 uppercase">Situação Crítica</p>
        <p className="text-2xl font-bold">15 Alunos</p>
      </Card>
      <Card className="p-4 bg-white border-l-4 border-purple-600">
        <p className="text-xs text-gray-500 uppercase">Ações Ativas</p>
        <p className="text-2xl font-bold">8 Projetos</p>
      </Card>
    </div>

    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-800">
          Relatório de Conclusão (UCE)
        </h3>
        <Button variant="outline" icon={Download}>
          Exportar PDF
        </Button>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Lista de alunos aptos para lançamento de carga horária no SIGAA.
      </p>

      <table className="w-full text-sm">
        <thead className="bg-gray-100 font-semibold text-gray-700">
          <tr>
            <th className="px-4 py-2 text-left">Matrícula</th>
            <th className="px-4 py-2 text-left">Nome</th>
            <th className="px-4 py-2 text-center">Total Horas</th>
            <th className="px-4 py-2 text-center">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          <tr>
            <td className="px-4 py-3">2020001234</td>
            <td className="px-4 py-3">Lucas Farias</td>
            <td className="px-4 py-3 text-center">345h</td>
            <td className="px-4 py-3 text-center">
              <span className="text-green-600 font-bold bg-green-50 px-2 py-1 rounded">
                Apto
              </span>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3">2020005678</td>
            <td className="px-4 py-3">Mariana Costa</td>
            <td className="px-4 py-3 text-center">350h</td>
            <td className="px-4 py-3 text-center">
              <span className="text-green-600 font-bold bg-green-50 px-2 py-1 rounded">
                Apto
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </Card>

    <Card className="p-6">
      <h3 className="font-bold text-gray-800 mb-4">
        Comunicados em Massa (RF044)
      </h3>
      <textarea
        className="w-full border p-3 rounded-md mb-3 text-sm"
        rows="3"
        placeholder="Escreva um comunicado para todos os alunos com pendência..."
      ></textarea>
      <div className="flex justify-end">
        <Button variant="primary">Enviar Comunicado</Button>
      </div>
    </Card>
  </div>
);

// --- Login Simulation Screen ---

const LoginScreen = ({ onLogin }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-800 rounded-lg flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">
            U
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Extensão UFMA</h2>
          <p className="text-gray-500">
            Selecione um perfil para simular o acesso
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => onLogin(USERS.DISCENTE)}
            className="w-full p-4 border rounded-lg hover:bg-blue-50 hover:border-blue-300 flex items-center gap-4 transition-all group"
          >
            <div className="bg-blue-100 p-2 rounded-full text-blue-700 group-hover:bg-blue-200">
              <User />
            </div>
            <div className="text-left">
              <p className="font-bold text-gray-800">Discente</p>
              <p className="text-xs text-gray-500">Talyson Renan</p>
            </div>
          </button>

          <button
            onClick={() => onLogin(USERS.DOCENTE)}
            className="w-full p-4 border rounded-lg hover:bg-green-50 hover:border-green-300 flex items-center gap-4 transition-all group"
          >
            <div className="bg-green-100 p-2 rounded-full text-green-700 group-hover:bg-green-200">
              <BookOpen />
            </div>
            <div className="text-left">
              <p className="font-bold text-gray-800">Docente</p>
              <p className="text-xs text-gray-500">Prof. Anselmo Paiva</p>
            </div>
          </button>

          <button
            onClick={() => onLogin(USERS.COORD_UCE)}
            className="w-full p-4 border rounded-lg hover:bg-yellow-50 hover:border-yellow-300 flex items-center gap-4 transition-all group"
          >
            <div className="bg-yellow-100 p-2 rounded-full text-yellow-700 group-hover:bg-yellow-200">
              <ShieldCheck />
            </div>
            <div className="text-left">
              <p className="font-bold text-gray-800">Coord. UCE</p>
              <p className="text-xs text-gray-500">Prof. Alexandre Cesar</p>
            </div>
          </button>

          <button
            onClick={() => onLogin(USERS.COORD_CURSO)}
            className="w-full p-4 border rounded-lg hover:bg-purple-50 hover:border-purple-300 flex items-center gap-4 transition-all group"
          >
            <div className="bg-purple-100 p-2 rounded-full text-purple-700 group-hover:bg-purple-200">
              <BarChart2 />
            </div>
            <div className="text-left">
              <p className="font-bold text-gray-800">Coord. Curso</p>
              <p className="text-xs text-gray-500">Prof. Darlan Quintanilha</p>
            </div>
          </button>

          <button
            onClick={() => onLogin(USERS.DISCENTE_DIRETOR)}
            className="w-full p-4 border rounded-lg hover:bg-red-50 hover:border-red-300 flex items-center gap-4 transition-all group"
          >
            <div className="bg-red-100 p-2 rounded-full text-red-700 group-hover:bg-red-200">
              <Users />
            </div>
            <div className="text-left">
              <p className="font-bold text-gray-800">Discente Diretor</p>
              <p className="text-xs text-gray-500">Lucas Farias (DACOMP)</p>
            </div>
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            className="text-sm text-gray-500 hover:text-red-800"
            onClick={() => window.location.reload()}
          >
            Voltar para Landing Page
          </button>
        </div>
      </Card>
    </div>
  );
};

// --- Main App Component ---

const App = () => {
  const [view, setView] = useState("landing"); // landing, login, dashboard
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setView("dashboard");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView("landing");
  };

  const renderDashboardContent = () => {
    if (!currentUser) return null;
    switch (currentUser.role) {
      case "discente":
        return <DiscenteDashboard user={currentUser} />;
      case "docente":
        return <DocenteDashboard user={currentUser} />;
      case "coord_uce":
        return <CoordUCEDashboard user={currentUser} />;
      case "coord_curso":
        return <CoordCursoDashboard user={currentUser} />;
      case "discente_diretor":
        return <DiscenteDiretorDashboard user={currentUser} />;
      default:
        return <div>Perfil não reconhecido</div>;
    }
  };

  if (view === "landing") {
    return <LandingPage onLogin={() => setView("login")} />;
  }

  if (view === "login") {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <DashboardLayout user={currentUser} onLogout={handleLogout}>
      {renderDashboardContent()}
    </DashboardLayout>
  );
};

export default App;
