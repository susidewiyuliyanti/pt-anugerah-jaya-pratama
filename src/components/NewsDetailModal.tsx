import React from 'react';
import { NewsItem, Language } from '../types';
import { COMPANY_INFO } from '../data/initialData';
import {
  X,
  Calendar,
  User,
  Clock,
  Tag,
  Share2,
  FileCheck2,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';

interface NewsDetailModalProps {
  news: NewsItem | null;
  onClose: () => void;
  lang: Language;
}

export const NewsDetailModal: React.FC<NewsDetailModalProps> = ({ news, onClose, lang }) => {
  if (!news) return null;
  const isId = lang === 'id';

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: news.title,
        text: news.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(isId ? 'Link berhasil disalin ke clipboard!' : 'Link copied to clipboard!');
    }
  };

  const handleConsult = () => {
    const text = encodeURIComponent(
      isId
        ? `Halo PT. Anugerah Jaya Pratama, saya membaca update tender/berita "${news.title}". Ingin konsultasi lebih lanjut.`
        : `Hello PT. Anugerah Jaya Pratama, I read your update "${news.titleEn || news.title}". Would like to consult.`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl overflow-hidden my-8 border border-slate-200">
        {/* Header Image */}
        <div className="relative h-64 sm:h-80 w-full bg-slate-900">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover opacity-85"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition z-10"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category & Badge */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
            <span className="px-3 py-1 text-xs font-extrabold uppercase rounded bg-[#C9A961] text-[#0A2342] shadow">
              {news.category === 'tender' ? 'Update Tender LPSE' : news.category === 'konstruksi' ? 'Teknologi Konstruksi' : 'Kabar Perusahaan'}
            </span>
            {news.status && (
              <span className="px-3 py-1 text-xs font-semibold rounded bg-emerald-600 text-white shadow">
                {news.status}
              </span>
            )}
          </div>

          {/* Title on bottom overlay */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold leading-tight drop-shadow-md">
              {isId ? news.title : (news.titleEn || news.title)}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Metadata bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pb-4 border-b border-slate-200">
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-4 h-4 text-[#C9A961]" />
              {news.date}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <User className="w-4 h-4 text-[#0A2342]" />
              {news.author}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-4 h-4 text-slate-400" />
              {news.readTime}
            </span>
            {news.lpseCode && (
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold border border-blue-200">
                <FileCheck2 className="w-3.5 h-3.5" />
                Kode Paket: {news.lpseCode}
              </span>
            )}
          </div>

          {/* Excerpt Lead */}
          <p className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed italic border-l-4 border-[#C9A961] pl-4 py-1 bg-amber-50/50 rounded-r">
            {isId ? news.excerpt : (news.excerptEn || news.excerpt)}
          </p>

          {/* Main Article Paragraphs */}
          <div className="text-sm text-slate-700 leading-relaxed space-y-4 whitespace-pre-line">
            {isId ? news.content : (news.contentEn || news.content)}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 p-4 sm:p-5 flex items-center justify-between border-t border-slate-200">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
          >
            <Share2 className="w-4 h-4" />
            <span>{isId ? 'Bagikan Artikel' : 'Share Article'}</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-200 rounded-lg border border-slate-300 transition"
            >
              {isId ? 'Tutup' : 'Close'}
            </button>
            <button
              onClick={handleConsult}
              className="px-4 py-2 text-xs font-bold text-white bg-[#16a34a] hover:bg-[#15803d] rounded-lg shadow flex items-center gap-1.5 transition"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>{isId ? 'Tanya via WhatsApp' : 'Inquire via WhatsApp'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
