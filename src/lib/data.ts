import {
  UserProfile,
  PacienteProntuario,
  Vaga,
  Candidato,
  RiscoNR01,
  CursoCapacitacao,
  AgendamentoSessao
} from './types';

export const USUARIOS_PADRAO: UserProfile[] = [
  {
    id: 'u-ivna',
    nome: 'Psicóloga Ivna',
    email: 'ivna@iasconecta.com.br',
    role: 'admin_ivna',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    cargo: 'Administração Geral & Responsável Técnica',
    instituicao: 'Instituto de Autodesenvolvimento e Saúde (IAS)',
    registroProfissional: 'CRP / IAS',
  },
  {
    id: 'u-psi',
    nome: 'Psicólogo da Equipe',
    email: 'psicologia@iasconecta.com.br',
    role: 'psicologo',
    avatar: 'https://images.unsplash.com/photo-1594824813571-638f0263613a?auto=format&fit=crop&q=80&w=200',
    cargo: 'Atendimento Clínico & Evolução SOAP',
    instituicao: 'Instituto de Autodesenvolvimento e Saúde (IAS)',
  },
  {
    id: 'u-rh',
    nome: 'RH da Empresa',
    email: 'rh@empresa.com.br',
    role: 'rh',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    cargo: 'Recrutamento, Seleção & Clima',
  },
  {
    id: 'u-gestor',
    nome: 'Gestor da Empresa',
    email: 'gestao@empresa.com.br',
    role: 'gestor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    cargo: 'Liderança & Planos de Ação NR-01',
  },
  {
    id: 'u-colab',
    nome: 'Trabalhador / Candidato',
    email: 'trabalhador@empresa.com.br',
    role: 'colaborador',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    cargo: 'Colaborador da Empresa',
  },
];

