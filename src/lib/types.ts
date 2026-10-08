export type UserRole = 'admin_ivna' | 'psicologo' | 'rh' | 'gestor' | 'colaborador';

export interface UserProfile {
  id: string;
  nome: string;
  email: string;
  role: UserRole;
  avatar: string;
  cargo: string;
  registroProfissional?: string;
  instituicao?: string;
}

export interface SessaoSOAP {
  id: string;
  numero: number;
  data: string;
  tipo: 'Individual' | 'Plantão Psicológico' | 'Retorno' | 'Pericial Ocupacional';
  subjetivo: string; // S: Relato do trabalhador, percepções e queixas
  objetivo: string;   // O: Observações do psicólogo, dados observáveis e psicometria
  avaliacao: string;  // A: Hipótese diagnóstica, correlação ocupacional e evolução clínica
  plano: string;      // P: Condutas terapêuticas, pactuações, encaminhamentos e intervenções
  psicologo: string;
}

export interface PacienteProntuario {
  id: string;
  nome: string;
  matricula: string;
  setor: string;
  cargo: string;
  idade: number;
  admissao: string;
  status: 'Em Acompanhamento' | 'Alta Clínica' | 'Afastado (INSS)' | 'Triagem Inicial';
  riscoGravidade: 'Baixo' | 'Moderado' | 'Alto' | 'Crítico';
  queixaPrincipal: string;
  diagnosticoPreliminar: string;
  cidProvavel?: string;
  psicologoResponsavel: string;
  escalas: {
    mbiBurnout: number;       // 0 a 100
    ansiedadeGad7: number;    // 0 a 21
    depressaoPhq9: number;    // 0 a 27
    estressePercebido: number;// 0 a 40
    historico: Array<{
      data: string;
      burnout: number;
      ansiedade: number;
      estresse: number;
    }>;
  };
  sessoes: SessaoSOAP[];
  resumoIA?: {
    conteudo: string;
    dataGeracao: string;
    geradoPor: string;
  };
}

export interface MatchResultado {
  percentualMatch: number;
  nivelAderencia: 'Excelente' | 'Alto' | 'Moderado' | 'Baixo';
  resumoExecutivo: string;
  pontosFortes: string[];
  lacunas: string[];
  fitPsicossocial: string;
  perguntasEntrevista: string[];
  dataCalculo?: string;
}

export interface Vaga {
  id: string;
  titulo: string;
  area: string;
  setor: string;
  modelo: 'Presencial' | 'Híbrido' | 'Remoto';
  nivel: 'Júnior' | 'Pleno' | 'Sênior' | 'Especialista' | 'Liderança';
  faixaSalarial: string;
  status: 'Aberta' | 'Em Triagem' | 'Finalizada';
  descricao: string;
  requisitos: string[];
  competenciasDesejadas: string[];
  riscoPsicossocialCargo: 'Baixo' | 'Moderado' | 'Alto';
  fatoresEstressores: string[];
  candidatosInscritos: string[]; // IDs de candidatos
}

export interface Candidato {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  avatar: string;
  formacao: string;
  cargoAtual: string;
  experiencia: string;
  pretensaoSalarial: string;
  habilidadesTecnicas: string[];
  softSkills: string[];
  bio: string;
  vagasAplicadas: string[];
  statusProcesso: 'Inscrito' | 'Em Análise' | 'Entrevista' | 'Aprovado' | 'Banco de Talentos';
  matchesPorVaga?: Record<string, MatchResultado>;
}

export interface RiscoNR01 {
  id: string;
  titulo: string;
  setor: string;
  cargo: string;
  categoria: 'Organização do Trabalho' | 'Condições Ambientais' | 'Relações Interpessoais' | 'Sobrecarga Cognitiva';
  fatorEstressor: string;
  consequenciasPossiveis: string;
  probabilidade: number; // 1 a 5
  severidade: number;    // 1 a 5
  nivelRiscoCalculado: 'Trivial' | 'Tolerável' | 'Moderado' | 'Substancial' | 'Crítico';
  statusControle: 'Pendente' | 'Em Implementação' | 'Controlado';
  acoesPreventivas: {
    primaria: string[];
    secundaria: string[];
    terciaria: string[];
  };
  prazoRevisao: string;
}

export interface AnaliseNR01Resultado {
  diagnosticoGeral: string;
  riscosPrioritarios: Array<{
    id: string;
    titulo: string;
    categoria: string;
    severidade: string;
    probabilidade: string;
    nivelRisco: string;
    justificativa: string;
  }>;
  planoAcao: {
    prevencaoPrimaria: Array<{ acao: string; responsavel: string; prazo: string; indicador: string }>;
    prevencaoSecundaria: Array<{ acao: string; responsavel: string; prazo: string; indicador: string }>;
    prevencaoTerciaria: Array<{ acao: string; responsavel: string; prazo: string; indicador: string }>;
  };
  alinhamentoPGR: string;
}

export interface CursoCapacitacao {
  id: string;
  titulo: string;
  categoria: 'NR-01 Obrigatório' | 'Saúde Mental & Liderança' | 'Ergonomia Cognitiva' | 'Comunicação Não-Violenta';
  cargaHoraria: string;
  instrutor: string;
  modulos: Array<{ titulo: string; duracao: string; concluido?: boolean }>;
  publicoAlvo: string;
  obrigatorio: boolean;
  progresso: number;
  totalAlunos: number;
  descricao: string;
  badge?: string;
}

export interface AgendamentoSessao {
  id: string;
  pacienteId: string;
  pacienteNome: string;
  setor: string;
  psicologoNome: string;
  data: string;
  horario: string;
  tipo: 'Plantão de Acolhimento' | 'Sessão Individual' | 'Feedback de Avaliação';
  modalidade: 'Online (IAS Conecta)' | 'Presencial (Ambulatório)';
  status: 'Confirmado' | 'Realizado' | 'Cancelado' | 'Pendente';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'model';
  text: string;
  timestamp: string;
  alertaUrgente?: boolean;
}

export interface ContratoEmpresa {
  id: string;
  empresa: string;
  cnpj: string;
  plano: 'Essencial EAP' | 'Integral NR-01 + EAP' | 'Enterprise Completo';
  vidasCobertas: number;
  valorPorVida: number; // R$ 15 a R$ 40 conforme proposta
  mensalidadeTotal: number;
  dataInicio: string;
  status: 'Ativo' | 'Renovação' | 'Pendente';
  vencimento: string;
}

export interface RepassePsicologo {
  id: string;
  psicologoNome: string;
  totalSessoes: number;
  valorPorSessao: number;
  totalRepasse: number;
  mesReferencia: string;
  status: 'Pago' | 'A Liberar';
}

