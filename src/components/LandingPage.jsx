import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// 1. Interactive Background Component (Now set to -z-10 to avoid layout interference)
const InteractiveBackground = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      size: `${Math.random() * 4 + 1}px`,
      duration: `${Math.random() * 20 + 15}s`, 
      delay: `-${Math.random() * 30}s`, 
      baseOpacity: Math.random() * 0.3 + 0.1, 
      xDrift: `${(Math.random() - 0.5) * 50}px` 
    }));
    setParticles(newParticles);

    const handleMouseMove = (e) => {
      requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const parallaxX = typeof window !== 'undefined' ? (mousePos.x - window.innerWidth / 2) * -0.03 : 0;
  const parallaxY = typeof window !== 'undefined' ? (mousePos.y - window.innerHeight / 2) * -0.03 : 0;

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-sabz-dark">
      
      {/* Interactive Cursor Spotlight */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 500px at ${mousePos.x}px ${mousePos.y}px, rgba(123, 150, 105, 0.12), transparent 70%)`
        }}
      />

      {/* Parallax Particle Layer */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0)`,
          transition: 'transform 0.2s ease-out'
        }}
      >
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute bg-sabz-mint rounded-full"
            style={{
              left: p.left,
              top: '110%',
              width: p.size,
              height: p.size,
              filter: 'blur(1.5px)',
              animation: `dustFloat ${p.duration} linear infinite`,
              animationDelay: p.delay,
              '--base-opacity': p.baseOpacity,
              '--x-drift': p.xDrift
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes dustFloat {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: var(--base-opacity); }
          90% { opacity: var(--base-opacity); }
          100% { transform: translateY(-120vh) translateX(var(--x-drift)); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default function LandingPage() {
  const { t, i18n } = useTranslation();
  const [activeSection, setActiveSection] = useState('start');

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ur' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ur' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            entry.target.classList.remove('opacity-0', 'translate-y-12');
            entry.target.classList.add('opacity-100', 'translate-y-0');
          } else {
            entry.target.classList.remove('opacity-100', 'translate-y-0');
            entry.target.classList.add('opacity-0', 'translate-y-12');
          }
        });
      },
      { threshold: 0.25 }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { id: 'start', label: t('Start') },
    { id: '01', label: '01' },
    { id: '02', label: '02' },
    { id: '03', label: '03' }
  ];

  return (
    <div className="text-sabz-light min-h-screen font-sans overflow-x-hidden transition-all duration-300 relative bg-transparent">
      
      {/* 2. Background Component */}
      <InteractiveBackground />

      {/* Navbar */}
      <nav className="absolute top-0 w-full flex justify-between items-center px-6 lg:px-12 py-8 z-50 drop-shadow-lg text-white">
        <div className="text-2xl font-bold font-serif tracking-wider">S.A.B.Z</div>
        
        <div className="hidden md:flex space-x-8 text-sm font-bold rtl:space-x-reverse">
          <button onClick={() => scrollToSection('01')} className="hover:text-sabz-mint transition-colors drop-shadow-md">{t('nav.works')}</button>
          <button onClick={() => scrollToSection('02')} className="hover:text-sabz-mint transition-colors drop-shadow-md">{t('nav.impact')}</button>
          <button onClick={() => scrollToSection('03')} className="hover:text-sabz-mint transition-colors drop-shadow-md">{t('nav.rewards')}</button>
        </div>

        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <button 
            onClick={toggleLanguage} 
            className="flex items-center space-x-2 text-xs font-bold border border-sabz-mint/50 px-3 py-1.5 rounded-full hover:bg-sabz-mint/20 transition-colors rtl:space-x-reverse bg-black/20 backdrop-blur-sm"
          >
            <span>{i18n.language === 'en' ? 'اردو' : 'EN'}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
          </button>

          <a href="/login" className="flex items-center space-x-2 hover:text-sabz-mint transition-colors rtl:space-x-reverse drop-shadow-md font-bold">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="hidden md:inline">{t('nav.account')}</span>
          </a>
        </div>
      </nav>

      {/* Right Side Vertical Navigation */}
      <div className="hidden lg:flex fixed right-8 rtl:right-auto rtl:left-8 top-1/3 flex-col items-end space-y-6 z-40 text-sm font-bold text-sabz-light/50 drop-shadow-lg">
        {navItems.map((item) => (
          <div 
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`flex items-center space-x-4 rtl:space-x-reverse cursor-pointer transition-colors duration-500 ${
              activeSection === item.id ? 'text-white drop-shadow-md' : 'hover:text-white'
            }`}
          >
            <span>{item.label}</span>
            <div className={`w-0.5 h-12 transition-colors duration-500 ${
              activeSection === item.id ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'bg-sabz-light/30'
            }`}></div>
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <section id="start" className="opacity-0 translate-y-12 transition-all duration-1000 ease-out relative h-screen flex items-center px-6 lg:px-32">
        <div 
          className="absolute inset-0 bg-sabz-teal/40 bg-cover bg-center -z-10" 
          style={{ 
            backgroundImage: 'url("/bg3.jpg")',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)'
          }}
        >
          {/* Darkened the top of the gradient from sabz-dark/20 to black/70 */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-sabz-dark/40 to-sabz-dark/80"></div>
        </div>
        <div className="max-w-4xl pt-20 drop-shadow-lg">
          <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6">
            <div className="w-16 h-0.5 bg-sabz-primary shadow-[0_0_5px_rgba(123,150,105,0.8)]"></div>
            <span className="text-sabz-primary font-bold tracking-widest uppercase text-xs lg:text-sm drop-shadow-md">{t('hero.subtitle')}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-8 whitespace-pre-line text-white drop-shadow-xl">
            {t('hero.title')}
          </h1>
          <div onClick={() => scrollToSection('01')} className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer text-sm font-bold group w-max text-white drop-shadow-md">
            <span>{t('hero.scroll')}</span>
            <svg className="w-5 h-5 group-hover:translate-y-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Section 01 */}
      <section id="01" className="opacity-0 translate-y-12 transition-all duration-1000 ease-out py-16 lg:py-24 px-6 lg:px-32 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
        <div className="lg:w-1/2 relative w-full">
          <div className="hidden lg:block absolute -top-24 -left-16 rtl:-right-16 text-[15rem] font-bold text-white/5 -z-10 leading-none">01</div>
          <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6">
            <div className="w-16 h-0.5 bg-sabz-primary"></div>
            <span className="text-sabz-primary font-bold tracking-widest uppercase text-xs lg:text-sm">{t('s1.subtitle')}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight whitespace-pre-line">{t('s1.title')}</h2>
          <p className="text-sabz-mint/80 mb-8 leading-relaxed text-base md:text-lg">
            {t('s1.desc')}
          </p>
          <a href="/login" className="flex items-center space-x-2 rtl:space-x-reverse text-sabz-primary hover:text-sabz-mint transition-colors group w-max font-bold">
            <span>{t('s1.btn')}</span>
            <svg className="w-5 h-5 rtl:rotate-180 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
        <div className="w-full h-80 lg:w-[400px] lg:h-[550px] flex-shrink-0 bg-sabz-teal/30 border border-sabz-primary/30 shadow-2xl shadow-black/80 rounded-3xl bg-cover bg-center" style={{ backgroundImage: 'url("/waste_1.jpg")' }}>
        </div>
      </section>

      {/* Section 02 */}
      <section id="02" className="opacity-0 translate-y-12 transition-all duration-1000 ease-out py-16 lg:py-24 px-6 lg:px-32 flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-16">
        <div className="w-full h-80 lg:w-[400px] lg:h-[550px] flex-shrink-0 bg-sabz-teal/30 border border-sabz-primary/30 shadow-2xl shadow-black/80 rounded-3xl bg-cover bg-center" style={{ backgroundImage: 'url("/saw_dust_2.jpg")' }}>
        </div>
        <div className="lg:w-1/2 relative lg:pl-10 rtl:pr-10 w-full">
          <div className="hidden lg:block absolute -top-24 -left-6 rtl:-right-6 text-[15rem] font-bold text-white/5 -z-10 leading-none">02</div>
          <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6">
            <div className="w-16 h-0.5 bg-sabz-primary"></div>
            <span className="text-sabz-primary font-bold tracking-widest uppercase text-xs lg:text-sm">{t('s2.subtitle')}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight whitespace-pre-line">{t('s2.title')}</h2>
          <p className="text-sabz-mint/80 mb-8 leading-relaxed text-base md:text-lg">
            {t('s2.desc')}
          </p>
          <button onClick={() => scrollToSection('03')} className="flex items-center space-x-2 rtl:space-x-reverse text-sabz-primary hover:text-sabz-mint transition-colors group font-bold">
            <span>{t('s1.btn')}</span>
            <svg className="w-5 h-5 rtl:rotate-180 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </section>

      {/* Section 03 */}
      <section id="03" className="opacity-0 translate-y-12 transition-all duration-1000 ease-out py-16 lg:py-24 px-6 lg:px-32 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
        <div className="lg:w-1/2 relative w-full">
          <div className="hidden lg:block absolute -top-24 -left-16 rtl:-right-16 text-[15rem] font-bold text-white/5 -z-10 leading-none">03</div>
          <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6">
            <div className="w-16 h-0.5 bg-sabz-primary"></div>
            <span className="text-sabz-primary font-bold tracking-widest uppercase text-xs lg:text-sm">{t('s3.subtitle')}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight whitespace-pre-line">{t('s3.title')}</h2>
          <p className="text-sabz-mint/80 mb-8 leading-relaxed text-base md:text-lg">
            {t('s3.desc')}
          </p>
          <a href="/login" className="flex items-center space-x-2 rtl:space-x-reverse text-sabz-primary hover:text-sabz-mint transition-colors group w-max font-bold">
            <span>{t('s1.btn')}</span>
            <svg className="w-5 h-5 rtl:rotate-180 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
        <div className="w-full h-80 lg:w-[400px] lg:h-[550px] flex-shrink-0 bg-sabz-teal/30 border border-sabz-primary/30 shadow-2xl shadow-black/80 rounded-3xl bg-cover bg-center" style={{ backgroundImage: 'url("/image3.jpg")' }}>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 lg:px-32 py-16 border-t border-sabz-teal/30 mt-10 lg:mt-20 flex flex-col md:flex-row justify-between gap-12">
        <div className="mb-10 md:mb-0 max-w-sm">
          <div className="text-2xl font-bold font-serif tracking-wider mb-4">S.A.B.Z</div>
          <p className="text-sabz-mint/80 mb-12 text-sm md:text-base">{t('footer.slogan')}</p>
          <p className="text-sabz-mint/50 text-xs md:text-sm">{t('footer.copyright')}</p>
        </div>
        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-20 rtl:space-x-reverse">
          <div className="flex flex-col space-y-4">
            <h4 className="text-sabz-primary font-bold mb-2 text-sm md:text-base">{t('footer.more')}</h4>
            <a href="#" className="text-sabz-mint/80 hover:text-sabz-light text-sm">{t('footer.links.about')}</a>
            <a href="#" className="text-sabz-mint/80 hover:text-sabz-light text-sm">{t('footer.links.impact')}</a>
            <a href="#" className="text-sabz-mint/80 hover:text-sabz-light text-sm">{t('footer.links.contact')}</a>
          </div>
          <div className="flex flex-col space-y-4">
            <h4 className="text-sabz-primary font-bold mb-2 text-sm md:text-base">{t('footer.partners')}</h4>
            <a href="#" className="text-sabz-mint/80 hover:text-sabz-light text-sm">{t('footer.links.muni')}</a>
            <a href="#" className="text-sabz-mint/80 hover:text-sabz-light text-sm">{t('footer.links.union')}</a>
            <a href="#" className="text-sabz-mint/80 hover:text-sabz-light text-sm">{t('footer.links.press')}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}