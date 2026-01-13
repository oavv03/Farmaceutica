
import React from 'react';
import { User } from '../types';

interface LoyaltyPageProps {
  user: User | null;
}

const LoyaltyPage: React.FC<LoyaltyPageProps> = ({ user }) => {
  if (!user) {
    return (
      <div className="bg-slate-50 min-h-screen py-16 flex items-center justify-center">
        <p className="text-slate-500 font-bold uppercase tracking-widest">Inicie sesión para ver sus puntos de fidelización</p>
      </div>
    );
  }

  const nextRewardAt = 2500;
  const progress = (user.loyaltyPoints / nextRewardAt) * 100;

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Card */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-[2.5rem] p-12 text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <h1 className="text-4xl font-bold mb-2">PharmaConnect Rewards</h1>
                    <p className="text-blue-200">Su portal exclusivo de beneficios para la salud.</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 font-bold tracking-widest text-sm uppercase">
                    Membresía {user.tier}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
                  <div>
                    <span className="text-blue-300 text-sm font-bold uppercase tracking-widest">Balance actual</span>
                    <div className="text-7xl font-black mt-2">{user.loyaltyPoints} <span className="text-2xl font-normal opacity-60">pts</span></div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm font-bold">
                      <span>Próxima Recompensa</span>
                      <span>{nextRewardAt} pts</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.5)] transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                    </div>
                    <p className="text-xs text-blue-300">Faltan {Math.max(0, nextRewardAt - user.loyaltyPoints)} puntos para su cupón de descuento del 15%.</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/3"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {[
                 { label: 'Envío Gratis', val: 'Ilimitado', icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' },
                 { label: 'Soporte VIP', val: '24/7 Prioridad', icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z' },
                 { label: 'Eventos Exclusivos', val: 'Acceso Temprano', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' }
               ].map((item, i) => (
                 <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all group">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                    </div>
                    <div className="font-bold text-slate-900">{item.label}</div>
                    <div className="text-sm text-slate-500">{item.val}</div>
                 </div>
               ))}
            </div>
          </div>

          {/* Side Actions */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold mb-6">Canjear Beneficios</h3>
              <div className="space-y-4">
                <button className="w-full p-4 rounded-2xl border-2 border-slate-50 flex items-center justify-between hover:border-blue-100 hover:bg-blue-50 transition-all text-left">
                  <div>
                    <div className="font-bold text-sm">Cupón 10% Descuento</div>
                    <div className="text-xs text-slate-500">Costo: 500 pts</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                  </div>
                </button>
                <button className="w-full p-4 rounded-2xl border-2 border-slate-50 flex items-center justify-between opacity-50 cursor-not-allowed text-left">
                  <div>
                    <div className="font-bold text-sm">Cita Médica Online Gratis</div>
                    <div className="text-xs text-slate-500">Costo: 2500 pts</div>
                  </div>
                </button>
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl">
              <h3 className="text-xl font-bold mb-4">¿Cómo ganar más puntos?</h3>
              <ul className="space-y-4 text-sm text-slate-400">
                <li className="flex gap-3">
                  <span className="text-blue-500 font-bold">•</span>
                  <span><strong>+10 pts</strong> por cada compra directa.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 font-bold">•</span>
                  <span><strong>+50 pts</strong> por completar encuestas de salud.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 font-bold">•</span>
                  <span><strong>+100 pts</strong> en el mes de su cumpleaños.</span>
                </li>
              </ul>
              <button className="w-full mt-8 bg-blue-600 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all">Ver Actividades</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyPage;
