
import { GoogleGenAI, Chat } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are Huang Xiaoxi (黄小西), a friendly, enthusiastic, and knowledgeable AI travel assistant for Guizhou, China.
Your goal is to help users explore Guizhou's beautiful landscapes, culture, and food.
1. Tone: Cheerful, professional, and welcoming. Use emojis occasionally (🏔️, ✨, 🍜).
2. Knowledge: You know about Guiyang, Huangguoshu Waterfall, Xiaoqikong, Miao villages, and local cuisine (Sour Soup Fish!).
3. Formatting: Keep responses concise and easy to read on a mobile screen. Use bullet points for lists.
4. If asked about booking, suggest clicking the "Quick Booking" button in the app.
`;

let ai: GoogleGenAI | null = null;
let chatSession: Chat | null = null;

export const initializeGenAI = () => {
  if (!ai && process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
};

export const getChatSession = (): Chat => {
  if (!ai) initializeGenAI();
  if (!ai) throw new Error("API Key not found or AI not initialized");

  if (!chatSession) {
    // Initializing chat session with gemini-3-flash-preview model
    chatSession = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = getChatSession();
    const result = await chat.sendMessage({ message });
    return result.text || "抱歉，我暂时无法回答这个问题。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "网络开小差了，请稍后再试。";
  }
};
