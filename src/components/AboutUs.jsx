import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import InteractiveBackground from '../components/InteractiveBackground';

export default function AboutUs() {
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

      <main className="max-w-5xl mx-auto">
        <div className="bg-[#404E3B]/20 border border-[#6C8480]/30 backdrop-blur-md p-8 lg:p-16 rounded-3xl shadow-2xl">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 text-center">{t('pages.about.title')}</h1>
          <p className="text-lg text-[#BAC8B1] leading-relaxed mb-12 text-center max-w-3xl mx-auto">{t('pages.about.desc')}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-[#1a1f18]/40 rounded-2xl border border-[#6C8480]/10">
              <div className="w-24 h-24 bg-[#7B9669] mx-auto rounded-full mb-4 opacity-80 flex items-center justify-center font-serif text-3xl font-bold text-black">J</div>
              <h3 className="text-white font-bold text-xl">{i18n.language === 'en' ? 'Jawad Dar' : 'جواد ڈار'}</h3>
              <p className="text-[#BAC8B1] text-sm mt-2">{t('pages.about.jawad')}</p>
            </div>
            <div className="text-center p-6 bg-[#1a1f18]/40 rounded-2xl border border-[#6C8480]/10">
              <div className="w-24 h-24 bg-[#7B9669] mx-auto rounded-full mb-4 opacity-80 flex items-center justify-center font-serif text-3xl font-bold text-black">M</div>
              <h3 className="text-white font-bold text-xl">{i18n.language === 'en' ? 'Mubarra Riaz' : 'مبرا ریاض'}</h3>
              <p className="text-[#BAC8B1] text-sm mt-2">{t('pages.about.mubarra')}</p>
            </div>
            <div className="text-center p-6 bg-[#1a1f18]/40 rounded-2xl border border-[#6C8480]/10">
              <div className="w-24 h-24 bg-[#7B9669] mx-auto rounded-full mb-4 opacity-80 flex items-center justify-center font-serif text-3xl font-bold text-black">S</div>
              <h3 className="text-white font-bold text-xl">{i18n.language === 'en' ? 'Samiullah' : 'سمیع اللہ'}</h3>
              <p className="text-[#BAC8B1] text-sm mt-2">{t('pages.about.sami')}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}