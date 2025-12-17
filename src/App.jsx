import React, { useState } from "react";
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
  ArrowLeft,
  ArrowRight,
  Mail,
  Save,
  Trash2,
  MoreVertical,
  File,
  Share2,
} from "lucide-react";

/**
 * --- MOCK DATA EXPANDIDO (Nível 2) ---
 */

const CURR_SEM = "2024.2";
const GOAL_HOURS = 345;

// Notificações Mockadas (RF034-RF043)
const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: "success",
    title: "Certificado Emitido",
    msg: 'Seu certificado de "Robótica" está disponível.',
    time: "2h atrás",
    read: false,
  },
  {
    id: 2,
    type: "warning",
    title: "Prazo Próximo",
    msg: "Sua solicitação #501 vence em 2 dias.",
    time: "1d atrás",
    read: false,
  },
  {
    id: 3,
    type: "info",
    title: "Nova Oportunidade",
    msg: "Nova vaga de estágio interno publicada.",
    time: "3d atrás",
    read: true,
  },
];

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
    notifications: INITIAL_NOTIFICATIONS,
  },
  DOCENTE: {
    id: 2,
    name: "Prof. Dr. Anselmo Paiva",
    role: "docente",
    email: "anselmo.paiva@ufma.br",
    department: "DEINF",
    notifications: [],
  },
  COORD_UCE: {
    id: 3,
    name: "Prof. Alexandre Cesar",
    role: "coord_uce",
    email: "alexandre.cesar@ufma.br",
    notifications: [],
  },
  COORD_CURSO: {
    id: 4,
    name: "Prof. Darlan Quintanilha",
    role: "coord_curso",
    email: "darlan.quintanilha@ufma.br",
    notifications: [],
  },
  DISCENTE_DIRETOR: {
    id: 5,
    name: "Lucas Farias",
    role: "discente_diretor",
    email: "lucas.farias@discente.ufma.br",
    matricula: "2020001234",
    entity: "DACOMP",
    hours: { approved: 210, pending: 10, total: 345 },
    notifications: [],
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
    description: "Curso introdutório sobre redes neurais.",
    author: "Prof. Dr. Anselmo Paiva",
    public: true,
    candidates: [
      {
        id: 901,
        name: "João Silva",
        curso: "Ciência da Computação",
        periodo: "4º",
        matricula: "2022001122",
        status: "Pendente",
        motivation:
          "Tenho muito interesse em aprender sobre IA e suas aplicações práticas...",
        curriculum: "cv_joao_silva.pdf",
        appliedAt: "15/12/2024 10:30",
      },
      {
        id: 902,
        name: "Maria Costa",
        curso: "Engenharia da Computação",
        periodo: "6º",
        matricula: "2021009988",
        status: "Aprovado",
        approvedAt: "16/12/2024 14:00",
        approvedBy: "Prof. Anselmo Paiva",
      },
      {
        id: 903,
        name: "Pedro Santos",
        curso: "Ciência da Computação",
        periodo: "2º",
        matricula: "2023005544",
        status: "Pendente",
        motivation: "Quero desenvolver minhas habilidades em programação...",
        appliedAt: "15/12/2024 16:45",
      },
      {
        id: 904,
        name: "Ana Oliveira",
        curso: "Sistemas de Informação",
        periodo: "8º",
        matricula: "2020003366",
        status: "Rejeitado",
        rejectedReason: "Perfil não atende aos requisitos da vaga",
        rejectedAt: "16/12/2024 11:20",
      },
    ],
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
    description: "Competição de programação.",
    author: "DACOMP",
    public: true,
    candidates: [],
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
    candidates: [],
  },
  {
    id: 104,
    title: "Semana Tech",
    type: "Evento",
    status: "Rascunho",
    ch: 60,
    vacancies: 200,
    filled: 0,
    deadline: "15/01/2025",
    author: "DACOMP",
    public: false,
    candidates: [],
  },
  {
    id: 105,
    title: "Hackathon de Inovação CivicTech",
    type: "Evento",
    status: "Abertas",
    ch: 30,
    vacancies: 50,
    filled: 45,
    deadline: "20/12/2024",
    description:
      "Maratona de programação para soluções cívicas. Pré-requisito: Noções de Git e API.",
    author: "Prof. Dr. Darlan Quintanilha",
    public: true,
    candidates: [],
    period: { start: "22/12/2024", end: "24/12/2024" },
  },
  {
    id: 106,
    title: "Workshop: Otimização de Currículos Tech",
    type: "Oficina",
    status: "Abertas",
    ch: 4,
    vacancies: 20,
    filled: 5,
    deadline: "25/12/2024",
    description: "Aprenda a montar um CV atrativo para vagas internacionais.",
    author: "DACOMP",
    public: false,
    candidates: [],
    period: { start: "26/12/2024", end: "26/12/2024" },
  },
  {
    id: 107,
    title: "Projeto de Inclusão Digital Rural",
    type: "Projeto",
    status: "Em Execução",
    ch: 120,
    vacancies: 10,
    filled: 10,
    deadline: "10/11/2024",
    description: "Levando letramento digital para comunidades do interior.",
    author: "Prof. Dr. Anselmo Paiva",
    public: true,
    candidates: [],
    period: { start: "15/11/2024", end: "15/05/2025" },
  },
  {
    id: 108,
    title: "Campeonato de E-Sports UFMA",
    type: "Evento",
    status: "Rascunho",
    ch: 20,
    vacancies: 0,
    filled: 0,
    deadline: "",
    description: "Campeonato intercursos de LOL e Valorant.",
    author: "DACOMP",
    public: false,
    candidates: [],
    responsibleDocent: null,
    period: { start: "", end: "" },
  },
  {
    id: 109,
    title: "Semana de Recepção aos Calouros",
    type: "Evento",
    status: "Aguardando Aprovação",
    ch: 40,
    vacancies: 100,
    filled: 0,
    deadline: "01/02/2025",
    description: "Palestras e atividades de integração.",
    author: "DACOMP",
    public: false,
    candidates: [],
    responsibleDocent: 1, // Anselmo
    docentName: "Prof. Dr. Anselmo Paiva",
    period: { start: "10/02/2025", end: "15/02/2025" },
    submitDate: "12/12/2024",
  },
];

const AVAILABLE_DOCENTS = [
  { id: 1, name: "Prof. Dr. Anselmo Paiva", department: "DEINF" },
  { id: 2, name: "Prof. Darlan Quintanilha", department: "DEINF" },
  { id: 3, name: "Profa. Cláudia Santos", department: "DEINF" },
  { id: 4, name: "Prof. Alexandre Cesar", department: "DEINF" },
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
    qrCode: `${import.meta.env.VITE_API_BASE_URL}/verify/CERT-2024-B2C1`,
  },
  {
    id: "CERT-2024-B7F2",
    student: "Talyson Renan",
    matricula: "2021003456",
    activity: "Curso de Python para Iniciantes",
    type: "Curso",
    ch: 60,
    dateStart: "01/08/2024",
    dateEnd: "30/08/2024",
    dateIssued: "05/09/2024",
    responsible: "Prof. Dr. Carlos Silva",
    hash: "b7f2d44e-fake-hash-verificacao",
    qrCode: `${import.meta.env.VITE_API_BASE_URL}/verify/CERT-2024-B7F2`,
  },
];

const REQUESTS = [
  {
    id: 501,
    student: "Talyson Renan",
    matricula: "2021003456",
    studentPeriod: "6º",
    type: "Externo",
    activity: "Curso Udemy - React Avançado",
    ch_requested: 20,
    date: "12/12/2024",
    status: "Pendente",
    document: "cert_udemy.pdf",
    description: "Curso de 20h sobre hooks e context API.",
    priority: "high",
    daysRemaining: 2,
    documentPreview: "https://via.placeholder.com/50",
    timeline: [
      { event: "Enviado", date: "12/12/2024 14:30", user: "Talyson Renan" },
    ],
  },
  {
    id: 502,
    student: "Maria Silva",
    matricula: "2021009988",
    studentPeriod: "7º",
    type: "Externo",
    activity: "Bootcamp Rocketseat",
    ch_requested: 40,
    date: "10/12/2024",
    status: "Aprovado",
    document: "cert_rocket.pdf",
    description: "Bootcamp intensivo.",
    priority: "normal",
    daysRemaining: 0,
    timeline: [],
  },
  {
    id: 503,
    student: "João Souza",
    matricula: "2021007788",
    studentPeriod: "5º",
    type: "Externo",
    activity: "Palestra Tech",
    ch_requested: 5,
    date: "08/12/2024",
    status: "Indeferido",
    reason: "Documento ilegível",
    priority: "normal",
    daysRemaining: 0,
    timeline: [
      { event: "Enviado", date: "08/12/2024 10:00", user: "João Souza" },
      {
        event: "Indeferido",
        date: "09/12/2024 15:30",
        user: "Prof. Alexandre Cesar",
      },
    ],
  },
  {
    id: 504,
    student: "Talyson Renan",
    matricula: "2021003456",
    studentPeriod: "6º",
    activity: "Curso de React Avançado (Udemy)",
    type: "Curso",
    ch_requested: 20,
    date: "12/12/2024",
    status: "Pendente",
    priority: "critical",
    daysRemaining: 1,
    timeline: [
      { event: "Enviado", date: "12/12/2024 14:30", user: "Talyson Renan" },
    ],
  },
  {
    id: 505,
    student: "Talyson Renan",
    matricula: "2021003456",
    studentPeriod: "6º",
    activity: "Monitoria de Algoritmos",
    type: "Projeto",
    ch_requested: 60,
    date: "10/10/2024",
    status: "Aprovado",
    priority: "normal",
    daysRemaining: 0,
    timeline: [],
  },
  {
    id: 506,
    student: "Talyson Renan",
    matricula: "2021003456",
    studentPeriod: "6º",
    activity: "Workshop de Design Thinking",
    type: "Oficina",
    ch_requested: 4,
    date: "05/12/2024",
    status: "Indeferido",
    reason: "Documento ilegível.",
    priority: "normal",
    daysRemaining: 0,
    timeline: [],
  },
  {
    id: 507,
    student: "Ana Beatriz",
    matricula: "2022001122",
    studentPeriod: "4º",
    type: "Externo",
    activity: "Estágio Supervisionado",
    ch_requested: 100,
    date: "01/12/2024",
    status: "Pendente",
    priority: "normal",
    daysRemaining: 5,
    description: "Estágio de férias na empresa TechSoft.",
    timeline: [
      { event: "Enviado", date: "01/12/2024 09:00", user: "Ana Beatriz" },
    ],
  },
  {
    id: 508,
    student: "Pedro Henrique",
    matricula: "2020005544",
    studentPeriod: "8º",
    type: "Externo",
    activity: "Curso de Inglês Técnico",
    ch_requested: 30,
    date: "30/11/2024",
    status: "Pendente",
    priority: "normal",
    daysRemaining: 8,
    description: "Curso de inglês focado em TI.",
    timeline: [
      { event: "Enviado", date: "30/11/2024 14:00", user: "Pedro Henrique" },
    ],
  },
];

const COMMISSION_MEMBERS = [
  { id: 1, name: "Prof. Maria Santos", department: "DEINF" },
  { id: 2, name: "Prof. Carlos Oliveira", department: "DEINF" },
  { id: 3, name: "Profa. Ana Paula", department: "DEELE" },
];

const COMPLETED_STUDENTS = [
  {
    id: 1,
    name: "Lucas Farias",
    matricula: "2020001234",
    ingresso: "2020.1",
    ppc: "2020",
    totalHours: 345,
    completedAt: "15/11/2024",
    status: "Apto",
    launched: false,
    activities: [
      {
        name: "Robótica Educacional",
        type: "Interna",
        ch: 40,
        date: "20/10/2024",
        validator: "Prof. Alexandre",
      },
      {
        name: "Curso Python Udemy",
        type: "Externa",
        ch: 60,
        date: "15/09/2024",
        validator: "Prof. Alexandre",
      },
    ],
  },
  {
    id: 2,
    name: "Mariana Costa",
    matricula: "2020005678",
    ingresso: "2020.1",
    ppc: "2020",
    totalHours: 350,
    completedAt: "10/11/2024",
    status: "Apto",
    launched: false,
    activities: [],
  },
  // Mocking more students to reach ~20
  ...Array.from({ length: 18 }).map((_, i) => ({
    id: i + 3,
    name: `Aluno Mock ${i + 3}`,
    matricula: `202000${1000 + i}`,
    ingresso: "2020.1",
    ppc: "2020",
    totalHours: 345 + i,
    completedAt: "01/12/2024",
    status: "Apto",
    launched: false,
    activities: [],
  })),
];

// --- COMPONENTES UI REUTILIZÁVEIS ---

const Card = ({
  children,
  className = "",
  elevated = false,
  hover = false,
}) => {
  const baseClasses =
    "bg-white rounded-gov border border-gray-200 overflow-hidden";
  const elevationClasses = elevated ? "shadow-gov-lg" : "shadow-gov-sm";
  const hoverClasses = hover
    ? "transition-shadow duration-200 hover:shadow-gov-md hover:border-gov-blue/30"
    : "";

  return (
    <div
      className={`${baseClasses} ${elevationClasses} ${hoverClasses} ${className}`}
    >
      {children}
    </div>
  );
};

