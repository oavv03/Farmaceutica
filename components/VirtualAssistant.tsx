
import React, { useState, useRef, useEffect } from 'react';
import { getAssistantResponse } from '../services/geminiService';
import { InteractionMessage } from '../types';

interface VirtualAssistantProps {
  onClose: () => void;
}

const VirtualAssistant: React.FC<VirtualAssistantProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<InteractionMessage[]>([
    {
      id: '1',
      sender: 'assistant',
      content: 'Hola. Soy el Concierge de GlobalPharma. Estoy aquí para guiarle. Si necesita atención clínica o ayuda con un pedido complejo, puedo derivarle a un farmacéutico humano en cualquier momento.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatType, setChatType] = useState<'concierge' | 'human'>('concierge');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: InteractionMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    if (chatType === 'human' || input.toLowerCase().includes('humano') || input.toLowerCase().includes('farmacéutico')) {
        setChatType('human');
        setTimeout(() => {
            const humanMsg: InteractionMessage = {
                id: (Date.now() + 1).toString(),
                sender: 'human',
                senderName: 'Dr. Alejandro (Farmacia)',
                content: chatType === 'human' 
                  ? 'Le atiende Dr. Alejandro. He revisado su historial médico y la alergia a la Penicilina está registrada. ¿En qué puedo ayudarle específicamente con su pedido?'
                  : 'Entiendo. Le estoy transfiriendo con nuestro farmacéutico de guardia... Hola, le atiende el Dr. Alejandro. ¿En qué puedo ayudarle?',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, humanMsg]);
            setIsTyping(false);
        }, 2000);
    } else {
        const response = await getAssistantResponse(input);
        const aiMsg: InteractionMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          content: response,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMsg]);
        setIsTyping(false);
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden border border-slate-200 flex flex-col h-[600px] animate-in slide-in-from-bottom-8 duration-500">
      {/* Header */}
      <div className={`p-6 flex justify-between items-center text-white transition-all duration-500 ${chatType === 'human' ? 'bg-indigo-700' : 'bg-slate-900'}`}>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all ${chatType === 'human' ? 'bg-indigo-600 border-indigo-400' : 'bg-slate-800 border-slate-700'}`}>
              {chatType === 'human' ? (
                <img src="https://i.pravatar.cc/150?u=doc1" className="rounded-xl" alt="Dr" />
              ) : (
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              )}
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest">{chatType === 'human' ? 'Dr. Alejandro' : 'Global Concierge'}</h4>
            <span className="text-[9px] opacity-70 font-bold uppercase tracking-[0.2em]">{chatType === 'human' ? 'Especialista en Farmacia' : 'Asistencia Inteligente'}</span>
          </div>
        </div>
        <button onClick={onClose} className="hover:bg-white/10 p-2 rounded-xl transition-colors">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      {/* Audit Notice */}
      <div className="bg-slate-50 px-6 py-2 border-b border-slate-100 flex justify-between items-center">
         <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Conversación Encriptada SSL-256</span>
         <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Cumplimiento GXP</span>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-grow overflow-y-auto p-8 space-y-6 bg-white no-scrollbar">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'} max-w-[90%]`}>
               {m.senderName && <span className="text-[9px] font-black text-indigo-600 uppercase mb-1 ml-1">{m.senderName}</span>}
               <div className={`p-4 rounded-[1.5rem] text-sm leading-relaxed shadow-sm ${
                  m.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : m.sender === 'human'
                      ? 'bg-indigo-50 text-indigo-900 border border-indigo-100 rounded-tl-none'
                      : 'bg-slate-100 text-slate-800 rounded-tl-none'
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
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-6 border-t border-slate-100 bg-white">
        <div className="flex gap-4">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={chatType === 'human' ? "Escriba al Dr. Alejandro..." : "Consulte sobre su pedido o soporte..."}
            className="flex-grow px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400 font-medium"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="p-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all active:scale-90 disabled:opacity-50"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VirtualAssistant;
