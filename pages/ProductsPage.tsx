
import React, { useState } from 'react';
import { TherapeuticArea, Product } from '../types';

// Added missing stock property to comply with Product interface
const PRODUCTS: Product[] = [
  { id: '1', name: 'OncoShield Ultra', category: 'Inmunoterapia', therapeuticArea: TherapeuticArea.ONCOLOGY, description: 'Tratamiento avanzado de oncología de precisión para tumores sólidos.', image: 'https://images.unsplash.com/photo-1579152276532-535c21af3bb5?auto=format&fit=crop&q=80&w=400', price: 450.00, requiresPrescription: true, stock: 12 },
  { id: '2', name: 'CardioFlow XR', category: 'Hipertensión', therapeuticArea: TherapeuticArea.CARDIOLOGY, description: 'Formulación de liberación prolongada para el control de la presión arterial sistémica.', image: 'https://images.unsplash.com/photo-1550572017-ed20bb0f8623?auto=format&fit=crop&q=80&w=400', price: 85.50, requiresPrescription: true, stock: 45 },
  { id: '3', name: 'NeuroRestor Plus', category: 'Neurología', therapeuticArea: TherapeuticArea.NEUROLOGY, description: 'Modificador de la enfermedad para el tratamiento de síntomas neurodegenerativos tempranos.', image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=400', price: 120.00, requiresPrescription: true, stock: 8 },
  { id: '4', name: 'ImmunoGuard Pro', category: 'Biomédico', therapeuticArea: TherapeuticArea.IMMUNOLOGY, description: 'Bloqueador selectivo de interleucinas para enfermedades inflamatorias crónicas.', image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=400', price: 310.00, requiresPrescription: true, stock: 15 },
  { id: '5', name: 'VaxCore Global', category: 'Vacunas', therapeuticArea: TherapeuticArea.VACCINES, description: 'Plataforma de vacuna multivalente para protección respiratoria estacional.', image: 'https://images.unsplash.com/photo-1618961734760-466bc74ee444?auto=format&fit=crop&q=80&w=400', price: 45.00, requiresPrescription: false, stock: 120 },
  { id: '6', name: 'OrphanCure X', category: 'Huérfanos', therapeuticArea: TherapeuticArea.RARE_DISEASE, description: 'Terapia génica innovadora para desórdenes metabólicos poco frecuentes.', image: 'https://images.unsplash.com/photo-1532187875302-1ef926070df7?auto=format&fit=crop&q=80&w=400', price: 2500.00, requiresPrescription: true, stock: 3 },
];

interface ProductsPageProps {
  onAddToCart: (product: Product) => void;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ onAddToCart }) => {
  const [filter, setFilter] = useState<TherapeuticArea | 'All'>('All');
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAdd = (p: Product) => {
    onAddToCart(p);
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  const filteredProducts = filter === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.therapeuticArea === filter);

  return (
    <div className="bg-slate-50 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-10">
          <div className="max-w-xl">
            <h1 className="text-4xl font-black text-slate-900 mb-6 tracking-tighter uppercase italic">Portafolio Farmacéutico Directo</h1>
            <p className="text-slate-500 font-medium leading-relaxed">
              Gestión directa de tratamientos de alta especialidad. Cada pedido es supervisado por nuestro panel de farmacovigilancia multinacional.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {['All', ...Object.values(TherapeuticArea)].map((area) => (
              <button 
                key={area}
                onClick={() => setFilter(area as any)}
                className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm active:scale-95 ${filter === area ? 'bg-blue-600 text-white' : 'bg-white text-slate-500 hover:border-blue-300 border border-slate-100'}`}
              >
                {area === 'All' ? 'Todos' : area}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-700 flex flex-col group relative">
              <div className="h-64 overflow-hidden relative">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  <span className="bg-slate-900/90 backdrop-blur-md text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-xl">
                    {product.therapeuticArea}
                  </span>
                  {product.requiresPrescription && (
                    <span className="bg-amber-500/90 backdrop-blur-md text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-xl flex items-center gap-1.5">
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>
                      Receta Requerida
                    </span>
                  )}
                </div>
                <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur px-4 py-2 rounded-2xl text-lg font-black text-slate-900 shadow-2xl border border-white/40">
                  ${product.price.toFixed(2)}
                </div>
              </div>
              <div className="p-10 flex-grow flex flex-col">
                <span className="text-[10px] text-blue-600 font-black uppercase tracking-[0.2em] mb-3 block">{product.category}</span>
                <h3 className="text-2xl font-black mb-4 text-slate-900 group-hover:text-blue-600 transition-colors tracking-tighter italic">{product.name}</h3>
                <p className="text-slate-500 text-sm mb-10 flex-grow leading-relaxed font-medium">
                  {product.description}
                </p>
                <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                  <button className="text-[10px] font-black text-slate-400 hover:text-slate-900 transition-all uppercase tracking-widest">Documentación</button>
                  <button 
                    onClick={() => handleAdd(product)}
                    className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-90 ${
                      addedId === product.id ? 'bg-green-600 text-white shadow-green-100 scale-105' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-200'
                    }`}
                  >
                    {addedId === product.id ? (
                      <>
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        Añadido
                      </>
                    ) : (
                      <>
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                        Pedir Directo
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