const Badge = ({ status }) => {
  const styles = {
    // Status
    Abertas:
      "bg-feedback-success/10 text-feedback-success border-feedback-success/20",
    Aprovado:
      "bg-feedback-success/10 text-feedback-success border-feedback-success/20",
    Deferido:
      "bg-feedback-success/10 text-feedback-success border-feedback-success/20",
    "Em Execução":
      "bg-feedback-info/10 text-feedback-info border-feedback-info/20",
    Pendente:
      "bg-feedback-warning/10 text-yellow-700 border-feedback-warning/30",
    "Aguardando Aprovação":
      "bg-feedback-warning/10 text-yellow-700 border-feedback-warning/30",
    Rascunho: "bg-gray-100 text-gray-700 border-gray-200",
    Encerrada:
      "bg-feedback-error/10 text-feedback-error border-feedback-error/20",
    Indeferido:
      "bg-feedback-error/10 text-feedback-error border-feedback-error/20",
    // Types
    Curso: "bg-purple-50 text-purple-700 border-purple-200",
    Evento: "bg-indigo-50 text-indigo-700 border-indigo-200",
    Oficina: "bg-pink-50 text-pink-700 border-pink-200",
    Projeto: "bg-cyan-50 text-cyan-700 border-cyan-200",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold border ${
        styles[status] || "bg-gray-100 text-gray-700 border-gray-200"
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
  disabled,
}) => {
  const base =
    "inline-flex items-center justify-center px-6 py-3 rounded-gov transition-all font-semibold focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed min-h-[44px]";

  const variants = {
    primary:
      "bg-gov-blue hover:bg-gov-blue-dark text-white focus:ring-blue-300 shadow-gov-sm hover:translate-y-[-1px]",
    secondary:
      "bg-transparent border-2 border-gov-blue text-gov-blue hover:bg-blue-50 focus:ring-blue-300",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-200",
    danger: "bg-feedback-error hover:bg-red-700 text-white focus:ring-red-200",
    ghost: "text-gov-blue hover:bg-blue-50 bg-transparent",
    white: "bg-white text-gov-blue hover:bg-gray-50 border border-gray-200",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {Icon && <Icon size={20} className="mr-2 flex-shrink-0" />}
      <span>{children}</span>
    </button>
  );
};

const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  if (!isOpen) return null;
  const sizes = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      {/* Focus Trap Mock */}
      <div
        className={`bg-white rounded-gov-lg shadow-gov-xl w-full ${sizes[size]} max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 id="modal-title" className="text-xl font-bold text-gray-900">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gov-blue hover:bg-blue-50 rounded-full transition-colors"
            aria-label="Fechar"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  required,
  error,
  helper,
}) => (
  <div className={`mb-4 ${className}`}>
    {label && (
      <label className="block text-sm font-semibold text-gray-800 mb-2">
        {label}
        {required && <span className="text-[#E52207] ml-1">*</span>}
      </label>
    )}

    <input
      type={type}
      className={`
        w-full px-4 py-3 
        border-2 rounded-gov
        text-gray-800 text-base
        transition-all duration-200
        outline-none
        ${
          error
            ? "border-feedback-error bg-red-50 focus:ring-4 focus:ring-red-200"
            : "border-gray-300 bg-white focus:border-gov-blue focus:ring-4 focus:ring-blue-100"
        }
        disabled:bg-gray-100 disabled:cursor-not-allowed
      `}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      aria-invalid={!!error}
    />
    {helper && !error && <p className="text-xs text-gray-500 mt-1">{helper}</p>}
    {error && (
      <p className="text-xs text-feedback-error mt-1 flex items-center gap-1">
        <AlertTriangle size={12} />
        {error}
      </p>
    )}
  </div>
);

// --- TELAS E FLUXOS ---

// 1. FLUXO DE AUTOCADASTRO (RF001, RF002)
const RegistrationFlow = ({ onCancel, onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    matricula: "",
    password: "",
  });
  const [code, setCode] = useState("");

  const handleRegister = () => {
    if (!formData.email.includes("@discente.ufma.br")) {
      alert("Por favor, use um e-mail institucional (@discente.ufma.br)");
      return;
    }
    setStep(2); // Vai para validação
  };

  const handleValidation = () => {
    if (code === "1234") {
      setStep(3); // Sucesso
    } else {
      alert("Código inválido (Use 1234)");
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full">
        {step === 1 && (
          <div className="animate-in slide-in-from-right">
            <h2 className="text-2xl font-bold text-blue-900 mb-2">
              Criar Conta Discente
            </h2>
            <p className="text-gray-500 mb-6">
              Informe seus dados institucionais para acesso.
            </p>
            <Input
              label="Nome Completo"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <Input
              label="E-mail Institucional"
              placeholder="usuario@discente.ufma.br"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <Input
              label="Matrícula"
              value={formData.matricula}
              onChange={(e) =>
                setFormData({ ...formData, matricula: e.target.value })
              }
            />
            <Input
              label="Senha"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <div className="flex gap-3 mt-6">
              <Button variant="ghost" onClick={onCancel} className="flex-1">
                Cancelar
              </Button>
              <Button onClick={handleRegister} className="flex-1">
                Criar Conta
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in slide-in-from-right text-center">
            <div className="bg-blue-50 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-blue-600">
              <Mail size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Verifique seu E-mail
            </h2>
            <p className="text-gray-500 mb-6">
              Enviamos um código de 4 dígitos para{" "}
              <strong>{formData.email}</strong>
            </p>
            <Input
              className="text-center text-2xl tracking-widest font-mono"
              placeholder="0000"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={4}
            />
            <Button onClick={handleValidation} className="w-full mt-4">
              Validar E-mail
            </Button>
            <button
              onClick={() => setStep(1)}
              className="text-sm text-gray-500 mt-4 underline"
            >
              Voltar / Corrigir E-mail
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in zoom-in text-center">
            <div className="bg-green-50 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-green-600">
              <CheckCircle size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Conta Criada!
            </h2>
            <p className="text-gray-500 mb-6">
              Seus dados foram validados com sucesso.
            </p>
            <Button onClick={onComplete} className="w-full">
              Ir para Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

// 1.5 TELA DE LOGIN REAL (RF001-RF005)
const LoginScreen = ({ onCancel, onSuccess }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulação de login (validação mockada)
    setTimeout(() => {
      // Validar credenciais mockadas
      const mockCredentials = {
        "talyson.r@discente.ufma.br": {
          password: "123456",
          user: USERS.DISCENTE,
        },
        "anselmo.paiva@ufma.br": { password: "123456", user: USERS.DOCENTE },
        "alexandre.cesar@ufma.br": {
          password: "123456",
          user: USERS.COORD_UCE,
        },
        "darlan.quintanilha@ufma.br": {
          password: "123456",
          user: USERS.COORD_CURSO,
        },
        "lucas.farias@discente.ufma.br": {
          password: "123456",
          user: USERS.DISCENTE_DIRETOR,
        },
      };

      const account = mockCredentials[credentials.email.toLowerCase()];

      if (!account) {
        setError("E-mail não encontrado no sistema.");
        setLoading(false);
        return;
      }

      if (account.password !== credentials.password) {
        setError("Senha incorreta. Tente novamente.");
        setLoading(false);
        return;
      }

      // Login bem-sucedido
      setLoading(false);
      onSuccess(account.user);
    }, 1000);
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleSendRecovery = (email) => {
    alert(
      `Link de recuperação enviado para: ${email}\n\nEste link expira em 2 horas (RNF001).`
    );
    setShowForgotPassword(false);
  };

  if (showForgotPassword) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full animate-in zoom-in">
          <button
            onClick={() => setShowForgotPassword(false)}
            className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            Voltar ao Login
          </button>

          <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-200">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={32} className="text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Recuperar Senha
              </h2>
              <p className="text-gray-500 mt-2">
                Digite seu e-mail institucional para receber o link de
                recuperação.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const email = e.target.email.value;
                handleSendRecovery(email);
              }}
            >
              <Input
                id="email"
                label="E-mail Institucional"
                type="email"
                placeholder="seu.email@ufma.br"
                required
                helper="O link expira em 2 horas"
              />

              <Button type="submit" className="w-full mt-4">
                Enviar Link de Recuperação
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-100 z-50 flex flex-col items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-md w-full my-auto text-sm">
        {/* Botão Voltar */}
        <button
          onClick={onCancel}
          className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} />
          Voltar para Página Inicial
        </button>

        <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-200 animate-in zoom-in">
          {/* Logo e Título */}
          <div className="text-center mb-8">
            <img
              src="/src/assets/PNG - Logo UFMA colorido.png"
              alt="Logo UFMA"
              className="h-16 w-auto mx-auto mb-4 object-contain"
            />
            <h2 className="text-2xl font-bold text-gray-900">
              Acesso ao Sistema
            </h2>
            <p className="text-gray-500 mt-1">
              Sistema de Extensão Universitária
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="E-mail Institucional"
              type="email"
              placeholder="seu.email@ufma.br"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              required
              error={error && error.includes("E-mail") ? error : ""}
            />

            <div>
              <Input
                label="Senha"
                type="password"
                placeholder="••••••••"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                required
                error={error && error.includes("Senha") ? error : ""}
              />
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-blue-600 hover:underline mt-1"
              >
                Esqueci minha senha
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 p-3 rounded-lg flex items-center gap-2 text-red-700 text-sm">
                <AlertTriangle size={16} />
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading || !credentials.email || !credentials.password}
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          {/* Divisor */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">ou</span>
            </div>
          </div>

          {/* Link para Cadastro */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Ainda não tem conta?{" "}
              <button
                type="button"
                onClick={() => {
                  onCancel();
                  // Trigger registro no próximo tick
                  setTimeout(() => {
                    document
                      .querySelector('[data-trigger="register"]')
                      ?.click();
                  }, 100);
                }}
                className="text-blue-600 font-semibold hover:underline"
              >
                Criar conta de discente
              </button>
            </p>
          </div>

          {/* Informações de Teste - Compacto */}
          <details className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs group">
            <summary className="text-blue-800 font-semibold cursor-pointer select-none list-none flex justify-between items-center outline-none">
              <span>🧪 Ver Credenciais de Teste</span>
              <span className="text-blue-400 group-open:rotate-180 transition-transform">
                ▼
              </span>
            </summary>
            <div className="mt-2 pt-2 border-t border-blue-200 text-blue-700 space-y-1">
              <p>
                • <strong>Discente:</strong> talyson.r@discente.ufma.br
              </p>
              <p>
                • <strong>Docente:</strong> anselmo.paiva@ufma.br
              </p>
              <p>
                • <strong>Coord UCE:</strong> alexandre.cesar@ufma.br
              </p>
              <p>
                • <strong>Coord Curso:</strong> darlan.quintanilha@ufma.br
              </p>
              <p className="mt-1 border-t border-blue-200 pt-1 text-[10px] text-blue-500">
                Senha padrão para todos: <strong>123456</strong>
              </p>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

// 2. WIZARD DE CRIAÇÃO DE OPORTUNIDADE (RF011, RF012)
const CreateOppWizard = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    title: "",
    type: "Projeto",
    modality: "Presencial",
    ch: "",
    vacancies: "",
    description: "",
    target: { grad: false, ext: false },
    period: { enrollStart: "", enrollEnd: "", realStart: "", realEnd: "" },
    criteria: "",
    file: null,
    publish: false,
  });

  const validateStep1 = () => {
    if (data.title.length < 10)
      return alert("Título deve ter min. 10 caracteres");
    if (!data.ch || data.ch < 4 || data.ch > 120)
      return alert("Carga horária deve ser entre 4h e 120h");
    if (data.ch % 2 !== 0) return alert("Carga horária deve ser múltiplo de 2");
    if (data.description.length < 100)
      return alert("Descrição muito curta (min 100 caracteres)");
    if (!data.target.grad && !data.target.ext)
      return alert("Selecione pelo menos um público-alvo");
    setStep(2);
  };

  const validateStep2 = () => {
    if (!data.period.enrollStart || !data.period.enrollEnd)
      return alert("Cronograma de inscrição incompleto");
    if (!data.period.realStart || !data.period.realEnd)
      return alert("Cronograma de realização incompleto");
    if (new Date(data.period.enrollEnd) > new Date(data.period.realStart))
      return alert("Inscrição deve acabar antes do início da atividade");
    if (!data.vacancies || data.vacancies < 5 || data.vacancies > 200)
      return alert("Vagas devem ser entre 5 e 200");
    setStep(3);
  };

  const handleFinish = () => {
    const newOpp = {
      id: Math.floor(Math.random() * 1000) + 1000,
      title: data.title,
      type: data.type,
      status: data.publish ? "Abertas" : "Rascunho",
      ch: data.ch,
      vacancies: data.vacancies,
      filled: 0,
      deadline: data.period.enrollEnd,
      description: data.description,
      author: "Prof. Dr. Anselmo Paiva",
      public: data.publish,
      candidates: [],
      period: { start: data.period.realStart, end: data.period.realEnd },
      target: data.target, // New field mock
    };
    OPPORTUNITIES.push(newOpp);
    alert(
      data.publish
        ? "✓ Oportunidade Publicada com Sucesso!"
        : "✓ Salvo como Rascunho!"
    );
    onClose();
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Nova Oportunidade" size="lg">
      <div className="flex gap-2 mb-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full ${
              step >= i ? "bg-red-800" : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4 animate-in fade-in">
          <Input
            label="Título da Atividade (min 10 chars)"
            placeholder="Ex: Minicurso de Python Avançado"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo
              </label>
              <select
                className="w-full border p-2 rounded-md"
                value={data.type}
                onChange={(e) => setData({ ...data, type: e.target.value })}
              >
                <option>Projeto</option>
                <option>Curso</option>
                <option>Oficina</option>
                <option>Evento</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Modalidade
              </label>
              <select
                className="w-full border p-2 rounded-md"
                value={data.modality}
                onChange={(e) => setData({ ...data, modality: e.target.value })}
              >
                <option>Presencial</option>
                <option>Híbrido</option>
                <option>Online</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Carga Horária (4h - 120h)"
              type="number"
              value={data.ch}
              onChange={(e) => setData({ ...data, ch: e.target.value })}
              required
            />
            <div className="pt-6 flex gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={data.target.grad}
                  onChange={(e) =>
                    setData({
                      ...data,
                      target: { ...data.target, grad: e.target.checked },
                    })
                  }
                />{" "}
                Graduação
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={data.target.ext}
                  onChange={(e) =>
                    setData({
                      ...data,
                      target: { ...data.target, ext: e.target.checked },
                    })
                  }
                />{" "}
                Público Externo
              </label>
            </div>
          </div>
          <textarea
            className="w-full border p-3 rounded-md h-32 text-sm"
            placeholder="Descrição detalhada (objetivos, conteúdo... min 100 chars)"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Calendar size={16} /> Cronograma
            </h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Input
                label="Início Inscrições"
                type="date"
                value={data.period.enrollStart}
                onChange={(e) =>
                  setData({
                    ...data,
                    period: { ...data.period, enrollStart: e.target.value },
                  })
                }
              />
              <Input
                label="Fim Inscrições"
                type="date"
                value={data.period.enrollEnd}
                onChange={(e) =>
                  setData({
                    ...data,
                    period: { ...data.period, enrollEnd: e.target.value },
                  })
                }
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Início Atividade"
                type="date"
                value={data.period.realStart}
                onChange={(e) =>
                  setData({
                    ...data,
                    period: { ...data.period, realStart: e.target.value },
                  })
                }
              />
              <Input
                label="Fim Atividade"
                type="date"
                value={data.period.realEnd}
                onChange={(e) =>
                  setData({
                    ...data,
                    period: { ...data.period, realEnd: e.target.value },
                  })
                }
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Vagas Totais (5-200)"
              type="number"
              value={data.vacancies}
              onChange={(e) => setData({ ...data, vacancies: e.target.value })}
              required
            />
            <div className="pt-6 border border-dashed rounded flex justify-center items-center text-sm text-gray-500 hover:bg-gray-50 cursor-pointer relative">
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => setData({ ...data, file: e.target.files[0] })}
              />
              <Upload size={16} className="mr-2" />{" "}
              {data.file ? data.file.name : "Edital (PDF)"}
            </div>
          </div>
          <textarea
            className="w-full border p-2 rounded text-sm h-20"
            placeholder="Critérios de seleção (opcional)..."
            value={data.criteria}
            onChange={(e) => setData({ ...data, criteria: e.target.value })}
          />
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-gray-50 p-6 rounded-lg border">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText size={20} /> Resumo da Oportunidade
            </h3>

            <div className="grid grid-cols-2 gap-6 text-sm mb-6">
              <div>
                <p className="font-bold text-gray-700">Informações Gerais</p>
                <p>{data.title}</p>
                <p className="text-gray-500">
                  {data.type} • {data.modality}
                </p>
                <p className="text-gray-500">
                  {data.ch}h • {data.vacancies} vagas
                </p>
              </div>
              <div>
                <p className="font-bold text-gray-700">Cronograma</p>
                <p>Inscrição: {data.period.enrollEnd}</p>
                <p>Realização: {data.period.realStart}</p>
              </div>
            </div>

            {data.file && (
              <div className="flex items-center gap-2 bg-white p-2 rounded border mb-4">
                <FileText size={16} className="text-blue-500" />
                <span className="text-sm">{data.file.name}</span>
              </div>
            )}

            <div className="border-t pt-4">
              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-white transition-colors mb-2">
                <input
                  type="radio"
                  name="status"
                  checked={!data.publish}
                  onChange={() => setData({ ...data, publish: false })}
                />
                <div>
                  <p className="font-bold text-gray-800">
                    Salvar como Rascunho
                  </p>
                  <p className="text-xs text-gray-500">
                    Você poderá revisar e publicar posteriormente.
                  </p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-blue-50 border-blue-200 transition-colors">
                <input
                  type="radio"
                  name="status"
                  checked={data.publish}
                  onChange={() => setData({ ...data, publish: true })}
                />
                <div>
                  <p className="font-bold text-blue-900">
                    Publicar Imediatamente
                  </p>
                  <p className="text-xs text-blue-700">
                    ⚠️ A oportunidade ficará visível no portal e os discentes
                    poderão se inscrever.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-8 pt-4 border-t">
        {step > 1 ? (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            Voltar
          </Button>
        ) : (
          <div />
        )}
        {step < 3 ? (
          <Button onClick={step === 1 ? validateStep1 : validateStep2}>
            Próximo <ArrowRight size={16} className="ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleFinish}
            variant={data.publish ? "secondary" : "ghost"}
            icon={data.publish ? Check : Save}
          >
            {data.publish ? "Confirmar Publicação" : "Salvar Rascunho"}
          </Button>
        )}
      </div>
    </Modal>
  );
};

// 3. MODAL DE SOLICITAÇÃO DE HORAS EXTERNAS (RF020)
const RequestHoursModal = ({ onClose }) => {
  const [file, setFile] = useState(null);

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Solicitar Aproveitamento de Horas"
      size="lg"
    >
      <div className="space-y-4">
        <textarea
          className="w-full border rounded-md p-3 h-24 focus:ring-2 focus:ring-blue-500 outline-none resize-none mb-4"
          placeholder="Descrição detalhada da atividade (Ex: Curso de React na Udemy cobrindo Hooks, Context API...)"
        />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo
            </label>
            <select className="w-full border rounded-md p-2">
              <option>Curso Online</option>
              <option>Palestra</option>
              <option>Estágio Extracurricular</option>
            </select>
          </div>
          <Input label="Carga Horária (h)" type="number" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Data Início" type="date" />
          <Input label="Data Fim" type="date" />
        </div>

        {/* Upload de Arquivo (Preview fake) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Certificado (PDF)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-blue-50 transition-colors cursor-pointer relative">
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => setFile(e.target.files[0])}
            />
            {file ? (
              <div className="flex items-center justify-center gap-2 text-green-700 font-medium">
                <FileText size={24} /> {file.name}
              </div>
            ) : (
              <div className="text-gray-500">
                <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                <p>Clique ou arraste seu PDF aqui</p>
                <p className="text-xs mt-1">Máximo 5MB</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={() => {
              alert("Solicitação enviada para análise!");
              onClose();
            }}
            icon={Save}
          >
            Enviar Solicitação
          </Button>
        </div>
      </div>
    </Modal>
  );
};

// 4. MODAL DE ANÁLISE DETALHADA (RF021, RF022) - Visão Split
const AnalysisModal = ({ request, onClose }) => {
  const [parecer, setParecer] = useState("");

  if (!request) return null;

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={`Análise de Solicitação #${request.id}`}
      size="xl"
    >
      <div className="flex flex-col lg:flex-row gap-6 h-[600px]">
        {/* Lado Esquerdo: Visualizador de PDF Fake */}
        <div className="flex-1 bg-gray-100 rounded-lg border flex flex-col items-center justify-center p-8 relative overflow-hidden group">
          <div className="absolute top-4 right-4 z-10">
            <Button variant="outline" size="sm" icon={Download}>
              Baixar
            </Button>
          </div>
          <FileText size={64} className="text-gray-300 mb-4" />
          <p className="text-gray-500 font-medium">{request.document}</p>
          <p className="text-xs text-gray-400">Preview do PDF</p>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-200/50 to-transparent pointer-events-none" />
        </div>

        {/* Lado Direito: Dados e Decisão */}
        <div className="w-full lg:w-96 flex flex-col overflow-y-auto">
          <div className="space-y-4 flex-1">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                <User size={16} /> {request.student}
              </h4>
              <p className="text-sm text-blue-800">
                Matrícula: {request.matricula}
              </p>
              <p className="text-sm text-blue-800">
                Atividade: {request.activity}
              </p>
              <p className="text-sm text-blue-800 font-bold mt-1">
                CH Solicitada: {request.ch_requested}h
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Parecer da Coordenação
              </label>
              <textarea
                className="w-full border rounded-md p-3 h-32 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                placeholder="Escreva a justificativa em caso de indeferimento ou observações..."
                value={parecer}
                onChange={(e) => setParecer(e.target.value)}
              />
            </div>

            <div className="bg-yellow-50 p-3 rounded border border-yellow-200 text-xs text-yellow-800 flex gap-2">
              <Clock size={16} />
              <span>Prazo para análise vence em 8 dias.</span>
            </div>
          </div>

          <div className="border-t pt-4 mt-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="danger"
                onClick={() => {
                  if (!parecer) alert("Parecer obrigatório para indeferir!");
                  else {
                    alert("Indeferido!");
                    onClose();
                  }
                }}
              >
                Indeferir
              </Button>
              <Button
                variant="primary"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => {
                  alert("Deferido com sucesso!");
                  onClose();
                }}
              >
                Deferir
              </Button>
            </div>
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => alert("Delegado para membro da comissão")}
            >
              Delegar Análise
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

