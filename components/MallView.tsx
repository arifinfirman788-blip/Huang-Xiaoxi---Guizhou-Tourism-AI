
import React, { useState } from 'react';
import { 
  /* Add missing icons to the imports */
  ArrowLeft, ArrowRight, Bot, Plus, Search, Filter, ShoppingBag, Star, ShieldCheck, 
  ChevronRight, Building2, Zap, Flame, Tag, ShoppingCart, 
  Map, BedDouble, Landmark, Gift, Ticket, Camera, Sparkles, 
  TrendingUp, Award, Clock
} from 'lucide-react';

interface Props {
  onBack: () => void;
}

// 快速入口配置
const quickEntries = [
  { id: '1', label: '景区门票', icon: Ticket, color: 'from-blue-500 to-indigo-600', shadow: 'shadow-blue-200' },
  { id: '2', label: '品质酒店', icon: BedDouble, color: 'from-emerald-400 to-teal-600', shadow: 'shadow-teal-200' },
  { id: '3', label: '精品线路', icon: Map, color: 'from-orange-400 to-rose-500', shadow: 'shadow-rose-200' },
  { id: '4', label: '地道特产', icon: Gift, color: 'from-purple-500 to-fuchsia-600', shadow: 'shadow-fuchsia-200' },
];

// 旅行社品牌
const partnerAgencies = [
  { id: 'ag1', name: '天逸旅行社', logo: 'https://picsum.photos/id/1005/100/100', score: 4.9, badge: '官方示范' },
  { id: 'ag2', name: '多彩贵州国旅', logo: 'https://picsum.photos/id/1015/100/100', score: 4.8, badge: '金牌商家' },
  { id: 'ag3', name: '山水假日旅游', logo: 'https://picsum.photos/id/1036/100/100', score: 4.7, badge: '5A机构' },
];

// 黄小西精选（高转化营销项）
const editorPicks = [
  { 
    id: 'ep1', 
    name: '【黄小西力荐】黄果树深度私享包车', 
    price: 880, 
    originalPrice: 1280, 
    agency: '天逸旅行社', 
    img: 'https://picsum.photos/id/1071/500/300', 
    tag: '爆款', 
    reason: 'AI 匹配：您的行程更适合此包车方案' 
  },
  { 
    id: 'ep2', 
    name: '苗家非遗长桌宴·官方预留位', 
    price: 158, 
    originalPrice: 198, 
    agency: '多彩贵州国旅', 
    img: 'https://picsum.photos/id/292/500/300', 
    tag: '必吃', 
    reason: '98% 游客选择此餐食方案' 
  },
];

// 普通产品列表
const mallProducts = [
  { id: 'p1', name: '黄果树VIP免排队特权包', price: 198, originalPrice: 250, agency: '天逸旅行社', category: '特权', img: 'https://picsum.photos/id/1018/300/200', tag: '省时', sales: '1.2k+' },
  { id: 'p3', name: '西江千户苗寨旅拍精选套餐', price: 399, originalPrice: 599, agency: '天逸旅行社', category: '娱乐', img: 'https://picsum.photos/id/1036/300/200', tag: '流行', sales: '800+' },
  { id: 'p4', name: '梵净山快速入园+索道往返', price: 160, originalPrice: 180, agency: '山水假日旅游', category: '票务', img: 'https://picsum.photos/id/1040/300/200', tag: '推荐', sales: '5k+' },
];

