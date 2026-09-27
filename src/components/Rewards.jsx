import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import InteractiveBackground from '../components/InteractiveBackground';

export default function Rewards() {
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
        <div className="bg-[#404E3B]/20 border border-[#6C8480]/30 backdrop-blur-md p-8 lg:p-16 rounded-3xl shadow-2xl text-center">
          <div className="w-20 h-20 bg-[#7B9669]/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#7B9669]">
            <span className="text-3xl">🪙</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">{t('pages.rewards.title')}</h1>
          <p className="text-lg text-[#BAC8B1] leading-relaxed max-w-3xl mx-auto mb-12">{t('pages.rewards.desc')}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left rtl:text-right">
            <div className="bg-[#1a1f18]/60 p-6 rounded-2xl border border-[#6C8480]/20">
              <h3 className="text-white font-bold text-xl mb-3">{t('pages.rewards.r1Title')}</h3>
              <p className="text-[#BAC8B1] text-sm">{t('pages.rewards.r1Desc')}</p>
            </div>
            <div className="bg-[#1a1f18]/60 p-6 rounded-2xl border border-[#6C8480]/20">
              <h3 className="text-white font-bold text-xl mb-3">{t('pages.rewards.r2Title')}</h3>
              <p className="text-[#BAC8B1] text-sm">{t('pages.rewards.r2Desc')}</p>
            </div>
            <div className="bg-[#1a1f18]/60 p-6 rounded-2xl border border-[#6C8480]/20">
              <h3 className="text-white font-bold text-xl mb-3">{t('pages.rewards.r3Title')}</h3>
              <p className="text-[#BAC8B1] text-sm">{t('pages.rewards.r3Desc')}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}