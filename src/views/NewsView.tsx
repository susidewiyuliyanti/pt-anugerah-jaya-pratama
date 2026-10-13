import React, { useState } from 'react';
import { NewsItem, Language } from '../types';
import {
  Calendar,
  User,
  Clock,
  Search,
  ArrowRight,
  FileCheck2,
  BellRing,
  Tag,
} from 'lucide-react';

interface NewsViewProps {
  news: NewsItem[];
  onSelectNews: (item: NewsItem) => void;
  lang: Language;
}

export const NewsView: React.FC<NewsViewProps> = ({ news, onSelectNews, lang }) => {
  const isId = lang === 'id';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredNews = news.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchExcerpt = item.excerpt.toLowerCase().includes(q);
      if (!matchTitle && !matchExcerpt) return false;
    }
    return true;
  });

  return (
    <div className="space-y-12 sm:space-y-16 py-8 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Header Banner */}
      <section className="bg-[#0A2342] text-white py-12 sm:py-16 rounded-2xl relative overflow-hidden px-6 sm:px-12 border-b-4 border-[#C9A961]">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#DFBA73] bg-[#C9A961]/20 px-3 py-1 rounded border border-[#C9A961]/30">
            {isId ? 'PUSAT INFORMASI & PUBLIKASI' : 'MEDIA & TENDER BULLETIN'}
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white mt-4 tracking-tight">
            {isId ? 'Berita, Artikel & Update Tender' : 'News, Insights & Tender Updates'}
          </h1>
          <p className="mt-3 text-base text-slate-200 leading-relaxed">
            {isId
              ? 'Informasi resmi keikutsertaan lelang LPSE, regulasi pengadaan barang pemerintah, dan artikel teknis seputar standar keselamatan konstruksi.'
              : 'Official LPSE tender results, public procurement regulation updates, and technical construction articles.'}
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {[
            { id: 'all', labelId: 'Semua Publikasi', labelEn: 'All Posts' },
            { id: 'tender', labelId: 'Update Tender LPSE', labelEn: 'LPSE Tenders' },
            { id: 'konstruksi', labelId: 'Wawasan Konstruksi & K3', labelEn: 'Construction & OHS' },
            { id: 'perusahaan', labelId: 'Kabar Perusahaan', labelEn: 'Company News' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition ${
                selectedCategory === cat.id
                  ? 'bg-[#0A2342] text-white shadow'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {isId ? cat.labelId : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isId ? 'Cari artikel atau kode tender...' : 'Search news or tender code...'}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#0A2342]"
          />
        </div>
      </section>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredNews.map((item) => (
          <article
            key={item.id}
            onClick={() => onSelectNews(item)}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="relative h-56 overflow-hidden bg-slate-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-[#C9A961] text-[#0A2342] shadow">
                    {item.category === 'tender' ? 'Update Tender' : item.category === 'konstruksi' ? 'Teknik & K3' : 'Kabar Korporat'}
                  </span>
                  {item.status && (
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-600 text-white shadow">
                      {item.status}
                    </span>
                  )}
                </div>

                {item.lpseCode && (
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[11px] font-mono font-bold text-white bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1 border border-white/20">
                      <FileCheck2 className="w-3 h-3 text-[#DFBA73]" />
                      {item.lpseCode}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#C9A961]" />
                    <span>{item.date}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.author}</span>
                  </span>
                </div>

                <h3 className="font-heading font-bold text-lg text-[#0A2342] group-hover:text-[#13335A] leading-snug">
                  {isId ? item.title : (item.titleEn || item.title)}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {isId ? item.excerpt : (item.excerptEn || item.excerpt)}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">{item.readTime}</span>
                <span className="text-[#C9A961] font-bold group-hover:underline flex items-center gap-1">
                  <span>{isId ? 'Baca Selengkapnya' : 'Read Article'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
