import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import InteractiveBackground from '../components/InteractiveBackground';

export default function CompostingProcess() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ur' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ur' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const steps = [
    { number: "01", title: t('pages.process.s1Title'), desc: t('pages.process.s1Desc') },
    { number: "02", title: t('pages.process.s2Title'), desc: t('pages.process.s2Desc') },
    { number: "03", title: t('pages.process.s3Title'), desc: t('pages.process.s3Desc') },
    { number: "04", title: t('pages.process.s4Title'), desc: t('pages.process.s4Desc') },
    { number: "05", title: t('pages.process.s5Title'), desc: t('pages.process.s5Desc') }
  ];

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
        <div className="bg-[#404E3B]/20 border border-[#6C8480]/30 backdrop-blur-md p-8 lg:p-16 rounded-3xl shadow-2xl mb-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">{t('pages.process.title')}</h1>
            <p className="text-lg text-[#BAC8B1] leading-relaxed max-w-3xl mx-auto">{t('pages.process.desc')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="bg-[#1a1f18]/60 p-8 rounded-2xl border border-[#6C8480]/20 hover:border-[#7B9669]/50 transition-colors group relative overflow-hidden text-left rtl:text-right">
                <div className="text-6xl font-black text-white/5 absolute -top-4 rtl:left-2 rtl:right-auto right-2 transition-transform group-hover:scale-110">{step.number}</div>
                <div className="text-[#7B9669] font-bold text-xl mb-4 relative z-10">{step.number}. {step.title}</div>
                <p className="text-[#BAC8B1] text-sm leading-relaxed relative z-10">{step.desc}</p>
              </div>
            ))}
            <div className="bg-gradient-to-br from-[#7B9669]/20 to-[#404E3B]/40 p-8 rounded-2xl border border-[#7B9669]/40 flex flex-col justify-center items-center text-center transition-all hover:shadow-[0_0_20px_rgba(123,150,105,0.2)]">
              <h3 className="text-white font-bold text-xl mb-2">{t('pages.process.ctaTitle')}</h3>
              <p className="text-[#BAC8B1] text-sm mb-6">{t('pages.process.ctaDesc')}</p>
              <Link to="/login" className="px-6 py-2 bg-[#7B9669] text-[#0d110c] font-bold rounded-full hover:bg-white transition-colors">{t('pages.process.ctaBtn')}</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}