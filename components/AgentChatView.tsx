
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Phone, Mic, Send, Plus, MapPin, Globe, ChevronRight, Sparkles, X, Medal, Menu, ShoppingCart, ShieldCheck, CheckCircle2, Bot, CreditCard, LayoutGrid, Package, Store } from 'lucide-react';
import { ServiceItem, Message } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

interface Props {
  agent: ServiceItem;
  onBack: () => void;
}

const AgentChatView: React.FC<Props> = ({ agent, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
     { id: 'welcome', role: 'model', text: '您好！我是您的智能导服黄小西。检测到当前景区人流量较大，排队预计超过1小时。为了提升您的游玩体验，王导为您申请了【VIP绿色通道】特权服务，是否需要立即开启？' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showOrderCard, setShowOrderCard] = useState(true); 
  const [isPaid, setIsPaid] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    const responseText = await sendMessageToGemini(text);
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: responseText }]);
    setIsTyping(false);
  };

  const handlePay = () => {
     setIsTyping(true);
     setTimeout(() => {
        setIsPaid(true);
        setShowOrderCard(false);
        setMessages(prev => [...prev, { id: 'pay_succ', role: 'model', text: '开启成功！🎉 已为您成功锁定【VIP绿色通道】特权。导游王金牌将为您引导至专属入口。祝您游玩愉快！' }]);
        setIsTyping(false);
     }, 1500);
  };

  const handleOpenShop = () => {
     window.dispatchEvent(new CustomEvent('OPEN_AGENCY_SHOP'));
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#f8fafc] relative">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md px-4 py-3 flex items-center justify-between shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
           <button onClick={onBack} className="p-1 -ml-2 hover:bg-black/5 rounded-full transition-colors"><ArrowLeft size={22} className="text-slate-700" /></button>
           <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white"><Bot size={20}/></div>
              <div>
                 <h3 className="font-bold text-sm text-slate-900">黄小西 · 智能助手</h3>
                 <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-tighter">Exclusive Service</p>
              </div>
           </div>
        </div>
        <button className="p-2 bg-slate-100 rounded-full text-slate-500 hover:text-indigo-600 transition-colors">
           <LayoutGrid size={20} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-32 no-scrollbar">
         {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-in fade-in duration-500`}>
               <div className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center border shadow-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white'}`}>
                  {msg.role === 'user' ? '我' : <Bot size={18} className="text-indigo-600"/>}
               </div>
               <div className={`p-4 rounded-2xl text-sm leading-relaxed max-w-[85%] shadow-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'}`}>
                  {msg.text}
               </div>
            </div>
         ))}

         {showOrderCard && (
            <div className="ml-12 space-y-4 animate-in slide-in-from-bottom-4 duration-700">
               {/* 1. AI 服务建议卡片 */}
               <div className="bg-white rounded-[2.5rem] shadow-2xl border border-indigo-100 overflow-hidden max-w-sm relative group">
                  <div className="h-40 relative">
                     <img src="https://picsum.photos/id/1018/400/250" className="w-full h-full object-cover" alt="Product" />
                     <div className="absolute top-4 left-4 bg-indigo-600/90 backdrop-blur-md text-white text-[10px] px-3 py-1.5 rounded-full flex items-center gap-1.5 font-black border border-white/20">
                        <Sparkles size={12} className="text-yellow-400" /> AI 专属服务建议
                     </div>
                  </div>
                  <div className="p-6">
                     <div className="flex justify-between items-start mb-4">
                        <div>
                           <h4 className="font-black text-slate-800 text-base leading-tight">黄果树VIP免排队特权包</h4>
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Priority Pass</p>
                        </div>
                        <div className="text-right">
                           <div className="text-xl font-black text-indigo-600">¥198</div>
                        </div>
                     </div>
                     <button onClick={handlePay} className="w-full bg-slate-900 text-white font-black py-3.5 rounded-2xl shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 text-sm group">
                        <CreditCard size={18} /> 立即开启特权
                     </button>
                  </div>
               </div>

               {/* 2. 进入天悦旗舰店入口 (本次新增逻辑) */}
               <div 
                  onClick={handleOpenShop}
                  className="max-w-sm bg-white border border-indigo-100 rounded-[2rem] p-5 flex items-center justify-between group cursor-pointer hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/10 transition-all shadow-sm"
               >
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                        <Store size={24} />
                     </div>
                     <div>
                        <div className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                           天悦旅行社官方旗舰店
                           <ShieldCheck size={14} className="text-emerald-500" />
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5 tracking-tight">查看更多金牌线路与深度游管家服务</p>
                     </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                     <ChevronRight size={18} />
                  </div>
               </div>
            </div>
         )}
         
         {isPaid && (
            <div className="ml-12 animate-in zoom-in duration-500">
               <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-[2rem] text-white shadow-2xl flex items-center gap-4 border-4 border-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10"><CheckCircle2 size={100} /></div>
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shrink-0"><CheckCircle2 size={32} /></div>
                  <div>
                     <div className="text-[10px] opacity-80 font-black uppercase tracking-widest mb-1">Service Voucher</div>
                     <div className="font-black text-base">特权已开启：GZ-88293-XP</div>
                     <p className="text-[10px] mt-1 opacity-90">导游已收到您的特权开启通知</p>
                  </div>
               </div>
            </div>
         )}
         
         <div ref={messagesEndRef} />
      </div>

      {/* Footer */}
      <div className="bg-white p-4 border-t border-slate-100 pb-8 z-40">
         <div className="flex items-center gap-3 bg-slate-100 rounded-full px-4 py-2 shadow-inner">
            <Mic size={20} className="text-slate-400" />
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="有问题请随时告诉我..." className="flex-1 bg-transparent outline-none text-sm text-slate-800" />
            <button onClick={() => handleSend()} className="text-indigo-600 font-black text-sm px-2">发送</button>
         </div>
      </div>
    </div>
  );
};

export default AgentChatView;
