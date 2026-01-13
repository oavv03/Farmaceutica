
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="overflow-hidden bg-white">
      {/* Hero Section */}
      <section className="relative h-[800px] flex items-center bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover opacity-40 mix-blend-luminosity" alt="Health" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-10">
               <span className="w-16 h-1 bg-blue-500"></span>
               <span className="text-blue-400 font-black uppercase tracking-[0.4em] text-[10px]">GlobalPharma Connect Ecosystem</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-black leading-none mb-10 tracking-tighter italic">
              Salud <br /><span className="text-blue-600 underline decoration-blue-500/20">Directa</span>.
            </h1>
            <p className="text-xl text-slate-400 mb-14 leading-relaxed max-w-xl font-medium">
              Eliminamos intermediarios para garantizar la trazabilidad total de sus medicamentos y una interacción humana inmediata con farmacéuticos expertos.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link to="/products" className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 rounded-[1.5rem] font-black uppercase tracking-widest text-xs transition-all shadow-2xl shadow-blue-500/20 active:scale-95 border-b-4 border-blue-800">
                Iniciar Pedido Rápido
              </Link>
              <Link to="/contact" className="bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white border border-white/20 px-12 py-6 rounded-[1.5rem] font-black uppercase tracking-widest text-xs transition-all active:scale-95">
                Hablar con Soporte
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Interactivity Section */}
      <section className="py-32 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div>
                 <h2 className="text-5xl font-black text-slate-900 mb-10 tracking-tighter uppercase italic leading-none">Más que una farmacia, un socio en su <span className="text-blue-600">bienestar</span>.</h2>
                 <p className="text-slate-500 text-lg leading-relaxed mb-12 font-medium">Nuestra infraestructura multinacional garantiza que cada interacción sea segura, auditada y centrada en el paciente.</p>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {[
                      { title: 'Soporte Humano', desc: 'Acceso directo a farmacéuticos clínicos 24/7 sin colas.', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7' },
                      { title: 'PharmaPoints', desc: 'Programa de fidelización diseñado para recompensar su salud.', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2' },
                    ].map((item, i) => (
                      <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                         <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                           <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                         </div>
                         <h4 className="font-black text-slate-900 uppercase tracking-tighter text-sm mb-2">{item.title}</h4>
                         <p className="text-xs text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="relative">
                 <div className="bg-slate-900 rounded-[3rem] p-4 shadow-2xl overflow-hidden group">
                    <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800" className="rounded-[2.5rem] w-full h-[500px] object-cover opacity-80 group-hover:scale-105 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent pointer-events-none"></div>
                 </div>
                 <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[2rem] shadow-2xl border border-slate-100 max-w-[280px] animate-in slide-in-from-left duration-1000">
                    <div className="flex items-center gap-3 mb-4">
                       <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600 font-black text-xs">99%</div>
                       <h4 className="font-black text-slate-900 uppercase tracking-tighter text-xs">Satisfacción Directa</h4>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed font-bold">Protocolos validados bajo normativas de la FDA y la Agencia Europea de Medicamentos.</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Compliance Bar */}
      <section className="bg-white border-y border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-16 md:gap-32 opacity-30 grayscale hover:grayscale-0 transition-all cursor-default">
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">HIPAA Secure Data</span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">GDPR Compliant</span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Cold Chain GXP</span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">FDA/EMA Audit Logs</span>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
