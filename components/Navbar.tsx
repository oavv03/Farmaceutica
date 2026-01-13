
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User } from '../types';
import { supabase } from '../services/supabase';

interface NavbarProps {
  user: User | null;
  cartCount: number;
  onSwitchRole: (role: any) => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    sessionStorage.removeItem('pharma_session');
    await supabase.auth.signOut();
    window.location.reload();
  };

  const navLinks = [
    { name: 'Catálogo', path: '/products' },
    { name: 'Sucursales', path: '/branches' },
    { name: 'Fidelización', path: '/loyalty' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <div className="bg-slate-900 p-2 rounded-xl transition-all group-hover:bg-blue-600">
                <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div className="ml-3">
                <span className="block text-xl font-black text-slate-900 tracking-tighter leading-none">GLOBALPHARMA</span>
                <span className="text-[9px] text-blue-600 font-black uppercase tracking-[0.2em]">International Network</span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center space-x-6 border-l border-slate-100 pl-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[10px] font-black uppercase tracking-widest transition-all ${
                    isActive(link.path) ? 'text-blue-600' : 'text-slate-500 hover:text-blue-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {user?.role === 'pharmacy' && (
                <Link to="/admin" className="text-[10px] font-black uppercase tracking-widest text-amber-600 hover:text-amber-700 bg-amber-50 px-3 py-1 rounded-lg">
                  Panel de Gestión
                </Link>
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/order" className="relative p-2 text-slate-600 hover:text-blue-600 transition-all group">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-black h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {user && (
              <div className="flex items-center gap-4 border-l border-slate-100 pl-6">
                <Link to="/profile" className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="block text-xs font-black text-slate-900 leading-none">{user.name}</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{user.role === 'pharmacy' ? 'Admin Global' : 'Cliente Validado'}</span>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                     <img src={`https://i.pravatar.cc/100?u=${user.id}`} alt="User" />
                  </div>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="bg-slate-50 p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                  title="Finalizar Sesión"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-slate-950 px-4 py-1.5 flex justify-center items-center gap-6 overflow-hidden">
        <div className="flex items-center gap-2">
          <span className="flex h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.3em]">Red Privada Activa</span>
        </div>
        <div className="h-3 w-px bg-slate-800"></div>
        <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em]">ID Sesión: {user?.id.substring(0,8)}...</span>
        <div className="h-3 w-px bg-slate-800"></div>
        <span className="text-[8px] font-black text-blue-500 uppercase tracking-[0.3em]">Cumplimiento Normativo GXP</span>
      </div>
    </nav>
  );
};

export default Navbar;
