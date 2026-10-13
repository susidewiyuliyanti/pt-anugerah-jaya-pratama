import React, { useState } from 'react';
import { Logo } from './Logo';
import { PageTab, Language } from '../types';
import { COMPANY_INFO } from '../data/initialData';
import { generateCompanyProfilePDF } from '../utils/pdfGenerator';
import {
  Phone,
  Mail,
  MapPin,
  FileDown,
  Menu,
  X,
  MessageCircle,
  Globe,
  Lock,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

interface NavbarProps {
  currentTab: PageTab;
  onSelectTab: (tab: PageTab) => void;
  lang: Language;
  onToggleLang: () => void;
  unreadCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  lang,
  onToggleLang,
  unreadCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  const isId = lang === 'id';

  const navLinks: { tab: PageTab; labelId: string; labelEn: string }[] = [
    { tab: 'home', labelId: 'Beranda', labelEn: 'Home' },
    { tab: 'tentang', labelId: 'Tentang Kami', labelEn: 'About Us' },
    { tab: 'layanan', labelId: 'Layanan', labelEn: 'Services' },
    { tab: 'proyek', labelId: 'Portofolio', labelEn: 'Portfolio' },
    { tab: 'berita', labelId: 'Berita & Tender', labelEn: 'News & Tenders' },
    { tab: 'kontak', labelId: 'Kontak', labelEn: 'Contact' },
  ];

  const handleDownloadPDF = () => {
    setIsDownloadingPdf(true);
    try {
      generateCompanyProfilePDF(lang);
    } catch (e) {
      console.error('Failed to generate PDF', e);
    } finally {
      setTimeout(() => setIsDownloadingPdf(false), 1200);
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      isId
        ? 'Halo PT. Anugerah Jaya Pratama, saya ingin konsultasi mengenai proyek konstruksi / pengadaan pemerintah.'
        : 'Hello PT. Anugerah Jaya Pratama, I would like to consult regarding a construction / government procurement project.'
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-md bg-white">
      {/* Top Corporate Strip */}
      <div className="bg-[#0A2342] text-white text-xs py-1.5 px-4 sm:px-8 border-b border-[#C9A961]/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-slate-300">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C9A961]" />
              <span>Baleendah, Kab. Bandung</span>
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="flex items-center gap-1.5 hover:text-[#DFBA73] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C9A961]" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
            <span className="hidden sm:inline text-slate-600">|</span>
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="hidden lg:flex items-center gap-1.5 hover:text-[#DFBA73] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#C9A961]" />
              <span>{COMPANY_INFO.email}</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-[11px] bg-[#C9A961]/20 text-[#DFBA73] px-2 py-0.5 rounded font-medium border border-[#C9A961]/30">
              <ShieldCheck className="w-3 h-3 text-[#DFBA73]" />
              <span>e-Katalog LKPP & LPSE Ready</span>
            </span>

            {/* Language Switcher */}
            <button
              id="btn-lang-toggle"
              onClick={onToggleLang}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-[11px] border border-slate-600 transition"
              title="Ganti Bahasa / Switch Language"
            >
              <Globe className="w-3 h-3 text-[#C9A961]" />
              <span className="font-semibold">{lang.toUpperCase()}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => onSelectTab('home')}
          className="text-left focus:outline-none group"
          id="btn-nav-home-logo"
        >
          <Logo variant="horizontal" size="sm" />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = currentTab === link.tab;
            return (
              <button
                key={link.tab}
                id={`nav-link-${link.tab}`}
                onClick={() => onSelectTab(link.tab)}
                className={`px-3 py-2 rounded-md text-sm font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'text-[#0A2342] bg-[#C9A961]/15 border-b-2 border-[#C9A961]'
                    : 'text-slate-700 hover:text-[#0A2342] hover:bg-slate-100'
                }`}
              >
                {isId ? link.labelId : link.labelEn}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* PDF Download Button */}
          <button
            id="btn-download-pdf-nav"
            onClick={handleDownloadPDF}
            disabled={isDownloadingPdf}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded bg-[#0A2342] text-white hover:bg-[#13335A] border border-[#0A2342] transition shadow-sm"
            title={isId ? 'Unduh Profil Perusahaan PDF Resmi' : 'Download Official Company Profile PDF'}
          >
            <FileDown className={`w-4 h-4 text-[#DFBA73] ${isDownloadingPdf ? 'animate-bounce' : ''}`} />
            <span>{isDownloadingPdf ? (isId ? 'Memproses...' : 'Processing...') : isId ? 'Unduh Profil PDF' : 'Download PDF'}</span>
          </button>

          {/* Direct WhatsApp Call */}
          <button
            id="btn-cta-whatsapp-nav"
            onClick={openWhatsApp}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded bg-[#16a34a] text-white hover:bg-[#15803d] transition shadow-sm"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>{isId ? 'Hubungi WA' : 'WhatsApp'}</span>
          </button>

          {/* Admin Link */}
          <button
            id="btn-nav-admin"
            onClick={() => onSelectTab('admin')}
            className={`p-2 rounded text-xs transition relative ${
              currentTab === 'admin'
                ? 'bg-[#0A2342] text-[#DFBA73]'
                : 'text-slate-500 hover:text-[#0A2342] hover:bg-slate-100'
            }`}
            title="Panel Admin PT. AJP"
          >
            <Lock className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex xl:hidden items-center gap-2">
          <button
            onClick={() => onSelectTab('admin')}
            className="p-2 rounded text-slate-700 hover:bg-slate-100 relative"
            title="Admin"
          >
            <Lock className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            id="btn-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-[#0A2342] hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 shadow-xl px-4 py-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = currentTab === link.tab;
              return (
                <button
                  key={link.tab}
                  onClick={() => {
                    onSelectTab(link.tab);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-3 py-2.5 rounded text-sm font-semibold transition ${
                    isActive
                      ? 'bg-[#0A2342] text-white'
                      : 'text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <span>{isId ? link.labelId : link.labelEn}</span>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </button>
              );
            })}
          </div>

          <div className="pt-4 mt-3 border-t border-slate-200 flex flex-col gap-2">
            <button
              onClick={() => {
                handleDownloadPDF();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded bg-[#0A2342] text-white text-xs font-semibold shadow"
            >
              <FileDown className="w-4 h-4 text-[#DFBA73]" />
              <span>{isId ? 'Unduh Profil Perusahaan (PDF)' : 'Download Company Profile (PDF)'}</span>
            </button>

            <button
              onClick={() => {
                openWhatsApp();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded bg-[#16a34a] text-white text-xs font-bold shadow"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>{isId ? 'Konsultasi via WhatsApp' : 'Contact via WhatsApp'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