const MallView: React.FC<Props> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('全部');

  return (
    <div className="flex flex-col h-full bg-[#f8fafc]">
      {/* 1. 沉浸式搜索与导航 */}
      <div className="bg-white/90 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100 px-4 pt-3">
         <div className="flex items-center gap-3 mb-4">
            <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors active:scale-90"><ArrowLeft size={22} className="text-slate-700" /></button>
            <div className="flex-1 relative">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
               <input type="text" placeholder="探索贵州地道好物..." className="w-full bg-slate-100 border-none rounded-full h-11 pl-11 pr-4 text-sm focus:ring-2 focus:ring-indigo-100 outline-none font-medium" />
            </div>
            <button className="p-2 text-slate-500"><Filter size={20} /></button>
         </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
         
         {/* 2. 高颜值入口矩阵 - 视觉重心 */}
         <section className="px-4 py-6 grid grid-cols-4 gap-4 bg-white mb-2">
            {quickEntries.map(entry => (
               <div key={entry.id} className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${entry.color} ${entry.shadow} flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform group-hover:-translate-y-1 duration-300`}>
                     <entry.icon size={28} />
                  </div>
                  <span className="text-xs font-black text-slate-700">{entry.label}</span>
               </div>
            ))}
         </section>

         {/* 3. 动态营销 Banner */}
         <section className="px-4 py-2">
            <div className="bg-slate-900 rounded-[2.5rem] p-6 text-white relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 p-4 opacity-20"><Sparkles size={120} className="text-indigo-400" /></div>
               <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                     <span className="bg-indigo-600 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">AI Matching</span>
                     <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Exclusive Offers</span>
                  </div>
                  <h2 className="text-2xl font-black italic tracking-tighter mb-1">根据您的行程</h2>
                  <p className="text-sm font-bold text-slate-400">AI 已为您匹配了 3 个省钱组合</p>
                  <button className="mt-4 flex items-center gap-1 bg-white text-slate-900 px-4 py-2 rounded-xl text-xs font-black shadow-lg">立即查看 <ArrowRight size={14} /></button>
               </div>
            </div>
         </section>

         {/* 4. 黄小西精选 (Horizontal Scroller) */}
         <section className="py-8">
            <div className="px-4 flex justify-between items-center mb-5">
               <div>
                  <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                     <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white"><Sparkles size={18} /></div>
                     黄小西精选
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest ml-10">AI Curated Top Picks</p>
               </div>
               <button className="text-xs font-black text-indigo-600 flex items-center gap-1">换一批 <TrendingUp size={14}/></button>
            </div>
            
            <div className="flex gap-4 overflow-x-auto no-scrollbar px-4 pb-4 snap-x">
               {editorPicks.map(pick => (
                  <div key={pick.id} className="min-w-[280px] bg-white rounded-[2.5rem] shadow-xl shadow-indigo-900/5 border border-slate-100 overflow-hidden snap-start active:scale-95 transition-transform">
                     <div className="h-44 relative">
                        <img src={pick.img} className="w-full h-full object-cover" alt="pick" />
                        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] px-3 py-1.5 rounded-full font-black flex items-center gap-1.5 border border-white/10">
                           <Flame size={12} className="text-orange-500 fill-orange-500" /> {pick.tag}
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 bg-indigo-600/90 backdrop-blur-md text-white text-[9px] px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5">
                           <Bot size={12} /> {pick.reason}
                        </div>
                     </div>
                     <div className="p-5">
                        <h4 className="font-black text-slate-800 text-sm leading-tight line-clamp-1 mb-3">{pick.name}</h4>
                        <div className="flex justify-between items-end">
                           <div>
                              <div className="flex items-center gap-2 mb-1">
                                 <span className="text-2xl font-black text-indigo-600">¥{pick.price}</span>
                                 <span className="text-xs text-slate-300 line-through">¥{pick.originalPrice}</span>
                              </div>
                              <div className="flex items-center gap-1 text-[9px] text-slate-400 font-bold uppercase">
                                 <Building2 size={10} /> {pick.agency}
                              </div>
                           </div>
                           <button className="bg-slate-900 text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg active:scale-90 transition-transform">
                              <ShoppingCart size={20} />
                           </button>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </section>

         {/* 5. 认证旅行社专区 */}
         <section className="px-4 mb-8">
            <div className="bg-slate-50 rounded-[2rem] p-5">
               <div className="flex justify-between items-center mb-4 px-2">
                  <h3 className="font-black text-slate-800 text-sm flex items-center gap-2">
                     <ShieldCheck size={18} className="text-indigo-600" /> 认证旅行社旗舰店
                  </h3>
                  <ChevronRight size={16} className="text-slate-400" />
               </div>
               <div className="flex gap-4 overflow-x-auto no-scrollbar">
                  {partnerAgencies.map(agency => (
                     <div key={agency.id} className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center min-w-[120px] active:scale-95 transition-transform cursor-pointer group">
                        <div className="w-14 h-14 rounded-2xl bg-slate-50 overflow-hidden mb-3 border border-slate-50 group-hover:border-indigo-100 transition-colors">
                           <img src={agency.logo} className="w-full h-full object-cover" alt="logo" />
                        </div>
                        <div className="text-[10px] font-black text-slate-800 mb-1 truncate w-full text-center">{agency.name}</div>
                        <div className="flex items-center gap-1 text-[8px] text-orange-500 font-black">
                           <Star size={8} fill="currentColor" /> {agency.score}
                        </div>
                        <div className="mt-2 text-[7px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-black uppercase">{agency.badge}</div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* 6. 混合产品信息流 */}
         <section className="px-4 space-y-4">
            <div className="flex justify-between items-center mb-2 px-1">
               <h3 className="font-black text-slate-800 text-sm uppercase tracking-tighter">更多优选 · 地道贵州</h3>
               <div className="flex gap-4">
                  {['全部', '特权', '美食', '门票'].map(t => (
                     <span key={t} className={`text-[10px] font-black uppercase tracking-widest ${activeTab === t ? 'text-indigo-600 underline underline-offset-4' : 'text-slate-400'}`} onClick={() => setActiveTab(t)}>{t}</span>
                  ))}
               </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               {mallProducts.map(p => (
                  <div key={p.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 group active:scale-[0.98] transition-all">
                     <div className="h-36 relative overflow-hidden">
                        <img src={p.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="p" />
                        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[8px] px-2 py-1 rounded-full font-black flex items-center gap-1">
                           <Tag size={10} className="text-yellow-400" /> {p.tag}
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-2 py-1 rounded-xl shadow-sm">
                           <Building2 size={10} className="text-indigo-600" />
                           <span className="text-[8px] font-black text-slate-700 truncate">{p.agency}</span>
                        </div>
                     </div>
                     <div className="p-4">
                        <h4 className="font-black text-slate-800 text-xs line-clamp-2 h-8 mb-3 leading-tight">{p.name}</h4>
                        <div className="flex justify-between items-end">
                           <div>
                              <div className="flex items-center gap-1">
                                 <span className="text-indigo-600 font-black text-sm">¥{p.price}</span>
                                 <span className="text-slate-300 text-[8px] line-through">¥{p.originalPrice}</span>
                              </div>
                              <div className="text-[8px] text-slate-400 font-bold mt-1 tracking-tighter">{p.sales} 人已订</div>
                           </div>
                           <button className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all active:scale-90">
                              <Plus size={18} />
                           </button>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </section>
      </div>

      {/* 7. 悬浮浮窗 - 快速购物车 */}
      <div className="fixed bottom-28 right-6 z-50">
         <button className="w-16 h-16 bg-indigo-600 text-white rounded-[2rem] shadow-[0_15px_30px_rgba(79,70,229,0.4)] flex items-center justify-center active:scale-90 transition-transform border-4 border-white">
            <div className="relative">
               <ShoppingCart size={24} />
               <span className="absolute -top-3 -right-3 bg-rose-500 text-white text-[10px] font-black w-6 h-6 rounded-full border-2 border-white flex items-center justify-center shadow-sm">2</span>
            </div>
         </button>
      </div>

      {/* 8. 底部温馨提示栏 */}
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-white/80 backdrop-blur-lg border-t border-slate-100 flex items-center justify-center px-6 z-40">
         <div className="flex items-center gap-3 text-slate-400">
            <Clock size={16} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">官方直营 · 24H 极速退款保障 · 1V1 专属管家</span>
         </div>
      </div>
    </div>
  );
};

export default MallView;