export const PACIENTES_INICIAIS: PacienteProntuario[] = [
  {
    id: 'pac-01',
    nome: 'Juliana Vasconcelos',
    matricula: 'IAS-2041',
    setor: 'Operações & Logística',
    cargo: 'Analista de Operações Pleno',
    idade: 29,
    admissao: '15/03/2023',
    status: 'Em Acompanhamento',
    riscoGravidade: 'Moderado',
    queixaPrincipal: 'Sobrecarga com metas concorrentes, insônia e tensão muscular cervical frequente.',
    diagnosticoPreliminar: 'Fadiga por Estresse Ocupacional Prolongado (CID Z56.6 / F43.2)',
    cidProvavel: 'Z56.6 - Outras dificuldades físicas e mentais relacionadas com o trabalho',
    psicologoResponsavel: 'Psicóloga Ivna (IAS)',
    escalas: {
      mbiBurnout: 58,
      ansiedadeGad7: 11,
      depressaoPhq9: 8,
      estressePercebido: 27,
      historico: [
        { data: '10/01', burnout: 72, ansiedade: 15, estresse: 34 },
        { data: '24/01', burnout: 66, ansiedade: 13, estresse: 30 },
        { data: '07/02', burnout: 58, ansiedade: 11, estresse: 27 },
      ],
    },
    sessoes: [
      {
        id: 'ses-1',
        numero: 1,
        data: '10/01/2026',
        tipo: 'Plantão Psicológico',
        subjetivo: 'Paciente procura atendimento espontâneo com choro fácil, relatando sensação de "afogamento em tarefas" e medo de ser demitida após troca de coordenação.',
        objetivo: 'Labilidade emocional evidente, fala acelerada, inquietação psicomotora. Relato de 4 horas de sono por noite. GAD-7 pontuou 15 (moderado a severo).',
        avaliacao: 'Reação aguda ao estresse desencadeada por reestruturação setorial e falta de clareza de metas (fator psicossocial NR-01). Preservada quanto ao senso de realidade.',
        plano: 'Acolhimento empático imediato, técnica de respiração 4-7-8 para autorregulação, pactuação de diário de bordo de tarefas e agendamento de retorno semanal.',
        psicologo: 'Psicóloga Ivna',
      },
      {
        id: 'ses-2',
        numero: 2,
        data: '24/01/2026',
        tipo: 'Individual',
        subjetivo: 'Relata melhora no sono após instituir corte de notificações de trabalho após às 19h. Conseguiu expor à coordenação o gargalo nas planilhas de faturamento.',
        objetivo: 'Postura corporal mais relaxada, contato visual mantido, tônus vocal firme. MBI indicou queda de exaustão emocional de 72 para 66.',
        avaliacao: 'Evolução clínica favorável com boa adesão às estratégias de higiene do sono e assertividade comunicacional. Risco de recaída se o volume de horas extras voltar a subir.',
        plano: 'Treino de comunicação não-violenta para conversas difíceis com pares. Recomenda-se encaminhamento ao médico do trabalho para atestado de ergonomia cognitiva.',
        psicologo: 'Psicóloga Ivna',
      },
      {
        id: 'ses-3',
        numero: 3,
        data: '07/02/2026',
        tipo: 'Individual',
        subjetivo: 'Sentindo-se mais disposta. "Não sinto mais aquele aperto no peito todo domingo à noite". Conseguiu finalizar o módulo do curso de NR-01 na plataforma.',
        objetivo: 'Apresenta humor eutímico, afeto modulado e discurso coeso. GAD-7 reduziu para 11 e estresse percebido para 27.',
        avaliacao: 'Estabilização de quadro de sobrecarga. Colaboradora apta ao exercício pleno com manutenção de acompanhamento quinzenal de manutenção.',
        plano: 'Espaçar sessões para intervalo quinzenal. Manter monitoramento dos indicadores de clima no setor de operações.',
        psicologo: 'Psicóloga Ivna',
      },
    ],
  },
  {
    id: 'pac-02',
    nome: 'Rodrigo Santoro Peixoto',
    matricula: 'IAS-1893',
    setor: 'Tecnologia da Informação',
    cargo: 'Engenheiro de Software Sênior',
    idade: 36,
    admissao: '03/08/2021',
    status: 'Em Acompanhamento',
    riscoGravidade: 'Alto',
    queixaPrincipal: 'Despersonalização, cinismo em relação ao trabalho, perda de sentido na carreira e cefaleia crônica.',
    diagnosticoPreliminar: 'Síndrome de Burnout (CID QD85 / Z73.0)',
    cidProvavel: 'QD85 - Síndrome de Burnout (CID-11)',
    psicologoResponsavel: 'Psicóloga Ivna (IAS)',
    escalas: {
      mbiBurnout: 79,
      ansiedadeGad7: 14,
      depressaoPhq9: 13,
      estressePercebido: 33,
      historico: [
        { data: '15/01', burnout: 84, ansiedade: 16, estresse: 36 },
        { data: '29/01', burnout: 79, ansiedade: 14, estresse: 33 },
      ],
    },
    sessoes: [
      {
        id: 'ses-10',
        numero: 1,
        data: '15/01/2026',
        tipo: 'Individual',
        subjetivo: 'Relata jornadas diárias de 12 a 14 horas, plantões de sobreaviso aos finais de semana e desânimo generalizado. "Tudo o que eu construo parece inútil".',
        objetivo: 'Facies de exaustão, lentificação psicomotora leve, afeto embotado para atividades prazerosas. Escala MBI apontou nível severo em exaustão e despersonalização.',
        avaliacao: 'Quadro clássico de Síndrome de Burnout associado a regime de sobreaviso abusivo e toxicidade de entregas sem tempo de recuperação.',
        plano: 'Emissão de relatório técnico para o Médico do Trabalho sugerindo corte imediato de horas extras e regime de trabalho protegido. Psicoeducação sobre limites laborais.',
        psicologo: 'Psicóloga Ivna',
      },
    ],
  },
  {
    id: 'pac-03',
    nome: 'Mariana Duarte Prado',
    matricula: 'IAS-2190',
    setor: 'Atendimento & SAC',
    cargo: 'Operadora de Suporte ao Cliente',
    idade: 24,
    admissao: '10/01/2024',
    status: 'Triagem Inicial',
    riscoGravidade: 'Crítico',
    queixaPrincipal: 'Crises de pânico no ponto eletrônico, choro convulsivo após xingamentos de clientes e taquicardia.',
    diagnosticoPreliminar: 'Transtorno do Pânico com gatilho situacional laboral (CID F41.0)',
    cidProvavel: 'F41.0 - Transtorno de Pânico',
    psicologoResponsavel: 'Psicóloga Ivna (IAS)',
    escalas: {
      mbiBurnout: 64,
      ansiedadeGad7: 19,
      depressaoPhq9: 15,
      estressePercebido: 36,
      historico: [
        { data: '02/02', burnout: 64, ansiedade: 19, estresse: 36 },
      ],
    },
    sessoes: [
      {
        id: 'ses-20',
        numero: 1,
        data: '02/02/2026',
        tipo: 'Plantão Psicológico',
        subjetivo: 'Paciente desmaiou na baia de atendimento durante turno da tarde após cliente agressivo. Encaminhada ao ambulatório com tremores e desespero.',
        objetivo: 'Crise de hiperventilação, sudorese palmar e choro copioso. Escala GAD-7 no nível 19 (ansiedade severa).',
        avaliacao: 'Episódio agudo de pânico desencadeado por violência verbal e falta de suporte da supervisão imediata na retenção de chamados críticos.',
        plano: 'Estabilização emocional através de grounding 5-4-3-2-1. Afastamento médico imediato de 5 dias via SST e notificação ao PGR NR-01 do setor de SAC.',
        psicologo: 'Psicóloga Ivna',
      },
    ],
  },
  {
    id: 'pac-04',
    nome: 'Fernando Calheiros',
    matricula: 'IAS-1422',
    setor: 'Controladoria & Finanças',
    cargo: 'Coordenador Fiscal',
    idade: 42,
    admissao: '05/05/2019',
    status: 'Alta Clínica',
    riscoGravidade: 'Baixo',
    queixaPrincipal: 'Recuperado de episódio depressivo leve ocorrido durante encerramento de balanço anual.',
    diagnosticoPreliminar: 'Remissão completa de episódio adaptativo (CID F43.20)',
    cidProvavel: 'F43.20 - Breve reação depressiva',
    psicologoResponsavel: 'Psicóloga Ivna (IAS)',
    escalas: {
      mbiBurnout: 22,
      ansiedadeGad7: 4,
      depressaoPhq9: 3,
      estressePercebido: 14,
      historico: [
        { data: '05/11', burnout: 61, ansiedade: 12, estresse: 28 },
        { data: '10/12', burnout: 40, ansiedade: 8, estresse: 20 },
        { data: '15/01', burnout: 22, ansiedade: 4, estresse: 14 },
      ],
    },
    sessoes: [],
  },
];

