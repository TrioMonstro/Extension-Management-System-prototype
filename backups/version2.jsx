import React, { useState, useEffect, useRef } from "react";
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
  Mail,
  Save,
  Trash2,
  MoreVertical,
  File,
} from "lucide-react";

/**
 * --- MOCK DATA EXPANDIDO (Nível 2) ---
 */

const CURR_SEM = "2024.2";

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
        curso: "CC",
        periodo: "4º",
        status: "Pendente",
      },
      {
        id: 902,
        name: "Maria Costa",
        curso: "EC",
        periodo: "6º",
        status: "Aprovado",
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
];

const REQUESTS = [
  {
    id: 501,
    student: "Talyson Renan",
    matricula: "2021003456",
    type: "Externo",
    activity: "Curso Udemy - React Avançado",
    ch_requested: 20,
    date: "12/12/2024",
    status: "Pendente",
    document: "cert_udemy.pdf",
    description: "Curso de 20h sobre hooks e context API.",
    history: [
      { event: "Enviado", date: "12/12/2024 14:30", user: "Talyson Renan" },
    ],
  },
  {
    id: 502,
    student: "Maria Silva",
    matricula: "2021009988",
    type: "Externo",
    activity: "Bootcamp Rocketseat",
    ch_requested: 40,
    date: "10/12/2024",
    status: "Aprovado",
    document: "cert_rocket.pdf",
    description: "Bootcamp intensivo.",
    history: [],
  },
];

// --- COMPONENTES UI REUTILIZÁVEIS ---

