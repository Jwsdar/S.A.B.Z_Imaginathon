import React from 'react';
import { Link } from 'react-router-dom';
import InteractiveBackground from '../components/InteractiveBackground';

export default function ChiniotSynergy() {
  return (
    <div className="min-h-screen text-[#E6E6E6] font-sans relative z-0 p-6 lg:p-12">
      <InteractiveBackground />
      
      <nav className="flex justify-between items-center mb-12 drop-shadow-lg">
        <Link to="/"><img src="/Logo.jpeg" alt="S.A.B.Z" className="w-16 h-16 rounded-full shadow-[0_0_15px_rgba(123,150,105,0.4)] hover:scale-105 transition-transform" /></Link>
        <Link to="/" className="text-[#BAC8B1] hover:text-white font-bold flex items-center gap-2">← Back to Home</Link>
      </nav>

      <main className="max-w-5xl mx-auto">
        <div className="bg-[#404E3B]/20 border border-[#6C8480]/30 backdrop-blur-md p-8 lg:p-16 rounded-3xl shadow-2xl mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">The Chiniot Sawdust Connection</h1>
          <p className="text-lg text-[#BAC8B1] leading-relaxed mb-8">
            Chiniot is world-renowned for its intricate wooden furniture architecture. For centuries, the city's artisans have crafted masterpieces, but this industry produces massive quantities of waste sawdust. S.A.B.Z. partners with local carpenters to divert this waste from landfills. When carbon-rich sawdust is combined with nitrogen-rich household organic waste in our bio-hubs, it creates the perfect chemical ratio for accelerated, high-yield composting.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {/* Image 1 Container */}
            <div className="h-64 bg-[#1a1f18]/50 border-2 border-[#6C8480]/30 rounded-2xl relative group overflow-hidden">
              <img 
                src="/landmark1.jpg" 
                alt="Chiniot Woodwork" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
            </div>
            
            {/* Image 2 Container */}
            <div className="h-64 bg-[#1a1f18]/50 border-2 border-[#6C8480]/30 rounded-2xl relative group overflow-hidden">
              <img 
                src="/wwork.jpg" 
                alt="Chiniot Architecture" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}