export const VAGAS_INICIAIS: Vaga[] = [
  {
    id: 'vag-01',
    titulo: 'Especialista em Gestão de Pessoas & Cultura (DHO)',
    area: 'Recursos Humanos',
    setor: 'Gente & Gestão',
    modelo: 'Híbrido',
    nivel: 'Especialista',
    faixaSalarial: 'R$ 9.500 - R$ 12.000',
    status: 'Aberta',
    descricao: 'Responsável por desenhar programas de desenvolvimento humano, governança de clima organizacional e planos de prevenção a riscos psicossociais alinhados à NR-01.',
    requisitos: [
      'Graduação em Psicologia, Administração ou áreas afins',
      'Pós-graduação em Gestão de Pessoas ou Psicologia Organizacional',
      'Experiência consolidada em implantação de programas de Saúde Mental e SST',
      'Conhecimento aplicado da NR-01 (GRO/PGR psicossocial)',
      'Vivência com metodologias ágeis de RH e pesquisas de clima'
    ],
    competenciasDesejadas: [
      'Comunicação assertiva e escuta ativa',
      'Capacidade de mediação de conflitos entre lideranças',
      'Resiliência emocional em cenários de transformação',
      'Orientação para métricas e indicadores de absenteísmo'
    ],
    riscoPsicossocialCargo: 'Moderado',
    fatoresEstressores: [
      'Mediação de casos sensíveis de assédio e conflito interpessoal',
      'Cobrança por índices de engajamento em setores fabris'
    ],
    candidatosInscritos: ['cand-01', 'cand-02', 'cand-03'],
  },
  {
    id: 'vag-02',
    titulo: 'Engenheiro(a) de Software Full Stack Pleno',
    area: 'Tecnologia da Informação',
    setor: 'Engenharia de Produto',
    modelo: 'Remoto',
    nivel: 'Pleno',
    faixaSalarial: 'R$ 8.000 - R$ 10.500',
    status: 'Aberta',
    descricao: 'Desenvolvimento da plataforma IAS Conecta com React, Node/TypeScript e integração de modelos generativos de IA em ambiente ágil com foco em ergonomia digital.',
    requisitos: [
      '3+ anos de experiência com TypeScript, React e Node.js',
      'Experiência com APIs REST e microsserviços',
      'Conhecimento em boas práticas de UX e acessibilidade web',
      'Capacidade de auto-organização em modelo 100% remoto'
    ],
    competenciasDesejadas: [
      'Autonomia com responsabilidade',
      'Gestão proativa de pausas e prevenção ao isolamento laboral',
      'Colaboração assíncrona eficaz'
    ],
    riscoPsicossocialCargo: 'Moderado',
    fatoresEstressores: [
      'Prazos de sprint concorrentes',
      'Demanda contínua de atenção concentrada em tela'
    ],
    candidatosInscritos: ['cand-04'],
  },
  {
    id: 'vag-03',
    titulo: 'Supervisor(a) de Operações e Logística',
    area: 'Supply Chain & Logística',
    setor: 'Centro de Distribuição',
    modelo: 'Presencial',
    nivel: 'Liderança',
    faixaSalarial: 'R$ 7.500 - R$ 9.000',
    status: 'Aberta',
    descricao: 'Liderança de equipe de 35 operadores de expedição, garantindo produtividade, segurança ocupacional zero acidentes e clima organizacional saudável no chão de fábrica.',
    requisitos: [
      'Experiência prévia em liderança de chão de fábrica ou logística pesada',
      'Conhecimento de normas regulamentadoras (NR-01, NR-11, NR-17)',
      'Habilidade comprovada em gestão de conflitos e escala de turnos'
    ],
    competenciasDesejadas: [
      'Liderança humanizada e empática',
      'Inteligência emocional sob pressão de metas',
      'Comunicação clara com operários de diferentes níveis'
    ],
    riscoPsicossocialCargo: 'Alto',
    fatoresEstressores: [
      'Ambiente de ritmo acelerado e ruído',
      'Pressão por cumprimento de prazos de carga/descarga',
      'Turnos alternados e absenteísmo operacional'
    ],
    candidatosInscritos: ['cand-05', 'cand-02'],
  },
];

