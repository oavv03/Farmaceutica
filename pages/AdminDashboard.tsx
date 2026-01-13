
import React, { useState } from 'react';
import { AuditLog } from '../types';

const MOCK_LOGS: AuditLog[] = [
  { id: '1', timestamp: '2025-01-20 09:45:12', action: 'Acceso a Expediente Médico Supabase #u_123', user: 'Farmacéutico #22', status: 'Success' },
  { id: '2', timestamp: '2025-01-20 10:02:44', action: 'Validación de Receta en Tiempo Real', user: 'Farmacia Nodo 1', status: 'Success' },
  { id: '3', timestamp: '2025-01-20 10:15:00', action: 'Intento de Acceso No Autorizado Bloqueado por RLS', user: 'Supabase Auth Watchdog', status: 'Alert' },
];

const AdminDashboard: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16">
           <div className="mb-8 md:mb-0">
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Panel de Control Global</h1>
              <p className="text-slate-500 font-medium">Gestión de cumplimiento GXP sincronizada con Supabase Cloud.</p>
           </div>
           <div className="flex gap-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                 <div className="text-right">
                    <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Infraestructura</span>
                    <span className="text-xs font-black text-green-600 uppercase">Supabase Realtime Activo</span>
                 </div>
                 <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
           <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-4 block">Pedidos en Nube</span>
              <div className="text-5xl font-black text-slate-900 tracking-tighter mb-2">24</div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Sincronizados vía Supabase DB</p>
           </div>
           <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
              <span className="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em] mb-4 block">Validaciones de Receta</span>
              <div className="text-5xl font-black text-slate-900 tracking-tighter mb-2">08</div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Pendientes de Firma Digital</p>
           </div>
           <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl">
              <span className="text-[10px] text-blue-400 font-black uppercase tracking-[0.2em] mb-4 block">Seguridad RLS</span>
              <div className="text-5xl font-black tracking-tighter mb-2">100%</div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Aislamiento de Datos por Usuario</p>
           </div>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
           <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-xl font-black text-slate-900 tracking-tighter uppercase">Logs de Auditoría Centralizada</h2>
              <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Exportar Reporte Compliance</button>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Timestamp (UTC)</th>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Evento de Base de Datos</th>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID Responsable</th>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-medium">
                  {MOCK_LOGS.map(log => (
                    <tr key={log.id} className="hover:bg-slate-50/50 transition-all">
                      <td className="px-8 py-5 text-xs text-slate-500 font-mono">{log.timestamp}</td>
                      <td className="px-8 py-5 text-sm font-bold text-slate-900">{log.action}</td>
                      <td className="px-8 py-5 text-xs text-slate-500 font-black uppercase tracking-widest">{log.user}</td>
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                          log.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
