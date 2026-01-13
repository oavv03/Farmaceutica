
import React, { useState } from 'react';
import { supabase } from '../services/supabase';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAuth = async () => {
    setLoading(true);
    setError(null);

    // Lógica de acceso directo para credenciales solicitadas
    const isSpecialAdmin = identifier.toLowerCase() === 'oscargave03' && password === 'racso23';
    const isSpecialUser = identifier.toLowerCase() === 'personal1' && password === '1234';

    if (isSpecialAdmin || isSpecialUser) {
      // Guardamos en sessionStorage para simular la sesión corporativa inmediata
      const mockUser = isSpecialAdmin ? {
        id: 'admin_001',
        email: 'admin@globalpharma.com',
        role: 'pharmacy',
        name: 'Oscar (Admin)'
      } : {
        id: 'user_001',
        email: 'personal1@globalpharma.com',
        role: 'client',
        name: 'Personal 1'
      };
      
      sessionStorage.setItem('pharma_session', JSON.stringify(mockUser));
      
      // Intentamos sincronizar con Supabase si existe el usuario, si no, procedemos como sesión de red interna
      try {
        const email = isSpecialAdmin ? 'oscargave03@globalpharma.com' : 'personal1@globalpharma.com';
        await supabase.auth.signInWithPassword({ email, password: 'password_placeholder' });
      } catch (e) {
        console.log("Internal network login active");
      }

      window.location.reload(); // Recargar para que App.tsx detecte el cambio
      return;
    }

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({ 
        email: identifier.includes('@') ? identifier : `${identifier}@globalpharma.com`, 
        password 
      });

      if (authError) throw authError;
      navigate('/');
    } catch (err: any) {
      setError("Credenciales corporativas no válidas o usuario no registrado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#1e40af_1px,transparent_1px)] [background-size:40px_40px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md p-8">
        <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-200">
          <div className="text-center mb-10">
            <div className="inline-block bg-blue-600 p-4 rounded-2xl mb-6 shadow-xl shadow-blue-500/20">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic mb-2">Global Access</h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Ecosistema Farmacéutico Multinacional</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2">ID de Usuario / Email</label>
              <input 
                type="text" 
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-300 focus:ring-2 focus:ring-blue-600 outline-none transition-all font-medium"
                placeholder="Ej: Oscargave03"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2">Clave Encriptada</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-300 focus:ring-2 focus:ring-blue-600 outline-none transition-all font-medium"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-center border border-red-100">
                {error}
              </div>
            )}

            <button 
              onClick={handleAuth}
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-black text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Verificando Identidad...' : 'Ingresar al Portal'}
            </button>
          </div>

          <div className="mt-12 text-center border-t border-slate-100 pt-8">
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
              Sistema de Acceso Restringido GXP. <br />
              Uso exclusivo para personal autorizado de GlobalPharma International.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
