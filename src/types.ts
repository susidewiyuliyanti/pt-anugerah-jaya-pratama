export type Language = 'id' | 'en';

export type PageTab = 'home' | 'tentang' | 'layanan' | 'proyek' | 'berita' | 'kontak' | 'admin';

export type ProjectCategory = 'konstruksi' | 'pengadaan' | 'konsultan';
export type ClientType = 'pemerintah' | 'swasta';

export interface Project {
  id: string;
  title: string;
  titleEn?: string;
  category: ProjectCategory;
  clientType: ClientType;
  year: number;
  location: string;
  budget: string; // e.g. "Rp 4.85 Miliar"
  duration: string; // e.g. "6 Bulan"
  clientName: string; // e.g. "Dinas PUPR Prov. Jabar"
  description: string;
  descriptionEn?: string;
  beforeImage: string;
  afterImage: string;
  featured: boolean;
  tags: string[];
  scopeOfWork: string[];
  progressPercent: number; // 100 for finished
  lpsePackageCode?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  titleEn?: string;
  excerpt: string;
  excerptEn?: string;
  content: string;
  contentEn?: string;
  category: 'tender' | 'konstruksi' | 'perusahaan';
  date: string;
  author: string;
  image: string;
  lpseCode?: string;
  status?: string; // e.g. "Selesai Evaluasi", "Dimenangkan", "Pengerjaan"
  readTime: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  institution: string;
  email: string;
  phone: string;
  need: 'konstruksi' | 'pengadaan' | 'konsultan' | 'lainnya';
  message: string;
  createdAt: string;
  status: 'baru' | 'dibaca' | 'dibalas';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  roleEn?: string;
  title: string;
  bio: string;
  bioEn?: string;
  photo: string;
  experienceYears: number;
}

export interface LegalDocument {
  id: string;
  title: string;
  number: string;
  issuer: string;
  validUntil: string;
  description: string;
  category: 'siujk' | 'nib' | 'npwp' | 'iso' | 'sbu';
  verified: boolean;
}

export interface DatabaseConfig {
  provider: 'local' | 'supabase' | 'googlesheet';
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  googleSheetWebhookUrl?: string;
}
