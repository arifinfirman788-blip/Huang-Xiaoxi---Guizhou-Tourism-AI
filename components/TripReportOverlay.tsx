
import React from 'react';
import { X, Share2, MapPin, Calendar, Camera, Quote, Sparkles, Download, Bot } from 'lucide-react';

interface Props {
  onClose: () => void;
}

const TripReportOverlay: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
       <div className="relative w-full max-w-sm h-full max-h-[85vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 slide-in-from-bottom-5 duration-300">
          
          {/* Header Controls */}
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20 pointer-events-none">
             <button onClick={onClose} className="bg-black/20 backdrop-blur text-white p-2 rounded-full pointer-events-auto hover:bg-black/40 transition-colors">
                <X size={20} />
             </button>
             <button className="bg-white/20 backdrop-blur text-white p-2 rounded-full pointer-events-auto hover:bg-white/30 transition-colors">
                <Share2 size={20} />
             </button>
          </div>

          {/* Scrollable Report Content */}
          <div className="flex-1 overflow-y-auto no-scrollbar relative bg-[#f8f5f2]">
             
             {/* 1. Hero Image */}
             <div className="h-64 relative">
                <img src="https://picsum.photos/id/16/600/800" className="w-full h-full object-cover" alt="Hero" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#f8f5f2] to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                   <div className="text-orange-600 font-serif italic text-lg font-bold mb-1">My Journey</div>
                   <h1 className="text-4xl font-black text-slate-800 leading-tight">遵义<br/>红色研学</h1>
                </div>
             </div>

             {/* 2. Stats Grid */}
             <div className="px-6 -mt-6 relative z-10">
                <div className="bg-white rounded-2xl p-4 shadow-xl shadow-orange-900/5 grid grid-cols-3 gap-2">
                   <div className="text-center">
                      <div className="text-orange-500 mb-1 flex justify-center"><Calendar size={18} /></div>
                      <div className="text-lg font-black text-slate-800">3<span className="text-xs font-normal text-slate-400 ml-0.5">天</span></div>
                      <div className="text-[10px] text-slate-400 uppercase">Duration</div>
                   </div>
                   <div className="text-center border-l border-slate-100">
                      <div className="text-blue-500 mb-1 flex justify-center"><MapPin size={18} /></div>
                      <div className="text-lg font-black text-slate-800">8<span className="text-xs font-normal text-slate-400 ml-0.5">个</span></div>
                      <div className="text-[10px] text-slate-400 uppercase">Spots</div>
                   </div>
                   <div className="text-center border-l border-slate-100">
                      <div className="text-pink-500 mb-1 flex justify-center"><Camera size={18} /></div>
                      <div className="text-lg font-black text-slate-800">126<span className="text-xs font-normal text-slate-400 ml-0.5">张</span></div>
                      <div className="text-[10px] text-slate-400 uppercase">Photos</div>
                   </div>
                </div>
             </div>

             {/* 3. Map Visualization */}
             <div className="mt-8 px-6">
                <div className="flex items-center gap-2 mb-3">
                   <div className="w-1 h-4 bg-orange-500 rounded-full"></div>
                   <h3 className="font-bold text-slate-800">足迹地图</h3>
                </div>
                <div className="h-40 bg-slate-200 rounded-2xl overflow-hidden relative shadow-inner">
                   <img src="https://picsum.photos/id/10/600/300" className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700" alt="Map" />
                   {/* Animated Route Line (CSS-only simulation) */}
                   <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <path d="M50,120 Q100,50 180,80 T280,100" fill="none" stroke="#f97316" strokeWidth="3" strokeDasharray="5,5" className="animate-pulse" />
                      <circle cx="50" cy="120" r="4" fill="#f97316" />
                      <circle cx="280" cy="100" r="4" fill="#f97316" />
                   </svg>
                </div>
             </div>

             {/* 4. Highlight Photos (Masonryish) */}
             <div className="mt-8 px-6">
                <div className="flex items-center gap-2 mb-3">
                   <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                   <h3 className="font-bold text-slate-800">高光时刻</h3>
                </div>
                <div className="columns-2 gap-3 space-y-3">
                   <div className="rounded-xl overflow-hidden break-inside-avoid">
                      <img src="https://picsum.photos/id/1015/300/400" className="w-full h-auto" alt="p1"/>
                   </div>
                   <div className="rounded-xl overflow-hidden break-inside-avoid">
                      <img src="https://picsum.photos/id/1036/300/300" className="w-full h-auto" alt="p2"/>
                   </div>
                   <div className="rounded-xl overflow-hidden break-inside-avoid">
                      <img src="https://picsum.photos/id/1040/300/450" className="w-full h-auto" alt="p3"/>
                   </div>
                   <div className="p-4 bg-white rounded-xl break-inside-avoid shadow-sm flex flex-col items-center justify-center text-center">
                      <Quote size={24} className="text-orange-300 mb-2" />
                      <p className="text-xs font-serif text-slate-600 leading-relaxed">
                         "遵义会议会址的砖墙下，阳光正好，历史的厚重感扑面而来。"
                      </p>
                   </div>
                </div>
             </div>

             {/* 5. AI Summary */}
             <div className="mt-8 px-6 pb-24">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg">
                   <Sparkles className="absolute top-4 right-4 text-white/20" size={48} />
                   <div className="relative z-10">
                      <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                         <Bot size={18} /> AI 旅程总结
                      </h3>
                      <p className="text-sm font-light leading-relaxed text-indigo-100">
                         本次旅程你超越了 <span className="font-bold text-white">92%</span> 的旅行者！
                         在短短3天内，你深入了解了红色历史文化，并在娄山关留下了最美打卡照。你的步行距离达到 <span className="font-bold text-white">35,000</span> 步，不仅是身体的旅行，更是心灵的洗礼。
                      </p>
                      <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                         <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30"></div>
                            <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30"></div>
                         </div>
                         <span className="text-xs font-mono opacity-60">Generated by HuangXiaoxi AI</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Bottom Action */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white/90 to-transparent pt-12">
             <button className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-2xl shadow-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all">
                <Download size={18} /> 保存旅行报告
             </button>
          </div>

       </div>
    </div>
  );
};

export default TripReportOverlay;