// 5. MODAL DE GERENCIAMENTO DE INSCRITOS (RF015, RF017)
const ManageCandidatesModal = ({ opportunity, onClose }) => {
  const [tab, setTab] = useState("pendentes"); // pendentes, aprovados, rejeitados
  const [candidates, setCandidates] = useState(opportunity?.candidates || []);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [actionModal, setActionModal] = useState(null); // 'approve', 'reject', 'remove'
  const [reason, setReason] = useState("");
  const [notify, setNotify] = useState(true);

  const updateStatus = (id, newStatus, extraData = {}) => {
    const updated = candidates.map((c) =>
      c.id === id ? { ...c, status: newStatus, ...extraData } : c
    );
    setCandidates(updated);
    // Update global mock for persistence
    const opp = OPPORTUNITIES.find((o) => o.id === opportunity.id);
    if (opp) opp.candidates = updated;

    setActionModal(null);
    setReason("");
    setSelectedCandidate(null);
    alert(`Status atualizado para: ${newStatus}`);
  };

  const getFilteredCandidates = () => {
    if (tab === "pendentes")
      return candidates.filter((c) => c.status === "Pendente");
    if (tab === "aprovados")
      return candidates.filter(
        (c) => c.status === "Aprovado" || c.status === "Confirmado"
      );
    if (tab === "rejeitados")
      return candidates.filter((c) => c.status === "Rejeitado");
    return [];
  };

  if (!opportunity) return null;

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={`Gerenciar Inscritos - ${opportunity.title}`}
      size="xl"
    >
      {/* Header Stats */}
      <div className="flex gap-4 mb-6">
        <div className="bg-blue-50 text-blue-800 px-4 py-2 rounded-lg font-bold">
          Total: {candidates.length}
        </div>
        <div className="bg-green-50 text-green-800 px-4 py-2 rounded-lg font-bold">
          Aprovados: {candidates.filter((c) => c.status === "Aprovado").length}
        </div>
        <div className="bg-yellow-50 text-yellow-800 px-4 py-2 rounded-lg font-bold">
          Pendentes: {candidates.filter((c) => c.status === "Pendente").length}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b mb-4">
        {["pendentes", "aprovados", "rejeitados"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 capitalize font-medium ${
              tab === t
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
            {t} (
            {
              candidates.filter((c) =>
                t === "pendentes"
                  ? c.status === "Pendente"
                  : t === "aprovados"
                  ? c.status === "Aprovado" || c.status === "Confirmado"
                  : c.status === "Rejeitado"
              ).length
            }
            )
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {getFilteredCandidates().map((c) => (
          <div
            key={c.id}
            className="border p-4 rounded-lg flex justify-between items-start hover:bg-gray-50"
          >
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                {c.name.substring(0, 2)}
              </div>
              <div>
                <p className="font-bold text-gray-800">{c.name}</p>
                <p className="text-xs text-gray-500">
                  {c.curso} - {c.periodo} Período • Matrícula: {c.matricula}
                </p>
                {c.motivation && (
                  <p className="text-sm text-gray-600 mt-2 bg-gray-50 p-2 rounded italic">
                    "{c.motivation}"
                  </p>
                )}
                {c.curriculum && (
                  <button className="text-blue-600 text-xs flex items-center gap-1 mt-1 hover:underline">
                    <FileText size={12} /> {c.curriculum}
                  </button>
                )}
                {c.status === "Rejeitado" && c.rejectedReason && (
                  <p className="text-xs text-red-600 mt-1">
                    Motivo: {c.rejectedReason}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {tab === "pendentes" && (
                <>
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      setSelectedCandidate(c);
                      setActionModal("approve");
                    }}
                  >
                    Aprovar
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => {
                      setSelectedCandidate(c);
                      setActionModal("reject");
                    }}
                  >
                    Rejeitar
                  </Button>
                </>
              )}
              {tab === "aprovados" && (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => alert("Mensagem enviada!")}
                    icon={Mail}
                  >
                    Msg
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-500"
                    onClick={() => {
                      setSelectedCandidate(c);
                      setActionModal("remove");
                    }}
                  >
                    Remover
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
        {getFilteredCandidates().length === 0 && (
          <p className="text-center text-gray-500 py-8">
            Nenhum candidato nesta aba.
          </p>
        )}
      </div>

      {/* Action Modals */}
      {actionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
          <div className="bg-white p-6 rounded-lg w-96 animate-in zoom-in">
            <h3 className="font-bold text-lg mb-4">
              {actionModal === "approve"
                ? "Confirmar Aprovação"
                : actionModal === "reject"
                ? "Rejeitar Candidatura"
                : "Remover Participante"}
            </h3>

            {actionModal === "approve" && (
              <div>
                <p className="mb-4">
                  Aprovar <b>{selectedCandidate?.name}</b>?
                </p>
                <label className="flex items-center gap-2 mb-4">
                  <input
                    type="checkbox"
                    checked={notify}
                    onChange={(e) => setNotify(e.target.checked)}
                  />{" "}
                  Enviar e-mail de confirmação
                </label>
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" onClick={() => setActionModal(null)}>
                    Cancelar
                  </Button>
                  <Button
                    onClick={() =>
                      updateStatus(selectedCandidate.id, "Aprovado", {
                        approvedAt: new Date().toISOString(),
                      })
                    }
                  >
                    Confirmar
                  </Button>
                </div>
              </div>
            )}

            {actionModal === "reject" && (
              <div>
                <textarea
                  className="w-full border p-2 rounded mb-4"
                  placeholder="Motivo da rejeição..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" onClick={() => setActionModal(null)}>
                    Cancelar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() =>
                      updateStatus(selectedCandidate.id, "Rejeitado", {
                        rejectedReason: reason,
                        rejectedAt: new Date().toISOString(),
                      })
                    }
                  >
                    Rejeitar
                  </Button>
                </div>
              </div>
            )}

            {actionModal === "remove" && (
              <div>
                <p className="text-red-600 mb-2">⚠️ Essa ação libera 1 vaga.</p>
                <textarea
                  className="w-full border p-2 rounded mb-4"
                  placeholder="Justificativa..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" onClick={() => setActionModal(null)}>
                    Cancelar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() =>
                      updateStatus(selectedCandidate.id, "Removido")
                    }
                  >
                    Confirmar Remoção
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
};

// 6. MODAL DE CERTIFICAÇÃO (RF019, RF025)
const CertificationModal = ({ opportunity, user, onClose }) => {
  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState({
    objectives: "",
    methodology: "",
    results: "",
    report: null,
  });
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [confirmations, setConfirmations] = useState({
    load: false,
    report: false,
  });
  const [generated, setGenerated] = useState(false);

  // Filter only approved candidates
  const participants =
    opportunity?.candidates?.filter(
      (c) => c.status === "Aprovado" || c.status === "Confirmado"
    ) || [];

  const handleGenerate = () => {
    if (!confirmations.load || !confirmations.report)
      return alert("Confirme os termos!");

    // Add certificates to global mock
    selectedParticipants.forEach((id) => {
      const participant = participants.find((p) => p.id === id);
      const hash = Math.random().toString(36).substring(7);
      const newCert = {
        id: `CERT-2024-${hash}`,
        student: participant.name,
        matricula: participant.matricula,
        activity: opportunity.title,
        type: opportunity.type,
        ch: opportunity.ch,
        dateStart: opportunity.period.start,
        dateEnd: opportunity.period.end,
        dateIssued: new Date().toLocaleDateString("pt-BR"),
        responsible: user.name,
        hash: `${hash}-fake-verificacao`,
        qrCode: `${import.meta.env.VITE_API_BASE_URL}/verify/CERT-2024-${hash}`,
      };
      CERTIFICATES.push(newCert);
      // Update participant status?
    });

    // Update Opportunity Status
    const opp = OPPORTUNITIES.find((o) => o.id === opportunity.id);
    if (opp) opp.status = "Encerrada";

    setGenerated(true);
  };

  if (!opportunity) return null;

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Certificação de Participantes"
      size="lg"
    >
      <div className="flex gap-2 mb-6">
        <div
          className={`h-2 flex-1 rounded-full ${
            step >= 1 ? "bg-blue-600" : "bg-gray-200"
          }`}
        />
        <div
          className={`h-2 flex-1 rounded-full ${
            step >= 2 ? "bg-blue-600" : "bg-gray-200"
          }`}
        />
        <div
          className={`h-2 flex-1 rounded-full ${
            step >= 3 ? "bg-blue-600" : "bg-gray-200"
          }`}
        />
      </div>

      {!generated ? (
        <>
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="bg-yellow-50 p-3 rounded border border-yellow-200 text-sm text-yellow-800 flex gap-2">
                <AlertTriangle size={16} /> ⚠️ Antes de emitir certificados,
                registre o plano de atividades.
              </div>
              <textarea
                className="w-full border p-2 rounded"
                placeholder="Objetivos da atividade (min 100 chars)..."
                value={plan.objectives}
                onChange={(e) =>
                  setPlan({ ...plan, objectives: e.target.value })
                }
                rows={3}
              />
              <textarea
                className="w-full border p-2 rounded"
                placeholder="Metodologia aplicada..."
                value={plan.methodology}
                onChange={(e) =>
                  setPlan({ ...plan, methodology: e.target.value })
                }
                rows={3}
              />
              <textarea
                className="w-full border p-2 rounded"
                placeholder="Resultados alcançados..."
                value={plan.results}
                onChange={(e) => setPlan({ ...plan, results: e.target.value })}
                rows={3}
              />
              <div className="border border-dashed p-4 rounded text-center cursor-pointer hover:bg-gray-50">
                <Upload className="mx-auto text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">
                  Upload Relatório Final (PDF)
                </span>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <p className="font-bold text-gray-800">
                Selecione os participantes aptos:
              </p>
              <div className="border rounded-lg divide-y max-h-80 overflow-y-auto">
                {participants.map((p) => (
                  <label
                    key={p.id}
                    className="flex items-center p-3 hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="mr-3 w-5 h-5 text-blue-600"
                      checked={selectedParticipants.includes(p.id)}
                      onChange={(e) => {
                        if (e.target.checked)
                          setSelectedParticipants([
                            ...selectedParticipants,
                            p.id,
                          ]);
                        else
                          setSelectedParticipants(
                            selectedParticipants.filter((id) => id !== p.id)
                          );
                      }}
                    />
                    <div className="flex-1">
                      <p className="font-bold text-gray-800">{p.name}</p>
                      <p className="text-xs text-gray-500">
                        {p.curso} • {p.matricula}
                      </p>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold">
                      100% Presença
                    </span>
                  </label>
                ))}
                {participants.length === 0 && (
                  <p className="p-4 text-center text-gray-500">
                    Nenhum participante aprovado.
                  </p>
                )}
              </div>
              <p className="text-sm text-gray-600 text-right">
                Selecionados: <b>{selectedParticipants.length}</b>
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-gray-800 mb-2">
                  Resumo da Emissão
                </h4>
                <p className="text-sm text-gray-600">
                  Atividade: <b>{opportunity.title}</b>
                </p>
                <p className="text-sm text-gray-600">
                  Carga Horária: <b>{opportunity.ch}h</b>
                </p>
                <p className="text-sm text-gray-600">
                  Total de Certificados: <b>{selectedParticipants.length}</b>
                </p>
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={confirmations.load}
                    onChange={(e) =>
                      setConfirmations({
                        ...confirmations,
                        load: e.target.checked,
                      })
                    }
                  />{" "}
                  Confirmo que os participantes cumpriram a carga horária.
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={confirmations.report}
                    onChange={(e) =>
                      setConfirmations({
                        ...confirmations,
                        report: e.target.checked,
                      })
                    }
                  />{" "}
                  Confirmo a veracidade das informações do relatório.
                </label>
              </div>
              <p className="text-xs text-gray-500 bg-blue-50 p-2 rounded">
                📧 Os certificados serão enviados automaticamente por e-mail e
                terão hash único.
              </p>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-4 border-t">
            {step > 1 ? (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Voltar
              </Button>
            ) : (
              <div />
            )}
            {step < 3 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={step === 2 && selectedParticipants.length === 0}
              >
                Avancar
              </Button>
            ) : (
              <Button
                onClick={handleGenerate}
                variant="primary"
                icon={Award}
                disabled={!confirmations.load || !confirmations.report}
              >
                Gerar Certificados
              </Button>
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-12 animate-in zoom-in">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Certificados Emitidos!
          </h2>
          <p className="text-gray-500 mb-8">
            {selectedParticipants.length} certificados foram gerados e enviados.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" icon={Download}>
              Baixar Todos (ZIP)
            </Button>
            <Button onClick={onClose}>Fechar</Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

// 7. LANDING PAGE ATUALIZADA (RF0003, RF045, RF027)
// 7. LANDING PAGE ATUALIZADA (RF0003, RF045, RF027)
const LandingPage = ({ onLogin, onRegister }) => {
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
      {/* Barra Gov.br */}
      <div className="bg-[#071D41] text-white py-1">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider">Brasil</span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:underline opacity-80">
              Acesso à informação
            </a>
            <a href="#" className="hover:underline opacity-80">
              Participação Social
            </a>
            <a href="#" className="hover:underline opacity-80">
              Legislação
            </a>
          </div>
        </div>
      </div>

      {/* Header UFMA */}
      <header className="bg-gov-blue text-white shadow-md sticky top-0 z-40 h-20">
        <div className="max-w-7xl mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img
              src="/src/assets/PNG - Logo UFMA colorido.png"
              alt="Logo UFMA"
              className="h-12 w-auto object-contain"
            />
            <div>
              <h1 className="text-lg font-bold leading-tight text-white">
                Sistema de Extensão
              </h1>
              <p className="text-xs text-blue-100 opacity-90">
                Universidade Federal do Maranhão
              </p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() =>
                document
                  .getElementById("mural")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-sm font-semibold hover:text-accent-gold transition-colors"
            >
              Oportunidades
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("faq")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-sm font-semibold hover:text-accent-gold transition-colors"
            >
              Perguntas Frequentes
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("validar")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-sm font-semibold hover:text-accent-gold transition-colors"
            >
              Validar Certificado
            </button>
            <button
              onClick={onLogin}
              data-trigger="login"
              className="bg-white text-gov-blue px-6 py-2 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors shadow-sm"
            >
              Acesso Restrito
            </button>
            <button
              data-trigger="register"
              onClick={onRegister}
              className="hidden"
              aria-hidden="true"
            />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gov-blue-dark relative overflow-hidden text-white py-24">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold rounded-full blur-[128px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-[100px] opacity-10 -translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-block mb-4">
            <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
              Portal Oficial
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">
            Sistema de Extensão Universitária <br />
            <span className="text-accent-gold">UFMA</span>
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-10">
            A plataforma para gerenciar carga horária, emitir certificados
            Plataforma e ter controle das atividades.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={onRegister}
              className="px-8 py-4 bg-yellow-400 text-blue-900 rounded-gov font-bold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              Sou Aluno (Começar)
            </button>
            <button
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-gov font-bold text-lg backdrop-blur-sm transition-all"
              onClick={() =>
                document
                  .getElementById("validar")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Validar Certificado
            </button>
          </div>
        </div>
      </div>

      {/* Mural Público (RF0003 - Híbrido: Mostra dados limitados) */}
      <div id="mural" className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900">
            Mural de Oportunidades
          </h3>
          <p className="text-gray-500 mt-2">
            Atividades abertas para a comunidade
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {OPPORTUNITIES.filter((o) => o.public).map((opp) => (
            <div
              key={opp.id}
              className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow overflow-hidden group"
            >
              <div className="h-3 bg-red-800" />
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <Badge status={opp.type} />
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    Mural Público
                  </span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-800 transition-colors">
                  {opp.title}
                </h4>
                <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                  {opp.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {opp.ch}h
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> Até {opp.deadline}
                  </span>
                </div>
                <div className="bg-blue-50 p-3 rounded text-center text-sm text-blue-800 font-medium">
                  Faça login para ver vagas e se inscrever
                </div>
              </div>
            </div>
          ))}
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

      {/* FAQ e Footer (RF045, RF046) */}
      <div className="bg-white border-t py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Perguntas Frequentes
          </h3>
          <div className="space-y-4">
            <details className="group border rounded-lg p-4 open:bg-gray-50">
              <summary className="font-medium cursor-pointer list-none flex justify-between items-center text-gray-800">
                Como validar minhas horas complementares?
                <span className="transition group-open:rotate-180">
                  <ChevronRight />
                </span>
              </summary>
              <p className="text-gray-600 mt-4 text-sm leading-relaxed">
                Faça login no portal, clique em "Solicitar Horas", preencha o
                formulário com os dados da atividade e anexe o certificado em
                PDF. A coordenação tem até 10 dias para analisar.
              </p>
            </details>
            <details className="group border rounded-lg p-4 open:bg-gray-50">
              <summary className="font-medium cursor-pointer list-none flex justify-between items-center text-gray-800">
                Qual a carga horária mínima necessária?
                <span className="transition group-open:rotate-180">
                  <ChevronRight />
                </span>
              </summary>
              <p className="text-gray-600 mt-4 text-sm leading-relaxed">
                Para o curso de Ciência da Computação, são necessárias 345 horas
                de extensão integralizadas para a conclusão do curso.
              </p>
            </details>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-gray-400 py-12 text-sm">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div>
            <div className="font-bold text-white text-lg mb-4">UFMA</div>
            <p>Universidade Federal do Maranhão</p>
            <p>Cidade Universitária Dom Delgado</p>
          </div>
          <div>
            <div className="font-bold text-white mb-4">Links Úteis</div>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  Portal do Discente
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  SIGAA
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Documentos Normativos
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-bold text-white mb-4">Contato</div>
            <p>computacao@ufma.br</p>
            <p>(98) 3272-0000</p>
          </div>
        </div>
        <div className="text-center mt-12 pt-8 border-t border-gray-800">
          © 2024 UFMA - Ciência da Computação. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

// 6. PORTAL DE OPORTUNIDADES (RF013, RF014)
const OpportunitiesPage = () => {
  const [filterType, setFilterType] = useState("Todos");
  const [filterStatus, setFilterStatus] = useState("Abertas");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOpp, setSelectedOpp] = useState(null);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

  const filteredOpps = OPPORTUNITIES.filter((opp) => {
    if (filterType !== "Todos" && opp.type !== filterType) return false;
    if (filterStatus !== "Todos" && opp.status !== filterStatus) return false;
    if (
      searchTerm &&
      !opp.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <Input
            label="Buscar Oportunidades"
            placeholder="Ex: Python, Robótica..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-0"
          />
        </div>
        <div className="w-full md:w-48">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo
          </label>
          <select
            className="w-full border p-2 rounded-md"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option>Todos</option>
            <option>Projeto</option>
            <option>Curso</option>
            <option>Oficina</option>
            <option>Evento</option>
          </select>
        </div>
        <div className="w-full md:w-48">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            className="w-full border p-2 rounded-md"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option>Todos</option>
            <option>Abertas</option>
            <option>Em Execução</option>
            <option>Encerradas</option>
          </select>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            setFilterType("Todos");
            setFilterStatus("Abertas");
            setSearchTerm("");
          }}
        >
          Limpar
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOpps.map((opp) => (
          <div
            key={opp.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
          >
            <div
              className={`h-2 ${
                opp.type === "Curso"
                  ? "bg-purple-500"
                  : opp.type === "Projeto"
                  ? "bg-blue-500"
                  : "bg-pink-500"
              }`}
            />
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <Badge status={opp.type} />
                <Badge status={opp.status} />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2 leading-tight">
                {opp.title}
              </h3>
              <p className="text-gray-500 text-sm mb-4 line-clamp-3 flex-1">
                {opp.description}
              </p>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-gray-400" /> {opp.ch}h
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-gray-400" /> Até{" "}
                  {opp.deadline}
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-gray-400" />{" "}
                  {opp.vacancies - opp.filled} vagas restantes
                </div>
              </div>
              <Button onClick={() => setSelectedOpp(opp)} className="w-full">
                Ver Detalhes
              </Button>
            </div>
          </div>
        ))}
      </div>

      {selectedOpp && (
        <Modal
          isOpen={!!selectedOpp}
          onClose={() => setSelectedOpp(null)}
          title="Detalhes da Oportunidade"
          size="lg"
        >
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedOpp.title}
              </h2>
              <div className="flex gap-2">
                <Badge status={selectedOpp.type} />
                <Badge status={selectedOpp.status} />
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-bold">Responsável:</span>{" "}
                {selectedOpp.author}
              </div>
              <div>
                <span className="font-bold">Carga Horária:</span>{" "}
                {selectedOpp.ch}h
              </div>
              <div>
                <span className="font-bold">Vagas:</span>{" "}
                {selectedOpp.vacancies} total
              </div>
              <div>
                <span className="font-bold">Prazo:</span> {selectedOpp.deadline}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">
                Sobre a atividade
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {selectedOpp.description}
              </p>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setSelectedOpp(null)}>
                Fechar
              </Button>
              {selectedOpp.status === "Abertas" && (
                <Button
                  onClick={() => {
                    setIsEnrollModalOpen(true);
                    setSelectedOpp(null);
                  }}
                >
                  Inscrever-se
                </Button>
              )}
            </div>
          </div>
        </Modal>
      )}

      {isEnrollModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsEnrollModalOpen(false)}
          title="Confirmar Inscrição"
        >
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded text-blue-800 text-sm">
              Você está se inscrevendo para uma atividade de{" "}
              <strong>{selectedOpp?.ch}h</strong>.
            </div>
            <textarea
              className="w-full border p-3 rounded h-24"
              placeholder="Carta de motivação (Opcional)"
            />
            <div className="border-2 border-dashed p-4 rounded text-center text-gray-500 cursor-pointer hover:bg-gray-50">
              <Upload className="mx-auto mb-2" /> Anexar Currículo (PDF)
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" /> Confirmo que li os pré-requisitos.
            </label>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="ghost"
                onClick={() => setIsEnrollModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  alert("Inscrição realizada!");
                  setIsEnrollModalOpen(false);
                }}
              >
                Confirmar Inscrição
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

// 7. MINHAS SOLICITAÇÕES (RF024, RF023)
const RequestsPage = ({ setActiveModal }) => {
  const [activeTab, setActiveTab] = useState("Todas");
  const [selectedReq, setSelectedReq] = useState(null);
  const [resubmitMode, setResubmitMode] = useState(false);

  const tabs = ["Todas", "Pendente", "Aprovado", "Indeferido"];
  const myRequests = REQUESTS.filter((r) => r.student.includes("Talyson")); // Mock filter
  const filteredRequests =
    activeTab === "Todas"
      ? myRequests
      : myRequests.filter((r) => r.status === activeTab);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Minhas Solicitações
        </h2>
        <Button
          icon={PlusCircle}
          onClick={() => setActiveModal("requestHours")}
        >
          Nova Solicitação
        </Button>
      </div>

      <div className="flex gap-2 border-b">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
              activeTab === tab
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filteredRequests.map((req) => (
          <div
            key={req.id}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-full ${
                  req.status === "Aprovado"
                    ? "bg-green-100 text-green-600"
                    : req.status === "Indeferido"
                    ? "bg-red-100 text-red-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {req.status === "Aprovado" ? (
                  <CheckCircle size={24} />
                ) : req.status === "Indeferido" ? (
                  <XCircle size={24} />
                ) : (
                  <Clock size={24} />
                )}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{req.activity}</h3>
                <p className="text-sm text-gray-500">
                  {req.date} •{" "}
                  <span className="font-bold text-blue-600">
                    {req.ch_requested}h
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge status={req.status} />
              {req.status === "Indeferido" ? (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    setSelectedReq(req);
                    setResubmitMode(true);
                  }}
                >
                  Ver Parecer / Reenviar
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedReq(req);
                    setResubmitMode(false);
                  }}
                >
                  Ver Detalhes
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedReq && (
        <Modal
          isOpen={!!selectedReq}
          onClose={() => setSelectedReq(null)}
          title={
            resubmitMode
              ? "Reenviar Solicitação"
              : `Detalhes #${selectedReq.id}`
          }
          size="lg"
        >
          <div className="space-y-6">
            {resubmitMode && selectedReq.status === "Indeferido" && (
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <h4 className="font-bold text-red-800 flex items-center gap-2">
                  <AlertTriangle size={18} /> Motivo do Indeferimento:
                </h4>
                <p className="text-red-700 mt-1">
                  {selectedReq.reason || "Documentação incompleta."}
                </p>
              </div>
            )}

            {!resubmitMode && (
              <div className="relative pl-8 border-l-2 border-gray-200 space-y-6">
                {selectedReq.timeline?.map((event, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[39px] bg-white border-2 border-blue-500 rounded-full w-4 h-4"></div>
                    <p className="font-bold text-sm text-gray-900">
                      {event.event}
                    </p>
                    <p className="text-xs text-gray-500">
                      {event.date} - {event.user}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {resubmitMode ? (
              <div className="space-y-4">
                <div className="bg-yellow-50 p-3 text-sm text-yellow-800 rounded">
                  Você tem <strong>3 dias</strong> para corrigir e reenviar.
                </div>
                <textarea
                  className="w-full border p-3 rounded h-24"
                  defaultValue={selectedReq.description}
                />
                <div className="border border-dashed p-4 rounded text-center text-gray-500 cursor-pointer hover:bg-gray-50">
                  <Upload className="mx-auto mb-2" /> Anexar Documento Corrigido
                  (PDF)
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" onClick={() => setSelectedReq(null)}>
                    Cancelar
                  </Button>
                  <Button
                    onClick={() => {
                      alert("Reenviado!");
                      setSelectedReq(null);
                    }}
                  >
                    Reenviar Solicitação
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded text-sm">
                <p>
                  <strong>Atividade:</strong> {selectedReq.activity}
                </p>
                <p>
                  <strong>Descrição:</strong> {selectedReq.description}
                </p>
                <p className="mt-4 flex items-center gap-2 text-blue-600 cursor-pointer">
                  <FileText size={16} /> Visualizar Documento Anexado
                </p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

// 8. GALERIA DE CERTIFICADOS (RF028)
const CertificatesGalleryPage = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const myCerts = CERTIFICATES.filter((c) => c.student.includes("Talyson"));

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Meus Certificados
          </h2>
          <p className="text-gray-500">
            Total de {myCerts.length} certificados emitidos.
          </p>
        </div>
        <Button variant="outline" icon={Download}>
          Baixar Todos (ZIP)
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {myCerts.map((cert) => (
          <div
            key={cert.id}
            className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="h-40 bg-gray-50 flex flex-col items-center justify-center border-b p-4 relative">
              <div className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                <CheckCircle size={10} /> Validado
              </div>
              <Award size={40} className="text-blue-900 mb-2" />
              <h3 className="font-serif font-bold text-gray-900 text-center">
                {cert.activity}
              </h3>
              <p className="text-xs text-gray-500">
                Universidade Federal do Maranhão
              </p>
            </div>
            <div className="p-4">
              <div className="flex justify-between text-sm mb-4">
                <span className="text-gray-500">Carga Horária:</span>
                <span className="font-bold text-blue-700">{cert.ch}h</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  Visualizar
                </Button>
                <Button variant="ghost" icon={Download}></Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCert && (
        <Modal
          isOpen={!!selectedCert}
          onClose={() => setSelectedCert(null)}
          title="Certificado Digital"
          size="xl"
        >
          <div className="border-8 border-double border-gray-200 p-8 text-center relative bg-white">
            <img
              src="/placeholder-logo.png"
              className="h-16 mx-auto mb-6 opacity-50"
              alt="Logo UFMA"
            />
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">
              CERTIFICADO
            </h1>
            <p className="text-lg leading-loose text-gray-700 mb-8">
              Certificamos que{" "}
              <strong className="uppercase">{selectedCert.student}</strong>,
              matrícula {selectedCert.matricula}, participou da atividade de
              extensão{" "}
              <strong className="uppercase">{selectedCert.activity}</strong>,
              realizada no período de{" "}
              {selectedCert.dateStart || selectedCert.date} a{" "}
              {selectedCert.dateEnd || selectedCert.date}, totalizando uma carga
              horária de <strong>{selectedCert.ch} horas</strong>.
            </p>
            <div className="flex justify-between items-end mt-16 pt-8 border-t">
              <div className="text-left text-xs text-gray-500">
                <p>Autenticidade: {selectedCert.hash}</p>
                <p>
                  Emitido em: {selectedCert.dateIssued || selectedCert.date}
                </p>
              </div>
              <div className="text-center">
                <div className="w-32 h-0.5 bg-black mb-2"></div>
                <p className="font-bold">
                  {selectedCert.responsible || "Coordenação de Extensão"}
                </p>
                <p className="text-xs">Responsável</p>
              </div>
              <div>
                <QrCode size={64} className="text-gray-800" />
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <Button icon={Download}>Baixar PDF</Button>
            <Button variant="outline" icon={Share2}>
              Compartilhar
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

// MODAL DE COMUNICADO EM MASSA (RF044)
const MassNotificationModal = ({ onClose, userRole }) => {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    urgent: false,
    sendEmail: true,
  });

  const handleSend = () => {
    if (!formData.title || !formData.message) {
      alert("Preencha título e mensagem!");
      return;
    }

    alert(
      `📨 Comunicado Enviado!\n\n` +
        `Destinatários: Todos os Discentes (Padrão)\n` +
        `Título: ${formData.title}\n` +
        `${
          formData.sendEmail
            ? "✉️ E-mail enviado"
            : "🔔 Apenas notificação no sistema"
        }\n` +
        `${formData.urgent ? "⚠️ Marcado como URGENTE" : ""}`
    );

    onClose();
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Enviar Comunicado em Massa"
      size="lg"
    >
      <div className="space-y-6">
        {/* RF044 Info */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-sm text-blue-800">
          <strong>Info:</strong> Esta funcionalidade enviará um comunicado geral
          para todos os usuários ativos no sistema.
        </div>

        {/* Title */}
        <Input
          label="Título do Comunicado"
          placeholder="Ex: Prazo de inscrições UCE prorrogado"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />

        {/* Message */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Mensagem <span className="text-red-500">*</span>
          </label>
          <textarea
            className="w-full px-4 py-3 border-2 rounded-lg text-gray-800 text-base transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none resize-none"
            rows={6}
            placeholder="Digite a mensagem do comunicado..."
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.message.length} / 500 caracteres
          </p>
        </div>

        {/* Additional Options */}
        <div className="space-y-3 pt-4 border-t">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.urgent}
              onChange={(e) =>
                setFormData({ ...formData, urgent: e.target.checked })
              }
              className="w-4 h-4"
            />
            <div>
              <p className="font-medium text-gray-900">Marcar como urgente</p>
              <p className="text-xs text-gray-500">
                Comunicado aparecerá em destaque
              </p>
            </div>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.sendEmail}
              onChange={(e) =>
                setFormData({ ...formData, sendEmail: e.target.checked })
              }
              className="w-4 h-4"
            />
            <div>
              <p className="font-medium text-gray-900">
                Enviar também por e-mail
              </p>
              <p className="text-xs text-gray-500">
                Além da notificação no sistema
              </p>
            </div>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSend} icon={Mail}>
            Enviar Comunicado
          </Button>
        </div>
      </div>
    </Modal>
  );
};

// --- COMPONENTE PRINCIPAL DO APP ---

const App = () => {
  const [view, setView] = useState("landing"); // landing, login, register, dashboard
  const [subView, setSubView] = useState("dashboard"); // dashboard, opportunities, requests, gallery
  const [user, setUser] = useState(null);
  const [activeModal, setActiveModal] = useState(null); // 'createOpp', 'requestHours', 'analyze', 'enroll'

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  // Handlers
  // handleLogin removed - now done via LoginScreen component

  const openAnalysis = (req) => {
    setSelectedRequest(req);
    setActiveModal("analyze");
  };

  // --- SUB-DASHBOARDS ---

  // --- SUB-DASHBOARDS ---

  // Discente Dashboard (Talyson)
  const DiscenteView = ({ setSubView }) => (
    <div className="space-y-8 animate-in fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Olá, {user.name.split(" ")[0]}!
          </h2>
          <p className="text-gray-500">Ciência da Computação - 6º Período</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-3">
          <Button
            icon={PlusCircle}
            onClick={() => setActiveModal("requestHours")}
          >
            Solicitar Horas
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Progresso */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <BarChart2 className="text-blue-600" /> Progresso de
              Integralização
            </h3>
            <div className="relative pt-4 pb-8">
              <div className="flex justify-between mb-2 text-sm font-medium">
                <span className="text-gray-600">
                  Concluído: {user.hours.approved}h
                </span>
                <span className="text-gray-900 font-bold">Meta: 345h</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden flex">
                <div
                  className="bg-green-500 h-full"
                  style={{
                    width: `${(user.hours.approved / user.hours.total) * 100}%`,
                  }}
                />
                <div
                  className="bg-yellow-400 h-full opacity-75"
                  style={{
                    width: `${(user.hours.pending / user.hours.total) * 100}%`,
                  }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full" /> Aprovado
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full" /> Em
                  Análise
                </div>
                <div>Faltam {user.hours.total - user.hours.approved}h</div>
              </div>
            </div>
          </div>

          {/* Minhas Solicitações */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-800">
                Histórico de Solicitações
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSubView("requests")}
              >
                Ver Todas
              </Button>
            </div>
            <div className="divide-y divide-gray-50">
              {REQUESTS.filter((r) => r.student === user.name).map((req) => (
                <div
                  key={req.id}
                  className="p-4 hover:bg-gray-50 flex justify-between items-center transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2 rounded-lg ${
                        req.status === "Aprovado"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {req.activity}
                      </p>
                      <p className="text-xs text-gray-500">
                        {req.date} • {req.ch_requested}h
                      </p>
                    </div>
                  </div>
                  <Badge status={req.status} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Oportunidades Recomendadas (Inscrição Rápida RF014) */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-4">Inscrições Abertas</h3>
            <div className="space-y-4">
              {OPPORTUNITIES.filter((o) => o.status === "Abertas").map(
                (opp) => (
                  <div
                    key={opp.id}
                    className="border rounded-lg p-3 hover:border-blue-300 transition-colors cursor-pointer"
                    onClick={() => setActiveModal("enroll")}
                  >
                    <Badge status={opp.type} />
                    <h4 className="font-bold text-sm mt-2">{opp.title}</h4>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {opp.description}
                    </p>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-600">
                        {opp.vacancies - opp.filled} vagas restantes
                      </span>
                      <span className="text-xs text-blue-600 font-bold hover:underline">
                        Inscrever-se
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Certificados Rápidos (RF028) */}
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white p-6 rounded-xl shadow-lg">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <Award /> Meus Certificados
            </h3>
            <p className="text-blue-100 text-sm mb-4">
              Você possui 2 certificados disponíveis.
            </p>
            <Button
              variant="outline"
              className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => setSubView("gallery")}
            >
              Acessar Galeria
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  // --- 10. VALIDAÇÃO DASHBOARD (COORD UCE) - RF021 ---

  const DelegationModal = ({ request, onClose }) => {
    const [member, setMember] = useState("");
    const [notes, setNotes] = useState("");

    const handleDelegate = () => {
      alert(`Solicitação delegada para ${member}!`);
      onClose();
    };

    return (
      <Modal
        isOpen={true}
        onClose={onClose}
        title={`Delegar Solicitação #${request.id}`}
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-600 mb-4">
            Selecione um membro da comissão para analisar esta solicitação.
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Membro da Comissão
            </label>
            <select
              className="w-full border p-2 rounded"
              value={member}
              onChange={(e) => setMember(e.target.value)}
            >
              <option value="">Selecione...</option>
              {COMMISSION_MEMBERS.map((m) => (
                <option key={m.id} value={m.name}>
                  {m.name} ({m.department})
                </option>
              ))}
            </select>
          </div>
          <textarea
            className="w-full border p-2 rounded"
            rows="3"
            placeholder="Observações para o avaliador (opcional)..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <div className="flex gap-2">
            <input type="checkbox" id="email" defaultChecked />
            <label htmlFor="email" className="text-sm">
              Enviar notificação urgente por e-mail
            </label>
          </div>
          <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleDelegate} disabled={!member}>
              Confirmar Delegação
            </Button>
          </div>
        </div>
      </Modal>
    );
  };

  const ValidationPage = ({ onAnalyze }) => {
    const [tab, setTab] = useState("Pendentes");
    const [delegatingReq, setDelegatingReq] = useState(null);

    const pendingCount = REQUESTS.filter((r) => r.status === "Pendente").length;
    const criticalCount = REQUESTS.filter(
      (r) => r.status === "Pendente" && r.daysRemaining <= 2
    ).length;

    const getFilteredRequests = () => {
      if (tab === "Pendentes")
        return REQUESTS.filter((r) => r.status === "Pendente");
      if (tab === "Concluídas")
        return REQUESTS.filter((r) => r.status !== "Pendente");
      return REQUESTS;
    };

    return (
      <div className="space-y-6 animate-in fade-in">
        {/* Header Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-yellow-50 p-4 rounded-xl border-l-4 border-yellow-500">
            <p className="text-xs text-yellow-800 font-bold uppercase">
              Pendentes de Análise
            </p>
            <p className="text-3xl font-bold text-yellow-900">{pendingCount}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-xl border-l-4 border-red-500">
            <div className="flex justify-between">
              <p className="text-xs text-red-800 font-bold uppercase">
                Prazos Críticos
              </p>
              <AlertTriangle size={16} className="text-red-600" />
            </div>
            <p className="text-3xl font-bold text-red-900">{criticalCount}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-500">
            <p className="text-xs text-green-800 font-bold uppercase">
              Analisadas Hoje
            </p>
            <p className="text-3xl font-bold text-green-900">12</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
            <p className="text-xs text-blue-800 font-bold uppercase">
              Taxa de Deferimento
            </p>
            <p className="text-3xl font-bold text-blue-900">85%</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[500px]">
          {/* Tabs & Toolbar */}
          <div className="border-b px-6 py-4 flex flex-col md:flex-row justify-between gap-4">
            <div className="flex gap-4">
              {["Pendentes", "Concluídas", "Todas"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`pb-2 font-medium text-sm transition-colors ${
                    tab === t
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-3 text-gray-400"
                />
                <input
                  className="pl-9 pr-4 py-2 border rounded-lg text-sm w-64"
                  placeholder="Buscar por aluno ou atividade..."
                />
              </div>
              <Button variant="outline" icon={Filter}>
                Filtros
              </Button>
              <Button variant="outline" icon={Download} />
            </div>
          </div>

          {/* Request List */}
          <div className="divide-y">
            {getFilteredRequests().map((req) => (
              <div
                key={req.id}
                className="p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row gap-6"
              >
                {/* Left: Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge status={req.status} />
                    {req.priority === "critical" && (
                      <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded font-bold">
                        URGENTE
                      </span>
                    )}
                    {req.priority === "high" && (
                      <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded font-bold">
                        ALTA
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-lg text-gray-900">
                    {req.activity}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <User size={14} />{" "}
                    <span>
                      {req.student} ({req.matricula} - {req.studentPeriod})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <FileText size={14} />{" "}
                    <span>
                      {req.type} • {req.ch_requested}h solicitadas
                    </span>
                  </div>
                </div>

                {/* Center: Metadata */}
                <div className="flex-1 border-l pl-6 hidden md:block">
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {req.description}
                  </p>
                  <p className="text-xs text-gray-400">
                    Enviado em: {req.date}
                  </p>
                  <p className="text-sm text-blue-600 flex items-center gap-1 mt-2 cursor-pointer hover:underline">
                    <Eye size={14} /> Visualizar Documento
                  </p>
                </div>

                {/* Right: Actions */}
                <div className="w-48 flex flex-col gap-2 items-end justify-center">
                  {req.status === "Pendente" && (
                    <>
                      <div
                        className={`text-xs font-bold flex items-center gap-1 mb-2 ${
                          req.daysRemaining <= 2
                            ? "text-red-600"
                            : req.daysRemaining <= 5
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}
                      >
                        <Clock size={14} /> Vence em {req.daysRemaining} dias
                      </div>
                      <Button className="w-full" onClick={() => onAnalyze(req)}>
                        Analisar Agora
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setDelegatingReq(req)}
                      >
                        Delegar
                      </Button>
                    </>
                  )}
                  {req.status !== "Pendente" && (
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">
                        Analisado em
                      </p>
                      <p className="text-sm text-gray-500">15/12/2024</p>
                      <Button variant="ghost" className="mt-2" size="sm">
                        Ver Parecer
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {delegatingReq && (
          <DelegationModal
            request={delegatingReq}
            onClose={() => setDelegatingReq(null)}
          />
        )}
      </div>
    );
  };

  // --- 11. RELATÓRIOS DE CONCLUSÃO (COORD CURSO) - RF0005 ---

  const ConclusionReportPage = () => {
    const [selectedStudents, setSelectedStudents] = useState([]);

    const toggleSelect = (id) => {
      setSelectedStudents((prev) =>
        prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
      );
    };

    const handleGenerateReport = () => {
      if (selectedStudents.length === 0) {
        alert("Selecione pelo menos um aluno!");
        return;
      }

      const selectedData = COMPLETED_STUDENTS.filter((s) =>
        selectedStudents.includes(s.id)
      );

      // Generate CSV
      const csvContent = [
        [
          "Matrícula",
          "Nome Completo",
          "PPC",
          "Total de Horas",
          "Data de Conclusão",
          "Status",
        ].join(","),
        ...selectedData.map((s) =>
          [
            s.matricula,
            s.name,
            s.ppc,
            s.totalHours,
            s.completedAt,
            s.status,
          ].join(",")
        ),
      ].join("\n");

      // Download CSV
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `relatorio-conclusao-uce-${
        new Date().toISOString().split("T")[0]
      }.csv`;
      link.click();

      alert(
        `✅ Relatório Gerado com Sucesso!\n\n` +
          `📊 ${selectedData.length} alunos incluídos\n` +
          `📅 Semestre: ${CURR_SEM}\n\n` +
          `Este relatório deve ser enviado à Coordenação de Extensão (UCE) para o lançamento oficial no SIGAA.`
      );

      setSelectedStudents([]);
    };

    return (
      <div className="space-y-6 animate-in fade-in">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Relatórios de Conclusão - UCE
            </h2>
            <p className="text-gray-500">
              Alunos aptos para <strong>envio à Coordenação UCE</strong> para
              lançamento.
            </p>
            {/* NEW: Explanatory notice */}
            <div className="mt-3 bg-blue-50 border border-blue-200 p-3 rounded-lg text-sm text-blue-800">
              <strong>ℹ️ Info:</strong> Este relatório é para{" "}
              <strong>consulta e geração de documentação</strong>. O lançamento
              no SIGAA é feito pela{" "}
              <strong>Coordenação de Extensão (UCE)</strong>.
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" icon={FileText}>
              Gerar PDF Completo
            </Button>
            <Button
              onClick={handleGenerateReport}
              disabled={selectedStudents.length === 0}
              className={
                selectedStudents.length > 0
                  ? "bg-green-600 hover:bg-green-700" // Cor de destaque quando ativo
                  : ""
              }
              variant={selectedStudents.length > 0 ? "secondary" : "outline"} // Secondary style
              icon={Download}
            >
              Exportar CSV ({selectedStudents.length})
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <Card className="p-4 bg-white">
            <p className="text-gray-500 text-xs uppercase font-bold">
              Total de Concluintes
            </p>
            <p className="text-2xl font-bold">24</p>
          </Card>
          <Card className="p-4 bg-white">
            <p className="text-gray-500 text-xs uppercase font-bold">
              Taxa de Conclusão
            </p>
            <p className="text-2xl font-bold">18%</p>
          </Card>
          <Card className="p-4 bg-white">
            <p className="text-gray-500 text-xs uppercase font-bold">
              Média de Horas
            </p>
            <p className="text-2xl font-bold">348h</p>
          </Card>
          <Card className="p-4 bg-white">
            <p className="text-gray-500 text-xs uppercase font-bold">
              Tempo Médio
            </p>
            <p className="text-2xl font-bold">8 Semestres</p>
          </Card>
        </div>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="p-4 border-b bg-gray-50 flex justify-between">
            <div className="flex gap-4">
              <select className="border rounded p-1 text-sm">
                <option>Semestre 2024.2</option>
              </select>
              <select className="border rounded p-1 text-sm">
                <option>PPC 2022</option>
              </select>
            </div>
            <input
              placeholder="Buscar aluno..."
              className="border rounded px-3 py-1 text-sm w-64"
            />
          </div>
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 font-semibold border-b">
              <tr>
                <th className="p-4 w-4">
                  <input type="checkbox" />
                </th>
                <th className="p-4">Matrícula</th>
                <th className="p-4">Nome Completo</th>
                <th className="p-4">Ingresso</th>
                <th className="p-4 text-center">Total Horas</th>
                <th className="p-4">Conclusão</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {COMPLETED_STUDENTS.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.id)}
                      onChange={() => toggleSelect(student.id)}
                    />
                  </td>
                  <td className="p-4 font-mono text-gray-600">
                    {student.matricula}
                  </td>
                  <td className="p-4 font-medium text-gray-900">
                    {student.name}
                  </td>
                  <td className="p-4 text-gray-500">{student.ingresso}</td>
                  <td className="p-4 text-center font-bold text-green-700">
                    {student.totalHours}h
                  </td>
                  <td className="p-4 text-gray-500">{student.completedAt}</td>
                  <td className="p-4 text-center">
                    <Badge status="Aprovado" />
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="sm">
                      Detalhes
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Coord UCE View (Alexandre) - Foco em Análise
  const CoordUCEView = ({ setSubView }) => {
    const [showMassNotification, setShowMassNotification] = useState(false);

    return (
      <div className="space-y-6 animate-in fade-in">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-l-4 border-l-yellow-500">
            <p className="text-xs text-gray-500 uppercase font-bold">
              Pendentes
            </p>
            <p className="text-2xl font-bold text-gray-900">12</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-l-4 border-l-red-500">
            <p className="text-xs text-gray-500 uppercase font-bold">
              Prazos Críticos
            </p>
            <p className="text-2xl font-bold text-gray-900">3</p>
          </div>
        </div>

        {/* NEW: Communication Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Mail size={20} />
            Comunicação
          </h3>
          <div className="flex gap-3">
            <Button
              onClick={() => setShowMassNotification(true)}
              icon={Mail}
              variant="secondary"
            >
              Enviar Comunicado em Massa
            </Button>
            <div className="text-sm text-gray-600 flex items-center gap-2">
              Comunicar todos os discentes ou segmentos específicos
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b flex justify-between items-center bg-gray-50 rounded-t-xl">
            <h3 className="font-bold text-gray-800">
              Fila de Análise de Solicitações
            </h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSubView("validation")}
              >
                Ver Central de Validações
              </Button>
            </div>
          </div>
          <div className="divide-y">
            {REQUESTS.filter((r) => r.status === "Pendente")
              .slice(0, 3)
              .map((req) => (
                <div
                  key={req.id}
                  className="p-4 flex justify-between items-center"
                >
                  <span>
                    {req.student} - {req.activity}
                  </span>
                  <Badge status={req.status} />
                </div>
              ))}
          </div>
        </div>

        {/* Modal */}
        {showMassNotification && (
          <MassNotificationModal
            onClose={() => setShowMassNotification(false)}
            userRole="coord_uce"
          />
        )}
      </div>
    );
  };

  // Docente View (Anselmo)
  const DocenteView = () => (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestão de Extensão</h2>
        <Button icon={PlusCircle} onClick={() => setActiveModal("createOpp")}>
          Nova Oportunidade
        </Button>
      </div>

      {/* Meus Projetos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b bg-gray-50">
          <h3 className="font-bold text-gray-800">
            Oportunidades sob sua responsabilidade
          </h3>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-600 border-b">
            <tr>
              <th className="px-6 py-3">Título</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Inscritos</th>
              <th className="px-6 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {OPPORTUNITIES.filter((o) => o.author.includes("Anselmo")).map(
              (op) => (
                <tr key={op.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{op.title}</td>
                  <td className="px-6 py-4">
                    <Badge status={op.status} />
                  </td>
                  <td className="px-6 py-4">
                    {op.filled}/{op.vacancies}
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={Users}
                      onClick={() => {
                        setSelectedOpportunity(op);
                        setActiveModal("manageCandidates");
                      }}
                    >
                      Gerenciar
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={FileText}
                      onClick={() => {
                        setSelectedOpportunity(op);
                        setActiveModal("certification");
                      }}
                    >
                      Certificar
                    </Button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  // --- 12. CRIAÇÃO DE INICIATIVA ESTUDANTIL (DISCENTE DIRETOR) - RF0002 ---

  const CreateStudentInitiativeModal = ({ onClose, user }) => {
    const [step, setStep] = useState(1);
    const [data, setData] = useState({
      title: "",
      type: "Evento",
      description: "",
      ch: 4,
      target: "Ambos",
      docentId: "",
      groupName: "DACOMP",
      justification: "",
      resources: {
        space: false,
        equipment: false,
        support: false,
        certs: false,
      },
      period: { start: "", end: "" },
      inscriptionEnd: "",
      vacancies: "",
      terms: { reg: false, true: false },
      action: "draft",
    });

    const validateStep1 = () => {
      if (!data.title) return alert("Título é obrigatório");
      if (data.description.length < 50)
        return alert("Descrição muito curta (min 50)"); // Relaxado para 50 no mock
      if (data.ch < 4 || data.ch > 80 || data.ch % 2 !== 0)
        return alert("CH deve ser par, entre 4 e 80h");
      setStep(2);
    };

    const validateStep2 = () => {
      if (!data.docentId) return alert("Selecione um docente responsável");
      if (data.justification.length < 20)
        return alert("Justificativa muito curta");
      if (!Object.values(data.resources).some(Boolean))
        return alert("Selecione pelo menos um recurso");
      setStep(3);
    };

    const validateStep3 = () => {
      if (!data.period.start || !data.period.end)
        return alert("Período obrigatório");
      setStep(4);
    };

    const handleSubmit = () => {
      if (data.action !== "draft" && (!data.terms.reg || !data.terms.true))
        return alert("Aceite os termos para submeter");

      const docent = AVAILABLE_DOCENTS.find((d) => d.id == data.docentId);
      const newOpp = {
        id: Math.floor(Math.random() * 1000) + 2000,
        title: data.title,
        type: data.type,
        status: data.action === "draft" ? "Rascunho" : "Aguardando Aprovação",
        ch: data.ch,
        vacancies: data.vacancies || 0,
        filled: 0,
        deadline: data.inscriptionEnd,
        description: data.description,
        author: "DACOMP",
        authorName: user.name,
        public: false,
        candidates: [],
        responsibleDocent: data.docentId,
        docentName: docent ? docent.name : "",
        period: data.period,
        submitDate: new Date().toLocaleDateString(),
      };
      OPPORTUNITIES.push(newOpp);
      alert(
        data.action === "draft"
          ? "Rascunho salvo!"
          : `Iniciativa submetida para ${docent.name}!`
      );
      onClose();
    };

    return (
      <Modal
        isOpen={true}
        onClose={onClose}
        title="Nova Iniciativa Estudantil"
        size="lg"
      >
        {/* Steps */}
        <div className="flex gap-2 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full ${
                step >= i ? "bg-blue-800" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4 animate-in fade-in">
            <Input
              label="Título da Iniciativa"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Tipo</label>
                <select
                  className="w-full border p-2 rounded"
                  value={data.type}
                  onChange={(e) => setData({ ...data, type: e.target.value })}
                >
                  <option>Evento</option>
                  <option>Workshop</option>
                  <option>Palestra</option>
                  <option>Campeonato</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Público-alvo</label>
                <select
                  className="w-full border p-2 rounded"
                  value={data.target}
                  onChange={(e) => setData({ ...data, target: e.target.value })}
                >
                  <option>Graduação</option>
                  <option>Comunidade</option>
                  <option>Ambos</option>
                </select>
              </div>
            </div>
            <Input
              label="Carga Horária (4-80h, par)"
              type="number"
              value={data.ch}
              onChange={(e) => setData({ ...data, ch: e.target.value })}
            />
            <textarea
              className="w-full border p-2 rounded h-24"
              placeholder="Descrição detalhada..."
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-600">
              <label className="block text-sm font-bold text-blue-900 mb-1">
                Docente Responsável (Obrigatório)
              </label>
              <select
                className="w-full border p-2 rounded"
                value={data.docentId}
                onChange={(e) => setData({ ...data, docentId: e.target.value })}
              >
                <option value="">Selecione um professor...</option>
                {AVAILABLE_DOCENTS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.department})
                  </option>
                ))}
              </select>
              <p className="text-xs text-blue-700 mt-1">
                O docente selecionado precisará validar esta iniciativa.
              </p>
            </div>
            <Input label="Grupo Organizador" value={data.groupName} disabled />
            <textarea
              className="w-full border p-2 rounded h-20"
              placeholder="Justificativa e alinhamento com o curso..."
              value={data.justification}
              onChange={(e) =>
                setData({ ...data, justification: e.target.value })
              }
            />
            <div>
              <p className="text-sm font-bold mb-2">Recursos Necessários</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {Object.keys(data.resources).map((k) => (
                  <label key={k} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={data.resources[k]}
                      onChange={(e) =>
                        setData({
                          ...data,
                          resources: {
                            ...data.resources,
                            [k]: e.target.checked,
                          },
                        })
                      }
                    />
                    {k === "space"
                      ? "Espaço Físico"
                      : k === "equipment"
                      ? "Equipamentos"
                      : k === "support"
                      ? "Divulgação"
                      : "Certificação"}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Início"
                type="date"
                value={data.period.start}
                onChange={(e) =>
                  setData({
                    ...data,
                    period: { ...data.period, start: e.target.value },
                  })
                }
              />
              <Input
                label="Fim"
                type="date"
                value={data.period.end}
                onChange={(e) =>
                  setData({
                    ...data,
                    period: { ...data.period, end: e.target.value },
                  })
                }
              />
            </div>
            <Input
              label="Vagas (Opcional)"
              type="number"
              value={data.vacancies}
              onChange={(e) => setData({ ...data, vacancies: e.target.value })}
            />
            <div className="border border-dashed p-6 rounded text-center text-gray-500 cursor-pointer hover:bg-gray-50">
              <Upload className="mx-auto mb-2" /> Upload de Regulamento/Projeto
              (PDF)
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-gray-50 p-4 rounded border">
              <h3 className="font-bold flex items-center gap-2">
                <FileText size={18} /> Resumo
              </h3>
              <p className="text-sm">
                {data.title} ({data.type})
              </p>
              <div className="mt-2 text-sm text-blue-800 bg-blue-100 p-2 rounded flex items-center gap-2">
                <User size={14} />
                Responsável:{" "}
                <strong>
                  {AVAILABLE_DOCENTS.find((d) => d.id == data.docentId)?.name ||
                    "Não selecionado"}
                </strong>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={data.terms.reg}
                  onChange={(e) =>
                    setData({
                      ...data,
                      terms: { ...data.terms, reg: e.target.checked },
                    })
                  }
                />{" "}
                Li o regulamento de extensão.
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={data.terms.true}
                  onChange={(e) =>
                    setData({
                      ...data,
                      terms: { ...data.terms, true: e.target.checked },
                    })
                  }
                />{" "}
                As informações são verdadeiras.
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <label
                className={`border p-3 rounded cursor-pointer ${
                  data.action === "draft" ? "border-blue-500 bg-blue-50" : ""
                }`}
              >
                <input
                  type="radio"
                  name="act"
                  className="mr-2"
                  checked={data.action === "draft"}
                  onChange={() => setData({ ...data, action: "draft" })}
                />
                Salvar Rascunho
              </label>
              <label
                className={`border p-3 rounded cursor-pointer ${
                  data.action === "submit" ? "border-green-500 bg-green-50" : ""
                }`}
              >
                <input
                  type="radio"
                  name="act"
                  className="mr-2"
                  checked={data.action === "submit"}
                  onChange={() => setData({ ...data, action: "submit" })}
                />
                Submeter Agora
              </label>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6 pt-4 border-t">
          {step > 1 ? (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              Voltar
            </Button>
          ) : (
            <div />
          )}
          {step < 4 ? (
            <Button
              onClick={() => {
                if (step === 1) validateStep1();
                else if (step === 2) validateStep2();
                else if (step === 3) validateStep3();
              }}
            >
              Próximo <ArrowRight size={16} className="ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              variant={data.action === "submit" ? "primary" : "outline"}
            >
              {data.action === "submit"
                ? "Submeter Pedido"
                : "Concluir Rascunho"}
            </Button>
          )}
        </div>
      </Modal>
    );
  };

  // Discente Diretor Dashboard (Lucas - Híbrido)
  const DiscenteDiretorDashboard = () => {
    const [tab, setTab] = useState("pessoal");
    const [feedbackModal, setFeedbackModal] = useState(null);

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
          <DiscenteView setSubView={() => {}} />
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
              <Button
                variant="primary"
                icon={PlusCircle}
                onClick={() => setActiveModal("createStudentOpp")}
              >
                Nova Iniciativa
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-bold text-gray-800 mb-4">
                  Minhas Iniciativas
                </h3>
                <div className="space-y-4">
                  {OPPORTUNITIES.filter((o) => o.author === "DACOMP").map(
                    (op) => (
                      <div key={op.id} className="border p-4 rounded-lg">
                        <div className="flex justify-between mb-2">
                          <span className="font-bold text-gray-800 line-clamp-1">
                            {op.title}
                          </span>
                          <Badge
                            status={
                              op.status === "Abertas" ? "Aprovado" : op.status
                            }
                          />
                        </div>

                        {op.status === "Rascunho" && (
                          <div className="bg-gray-100 text-gray-600 text-xs p-2 rounded mt-2 mb-2 flex items-center gap-2">
                            <File size={12} /> Rascunho salvo.
                          </div>
                        )}
                        {op.status === "Aguardando Aprovação" && (
                          <div className="bg-yellow-50 text-yellow-800 text-xs p-2 rounded mt-2 mb-2 flex items-center gap-2">
                            <Clock size={12} /> Aguardando validação de{" "}
                            {op.docentName
                              ? op.docentName.split(" ")[0]
                              : "Docente"}
                          </div>
                        )}

                        <div className="flex gap-2 mt-3">
                          {op.status === "Rascunho" && (
                            <>
                              <Button
                                variant="outline"
                                className="text-xs py-1 h-8"
                              >
                                Editar
                              </Button>
                              <Button className="text-xs py-1 h-8">
                                Submeter
                              </Button>
                            </>
                          )}
                          {op.status === "Aguardando Aprovação" && (
                            <Button
                              variant="ghost"
                              className="text-xs py-1 h-8"
                              onClick={() => setFeedbackModal(op)}
                            >
                              Ver Status
                            </Button>
                          )}
                          {op.status === "Abertas" && (
                            <>
                              <Button
                                variant="outline"
                                className="text-xs py-1 h-8"
                              >
                                Editar
                              </Button>
                              <Button
                                variant="ghost"
                                className="text-xs py-1 h-8"
                              >
                                Gerenciar
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </Card>
              <Card className="p-6">
                <h3 className="font-bold text-gray-800 mb-4">
                  Mural de Avisos da Coordenação
                </h3>
                <div className="bg-blue-50 p-4 rounded text-sm text-blue-900 mb-4">
                  <p className="font-bold mb-1">Prazo de Submissão 2024.2</p>
                  <p>Iniciativas devem ser submetidas até 15/02.</p>
                </div>
              </Card>
            </div>
          </div>
        )}

        {feedbackModal && (
          <Modal
            isOpen={true}
            onClose={() => setFeedbackModal(null)}
            title="Status da Iniciativa"
            size="md"
          >
            <div className="text-center py-6">
              <Clock size={48} className="mx-auto text-yellow-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Aguardando Validação
              </h3>
              <p className="text-gray-600 mb-6">
                A iniciativa <strong>{feedbackModal.title}</strong> foi enviada
                para análise de <strong>{feedbackModal.docentName}</strong> em{" "}
                {feedbackModal.submitDate || "12/12/2024"}.
              </p>
              <div className="bg-gray-50 p-4 rounded text-sm text-left mb-6">
                <p>
                  <strong>Prazo estimado:</strong> 5 dias úteis
                </p>
                <p>Você será notificado assim que houver uma decisão.</p>
              </div>
              <Button onClick={() => setFeedbackModal(null)}>Entendi</Button>
            </div>
          </Modal>
        )}
      </div>
    );
  };

  // Coordenador Curso Dashboard (Darlan)
  const CoordCursoDashboard = () => (
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
          <p className="text-xs text-gray-500 uppercase">
            Concluintes Extensão
          </p>
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
        <h3 className="font-bold text-gray-800 mb-4">Comunicados em Massa</h3>
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

  // Layout do Dashboard
  const DashboardLayout = ({ children, setSubView, currentView }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);

    return (
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-blue-900 text-white transform transition-transform md:relative md:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6 flex justify-between items-center border-b border-blue-800">
            <span className="font-bold text-xl">UFMA Extensão</span>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden">
              <X />
            </button>
          </div>

          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-blue-700 border-2 border-white flex items-center justify-center font-bold">
                {user.name.substring(0, 2)}
              </div>
              <div className="overflow-hidden">
                <p className="font-medium truncate">{user.name}</p>
                <p className="text-xs text-blue-300 capitalize">
                  {user.role.replace("_", " ")}
                </p>
              </div>
            </div>

            <nav className="space-y-1">
              <Button
                variant={currentView === "dashboard" ? "secondary" : "ghost"}
                className={`w-full justify-start ${
                  currentView === "dashboard"
                    ? "bg-blue-800 text-white sidebar-active"
                    : "text-white/90 hover:bg-blue-800 hover:text-white"
                }`}
                icon={BarChart2}
                onClick={() => setSubView("dashboard")}
              >
                Dashboard
              </Button>
              {user.role === "discente" && (
                <>
                  <Button
                    variant={
                      currentView === "opportunities" ? "secondary" : "ghost"
                    }
                    className={`w-full justify-start ${
                      currentView === "opportunities"
                        ? "bg-blue-800 text-white sidebar-active"
                        : "text-white/90 hover:bg-blue-800 hover:text-white"
                    }`}
                    icon={Search}
                    onClick={() => setSubView("opportunities")}
                  >
                    Oportunidades
                  </Button>
                  <Button
                    variant={currentView === "requests" ? "secondary" : "ghost"}
                    className={`w-full justify-start ${
                      currentView === "requests"
                        ? "bg-blue-800 text-white sidebar-active"
                        : "text-white/90 hover:bg-blue-800 hover:text-white"
                    }`}
                    icon={FileText}
                    onClick={() => setSubView("requests")}
                  >
                    Solicitações
                  </Button>
                  <Button
                    variant={currentView === "gallery" ? "secondary" : "ghost"}
                    className={`w-full justify-start ${
                      currentView === "gallery"
                        ? "bg-blue-800 text-white sidebar-active"
                        : "text-white/90 hover:bg-blue-800 hover:text-white"
                    }`}
                    icon={Award}
                    onClick={() => setSubView("gallery")}
                  >
                    Certificados
                  </Button>
                </>
              )}
              {user.role.includes("coord") && (
                <>
                  {user.role === "coord_uce" && (
                    <Button
                      variant={
                        currentView === "validation" ? "secondary" : "ghost"
                      }
                      className={`w-full justify-start ${
                        currentView === "validation"
                          ? "bg-blue-800 text-white sidebar-active"
                          : "text-white/90 hover:bg-blue-800 hover:text-white"
                      }`}
                      icon={CheckCircle}
                      onClick={() => setSubView("validation")}
                    >
                      Validações (UCE)
                    </Button>
                  )}
                  {user.role === "coord_curso" && (
                    <Button
                      variant={
                        currentView === "conclusion" ? "secondary" : "ghost"
                      }
                      className={`w-full justify-start ${
                        currentView === "conclusion"
                          ? "bg-blue-800 text-white sidebar-active"
                          : "text-white/90 hover:bg-blue-800 hover:text-white"
                      }`}
                      icon={Award}
                      onClick={() => setSubView("conclusion")}
                    >
                      Relatórios de Conclusão
                    </Button>
                  )}
                </>
              )}
            </nav>
          </div>

          <div className="absolute bottom-0 w-full p-6 border-t border-blue-800">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-300 hover:bg-blue-800"
              icon={LogOut}
              onClick={() => setView("landing")}
            >
              Sair
            </Button>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 z-20">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-gray-600"
            >
              <Menu />
            </button>
            <h2 className="text-lg font-semibold text-gray-700 hidden md:block">
              Semestre {CURR_SEM}
            </h2>

            {/* Notificações (RF043) */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 hover:bg-gray-100 rounded-full text-gray-600"
              >
                <Bell />
                {user.notifications.some((n) => !n.read) && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white" />
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="p-3 border-b font-bold text-gray-700 flex justify-between">
                    Notificações
                    <span className="text-xs text-blue-600 cursor-pointer font-normal mt-1">
                      Marcar todas como lidas
                    </span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {user.notifications.length > 0 ? (
                      user.notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${
                            !n.read ? "bg-blue-50/50" : ""
                          }`}
                        >
                          <p className="text-sm font-bold text-gray-800">
                            {n.title}
                          </p>
                          <p className="text-sm text-gray-600">{n.msg}</p>
                          <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500 text-sm">
                        Nenhuma notificação nova.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    );
  };

  // --- ROTEAMENTO ---

  if (view === "register")
    return (
      <RegistrationFlow
        onCancel={() => setView("landing")}
        onComplete={() => setView("login")}
      />
    );

  if (view === "login") {
    return (
      <LoginScreen
        onCancel={() => setView("landing")}
        onSuccess={(selectedUser) => {
          setUser(selectedUser);
          setView("dashboard");
          setSubView("dashboard");
        }}
      />
    );
  }

  if (view === "dashboard" && user) {
    return (
      <DashboardLayout setSubView={setSubView} currentView={subView}>
        {subView === "dashboard" && user.role === "discente" && (
          <DiscenteView setSubView={setSubView} />
        )}
        {subView === "opportunities" && <OpportunitiesPage />}
        {subView === "requests" && (
          <RequestsPage setActiveModal={setActiveModal} />
        )}
        {subView === "gallery" && <CertificatesGalleryPage />}
        {/* Outras roles mantêm a view padrão por enquanto */}
        {(subView === "dashboard" || !["discente"].includes(user.role)) && (
          <>
            {user.role === "coord_uce" && subView === "dashboard" && (
              <CoordUCEView setSubView={setSubView} />
            )}
            {user.role === "coord_uce" && subView === "validation" && (
              <ValidationPage onAnalyze={openAnalysis} />
            )}

            {user.role === "docente" && <DocenteView />}

            {user.role === "coord_curso" && subView === "dashboard" && (
              <CoordCursoDashboard />
            )}
            {user.role === "coord_curso" && subView === "conclusion" && (
              <ConclusionReportPage />
            )}

            {user.role === "discente_diretor" && <DiscenteDiretorDashboard />}
          </>
        )}
        {/* MODAIS GLOBAIS */}
        {activeModal === "createOpp" && (
          <CreateOppWizard onClose={() => setActiveModal(null)} />
        )}
        {activeModal === "requestHours" && (
          <RequestHoursModal onClose={() => setActiveModal(null)} />
        )}
        {activeModal === "analyze" && (
          <AnalysisModal
            request={selectedRequest}
            onClose={() => setActiveModal(null)}
          />
        )}
        {activeModal === "manageCandidates" && (
          <ManageCandidatesModal
            opportunity={selectedOpportunity}
            onClose={() => setActiveModal(null)}
          />
        )}
        {activeModal === "certification" && (
          <CertificationModal
            opportunity={selectedOpportunity}
            user={user}
            onClose={() => setActiveModal(null)}
          />
        )}
        {activeModal === "createStudentOpp" && (
          <CreateStudentInitiativeModal
            user={user}
            onClose={() => setActiveModal(null)}
          />
        )}
      </DashboardLayout>
    );
  }

  return (
    <LandingPage
      onLogin={() => setView("login")}
      onRegister={() => setView("register")}
    />
  );
};

export default App;