export const CANDIDATOS_INICIAIS: Candidato[] = [
  {
    id: 'cand-01',
    nome: 'Camila Guimarães Torres',
    email: 'camila.gtorres@email.com',
    telefone: '(11) 98765-4321',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    formacao: 'Psicologia (USP) com Especialização em Saúde do Trabalhador e Ergonomia',
    cargoAtual: 'Consultora de DHO e Saúde Mental Corporativa',
    experiencia: '6 anos atuando em programas de bem-estar, diagnóstico de clima, mediação de conflitos e implementação de diretrizes NR-01 em empresas de grande porte.',
    pretensaoSalarial: 'R$ 10.500',
    habilidadesTecnicas: [
      'NR-01 GRO Psicossocial',
      'Diagnóstico de Riscos Ocupacionais',
      'Mediação de Conflitos',
      'Gestão de Indicadores de SST',
      'Pesquisas de Clima (eNPS)'
    ],
    softSkills: [
      'Escuta Ativa Qualificada',
      'Alta Empatia e Tato Diplomático',
      'Resiliência sob Crises',
      'Comunicação Não-Violenta',
      'Pensamento Sistêmico'
    ],
    bio: 'Profissional dedicada à transformação humanizada dos ambientes corporativos. Acredito que produtividade sustentável só existe com segurança psicológica e mitigação estrutural dos estressores da NR-01.',
    vagasAplicadas: ['vag-01'],
    statusProcesso: 'Em Análise',
  },
  {
    id: 'cand-02',
    nome: 'Eduardo Brandão Silva',
    email: 'eduardo.brandao@email.com',
    telefone: '(21) 99123-8877',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    formacao: 'Administração de Empresas (FGV) com MBA em Gestão Estratégica de Pessoas',
    cargoAtual: 'Coordenador de Recursos Humanos',
    experiencia: '8 anos de vivência generalista em RH, forte foco em R&S de posições técnicas e liderança, gestão de folha e relações sindicais. Buscando aprofundar na parte de SST.',
    pretensaoSalarial: 'R$ 11.000',
    habilidadesTecnicas: [
      'R&S End-to-End',
      'Relações Trabalhistas & Sindicais',
      'KPIs de Turnover & Retenção',
      'Treinamento e Onboarding',
      'Feedback 360'
    ],
    softSkills: [
      'Negociação Firme',
      'Visão de Negócio',
      'Pragmatismo',
      'Orientação a Resultados'
    ],
    bio: 'Gestor experiente em estruturação de processos de RH, foco em eficiência operacional e atração de talentos de alta performance.',
    vagasAplicadas: ['vag-01', 'vag-03'],
    statusProcesso: 'Inscrito',
  },
  {
    id: 'cand-03',
    nome: 'Larissa Alencar Pires',
    email: 'larissa.pires@email.com',
    telefone: '(31) 98455-1212',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    formacao: 'Pedagogia Empresarial com pós em Psicologia Positiva',
    cargoAtual: 'Analista de Treinamento e Desenvolvimento',
    experiencia: '3 anos desenhando trilhas de onboarding e capacitação de equipes de vendas e atendimento.',
    pretensaoSalarial: 'R$ 8.500',
    habilidadesTecnicas: [
      'Design Instrucional',
      'Gamificação',
      'Workshops Comportamentais',
      'LMS / Plataformas de Ensino'
    ],
    softSkills: [
      'Criatividade',
      'Facilitação de Grupos',
      'Entusiasmo',
      'Trabalho em Equipe'
    ],
    bio: 'Apaixonada por conectar pessoas ao seu propósito profissional por meio da aprendizagem contínua e cultura acolhedora.',
    vagasAplicadas: ['vag-01'],
    statusProcesso: 'Inscrito',
  },
  {
    id: 'cand-04',
    nome: 'Lucas Takahashi',
    email: 'lucas.takahashi@email.com',
    telefone: '(19) 99876-0011',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
    formacao: 'Ciência da Computação (Unicamp)',
    cargoAtual: 'Desenvolvedor Full Stack Pleno',
    experiencia: '4 anos desenvolvendo soluções SaaS com React, TypeScript, Node.js e APIs REST. Forte cultura de código limpo e testes automatizados.',
    pretensaoSalarial: 'R$ 9.000',
    habilidadesTecnicas: [
      'React 19 & TypeScript',
      'Node.js & Express',
      'PostgreSQL & MongoDB',
      'Docker & CI/CD',
      'Integrações de APIs de IA'
    ],
    softSkills: [
      'Autonomia Disciplinada',
      'Comunicação Clara em Trabalho Remoto',
      'Foco na Experiência do Usuário',
      'Aprendizado Rápido'
    ],
    bio: 'Engenheiro apaixonado por construir interfaces intuitivas e backends resilientes. Valorizo empresas que respeitam o equilíbrio vida-trabalho e promovem código sustentável.',
    vagasAplicadas: ['vag-02'],
    statusProcesso: 'Em Análise',
  },
  {
    id: 'cand-05',
    nome: 'Rogério Medeiros Castro',
    email: 'rogerio.castro@email.com',
    telefone: '(41) 98833-4455',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    formacao: 'Tecnologia em Logística + Curso de Liderança Operacional e CIPA',
    cargoAtual: 'Líder de Turno Logístico',
    experiencia: '7 anos coordenando rotinas de armazém, expedição noturna e frotas de empilhadeiras. Histórico de 450 dias sem acidentes de trabalho com afastamento.',
    pretensaoSalarial: 'R$ 8.200',
    habilidadesTecnicas: [
      'Gestão de Estoque WMS',
      'Normas de Segurança NR-11 & NR-12',
      'Inspeção CIPA',
      'Roteirização e Carregamento'
    ],
    softSkills: [
      'Presença de Comando Justa',
      'Excelente Relação com Operários',
      'Gestão Rápida de Imprevistos',
      'Empatia no Diálogo Diário de Segurança (DDS)'
    ],
    bio: 'Líder operacional com alma no chão de fábrica. Sei cobrar produtividade cuidando de cada trabalhador como ser humano.',
    vagasAplicadas: ['vag-03'],
    statusProcesso: 'Entrevista',
  },
];

