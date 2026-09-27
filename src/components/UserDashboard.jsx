import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Scanner } from '@yudiel/react-qr-scanner';

// 1. Interactive Background Component (Adapted for the Dashboard's hex colors)
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
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#0d110c]">
      
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
            className="absolute bg-[#BAC8B1] rounded-full"
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

export default function UserDashboard() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('Loading...');
  const [wasteType, setWasteType] = useState('organic');
  const [scannedData, setScannedData] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  
  const userData = {
    credits: "1,250",
    lifetimeCredits: "4,500",
    wasteDeposited: "45.2",
    monthlyDeposits: "12.5",
    history: [
      { day: 'Mon', kg: 2.1 }, { day: 'Tue', kg: 1.5 }, { day: 'Wed', kg: 0 },
      { day: 'Thu', kg: 3.2 }, { day: 'Fri', kg: 1.1 }, { day: 'Sat', kg: 4.5 }, { day: 'Sun', kg: 0.8 }
    ]
  };

  useEffect(() => {
    const storedId = localStorage.getItem('sabz_user_id');
    if (!storedId) {
      navigate('/login');
    } else {
      setUserId(storedId);
      
      const fetchUserProfile = async () => {
        try {
          const response = await fetch(`/api/user-profile?user_id=${storedId}`);
          if (response.ok) {
            const data = await response.json();
            setUserName(data.name || 'Citizen'); 
          } else {
            setUserName('Citizen'); 
          }
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
          setUserName('Citizen'); 
        }
      };

      fetchUserProfile();
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('sabz_user_id');
    navigate('/login');
  };

  const handleScan = (text) => {
    if (text) {
      try {
        const parsed = JSON.parse(text);
        
        let locationName = "Chiniot Municipal Zone";
        if (parsed.hub_id === "demo_hub_01") {
          locationName = "Furniture Market, Chiniot";
        }

        setScannedData({
          id: parsed.hub_id,
          location: locationName,
          weight: parsed.weight_kg || 0,
          credits: parsed.credits_earned || 0,
          type: parsed.waste_type || wasteType
        });
      } catch (e) {
        setScannedData({
          id: text.substring(0, 15), 
          location: "Unknown Location",
          weight: 0,
          credits: 0,
          type: wasteType
        });
      }
    }
  };

  const handleRecord = async () => {
    setIsRecording(true);
    
    try {
      const response = await fetch('/api/log-waste', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          hub_id: scannedData.id,
          weight_kg: scannedData.weight
        })
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        alert(`Success! ${data.weight_logged}kg recorded. You earned ${data.credits_earned} S.A.B.Z. Credits!`);
        setScannedData(null); 
      } else {
        alert(`Error: ${data.error || 'Could not log deposit.'}`);
      }
    } catch (error) {
      alert("Failed to connect to the S.A.B.Z. server. Ensure Flask is running on port 5000.");
    } finally {
      setIsRecording(false);
    }
  };

  return (
    <div className="min-h-screen lg:h-screen flex flex-col bg-transparent relative z-0 text-[#E6E6E6] font-sans lg:overflow-hidden">
      
      <InteractiveBackground />
      
      <nav className="h-16 shrink-0 bg-[#404E3B]/30 border-b border-[#6C8480]/30 px-6 flex justify-between items-center backdrop-blur-md z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#7B9669] flex items-center justify-center font-bold font-serif text-black">S</div>
          <span className="text-lg font-bold tracking-wider">S.A.B.Z</span>
        </div>
        <button onClick={handleLogout} className="text-sm font-medium text-[#BAC8B1] hover:text-white transition-colors">
          Logout
        </button>
      </nav>

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:min-h-0 lg:overflow-hidden">
        
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-6 lg:h-full lg:overflow-hidden">
          <div className="shrink-0">
            <h1 className="text-3xl font-bold mb-2">Hello, {userName} 👋</h1>
            <p className="text-[#BAC8B1] text-sm">Ready to log your green waste?</p>
          </div>

          <div className="flex-1 bg-[#404E3B]/20 border border-[#6C8480]/20 rounded-3xl p-6 flex flex-col min-h-[250px] lg:min-h-0 backdrop-blur-sm">
            <h3 className="text-sm font-bold text-[#BAC8B1] mb-6 shrink-0 uppercase tracking-wider">Weekly Deposits (kg)</h3>
            <div className="flex-1 min-h-0 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userData.history}>
                  <XAxis dataKey="day" stroke="#6C8480" tick={{fill: '#BAC8B1', fontSize: 12}} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: '#6C8480', opacity: 0.1}} contentStyle={{backgroundColor: '#1a1f18', borderColor: '#404E3B', color: '#E6E6E6'}} />
                  <Bar dataKey="kg" fill="#7B9669" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: Scanner */}
        <div className="flex flex-col gap-6 items-center lg:h-full lg:overflow-hidden">
          
          <div className="shrink-0 bg-[#1a1f18] p-1.5 rounded-full flex w-full max-w-sm border border-[#6C8480]/30 shadow-inner">
            <button 
              onClick={() => setWasteType('organic')}
              className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all ${wasteType === 'organic' ? 'bg-[#7B9669] text-black shadow-md' : 'text-[#BAC8B1] hover:text-white'}`}
            >
              Organic Scraps
            </button>
            <button 
              onClick={() => setWasteType('sawdust')}
              className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all ${wasteType === 'sawdust' ? 'bg-[#BAC8B1] text-black shadow-md' : 'text-[#BAC8B1] hover:text-white'}`}
            >
              Wood / Sawdust
            </button>
          </div>

          <div className="flex-1 w-full max-w-sm bg-gradient-to-br from-[#404E3B] to-[#2A3427] border border-[#6C8480]/40 rounded-3xl p-8 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden min-h-[350px]">
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#7B9669] rounded-full blur-3xl opacity-20"></div>
            <h2 className="text-sm font-bold text-[#E6E6E6] tracking-widest uppercase mb-6 z-10 shrink-0">
              {scannedData ? 'Scan Successful' : 'Scan Hub Receipt'}
            </h2>
            
            <div className="w-full aspect-square bg-[#1a1f18] rounded-2xl shadow-inner z-10 shrink-0 overflow-hidden border-2 border-[#7B9669]/50 relative">
              {!scannedData ? (
                <Scanner 
                  onScan={(results) => {
                    const textValue = results?.[0]?.rawValue;
                    if (textValue) handleScan(textValue);
                  }}
                  onError={(error) => console.log(error?.message)}
                  options={{ delayBetweenScanAttempts: 1000 }}
                  styles={{ container: { width: '100%', height: '100%' } }}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#7B9669]/10 p-5 text-center animate-fade-in">
                  <svg className="w-10 h-10 text-[#7B9669] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  
                  <div className="text-lg font-bold text-[#E6E6E6] mb-1">{scannedData.id.toUpperCase()}</div>
                  <div className="text-xs text-[#BAC8B1] mb-5">{scannedData.location}</div>

                  <div className="flex gap-3 w-full px-2 mb-4">
                    <div className="flex-1 bg-[#404E3B]/60 border border-[#7B9669]/30 rounded-xl py-2">
                      <div className="text-[#BAC8B1] text-[10px] uppercase font-bold tracking-wider">Deposited</div>
                      <div className="text-[#E6E6E6] font-bold text-lg">{scannedData.weight} kg</div>
                    </div>
                    <div className="flex-1 bg-[#7B9669]/20 border border-[#7B9669]/50 rounded-xl py-2">
                      <div className="text-[#7B9669] text-[10px] uppercase font-bold tracking-wider">Credits</div>
                      <div className="text-[#7B9669] font-bold text-lg">+{scannedData.credits}</div>
                    </div>
                  </div>

                  <button onClick={() => setScannedData(null)} className="text-xs font-bold text-[#BAC8B1] hover:text-white underline">Cancel & Scan Again</button>
                </div>
              )}
            </div>
            
            <p className="text-[#BAC8B1] text-xs mt-6 text-center z-10 shrink-0 px-4">
              {scannedData 
                ? "Verify the weight matches your deposit before recording." 
                : "Point your camera at the receipt QR code on the S.A.B.Z. station screen."}
            </p>
          </div>

          <button 
            onClick={handleRecord}
            disabled={!scannedData || isRecording}
            className={`shrink-0 w-full max-w-sm font-bold py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 ${
              scannedData && !isRecording 
                ? 'bg-[#7B9669] hover:bg-[#6C8480] text-[#0d110c] shadow-[#7B9669]/20' 
                : 'bg-[#404E3B] text-[#BAC8B1] cursor-not-allowed opacity-50'
            }`}
          >
            {isRecording ? (
              <span className="animate-pulse">Recording...</span>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                {scannedData ? `Record ${scannedData.weight}kg Deposit` : 'Scan QR to Record'}
              </>
            )}
          </button>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-6 lg:h-full lg:overflow-hidden">
          <div className="shrink-0 grid grid-cols-2 gap-4">
            <div className="bg-[#404E3B]/20 border border-[#6C8480]/20 p-4 rounded-2xl backdrop-blur-sm">
              <div className="text-[#BAC8B1] text-xs font-medium mb-1">Current Balance</div>
              <div className="text-xl font-bold text-[#7B9669]">{userData.credits}</div>
            </div>
            <div className="bg-[#404E3B]/20 border border-[#6C8480]/20 p-4 rounded-2xl backdrop-blur-sm">
              <div className="text-[#BAC8B1] text-xs font-medium mb-1">Lifetime Earned</div>
              <div className="text-xl font-bold text-[#7B9669]">{userData.lifetimeCredits}</div>
            </div>
            <div className="bg-[#404E3B]/20 border border-[#6C8480]/20 p-4 rounded-2xl backdrop-blur-sm">
              <div className="text-[#BAC8B1] text-xs font-medium mb-1">Monthly (kg)</div>
              <div className="text-xl font-bold text-[#E6E6E6]">{userData.monthlyDeposits}</div>
            </div>
            <div className="bg-[#404E3B]/20 border border-[#6C8480]/20 p-4 rounded-2xl backdrop-blur-sm">
              <div className="text-[#BAC8B1] text-xs font-medium mb-1">Total Waste (kg)</div>
              <div className="text-xl font-bold text-[#E6E6E6]">{userData.wasteDeposited}</div>
            </div>
          </div>

          <div className="shrink-0 bg-gradient-to-r from-[#404E3B]/30 to-transparent border-l-4 border-[#7B9669] rounded-r-2xl p-4 backdrop-blur-sm">
            <h4 className="text-[#E6E6E6] font-bold text-sm mb-2 flex items-center gap-2">
              🌿 Organic Waste Guidelines
            </h4>
            <div className="text-xs space-y-1">
              <p className="text-[#BAC8B1]"><span className="text-[#7B9669] font-bold">Allowed:</span> Fruit peels, vegetable scraps, coffee grounds, eggshells, tea bags.</p>
              <p className="text-[#6C8480]"><span className="text-red-400/80 font-bold">No:</span> Plastic, meat, dairy, oil, glass, or pet waste.</p>
            </div>
          </div>

          <div className="flex-1 border-2 border-dashed border-[#6C8480]/30 rounded-2xl flex items-center justify-center bg-[#1a1f18]/50 min-h-[150px] lg:min-h-0 relative overflow-hidden group">
              <img 
                src="/waste_2.jpg" 
                alt="Educational Content" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
          </div>
        </div>
      </main>
    </div>
  );
}