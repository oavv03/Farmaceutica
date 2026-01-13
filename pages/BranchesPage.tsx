
import React, { useState } from 'react';
import { Branch } from '../types';

const BRANCHES: Branch[] = [
  { id: '1', name: 'Centro Clínico Norte', address: 'Av. Libertador 4500, Madrid', lat: 40.4168, lng: -3.7038, phone: '+34 912 345 678', isOpen: true },
  { id: '2', name: 'PharmaPoint Sur', address: 'C/ Mayor 12, Sevilla', lat: 37.3891, lng: -5.9845, phone: '+34 954 123 456', isOpen: true },
  { id: '3', name: 'Sede Médica Barcelona', address: 'Av. Diagonal 90, Barcelona', lat: 41.3851, lng: 2.1734, phone: '+34 932 987 654', isOpen: false },
  { id: '4', name: 'Laboratorios Valencia', address: 'C/ Turia 5, Valencia', lat: 39.4699, lng: -0.3763, phone: '+34 963 000 111', isOpen: true },
];

const BranchesPage: React.FC = () => {
  const [selectedBranch, setSelectedBranch] = useState<Branch>(BRANCHES[0]);

  return (
    <div className="bg-slate-50 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-4 italic">Puntos de Interacción Global</h1>
            <p className="text-slate-500 max-w-xl font-medium">
              Encuentre nuestras farmacias certificadas y centros médicos de atención directa para recogida de pedidos y soporte presencial.
            </p>
          </div>
          <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-xl active:scale-95 transition-all">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
            Detectar Ubicación
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* List */}
          <div className="lg:col-span-4 space-y-4 max-h-[600px] overflow-y-auto no-scrollbar pr-2">
            {BRANCHES.map((branch) => (
              <div 
                key={branch.id}
                onClick={() => setSelectedBranch(branch)}
                className={`p-6 rounded-[2rem] border transition-all cursor-pointer group ${
                  selectedBranch.id === branch.id 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-200' 
                    : 'bg-white border-slate-100 text-slate-900 hover:border-blue-200 shadow-sm'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-black text-lg tracking-tighter uppercase">{branch.name}</h3>
                  <span className={`text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-widest ${
                    branch.isOpen ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                  }`}>
                    {branch.isOpen ? 'Abierto' : 'Cerrado'}
                  </span>
                </div>
                <p className={`text-xs mb-4 font-medium leading-relaxed ${selectedBranch.id === branch.id ? 'text-blue-100' : 'text-slate-500'}`}>
                  {branch.address}
                </p>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  {branch.phone}
                </div>
              </div>
            ))}
          </div>

          {/* Map Interaction View */}
          <div className="lg:col-span-8 bg-slate-200 rounded-[3rem] overflow-hidden shadow-2xl relative min-h-[500px] border border-slate-100">
             {/* Mocking Google Map with an image and overlay markers */}
             <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-60 mix-blend-multiply" alt="Map View" />
             
             {/* Dynamic Marker Overlay */}
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative animate-bounce">
                    <svg className="h-16 w-16 text-blue-600 drop-shadow-2xl" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-2xl shadow-2xl border border-slate-100 whitespace-nowrap">
                        <p className="text-xs font-black text-slate-900 uppercase tracking-widest">{selectedBranch.name}</p>
                    </div>
                </div>
             </div>

             <div className="absolute bottom-10 left-10 right-10 bg-white/90 backdrop-blur-xl p-8 rounded-[2rem] border border-white/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex gap-4">
                    <div className="bg-blue-600 p-4 rounded-2xl text-white shadow-lg">
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    </div>
                    <div>
                        <h4 className="font-black text-slate-900 uppercase tracking-tighter">Certificación GlobalPharma</h4>
                        <p className="text-xs text-slate-500 font-medium">Esta sucursal cumple con todos los protocolos internacionales de seguridad médica.</p>
                    </div>
                </div>
                <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-100">
                    Obtener Ruta G-Maps
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchesPage;
