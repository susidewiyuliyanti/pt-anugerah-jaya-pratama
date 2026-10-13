import React from 'react';
import { Logo } from './Logo';
import { PageTab, Language } from '../types';
import { COMPANY_INFO, CLIENT_PARTNERS } from '../data/initialData';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Award,
  FileText,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: PageTab) => void;
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, lang }) => {
  const isId = lang === 'id';

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      isId
        ? 'Halo PT. Anugerah Jaya Pratama, saya ingin berkonsultasi mengenai pengadaan / konstruksi.'
        : 'Hello PT. Anugerah Jaya Pratama, I would like to consult on procurement / construction services.'
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-[#0A2342] text-slate-300 pt-16 pb-8 border-t-4 border-[#C9A961]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-700/60">
          {/* Col 1: Brand & Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <Logo variant="icon" size="md" />
              <div>
                <h3 className="text-white font-heading font-black tracking-wider text-lg">
                  ANUGERAH JAYA PRATAMA
                </h3>
                <p className="text-[#DFBA73] text-xs font-semibold tracking-wider uppercase">
                  PT. KONTRAKTOR & PENGADAAN
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {isId
                ? 'Mitra terpercaya proyek pemerintah, BUMN, dan swasta. Spesialis konstruksi gedung, infrastruktur jalan jembatan, dan pengadaan barang & jasa pemerintah berbasis e-Katalog LKPP & LPSE sejak 2015 di Baleendah, Kabupaten Bandung.'
                : 'Trusted partner for government, SOE, and private projects. Specialized in building construction, road and bridge infrastructure, and government procurement via LKPP e-Catalog & LPSE in Bandung, West Java.'}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs bg-slate-800/80 border border-slate-700 text-slate-200 px-2.5 py-1 rounded">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C9A961]" />
                <span>SIUJK & NIB Terverifikasi</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs bg-slate-800/80 border border-slate-700 text-slate-200 px-2.5 py-1 rounded">
                <Award className="w-3.5 h-3.5 text-[#C9A961]" />
                <span>ISO 9001:2015 & 45001</span>
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-heading font-bold text-sm tracking-wider uppercase border-l-2 border-[#C9A961] pl-2">
              {isId ? 'Navigasi' : 'Navigation'}
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { tab: 'home', idText: 'Beranda', enText: 'Home' },
                { tab: 'tentang', idText: 'Tentang Kami', enText: 'About Us' },
                { tab: 'layanan', idText: 'Layanan Kami', enText: 'Our Services' },
                { tab: 'proyek', idText: 'Portofolio Proyek', enText: 'Project Portfolio' },
                { tab: 'berita', idText: 'Berita & Tender', enText: 'News & Tenders' },
                { tab: 'kontak', idText: 'Hubungi Kami', enText: 'Contact Us' },
              ].map((item) => (
                <li key={item.tab}>
                  <button
                    onClick={() => onSelectTab(item.tab as PageTab)}
                    className="flex items-center gap-1.5 text-slate-300 hover:text-[#DFBA73] transition-colors text-left"
                  >
                    <ChevronRight className="w-3 h-3 text-[#C9A961]" />
                    <span>{isId ? item.idText : item.enText}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Layanan Spesifik (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-heading font-bold text-sm tracking-wider uppercase border-l-2 border-[#C9A961] pl-2">
              {isId ? 'Bidang Usaha' : 'Core Services'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-1.5">
                <span className="text-[#C9A961] font-bold mt-0.5">•</span>
                <span>Konstruksi Gedung Bertingkat & Fasilitas RS</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#C9A961] font-bold mt-0.5">•</span>
                <span>Peningkatan Jalan Raya & Jembatan Baja</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#C9A961] font-bold mt-0.5">•</span>
                <span>Penyedia e-Katalog LKPP Alat Kantor & IT</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#C9A961] font-bold mt-0.5">•</span>
                <span>Pengadaan Armada Truk & Kendaraan Dinas</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#C9A961] font-bold mt-0.5">•</span>
                <span>Konsultan Manajemen Proyek & Pengawasan</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#C9A961] font-bold mt-0.5">•</span>
                <span>Audit Keselamatan Konstruksi (SMK3)</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Baleendah Office (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-heading font-bold text-sm tracking-wider uppercase border-l-2 border-[#C9A961] pl-2">
              {isId ? 'Kantor & Kontak' : 'Office & Contact'}
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C9A961] shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C9A961] shrink-0" />
                <button
                  onClick={openWhatsApp}
                  className="hover:text-[#DFBA73] font-semibold transition"
                >
                  {COMPANY_INFO.phone} (WA Resmi)
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C9A961] shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="hover:text-[#DFBA73] transition"
                >
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#C9A961] shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.workingHours}</span>
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="pt-2">
              <button
                onClick={openWhatsApp}
                className="w-full py-2 px-3 rounded bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow"
              >
                <span>Konsultasi Proyek Cepat</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Partner Trust Strip */}
        <div className="py-6 border-b border-slate-700/60">
          <p className="text-xs uppercase tracking-widest text-[#DFBA73] text-center mb-3 font-semibold">
            {isId ? 'Terdaftar & Bermitra dengan Instansi Terkemuka' : 'Registered & Partnered with Leading Agencies'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-slate-400 font-medium">
            {CLIENT_PARTNERS.map((p, i) => (
              <span key={i} className="hover:text-white transition">
                {p.name}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} <span className="text-white font-semibold">PT. ANUGERAH JAYA PRATAMA</span>. {isId ? 'Hak Cipta Dilindungi.' : 'All Rights Reserved.'}
          </p>
          <div className="flex items-center gap-4">
            <span>Baleendah, Bandung - Jawa Barat</span>
            <span>•</span>
            <button
              onClick={() => onSelectTab('admin')}
              className="text-slate-400 hover:text-[#C9A961] transition underline"
            >
              Panel Admin
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
