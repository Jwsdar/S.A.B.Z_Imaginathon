import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  
  // State Machine: 'select', 'user', 'admin'
  const [viewMode, setViewMode] = useState('select');
  const [isSignup, setIsSignup] = useState(false);
  
  // Form Data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [empId, setEmpId] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ur' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ur' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const handleUserAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    
    const endpoint = isSignup ? '/api/signup' : '/api/login';
    
    try {
      // Changed to use the Vite proxy directly
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('sabz_user_id', data.user_id);
        navigate('/dashboard');
      } else {
        setErrorMsg(data.error || 'Authentication failed');
      }
    } catch (error) {
      setErrorMsg('Cannot connect to server. Is Flask running?');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    
    try {
      // Changed to use the Vite proxy directly
      const response = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret_key: adminKey })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('sabz_admin_key', adminKey);
        navigate('/admin');
      } else {
        setErrorMsg(data.error || 'Unauthorized: Invalid Secret Key');
      }
    } catch (error) {
      setErrorMsg('Cannot connect to server. Is Flask running?');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col-reverse lg:flex-row bg-white text-gray-900 font-sans transition-all duration-300">
      
      <div className="w-full lg:w-1/2 flex flex-col justify-between px-8 lg:px-24 py-12">
        <div className="flex justify-between items-center w-full">
          {viewMode === 'select' ? (
            <Link to="/" className="text-sm font-bold text-gray-500 hover:text-sabz-dark transition-colors flex items-center gap-2 rtl:flex-row-reverse">
              <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              <span>{i18n.language === 'en' ? 'Back' : 'واپس'}</span>
            </Link>
          ) : (
            <button onClick={() => { setViewMode('select'); setErrorMsg(''); }} className="text-sm font-bold text-gray-500 hover:text-sabz-dark transition-colors flex items-center gap-2 rtl:flex-row-reverse">
              <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              <span>{i18n.language === 'en' ? 'Back' : 'واپس'}</span>
            </button>
          )}

          <button onClick={toggleLanguage} className="flex items-center space-x-2 rtl:space-x-reverse text-xs font-bold border border-gray-200 px-3 py-1.5 rounded-full hover:bg-gray-50 transition-colors">
            <span>{i18n.language === 'en' ? 'اردو' : 'EN'}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
          </button>
        </div>

        <div className="w-full max-w-md mx-auto mt-12 lg:mt-0">
          
          {/* VIEW: ROLE SELECTION */}
          {viewMode === 'select' && (
            <div className="flex flex-col space-y-6 animate-fade-in">
              <h1 className="text-3xl font-bold text-center mb-8">{t('login.selectRole')}</h1>
              
              <button 
                onClick={() => setViewMode('user')}
                className="w-full p-8 border-2 border-gray-100 rounded-2xl hover:border-sabz-teal hover:bg-sabz-teal/5 transition-all group text-left rtl:text-right"
              >
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="w-12 h-12 rounded-full bg-sabz-mint/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-sabz-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-sabz-dark">{t('login.userPortal')}</h3>
                    <p className="text-sm text-gray-500 mt-1">Earn credits & track waste</p>
                  </div>
                </div>
              </button>

              <button 
                onClick={() => setViewMode('admin')}
                className="w-full p-8 border-2 border-gray-100 rounded-2xl hover:border-sabz-teal hover:bg-sabz-teal/5 transition-all group text-left rtl:text-right"
              >
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="w-12 h-12 rounded-full bg-sabz-mint/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-sabz-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-sabz-dark">{t('login.adminPortal')}</h3>
                    <p className="text-sm text-gray-500 mt-1">City analytics & oversight</p>
                  </div>
                </div>
              </button>
            </div>
          )}

          {/* VIEW: USER AUTHENTICATION */}
          {viewMode === 'user' && (
            <div className="animate-fade-in">
              <h1 className="text-3xl font-bold mb-3">{t('login.title')}</h1>
              <p className="text-gray-500 text-sm mb-10 leading-relaxed">{t('login.subtitle')}</p>

              {errorMsg && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">{errorMsg}</div>}

              <form onSubmit={handleUserAuth} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('login.email')}</label>
                  <input 
                    type="email" required value={email} onChange={e => setEmail(e.target.value)}
                    placeholder={t('login.emailPlaceholder')} 
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sabz-teal text-sm rtl:text-right"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('login.password')}</label>
                  <input 
                    type="password" required value={password} onChange={e => setPassword(e.target.value)}
                    placeholder={t('login.passPlaceholder')} 
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sabz-teal text-sm rtl:text-right"
                  />
                </div>
                <button disabled={isLoading} type="submit" className="w-full bg-[#1A2530] hover:bg-sabz-dark text-white font-medium py-3 rounded-lg transition-colors">
                  {isLoading ? '...' : (isSignup ? t('login.createAccount') : t('login.signin'))}
                </button>
              </form>

              <div className="text-center mt-8">
                <span className="text-gray-500 text-sm">{isSignup ? "Already have an account? " : t('login.noAccount') + " "}</span>
                <button onClick={() => {setIsSignup(!isSignup); setErrorMsg('');}} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  {isSignup ? t('login.signin') : t('login.signup')}
                </button>
              </div>
            </div>
          )}

          {/* VIEW: ADMIN AUTHENTICATION */}
          {viewMode === 'admin' && (
            <div className="animate-fade-in">
              <h1 className="text-3xl font-bold mb-3">{t('login.adminPortal')}</h1>
              <p className="text-gray-500 text-sm mb-10 leading-relaxed">Authorized municipal personnel only.</p>

              {errorMsg && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">{errorMsg}</div>}

              <form onSubmit={handleAdminAuth} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('login.empId')}</label>
                  <input 
                    type="text" required value={empId} onChange={e => setEmpId(e.target.value)}
                    placeholder="E.g. CH-992" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sabz-teal text-sm rtl:text-right"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('login.adminKey')}</label>
                  <input 
                    type="password" required value={adminKey} onChange={e => setAdminKey(e.target.value)}
                    placeholder={t('login.adminKeyPlaceholder')} 
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sabz-teal text-sm rtl:text-right"
                  />
                </div>
                <button disabled={isLoading} type="submit" className="w-full bg-sabz-teal hover:bg-sabz-primary text-white font-medium py-3 rounded-lg transition-colors">
                  {isLoading ? '...' : t('login.submitAdmin')}
                </button>
              </form>
            </div>
          )}
        </div>

        <div className="text-center mt-12 lg:mt-0 text-xs text-gray-400">
          {t('login.copyright')}
        </div>
      </div>

      <div className="w-full lg:w-1/2 h-[40vh] lg:h-auto bg-sabz-dark p-0 lg:p-6 flex items-center justify-center">
        <div className="w-full h-full lg:rounded-[2rem] overflow-hidden bg-sabz-teal relative shadow-2xl">
          <img src="/bg2.jpg" alt="S.A.B.Z Ecosystem" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-sabz-dark/20 mix-blend-multiply"></div>
        </div>
      </div>
      
    </div>
  );
}