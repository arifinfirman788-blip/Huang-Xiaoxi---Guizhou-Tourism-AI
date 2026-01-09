
import React from 'react';
import { ArrowLeft, Star, ShieldCheck, ChevronRight, Phone, MessageSquare, Award, Flame, Zap, MapPin, Building2, Share2 } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const shopProducts = [
  { id: 'sp1', name: '【小西力荐】梵净山+荔波小七孔+西江苗寨5日深度摄影游', price: 2980, img: 'https://picsum.photos/id/1015/400/300', tag: '爆款', score: 4.9 },
  { id: 'sp2', name: '【私享小包】黄果树瀑布+龙宫 VIP 纯玩2日定制', price: 1580, img: 'https://picsum.photos/id/1018/400/300', tag: '高品质', score: 5.0 },
  { id: 'sp3', name: '【文化探寻】安顺屯堡非遗文化体验1日研学', price: 399, img: 'https://picsum.photos/id/1036/400/300', tag: '研学', score: 4.8 },
];

const AgencyShopView: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-full bg-[#f8fafc] overflow-hidden">
      {/* 沉浸式头部 */}
      <div className="relative h-72 shrink-0">
         <img src="https://picsum.photos/id/1015/800/600" className="w-full h-full object-cover" alt="TianYue" />
         <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-[#f8fafc]"></div>
         
         <div className="absolute top-10 left-4 right-4 flex justify-between items-center">
            <button onClick={onBack} className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white active:scale-90 transition-transform">
               <ArrowLeft size={22} />
            </button>
            <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white">
               <Share2 size={20} />
            </button>
         </div>

         <div className="absolute bottom-0 left-0 right-0 px-6 pb-6">
            <div className="flex items-end gap-4">
               <div className="w-20 h-20 bg-white rounded-3xl shadow-2xl p-1 shrink-0 overflow-hidden border-4 border-white rotate-[-2deg]">
                  <img src="https://picsum.photos/id/1005/200/200" className="w-full h-full rounded-2xl object-cover" alt="Logo" />
               </div>
               <div className="flex-1 pb-1">
                  <div className="flex items-center gap-2 mb-1">
                     <h1 className="text-2xl font-black text-slate-800 tracking-tighter">天悦旅行社</h1>
                     <span className="bg-indigo-600 text-white text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest shadow-sm">Flagship</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                     <div className="flex items-center gap-1 text-orange-500 font-bold">
                        <Star size={12} fill="currentColor" /> 5.0
                     </div>
                     <span className="text-slate-500 font-medium">30年深耕 · 贵州省诚信示范单位</span>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 overflow-y-auto px-6 py-6 no-scrollbar pb-32">
         {/* 服务保障标签 */}
         <div className="grid grid-cols-3 gap-3 mb-8">
            {[
               { icon: ShieldCheck, label: '先行赔付', color: 'text-emerald-500' },
               { icon: Award, label: '金牌向导', color: 'text-orange-500' },
               { icon: Zap, label: '极速预订', color: 'text-indigo-500' }
            ].map((item, i) => (
               <div key={i} className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-1">
                  <item.icon size={18} className={item.color} />
                  <span className="text-[10px] font-bold text-slate-600">{item.label}</span>
               </div>
            ))}
         </div>

         {/* 推荐板块 */}
         <div className="flex justify-between items-end mb-4">
            <div>
               <h3 className="font-black text-slate-800 text-lg flex items-center gap-2 tracking-tight">
                  <Flame size={20} className="text-rose-500" /> 店长力荐线路
               </h3>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest ml-7">Season Best Sellers</p>
            </div>
         </div>

         <div className="space-y-4">
            {shopProducts.map(p => (
               <div key={p.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex h-32 group active:scale-[0.98] transition-all">
                  <div className="w-32 shrink-0 relative overflow-hidden">
                     <img src={p.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="p" />
                     <div className="absolute top-2 left-2 bg-indigo-600 text-white text-[8px] px-2 py-0.5 rounded-full font-black uppercase shadow-lg">
                        {p.tag}
                     </div>
                  </div>
                  <div className="flex-1 p-4 flex flex-col justify-between">
                     <div>
                        <h4 className="font-bold text-slate-800 text-sm line-clamp-2 leading-snug">{p.name}</h4>
                        <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400 font-bold">
                           <Star size={10} fill="currentColor" className="text-orange-400" /> {p.score} 评分
                        </div>
                     </div>
                     <div className="flex justify-between items-end">
                        <div className="text-indigo-600 font-black text-lg">¥{p.price}<span className="text-[10px] font-normal text-slate-400 ml-1">起</span></div>
                        <button className="bg-slate-900 text-white w-8 h-8 rounded-xl flex items-center justify-center shadow-lg active:scale-90 transition-transform">
                           <ChevronRight size={18} />
                        </button>
                     </div>
                  </div>
               </div>
            ))}
         </div>

         {/* 企业介绍卡片 */}
         <div className="mt-8 bg-slate-100/50 rounded-3xl p-6 border border-slate-200">
            <h4 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
               <Building2 size={16} className="text-slate-400" /> 关于天悦旅行社
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
               作为贵州省老牌5A级旅行社，天悦始终坚持“游客至上”的服务理念。我们拥有自主车队和金牌导游团队，与黄果树、梵净山等核心景区建立了深度战略合作关系，确保每一位游客都能享受到最优质、最地道的贵州之旅。
            </p>
         </div>
      </div>

      {/* 底部悬浮工具栏 */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/90 to-transparent">
         <div className="bg-slate-900 rounded-[2.5rem] p-2 flex items-center gap-2 shadow-2xl">
            <button className="flex-1 bg-white/10 text-white font-bold py-4 rounded-[2rem] text-sm flex items-center justify-center gap-2 hover:bg-white/20 transition-all">
               <MessageSquare size={18} /> 在线咨询
            </button>
            <button className="flex-1 bg-indigo-600 text-white font-black py-4 rounded-[2rem] text-sm shadow-xl shadow-indigo-500/30 flex items-center justify-center gap-2 active:scale-95 transition-all">
               <Phone size={18} /> 一键预约
            </button>
         </div>
      </div>
    </div>
  );
};

export default AgencyShopView;