export const RISCOS_NR01_INICIAIS: RiscoNR01[] = [
  {
    id: 'rsk-01',
    titulo: 'Sobrecarga Cognitiva e Prazos Excessivamente Comprimidos',
    setor: 'Tecnologia da Informação & Engenharia',
    cargo: 'Engenheiros de Software e Analistas de Dados',
    categoria: 'Organização do Trabalho',
    fatorEstressor: 'Multiplicidade de projetos simultâneos, prazos estipulados sem consulta aos técnicos e regime tácito de horas extras.',
    consequenciasPossiveis: 'Exaustão emocional crônica, Síndrome de Burnout (CID QD85), insônia, lapsos atencionais e absenteísmo.',
    probabilidade: 4,
    severidade: 4,
    nivelRiscoCalculado: 'Crítico',
    statusControle: 'Em Implementação',
    acoesPreventivas: {
      primaria: [
        'Redesenho do planejamento de sprints com estimativas colaborativas e teto semanal de horas de desenvolvimento.',
        'Proibição de deploy às sextas-feiras e desativação de notificações em fins de semana.'
      ],
      secundaria: [
        'Workshop de Ergonomia Cognitiva e Gestão de Tempo Assíncrono ministrado pela IAS Conecta.',
        'Pausas programadas para descanso visual e postural a cada 90 minutos.'
      ],
      terciaria: [
        'Canal de escuta e acolhimento psicológico confidencial 24h na plataforma IAS Conecta.',
        'Protocolo de suporte médico e retorno assistido após licença médica.'
      ]
    },
    prazoRevisao: '30/04/2026',
  },
  {
    id: 'rsk-02',
    titulo: 'Exposição Contínua a Hostilidade e Conflito com Usuários',
    setor: 'Atendimento ao Cliente & Suporte Técnico (SAC)',
    cargo: 'Operadores de Suporte e Atendentes',
    categoria: 'Relações Interpessoais',
    fatorEstressor: 'Recebimento de chamados com agressividade verbal recorrente de clientes inadimplentes ou insatisfeitos, sem autonomia para resolução imediata.',
    consequenciasPossiveis: 'Crises de ansiedade aguda, episódios de pânico no posto de trabalho (F41.0), despersonalização e somatização gastrointestinal.',
    probabilidade: 5,
    severidade: 4,
    nivelRiscoCalculado: 'Crítico',
    statusControle: 'Pendente',
    acoesPreventivas: {
      primaria: [
        'Revisão da árvore de decisão do sistema para permitir aos atendentes desligar chamados que envolvam injúria e assédio verbal explícito.',
        'Aumento da alçada de resolução no primeiro nível para reduzir atritos.'
      ],
      secundaria: [
        'Treinamento em desescalada de conflitos e comunicação assertiva protetiva.',
        'Sala de descompressão física e pausas obrigatórias de 15 minutos após chamados de alta tensão.'
      ],
      terciaria: [
        'Plantão psicológico imediato pós-evento sentinela de violência no trabalho.',
        'Acompanhamento psicoterapêutico subsidiado pelo programa de saúde da empresa.'
      ]
    },
    prazoRevisao: '15/03/2026',
  },
  {
    id: 'rsk-03',
    titulo: 'Trabalho em Turnos Invertidos e Perturbação do Ritmo Circadiano',
    setor: 'Logística & Expedição Fabril',
    cargo: 'Operadores de Empilhadeira e Conferentes Noturnos',
    categoria: 'Condições Ambientais',
    fatorEstressor: 'Escalas de revezamento 12x36 ou noturnas com sono fragmentado e iluminação artificial de alta intensidade.',
    consequenciasPossiveis: 'Transtorno do ciclo sono-vigília, fadiga acumulada, elevação do risco de acidentes materiais e com veículos industriais.',
    probabilidade: 4,
    severidade: 3,
    nivelRiscoCalculado: 'Substancial',
    statusControle: 'Em Implementação',
    acoesPreventivas: {
      primaria: [
        'Adequação ergonômica das escalas de trabalho respeitando intervalos biológicos mínimos de recuperação.',
        'Melhoria nos sistemas de ventilação e redução de ruído nas áreas de descanso.'
      ],
      secundaria: [
        'Programa educativo de higiene do sono para trabalhadores em turno noturno e orientações nutricionais.',
        'Exames periódicos de rastreamento de apneia e fadiga crônica via PCMSO.'
      ],
      terciaria: [
        'Encaminhamento médico para medicina do sono em casos de insônia refratária.',
        'Remanejamento temporário para turno diurno mediante parecer do Médico do Trabalho.'
      ]
    },
    prazoRevisao: '20/05/2026',
  },
  {
    id: 'rsk-04',
    titulo: 'Ambiguidade de Papéis e Falta de Feedback Transparente',
    setor: 'Administrativo & Finanças',
    cargo: 'Analistas e Assistentes Fiscais',
    categoria: 'Organização do Trabalho',
    fatorEstressor: 'Indefinição de limites de responsabilidade entre cargos e cobrança de resultados sem diretrizes claras.',
    consequenciasPossiveis: 'Insegurança profissional crônica, estresse antecipatório, clima de desconfiança e baixa motivação.',
    probabilidade: 3,
    severidade: 2,
    nivelRiscoCalculado: 'Moderado',
    statusControle: 'Controlado',
    acoesPreventivas: {
      primaria: [
        'Instituição da Matriz RACI para todos os processos fiscais e descrição clara de atribuições.',
        'Reuniões quinzenais estruturadas de alinhamento de expectativas.'
      ],
      secundaria: [
        'Capacitação das lideranças em feedback construtivo e segurança psicológica na equipe.'
      ],
      terciaria: [
        'Canal de ouvidoria ética e mediação de conflitos corporativos.'
      ]
    },
    prazoRevisao: '10/06/2026',
  },
];

