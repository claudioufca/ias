import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Vaga, Candidato, MatchResultado } from '../lib/types';
import { calcularMatchCandidatoVaga } from '../lib/gemini';
import {
  Briefcase,
  Sparkles,
  Users,
  Search,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Loader2,
  ArrowRight
} from 'lucide-react';

export const PortalVagas: React.FC = () => {
  const { vagas, candidatos, atualizarCandidato } = useAuth();
  const [vagaSelecionadaId, setVagaSelecionadaId] = useState<string>(vagas[0]?.id || '');
  const [candidatoSelecionadoId, setCandidatoSelecionadoId] = useState<string>(
    vagas[0]?.candidatosInscritos[0] || candidatos[0]?.id || ''
  );
  const [calculandoMatch, setCalculandoMatch] = useState(false);

  const vagaSelecionada = vagas.find((v) => v.id === vagaSelecionadaId) || vagas[0];
  const candidatoSelecionado =
    candidatos.find((c) => c.id === candidatoSelecionadoId) || candidatos[0];

  const matchAtual: MatchResultado | undefined =
    candidatoSelecionado?.matchesPorVaga?.[vagaSelecionada?.id];

  const handleCalcularMatch = async () => {
    if (!vagaSelecionada || !candidatoSelecionado) return;
    setCalculandoMatch(true);

    try {
      const resultado = await calcularMatchCandidatoVaga(candidatoSelecionado, vagaSelecionada);
      const novosMatches = {
        ...(candidatoSelecionado.matchesPorVaga || {}),
        [vagaSelecionada.id]: resultado,
      };

      atualizarCandidato({
        ...candidatoSelecionado,
        matchesPorVaga: novosMatches,
      });
    } catch (err) {
      console.error('Erro ao calcular match:', err);
    } finally {
      setCalculandoMatch(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="pb-2 border-b border-slate-200/60">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          Portal de Vagas & Seleção
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Triagem estratégica e análise comportamental com <strong>Match IA Gemini</strong>.
        </p>
      </div>

      {/* Seletor de Vagas - Abas Limpas */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {vagas.map((vaga) => {
          const isSelected = vaga.id === vagaSelecionada?.id;
          return (
            <button
              key={vaga.id}
              onClick={() => {
                setVagaSelecionadaId(vaga.id);
                if (vaga.candidatosInscritos.length > 0) {
                  setCandidatoSelecionadoId(vaga.candidatosInscritos[0]);
                }
              }}
              className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200'
              }`}
            >
              <span>{vaga.titulo}</span>
              <span className={`ml-2 text-[10px] ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                ({vaga.candidatosInscritos.length})
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Candidatos + Perfil Detalhado com Match IA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Coluna Esquerda: Candidatos Inscritos (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200/80 p-4 space-y-3">
          <div className="flex items-center justify-between pb-1">
            <span className="text-xs font-bold text-slate-800">Candidatos Inscritos</span>
            <span className="text-[11px] text-slate-400">
              {vagaSelecionada?.candidatosInscritos.length} perfis
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {candidatos
              .filter((c) => vagaSelecionada?.candidatosInscritos.includes(c.id))
              .map((cand) => {
                const isSelected = cand.id === candidatoSelecionado?.id;
                const matchSalvo = cand.matchesPorVaga?.[vagaSelecionada?.id];

                return (
                  <button
                    key={cand.id}
                    onClick={() => setCandidatoSelecionadoId(cand.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors flex items-center gap-3 ${
                      isSelected ? 'bg-slate-100' : 'hover:bg-slate-50'
                    }`}
                  >
                    <img
                      src={cand.avatar}
                      alt={cand.nome}
                      className="w-9 h-9 rounded-full object-cover border border-slate-200"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-xs text-slate-900 truncate">
                        {cand.nome}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {cand.cargoAtual}
                      </p>
                    </div>

                    {matchSalvo && (
                      <span className="text-xs font-bold font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        {matchSalvo.percentualMatch}%
                      </span>
                    )}
                  </button>
                );
              })}
          </div>
        </div>

        {/* Coluna Direita: Detalhe do Candidato e Painel de Match IA (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {candidatoSelecionado && (
            <div className="bg-white rounded-xl border border-slate-200/80 p-5 space-y-5">
              {/* Top Banner Candidato */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <img
                    src={candidatoSelecionado.avatar}
                    alt={candidatoSelecionado.nome}
                    className="w-12 h-12 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h2 className="text-base font-bold text-slate-900">
                      {candidatoSelecionado.nome}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {candidatoSelecionado.cargoAtual} &bull; {candidatoSelecionado.formacao}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Pretensão: {candidatoSelecionado.pretensaoSalarial}
                    </p>
                  </div>
                </div>

                {/* BOTÃO MATCH IA */}
                <button
                  onClick={handleCalcularMatch}
                  disabled={calculandoMatch}
                  className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-colors shadow-2xs shrink-0 disabled:opacity-50"
                >
                  {calculandoMatch ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Calculando Match IA...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>⚡ Match IA com a Vaga</span>
                    </>
                  )}
                </button>
              </div>

              {/* Bio & Skills */}
              <div className="space-y-3 text-xs">
                <div>
                  <strong className="text-slate-900 block mb-1">Resumo Profissional:</strong>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {candidatoSelecionado.bio}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <strong className="text-slate-700 block mb-1.5 text-[11px] uppercase tracking-wide">
                      Competências Técnicas
                    </strong>
                    <div className="flex flex-wrap gap-1">
                      {candidatoSelecionado.habilidadesTecnicas.map((h, i) => (
                        <span
                          key={i}
                          className="bg-slate-100 text-slate-700 text-[11px] px-2 py-0.5 rounded"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <strong className="text-slate-700 block mb-1.5 text-[11px] uppercase tracking-wide">
                      Soft Skills & Perfil
                    </strong>
                    <div className="flex flex-wrap gap-1">
                      {candidatoSelecionado.softSkills.map((s, i) => (
                        <span
                          key={i}
                          className="bg-emerald-50 text-emerald-800 text-[11px] px-2 py-0.5 rounded"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* RELATÓRIO DO MATCH IA */}
              {matchAtual ? (
                <div className="rounded-xl border border-blue-200 bg-blue-50/30 p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-blue-200/60">
                    <div>
                      <h3 className="font-bold text-xs text-blue-950">
                        Resultado do Match IA &bull; {vagaSelecionada?.titulo}
                      </h3>
                      <p className="text-[10px] text-blue-700">
                        Classificação: <strong>{matchAtual.nivelAderencia}</strong>
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-2xl font-bold font-mono text-blue-700 tabular-nums">
                        {matchAtual.percentualMatch}%
                      </span>
                      <span className="text-[10px] text-slate-500 block">aderência</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-blue-100">
                    {matchAtual.resumoExecutivo}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    {/* Pontos Fortes */}
                    <div className="bg-white p-3 rounded-lg border border-slate-200/80 space-y-1.5">
                      <strong className="text-emerald-800 text-[11px] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Pontos Fortes
                      </strong>
                      <ul className="space-y-1 text-[11px] text-slate-600">
                        {matchAtual.pontosFortes.map((p, i) => (
                          <li key={i}>&bull; {p}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Lacunas */}
                    <div className="bg-white p-3 rounded-lg border border-slate-200/80 space-y-1.5">
                      <strong className="text-amber-800 text-[11px] flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                        Pontos de Atenção / Lacunas
                      </strong>
                      <ul className="space-y-1 text-[11px] text-slate-600">
                        {matchAtual.lacunas.map((l, i) => (
                          <li key={i}>&bull; {l}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Fit e Perguntas */}
                  <div className="bg-white p-3 rounded-lg border border-slate-200/80 space-y-2 text-xs">
                    <div>
                      <strong className="text-slate-900 block mb-0.5">Fit Psicossocial no Trabalho:</strong>
                      <p className="text-slate-600 text-[11px]">{matchAtual.fitPsicossocial}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <strong className="text-slate-900 block mb-1">
                        Perguntas Sugeridas para a Entrevista:
                      </strong>
                      <div className="space-y-1 text-[11px] text-slate-600">
                        {matchAtual.perguntasEntrevista.map((perg, i) => (
                          <p key={i}>
                            <strong>{i + 1}.</strong> "{perg}"
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
                  Clique no botão <strong>"⚡ Match IA com a Vaga"</strong> acima para gerar a análise comparativa de competências e fit comportamental.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
