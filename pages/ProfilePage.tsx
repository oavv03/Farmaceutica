
import React, { useState } from 'react';
import { User, Order } from '../types';

interface ProfilePageProps {
  user: User;
  orders: Order[];
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, orders }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const url = window.location.origin;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* User Info & Medical Record */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm text-center relative overflow-hidden">
              <div className="w-24 h-24 rounded-full bg-slate-100 mx-auto mb-6 border-4 border-blue-50 overflow-hidden shadow-inner">
                 <img src={`https://i.pravatar.cc/200?u=${user.id}`} alt="Profile" />
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tighter mb-1">{user.name}</h1>
              <p className="text-slate-400 text-sm font-medium mb-6">{user.email}</p>
              
              <div className="flex flex-col gap-3 items-center">
                <div className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] inline-block shadow-lg shadow-blue-100">
                  {user.tier} Member
                </div>
                
                <button 
                  onClick={handleShare}
                  className={`mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${copied ? 'text-green-600' : 'text-slate-400 hover:text-blue-600'}`}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  {copied ? '¡Enlace Copiado!' : 'Compartir este Portal'}
                </button>
              </div>
            </div>

            <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
              <h2 className="text-xl font-black mb-8 uppercase tracking-widest italic">Expediente Médico</h2>
              <div className="space-y-6 relative z-10">
                <div>
                  <span className="text-[10px] text-blue-400 font-black uppercase tracking-widest block mb-2">Alergias</span>
                  <div className="flex flex-wrap gap-2">
                    {user.medicalRecord.allergies.length > 0 ? user.medicalRecord.allergies.map(a => (
                      <span key={a} className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-bold border border-red-500/30">{a}</span>
                    )) : <span className="text-slate-500 text-xs italic font-medium">No registradas</span>}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-blue-400 font-black uppercase tracking-widest block mb-2">Condiciones Crónicas</span>
                  <div className="flex flex-wrap gap-2">
                    {user.medicalRecord.chronicConditions.length > 0 ? user.medicalRecord.chronicConditions.map(c => (
                      <span key={c} className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-bold border border-blue-500/30">{c}</span>
                    )) : <span className="text-slate-500 text-xs italic font-medium">Ninguna detectada</span>}
                  </div>
                </div>
                <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Última Revisión</div>
                  <div className="font-black text-sm">{user.medicalRecord.lastCheckup}</div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-[80px] opacity-20"></div>
            </div>
          </div>

          {/* History & Interactions */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Historial de Pedidos Directos</h2>
                <div className="text-[10px] font-black text-blue-600 bg-blue-50 px-4 py-2 rounded-xl uppercase tracking-widest">GXP Certified Flow</div>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No hay pedidos registrados en Supabase</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map(order => (
                    <div key={order.id} className="group bg-white p-6 rounded-[2rem] border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all duration-500 flex items-center justify-between gap-6">
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 font-black text-xs">
                          #ORD
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-black text-slate-900 tracking-tighter">Pedido {order.id}</h3>
                            <span className="bg-green-100 text-green-700 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{order.status}</span>
                          </div>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{order.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="block text-lg font-black text-slate-900">${order.total.toFixed(2)}</span>
                        <button className="text-[9px] font-black text-blue-600 uppercase tracking-widest hover:underline">Ver Detalles</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
               <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase mb-8">Notificaciones de Salud</h2>
               <div className="space-y-4">
                  <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 flex items-center gap-6">
                    <div className="w-12 h-12 bg-amber-200 rounded-2xl flex items-center justify-center text-amber-700">
                       <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    </div>
                    <div>
                      <h4 className="font-black text-amber-900 uppercase text-xs tracking-widest mb-1">Recordatorio de Tratamiento</h4>
                      <p className="text-xs text-amber-800 leading-relaxed font-medium">Su conexión con Supabase Cloud está activa. Ahora sus datos se sincronizan globalmente.</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
