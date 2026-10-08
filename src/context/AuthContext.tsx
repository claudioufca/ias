import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  UserRole,
  PacienteProntuario,
  Vaga,
  Candidato,
  RiscoNR01,
  CursoCapacitacao,
  AgendamentoSessao
} from '../lib/types';
import {
  USUARIOS_PADRAO,
  PACIENTES_INICIAIS,
  VAGAS_INICIAIS,
  CANDIDATOS_INICIAIS,
  RISCOS_NR01_INICIAIS,
  CURSOS_INICIAIS,
  AGENDAMENTOS_INICIAIS
} from '../lib/data';

interface AuthContextType {
  usuarioAtual: UserProfile;
  trocarPerfil: (role: UserRole) => void;
  usuariosDisponiveis: UserProfile[];
  
  // Estados compartilhados da aplicação
  pacientes: PacienteProntuario[];
  atualizarPaciente: (paciente: PacienteProntuario) => void;
  adicionarSessaoSOAP: (pacienteId: string, sessao: any) => void;
  
  vagas: Vaga[];
  atualizarVaga: (vaga: Vaga) => void;
  
  candidatos: Candidato[];
  atualizarCandidato: (candidato: Candidato) => void;
  
  riscosNR01: RiscoNR01[];
  adicionarRiscoNR01: (risco: RiscoNR01) => void;
  atualizarRiscoNR01: (risco: RiscoNR01) => void;
  
  cursos: CursoCapacitacao[];
  marcarModuloConcluido: (cursoId: string, moduloIndex: number) => void;
  
