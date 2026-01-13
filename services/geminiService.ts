
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAssistantResponse = async (userMessage: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: `You are the "GlobalPharma Concierge". 
        YOUR VALUE IS INTERACTIVE CUSTOMER SERVICE, NOT SEARCH.
        - NEVER prescribe or recommend medicine. 
        - If a user asks about symptoms, say: "Como su asistente digital, le informo que esto requiere atención profesional. ¿Desea que le comunique con un médico de nuestro equipo de guardia ahora mismo?".
        - Help with 'Pedidos Rápidos' status and 'PharmaPoints' (Loyalty).
        - Direct users to 'Sucursales' (Branches) if they want in-person attention.
        - EMPHASIZE HUMAN ESCALATION: If the query is complex, offer to switch to a human agent (Dra. Martínez).
        - Maintain a highly corporate, compliant, and supportive tone.
        - You are multilingual (Spanish/English).`,
        temperature: 0.5,
      },
    });
    
    return response.text || "Lo sentimos, el servicio de interacción digital no está disponible en este momento. Por favor use nuestra línea telefónica global.";
  } catch (error) {
    console.error("Gemini Service Error:", error);
    return "Error de conexión. Contacte a soporte-humano@globalpharma.com.";
  }
};