export const CURSOS_INICIAIS: CursoCapacitacao[] = [
  {
    id: 'cur-01',
    titulo: 'NR-01 e os Riscos Psicossociais: Guia Prático para Líderes e CIPA',
    categoria: 'NR-01 Obrigatório',
    cargaHoraria: '8 horas',
    instrutor: 'Psicóloga Ivna — Instituto de Autodesenvolvimento e Saúde',
    publicoAlvo: 'Gestores, Coordenadores, Membros da CIPA e Comitê de SST',
    obrigatorio: true,
    progresso: 100,
    totalAlunos: 142,
    descricao: 'Como identificar, avaliar e mitigar fatores de risco psicossociais no ambiente de trabalho conforme as diretrizes da NR-01 (Portaria MTE nº 1.419/2024).',
    modulos: [
      { titulo: 'Módulo 1: Fundamentos da NR-01 e GRO aplicados à Saúde Mental', duracao: '2h', concluido: true },
      { titulo: 'Módulo 2: Matriz de Severidade e Probabilidade de Riscos Subjetivos', duracao: '2h', concluido: true },
      { titulo: 'Módulo 3: Prevenção Primária, Secundária e Terciária no Trabalho', duracao: '2h', concluido: true },
      { titulo: 'Módulo 4: Elaboração do Plano de Ação 5W2H do PGR', duracao: '2h', concluido: true },
    ],
    badge: 'Certificado Válido MTE',
  },
  {
    id: 'cur-02',
    titulo: 'Liderança Saudável & Segurança Psicológica nas Equipes',
    categoria: 'Saúde Mental & Liderança',
    cargaHoraria: '6 horas',
    instrutor: 'Psicóloga Ivna — Instituto de Autodesenvolvimento e Saúde',
    publicoAlvo: 'Líderes de equipe e RH da empresa',
    obrigatorio: true,
    progresso: 65,
    totalAlunos: 98,
    descricao: 'Técnicas práticas para criar um ambiente de diálogo, redução de estresse e identificação precoce de sobrecarga.',
    modulos: [
      { titulo: 'Módulo 1: Segurança Psicológica e confiança na equipe', duracao: '1h 30m', concluido: true },
      { titulo: 'Módulo 2: Reconhecendo sinais precoces de Burnout nos liderados', duracao: '1h 30m', concluido: true },
      { titulo: 'Módulo 3: Conduzindo conversas de alinhamento com acolhimento', duracao: '1h 30m', concluido: false },
      { titulo: 'Módulo 4: Plano individual de apoio e repactuação de metas', duracao: '1h 30m', concluido: false },
    ],
    badge: 'Liderança Positiva',
  },
  {
    id: 'cur-03',
    titulo: 'Gestão de Estresse no Trabalho e Descompressão Mental',
    categoria: 'Ergonomia Cognitiva',
    cargaHoraria: '4 horas',
    instrutor: 'Psicóloga Ivna — Instituto de Autodesenvolvimento e Saúde',
    publicoAlvo: 'Colaboradores em trabalho presencial e remoto',
    obrigatorio: false,
    progresso: 40,
    totalAlunos: 215,
    descricao: 'Estratégias de autorregulação atencional, gestão de interrupções, combate à fadiga e técnicas de respiração diafragmática para a rotina laboral.',
    modulos: [
      { titulo: 'Módulo 1: Atenção concentrada e custo da alternância de tarefas', duracao: '1h', concluido: true },
      { titulo: 'Módulo 2: Micro-pausas cognitivas e higiene do sono', duracao: '1h', concluido: false },
      { titulo: 'Módulo 3: Prática guiada: Técnicas de respiração 4-7-8 e relaxamento', duracao: '1h', concluido: false },
      { titulo: 'Módulo 4: Organizando a rotina com blocos de foco', duracao: '1h', concluido: false },
    ],
    badge: 'Bem-Estar no Trabalho',
  },
  {
    id: 'cur-04',
    titulo: 'Comunicação Não-Violenta (CNV) no Ambiente de Trabalho',
    categoria: 'Comunicação Não-Violenta',
    cargaHoraria: '5 horas',
    instrutor: 'Psicóloga Ivna — Instituto de Autodesenvolvimento e Saúde',
    publicoAlvo: 'Colaboradores de todos os setores e áreas de atendimento',
    obrigatorio: false,
    progresso: 10,
    totalAlunos: 170,
    descricao: 'Como expressar sentimentos, necessidades e pedidos claros sem atritos desnecessários, construindo relações de cooperação.',
    modulos: [
      { titulo: 'Módulo 1: Os 4 componentes da CNV: Observar, Sentir, Precisar e Pedir', duracao: '1h 15m', concluido: true },
      { titulo: 'Módulo 2: Desarmando a reatividade emocional em reuniões tensas', duracao: '1h 15m', concluido: false },
      { titulo: 'Módulo 3: Escuta empática em situações desafiadoras', duracao: '1h 15m', concluido: false },
      { titulo: 'Módulo 4: Exercícios práticos e estudos de caso reais', duracao: '1h 15m', concluido: false },
    ],
  },
];

