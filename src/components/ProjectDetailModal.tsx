import React, { useState } from 'react';
import { Project, Language } from '../types';
import { COMPANY_INFO } from '../data/initialData';
import {
  X,
  MapPin,
  Calendar,
  Building2,
  Coins,
  Clock,
  CheckCircle2,
  MessageCircle,
  Layers,
  ArrowRightLeft,
  ShieldCheck,
} from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  lang: Language;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  lang,
}) => {
  const [activePhoto, setActivePhoto] = useState<'after' | 'before'>('after');

  if (!project) return null;
  const isId = lang === 'id';

  const handleConsult = () => {
    const text = encodeURIComponent(
      isId
        ? `Halo PT. Anugerah Jaya Pratama, saya tertarik dengan portofolio proyek "${project.title}". Mohon informasi konsultasi untuk proyek sejenis.`
        : `Hello PT. Anugerah Jaya Pratama, I am interested in your project portfolio "${project.titleEn || project.title}". Please advise on similar projects.`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden my-8 border border-slate-200">
        {/* Modal Header */}
        <div className="bg-[#0A2342] text-white p-5 sm:p-6 flex items-start justify-between border-b-2 border-[#C9A961]">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#C9A961] text-[#0A2342]">
                {project.category.toUpperCase()}
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-white/10 text-slate-200 border border-white/20">
                {project.clientType === 'pemerintah' ? 'Proyek Pemerintah' : 'Swasta / BUMN'}
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Tahun {project.year}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white leading-tight">
              {isId ? project.title : (project.titleEn || project.title)}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition ml-4 shrink-0"
            aria-label="Tutup Detail Proyek"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Before & After Interactive Showcase */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4 text-[#C9A961]" />
                <span className="text-sm font-bold text-slate-800">
                  {isId ? 'Dokumentasi Fisik Pekerjaan (Before - After)' : 'Physical Progress Documentation (Before - After)'}
                </span>
              </div>

              {/* Photo Toggle */}
              <div className="inline-flex rounded-lg border border-slate-300 p-0.5 bg-slate-100">
                <button
                  type="button"
                  onClick={() => setActivePhoto('before')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition ${
                    activePhoto === 'before'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isId ? 'Kondisi Awal (Before)' : 'Initial (Before)'}
                </button>
                <button
                  type="button"
                  onClick={() => setActivePhoto('after')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition ${
                    activePhoto === 'after'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isId ? 'Hasil Akhir (After 100%)' : 'Finished (After 100%)'}
                </button>
              </div>
            </div>

            {/* Photo Container */}
            <div className="relative rounded-lg overflow-hidden h-72 sm:h-96 bg-slate-900 shadow-inner group">
              <img
                src={activePhoto === 'after' ? project.afterImage : project.beforeImage}
                alt={`${project.title} - ${activePhoto}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Photo Label Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span
                  className={`px-3 py-1 rounded-md text-xs font-extrabold uppercase tracking-wider text-white shadow ${
                    activePhoto === 'after' ? 'bg-emerald-600' : 'bg-amber-600'
                  }`}
                >
                  {activePhoto === 'after'
                    ? isId
                      ? '✓ Serah Terima / Selesai 100%'
                      : '✓ Completed 100%'
                    : isId
                    ? '⚠ Kondisi Awal Lapangan (Before)'
                    : '⚠ Initial Site Condition'}
                </span>
              </div>

              {/* Quick switch button overlaid */}
              <button
                type="button"
                onClick={() => setActivePhoto(activePhoto === 'after' ? 'before' : 'after')}
                className="absolute bottom-4 right-4 z-10 px-3 py-1.5 rounded-lg bg-[#0A2342]/90 hover:bg-[#0A2342] text-white text-xs font-semibold flex items-center gap-1.5 backdrop-blur-xs border border-white/20 shadow"
              >
                <ArrowRightLeft className="w-3.5 h-3.5 text-[#C9A961]" />
                <span>
                  {activePhoto === 'after'
                    ? isId
                      ? 'Lihat Foto Before'
                      : 'View Before Photo'
                    : isId
                    ? 'Lihat Foto Selesai'
                    : 'View Completed Photo'}
                </span>
              </button>
            </div>
          </div>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-[#0A2342]" />
                {isId ? 'Instansi / Klien' : 'Client / Agency'}
              </span>
              <p className="text-sm font-bold text-slate-800 leading-snug">{project.clientName}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#0A2342]" />
                {isId ? 'Lokasi Proyek' : 'Location'}
              </span>
              <p className="text-sm font-bold text-slate-800 leading-snug">{project.location}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-1">
                <Coins className="w-3.5 h-3.5 text-[#C9A961]" />
                {isId ? 'Nilai Kontrak' : 'Contract Value'}
              </span>
              <p className="text-sm font-extrabold text-[#C9A961] leading-snug">{project.budget}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#0A2342]" />
                {isId ? 'Durasi Waktu' : 'Duration'}
              </span>
              <p className="text-sm font-bold text-slate-800 leading-snug">{project.duration}</p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="font-heading font-bold text-slate-900 text-sm tracking-wide uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0A2342]" />
              {isId ? 'Deskripsi Teknis & Spesifikasi Pelaksanaan' : 'Technical Specifications & Execution'}
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {isId ? project.description : (project.descriptionEn || project.description)}
            </p>
          </div>

          {/* Scope of Work */}
          {project.scopeOfWork && project.scopeOfWork.length > 0 && (
            <div className="space-y-2.5">
              <h4 className="font-heading font-bold text-slate-900 text-sm tracking-wide uppercase flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#C9A961]" />
                {isId ? 'Lingkup Pekerjaan (Scope of Work)' : 'Scope of Work'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.scopeOfWork.map((scope, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-100/80 border border-slate-200 text-xs font-semibold text-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{scope}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Legal / LPSE Reference if present */}
          {project.lpsePackageCode && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-900">
              <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
              <span>
                <strong>{isId ? 'Kode Paket Tender LPSE / e-Katalog' : 'LPSE / e-Catalog Package Code'}:</strong> {project.lpsePackageCode}
              </span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200">
          <div className="text-xs text-slate-500">
            {isId
              ? 'Seluruh pekerjaan didokumentasikan dan diserahkan tepat waktu (BAST Selesai).'
              : 'All works completed on schedule with official handover certificates.'}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-200 rounded-lg border border-slate-300 transition"
            >
              {isId ? 'Tutup' : 'Close'}
            </button>

            <button
              onClick={handleConsult}
              className="w-1/2 sm:w-auto px-4 py-2 text-xs font-bold text-white bg-[#16a34a] hover:bg-[#15803d] rounded-lg shadow flex items-center justify-center gap-2 transition"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>{isId ? 'Konsultasi Proyek Serupa' : 'Consult on Similar Project'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
