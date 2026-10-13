import React, { useState, useEffect } from 'react';
import { Project, NewsItem, ContactMessage, TeamMember, LegalDocument, Language } from './types';
import {
  INITIAL_PROJECTS,
  INITIAL_NEWS,
  INITIAL_MESSAGES,
  INITIAL_TEAM,
  INITIAL_LEGALITIES,
} from './data/initialData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { NewsDetailModal } from './components/NewsDetailModal';

// Views
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { ServicesView } from './views/ServicesView';
import { PortfolioView } from './views/PortfolioView';
import { NewsView } from './views/NewsView';
import { ContactView } from './views/ContactView';
import { AdminView } from './views/AdminView';

export default function App() {
  // 1. Language State
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem('ajp_lang') as Language) || 'id';
  });

  const handleToggleLang = () => {
    const nextLang: Language = lang === 'id' ? 'en' : 'id';
    setLang(nextLang);
    localStorage.setItem('ajp_lang', nextLang);
  };

  // 2. Active Page Routing State
  const [currentPage, setCurrentPage] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    const validPages = ['home', 'tentang', 'layanan', 'proyek', 'berita', 'kontak', 'admin'];
    return validPages.includes(hash) ? hash : 'home';
  });

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen to hash changes (back/forward browser buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validPages = ['home', 'tentang', 'layanan', 'proyek', 'berita', 'kontak', 'admin'];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // 3. Persistent Data Layer
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('ajp_projects');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved projects', e);
      }
    }
    return INITIAL_PROJECTS;
  });

  const [news, setNews] = useState<NewsItem[]>(() => {
    const saved = localStorage.getItem('ajp_news');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved news', e);
      }
    }
    return INITIAL_NEWS;
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('ajp_messages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved messages', e);
      }
    }
    return INITIAL_MESSAGES;
  });

  const [team, setTeam] = useState<TeamMember[]>(() => {
    const saved = localStorage.getItem('ajp_team');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.some((t: any) => t.name === 'Ali' || t.name === 'Paulus')) {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse saved team', e);
      }
    }
    return INITIAL_TEAM;
  });

  const [legalities, setLegalities] = useState<LegalDocument[]>(() => {
    const saved = localStorage.getItem('ajp_legalities');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved legalities', e);
      }
    }
    return INITIAL_LEGALITIES;
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('ajp_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('ajp_news', JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem('ajp_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('ajp_team', JSON.stringify(team));
  }, [team]);

  useEffect(() => {
    localStorage.setItem('ajp_legalities', JSON.stringify(legalities));
  }, [legalities]);

  // Reset function
  const handleResetData = () => {
    if (confirm('Apakah Anda ingin memulihkan semua data proyek, berita, dan pesan ke nilai awal?')) {
      setProjects(INITIAL_PROJECTS);
      setNews(INITIAL_NEWS);
      setMessages(INITIAL_MESSAGES);
      setTeam(INITIAL_TEAM);
      setLegalities(INITIAL_LEGALITIES);
      localStorage.removeItem('ajp_projects');
      localStorage.removeItem('ajp_news');
      localStorage.removeItem('ajp_messages');
      localStorage.removeItem('ajp_team');
      localStorage.removeItem('ajp_legalities');
      alert('Data berhasil dipulihkan!');
    }
  };

  // Add Contact Message
  const handleSendMessage = (msgData: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => {
    const newMsg: ContactMessage = {
      ...msgData,
      id: `msg-${Date.now()}`,
      createdAt: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'baru',
    };
    setMessages((prev) => [newMsg, ...prev]);
  };

  // 4. Modals State
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5] text-slate-900 font-sans selection:bg-[#C9A961] selection:text-[#0A2342]">
      {/* Header & Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        lang={lang}
        onToggleLang={handleToggleLang}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomeView
            projects={projects}
            news={news}
            onSelectProject={(p) => setSelectedProject(p)}
            onSelectNews={(n) => setSelectedNews(n)}
            onNavigate={handleNavigate}
            lang={lang}
          />
        )}

        {currentPage === 'tentang' && (
          <AboutView lang={lang} team={team} legalities={legalities} />
        )}

        {currentPage === 'layanan' && (
          <ServicesView lang={lang} />
        )}

        {currentPage === 'proyek' && (
          <PortfolioView
            projects={projects}
            onSelectProject={(p) => setSelectedProject(p)}
            lang={lang}
          />
        )}

        {currentPage === 'berita' && (
          <NewsView
            news={news}
            onSelectNews={(n) => setSelectedNews(n)}
            lang={lang}
          />
        )}

        {currentPage === 'kontak' && (
          <ContactView onSendMessage={handleSendMessage} lang={lang} />
        )}

        {currentPage === 'admin' && (
          <AdminView
            projects={projects}
            setProjects={setProjects}
            news={news}
            setNews={setNews}
            messages={messages}
            setMessages={setMessages}
            team={team}
            setTeam={setTeam}
            legalities={legalities}
            setLegalities={setLegalities}
            lang={lang}
            onResetData={handleResetData}
          />
        )}
      </main>

      {/* Corporate Footer */}
      <Footer onNavigate={handleNavigate} lang={lang} />

      {/* Sticky Quick Contact: WhatsApp Floating Button */}
      <FloatingWhatsApp lang={lang} />

      {/* Project Detail Modal with Interactive Before-After Slider */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        lang={lang}
      />

      {/* News / Tender Detail Modal */}
      <NewsDetailModal
        item={selectedNews}
        onClose={() => setSelectedNews(null)}
        lang={lang}
      />
    </div>
  );
}
