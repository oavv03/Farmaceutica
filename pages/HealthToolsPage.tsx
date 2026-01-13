
import React, { useState } from 'react';

const HealthToolsPage: React.FC = () => {
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const result = weight / (heightInMeters * heightInMeters);
    setBmi(parseFloat(result.toFixed(1)));
  };

  const getBmiCategory = (val: number) => {
    if (val < 18.5) return { label: 'Bajo peso', color: 'text-yellow-600' };
    if (val < 25) return { label: 'Normal', color: 'text-green-600' };
    if (val < 30) return { label: 'Sobrepeso', color: 'text-orange-600' };
    return { label: 'Obesidad', color: 'text-red-600' };
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Herramientas de Bienestar</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Utilice nuestras calculadoras y recursos interactivos para un mejor seguimiento de su salud diaria. Recuerde que estos resultados son referenciales.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* BMI Calculator */}
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold">Calculadora de IMC</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Peso (kg)</label>
                <input 
                  type="range" min="30" max="200" 
                  value={weight} 
                  onChange={(e) => setWeight(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="text-right font-bold text-slate-900 mt-1">{weight} kg</div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Altura (cm)</label>
                <input 
                  type="range" min="100" max="220" 
                  value={height} 
                  onChange={(e) => setHeight(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="text-right font-bold text-slate-900 mt-1">{height} cm</div>
              </div>

              <button 
                onClick={calculateBMI}
                className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg"
              >
                Calcular Ahora
              </button>

              {bmi && (
                <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center animate-in zoom-in-95 duration-300">
                  <div className="text-slate-500 text-sm mb-1 uppercase tracking-widest font-bold">Su Índice de Masa Corporal</div>
                  <div className="text-5xl font-black text-slate-900 mb-2">{bmi}</div>
                  <div className={`text-xl font-bold ${getBmiCategory(bmi).color}`}>
                    Categoría: {getBmiCategory(bmi).label}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Medication Reminder Mockup */}
          <div className="bg-slate-900 text-white p-10 rounded-3xl shadow-xl flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-blue-500/20 p-3 rounded-2xl text-blue-400 border border-blue-500/30">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold">Gestión de Recordatorios</h2>
            </div>
            
            <p className="text-slate-400 mb-10 leading-relaxed">
              Mantenga sus tratamientos bajo control. Nuestra herramienta interactiva le permite configurar alarmas y notificaciones para no olvidar ninguna dosis.
            </p>

            <div className="space-y-4 flex-grow">
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center justify-between group hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold">CardioFlow XR</h4>
                    <p className="text-xs text-slate-500">Tomado: 08:00 AM</p>
                  </div>
                </div>
                <span className="text-xs text-slate-500">Hace 4h</span>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center justify-between group hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold">VaxCore Vitamin</h4>
                    <p className="text-xs text-slate-400">Próxima: 02:00 PM</p>
                  </div>
                </div>
                <button className="text-xs bg-blue-600 px-3 py-1 rounded-full font-bold">Pendiente</button>
              </div>
            </div>

            <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Nuevo Recordatorio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthToolsPage;
