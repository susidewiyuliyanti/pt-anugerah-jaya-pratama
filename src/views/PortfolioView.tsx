import React, { useState, useMemo } from 'react';
import { Project, Language, ProjectCategory, ClientType } from '../types';
import {
  Building2,
  MapPin,
  Coins,
  Calendar,
  Search,
  Filter,
  ArrowRightLeft,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface PortfolioViewProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  lang: Language;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({
  projects,
  onSelectProject,
  lang,
}) => {
  const isId = lang === 'id';

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedClientType, setSelectedClientType] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract unique years
  const availableYears = useMemo(() => {
    const rawYears = projects.map((p) => Number(p.year));
    const unique = Array.from(new Set(rawYears)) as number[];
    return unique.sort((a: number, b: number) => b - a);
  }, [projects]);

  // Filtered list
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      // Client type filter
      if (selectedClientType !== 'all' && p.clientType !== selectedClientType) return false;
      // Year filter
      if (selectedYear !== 'all' && p.year.toString() !== selectedYear) return false;
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(query);
        const matchClient = p.clientName.toLowerCase().includes(query);
        const matchLocation = p.location.toLowerCase().includes(query);
        const matchTags = p.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchTitle && !matchClient && !matchLocation && !matchTags) return false;
      }
      return true;
    });
  }, [projects, selectedCategory, selectedClientType, selectedYear, searchQuery]);

  return (
    <div className="space-y-12 sm:space-y-16 py-8 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Header Banner */}
      <section className="bg-[#0A2342] text-white py-12 sm:py-16 rounded-2xl relative overflow-hidden px-6 sm:px-12 border-b-4 border-[#C9A961]">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#DFBA73] bg-[#C9A961]/20 px-3 py-1 rounded border border-[#C9A961]/30">
            {isId ? 'REKAM JEJAK PEKERJAAN' : 'PROJECT DOSSIER'}
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white mt-4 tracking-tight">
            {isId ? 'Portofolio Proyek Terlaksana' : 'Completed Project Portfolio'}
          </h1>
          <p className="mt-3 text-base text-slate-200 leading-relaxed">
            {isId
              ? 'Kumpulan dokumentasi fisik, spesifikasi kontrak, dan dokumentasi Before-After proyek konstruksi dan pengadaan pemerintah.'
              : 'Documentation, contract specifications, and before-after physical records of completed works.'}
          </p>
        </div>
      </section>

      {/* Filter Bar & Controls */}
      <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isId ? 'Cari proyek, instansi, lokasi...' : 'Search project, agency, location...'}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2342]"
            />
          </div>

          {/* Filter Selectors */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            {/* Category Filter */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-slate-500 font-semibold">{isId ? 'Kategori:' : 'Category:'}</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-300 bg-white font-medium text-xs focus:outline-none focus:ring-2 focus:ring-[#0A2342]"
              >
                <option value="all">{isId ? 'Semua Kategori' : 'All Categories'}</option>
                <option value="konstruksi">{isId ? 'Konstruksi & Gedung' : 'Construction'}</option>
                <option value="pengadaan">{isId ? 'Pengadaan e-Katalog' : 'Procurement'}</option>
                <option value="konsultan">{isId ? 'Konsultan Proyek' : 'Consultancy'}</option>
              </select>
            </div>

            {/* Client Type Filter (Pemerintah vs Swasta) */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-slate-500 font-semibold">{isId ? 'Jenis Klien:' : 'Client Type:'}</span>
              <select
                value={selectedClientType}
                onChange={(e) => setSelectedClientType(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-300 bg-white font-medium text-xs focus:outline-none focus:ring-2 focus:ring-[#0A2342]"
              >
                <option value="all">{isId ? 'Semua Klien' : 'All Clients'}</option>
                <option value="pemerintah">{isId ? 'Pemerintah (APBD/APBN)' : 'Government'}</option>
                <option value="swasta">{isId ? 'Swasta / Mitra BUMN' : 'Private / SOE'}</option>
              </select>
            </div>

            {/* Year Filter */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-slate-500 font-semibold">{isId ? 'Tahun:' : 'Year:'}</span>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-300 bg-white font-medium text-xs focus:outline-none focus:ring-2 focus:ring-[#0A2342]"
              >
                <option value="all">{isId ? 'Semua Tahun' : 'All Years'}</option>
                {availableYears.map((yr) => (
                  <option key={yr} value={yr.toString()}>
                    {yr}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Filters */}
            {(selectedCategory !== 'all' ||
              selectedClientType !== 'all' ||
              selectedYear !== 'all' ||
              searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedClientType('all');
                  setSelectedYear('all');
                  setSearchQuery('');
                }}
                className="px-3 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 rounded-lg transition"
              >
                {isId ? 'Reset Filter' : 'Reset'}
              </button>
            )}
          </div>
        </div>

        {/* Counter Info */}
        <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 flex items-center justify-between">
          <span>
            {isId ? 'Menampilkan' : 'Showing'}{' '}
            <strong className="text-slate-900">{filteredProjects.length}</strong>{' '}
            {isId ? 'proyek terselesaikan' : 'completed projects'}
          </span>
          <span className="text-emerald-700 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            BAST 100% Selesai
          </span>
        </div>
      </section>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer group transform hover:-translate-y-1.5"
            >
              {/* Photo Area with Before/After Badge */}
              <div className="relative h-52 overflow-hidden bg-slate-900">
                <img
                  src={project.afterImage}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-[#0A2342] text-white shadow">
                    {project.category}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/90 text-slate-800 shadow">
                    {project.clientType === 'pemerintah' ? 'Pemerintah' : 'Swasta/BUMN'}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#C9A961] text-[#0A2342] shadow">
                    {project.year}
                  </span>
                </div>

                {/* Before/After Hover Indicator */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-white bg-black/60 px-2 py-1 rounded backdrop-blur-xs">
                  <ArrowRightLeft className="w-3.5 h-3.5 text-[#DFBA73]" />
                  <span className="text-[11px] font-medium">Foto Before - After</span>
                </div>

                {/* Budget on bottom right */}
                <div className="absolute bottom-3 right-3">
                  <span className="text-xs font-black text-[#DFBA73] bg-[#0A2342]/90 px-2.5 py-1 rounded shadow">
                    {project.budget}
                  </span>
                </div>
              </div>

              {/* Content Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5 font-medium">
                    <Building2 className="w-3.5 h-3.5 text-[#0A2342] shrink-0" />
                    <span className="line-clamp-1">{project.clientName}</span>
                  </div>

                  <h3 className="font-heading font-bold text-base text-[#0A2342] group-hover:text-[#13335A] leading-snug line-clamp-2">
                    {isId ? project.title : (project.titleEn || project.title)}
                  </h3>

                  <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {isId ? project.description : (project.descriptionEn || project.description)}
                  </p>
                </div>

                {/* Bottom specs */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="line-clamp-1">{project.location}</span>
                  </span>

                  <span className="text-[#C9A961] font-bold group-hover:underline flex items-center gap-1 shrink-0">
                    <span>Lihat Detail</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <p className="text-base text-slate-600 font-medium">
            {isId ? 'Tidak ada proyek yang sesuai dengan kriteria filter.' : 'No projects matched the selected filters.'}
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedClientType('all');
              setSelectedYear('all');
              setSearchQuery('');
            }}
            className="mt-3 px-4 py-2 bg-[#0A2342] text-white rounded-lg text-xs font-bold"
          >
            {isId ? 'Hapus Semua Filter' : 'Clear All Filters'}
          </button>
        </div>
      )}
    </div>
  );
};
