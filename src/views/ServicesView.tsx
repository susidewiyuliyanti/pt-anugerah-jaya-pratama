import React, { useState } from 'react';
import { Language } from '../types';
import { COMPANY_INFO } from '../data/initialData';
import {
  HardHat,
  ShoppingBag,
  Briefcase,
  Building,
  Truck,
  Monitor,
  HeartPulse,
  Wrench,
  CheckCircle2,
  FileCheck2,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  FileText,
  BadgePercent,
  MessageCircle,
} from 'lucide-react';

interface ServicesViewProps {
  lang: Language;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ lang }) => {
  const isId = lang === 'id';
  const [activeTab, setActiveTab] = useState<'konstruksi' | 'pengadaan' | 'lainnya'>('konstruksi');

  const openWhatsAppForService = (serviceName: string) => {
    const text = encodeURIComponent(
      isId
        ? `Halo PT. Anugerah Jaya Pratama, saya ingin konsultasi mengenai layanan ${serviceName}. Mohon informasi penawaran dan mekanisme kerjasamanya.`
        : `Hello PT. Anugerah Jaya Pratama, I would like to consult regarding ${serviceName}. Please advise on proposals and execution.`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-16 sm:space-y-24 py-8 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Header Banner */}
      <section className="bg-[#0A2342] text-white py-12 sm:py-16 rounded-2xl relative overflow-hidden px-6 sm:px-12 border-b-4 border-[#C9A961]">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#DFBA73] bg-[#C9A961]/20 px-3 py-1 rounded border border-[#C9A961]/30">
            {isId ? 'BIDANG BISNIS & KOMPETENSI' : 'BUSINESS UNITS & SOLUTIONS'}
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white mt-4 tracking-tight">
            {isId ? 'Layanan Unggulan Perusahaan' : 'Our Professional Services'}
          </h1>
          <p className="mt-3 text-base text-slate-200 leading-relaxed">
            {isId
              ? 'Penyedia jasa konstruksi terintegrasi, pengadaan barang & jasa pemerintah berbasis e-Katalog LKPP, dan manajemen konsultansi dengan sertifikasi lengkap.'
              : 'Integrated construction contractor, government e-Catalog procurement vendor, and certified project consultants.'}
          </p>
        </div>
      </section>

      {/* 3 TABS SELECTOR */}
      <section>
        <div className="flex flex-col sm:flex-row rounded-xl bg-slate-100 p-1.5 border border-slate-300 max-w-2xl mx-auto shadow-inner">
          <button
            onClick={() => setActiveTab('konstruksi')}
            className={`flex-1 py-3 px-4 rounded-lg font-heading font-bold text-xs sm:text-sm tracking-wide transition flex items-center justify-center gap-2 ${
              activeTab === 'konstruksi'
                ? 'bg-[#0A2342] text-white shadow-md'
                : 'text-slate-700 hover:text-[#0A2342] hover:bg-slate-200'
            }`}
          >
            <HardHat className="w-4 h-4" />
            <span>{isId ? '1. KONSTRUKSI' : '1. CONSTRUCTION'}</span>
          </button>

          <button
            onClick={() => setActiveTab('pengadaan')}
            className={`flex-1 py-3 px-4 rounded-lg font-heading font-bold text-xs sm:text-sm tracking-wide transition flex items-center justify-center gap-2 ${
              activeTab === 'pengadaan'
                ? 'bg-[#0A2342] text-white shadow-md'
                : 'text-slate-700 hover:text-[#0A2342] hover:bg-slate-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{isId ? '2. PENGADAAN LPSE' : '2. PROCUREMENT'}</span>
          </button>

          <button
            onClick={() => setActiveTab('lainnya')}
            className={`flex-1 py-3 px-4 rounded-lg font-heading font-bold text-xs sm:text-sm tracking-wide transition flex items-center justify-center gap-2 ${
              activeTab === 'lainnya'
                ? 'bg-[#0A2342] text-white shadow-md'
                : 'text-slate-700 hover:text-[#0A2342] hover:bg-slate-200'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>{isId ? '3. JASA LAIN' : '3. OTHER SERVICES'}</span>
          </button>
        </div>
      </section>

      {/* TAB CONTENT 1: KONSTRUKSI */}
      {activeTab === 'konstruksi' && (
        <section className="space-y-12 animate-in fade-in duration-300">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C9A961]">
              BIDANG PEKERJAAN FISIK
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-[#0A2342] mt-2 tracking-tight">
              {isId ? 'Jasa Pelaksana Konstruksi & Bangunan' : 'General Construction & Civil Engineering'}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              {isId
                ? 'Didukung oleh alat berat modern, rantai pasok beton ready mix bersertifikat SNI, dan tenaga ahli konstruksi LPJK dengan rekam jejak kepatuhan K3 terbukti.'
                : 'Backed by modern heavy machinery, certified ready-mix concrete supplies, and LPJK-certified engineers ensuring Zero Accident safety.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sub-Service 1: Gedung */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-lg transition space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#0A2342] text-[#DFBA73] flex items-center justify-center">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#0A2342]">
                {isId ? 'Konstruksi Gedung Bertingkat & Fasilitas Publik' : 'Multi-Storey & Public Buildings'}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {isId
                  ? 'Pembangunan gedung kantor pemerintahan, rumah sakit daerah terakreditasi, puskesmas terpadu, sarana pendidikan (sekolah/kampus), serta balai pertemuan umum berstandar ramah gempa.'
                  : 'Government administrative buildings, accredited regional hospitals, primary health centers, schools, and civic convention halls.'}
              </p>
              <ul className="space-y-2 text-xs text-slate-700 font-medium pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Struktur Beton Bertulang K-350 & Baja WF</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Instalasi MEP, Tata Udara & Fire Hydrant</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Fasad Arsitektural ACP & Kaca Tempered</span>
                </li>
              </ul>
              <button
                onClick={() => openWhatsAppForService('Konstruksi Gedung Bertingkat')}
                className="pt-2 text-xs font-bold text-[#0A2342] hover:text-[#C9A961] transition flex items-center gap-1.5"
              >
                <span>Konsultasi Teknis Gedung</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Sub-Service 2: Jalan */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-lg transition space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#0A2342] text-[#DFBA73] flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#0A2342]">
                {isId ? 'Infrastruktur Jalan Raya & Drainase Primer' : 'Roadways & Primary Drainage'}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {isId
                  ? 'Pekerjaan perkerasan kaku (rigid pavement FS 45), pengaspalan hotmix AC-WC / AC-BC, serta penataan saluran drainase U-ditch dan box culvert penanggulangan genangan air.'
                  : 'Rigid pavement FS 45, hotmix asphalt AC-WC / AC-BC, and stormwater drainage systems with precast U-ditches and box culverts.'}
              </p>
              <ul className="space-y-2 text-xs text-slate-700 font-medium pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Rigid Pavement Tahan Beban Gandar Berat</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Pemasangan Precast U-Ditch & Box Culvert</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Pelebaran Jalan & Marka Termoplastik</span>
                </li>
              </ul>
              <button
                onClick={() => openWhatsAppForService('Konstruksi Jalan & Drainase')}
                className="pt-2 text-xs font-bold text-[#0A2342] hover:text-[#C9A961] transition flex items-center gap-1.5"
              >
                <span>Konsultasi Jalan & Drainase</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Sub-Service 3: Jembatan */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-lg transition space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#0A2342] text-[#DFBA73] flex items-center justify-center">
                <HardHat className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#0A2342]">
                {isId ? 'Jembatan Gelagar Baja & Beton Komposit' : 'Bridges & Structural Crossing'}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {isId
                  ? 'Pembangunan jembatan penghubung antar-wilayah, jembatan rangka baja bentang panjang, pondasi bored pile / tiang pancang, abutment beton bertulang, dan perkuatan tebing sungai (bronjong/sheet pile).'
                  : 'Regional connectivity bridges, long-span steel girder trusses, bored pile foundations, and riverbank retaining sheet piles.'}
              </p>
              <ul className="space-y-2 text-xs text-slate-700 font-medium pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Pondasi Bored Pile Kedalaman s/d 30m</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Ereksi Gelagar Baja & Lantai Komposit</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Perkuatan Tebing & Dinding Penahan Tanah</span>
                </li>
              </ul>
              <button
                onClick={() => openWhatsAppForService('Konstruksi Jembatan')}
                className="pt-2 text-xs font-bold text-[#0A2342] hover:text-[#C9A961] transition flex items-center gap-1.5"
              >
                <span>Konsultasi Jembatan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Sub-Service 4: Perumahan & Kawasan Industri */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-lg transition space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#0A2342] text-[#DFBA73] flex items-center justify-center">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#0A2342]">
                {isId ? 'Perumahan, Pergudangan & Kawasan Industri' : 'Industrial Estates & Residential Works'}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {isId
                  ? 'Cut & fill pematangan lahan (land clearing), konstruksi gudang baja bentang lebar, perumahan subsidi/komersial, paving block halaman pabrik, dan instalasi pagar panel beton keliling.'
                  : 'Earthwork land grading, wide-span steel industrial warehouses, commercial residential, and precast concrete boundary wall installations.'}
              </p>
              <ul className="space-y-2 text-xs text-slate-700 font-medium pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Pematangan Lahan & Cut-and-Fill</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Gudang Struktur Baja Portal Frame</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Pagar Precast & Jalan Akses Kawasan</span>
                </li>
              </ul>
              <button
                onClick={() => openWhatsAppForService('Perumahan & Kawasan Industri')}
                className="pt-2 text-xs font-bold text-[#0A2342] hover:text-[#C9A961] transition flex items-center gap-1.5"
              >
                <span>Konsultasi Kawasan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* TAB CONTENT 2: PENGADAAN (ATK, IT, Kendaraan, Alkes + Proses e-Katalog & LPSE) */}
      {activeTab === 'pengadaan' && (
        <section className="space-y-12 animate-in fade-in duration-300">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C9A961]">
              PENGADAAN BARANG & JASA PEMERINTAH
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-[#0A2342] mt-2 tracking-tight">
              {isId ? 'Mitra Resmi Pengadaan e-Katalog & LPSE' : 'Official Government e-Catalog & LPSE Vendor'}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              {isId
                ? 'Memudahkan Pejabat Pengadaan (PPK/PPTK) instansi pemerintah dalam melakukan e-purchasing secara cepat, transparan, dan bergaransi resmi dengan dukungan TKDN lengkap.'
                : 'Facilitating government procurement officers with fast e-purchasing, transparent pricing, verified local content (TKDN), and official warranties.'}
            </p>
          </div>

          {/* 4 Komoditas Pengadaan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. ATK */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#C9A961] flex items-center justify-center border border-[#C9A961]/30">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#0A2342]">
                {isId ? 'Alat Tulis Kantor (ATK)' : 'Office Supplies (ATK)'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pengadaan kertas HVS berstandar dinas, toner printer original, map arsip, mebeler meja kerja, dan perlengkapan perkantoran terdaftar e-Katalog.
              </p>
              <span className="inline-block text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                e-Purchasing Cepat
              </span>
            </div>

            {/* 2. IT & Komputer Server */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center border border-blue-200">
                <Monitor className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#0A2342]">
                {isId ? 'Perangkat IT & Server' : 'IT Hardware & Enterprise Server'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Penyediaan PC workstation, server rak data center, sistem UPS modular, switch layer 3, proyektor interaktif, dan software lisensi resmi pemerintah.
              </p>
              <span className="inline-block text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                Garansi Resmi Pabrikan
              </span>
            </div>

            {/* 3. Kendaraan Dinas */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center border border-slate-300">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#0A2342]">
                {isId ? 'Armada & Kendaraan Operasional' : 'Vehicles & Operational Fleets'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pengadaan armada truk compactor kebersihan, mobil ambulans tanggap darurat, pick-up operasional, dan karoseri khusus sesuai spesifikasi dinas.
              </p>
              <span className="inline-block text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                Surat Uji Laik SNI
              </span>
            </div>

            {/* 4. Alkes */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center border border-rose-200">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#0A2342]">
                {isId ? 'Alat Kesehatan & Lab RS' : 'Medical & Laboratory Devices'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Peralatan laboratorium klinik, biosafety cabinet, sterilisator autoclave, ranjang pasien elektrik, dan instrumen medis berizin edar Kemenkes RI.
              </p>
              <span className="inline-block text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                Izin Edar Kemenkes
              </span>
            </div>
          </div>

          {/* Flowchart: Mekanisme e-Katalog & LPSE */}
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C9A961]">
                SOP PENGADAAN RESMI
              </span>
              <h3 className="font-heading font-black text-xl sm:text-2xl text-[#0A2342] mt-1">
                {isId ? 'Alur Transaksi e-Katalog LKPP & Tender LPSE' : 'LKPP e-Catalog & LPSE Procurement Flow'}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  step: '01',
                  title: 'Pemilihan Etalase',
                  desc: 'PPK/Pejabat Pengadaan meninjau spesifikasi barang dan harga tayang resmi pada e-Katalog LKPP PT. AJP.',
                },
                {
                  step: '02',
                  title: 'Surat Pesanan / SPK',
                  desc: 'Penerbitan Surat Pesanan (e-Purchasing) atau penetapan pemenang lelang pada portal LPSE instansi.',
                },
                {
                  step: '03',
                  title: 'Pengiriman & Instalasi',
                  desc: 'Barang dikirim tepat waktu dengan asuransi ekspedisi, uji fungsi teknis, dan training bagi operator dinas.',
                },
                {
                  step: '04',
                  title: 'BAST & Faktur Pajak',
                  desc: 'Penandatanganan Berita Acara Serah Terima (BAST), kelengkapan dokumen garansi, dan faktur pajak elektronik PKP.',
                },
              ].map((flow, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 relative">
                  <span className="text-xs font-black text-[#C9A961] bg-white px-2 py-0.5 rounded shadow-xs border border-slate-200">
                    Langkah {flow.step}
                  </span>
                  <h4 className="font-heading font-bold text-sm text-[#0A2342] pt-1">{flow.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{flow.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-blue-50/80 border border-blue-200">
              <div className="text-xs text-blue-900 font-medium">
                {isId
                  ? 'Butuh bantuan pendampingan ID Paket e-Katalog atau surat dukungan lelang tender?'
                  : 'Need assistance regarding e-Catalog package IDs or official manufacturer tender support letters?'}
              </div>
              <button
                onClick={() => openWhatsAppForService('Pendampingan e-Katalog & LPSE')}
                className="px-4 py-2 rounded-lg bg-[#0A2342] text-white text-xs font-bold hover:bg-[#13335A] transition shadow shrink-0"
              >
                {isId ? 'Hubungi Divisi Pengadaan' : 'Contact Procurement Team'}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* TAB CONTENT 3: JASA LAIN (Konsultan, Maintenance) */}
      {activeTab === 'lainnya' && (
        <section className="space-y-12 animate-in fade-in duration-300">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C9A961]">
              MANAJEMEN TEKNIK & PEMELIHARAAN
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-[#0A2342] mt-2 tracking-tight">
              {isId ? 'Jasa Konsultan Manajemen & Maintenance Fasilitas' : 'Consultancy & Facility Maintenance'}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              {isId
                ? 'Layanan konsultansi teknik terpadu mulai dari studi kelayakan, pengawasan konstruksi harian, hingga kontrak perawatan berkala aset instansi.'
                : 'Comprehensive technical consultancy from feasibility studies, daily site supervision, to periodic facility maintenance contracts.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Konsultan 1 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#0A2342] text-[#DFBA73] flex items-center justify-center">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#0A2342]">
                {isId ? 'Konsultan Manajemen Proyek & Supervisi Lapangan' : 'Project Management & Site Supervision'}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {isId
                  ? 'Bertindak sebagai perpanjangan tangan pemilik proyek (owner) dalam mengendalikan mutu (QA/QC), kepatuhan jadwal (kurva-S), efisiensi biaya, dan kepatuhan K3 di lokasi pekerjaan.'
                  : 'Acting as an owner-representative to control quality, schedule compliance (S-curves), cost variance, and safety protocols on active sites.'}
              </p>
              <ul className="space-y-2 text-xs text-slate-700 font-medium pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Supervisi Harian & Laporan Mingguan/Bulanan</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Uji Laboratorium Tarik Baja & Tekan Beton</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Verifikasi Volume & Dokumen MC-0 s/d BAST</span>
                </li>
              </ul>
              <button
                onClick={() => openWhatsAppForService('Konsultan Supervisi Konstruksi')}
                className="pt-2 text-xs font-bold text-[#0A2342] hover:text-[#C9A961] transition flex items-center gap-1.5"
              >
                <span>Konsultasi Supervisi Proyek</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Konsultan 2: Maintenance */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#0A2342] text-[#DFBA73] flex items-center justify-center">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#0A2342]">
                {isId ? 'Pemeliharaan (Maintenance) & Renovasi Rutin' : 'Periodic Maintenance & Renovation'}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {isId
                  ? 'Kontrak pemeliharaan gedung perkantoran dinas, perbaikan waterproofing atap bocor, pengecatan ulang fasad, rekondisi saluran pipa, dan peremajaan interior instansi.'
                  : 'Scheduled municipal office maintenance contracts, roof waterproofing rehabilitation, facade repainting, plumbing overhauls, and interior modernization.'}
              </p>
              <ul className="space-y-2 text-xs text-slate-700 font-medium pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Waterproofing Membran & Injeksi Beton</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Perawatan Berkala AC Sentral & Kelistrikan</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Renovasi Ruang Rapat & Fasad Modern</span>
                </li>
              </ul>
              <button
                onClick={() => openWhatsAppForService('Maintenance Gedung & Fasilitas')}
                className="pt-2 text-xs font-bold text-[#0A2342] hover:text-[#C9A961] transition flex items-center gap-1.5"
              >
                <span>Konsultasi Perawatan Fasilitas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Direct Contact Banner */}
      <section className="bg-slate-100 rounded-2xl p-8 border border-slate-200 text-center space-y-4">
        <h3 className="font-heading font-black text-2xl text-[#0A2342]">
          {isId ? 'Butuh Penawaran Harga atau Kerjasama Subkon?' : 'Need a Commercial Quote or Subcontracting?'}
        </h3>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          {isId
            ? 'Tim estimasi kami siap menganalisis dokumen lelang, RAB, dan gambar kerja proyek Anda.'
            : 'Our estimation team is prepared to analyze your tender documents, bill of quantities, and engineering drawings.'}
        </p>
        <button
          onClick={() => openWhatsAppForService('Penawaran Proyek')}
          className="px-6 py-3 rounded-lg bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-bold uppercase tracking-wider transition shadow inline-flex items-center gap-2"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>{isId ? 'Hubungi WA: +62 895-4288-96940' : 'Contact WA: +62 895-4288-96940'}</span>
        </button>
      </section>
    </div>
  );
};
