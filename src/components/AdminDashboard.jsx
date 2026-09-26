import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

// 1. Interactive Background Component (Styled with the Admin Dashboard's gradient)
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
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-black bg-gradient-to-br from-[#404E3B] via-[#121710] to-black">
      
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

// --- Dummy Data ---
const OVERALL_STATS = {
  name: "Chiniot City Overview",
  waste: "124.5K", wasteTrend: "+14.2%",
  fertilizer: "45.2K", fertTrend: "+8.4%",
  credits: "340.2K", credTrend: "+22.1%",
  redeemed: "215.8K", redTrend: "+12.5%",
  chartData: [
    { month: 'Jan', organic: 120, sawdust: 80 },
    { month: 'Feb', organic: 132, sawdust: 90 },
    { month: 'Mar', organic: 101, sawdust: 75 },
    { month: 'Apr', organic: 150, sawdust: 110 },
    { month: 'May', organic: 190, sawdust: 140 },
    { month: 'Jun', organic: 220, sawdust: 160 },
    { month: 'Jul', organic: 210, sawdust: 155 },
  ],
  barData: [
    { time: '12 AM', value: 10 }, { time: '4 AM', value: 5 }, 
    { time: '8 AM', value: 45 }, { time: '12 PM', value: 80 }, 
    { time: '4 PM', value: 65 }, { time: '8 PM', value: 30 }
  ]
};

const HUB_LOCATIONS = [
  {
    id: 1,
    name: "Furniture Market Hub",
    position: [31.7180, 72.9800],
    stats: {
      name: "Furniture Market Hub",
      waste: "42.1K", wasteTrend: "+24.5%",
      fertilizer: "18.3K", fertTrend: "+15.2%",
      credits: "110.5K", credTrend: "+28.4%",
      redeemed: "75.2K", redTrend: "+18.1%",
      chartData: [
        { month: 'Jan', organic: 40, sawdust: 60 },
        { month: 'Feb', organic: 45, sawdust: 65 },
        { month: 'Mar', organic: 35, sawdust: 50 },
        { month: 'Apr', organic: 55, sawdust: 80 },
        { month: 'May', organic: 70, sawdust: 100 },
        { month: 'Jun', organic: 85, sawdust: 120 },
        { month: 'Jul', organic: 80, sawdust: 115 },
      ],
      barData: [
        { time: '12 AM', value: 2 }, { time: '4 AM', value: 1 }, 
        { time: '8 AM', value: 20 }, { time: '12 PM', value: 40 }, 
        { time: '4 PM', value: 35 }, { time: '8 PM', value: 10 }
      ]
    }
  },
  {
    id: 2,
    name: "Main Bazaar Hub",
    position: [31.7250, 72.9750],
    stats: {
      name: "Main Bazaar Hub",
      waste: "82.4K", wasteTrend: "+9.5%",
      fertilizer: "26.9K", fertTrend: "+4.1%",
      credits: "229.7K", credTrend: "+18.9%",
      redeemed: "140.6K", redTrend: "+9.8%",
      chartData: [
        { month: 'Jan', organic: 80, sawdust: 20 },
        { month: 'Feb', organic: 87, sawdust: 25 },
        { month: 'Mar', organic: 66, sawdust: 25 },
        { month: 'Apr', organic: 95, sawdust: 30 },
        { month: 'May', organic: 120, sawdust: 40 },
        { month: 'Jun', organic: 135, sawdust: 40 },
        { month: 'Jul', organic: 130, sawdust: 40 },
      ],
      barData: [
        { time: '12 AM', value: 8 }, { time: '4 AM', value: 4 }, 
        { time: '8 AM', value: 25 }, { time: '12 PM', value: 40 }, 
        { time: '4 PM', value: 30 }, { time: '8 PM', value: 20 }
      ]
    }
  }
];

export default function AdminDashboard() {
  const [activeData, setActiveData] = useState(OVERALL_STATS);

  // SVG Icons
  const IconHome = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>;
  const IconChart = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>;
  const IconUsers = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>;

  return (
    <div className="flex h-screen relative z-0 bg-transparent text-[#E6E6E6] font-sans overflow-hidden">
      
      {/* 2. Render Background */}
      <InteractiveBackground />

      {/* Sidebar - Added backdrop-blur-md for glass effect */}
      <aside className="w-64 border-r border-sabz-teal/30 flex flex-col justify-between p-6 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-3 mb-12">
            <div className="w-8 h-8 rounded-lg bg-sabz-primary flex items-center justify-center font-bold font-serif text-sabz-dark">S</div>
            <span className="text-xl font-bold tracking-wider">S.A.B.Z Admin</span>
          </div>
          
          <nav className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-sabz-teal/20 text-sabz-primary rounded-xl font-medium">
              <IconHome /> Dashboard
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sabz-mint/70 hover:text-sabz-light hover:bg-sabz-teal/10 rounded-xl transition-colors">
              <IconChart /> Hub Reports
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sabz-mint/70 hover:text-sabz-light hover:bg-sabz-teal/10 rounded-xl transition-colors">
              <IconUsers /> Users
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-3 border-t border-sabz-teal/30 pt-6">
          <div className="w-10 h-10 rounded-full bg-sabz-mint/20 flex items-center justify-center">
            <span className="text-sabz-primary font-bold">AJ</span>
          </div>
          <div>
            <div className="text-sm font-bold">Admin Jawad</div>
            <div className="text-xs text-sabz-mint/50">Municipal Officer</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto z-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">{activeData.name}</h1>
            <p className="text-sabz-mint/70 text-sm">Measure waste collection and green credit distribution.</p>
          </div>
          {activeData.name !== "Chiniot City Overview" && (
            <button 
              onClick={() => setActiveData(OVERALL_STATS)}
              className="px-4 py-2 bg-sabz-teal hover:bg-sabz-teal/80 rounded-lg text-sm font-medium transition-colors border border-sabz-mint/20"
            >
              Reset to City View
            </button>
          )}
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <MetricCard title="Waste Collected (kg)" value={activeData.waste} trend={activeData.wasteTrend} />
          <MetricCard title="Fertilizer Produced (kg)" value={activeData.fertilizer} trend={activeData.fertTrend} />
          <MetricCard title="Credits Issued" value={activeData.credits} trend={activeData.credTrend} />
          <MetricCard title="Credits Redeemed" value={activeData.redeemed} trend={activeData.redTrend} />
        </div>

        {/* Mixed Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Chart Area (Spans 2 columns) */}
          <div className="lg:col-span-2 bg-sabz-teal/10 border border-sabz-teal/30 rounded-2xl p-6 flex flex-col backdrop-blur-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold">Composting Progress</h3>
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-sabz-primary"></div> Household Organic</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-sabz-mint"></div> Sawdust Input</div>
              </div>
            </div>
            <div className="flex-1 min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activeData.chartData}>
                  <defs>
                    <linearGradient id="colorOrg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7B9669" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#7B9669" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorSaw" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#BAC8B1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#BAC8B1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#6C8480" tick={{fill: '#BAC8B1'}} />
                  <YAxis stroke="#6C8480" tick={{fill: '#BAC8B1'}} />
                  <Tooltip contentStyle={{backgroundColor: '#404E3B', borderColor: '#6C8480', color: '#E6E6E6'}} />
                  <Area type="monotone" dataKey="organic" stroke="#7B9669" strokeWidth={3} fillOpacity={1} fill="url(#colorOrg)" />
                  <Area type="monotone" dataKey="sawdust" stroke="#BAC8B1" strokeWidth={3} fillOpacity={1} fill="url(#colorSaw)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Side Stacked Panels */}
          <div className="flex flex-col gap-6">
            
            {/* Chiniot Map */}
            <div className="bg-sabz-teal/10 border border-sabz-teal/30 rounded-2xl p-6 h-[250px] flex flex-col backdrop-blur-sm">
              <h3 className="font-bold mb-4">Hub Locations</h3>
              <div className="flex-1 rounded-xl overflow-hidden border border-sabz-teal/50 z-0">
                <MapContainer center={[31.7220, 72.9770]} zoom={14} style={{ height: '100%', width: '100%' }}>
                  <TileLayer 
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                    attribution='&copy; OpenStreetMap'
                    className="dark-map-tiles"
                  />
                  {HUB_LOCATIONS.map((hub) => (
                    <Marker 
                      key={hub.id} 
                      position={hub.position}
                      eventHandlers={{ click: () => setActiveData(hub.stats) }}
                    >
                      <Popup className="text-sabz-dark font-bold">{hub.name}</Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>

            {/* Collection Activity Bar Chart */}
            <div className="bg-sabz-teal/10 border border-sabz-teal/30 rounded-2xl p-6 h-[250px] flex flex-col backdrop-blur-sm">
              <h3 className="font-bold mb-4">Daily Collection Activity</h3>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activeData.barData}>
                    <XAxis dataKey="time" stroke="#6C8480" tick={{fill: '#BAC8B1', fontSize: 12}} />
                    <Tooltip cursor={{fill: '#6C8480', opacity: 0.2}} contentStyle={{backgroundColor: '#404E3B', borderColor: '#6C8480'}} />
                    <Bar dataKey="value" fill="#7B9669" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

// Reusable Sub-Component for Metric Cards
function MetricCard({ title, value, trend }) {
  return (
    <div className="bg-sabz-teal/10 border border-sabz-teal/30 p-5 rounded-2xl flex flex-col justify-between backdrop-blur-sm">
      <div className="text-sabz-mint/70 text-sm font-medium mb-2">{title}</div>
      <div className="flex items-end gap-3">
        <div className="text-3xl font-bold">{value}</div>
        <div className="text-sabz-primary text-sm font-bold mb-1 bg-sabz-primary/10 px-2 py-0.5 rounded text-[10px]">
          {trend}
        </div>
      </div>
    </div>
  );
}