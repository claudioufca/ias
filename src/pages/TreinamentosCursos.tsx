import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CursoCapacitacao } from '../lib/types';
import {
  GraduationCap,
  CheckCircle2,
  Clock,
  Users,
  Award,
  Play,
  FileCheck,
  ShieldCheck,
  ChevronRight,
  BookOpen,
  Sparkles,
  Download
} from 'lucide-react';

export const TreinamentosCursos: React.FC = () => {
  const { cursos, marcarModuloConcluido, usuarioAtual } = useAuth();
  const [cursoSelecionadoId, setCursoSelecionadoId] = useState<string>(cursos[0]?.id || '');
  const [modalCertificado, setModalCertificado] = useState<CursoCapacitacao | null>(null);

  const cursoSelecionado = cursos.find((c) => c.id === cursoSelecionadoId) || cursos[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-teal-100 text-teal-700">
              <GraduationCap className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Academia IAS & Treinamentos NR-01
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Capacitações obrigatórias de segurança psicossocial, liderança humanizada e ergonomia cognitiva
          </p>
        </div>
      </div>

      {/* Grid de Cursos Disponíveis */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cursos.map((curso) => {
          const isSelected = curso.id === cursoSelecionado?.id;
          const isCompleto = curso.progresso === 100;

          return (
            <div
              key={curso.id}
              onClick={() => setCursoSelecionadoId(curso.id)}
              className={`cursor-pointer rounded-2xl p-5 border transition flex flex-col justify-between ${
                isSelected
                  ? 'bg-teal-50/70 border-teal-300 ring-2 ring-teal-500/20 shadow-xs'
                  : 'bg-white hover:bg-slate-50 border-slate-200/80 shadow-2xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                      curso.obrigatorio
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    {curso.obrigatorio ? 'Obrigatório NR-01' : 'Eletivo'}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {curso.cargaHoraria}
                  </span>
                </div>

                <h3 className="font-bold text-xs text-slate-900 line-clamp-2 leading-snug">
                  {curso.titulo}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                  {curso.descricao}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="flex justify-between text-[11px] font-semibold text-slate-600 mb-1">
                  <span>Progresso</span>
                  <span className={isCompleto ? 'text-teal-700 font-bold' : ''}>
                    {curso.progresso}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      isCompleto ? 'bg-teal-600' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${curso.progresso}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detalhes do Curso Selecionado e Módulos */}
      {cursoSelecionado && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-bold bg-teal-100 text-teal-800 px-2.5 py-0.5 rounded-md">
                  {cursoSelecionado.categoria}
                </span>
                <span className="text-xs text-slate-400">&bull; {cursoSelecionado.cargaHoraria}</span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">
                {cursoSelecionado.titulo}
              </h2>
              <p className="text-xs text-slate-600 mt-2 max-w-2xl leading-relaxed">
                {cursoSelecionado.descricao}
              </p>
              <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-500">
                <span><strong>Instrutor(a):</strong> {cursoSelecionado.instrutor}</span>
                <span><strong>Público:</strong> {cursoSelecionado.publicoAlvo}</span>
                <span><strong>Alunos na empresa:</strong> {cursoSelecionado.totalAlunos} matriculados</span>
              </div>
            </div>

            {cursoSelecionado.progresso === 100 && (
              <button
                onClick={() => setModalCertificado(cursoSelecionado)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-extrabold text-xs px-4 py-3 rounded-2xl transition shadow-md shadow-teal-600/20 shrink-0"
              >
                <Award className="w-4 h-4 text-amber-300" />
                Visualizar Certificado MTE
              </button>
            )}
          </div>

          {/* Módulos do Curso */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-teal-600" />
              Módulos e Aulas Práticas (Clique para marcar como concluído)
            </h3>

            <div className="space-y-2.5">
              {cursoSelecionado.modulos.map((modulo, idx) => (
                <div
                  key={idx}
                  onClick={() => marcarModuloConcluido(cursoSelecionado.id, idx)}
                  className={`cursor-pointer p-4 rounded-2xl border transition flex items-center justify-between gap-4 ${
                    modulo.concluido
                      ? 'bg-teal-50/50 border-teal-200'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold transition ${
                        modulo.concluido
                          ? 'bg-teal-600 text-white'
                          : 'bg-white text-slate-500 border border-slate-200'
                      }`}
                    >
                      {modulo.concluido ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>
                    <div>
                      <p className={`text-xs font-bold ${modulo.concluido ? 'text-teal-950' : 'text-slate-900'}`}>
                        {modulo.titulo}
                      </p>
                      <p className="text-[11px] text-slate-500">Duração estimada: {modulo.duracao}</p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      modulo.concluido
                        ? 'bg-teal-100 text-teal-800'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {modulo.concluido ? 'Concluído' : 'Pendente'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal Certificado Digital */}
      {modalCertificado && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border-4 border-teal-700 text-center relative space-y-4">
            <button
              onClick={() => setModalCertificado(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              ✕
            </button>

            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-50 border-2 border-teal-600 text-teal-700 mx-auto">
              <Award className="w-8 h-8 text-amber-500" />
            </div>

            <p className="text-[11px] font-bold uppercase tracking-widest text-teal-800">
              Certificado de Conclusão Ocupacional &bull; NR-01 GRO
            </p>

            <h2 className="text-xl font-black text-slate-900">
              Certificamos que {usuarioAtual.nome}
            </h2>

            <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
              concluiu com êxito o treinamento corporativo de <strong className="text-slate-900">"{modalCertificado.titulo}"</strong> com carga horária de <strong className="text-slate-900">{modalCertificado.cargaHoraria}</strong>, abordando prevenção a riscos psicossociais, ergonomia cognitiva e diretrizes de SST.
            </p>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Registro: IAS-{Math.floor(100000 + Math.random() * 900000)}</span>
              <span>Emitido em: {new Date().toLocaleDateString('pt-BR')}</span>
              <span className="font-bold text-teal-700">Válido perante o MTE</span>
            </div>

            <button
              onClick={() => window.print()}
              className="mt-2 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition inline-flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              Imprimir Certificado
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