export const AGENDAMENTOS_INICIAIS: AgendamentoSessao[] = [
  {
    id: 'ag-01',
    pacienteId: 'pac-01',
    pacienteNome: 'Juliana Vasconcelos',
    setor: 'Operações & Logística',
    psicologoNome: 'Psicóloga Ivna',
    data: '12/02/2026',
    horario: '14:00 - 14:50',
    tipo: 'Sessão Individual',
    modalidade: 'Online (IAS Conecta)',
    status: 'Confirmado',
  },
  {
    id: 'ag-02',
    pacienteId: 'pac-03',
    pacienteNome: 'Mariana Duarte Prado',
    setor: 'Atendimento & SAC',
    psicologoNome: 'Psicóloga Ivna',
    data: '12/02/2026',
    horario: '15:30 - 16:15',
    tipo: 'Plantão de Acolhimento',
    modalidade: 'Presencial (Ambulatório)',
    status: 'Confirmado',
  },
  {
    id: 'ag-03',
    pacienteId: 'pac-02',
    pacienteNome: 'Rodrigo Santoro Peixoto',
    setor: 'Tecnologia da Informação',
    psicologoNome: 'Psicóloga Ivna',
    data: '13/02/2026',
    horario: '10:00 - 10:50',
    tipo: 'Sessão Individual',
    modalidade: 'Online (IAS Conecta)',
    status: 'Confirmado',
  },
  {
    id: 'ag-04',
    pacienteId: 'pac-04',
    pacienteNome: 'Fernando Calheiros',
    setor: 'Controladoria & Finanças',
    psicologoNome: 'Psicóloga Ivna',
    data: '10/02/2026',
    horario: '11:00 - 11:45',
    tipo: 'Feedback de Avaliação',
    modalidade: 'Presencial (Ambulatório)',
    status: 'Realizado',
  },
];

