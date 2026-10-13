import { jsPDF } from 'jspdf';
import { COMPANY_INFO, INITIAL_PROJECTS, INITIAL_LEGALITIES, INITIAL_TEAM } from '../data/initialData';
import { Language } from '../types';

export const generateCompanyProfilePDF = (lang: Language = 'id') => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const isId = lang === 'id';
  const navyColor: [number, number, number] = [10, 35, 66]; // #0A2342
  const goldColor: [number, number, number] = [201, 169, 97]; // #C9A961
  const darkGray: [number, number, number] = [51, 65, 85];
  const lightGray: [number, number, number] = [245, 245, 245];

  // Helper function to draw corporate header
  const drawPageHeader = (pageNumber: number, title: string) => {
    // Header background bar
    doc.setFillColor(...navyColor);
    doc.rect(0, 0, 210, 22, 'F');

    // Gold accent stripe
    doc.setFillColor(...goldColor);
    doc.rect(0, 22, 210, 2, 'F');

    // Header Text
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('PT. ANUGERAH JAYA PRATAMA', 14, 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(223, 186, 115);
    doc.text(
      isId
        ? 'SOLUSI TERPERCAYA PROYEK PEMERINTAH, KONSTRUKSI & PENGADAAN'
        : 'TRUSTED SOLUTION FOR GOVERNMENT PROJECTS, CONSTRUCTION & PROCUREMENT',
      14,
      17
    );

    // Section title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text(title.toUpperCase(), 196, 14, { align: 'right' });

    // Footer
    doc.setDrawColor(200, 200, 200);
    doc.line(14, 282, 196, 282);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...darkGray);
    doc.text(
      `Kantor: Baleendah, Kabupaten Bandung, Jawa Barat | Telp/WA: ${COMPANY_INFO.phone} | Email: ${COMPANY_INFO.email}`,
      14,
      287
    );
    doc.text(`Hal. ${pageNumber} / 3`, 196, 287, { align: 'right' });
  };

  // ================= PAGE 1: COVER & COMPANY PROFILE =================
  doc.setFillColor(...navyColor);
  doc.rect(0, 0, 210, 297, 'F');

  // Gold luxury frame
  doc.setDrawColor(...goldColor);
  doc.setLineWidth(1.5);
  doc.rect(10, 10, 190, 277);
  doc.setLineWidth(0.4);
  doc.rect(13, 13, 184, 271);

  // Crest graphic (Hexagon + Pillars decorative)
  doc.setFillColor(...goldColor);
  doc.rect(85, 36, 40, 4, 'F');
  doc.circle(105, 48, 8, 'F');

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.text('PT. ANUGERAH JAYA PRATAMA', 105, 75, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...goldColor);
  doc.text(
    isId
      ? 'DOKUMEN PROFIL PERUSAHAAN & KUALIFIKASI USAHA'
      : 'CORPORATE COMPANY PROFILE & QUALIFICATION DOSSIER',
    105,
    85,
    { align: 'center' }
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(230, 230, 230);
  doc.text(
    isId
      ? '“Mitra Terpercaya Proyek Pemerintah, Konstruksi & Pengadaan Berpengalaman Sejak 2015”'
      : '“Trusted Partner in Government Infrastructure, Construction & Procurement Since 2015”',
    105,
    94,
    { align: 'center' }
  );

  // Profile Card Box on Cover
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(20, 115, 170, 120, 3, 3, 'F');

  doc.setTextColor(...navyColor);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text(isId ? 'TENTANG PERUSAHAAN' : 'ABOUT THE COMPANY', 28, 128);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...darkGray);
  const aboutText = isId
    ? 'PT. Anugerah Jaya Pratama adalah badan usaha berbadan hukum yang berkedudukan di Baleendah, Kabupaten Bandung, Jawa Barat. Perusahaan memiliki spesialisasi dalam bidang Pelaksana Konstruksi Gedung, Infrastruktur Jalan & Jembatan, Pengadaan Barang dan Jasa Pemerintah berbasis Sistem Katalog Elektronik (e-Katalog LKPP) dan LPSE, serta Konsultansi Manajemen Proyek.\n\nDengan komitmen terhadap standar Keselamatan Konstruksi (SMK3), efisiensi biaya, kepatuhan hukum, dan ketepatan waktu, kami siap menjadi rekanan strategis kementerian, dinas pemerintah daerah, BUMN, dan swasta.'
    : 'PT. Anugerah Jaya Pratama is a registered legal corporation headquartered in Baleendah, Bandung Regency, West Java. We specialize in Building Construction, Road & Bridge Infrastructure, Government Goods and Services Procurement via LKPP e-Catalog & LPSE, and Construction Management Consultancy.\n\nCommitted to ISO/SMK3 safety standards, budgetary discipline, and rigorous regulatory compliance, we serve government ministries, local government departments, state-owned enterprises (SOE/BUMN), and commercial partners.';

  const splitAbout = doc.splitTextToSize(aboutText, 154);
  doc.text(splitAbout, 28, 135);

  // Vision & Mission
  doc.setFillColor(...lightGray);
  doc.rect(28, 170, 154, 55, 'F');

  doc.setTextColor(...navyColor);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(isId ? 'VISI PERUSAHAAN:' : 'CORPORATE VISION:', 34, 179);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(...darkGray);
  const visiText = isId
    ? 'Menjadi perusahaan jasa konstruksi dan penyedia pengadaan barang/jasa pemerintah terdepan, kredibel, dan berintegritas tinggi di tingkat regional maupun nasional.'
    : 'To be a premier, credible, and high-integrity construction firm and government procurement partner on regional and national levels.';
  doc.text(doc.splitTextToSize(visiText, 142), 34, 185);

  doc.setTextColor(...navyColor);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(isId ? 'MISI PERUSAHAAN:' : 'CORPORATE MISSION:', 34, 198);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...darkGray);
  const misiPoints = isId
    ? [
        '1. Menyelesaikan setiap pekerjaan fisik dengan standar mutu teknik terbaik dan Zero Accident.',
        '2. Mematuhi tata kelola pengadaan barang pemerintah yang transparan, akuntabel, dan kompetitif.',
        '3. Memberdayakan sumber daya lokal serta material berkualitas dengan Tingkat Komponen Dalam Negeri (TKDN).',
      ]
    : [
        '1. Deliver engineering and construction projects with top quality standards and Zero Accident.',
        '2. Strictly adhere to transparent, accountable, and competitive government procurement governance.',
        '3. Empower local resources and quality materials with certified domestic component values (TKDN).',
      ];
  doc.text(misiPoints, 34, 204);

  // Cover footer metadata
  doc.setTextColor(200, 200, 200);
  doc.setFontSize(8);
  doc.text(`Lokasi Kantor: Baleendah, Kabupaten Bandung, Jawa Barat`, 105, 252, { align: 'center' });
  doc.text(`Telp/WA: ${COMPANY_INFO.phone} | Email: ${COMPANY_INFO.email}`, 105, 258, { align: 'center' });

  // ================= PAGE 2: LEGALITAS & BIDANG LAYANAN =================
  doc.addPage();
  drawPageHeader(2, isId ? 'Legalitas & Layanan' : 'Legal & Services');

  // Legalities Title
  doc.setTextColor(...navyColor);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(isId ? '1. LEGALITAS & KELENGKAPAN PERIZINAN BERUSAHA' : '1. CORPORATE LICENSES & LEGAL COMPLIANCE', 14, 34);

  let curY = 40;
  INITIAL_LEGALITIES.forEach((leg, index) => {
    doc.setFillColor(index % 2 === 0 ? 245 : 255, index % 2 === 0 ? 247 : 255, index % 2 === 0 ? 250 : 255);
    doc.rect(14, curY, 182, 12, 'F');
    doc.setDrawColor(220, 220, 220);
    doc.rect(14, curY, 182, 12, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...navyColor);
    doc.text(`${leg.title}:`, 18, curY + 5);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...goldColor);
    doc.text(leg.number, 88, curY + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...darkGray);
    doc.text(`Penerbit: ${leg.issuer} | Status: ${leg.validUntil}`, 18, curY + 9.5);

    curY += 13.5;
  });

  curY += 6;

  // 3 Layanan Utama
  doc.setTextColor(...navyColor);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(isId ? '2. TIGA BIDANG LAYANAN UTAMA PERUSAHAAN' : '2. THREE MAIN SERVICE DIVISIONS', 14, curY);
  curY += 6;

  const services = [
    {
      title: isId ? 'A. JASA KONSTRUKSI & BANGUNAN' : 'A. CONSTRUCTION & CIVIL ENGINEERING',
      desc: isId
        ? 'Pembangunan gedung bertingkat, fasilitas kesehatan/rumah sakit, sekolah, sarana olahraga, jalan raya perkerasan kaku (rigid pavement), jembatan baja/beton, dan saluran drainase perkotaan.'
        : 'Commercial multi-storey buildings, hospital inpatient facilities, schools, rigid pavement roadways, steel & concrete bridges, and urban drainage networks.',
    },
    {
      title: isId ? 'B. PENGADAAN BARANG & JASA PEMERINTAH (LPSE & e-KATALOG)' : 'B. GOVERNMENT PROCUREMENT (LPSE & E-CATALOG)',
      desc: isId
        ? 'Penyedia terdaftar katalog elektronik LKPP dan LPSE: Alat Tulis Kantor (ATK), perangkat keras IT & server, armada kendaraan operasional dinas, serta alat kesehatan rumah sakit bergaransi resmi.'
        : 'Registered official supplier on LKPP e-Catalog & LPSE: Office stationery, enterprise IT server hardware, municipal operational fleets, and hospital medical devices.',
    },
    {
      title: isId ? 'C. KONSULTAN PROYEK & MANAJEMEN KONSTRUKSI' : 'C. PROJECT CONSULTANCY & CONSTRUCTION MANAGEMENT',
      desc: isId
        ? 'Studi kelayakan (feasibility study), perencanaan teknis DED, pengawasan berkala, audit kelaikan struktur, audit keselamatan konstruksi (SMK3), serta maintenance berkala fasilitas BUMN.'
        : 'Feasibility studies, detailed engineering design (DED), construction site supervision, structural audits, OHS safety audits, and scheduled facility maintenance.',
    },
  ];

  services.forEach((s) => {
    doc.setFillColor(...lightGray);
    doc.roundedRect(14, curY, 182, 28, 2, 2, 'F');
    doc.setDrawColor(...navyColor);
    doc.rect(14, curY, 2.5, 28, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...navyColor);
    doc.text(s.title, 20, curY + 6.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...darkGray);
    doc.text(doc.splitTextToSize(s.desc, 170), 20, curY + 13);

    curY += 32;
  });

  // ================= PAGE 3: PORTOFOLIO & DIREKSI =================
  doc.addPage();
  drawPageHeader(3, isId ? 'Portofolio & Pengesahan' : 'Track Record & Endorsement');

  doc.setTextColor(...navyColor);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(isId ? '1. REKAM JEJAK PORTOFOLIO PROYEK UNGGULAN' : '1. FEATURED GOVERNMENT & COMMERCIAL PORTFOLIO', 14, 34);

  let projY = 40;
  // Table Header
  doc.setFillColor(...navyColor);
  doc.rect(14, projY, 182, 7, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text(isId ? 'NAMA PEKERJAAN PROYEK' : 'PROJECT NAME', 18, projY + 4.8);
  doc.text(isId ? 'INSTANSI / PEMBERI KERJA' : 'CLIENT / AGENCY', 105, projY + 4.8);
  doc.text(isId ? 'NILAI KONTRAK' : 'CONTRACT VALUE', 158, projY + 4.8);
  doc.text(isId ? 'STATUS' : 'STATUS', 184, projY + 4.8);

  projY += 7;

  INITIAL_PROJECTS.slice(0, 6).forEach((p, idx) => {
    const bg = idx % 2 === 0 ? 255 : 248;
    doc.setFillColor(bg, bg, bg);
    doc.rect(14, projY, 182, 13, 'F');
    doc.setDrawColor(220, 220, 220);
    doc.rect(14, projY, 182, 13, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...navyColor);
    const splitTitle = doc.splitTextToSize(isId ? p.title : (p.titleEn || p.title), 85);
    doc.text(splitTitle, 18, projY + 4.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...darkGray);
    const splitClient = doc.splitTextToSize(p.clientName, 50);
    doc.text(splitClient, 105, projY + 4.5);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(165, 132, 62);
    doc.text(p.budget, 158, projY + 6);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(16, 140, 70);
    doc.text('100% Selesai', 184, projY + 6);

    projY += 13.5;
  });

  projY += 6;

  // Board of Directors Summary
  doc.setTextColor(...navyColor);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(isId ? '2. JAJARAN DIREKSI & PENGESAHAN DOKUMEN' : '2. BOARD OF DIRECTORS & OFFICIAL ENDORSEMENT', 14, projY);
  projY += 7;

  doc.setFillColor(...lightGray);
  doc.roundedRect(14, projY, 182, 50, 2, 2, 'F');

  // Left side: Director info
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...navyColor);
  doc.text('ALI', 22, projY + 12);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...goldColor);
  doc.text(isId ? 'Direktur Utama PT. Anugerah Jaya Pratama' : 'President Director', 22, projY + 17);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...navyColor);
  doc.text('PAULUS', 22, projY + 28);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...goldColor);
  doc.text(isId ? 'Komisaris PT. Anugerah Jaya Pratama' : 'Commissioner', 22, projY + 33);

  // Right side: Official Stamp Box
  doc.setDrawColor(...goldColor);
  doc.setLineWidth(0.8);
  doc.roundedRect(125, projY + 6, 62, 38, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...navyColor);
  doc.text(isId ? 'PENGESAHAN KORPORASI' : 'CORPORATE ENDORSEMENT', 156, projY + 12, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...darkGray);
  doc.text('Baleendah, Kabupaten Bandung', 156, projY + 17, { align: 'center' });
  doc.text('Diterbitkan Resmi oleh:', 156, projY + 22, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...navyColor);
  doc.text('PT. ANUGERAH JAYA PRATAMA', 156, projY + 37, { align: 'center' });

  // Save/Download PDF
  const filename = `Company_Profile_PT_Anugerah_Jaya_Pratama_${new Date().getFullYear()}.pdf`;
  doc.save(filename);
};
