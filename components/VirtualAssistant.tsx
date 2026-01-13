
import React, { useState, useRef, useEffect } from 'react';
import { InteractionMessage } from '../types';

interface VirtualAssistantProps {
  onClose: () => void;
}

const VirtualAssistant: React.FC<VirtualAssistantProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<InteractionMessage[]>([
    {
      id: '1',
      sender: 'human',
      senderName: 'Central de Atención Global',
      content: 'Bienvenido al canal de soporte prioritario de GlobalPharma. No soy una IA, soy parte del equipo de atención al cliente. ¿En qué podemos ayudarle hoy con su pedido o consulta médica?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const simulateHumanResponse = (userInput: string) => {
    setIsTyping(true);
    
    // Simulación de interacción humana basada en palabras clave sin IA de búsqueda
    setTimeout(() => {
      let response = "Entendido. Un agente de nuestro departamento correspondiente está revisando su solicitud. Por favor, manténgase en línea.";
      
      const lowerInput = userInput.toLowerCase();
      if (lowerInput.includes('pedido') || lowerInput.includes('orden')) {
        response = "He localizado su pedido en nuestro sistema logístico. La cadena de frío está verificada y el envío está programado según lo acordado. ¿Desea el número de guía?";
      } else if (lowerInput.includes('doctor') || lowerInput.includes('médico') || lowerInput.includes('ayuda')) {
        response = "Le estoy transfiriendo con la Dra. Elena del equipo de guardia médica. Ella podrá atender su consulta clínica de inmediato.";
      } else if (lowerInput.includes('hola') || lowerInput.includes('gracias')) {
        response = "Es un placer atenderle. En GlobalPharma valoramos el contacto humano directo sobre los sistemas automáticos. ¿Hay algo más en lo que pueda asistirle?";
      }

      const agentMsg: InteractionMessage = {
        id: Date.now().toString(),
        sender: 'human',
        senderName: 'Lic. Roberto (Soporte)',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, agentMsg]);
      setIsTyping(false);
    }, 2000);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: InteractionMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    simulateHumanResponse(input);
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden border border-slate-200 flex flex-col h-[600px] animate-in slide-in-from-bottom-8 duration-500">
      {/* Header Estilo Centro de Mando */}
      <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center border-2 border-blue-400">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest">Soporte Humano 24/7</h4>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-[9px] opacity-70 font-black uppercase tracking-[0.2em]">Agente en Línea: Lic. Roberto</span>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="hover:bg-white/10 p-2 rounded-xl transition-colors">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      {/* Trust Bar */}
      <div className="bg-blue-50 px-6 py-2 border-b border-blue-100 flex justify-center items-center">
         <span className="text-[8px] font-black text-blue-600 uppercase tracking-widest">Conexión Segura de Extremo a Extremo (AES-256)</span>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-grow overflow-y-auto p-8 space-y-6 bg-white">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'} max-w-[85%]`}>
               {m.senderName && <span className="text-[9px] font-black text-slate-400 uppercase mb-1 ml-1">{m.senderName}</span>}
               <div className={`p-5 rounded-[1.8rem] text-sm leading-relaxed shadow-sm ${
                  m.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'
               }`}>
                {m.content}
              </div>
              <span className="text-[8px] text-slate-400 mt-1 uppercase font-bold px-1">
                {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none flex gap-1.5 items-center">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
      </div>

      {/* Direct Input */}
      <div className="p-6 border-t border-slate-100 bg-slate-50">
        <div className="flex gap-4">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escriba su mensaje al equipo de soporte..."
            className="flex-grow px-6 py-4 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-400 font-medium"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="px-8 bg-slate-900 text-white rounded-2xl hover:bg-black shadow-xl transition-all active:scale-95 disabled:opacity-50 font-black text-[10px] uppercase tracking-widest"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default VirtualAssistant;
