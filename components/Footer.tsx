
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-6">
              <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <span className="ml-3 text-xl font-bold text-white tracking-tight uppercase">GlobalPharma</span>
            </div>
            <p className="text-sm leading-relaxed">
              Líderes mundiales en innovación farmacéutica, dedicados a transformar la vida de los pacientes a través de la ciencia avanzada y el compromiso con la salud global.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-6">Áreas Terapéuticas</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Oncología</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Neurología</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Enfermedades Raras</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Inmunología</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Recursos</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Ensayos Clínicos</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Transparencia</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Sostenibilidad</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Inversionistas</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Global</h3>
            <div className="flex flex-col space-y-3 text-sm">
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Presencia en 120+ países
              </span>
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +01-800-PHARMA-GL
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs opacity-60">
          © {new Date().getFullYear()} GlobalPharma International. Todos los derechos reservados. | Políticas de Privacidad | Términos de Uso
        </div>
      </div>
    </footer>
  );
};

export default Footer;
