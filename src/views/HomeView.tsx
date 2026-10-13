import React from 'react';
import { Project, PageTab, Language } from '../types';
import { COMPANY_INFO, CLIENT_PARTNERS } from '../data/initialData';
import { generateCompanyProfilePDF } from '../utils/pdfGenerator';
import {
  HardHat,
  ShoppingBag,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  Coins,
  Award,
  ArrowRight,
  FileDown,
  Building2,
  MapPin,
  Calendar,
  MessageCircle,
  TrendingUp,
  Sparkles,
} from 'lucide-react';

interface HomeViewProps {
  projects: Project[];
  onSelectTab: (tab: PageTab) => void;
  onSelectProject: (project: Project) => void;
  lang: Language;
}

export const HomeView: React.FC<HomeViewProps> = ({
  projects,
  onSelectTab,
  onSelectProject,
  lang,
}) => {
  const isId = lang === 'id';
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 6);

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      isId
        ? 'Halo PT. Anugerah Jaya Pratama, kami bermaksud mengajukan kerjasama proyek pemerintah / konstruksi.'
        : 'Hello PT. Anugerah Jaya Pratama, we would like to propose a project collaboration.'
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[620px] lg:min-h-[700px] flex items-center justify-center bg-[#0A2342] text-white overflow-hidden">
        {/* Background Image with Deep Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1541888946425-d0fbb180c5f5?auto=format&fit=crop&w=2000&q=80"
            alt="Proyek Konstruksi dan Pengadaan Pemerintah"
            className="w-full h-full object-cover object-center opacity-25 scale-105 transform animate-pulse duration-10000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#061629]/95 via-[#0A2342]/90 to-[#0A2342]/80" />
          {/* Subtle geometric pattern overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C9A961_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-20 lg:py-28 text-center sm:text-left flex flex-col items-center sm:items-start">
          {/* Trust Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C9A961]/20 border border-[#C9A961]/40 text-[#DFBA73] text-xs font-bold tracking-wide uppercase mb-6 backdrop-blur-xs shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#DFBA73]" />
            <span>
              {isId
                ? 'REKANAN RESMI PEMERINTAH & BUMN • TERDAFTAR LPSE & e-KATALOG'
                : 'OFFICIAL GOVERNMENT & SOE PARTNER • REGISTERED LPSE & E-CATALOG'}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15] max-w-4xl">
            {isId ? (
              <>
                Mitra Terpercaya Proyek Pemerintah & Konstruksi{' '}
                <span className="text-[#DFBA73] underline decoration-[#C9A961]/60 decoration-wavy decoration-2">
                  Sejak 2015
                </span>
              </>
            ) : (
              <>
                Trusted Partner for Government Projects & Construction{' '}
                <span className="text-[#DFBA73]">Since 2015</span>
              </>
            )}
          </h1>

          {/* Subheading / Tagline */}
          <p className="mt-5 text-base sm:text-lg lg:text-xl text-slate-200 max-w-2xl font-normal leading-relaxed">
            {isId ? COMPANY_INFO.tagline : COMPANY_INFO.taglineEn}.{' '}
            <span className="text-[#DFBA73] font-medium">
              {isId
                ? 'Berbasis di Baleendah, Bandung, mengedepankan kepatuhan hukum, mutu teknis K3, dan integritas pengadaan.'
                : 'Headquartered in Baleendah, Bandung, upholding regulatory compliance, safety excellence, and procurement integrity.'}
            </span>
          </p>

          {/* CTA Button Group */}
          <div className="mt-8 flex flex-wrap items-center justify-center sm:justify-start gap-3.5 w-full sm:w-auto">
            {/* CTA 1: Lihat Portofolio */}
            <button
              id="hero-btn-portfolio"
              onClick={() => onSelectTab('proyek')}
              className="px-6 py-3.5 rounded-lg bg-[#C9A961] hover:bg-[#b8954c] text-[#0A2342] font-heading font-extrabold text-sm tracking-wider uppercase transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transform active:scale-95"
            >
              <span>{isId ? 'Lihat Portofolio' : 'View Portfolio'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* CTA 2: Ajukan Kerjasama */}
            <button
              id="hero-btn-cooperation"
              onClick={() => onSelectTab('kontak')}
              className="px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/30 text-white font-heading font-bold text-sm tracking-wider uppercase transition backdrop-blur-xs flex items-center justify-center gap-2"
            >
              <span>{isId ? 'Ajukan Kerjasama' : 'Propose Project'}</span>
            </button>

            {/* CTA 3: 1-Click PDF */}
            <button
              id="hero-btn-pdf"
              onClick={() => generateCompanyProfilePDF(lang)}
              className="px-5 py-3.5 rounded-lg bg-slate-900/80 hover:bg-slate-900 border border-[#C9A961]/50 text-[#DFBA73] text-xs font-bold transition flex items-center justify-center gap-2"
              title="Unduh Company Profile Resmi PDF"
            >
              <FileDown className="w-4 h-4" />
              <span>{isId ? 'Unduh PDF Profil' : 'Download PDF Profile'}</span>
            </button>
          </div>

          {/* Quick Statistics Strip */}
          <div className="mt-12 sm:mt-16 pt-8 border-t border-slate-700/60 w-full grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {COMPANY_INFO.stats.map((st, idx) => (
              <div key={idx} className="bg-slate-900/40 p-3.5 rounded-lg border border-slate-700/40">
                <p className="font-heading font-black text-2xl sm:text-3xl text-[#DFBA73] tracking-tight">
                  {st.value}
                </p>
                <p className="text-xs text-slate-300 font-medium mt-0.5">
                  {isId ? st.labelId : st.labelEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. THREE CORE SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C9A961] bg-[#C9A961]/10 px-3 py-1 rounded-full border border-[#C9A961]/20">
            {isId ? 'Kompetensi & Kapabilitas Utama' : 'Core Capabilities'}
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-4xl text-[#0A2342] mt-3 tracking-tight">
            {isId ? '3 Layanan Utama Berstandar Kredibel' : '3 Premier Corporate Service Lines'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            {isId
              ? 'Menjawab kebutuhan tender pemerintah dan korporasi melalui kepatuhan regulasi, tenaga ahli bersertifikat, dan infrastruktur logistik andal.'
              : 'Serving government tenders and corporate requirements through full regulatory compliance and certified engineers.'}
          </p>
        </div>

        {/* 3 Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Service 1: Konstruksi & Bangunan */}
          <div className="bg-white rounded-xl p-7 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#0A2342] group-hover:bg-[#C9A961] transition-colors" />
            <div>
              <div className="w-14 h-14 rounded-xl bg-[#0A2342] text-[#DFBA73] flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                <HardHat className="w-7 h-7" />
              </div>

              <h3 className="font-heading font-extrabold text-xl text-[#0A2342] mb-3 group-hover:text-[#13335A]">
                {isId ? 'Jasa Konstruksi & Bangunan' : 'Construction & Civil Works'}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                {isId
                  ? 'Pembangunan gedung bertingkat, rumah sakit daerah, fasilitas pendidikan, perkerasan jalan rigid pavement, jembatan baja, dan saluran drainase terpadu dengan standar K3 Zero Accident.'
                  : 'Multi-storey buildings, regional hospitals, educational facilities, rigid pavement roadworks, and steel bridges.'}
              </p>

              <ul className="space-y-2 text-xs text-slate-700 font-medium mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Gedung Fasilitas Kesehatan & Sekolah</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Jalan Rigid Pavement & Jembatan Baja</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Kawasan Industri & Perumahan</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectTab('layanan')}
              className="w-full py-2.5 px-4 rounded-lg bg-slate-50 hover:bg-[#0A2342] hover:text-white text-[#0A2342] text-xs font-bold transition flex items-center justify-center gap-2 border border-slate-200"
            >
              <span>{isId ? 'Detail Konstruksi' : 'Explore Construction'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Service 2: Pengadaan Barang & Jasa Pemerintah */}
          <div className="bg-white rounded-xl p-7 border-2 border-[#C9A961]/60 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#C9A961]" />
            <div className="absolute top-3 right-3">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#C9A961]/20 text-[#A5843E] border border-[#C9A961]/40">
                e-Katalog LKPP
              </span>
            </div>

            <div>
              <div className="w-14 h-14 rounded-xl bg-[#C9A961] text-[#0A2342] flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-7 h-7" />
              </div>

              <h3 className="font-heading font-extrabold text-xl text-[#0A2342] mb-3">
                {isId ? 'Pengadaan Barang & Jasa Pemerintah' : 'Government Goods Procurement'}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                {isId
                  ? 'Penyedia resmi terverifikasi pada sistem e-Katalog LKPP dan LPSE Nasional. Melayani pengadaan peralatan IT, komputer server, ATK kantor dinas, kendaraan operasional, dan alkes.'
                  : 'Verified supplier on LKPP e-Catalog & LPSE portals. Supplying IT hardware, servers, office stationery, specialized municipal vehicles, and certified medical devices.'}
              </p>

              <ul className="space-y-2 text-xs text-slate-700 font-medium mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Perangkat IT & Server Jaringan LKPP</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Armada Truk & Kendaraan Dinas Khusus</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Alat Kesehatan Rumah Sakit & Reagen</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectTab('layanan')}
              className="w-full py-2.5 px-4 rounded-lg bg-[#0A2342] text-white hover:bg-[#13335A] text-xs font-bold transition flex items-center justify-center gap-2 shadow"
            >
              <span>{isId ? 'Katalog Pengadaan & LPSE' : 'Procurement & LPSE'}</span>
              <ArrowRight className="w-4 h-4 text-[#DFBA73]" />
            </button>
          </div>

          {/* Service 3: Konsultan Proyek */}
          <div className="bg-white rounded-xl p-7 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#0A2342] group-hover:bg-[#C9A961] transition-colors" />
            <div>
              <div className="w-14 h-14 rounded-xl bg-[#0A2342] text-[#DFBA73] flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                <Briefcase className="w-7 h-7" />
              </div>

              <h3 className="font-heading font-extrabold text-xl text-[#0A2342] mb-3 group-hover:text-[#13335A]">
                {isId ? 'Konsultan Proyek' : 'Project Consultancy'}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                {isId
                  ? 'Jasa manajemen proyek terintegrasi, studi kelayakan teknis (feasibility study), pengawasan berkala konstruksi, audit struktur berkala, dan pemeliharaan (maintenance) sarana vital.'
                  : 'Integrated construction management, feasibility studies, independent engineering supervision, structural audits, and facility maintenance.'}
              </p>

              <ul className="space-y-2 text-xs text-slate-700 font-medium mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Manajemen Konstruksi & Supervisi Site</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Studi Kelayakan Teknis & Perencanaan DED</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Audit Kelaikan Struktur & SMK3</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectTab('layanan')}
              className="w-full py-2.5 px-4 rounded-lg bg-slate-50 hover:bg-[#0A2342] hover:text-white text-[#0A2342] text-xs font-bold transition flex items-center justify-center gap-2 border border-slate-200"
            >
              <span>{isId ? 'Detail Konsultansi' : 'Explore Consulting'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. SECTION "PROYEK KAMI" (6 Featured Projects with Photo, Contract Value, Client) */}
      <section className="bg-slate-100 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C9A961] bg-white px-3 py-1 rounded-full border border-slate-200">
                {isId ? 'Rekam Jejak Kinerja Nyata' : 'Proven Track Record'}
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-4xl text-[#0A2342] mt-3 tracking-tight">
                {isId ? 'Proyek Kami' : 'Featured Projects'}
              </h2>
              <p className="mt-2 text-sm text-slate-600 max-w-xl">
                {isId
                  ? 'Portofolio terpilih pekerjaan konstruksi sipil, pengadaan skala besar, dan proyek pemerintah yang telah terselesaikan 100% dengan kepatuhan spesifikasi penuh.'
                  : 'Selected civil construction works, government procurements, and consulting delivered 100% on schedule.'}
              </p>
            </div>

            <button
              onClick={() => onSelectTab('proyek')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0A2342] hover:bg-[#13335A] text-white text-xs font-bold transition shadow-sm"
            >
              <span>{isId ? 'Lihat Semua Portofolio' : 'View All Projects'}</span>
              <ArrowRight className="w-4 h-4 text-[#DFBA73]" />
            </button>
          </div>

          {/* 6 Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((p) => (
              <div
                key={p.id}
                onClick={() => onSelectProject(p)}
                className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group transform hover:-translate-y-1"
              >
                {/* Photo with Overlay */}
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={p.afterImage}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-[#0A2342] text-white">
                      {p.category}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-600 text-white">
                      100% Selesai
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3">
                    <span className="text-xs font-bold text-[#DFBA73] bg-[#0A2342]/90 px-2.5 py-1 rounded shadow">
                      {p.budget}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#0A2342]" />
                      <span className="font-semibold line-clamp-1">{p.clientName}</span>
                    </div>

                    <h3 className="font-heading font-bold text-base text-[#0A2342] group-hover:text-[#13335A] leading-snug line-clamp-2">
                      {isId ? p.title : (p.titleEn || p.title)}
                    </h3>

                    <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {isId ? p.description : (p.descriptionEn || p.description)}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span className="line-clamp-1">{p.location}</span>
                    </span>

                    <span className="text-[#C9A961] font-bold group-hover:underline flex items-center gap-1">
                      <span>Detail & Before/After</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SECTION "KLIEN & PARTNER" (Instansi Pemerintah, BUMN) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C9A961] bg-[#C9A961]/10 px-3 py-1 rounded-full border border-[#C9A961]/20">
            {isId ? 'Kepercayaan & Kemitraan' : 'Trust & Partnerships'}
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#0A2342] mt-3 tracking-tight">
            {isId ? 'Klien & Partner Kami' : 'Clients & Strategic Partners'}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {isId
              ? 'Telah dipercaya oleh berbagai kementerian Republik Indonesia, dinas pemerintah daerah, dan BUMN konstruksi terkemuka.'
              : 'Trusted by Indonesian government ministries, regional departments, and state-owned enterprises.'}
          </p>
        </div>

        {/* Partner Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {CLIENT_PARTNERS.map((partner, index) => (
            <div
              key={index}
              className="p-5 rounded-xl bg-white border border-slate-200 text-center flex flex-col items-center justify-center space-y-2 hover:border-[#C9A961] hover:shadow-md transition group"
            >
              <div className="w-12 h-12 rounded-full bg-slate-100 group-hover:bg-[#0A2342] text-[#0A2342] group-hover:text-[#DFBA73] flex items-center justify-center font-heading font-black text-xs transition">
                {partner.code}
              </div>
              <p className="font-heading font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#0A2342]">
                {partner.name}
              </p>
              <span className="text-[10px] text-slate-500 font-medium">{partner.role}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. WHY CHOOSE US (BUMN & Kredibel) */}
      <section className="bg-[#0A2342] text-white py-16 border-y-2 border-[#C9A961]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-[#DFBA73]">
                {isId ? 'STANDAR KREDIBEL' : 'CREDIBLE STANDARDS'}
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl leading-tight">
                {isId
                  ? 'Kredibilitas, Akuntabilitas, & Mutu Konstruksi Tanpa Kompromi'
                  : 'Credibility, Accountability & Uncompromised Quality'}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {isId
                  ? 'Kami memahami bahwa proyek pemerintah menuntut ketepatan administrasi lelang, verifikasi TKDN, dan kepatuhan audit BPK/Inspektorat. PT. Anugerah Jaya Pratama hadir dengan tata kelola profesional dan rekam jejak bebas blacklist.'
                  : 'We understand that government projects require rigorous bidding compliance, local component verification (TKDN), and audit accountability.'}
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => onSelectTab('tentang')}
                  className="px-5 py-2.5 rounded-lg bg-[#C9A961] hover:bg-[#b8954c] text-[#0A2342] font-heading font-bold text-xs tracking-wider uppercase transition shadow"
                >
                  {isId ? 'Lihat Legalitas & Izin' : 'View Legal Licenses'}
                </button>
                <button
                  onClick={openWhatsApp}
                  className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white font-heading font-semibold text-xs tracking-wider uppercase transition flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{isId ? 'Hubungi Direksi' : 'Contact Management'}</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  titleId: 'Legalitas & Perizinan Lengkap',
                  titleEn: 'Complete Official Licenses',
                  descId: 'Memiliki SIUJK aktif, NIB OSS RBA, SBU LPJK, NPWP PKP terverifikasi, dan bebas sanksi/blacklist.',
                  descEn: 'Active SIUJK, OSS RBA NIB, LPJK SBU, and verified tax compliance with clean audit track record.',
                  icon: ShieldCheck,
                },
                {
                  titleId: 'SMK3 & Zero Accident',
                  titleEn: 'Safety & Zero Accident',
                  descId: 'Menerapkan Sistem Manajemen Keselamatan Konstruksi (ISO 45001) dan diawasi Ahli K3 Konstruksi bersertifikat.',
                  descEn: 'Strict OHS construction guidelines (ISO 45001) supervised by certified safety engineers.',
                  icon: HardHat,
                },
                {
                  titleId: 'Integrasi e-Katalog LKPP',
                  titleEn: 'LKPP e-Catalog Integration',
                  descId: 'Mempermudah e-purchasing dinas dengan produk terdaftar resmi, spesifikasi baku, dan garansi purna jual.',
                  descEn: 'Facilitating government e-purchasing with verified storefronts and official manufacturer warranties.',
                  icon: ShoppingBag,
                },
                {
                  titleId: 'Ketepatan Waktu & Anggaran',
                  titleEn: 'On-Time & Budget Discipline',
                  descId: 'Pengendalian proyek dengan kurva-S, pengawasan harian, dan jaminan serah terima tepat jadwal (BAST).',
                  descEn: 'Project tracking with S-curves, daily supervision, and verified official handover milestones.',
                  icon: TrendingUp,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-slate-800/80 border border-slate-700/60 hover:border-[#C9A961]/60 transition"
                >
                  <item.icon className="w-8 h-8 text-[#DFBA73] mb-3" />
                  <h4 className="font-heading font-bold text-base text-white mb-2">
                    {isId ? item.titleId : item.titleEn}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isId ? item.descId : item.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-r from-[#0A2342] to-[#13335A] rounded-2xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border-2 border-[#C9A961]/40">
          <div className="space-y-3 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#DFBA73]">
              {isId ? 'SIAP BERKOLABORASI' : 'READY FOR COLLABORATION'}
            </span>
            <h3 className="font-heading font-black text-2xl sm:text-3xl text-white">
              {isId
                ? 'Punya Kebutuhan Proyek Konstruksi atau Tender Pengadaan?'
                : 'Have a Construction Project or Procurement Tender?'}
            </h3>
            <p className="text-sm text-slate-200 max-w-xl">
              {isId
                ? 'Diskusikan rencana teknis, estimasi RAB, dan dokumen penawaran bersama tim ahli PT. Anugerah Jaya Pratama di Baleendah, Bandung.'
                : 'Discuss engineering plans, cost estimates, and procurement requirements with our experts in Baleendah, Bandung.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={openWhatsApp}
              className="px-6 py-3.5 rounded-lg bg-[#16a34a] hover:bg-[#15803d] text-white font-heading font-bold text-sm tracking-wider uppercase transition shadow-md flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>{isId ? 'Chat WhatsApp Sekarang' : 'Chat WhatsApp Now'}</span>
            </button>
            <button
              onClick={() => onSelectTab('kontak')}
              className="px-6 py-3.5 rounded-lg bg-white text-[#0A2342] hover:bg-slate-100 font-heading font-bold text-sm tracking-wider uppercase transition shadow-md"
            >
              {isId ? 'Kirim Pesan Form' : 'Send Message Form'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
