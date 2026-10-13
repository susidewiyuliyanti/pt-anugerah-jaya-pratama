import React, { useState } from 'react';
import { Project, NewsItem, ContactMessage, TeamMember, LegalDocument, Language, DatabaseConfig } from '../types';
import {
  Lock,
  Unlock,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Eye,
  MessageCircle,
  Download,
  Database,
  Building2,
  FileText,
  Users,
  ShieldCheck,
  Search,
  ExternalLink,
  Save,
  RotateCcw,
  LogOut,
} from 'lucide-react';

interface AdminViewProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  news: NewsItem[];
  setNews: React.Dispatch<React.SetStateAction<NewsItem[]>>;
  messages: ContactMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ContactMessage[]>>;
  team: TeamMember[];
  setTeam: React.Dispatch<React.SetStateAction<TeamMember[]>>;
  legalities: LegalDocument[];
  setLegalities: React.Dispatch<React.SetStateAction<LegalDocument[]>>;
  lang: Language;
  onResetData: () => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  projects,
  setProjects,
  news,
  setNews,
  messages,
  setMessages,
  team,
  setTeam,
  legalities,
  setLegalities,
  lang,
  onResetData,
}) => {
  const isId = lang === 'id';

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('ajp_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Admin Tab
  const [adminTab, setAdminTab] = useState<'proyek' | 'berita' | 'pesan' | 'tim' | 'database'>('proyek');

  // Modal / Form state for Projects
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    title: '',
    category: 'konstruksi',
    clientType: 'pemerintah',
    year: new Date().getFullYear(),
    location: 'Bandung, Jawa Barat',
    budget: 'Rp 5.000.000.000,-',
    duration: '6 Bulan',
    clientName: 'Dinas Pemerintah Provinsi Jawa Barat',
    description: '',
    beforeImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f5?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    tags: ['Konstruksi Pemerintah'],
    scopeOfWork: ['Pekerjaan Struktur', 'Pekerjaan Arsitektur', 'MEP'],
    progressPercent: 100,
  });

  // Modal / Form state for News
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [newsForm, setNewsForm] = useState<Partial<NewsItem>>({
    title: '',
    category: 'tender',
    excerpt: '',
    content: '',
    author: 'Divisi Humas & Legal',
    date: 'Hari Ini',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f5?auto=format&fit=crop&w=1000&q=80',
    lpseCode: 'TNDR-BDG-2024-001',
    status: 'Dimenangkan',
    readTime: '3 Menit',
  });

  // Database Config State
  const [dbConfig, setDbConfig] = useState<DatabaseConfig>(() => {
    const saved = localStorage.getItem('ajp_db_config');
    return saved
      ? JSON.parse(saved)
      : { provider: 'local', supabaseUrl: '', supabaseAnonKey: '', googleSheetWebhookUrl: '' };
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'admin123' || passwordInput === 'ajp2024') {
      setIsAuthenticated(true);
      localStorage.setItem('ajp_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Kata sandi salah. Gunakan default: admin123');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('ajp_admin_auth');
  };

  // PROJECT CRUD
  const handleOpenAddProject = () => {
    setEditingProject(null);
    setProjectForm({
      title: '',
      category: 'konstruksi',
      clientType: 'pemerintah',
      year: new Date().getFullYear(),
      location: 'Bandung, Jawa Barat',
      budget: 'Rp 5.000.000.000,-',
      duration: '6 Bulan',
      clientName: 'Dinas Pemerintah Provinsi Jawa Barat',
      description: 'Deskripsi teknis spesifikasi pekerjaan...',
      beforeImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f5?auto=format&fit=crop&w=1200&q=80',
      afterImage: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=80',
      featured: true,
      tags: ['Proyek Pemerintah', 'Baleendah'],
      scopeOfWork: ['Pekerjaan Struktur', 'Pekerjaan Arsitektur', 'MEP'],
      progressPercent: 100,
    });
    setShowProjectModal(true);
  };

  const handleOpenEditProject = (proj: Project) => {
    setEditingProject(proj);
    setProjectForm(proj);
    setShowProjectModal(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.clientName) {
      alert('Mohon isi judul proyek dan nama instansi.');
      return;
    }

    if (editingProject) {
      setProjects((prev) =>
        prev.map((p) => (p.id === editingProject.id ? ({ ...p, ...projectForm } as Project) : p))
      );
    } else {
      const newProj: Project = {
        id: `proj-${Date.now()}`,
        title: projectForm.title || '',
        category: projectForm.category || 'konstruksi',
        clientType: projectForm.clientType || 'pemerintah',
        year: Number(projectForm.year) || new Date().getFullYear(),
        location: projectForm.location || 'Bandung',
        budget: projectForm.budget || 'Rp 1.000.000.000,-',
        duration: projectForm.duration || '6 Bulan',
        clientName: projectForm.clientName || 'Pemerintah',
        description: projectForm.description || '',
        beforeImage: projectForm.beforeImage || 'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f5?auto=format&fit=crop&w=1200&q=80',
        afterImage: projectForm.afterImage || 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=80',
        featured: !!projectForm.featured,
        tags: projectForm.tags || ['Konstruksi'],
        scopeOfWork: projectForm.scopeOfWork || ['Pelaksanaan Fisik'],
        progressPercent: 100,
      };
      setProjects((prev) => [newProj, ...prev]);
    }
    setShowProjectModal(false);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus proyek ini dari portofolio?')) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // NEWS CRUD
  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsForm.title || !newsForm.content) {
      alert('Mohon isi judul dan konten berita.');
      return;
    }

    const newItem: NewsItem = {
      id: `news-${Date.now()}`,
      title: newsForm.title || '',
      category: newsForm.category || 'tender',
      excerpt: newsForm.excerpt || (newsForm.content ? newsForm.content.slice(0, 120) + '...' : ''),
      content: newsForm.content || '',
      author: newsForm.author || 'Tim Humas PT. AJP',
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      image: newsForm.image || 'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f5?auto=format&fit=crop&w=1000&q=80',
      lpseCode: newsForm.lpseCode,
      status: newsForm.status || 'Aktif',
      readTime: '3 Menit',
    };

    setNews((prev) => [newItem, ...prev]);
    setShowNewsModal(false);
  };

  const handleDeleteNews = (id: string) => {
    if (confirm('Hapus artikel/tender ini?')) {
      setNews((prev) => prev.filter((n) => n.id !== id));
    }
  };

  // MESSAGE ACTIONS
  const handleUpdateMessageStatus = (id: string, status: 'baru' | 'dibaca' | 'dibalas') => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
  };

  const handleDeleteMessage = (id: string) => {
    if (confirm('Hapus pesan kontak ini?')) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const handleReplyWA = (msg: ContactMessage) => {
    const rawNumber = msg.phone.replace(/[^0-9]/g, '');
    const cleanNumber = rawNumber.startsWith('0') ? '62' + rawNumber.slice(1) : rawNumber;
    const text = encodeURIComponent(
      `Halo Bapak/Ibu ${msg.name} dari ${msg.institution},\n\nTerima kasih telah menghubungi PT. ANUGERAH JAYA PRATAMA melalui formulir website resmi kami mengenai perihal: ${msg.need}.\n\nKami siap membantu pembahasan lebih lanjut.`
    );
    handleUpdateMessageStatus(msg.id, 'dibalas');
    window.open(`https://wa.me/${cleanNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Nama', 'Instansi', 'Email', 'Telepon', 'Kebutuhan', 'Pesan', 'Tanggal', 'Status'];
    const rows = messages.map((m) => [
      m.id,
      `"${m.name.replace(/"/g, '""')}"`,
      `"${m.institution.replace(/"/g, '""')}"`,
      m.email,
      m.phone,
      m.need,
      `"${m.message.replace(/"/g, '""')}"`,
      m.createdAt,
      m.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Pesan_Kontak_PT_AJP_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-16 px-4">
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#0A2342] text-[#DFBA73] flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="font-heading font-black text-2xl text-[#0A2342]">
              Panel Admin PT. AJP
            </h2>
            <p className="text-xs text-slate-500">
              Masuk untuk mengelola portofolio proyek, tender, pesan masuk, dan database.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">
                Kata Sandi Administrator
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setAuthError('');
                }}
                placeholder="Masukkan kata sandi..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2342]"
              />
            </div>

            {authError && (
              <p className="text-xs font-semibold text-rose-600 bg-rose-50 p-2 rounded">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-[#0A2342] hover:bg-[#13335A] text-white font-heading font-bold text-xs uppercase tracking-wider transition shadow"
            >
              Masuk ke Panel Admin
            </button>

            {/* Quick Demo Fill Helper */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setPasswordInput('admin123')}
                className="text-[11px] text-[#C9A961] font-semibold hover:underline"
              >
                Gunakan Password Default: admin123
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // AUTHENTICATED ADMIN DASHBOARD
  return (
    <div className="space-y-8 py-6 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Top Bar with Admin Profile & Logout */}
      <div className="bg-[#0A2342] text-white p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg border-b-4 border-[#C9A961]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#DFBA73]">
              SISTEM MANAJEMEN KONTEN KORPORAT
            </span>
          </div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white mt-1">
            Panel Admin PT. ANUGERAH JAYA PRATAMA
          </h1>
          <p className="text-xs text-slate-300 mt-0.5">
            Kelola tabel: <code className="text-[#DFBA73]">proyek</code>,{' '}
            <code className="text-[#DFBA73]">berita</code>,{' '}
            <code className="text-[#DFBA73]">pesan_kontak</code>,{' '}
            <code className="text-[#DFBA73]">tim & legalitas</code>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onResetData}
            className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold transition flex items-center gap-1.5"
            title="Muat Ulang Data Sampel Asli"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Data Default</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar</span>
          </button>
        </div>
      </div>

      {/* Admin Tab Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'proyek', label: `Kelola Proyek (${projects.length})`, icon: Building2 },
          { id: 'berita', label: `Berita & Tender (${news.length})`, icon: FileText },
          { id: 'pesan', label: `Pesan Kontak (${messages.length})`, icon: MessageCircle },
          { id: 'tim', label: `Tim & Legalitas`, icon: Users },
          { id: 'database', label: `Pengaturan Database`, icon: Database },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setAdminTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-lg text-xs font-heading font-bold transition flex items-center gap-2 ${
              adminTab === tab.id
                ? 'bg-[#0A2342] text-white shadow'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <tab.icon className="w-4 h-4 text-[#C9A961]" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: KELOLA PROYEK PORTOFOLIO */}
      {adminTab === 'proyek' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-heading font-bold text-xl text-[#0A2342]">
                Tabel Proyek Portofolio
              </h2>
              <p className="text-xs text-slate-500">
                Data proyek yang ditampilkan pada halaman beranda dan portofolio.
              </p>
            </div>

            <button
              onClick={handleOpenAddProject}
              className="px-4 py-2.5 rounded-lg bg-[#0A2342] hover:bg-[#13335A] text-white text-xs font-bold flex items-center gap-2 shadow"
            >
              <Plus className="w-4 h-4 text-[#DFBA73]" />
              <span>Tambah Proyek Baru</span>
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-heading font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Judul Proyek</th>
                  <th className="p-3.5">Kategori & Klien</th>
                  <th className="p-3.5">Tahun & Lokasi</th>
                  <th className="p-3.5">Nilai Kontrak</th>
                  <th className="p-3.5">Unggulan</th>
                  <th className="p-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-[#0A2342] max-w-xs truncate">
                      {proj.title}
                    </td>
                    <td className="p-3.5">
                      <span className="font-semibold uppercase text-slate-800">{proj.category}</span>
                      <span className="block text-slate-500">{proj.clientName}</span>
                    </td>
                    <td className="p-3.5">
                      <span className="font-semibold">{proj.year}</span>
                      <span className="block text-slate-500">{proj.location}</span>
                    </td>
                    <td className="p-3.5 font-bold text-[#C9A961]">{proj.budget}</td>
                    <td className="p-3.5">
                      <button
                        onClick={() => {
                          setProjects((prev) =>
                            prev.map((p) => (p.id === proj.id ? { ...p, featured: !p.featured } : p))
                          );
                        }}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          proj.featured ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {proj.featured ? 'Unggulan (6)' : 'Standar'}
                      </button>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEditProject(proj)}
                        className="p-1.5 rounded bg-blue-50 text-blue-700 hover:bg-blue-100"
                        title="Edit Proyek"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-1.5 rounded bg-rose-50 text-rose-700 hover:bg-rose-100"
                        title="Hapus Proyek"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: BERITA & TENDER */}
      {adminTab === 'berita' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-heading font-bold text-xl text-[#0A2342]">
                Tabel Berita & Update Tender
              </h2>
              <p className="text-xs text-slate-500">
                Kelola artikel publikasi, siaran pers LPSE, dan artikel K3 konstruksi.
              </p>
            </div>

            <button
              onClick={() => setShowNewsModal(true)}
              className="px-4 py-2.5 rounded-lg bg-[#0A2342] hover:bg-[#13335A] text-white text-xs font-bold flex items-center gap-2 shadow"
            >
              <Plus className="w-4 h-4 text-[#DFBA73]" />
              <span>Tambah Berita / Tender</span>
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-heading font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Judul Publikasi</th>
                  <th className="p-3.5">Kategori</th>
                  <th className="p-3.5">Tanggal</th>
                  <th className="p-3.5">Kode Tender / Status</th>
                  <th className="p-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {news.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-[#0A2342] max-w-sm truncate">
                      {item.title}
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#C9A961]/20 text-[#0A2342]">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-600">{item.date}</td>
                    <td className="p-3.5 font-mono text-slate-700">
                      {item.lpseCode || '-'} {item.status && `(${item.status})`}
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => handleDeleteNews(item.id)}
                        className="p-1.5 rounded bg-rose-50 text-rose-700 hover:bg-rose-100"
                        title="Hapus Berita"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: PESAN DARI FORM KONTAK */}
      {adminTab === 'pesan' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-heading font-bold text-xl text-[#0A2342]">
                Inbox Pesan Kontak ({messages.length})
              </h2>
              <p className="text-xs text-slate-500">
                Daftar pesan masuk dari instansi & klien melalui formulir kontak.
              </p>
            </div>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow"
            >
              <Download className="w-4 h-4" />
              <span>Export ke CSV / Excel</span>
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-heading font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Pengirim & Instansi</th>
                  <th className="p-3.5">Kontak</th>
                  <th className="p-3.5">Kebutuhan</th>
                  <th className="p-3.5">Isi Pesan</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Aksi & Balas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {messages.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      Belum ada pesan masuk.
                    </td>
                  </tr>
                ) : (
                  messages.map((msg) => (
                    <tr key={msg.id} className="hover:bg-slate-50">
                      <td className="p-3.5">
                        <strong className="block text-[#0A2342] font-bold">{msg.name}</strong>
                        <span className="text-slate-500">{msg.institution}</span>
                      </td>
                      <td className="p-3.5 text-slate-600">
                        <div>{msg.phone}</div>
                        <div className="text-[11px] text-slate-400">{msg.email}</div>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-50 text-blue-800">
                          {msg.need}
                        </span>
                      </td>
                      <td className="p-3.5 max-w-xs text-slate-700 truncate" title={msg.message}>
                        {msg.message}
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            msg.status === 'baru'
                              ? 'bg-amber-100 text-amber-800'
                              : msg.status === 'dibalas'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {msg.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right space-x-1.5">
                        <button
                          onClick={() => handleReplyWA(msg)}
                          className="px-2.5 py-1.5 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold inline-flex items-center gap-1"
                          title="Balas via WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Balas WA</span>
                        </button>
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="p-1.5 rounded bg-rose-50 text-rose-700 hover:bg-rose-100"
                          title="Hapus Pesan"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: TIM & LEGALITAS */}
      {adminTab === 'tim' && (
        <div className="space-y-8">
          {/* Sub: Legalities */}
          <div className="space-y-4">
            <h2 className="font-heading font-bold text-xl text-[#0A2342]">
              Legalitas & Izin Berusaha ({legalities.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {legalities.map((leg) => (
                <div key={leg.id} className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs uppercase text-[#0A2342]">{leg.title}</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Terverifikasi
                    </span>
                  </div>
                  <code className="text-xs font-mono font-bold text-[#C9A961] block">{leg.number}</code>
                  <p className="text-xs text-slate-500">{leg.issuer} • {leg.validUntil}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sub: Directors */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h2 className="font-heading font-bold text-xl text-[#0A2342]">
              Jajaran Direksi & Tenaga Ahli ({team.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {team.map((m) => (
                <div key={m.id} className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
                  <span className="text-[10px] font-bold uppercase text-[#C9A961] bg-amber-50 px-2 py-0.5 rounded">
                    {m.role}
                  </span>
                  <h4 className="font-heading font-bold text-sm text-slate-900 mt-1">{m.name}</h4>
                  <p className="text-xs text-slate-500">{m.title}</p>
                  <p className="text-[11px] text-slate-400">{m.experienceYears} Tahun Pengalaman</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: DATABASE CONFIG (Supabase / Google Sheets / Local) */}
      {adminTab === 'database' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div>
            <h2 className="font-heading font-black text-xl text-[#0A2342]">
              Pengaturan Integrasi Database (Supabase / Google Sheets)
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Secara default data disimpan dengan aman di penyimpanan lokal peramban (Local Persistence).
              Anda juga dapat mengintegrasikan dengan tabel Supabase atau Google Sheet Webhook API.
            </p>
          </div>

          <div className="space-y-4 max-w-xl">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Mode Penyimpanan Data</label>
              <select
                value={dbConfig.provider}
                onChange={(e) => setDbConfig({ ...dbConfig, provider: e.target.value as any })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none"
              >
                <option value="local">Penyimpanan Lokal (Browser Storage / Offline Ready)</option>
                <option value="supabase">Supabase Database API</option>
                <option value="googlesheet">Google Sheets Webhook (AppScript)</option>
              </select>
            </div>

            {dbConfig.provider === 'supabase' && (
              <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Supabase Project URL</label>
                  <input
                    type="text"
                    value={dbConfig.supabaseUrl || ''}
                    onChange={(e) => setDbConfig({ ...dbConfig, supabaseUrl: e.target.value })}
                    placeholder="https://xyzcompany.supabase.co"
                    className="w-full px-3 py-2 rounded border border-slate-300 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Supabase Anon Public Key</label>
                  <input
                    type="password"
                    value={dbConfig.supabaseAnonKey || ''}
                    onChange={(e) => setDbConfig({ ...dbConfig, supabaseAnonKey: e.target.value })}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5..."
                    className="w-full px-3 py-2 rounded border border-slate-300 text-xs"
                  />
                </div>
              </div>
            )}

            {dbConfig.provider === 'googlesheet' && (
              <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Google Sheet Webhook URL</label>
                  <input
                    type="text"
                    value={dbConfig.googleSheetWebhookUrl || ''}
                    onChange={(e) => setDbConfig({ ...dbConfig, googleSheetWebhookUrl: e.target.value })}
                    placeholder="https://script.google.com/macros/s/..."
                    className="w-full px-3 py-2 rounded border border-slate-300 text-xs"
                  />
                </div>
              </div>
            )}

            <button
              onClick={() => {
                localStorage.setItem('ajp_db_config', JSON.stringify(dbConfig));
                alert('Konfigurasi database berhasil disimpan!');
              }}
              className="px-5 py-2.5 rounded-lg bg-[#0A2342] text-white text-xs font-bold flex items-center gap-2 shadow"
            >
              <Save className="w-4 h-4 text-[#DFBA73]" />
              <span>Simpan Konfigurasi</span>
            </button>
          </div>
        </div>
      )}

      {/* PROJECT MODAL (ADD / EDIT) */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 my-8 max-h-[85vh] overflow-y-auto">
            <h3 className="font-heading font-black text-xl text-[#0A2342]">
              {editingProject ? 'Edit Data Proyek' : 'Tambah Proyek Portofolio'}
            </h3>

            <form onSubmit={handleSaveProject} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700">Nama / Judul Pekerjaan *</label>
                <input
                  type="text"
                  required
                  value={projectForm.title || ''}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700">Kategori</label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value as any })}
                    className="w-full p-2 border border-slate-300 rounded mt-1 bg-white"
                  >
                    <option value="konstruksi">Konstruksi</option>
                    <option value="pengadaan">Pengadaan</option>
                    <option value="konsultan">Konsultan</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700">Jenis Klien</label>
                  <select
                    value={projectForm.clientType}
                    onChange={(e) => setProjectForm({ ...projectForm, clientType: e.target.value as any })}
                    className="w-full p-2 border border-slate-300 rounded mt-1 bg-white"
                  >
                    <option value="pemerintah">Pemerintah</option>
                    <option value="swasta">Swasta / BUMN</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700">Nilai Kontrak</label>
                  <input
                    type="text"
                    value={projectForm.budget || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, budget: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded mt-1"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">Tahun Pelaksanaan</label>
                  <input
                    type="number"
                    value={projectForm.year || 2024}
                    onChange={(e) => setProjectForm({ ...projectForm, year: Number(e.target.value) })}
                    className="w-full p-2 border border-slate-300 rounded mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700">Instansi Pemberi Kerja</label>
                  <input
                    type="text"
                    value={projectForm.clientName || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, clientName: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded mt-1"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">Lokasi Proyek</label>
                  <input
                    type="text"
                    value={projectForm.location || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700">URL Foto Kondisi Awal (Before)</label>
                <input
                  type="text"
                  value={projectForm.beforeImage || ''}
                  onChange={(e) => setProjectForm({ ...projectForm, beforeImage: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded mt-1"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700">URL Foto Hasil Akhir (After)</label>
                <input
                  type="text"
                  value={projectForm.afterImage || ''}
                  onChange={(e) => setProjectForm({ ...projectForm, afterImage: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded mt-1"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700">Uraian & Spesifikasi Teknis</label>
                <textarea
                  rows={3}
                  value={projectForm.description || ''}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded mt-1"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowProjectModal(false)}
                  className="px-4 py-2 rounded bg-slate-200 text-slate-700 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-[#0A2342] text-white font-bold"
                >
                  Simpan Proyek
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* NEWS MODAL (ADD) */}
      {showNewsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 my-8">
            <h3 className="font-heading font-black text-xl text-[#0A2342]">
              Tambah Berita / Update Tender
            </h3>

            <form onSubmit={handleSaveNews} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700">Judul Artikel / Pengumuman *</label>
                <input
                  type="text"
                  required
                  value={newsForm.title || ''}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700">Kategori</label>
                  <select
                    value={newsForm.category}
                    onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value as any })}
                    className="w-full p-2 border border-slate-300 rounded mt-1 bg-white"
                  >
                    <option value="tender">Update Tender LPSE</option>
                    <option value="konstruksi">Wawasan Konstruksi</option>
                    <option value="perusahaan">Kabar Perusahaan</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700">Kode Tender LPSE (Opsional)</label>
                  <input
                    type="text"
                    value={newsForm.lpseCode || ''}
                    onChange={(e) => setNewsForm({ ...newsForm, lpseCode: e.target.value })}
                    placeholder="Contoh: TNDR-JBR-2024-0982"
                    className="w-full p-2 border border-slate-300 rounded mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700">Ringkasan / Excerpt</label>
                <input
                  type="text"
                  value={newsForm.excerpt || ''}
                  onChange={(e) => setNewsForm({ ...newsForm, excerpt: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded mt-1"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700">Isi Berita Lengkap *</label>
                <textarea
                  rows={4}
                  required
                  value={newsForm.content || ''}
                  onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded mt-1"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowNewsModal(false)}
                  className="px-4 py-2 rounded bg-slate-200 text-slate-700 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-[#0A2342] text-white font-bold"
                >
                  Simpan Publikasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
