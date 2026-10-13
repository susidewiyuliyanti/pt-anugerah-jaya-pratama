import React, { useState } from 'react';
import { ContactMessage, Language } from '../types';
import { COMPANY_INFO } from '../data/initialData';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  CheckCircle2,
  Building2,
  HelpCircle,
  ShieldCheck,
} from 'lucide-react';

interface ContactViewProps {
  onSendMessage: (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => void;
  lang: Language;
}

export const ContactView: React.FC<ContactViewProps> = ({ onSendMessage, lang }) => {
  const isId = lang === 'id';

  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    email: '',
    phone: '',
    need: 'konstruksi' as 'konstruksi' | 'pengadaan' | 'konsultan' | 'lainnya',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      alert(isId ? 'Mohon lengkapi nama, nomor telepon/WA, dan pesan Anda.' : 'Please fill in your name, phone number, and message.');
      return;
    }

    onSendMessage({
      name: formData.name,
      institution: formData.institution || 'Individu / Swasta',
      email: formData.email,
      phone: formData.phone,
      need: formData.need,
      message: formData.message,
    });

    setSubmitted(true);
  };

  const handleSendViaWhatsApp = () => {
    const needLabel = {
      konstruksi: 'Jasa Konstruksi & Bangunan',
      pengadaan: 'Pengadaan Barang & Jasa Pemerintah (e-Katalog/LPSE)',
      konsultan: 'Konsultan Proyek & Manajemen Konstruksi',
      lainnya: 'Kebutuhan Lainnya',
    }[formData.need];

    const text = encodeURIComponent(
      `*FORMULIR PENGAJUAN PROYEK / KONSULTASI*\n` +
      `-----------------------------------------\n` +
      `*Nama:* ${formData.name}\n` +
      `*Instansi/Perusahaan:* ${formData.institution}\n` +
      `*Email:* ${formData.email}\n` +
      `*Nomor WA:* ${formData.phone}\n` +
      `*Kategori Kebutuhan:* ${needLabel}\n` +
      `*Pesan / Rencana Proyek:*\n${formData.message}\n` +
      `-----------------------------------------\n` +
      `_Terkirim melalui Website Resmi PT. ANUGERAH JAYA PRATAMA_`
    );

    window.open(`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const openDirectWhatsApp = () => {
    const text = encodeURIComponent(
      isId
        ? 'Halo PT. Anugerah Jaya Pratama, saya ingin berkonsultasi mengenai proyek di Baleendah / Bandung.'
        : 'Hello PT. Anugerah Jaya Pratama, I would like to consult regarding a project.'
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-16 sm:space-y-24 py-8 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Header Banner */}
      <section className="bg-[#0A2342] text-white py-12 sm:py-16 rounded-2xl relative overflow-hidden px-6 sm:px-12 border-b-4 border-[#C9A961]">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#DFBA73] bg-[#C9A961]/20 px-3 py-1 rounded border border-[#C9A961]/30">
            {isId ? 'LAYANAN KONSULTASI RESMI' : 'OFFICIAL CONSULTATION DESK'}
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white mt-4 tracking-tight">
            {isId ? 'Hubungi Kami' : 'Contact Us'}
          </h1>
          <p className="mt-3 text-base text-slate-200 leading-relaxed">
            {isId
              ? 'Konsultasikan rencana lelang, kebutuhan pengadaan e-Katalog, atau pelaksanaan konstruksi Anda langsung dengan tim teknis PT. Anugerah Jaya Pratama di Baleendah, Bandung.'
              : 'Consult on tender bids, e-Catalog procurement, or construction plans directly with our engineering team in Baleendah, Bandung.'}
          </p>
        </div>
      </section>

      {/* Main Grid: Form on Left, Contact Info & Map on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <div className="mb-6">
            <h2 className="font-heading font-black text-2xl text-[#0A2342]">
              {isId ? 'Formulir Pengajuan & Kerjasama' : 'Project Proposal & Inquiry Form'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {isId
                ? 'Silakan isi formulir di bawah ini. Pesan Anda akan langsung dicatat pada database kami.'
                : 'Please complete the form below. Your message will be recorded in our database.'}
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-heading font-black text-xl text-emerald-900">
                {isId ? 'Pesan Anda Berhasil Terkirim!' : 'Your Message Was Successfully Sent!'}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
                {isId
                  ? 'Terima kasih telah menghubungi PT. Anugerah Jaya Pratama. Tim kami akan segera menindaklanjuti pesan Anda.'
                  : 'Thank you for reaching out to PT. Anugerah Jaya Pratama. Our team will review your inquiry shortly.'}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleSendViaWhatsApp}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{isId ? 'Teruskan Salinan ke WhatsApp Kami' : 'Forward Copy to WhatsApp'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      institution: '',
                      email: '',
                      phone: '',
                      need: 'konstruksi',
                      message: '',
                    });
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold transition"
                >
                  {isId ? 'Kirim Pesan Lainnya' : 'Send Another Message'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nama */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    {isId ? 'Nama Lengkap *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={isId ? 'Contoh: Dadi Firmansyah' : 'e.g. John Doe'}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2342]"
                  />
                </div>

                {/* Instansi */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    {isId ? 'Instansi / Perusahaan *' : 'Agency / Company *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    placeholder={isId ? 'Contoh: Dinas PUPR / Swasta' : 'e.g. Dept of Public Works'}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2342]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    {isId ? 'Alamat Email *' : 'Email Address *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="nama@instansi.go.id / email.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2342]"
                  />
                </div>

                {/* WhatsApp */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    {isId ? 'Nomor WhatsApp / HP *' : 'WhatsApp / Mobile Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0812xxxxxxxx / +62..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2342]"
                  />
                </div>
              </div>

              {/* Kebutuhan */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  {isId ? 'Jenis Kebutuhan / Layanan *' : 'Inquiry Category *'}
                </label>
                <select
                  value={formData.need}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      need: e.target.value as 'konstruksi' | 'pengadaan' | 'konsultan' | 'lainnya',
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0A2342]"
                >
                  <option value="konstruksi">
                    {isId ? 'Jasa Konstruksi & Bangunan (Gedung, Jalan, Jembatan)' : 'Construction & Civil Engineering'}
                  </option>
                  <option value="pengadaan">
                    {isId ? 'Pengadaan Barang & Jasa Pemerintah (e-Katalog LKPP / LPSE)' : 'Government Procurement (e-Catalog / LPSE)'}
                  </option>
                  <option value="konsultan">
                    {isId ? 'Konsultan Proyek & Manajemen Konstruksi' : 'Project Management & Consultancy'}
                  </option>
                  <option value="lainnya">
                    {isId ? 'Kebutuhan Lainnya / Kerjasama Subkontraktor' : 'Other Inquiries'}
                  </option>
                </select>
              </div>

              {/* Pesan */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  {isId ? 'Uraian Pesan / Deskripsi Kebutuhan Proyek *' : 'Message / Project Description *'}
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={
                    isId
                      ? 'Jelaskan lokasi proyek, estimasi waktu pelaksanaan, atau komoditas barang yang dibutuhkan...'
                      : 'Describe project location, estimated timeline, or requested items...'
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2342]"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#0A2342] hover:bg-[#13335A] text-white font-heading font-bold text-xs tracking-wider uppercase transition shadow flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#DFBA73]" />
                  <span>{isId ? 'Kirim Pesan Sekarang' : 'Submit Message'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSendViaWhatsApp}
                  className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#16a34a] hover:bg-[#15803d] text-white font-heading font-bold text-xs tracking-wider uppercase transition shadow flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{isId ? 'Kirim via WhatsApp' : 'Send via WhatsApp'}</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Contact Info & Map (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Direct Contact Cards */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
            <h3 className="font-heading font-black text-xl text-[#0A2342]">
              {isId ? 'Informasi Kantor & Kontak' : 'Office Information & Contact'}
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#0A2342]/10 text-[#0A2342] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-[#0A2342] font-heading font-bold">
                    {isId ? 'Alamat Kantor Operasional' : 'Operational Office Address'}
                  </strong>
                  <p className="text-slate-600 mt-0.5">{COMPANY_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-[#0A2342] font-heading font-bold">
                    {isId ? 'Telepon / WhatsApp Resmi' : 'Official WhatsApp / Tel'}
                  </strong>
                  <a
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="text-emerald-700 font-bold hover:underline block mt-0.5"
                  >
                    {COMPANY_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-[#0A2342] font-heading font-bold">
                    {isId ? 'Email Korespondensi' : 'Email Inquiries'}
                  </strong>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="text-slate-600 hover:text-[#0A2342] hover:underline block mt-0.5"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-[#0A2342] font-heading font-bold">
                    {isId ? 'Jam Operasional' : 'Office Hours'}
                  </strong>
                  <p className="text-slate-600 mt-0.5">{COMPANY_INFO.workingHours}</p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="pt-2">
              <button
                onClick={openDirectWhatsApp}
                className="w-full py-3 px-4 rounded-xl bg-[#16a34a] hover:bg-[#15803d] text-white font-heading font-bold text-xs uppercase tracking-wider transition shadow flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{isId ? 'Chat WhatsApp Langsung (+62 895-4288-96940)' : 'Direct WhatsApp Chat'}</span>
              </button>
            </div>
          </div>

          {/* Google Maps Embed Baleendah */}
          <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            <div className="p-4 bg-[#0A2342] text-white flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold">
                <MapPin className="w-4 h-4 text-[#C9A961]" />
                <span>Peta Lokasi: Baleendah, Kab. Bandung</span>
              </div>
              <span className="text-[10px] text-[#DFBA73] font-mono">Google Maps</span>
            </div>
            <div className="h-64 w-full bg-slate-200">
              <iframe
                title="Google Maps Lokasi Baleendah Kabupaten Bandung"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.278901248066!2d107.6253457!3d-6.9996783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e906c646b9a9%3A0x6b87640a45ea984c!2sBaleendah%2C%20Bandung%20Regency%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
