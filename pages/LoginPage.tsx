
import React, { useState } from 'react';
import { supabase } from '../services/supabase';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAuth = async (type: 'login' | 'signup') => {
    setLoading(true);
    setError(null);
    try {
      const { error: authError } = type === 'login' 
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

      if (authError) throw authError;
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md p-8">
        <div className="bg-white/10 backdrop-blur-2xl border border-white/10 p-10 rounded-[3rem] shadow-2xl">
          <div className="text-center mb-10">
            <div className="inline-block bg-blue-600 p-4 rounded-2xl mb-6 shadow-lg shadow-blue-500/20">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic mb-2">Acceso Seguro</h1>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">GlobalPharma Connect Portal</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2 ml-2">Identificación Corporativa (Email)</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="usuario@globalpharma.com"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2 ml-2">Contraseña Encriptada</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-center">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-4 pt-4">
              <button 
                onClick={() => handleAuth('login')}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-blue-500/10 active:scale-95 disabled:opacity-50"
              >
                {loading ? 'Validando...' : 'Iniciar Sesión'}
              </button>
              <button 
                onClick={() => handleAuth('signup')}
                disabled={loading}
                className="w-full bg-white/5 hover:bg-white/10 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border border-white/10 active:scale-95 disabled:opacity-50"
              >
                Registrar Nuevo Perfil
              </button>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
              Este sistema es monitoreado 24/7. El acceso no autorizado está estrictamente prohibido bajo normas internacionales de ciberseguridad farmacéutica.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
