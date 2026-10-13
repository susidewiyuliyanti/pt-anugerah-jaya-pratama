import React, { useState } from 'react';
import { Language, LegalDocument, TeamMember } from '../types';
import { COMPANY_INFO, INITIAL_LEGALITIES, INITIAL_TEAM } from '../data/initialData';
import { generateCompanyProfilePDF } from '../utils/pdfGenerator';
import {
  Building2,
  ShieldCheck,
  Award,
  Users,
  Clock,
  CheckCircle2,
  FileCheck,
  FileDown,
  Target,
  Compass,
  FileText,
  BadgeCheck,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

interface AboutViewProps {
  lang: Language;
  team: TeamMember[];
  legalities: LegalDocument[];
}

export const AboutView: React.FC<AboutViewProps> = ({
  lang,
  team = INITIAL_TEAM,
  legalities = INITIAL_LEGALITIES,
}) => {
  const isId = lang === 'id';
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyNumber = (docId: string, number: string) => {
    navigator.clipboard.writeText(number);
    setCopiedId(docId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-16 sm:space-y-24 py-8">
      {/* Page Header Banner */}
      <section className="bg-[#0A2342] text-white py-14 sm:py-20 rounded-2xl relative overflow-hidden max-w-7xl mx-auto px-6 sm:px-12 border-b-4 border-[#C9A961]">
        <div className="relative z-10 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#DFBA73] bg-[#C9A961]/20 px-3 py-1 rounded border border-[#C9A961]/30">
            {isId ? 'PROFIL PERUSAHAAN' : 'COMPANY PROFILE'}
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white mt-4 tracking-tight">
            {isId ? 'Tentang PT. Anugerah Jaya Pratama' : 'About PT. Anugerah Jaya Pratama'}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed">
            {isId
              ? 'Badan usaha rekanan pemerintah dan BUMN terkemuka yang bergerak di bidang jasa konstruksi terpadu, pengadaan barang & jasa, serta manajemen konsultansi dengan legalitas lengkap dan kepatuhan hukum penuh.'
              : 'Leading government and SOE partner specializing in integrated construction, goods & services procurement, and project consulting with complete official credentials.'}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => generateCompanyProfilePDF(lang)}
              className="px-5 py-2.5 rounded-lg bg-[#C9A961] hover:bg-[#b8954c] text-[#0A2342] font-heading font-bold text-xs tracking-wider uppercase transition shadow flex items-center gap-2"
            >
              <FileDown className="w-4 h-4" />
              <span>{isId ? 'Unduh Dokumen Profil Resmi (PDF)' : 'Download Official Profile (PDF)'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 1. SEJARAH & LATAR BELAKANG PERUSAHAAN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C9A961]">
              {isId ? 'SEJARAH & PERJALANAN' : 'OUR JOURNEY & HISTORY'}
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-[#0A2342] tracking-tight">
              {isId ? 'Tumbuh Bersama Pembangunan Infrastruktur Jawa Barat' : 'Growing with West Java Infrastructure Development'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {isId
                ? 'Didirikan pada tahun 2015 di Baleendah, Kabupaten Bandung, PT. ANUGERAH JAYA PRATAMA berawal dari komitmen memberikan pelayanan konstruksi yang tepat waktu, kuat, dan akuntabel bagi instansi pemerintah dan entitas swasta.'
                : 'Founded in 2015 in Baleendah, Bandung Regency, PT. ANUGERAH JAYA PRATAMA began with a firm dedication to delivering on-time, durable, and accountable construction works.'}
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {isId
                ? 'Seiring berjalannya waktu, perusahaan memperluas sayap ke ranah Pengadaan Barang & Jasa Pemerintah melalui sistem e-Katalog LKPP dan tender LPSE. Berbekal armada logistik, sertifikasi SMK3 ISO 45001, dan sertifikasi mutu ISO 9001:2015, kami telah menuntaskan lebih dari 150 paket pekerjaan dengan nilai total kontrak melampaui Rp 280 Miliar.'
                : 'Over the years, we expanded into Government Goods and Services Procurement via LKPP e-Catalog and LPSE tenders, completing over 150 project packages valued over IDR 280 Billion.'}
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-heading font-black text-3xl text-[#0A2342]">2015</span>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  {isId ? 'Tahun Pendirian di Baleendah' : 'Established in Baleendah'}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-heading font-black text-3xl text-[#C9A961]">100%</span>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  {isId ? 'Kepatuhan Hukum & Bebas Blacklist' : 'Full Compliance & Zero Blacklist'}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80"
                alt="Operasional Lapangan PT Anugerah Jaya Pratama"
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2342]/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-xs uppercase tracking-widest text-[#DFBA73] font-bold">
                  {isId ? 'Kantor Operasional & Workshop' : 'Operational Office & Yard'}
                </p>
                <h3 className="font-heading font-bold text-lg text-white mt-1">
                  Baleendah, Kabupaten Bandung, Jawa Barat
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VISI & MISI + CORPORATE VALUES */}
      <section className="bg-slate-100 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Visi */}
            <div className="bg-white p-8 rounded-2xl border-t-4 border-[#0A2342] shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#0A2342] text-[#DFBA73] flex items-center justify-center shadow">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-black text-2xl text-[#0A2342]">
                {isId ? 'Visi Perusahaan' : 'Corporate Vision'}
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                {isId
                  ? '“Menjadi perusahaan jasa konstruksi dan penyedia pengadaan barang/jasa pemerintah yang terdepan, kredibel, berintegritas tinggi, dan menjadi mitra strategis pilihan utama instansi pemerintah dan swasta nasional.”'
                  : '“To be the premier, credible, and highest-integrity construction and government procurement partner of choice for national government agencies and private clients.”'}
              </p>
            </div>

            {/* Misi */}
            <div className="bg-white p-8 rounded-2xl border-t-4 border-[#C9A961] shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#C9A961] text-[#0A2342] flex items-center justify-center shadow">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-black text-2xl text-[#0A2342]">
                {isId ? 'Misi Perusahaan' : 'Corporate Mission'}
              </h3>
              <ul className="space-y-3 text-sm text-slate-700 font-medium">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    {isId
                      ? 'Memberikan hasil konstruksi fisik berkualitas prima sesuai spesifikasi teknis dan standar K3 Zero Accident.'
                      : 'Deliver top-tier construction works compliant with technical specifications and Zero Accident safety standards.'}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    {isId
                      ? 'Menyediakan rantai pasok pengadaan barang pemerintah yang transparan, bersaing, dan berbasis e-Katalog LKPP.'
                      : 'Provide transparent, competitive, and LKPP e-Catalog-based government goods procurement supply chains.'}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    {isId
                      ? 'Mengembangkan profesionalisme SDM, mematuhi regulasi perundang-undangan, dan berkontribusi terhadap masyarakat Jawa Barat.'
                      : 'Foster workforce professionalism, adhere to state laws, and contribute meaningfully to West Java communities.'}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* 4 Core Values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'Integritas (Integrity)',
                desc: 'Transparansi penuh dalam penawaran lelang, audit finansial, dan bebas dari praktik gratifikasi.',
              },
              {
                title: 'Profesionalisme (Excellence)',
                desc: 'Didukung oleh tenaga ahli teknik berlisensi LPJK, BNSP, dan manajemen proyek tersertifikasi.',
              },
              {
                title: 'Kualitas & Ketepatan (Quality)',
                desc: 'Jaminan material standar SNI/TKDN, uji lab beton berkala, dan serah terima sesuai jadwal kontrak.',
              },
              {
                title: 'Keselamatan Kerja (Safety First)',
                desc: 'Penerapan SMK3 terakreditasi ISO 45001 dan briefing harian pada seluruh operasional lapangan.',
              },
            ].map((val, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-white border border-slate-200">
                <div className="w-8 h-8 rounded-lg bg-[#0A2342]/10 text-[#0A2342] flex items-center justify-center font-heading font-black text-sm mb-3">
                  0{idx + 1}
                </div>
                <h4 className="font-heading font-bold text-base text-[#0A2342] mb-1.5">{val.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. LEGALITAS & SERTIFIKASI (SIUJK, NIB, NPWP, SBU, ISO) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C9A961] bg-[#C9A961]/10 px-3 py-1 rounded-full border border-[#C9A961]/20">
            {isId ? 'Legalitas & Izin Usaha Resmi' : 'Corporate Licenses & Compliance'}
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-4xl text-[#0A2342] mt-3 tracking-tight">
            {isId ? 'Legalitas Lengkap & Kepatuhan Regulasi' : 'Complete Verified Legal Licenses'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            {isId
              ? 'Seluruh dokumen perizinan berusaha aktif, terdaftar resmi di portal OSS RBA Kementerian Investasi/BKPM dan LPJK Kementerian PUPR.'
              : 'All corporate operating licenses are active, registered on the Indonesian OSS RBA portal and PUPR Ministry boards.'}
          </p>
        </div>

        {/* Legal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {legalities.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#0A2342]">
                      {doc.category.toUpperCase()}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <BadgeCheck className="w-3 h-3" />
                    Terverifikasi
                  </span>
                </div>

                <h3 className="font-heading font-bold text-base text-slate-900 mb-2">
                  {doc.title}
                </h3>

                {/* Number Box with Copy Action */}
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex items-center justify-between gap-2 mb-3">
                  <code className="text-xs font-mono font-bold text-[#0A2342] break-all">
                    {doc.number}
                  </code>
                  <button
                    onClick={() => handleCopyNumber(doc.id, doc.number)}
                    className="text-[11px] font-bold text-[#C9A961] hover:text-[#A5843E] transition shrink-0 ml-2"
                  >
                    {copiedId === doc.id ? (isId ? 'Tersalin!' : 'Copied!') : isId ? 'Salin' : 'Copy'}
                  </button>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {doc.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Penerbit: <strong className="text-slate-700">{doc.issuer}</strong></span>
                <span className="text-emerald-700 font-semibold">{doc.validUntil}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TIM DIREKSI & STRUKTUR ORGANISASI */}
      <section className="bg-slate-50 py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C9A961] bg-white px-3 py-1 rounded-full border border-slate-200">
              {isId ? 'Kepemimpinan & Tata Kelola' : 'Leadership & Governance'}
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-[#0A2342] mt-3 tracking-tight">
              {isId ? 'Dewan Direksi & Tenaga Ahli' : 'Board of Directors & Senior Team'}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              {isId
                ? 'Dikelola oleh para praktisi teknik sipil, manajemen keuangan tender, dan ahli K3 berpengalaman puluhan tahun dalam proyek strategis.'
                : 'Led by licensed civil engineers, procurement specialists, and certified safety directors.'}
            </p>
          </div>

          {/* Team Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-64 overflow-hidden bg-slate-900">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-[#C9A961] text-[#0A2342] shadow">
                        {isId ? member.role : (member.roleEn || member.role)}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="font-heading font-black text-lg text-[#0A2342] leading-snug">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#C9A961]">
                      {member.title}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed pt-1">
                      {isId ? member.bio : (member.bioEn || member.bio)}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#0A2342]" />
                      <span>{member.experienceYears} Tahun Pengalaman</span>
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Sertifikasi Aktif
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Organizational Chart Box */}
          <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm text-center">
            <h3 className="font-heading font-black text-xl text-[#0A2342] mb-3">
              {isId ? 'Struktur Organisasi Terintegrasi' : 'Integrated Organizational Hierarchy'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto mb-6">
              {isId
                ? 'Pemisahan fungsi pengawasan komisaris, eksekusi operasional direksi, divisi manajemen mutu (QA/QC), penjaminan keselamatan kerja (SMK3), hingga administrasi tender LPSE.'
                : 'Structured governance ensuring checks and balances across commissioners, board of directors, quality assurance, safety, and tender administration.'}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
              <span className="px-3.5 py-2 rounded-lg bg-[#0A2342] text-white font-bold">
                Dewan Komisaris
              </span>
              <span className="text-slate-400 font-bold">➔</span>
              <span className="px-3.5 py-2 rounded-lg bg-[#C9A961] text-[#0A2342] font-black">
                Direktur Utama
              </span>
              <span className="text-slate-400 font-bold">➔</span>
              <span className="px-3.5 py-2 rounded-lg bg-slate-100 border border-slate-300 text-slate-800 font-bold">
                Divisi Teknik & Konstruksi
              </span>
              <span className="px-3.5 py-2 rounded-lg bg-slate-100 border border-slate-300 text-slate-800 font-bold">
                Divisi Pengadaan e-Katalog
              </span>
              <span className="px-3.5 py-2 rounded-lg bg-slate-100 border border-slate-300 text-slate-800 font-bold">
                Divisi K3 & QA/QC
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
