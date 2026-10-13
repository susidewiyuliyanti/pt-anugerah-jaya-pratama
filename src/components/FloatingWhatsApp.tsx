import React from 'react';
import { COMPANY_INFO } from '../data/initialData';
import { MessageCircle } from 'lucide-react';
import { Language } from '../types';

interface FloatingWhatsAppProps {
  lang: Language;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ lang }) => {
  const isId = lang === 'id';

  const handleClick = () => {
    const message = encodeURIComponent(
      isId
        ? 'Halo PT. ANUGERAH JAYA PRATAMA, saya ingin konsultasi mengenai proyek pengadaan / konstruksi.'
        : 'Hello PT. ANUGERAH JAYA PRATAMA, I would like to inquire about government procurement / construction services.'
    );
    window.open(
      `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${message}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group">
      {/* Tooltip Label */}
      <div className="mr-3 hidden md:flex items-center bg-[#0A2342] text-white text-xs font-semibold py-1.5 px-3.5 rounded-full shadow-lg border border-[#C9A961]/40 tracking-wide transition-all duration-300 opacity-95 group-hover:opacity-100 scale-95 group-hover:scale-100">
        <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-ping" />
        <span>{isId ? 'Chat WA Resmi: +62 895-4288-96940' : 'Official WhatsApp: +62 895-4288-96940'}</span>
      </div>

      {/* Button */}
      <button
        id="btn-floating-wa"
        onClick={handleClick}
        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
        aria-label="Hubungi WhatsApp Resmi PT. Anugerah Jaya Pratama"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping" />
        <MessageCircle className="w-8 h-8 fill-white relative z-10" />
      </button>
    </div>
  );
};
