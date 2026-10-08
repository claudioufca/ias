import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { AgendamentoSessao } from '../lib/types';
import {
  CalendarDays,
  Clock,
  Plus,
  User,
  CheckCircle2,
  XCircle,
  Video,
  MapPin,
  Calendar,
  Filter
} from 'lucide-react';

export const AgendamentosView: React.FC = () => {
  const { agendamentos, adicionarAgendamento, cancelarAgendamento, pacientes, usuarioAtual } = useAuth();
  const [modalNovo, setModalNovo] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');

  // Form state
  const [novoAgendamento, setNovoAgendamento] = useState({
    pacienteNome: pacientes[0]?.nome || usuarioAtual.nome,
    setor: pacientes[0]?.setor || 'Operações',
    psicologoNome: 'Dra. Beatriz Albuquerque',
    data: new Date().toLocaleDateString('pt-BR'),
    horario: '14:00 - 14:50',
    tipo: 'Sessão Individual' as AgendamentoSessao['tipo'],
    modalidade: 'Online (IAS Conecta)' as AgendamentoSessao['modalidade'],
    status: 'Confirmado' as AgendamentoSessao['status'],
  });

  const agendamentosFiltrados = agendamentos.filter((a) => {
    if (filtroStatus === 'todos') return true;
    return a.status.toLowerCase() === filtroStatus.toLowerCase();
  });

  const handleSalvarAgendamento = (e: React.FormEvent) => {
    e.preventDefault();
    const paciente = pacientes.find((p) => p.nome === novoAgendamento.pacienteNome);

    adicionarAgendamento({
      pacienteId: paciente?.id || 'pac-avulso',
      pacienteNome: novoAgendamento.pacienteNome,
      setor: novoAgendamento.setor,
      psicologoNome: novoAgendamento.psicologoNome,
      data: novoAgendamento.data,
      horario: novoAgendamento.horario,
      tipo: novoAgendamento.tipo,
      modalidade: novoAgendamento.modalidade,
      status: 'Confirmado',
    });

    setModalNovo(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-100 text-purple-700">
              <CalendarDays className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Plantão Psicológico & Consultas Ocupacionais
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Gestão de agendamentos, acolhimentos espontâneos e sessões de retorno do IAS Conecta
          </p>
        </div>

        <button
          onClick={() => setModalNovo(true)}
          className="inline-flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-md shadow-purple-700/20"
        >
          <Plus className="w-4 h-4" />
          Agendar Consulta / Plantão
        </button>
      </div>

      {/* Filtros rápidos */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Filtrar:</span>
        {['todos', 'confirmado', 'realizado', 'cancelado'].map((st) => (
          <button
            key={st}
            onClick={() => setFiltroStatus(st)}
            className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize transition ${
              filtroStatus === st
                ? 'bg-purple-700 text-white font-bold'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Lista de Sessões Agendadas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agendamentosFiltrados.map((ag) => {
          const isCancelado = ag.status === 'Cancelado';
          const isRealizado = ag.status === 'Realizado';

          return (
            <div
              key={ag.id}
              className={`bg-white rounded-2xl p-5 border transition space-y-3 ${
                isCancelado
                  ? 'border-slate-200 opacity-60'
                  : 'border-slate-200/80 shadow-2xs hover:shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                    {ag.tipo}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 mt-1">
                    {ag.pacienteNome}
                  </h3>
                  <p className="text-[11px] text-slate-500">{ag.setor}</p>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isCancelado
                      ? 'bg-rose-100 text-rose-700'
                      : isRealizado
                      ? 'bg-slate-100 text-slate-700'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {ag.status}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{ag.data}</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono font-semibold">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{ag.horario}</span>
                </div>
                <div className="flex items-center gap-1.5 col-span-2 text-[11px] text-purple-900">
                  <User className="w-3.5 h-3.5 text-purple-600" />
                  <span>Profissional: <strong>{ag.psicologoNome}</strong></span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                  {ag.modalidade.includes('Online') ? (
                    <Video className="w-3.5 h-3.5 text-blue-500" />
                  ) : (
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  )}
                  {ag.modalidade}
                </span>

                {!isCancelado && !isRealizado && (
                  <button
                    onClick={() => cancelarAgendamento(ag.id)}
                    className="text-[11px] font-semibold text-rose-600 hover:text-rose-700 hover:underline"
                  >
                    Cancelar Horário
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Novo Agendamento */}
      {modalNovo && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-slate-900">
                Novo Agendamento Psicológico
              </h3>
              <button
                onClick={() => setModalNovo(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSalvarAgendamento} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Colaborador / Paciente:</label>
                <select
                  value={novoAgendamento.pacienteNome}
                  onChange={(e) => {
                    const pac = pacientes.find((p) => p.nome === e.target.value);
                    setNovoAgendamento({
                      ...novoAgendamento,
                      pacienteNome: e.target.value,
                      setor: pac?.setor || 'Operações',
                    });
                  }}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  {pacientes.map((p) => (
                    <option key={p.id} value={p.nome}>
                      {p.nome} - {p.cargo} ({p.setor})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Data:</label>
                  <input
                    type="text"
                    placeholder="DD/MM/AAAA"
                    value={novoAgendamento.data}
                    onChange={(e) => setNovoAgendamento({ ...novoAgendamento, data: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Horário:</label>
                  <input
                    type="text"
                    placeholder="14:00 - 14:50"
                    value={novoAgendamento.horario}
                    onChange={(e) => setNovoAgendamento({ ...novoAgendamento, horario: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tipo:</label>
                  <select
                    value={novoAgendamento.tipo}
                    onChange={(e: any) => setNovoAgendamento({ ...novoAgendamento, tipo: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Sessão Individual">Sessão Individual</option>
                    <option value="Plantão de Acolhimento">Plantão de Acolhimento</option>
                    <option value="Feedback de Avaliação">Feedback de Avaliação</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Modalidade:</label>
                  <select
                    value={novoAgendamento.modalidade}
                    onChange={(e: any) => setNovoAgendamento({ ...novoAgendamento, modalidade: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Online (IAS Conecta)">Online (IAS Conecta)</option>
                    <option value="Presencial (Ambulatório)">Presencial (Ambulatório)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalNovo(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold transition shadow-xs"
                >
                  Confirmar Agendamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