const Badge = ({ status }) => {
  const styles = {
    Abertas: "bg-green-100 text-green-800",
    Aprovado: "bg-green-100 text-green-800",
    Deferido: "bg-green-100 text-green-800",
    "Em Execução": "bg-blue-100 text-blue-800",
    Pendente: "bg-yellow-100 text-yellow-800",
    "Aguardando Aprovação": "bg-yellow-100 text-yellow-800",
    Rascunho: "bg-gray-100 text-gray-800",
    Encerrada: "bg-red-100 text-red-800",
    Indeferido: "bg-red-100 text-red-800",
    Curso: "bg-purple-100 text-purple-800",
    Evento: "bg-indigo-100 text-indigo-800",
  };
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-bold ${
        styles[status] || "bg-gray-100"
      } border border-black/5`}
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
    "flex items-center justify-center px-4 py-2 rounded-md transition-all font-medium focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-red-800 hover:bg-red-900 text-white focus:ring-red-500",
    secondary: "bg-blue-900 hover:bg-blue-800 text-white focus:ring-blue-500",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
    danger: "bg-red-50 text-red-700 hover:bg-red-100 border border-red-200",
    ghost: "text-gray-600 hover:bg-gray-100",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {Icon && <Icon size={16} className="mr-2" />}
      {children}
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
      <div
        className={`bg-white rounded-xl shadow-2xl w-full ${sizes[size]} max-h-[90vh] overflow-y-auto`}
      >
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X />
          </button>
        </div>
        <div className="p-6">{children}</div>
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
}) => (
  <div className={`mb-4 ${className}`}>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
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

// 2. WIZARD DE CRIAÇÃO DE OPORTUNIDADE (RF011, RF012)
const CreateOppWizard = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    title: "",
    type: "Projeto",
    ch: "",
    vacancies: "",
    description: "",
  });

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
            label="Título da Oportunidade"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            placeholder="Ex: Curso de Python"
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo
              </label>
              <select className="w-full border rounded-md p-2">
                <option>Projeto</option>
                <option>Curso</option>
                <option>Evento</option>
                <option>Oficina</option>
              </select>
            </div>
            <Input
              label="Carga Horária (h)"
              type="number"
              value={data.ch}
              onChange={(e) => setData({ ...data, ch: e.target.value })}
            />
          </div>
          <Input
            label="Descrição Detalhada"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4 animate-in fade-in">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Início Inscrições" type="date" />
            <Input label="Fim Inscrições" type="date" />
          </div>
          <Input
            label="Número de Vagas"
            type="number"
            value={data.vacancies}
            onChange={(e) => setData({ ...data, vacancies: e.target.value })}
          />
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500 cursor-pointer hover:bg-gray-50">
            <Upload className="mx-auto mb-2" />
            <p>Anexar Edital ou Regulamento (PDF)</p>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4 animate-in fade-in bg-gray-50 p-6 rounded-lg">
          <h4 className="font-bold text-gray-900">Revisão</h4>
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <span className="text-gray-500">Título:</span>{" "}
            <span className="font-medium">{data.title}</span>
            <span className="text-gray-500">Tipo:</span>{" "}
            <span className="font-medium">{data.type}</span>
            <span className="text-gray-500">CH:</span>{" "}
            <span className="font-medium">{data.ch}h</span>
            <span className="text-gray-500">Vagas:</span>{" "}
            <span className="font-medium">{data.vacancies}</span>
          </div>
          <div className="bg-yellow-50 p-3 rounded text-sm text-yellow-800 border border-yellow-200 mt-4">
            <AlertTriangle size={16} className="inline mr-2" />
            Ao publicar, a oportunidade ficará visível para todos os discentes.
          </div>
        </div>
      )}

      <div className="flex justify-between mt-8 border-t pt-4">
        {step > 1 ? (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            Voltar
          </Button>
        ) : (
          <div />
        )}
        {step < 3 ? (
          <Button onClick={() => setStep(step + 1)}>
            Próximo <ArrowRight size={16} className="ml-2" />
          </Button>
        ) : (
          <Button
            onClick={() => {
              alert("Oportunidade Criada!");
              onClose();
            }}
            variant="secondary"
            icon={Check}
          >
            Publicar Oportunidade
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
        <Input
          label="Atividade Realizada"
          placeholder="Ex: Curso de React - Udemy"
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

// 5. LANDING PAGE ATUALIZADA (RF0003, RF045)
const LandingPage = ({ onLogin, onRegister }) => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
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
              className="hidden md:block text-gray-600 hover:text-red-800 font-medium px-3 py-2"
            >
              Oportunidades
            </a>
            <Button variant="ghost" onClick={onRegister}>
              Criar Conta
            </Button>
            <Button variant="primary" onClick={onLogin}>
              Acesso Restrito
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-blue-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-5xl font-bold mb-6 tracking-tight">
            Extensão Universitária Simplificada
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
            A plataforma oficial para gerenciar carga horária, emitir
            certificados e conectar a UFMA à sociedade.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={onRegister}
              className="bg-red-600 hover:bg-red-700 text-lg px-8 py-4 h-auto"
            >
              Sou Aluno (Começar)
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-4 h-auto"
            >
              Validar Certificado
            </Button>
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
    </div>
  );
};

// --- COMPONENTE PRINCIPAL DO APP ---

const App = () => {
  const [view, setView] = useState("landing"); // landing, login, register, dashboard
  const [user, setUser] = useState(null);
  const [activeModal, setActiveModal] = useState(null); // 'createOpp', 'requestHours', 'analyze', 'enroll'

  const [selectedRequest, setSelectedRequest] = useState(null);

  // Handlers
  const handleLogin = (selectedUser) => {
    setUser(selectedUser);
    setView("dashboard");
  };

  const openAnalysis = (req) => {
    setSelectedRequest(req);
    setActiveModal("analyze");
  };

  // --- SUB-DASHBOARDS ---

  // Discente Dashboard (Talyson)
  const DiscenteView = () => (
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
              <Button variant="ghost" size="sm">
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
            >
              Acessar Galeria
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  // Coord UCE View (Alexandre) - Foco em Análise
  const CoordUCEView = () => (
    <div className="space-y-6 animate-in fade-in">
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-l-4 border-l-yellow-500">
          <p className="text-xs text-gray-500 uppercase font-bold">Pendentes</p>
          <p className="text-2xl font-bold text-gray-900">12</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-l-4 border-l-red-500">
          <p className="text-xs text-gray-500 uppercase font-bold">
            Prazos Críticos
          </p>
          <p className="text-2xl font-bold text-gray-900">3</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b flex justify-between items-center bg-gray-50 rounded-t-xl">
          <h3 className="font-bold text-gray-800">
            Fila de Análise de Solicitações (RF021)
          </h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" icon={Filter}>
              Filtrar
            </Button>
          </div>
        </div>
        <div className="divide-y">
          {REQUESTS.filter((r) => r.status === "Pendente").map((req) => (
            <div
              key={req.id}
              className="p-4 flex items-center justify-between hover:bg-blue-50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                  {req.student.substring(0, 2)}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{req.student}</p>
                  <p className="text-sm text-gray-500">
                    {req.activity} •{" "}
                    <span className="text-blue-600 font-medium">
                      {req.ch_requested}h
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded flex items-center gap-1">
                  <Clock size={12} /> Vence em 8 dias
                </span>
                <Button onClick={() => openAnalysis(req)} size="sm">
                  Analisar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

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
                    <Button variant="ghost" size="sm" icon={Users}>
                      Gerenciar
                    </Button>
                    <Button variant="ghost" size="sm" icon={FileText}>
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

  // Layout do Dashboard
  const DashboardLayout = ({ children }) => {
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
                variant="ghost"
                className="w-full justify-start text-blue-100 hover:bg-blue-800"
                icon={BarChart2}
              >
                Dashboard
              </Button>
              {user.role === "discente" && (
                <>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-blue-100 hover:bg-blue-800"
                    icon={Search}
                  >
                    Oportunidades
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-blue-100 hover:bg-blue-800"
                    icon={FileText}
                  >
                    Solicitações
                  </Button>
                </>
              )}
              {user.role.includes("coord") && (
                <Button
                  variant="ghost"
                  className="w-full justify-start text-blue-100 hover:bg-blue-800"
                  icon={CheckCircle}
                >
                  Validações
                </Button>
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
    // Login Mockado
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full animate-in zoom-in">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-red-800 rounded-lg flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
              U
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Acesso ao Sistema
            </h2>
            <p className="text-gray-500">Selecione uma persona para testar</p>
          </div>
          <div className="space-y-3">
            {Object.values(USERS).map((u) => (
              <button
                key={u.id}
                onClick={() => handleLogin(u)}
                className="w-full p-3 border rounded-lg hover:bg-blue-50 text-left flex items-center gap-3 transition-colors"
              >
                <div
                  className={`p-2 rounded-full ${
                    u.role === "discente"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {u.role === "discente" ? (
                    <User size={18} />
                  ) : (
                    <BookOpen size={18} />
                  )}
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-800">{u.name}</p>
                  <p className="text-xs text-gray-500 capitalize">
                    {u.role.replace("_", " ")}
                  </p>
                </div>
              </button>
            ))}
          </div>
          <Button
            variant="ghost"
            onClick={() => setView("landing")}
            className="w-full mt-6"
          >
            Voltar
          </Button>
        </div>
      </div>
    );
  }

  if (view === "dashboard" && user) {
    return (
      <DashboardLayout>
        {user.role === "discente" && <DiscenteView />}
        {user.role === "coord_uce" && <CoordUCEView />}
        {user.role === "docente" && <DocenteView />}
        {(user.role === "coord_curso" || user.role === "discente_diretor") && (
          <div className="text-center p-10 text-gray-500">
            Dashboard em desenvolvimento...
          </div>
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
        {activeModal === "enroll" && (
          <Modal
            isOpen={true}
            onClose={() => setActiveModal(null)}
            title="Confirmar Inscrição"
          >
            <p className="mb-4 text-gray-600">
              Você está se inscrevendo em{" "}
              <strong>Introdução à Inteligência Artificial</strong>.
            </p>
            <Input
              label="Motivação (Opcional)"
              placeholder="Por que deseja participar?"
            />
            <div className="flex justify-end gap-3 mt-4">
              <Button variant="ghost" onClick={() => setActiveModal(null)}>
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  alert("Inscrição realizada!");
                  setActiveModal(null);
                }}
              >
                Confirmar
              </Button>
            </div>
          </Modal>
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
