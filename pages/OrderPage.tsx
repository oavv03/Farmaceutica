
import React, { useState, useRef } from 'react';
import { CartItem, User, Order } from '../types';
import { Link } from 'react-router-dom';

interface OrderPageProps {
  cart: CartItem[];
  user: User | null;
  onRemove: (id: string) => void;
  onComplete: (order: Order) => void;
}

const OrderPage: React.FC<OrderPageProps> = ({ cart, user, onRemove, onComplete }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [prescriptionUploaded, setPrescriptionUploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 15.00;
  const total = subtotal + shipping;

  const requiresPrescription = cart.some(item => item.product.requiresPrescription);

  const handleCheckout = () => {
    if (requiresPrescription && !prescriptionUploaded) {
      alert("Este pedido contiene medicamentos controlados. Por favor, suba su receta médica antes de continuar.");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      const newOrder: Order = {
        id: Math.random().toString(36).substring(7).toUpperCase(),
        date: new Date().toLocaleDateString(),
        status: requiresPrescription ? 'Pending Verification' : 'Processing',
        items: [...cart],
        total: total,
      };
      setIsProcessing(false);
      setOrderComplete(true);
      onComplete(newOrder);
    }, 2500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPrescriptionUploaded(true);
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] p-12 shadow-2xl text-center border border-slate-100 animate-in zoom-in duration-700">
          <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-10 border border-green-100">
             <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tighter">Pedido Procesado</h2>
          <p className="text-slate-500 mb-10 leading-relaxed text-sm font-medium">
            Su orden ha sido recibida. {requiresPrescription ? 'Nuestro farmacéutico de guardia validará su receta en los próximos 15 minutos.' : 'Su pedido está en fase de preparación logística GXP.'}
          </p>
          <div className="bg-slate-900 text-white p-6 rounded-3xl mb-10 flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-60">Recompensa Directa</span>
            <span className="text-3xl font-black">+{Math.round(subtotal / 5)} PharmaPoints</span>
          </div>
          <Link to="/profile" className="block w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all active:scale-95 shadow-xl shadow-blue-100">
            Ir a mis Pedidos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-12">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Checkout Directo</h1>
            <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest">Seguro SSL-256</span>
        </div>
        
        {cart.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-24 text-center border-2 border-dashed border-slate-200 shadow-sm">
            <h2 className="text-2xl font-black text-slate-300 mb-10 uppercase tracking-widest">Sin tratamientos seleccionados</h2>
            <Link to="/products" className="inline-block bg-slate-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-slate-800 transition-all">
              Explorar Portafolio
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
            <div className="lg:col-span-2 space-y-8">
              {cart.map((item) => (
                <div key={item.product.id} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-8 group hover:shadow-xl transition-all duration-500">
                  <img src={item.product.image} className="w-24 h-24 rounded-2xl object-cover" />
                  <div className="flex-grow">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{item.product.category}</span>
                    <h3 className="text-xl font-black text-slate-900 mb-1">{item.product.name}</h3>
                    <div className="flex items-center gap-6 mt-4">
                      <span className="text-lg font-black text-slate-900">{item.quantity} un.</span>
                      <span className="text-lg font-black text-blue-600">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                  <button onClick={() => onRemove(item.product.id)} className="p-4 text-slate-200 hover:text-red-500 rounded-2xl transition-all">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              ))}

              {requiresPrescription && (
                <div className={`p-10 rounded-[2.5rem] border-2 border-dashed transition-all ${prescriptionUploaded ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
                  <div className="flex flex-col items-center text-center">
                    <h3 className="text-xl font-black mb-3 text-slate-900 uppercase tracking-tighter">Validación Regulatoria Requerida</h3>
                    <p className="text-slate-600 text-sm mb-8 max-w-md font-medium">Debe subir su receta médica oficial para procesar estos medicamentos.</p>
                    <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileUpload} accept="image/*,.pdf" />
                    <button onClick={() => fileInputRef.current?.click()} className={`px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${prescriptionUploaded ? 'bg-green-600 text-white' : 'bg-slate-900 text-white'}`}>
                      {prescriptionUploaded ? 'Receta Cargada' : 'Subir Receta Médica'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl h-fit">
              <h3 className="text-2xl font-black mb-10 tracking-tighter uppercase">Resumen Final</h3>
              <div className="space-y-6 mb-10">
                <div className="flex justify-between text-slate-500 text-sm font-bold uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-slate-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500 text-sm font-bold uppercase tracking-widest">
                  <span>Cadena de Frío / GXP</span>
                  <span className="text-slate-900">${shipping.toFixed(2)}</span>
                </div>
                <div className="pt-6 border-t border-slate-100 flex justify-between items-end">
                  <span className="font-black text-lg uppercase tracking-widest">Total</span>
                  <span className="font-black text-4xl text-blue-600">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-3xl mb-10 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-[10px] font-black uppercase text-slate-900">Validación de Alergias</span>
                </div>
                <p className="text-[10px] text-slate-500 font-bold leading-relaxed">
                  Sistema sincronizado con su expediente médico. Detectado: Alergia a Penicilina. El pedido no contiene este componente.
                </p>
              </div>

              <button 
                onClick={handleCheckout} 
                disabled={isProcessing} 
                className={`w-full py-6 rounded-2xl font-black text-sm uppercase tracking-widest text-white transition-all shadow-xl active:scale-95 ${isProcessing ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {isProcessing ? 'Validando Protocolos...' : 'Confirmar e Interactuar'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
