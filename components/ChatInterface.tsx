
import React, { useState, useRef, useEffect } from 'react';
import { Mic, Send, Plus, Wand2 } from 'lucide-react';
import { Message } from '../types';

interface Props {
  messages: Message[];
  isTyping: boolean;
  onSend: (text: string) => void;
}

const ChatInterface: React.FC<Props> = ({ messages, isTyping, onSend }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput('');
  };

  return (
    <div className="flex-1 flex flex-col relative">
      
      {/* Messages Area */}
      <div className="flex-1 px-4 space-y-4 pb-4">
        {/* Welcome Message Placeholder */}
        {messages.length === 0 && (
          <div className="flex gap-3 items-start mt-2">
             <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center border-2 border-white shadow-sm flex-shrink-0 overflow-hidden">
                <img src="https://picsum.photos/id/433/100/100" alt="Avatar" className="w-full h-full object-cover" />
             </div>
             <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm text-sm text-gray-700 leading-relaxed border border-gray-100 max-w-[85%]">
               <p>你好！我是黄小西，你的贵州旅游服务小助手。和我一起探索山水的魅力吧！⛰️✨</p>
             </div>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'items-start'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 border-white shadow-sm flex-shrink-0 overflow-hidden ${msg.role === 'user' ? 'bg-blue-100' : 'bg-yellow-100'}`}>
                {msg.role === 'user' ? (
                   <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white font-bold">我</div>
                ) : (
                   <img src="https://picsum.photos/id/433/100/100" alt="Avatar" className="w-full h-full object-cover" />
                )}
            </div>
            <div 
              className={`p-3 rounded-2xl shadow-sm text-sm leading-relaxed max-w-[85%] border border-gray-100
                ${msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 rounded-tl-none'}`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 items-start">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center border-2 border-white shadow-sm flex-shrink-0 overflow-hidden">
                 <img src="https://picsum.photos/id/433/100/100" alt="Avatar" className="w-full h-full object-cover" />
            </div>
             <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
               <div className="flex gap-1">
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
               </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Floating Input Area (Sticky above Bottom Nav) */}
      <div className="fixed bottom-[5.5rem] left-0 right-0 px-4 z-40 max-w-md mx-auto pointer-events-none">
        <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg p-2 pl-4 flex items-center gap-2 border border-gray-200/50 pointer-events-auto">
          <Mic className="text-gray-400 w-5 h-5 cursor-pointer hover:text-gray-600" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="问问小西关于贵州的一切..."
            className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
          />
          <button 
            onClick={() => handleSubmit()}
            disabled={!input.trim()}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-md
              ${input.trim() ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-400'}`}
          >
            {input.trim() ? <Send size={18} /> : <Wand2 size={18} />}
          </button>
        </div>
      </div>

       {/* Floating Action Button (FAB) - Moved higher */}
       <div className="fixed bottom-36 left-0 right-0 px-4 z-40 max-w-md mx-auto pointer-events-none flex justify-end">
          <button className="w-12 h-12 bg-teal-400 rounded-full shadow-xl flex items-center justify-center text-white hover:scale-105 transition-transform border-2 border-white/50 backdrop-blur-md pointer-events-auto">
            <Plus size={24} />
          </button>
       </div>
    </div>
  );
};

export default ChatInterface;
