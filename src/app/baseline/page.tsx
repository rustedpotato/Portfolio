import React from 'react';

export default function BaselineLanding() {
  return (
    <div className="bg-[#050505] text-white min-h-screen font-sans relative overflow-x-hidden selection:bg-amber-400/30">
      {/* Background radial glow */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none" 
        style={{ background: 'radial-gradient(600px at 0% 0%, rgba(29, 78, 216, 0.2), transparent 80%)' }}
      ></div>

      {/* Glass Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/5 px-6 py-3 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-xl font-bold tracking-tight">PRISTINE</div>
          
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-md font-medium text-white/80 hover:text-white transition-colors">Home</a>
            <a href="#" className="text-md font-medium text-white/80 hover:text-white transition-colors">About</a>
            <a href="#" className="text-md font-medium text-white/80 hover:text-white transition-colors">Contact</a>
          </div>

          <button className="px-5 py-2 rounded-full border border-amber-400/40 bg-white/5 text-[#FCD34D] font-medium transition-all duration-300 ease-out hover:scale-105 hover:border-amber-400/70 hover:shadow-[0_10px_15px_-3px_rgba(251,191,36,0.3)]">
            GET STARTED
          </button>
        </div>
      </nav>

      <main className="relative z-10 w-full">
        {/* Immersive Hero Area */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 px-4">
          <div className="text-center w-full max-w-4xl mx-auto flex flex-col items-center z-10 relative">
            <h1 className="text-5xl md:text-[72px] font-bold leading-[1.1] tracking-[-0.02em] mb-6">
              PRISTINE FRONTEND
            </h1>
            <p className="text-lg md:text-[18px] text-white/70 max-w-2xl font-normal leading-relaxed mb-10">
              A minimalist, ethereal experience prioritizing pure design geometry over visual noise. Feel the glass.
            </p>
          </div>
          
          {/* Subtle floating decorative rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-50 mix-blend-screen">
            <div className="absolute w-[600px] h-[600px] rounded-full border border-white/5 border-t-blue-500/10 animate-[spin_40s_linear_infinite]" />
            <div className="absolute w-[800px] h-[800px] rounded-full border border-white/[0.02] border-b-amber-500/10 animate-[spin_60s_linear_infinite_reverse]" />
            <div className="absolute w-[1000px] h-[1000px] rounded-full border border-white/5 animate-[spin_80s_ease-in-out_infinite]" />
          </div>
        </section>

        {/* Simple Content Deck */}
        <section className="py-24 px-6 md:px-12 w-full max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'FLUID MOTION', desc: 'Liquid transitions that breathe life into static space. Hover states that feel tactile.' },
              { title: 'GLASSMORPHIC', desc: 'Simulated depth using blur and light leaks instead of hard dropshadows and lines.' },
              { title: 'ETHERIC', desc: 'Weightless layouts hovering inside a void, anchored only by radiant neon focal points.' }
            ].map((card, idx) => (
              <div 
                key={idx} 
                className="rounded-[24px] bg-white/[0.03] border border-white/10 backdrop-blur-[16px] p-8 transition-all duration-500 hover:border-white/20 hover:bg-white/[0.06] group"
              >
                <div className="w-12 h-12 rounded-full border border-amber-400/30 bg-amber-400/10 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 delay-75">
                  <div className="w-4 h-4 bg-amber-400 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.6)]" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 tracking-tight">{card.title}</h3>
                <p className="text-white/70 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Action Stack */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-4">
        {[1, 2, 3].map((icon) => (
          <a
            key={icon}
            href="#"
            className="w-10 h-10 rounded-full bg-white/10 border border-white/20 backdrop-blur flex items-center justify-center text-white/70 transition-all duration-300 hover:text-amber-300 hover:border-amber-400/50 hover:bg-amber-400/10 hover:drop-shadow-[0_0_10px_rgba(255,215,0,0.7)] hover:-translate-y-1"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {icon === 1 && <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />}
              {icon === 2 && <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></>}
              {icon === 3 && <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />}
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}