  agendamentos: AgendamentoSessao[];
  adicionarAgendamento: (agendamento: Omit<AgendamentoSessao, 'id'>) => void;
  cancelarAgendamento: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuarioAtual, setUsuarioAtual] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('ias_conecta_role');
    const found = USUARIOS_PADRAO.find((u) => u.role === saved);
    return found || USUARIOS_PADRAO[0]; // Padrão: Psicóloga
  });

  const [pacientes, setPacientes] = useState<PacienteProntuario[]>(() => {
    const saved = localStorage.getItem('ias_conecta_pacientes');
    return saved ? JSON.parse(saved) : PACIENTES_INICIAIS;
  });

  const [vagas, setVagas] = useState<Vaga[]>(() => {
    const saved = localStorage.getItem('ias_conecta_vagas');
    return saved ? JSON.parse(saved) : VAGAS_INICIAIS;
  });

  const [candidatos, setCandidatos] = useState<Candidato[]>(() => {
    const saved = localStorage.getItem('ias_conecta_candidatos');
    return saved ? JSON.parse(saved) : CANDIDATOS_INICIAIS;
  });

  const [riscosNR01, setRiscosNR01] = useState<RiscoNR01[]>(() => {
    const saved = localStorage.getItem('ias_conecta_riscos');
    return saved ? JSON.parse(saved) : RISCOS_NR01_INICIAIS;
  });

  const [cursos, setCursos] = useState<CursoCapacitacao[]>(() => {
    const saved = localStorage.getItem('ias_conecta_cursos');
    return saved ? JSON.parse(saved) : CURSOS_INICIAIS;
  });

  const [agendamentos, setAgendamentos] = useState<AgendamentoSessao[]>(() => {
    const saved = localStorage.getItem('ias_conecta_agendamentos');
    return saved ? JSON.parse(saved) : AGENDAMENTOS_INICIAIS;
  });

  // Salvar no storage quando atualizado
  useEffect(() => {
    localStorage.setItem('ias_conecta_role', usuarioAtual.role);
  }, [usuarioAtual]);

  useEffect(() => {
    localStorage.setItem('ias_conecta_pacientes', JSON.stringify(pacientes));
  }, [pacientes]);

  useEffect(() => {
    localStorage.setItem('ias_conecta_vagas', JSON.stringify(vagas));
  }, [vagas]);

  useEffect(() => {
    localStorage.setItem('ias_conecta_candidatos', JSON.stringify(candidatos));
  }, [candidatos]);

  useEffect(() => {
    localStorage.setItem('ias_conecta_riscos', JSON.stringify(riscosNR01));
  }, [riscosNR01]);

  useEffect(() => {
    localStorage.setItem('ias_conecta_cursos', JSON.stringify(cursos));
  }, [cursos]);

  useEffect(() => {
    localStorage.setItem('ias_conecta_agendamentos', JSON.stringify(agendamentos));
  }, [agendamentos]);

  const trocarPerfil = (role: UserRole) => {
    const novoUsuario = USUARIOS_PADRAO.find((u) => u.role === role);
    if (novoUsuario) {
      setUsuarioAtual(novoUsuario);
    }
  };

  const atualizarPaciente = (pacienteAtualizado: PacienteProntuario) => {
    setPacientes((prev) =>
      prev.map((p) => (p.id === pacienteAtualizado.id ? pacienteAtualizado : p))
    );
  };

  const adicionarSessaoSOAP = (pacienteId: string, novaSessaoData: any) => {
    setPacientes((prev) =>
      prev.map((p) => {
        if (p.id !== pacienteId) return p;
        const novaSessao = {
          id: `ses-${Date.now()}`,
          numero: p.sessoes.length + 1,
          data: new Date().toLocaleDateString('pt-BR'),
          psicologo: usuarioAtual.nome,
          ...novaSessaoData,
        };
        return {
          ...p,
          sessoes: [novaSessao, ...p.sessoes],
        };
      })
    );
  };

  const atualizarVaga = (vagaAtualizada: Vaga) => {
    setVagas((prev) =>
      prev.map((v) => (v.id === vagaAtualizada.id ? vagaAtualizada : v))
    );
  };

  const atualizarCandidato = (candidatoAtualizado: Candidato) => {
    setCandidatos((prev) =>
      prev.map((c) => (c.id === candidatoAtualizado.id ? candidatoAtualizado : c))
    );
  };

  const adicionarRiscoNR01 = (novoRisco: RiscoNR01) => {
    setRiscosNR01((prev) => [novoRisco, ...prev]);
  };

  const atualizarRiscoNR01 = (riscoAtualizado: RiscoNR01) => {
    setRiscosNR01((prev) =>
      prev.map((r) => (r.id === riscoAtualizado.id ? riscoAtualizado : r))
    );
  };

  const marcarModuloConcluido = (cursoId: string, moduloIndex: number) => {
    setCursos((prev) =>
      prev.map((curso) => {
        if (curso.id !== cursoId) return curso;
        const novosModulos = curso.modulos.map((m, idx) =>
          idx === moduloIndex ? { ...m, concluido: true } : m
        );
        const concluidosCount = novosModulos.filter((m) => m.concluido).length;
        const progresso = Math.round((concluidosCount / novosModulos.length) * 100);
        return {
          ...curso,
          modulos: novosModulos,
          progresso,
        };
      })
    );
  };

  const adicionarAgendamento = (agendamentoData: Omit<AgendamentoSessao, 'id'>) => {
    const novo: AgendamentoSessao = {
      id: `ag-${Date.now()}`,
      ...agendamentoData,
    };
    setAgendamentos((prev) => [novo, ...prev]);
  };

  const cancelarAgendamento = (id: string) => {
    setAgendamentos((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'Cancelado' } : a))
    );
  };

  return (
    <AuthContext.Provider
      value={{
        usuarioAtual,
        trocarPerfil,
        usuariosDisponiveis: USUARIOS_PADRAO,
        pacientes,
        atualizarPaciente,
        adicionarSessaoSOAP,
        vagas,
        atualizarVaga,
        candidatos,
        atualizarCandidato,
        riscosNR01,
        adicionarRiscoNR01,
        atualizarRiscoNR01,
        cursos,
        marcarModuloConcluido,
        agendamentos,
        adicionarAgendamento,
        cancelarAgendamento,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de AuthProvider');
  }
  return context;
};
