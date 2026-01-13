
import React, { useState } from 'react';

const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-6">Contáctenos</h1>
            <p className="text-slate-600 text-lg mb-12 leading-relaxed">
              ¿Tiene preguntas sobre nuestros tratamientos o desea reportar un evento adverso? Estamos aquí para escucharle y brindarle la asistencia necesaria en cualquier parte del mundo.
            </p>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 h-fit">
                   <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                   </svg>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Sede Global</h4>
                  <p className="text-slate-600 text-sm">Avenue des Innovations 101, Ginebra, Suiza.</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 h-fit">
                   <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                   </svg>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Soporte Médico</h4>
                  <p className="text-slate-600 text-sm">medical-affairs@globalpharma.com</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 h-fit">
                   <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                   </svg>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Inversionistas</h4>
                  <p className="text-slate-600 text-sm">investor-relations@globalpharma.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-4">¡Mensaje Recibido!</h2>
                <p className="text-slate-600">Nuestro equipo global procesará su solicitud y le contactará en un plazo máximo de 24 horas hábiles.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-bold mb-8">Formulario de Interacción Directa</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Nombre Completo</label>
                    <input required type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Juan Pérez" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Correo Electrónico</label>
                    <input required type="email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="juan@ejemplo.com" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Usted es...</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                    <option>Paciente / Familiar</option>
                    <option>Profesional de la Salud (HCP)</option>
                    <option>Institución / Gobierno</option>
                    <option>Proveedor / Socio</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Área de Interés</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                    <option>Información de Producto</option>
                    <option>Eventos Adversos (Farmacovigilancia)</option>
                    <option>Ensayos Clínicos</option>
                    <option>Carreras / Empleo</option>
                    <option>Otro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Mensaje</label>
                  <textarea required rows={4} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Describa su consulta de forma detallada..."></textarea>
                </div>

                <div className="flex items-start gap-3">
                  <input type="checkbox" required id="privacy" className="mt-1 accent-blue-600" />
                  <label htmlFor="privacy" className="text-xs text-slate-500 leading-relaxed">
                    Acepto el tratamiento de mis datos personales de acuerdo con la política de privacidad global de GlobalPharma y entiendo que mi información puede ser transferida internacionalmente para fines de soporte.
                  </label>
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 uppercase tracking-widest text-sm">
                  Enviar Solicitud
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
