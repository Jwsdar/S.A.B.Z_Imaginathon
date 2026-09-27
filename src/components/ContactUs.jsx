import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import InteractiveBackground from '../components/InteractiveBackground';

export default function ContactUs() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ur' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ur' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  return (
    <div className="min-h-screen text-[#E6E6E6] font-sans relative z-0 p-6 lg:p-12">
      <InteractiveBackground />
      
      <nav className="flex justify-between items-center mb-12 drop-shadow-lg">
        <Link to="/"><img src="/Logo.jpeg" alt="S.A.B.Z" className="w-16 h-16 rounded-full shadow-[0_0_15px_rgba(123,150,105,0.4)] hover:scale-105 transition-transform" /></Link>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <button onClick={toggleLanguage} className="flex items-center space-x-2 text-xs font-bold border border-[#BAC8B1]/50 px-3 py-1.5 rounded-full hover:bg-[#BAC8B1]/20 transition-colors rtl:space-x-reverse bg-black/20 backdrop-blur-sm">
            <span>{i18n.language === 'en' ? 'اردو' : 'EN'}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
          </button>
          <Link to="/" className="text-[#BAC8B1] hover:text-white font-bold flex items-center gap-2 rtl:flex-row-reverse">
            <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            {t('pages.back')}
          </Link>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto">
        <div className="bg-[#404E3B]/20 border border-[#6C8480]/30 backdrop-blur-md p-8 lg:p-16 rounded-3xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="flex flex-col justify-center text-left rtl:text-right">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">{t('pages.contact.title')}</h1>
              <p className="text-lg text-[#BAC8B1] leading-relaxed mb-10">{t('pages.contact.desc')}</p>
              <div className="space-y-8">
                <div className="flex items-start gap-4 rtl:space-x-reverse">
                  <div className="w-12 h-12 rounded-full bg-[#7B9669]/20 flex items-center justify-center shrink-0 border border-[#7B9669]/40"><span className="text-xl">📍</span></div>
                  <div>
                    <h4 className="text-white font-bold mb-1">{t('pages.contact.hq')}</h4>
                    <p className="text-[#BAC8B1] text-sm">{t('pages.contact.hqL1')}<br/>{t('pages.contact.hqL2')}<br/>{t('pages.contact.hqL3')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rtl:space-x-reverse">
                  <div className="w-12 h-12 rounded-full bg-[#7B9669]/20 flex items-center justify-center shrink-0 border border-[#7B9669]/40"><span className="text-xl">✉️</span></div>
                  <div>
                    <h4 className="text-white font-bold mb-1">{t('pages.contact.emailTitle')}</h4>
                    <p className="text-[#BAC8B1] text-sm">hello@sabz-initiative.pk<br/>support@sabz-initiative.pk</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#1a1f18]/60 p-8 rounded-2xl border border-[#6C8480]/20 text-left rtl:text-right">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-[#BAC8B1] mb-2">{t('pages.contact.fname')}</label>
                    <input type="text" className="w-full bg-[#0d110c]/50 border border-[#6C8480]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#7B9669] transition-colors rtl:text-right" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#BAC8B1] mb-2">{t('pages.contact.lname')}</label>
                    <input type="text" className="w-full bg-[#0d110c]/50 border border-[#6C8480]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#7B9669] transition-colors rtl:text-right" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#BAC8B1] mb-2">{t('pages.contact.emailLabel')}</label>
                  <input type="email" className="w-full bg-[#0d110c]/50 border border-[#6C8480]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#7B9669] transition-colors rtl:text-right" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#BAC8B1] mb-2">{t('pages.contact.msgLabel')}</label>
                  <textarea rows="4" className="w-full bg-[#0d110c]/50 border border-[#6C8480]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#7B9669] transition-colors resize-none rtl:text-right" placeholder={t('pages.contact.msgPlaceholder')}></textarea>
                </div>
                <button type="submit" className="w-full bg-[#7B9669] text-[#0d110c] font-bold py-4 rounded-lg hover:bg-white transition-colors shadow-[0_0_15px_rgba(123,150,105,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]">
                  {t('pages.contact.submit')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}