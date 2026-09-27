import React, { useState, useEffect } from 'react';

export default function InteractiveBackground() {
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
      requestAnimationFrame(() => setMousePos({ x: e.clientX, y: e.clientY }));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const parallaxX = typeof window !== 'undefined' ? (mousePos.x - window.innerWidth / 2) * -0.03 : 0;
  const parallaxY = typeof window !== 'undefined' ? (mousePos.y - window.innerHeight / 2) * -0.03 : 0;

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-black bg-gradient-to-br from-[#404E3B] via-[#121710] to-black">
      <div className="absolute inset-0 transition-opacity duration-300" style={{ background: `radial-gradient(circle 500px at ${mousePos.x}px ${mousePos.y}px, rgba(123, 150, 105, 0.12), transparent 70%)` }} />
      <div className="absolute inset-0 will-change-transform" style={{ transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0)`, transition: 'transform 0.2s ease-out' }}>
        {particles.map((p) => (
          <div key={p.id} className="absolute bg-[#BAC8B1] rounded-full" style={{ left: p.left, top: '110%', width: p.size, height: p.size, filter: 'blur(1.5px)', animation: `dustFloat ${p.duration} linear infinite`, animationDelay: p.delay, '--base-opacity': p.baseOpacity, '--x-drift': p.xDrift }} />
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
}