export const METRICAS_SST_GERAL = {
  taxaAbsenteismo: 1.8, // % no mês (meta abaixo de 2.5%)
  colaboradoresMonitorados: 348,
  atendimentosMes: 47,
  riscosCriticosPGR: 2,
  indiceBurnoutMedio: 42, // em 100
  casosAfastamentoEvitados: 9,
  horasTreinadasNR01: 520,
  conformidadeNR01Geral: 94, // %
};

export const CONTRATOS_INICIAIS = [
  {
    id: 'cnt-01',
    empresa: 'Logística & Transportes Sul S.A.',
    cnpj: '14.892.410/0001-33',
    plano: 'Integral NR-01 + EAP' as const,
    vidasCobertas: 140,
    valorPorVida: 28, // R$ 28/vida/mês (faixa R$ 15 - R$ 40)
    mensalidadeTotal: 3920,
    dataInicio: '01/01/2026',
    status: 'Ativo' as const,
    vencimento: 'Todo dia 10',
  },
  {
    id: 'cnt-02',
    empresa: 'TechGlobal Inovação e Software',
    cnpj: '28.114.908/0001-45',
    plano: 'Enterprise Completo' as const,
    vidasCobertas: 125,
    valorPorVida: 35, // R$ 35/vida/mês (inclui recrutamento + academia)
    mensalidadeTotal: 4375,
    dataInicio: '15/11/2025',
    status: 'Ativo' as const,
    vencimento: 'Todo dia 15',
  },
  {
    id: 'cnt-03',
    empresa: 'Atacado & Varejo Distribuidora',
    cnpj: '09.332.881/0001-12',
    plano: 'Essencial EAP' as const,
    vidasCobertas: 83,
    valorPorVida: 20, // R$ 20/vida/mês
    mensalidadeTotal: 1660,
    dataInicio: '01/02/2026',
    status: 'Ativo' as const,
    vencimento: 'Todo dia 05',
  },
];

export const REPASSES_INICIAIS = [
  {
    id: 'rep-01',
    psicologoNome: 'Psicóloga Ivna',
    totalSessoes: 28,
    valorPorSessao: 110,
    totalRepasse: 3080,
    mesReferencia: 'Janeiro/2026',
    status: 'Pago' as const,
  },
  {
    id: 'rep-02',
    psicologoNome: 'Psicólogo da Equipe',
    totalSessoes: 19,
    valorPorSessao: 95,
    totalRepasse: 1805,
    mesReferencia: 'Janeiro/2026',
    status: 'A Liberar' as const,
  },
];

