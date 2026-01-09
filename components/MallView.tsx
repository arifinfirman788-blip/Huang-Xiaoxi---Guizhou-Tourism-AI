
import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, ShoppingBag, Star, ShieldCheck, ChevronRight, Building2, Zap, Flame, Tag, ShoppingCart, Sparkles, Map, Mountain, BedDouble, Gift, TrendingUp, Clock, Bot } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const partnerAgencies = [
  { id: 'ag1', name: '天悦旅行社', logo: 'https://picsum.photos/id/1005/100/100', score: 5.0, badge: '官方认证', color: 'bg-indigo-600' },
  { id: 'ag2', name: '多彩贵州国旅', logo: 'https://picsum.photos/id/1015/100/100', score: 4.8, badge: '金牌商家', color: 'bg-emerald-600' },
  { id: 'ag3', name: '山水假日旅游', logo: 'https://picsum.photos/id/1036/100/100', score: 4.7, badge: '5A旅行社', color: 'bg-orange-600' },
];

const xiaoxiPicks = [
  { id: 'xp1', name: '【小西私藏】万峰林骑行+布依族扎染体验', price: 298, match: '99%', reason: '根据您的文艺偏好推荐', img: 'https://picsum.photos/id/1040/500/300', tag: '最顺路' },
  { id: 'xp2', name: '【错峰必选】黄果树半山私人汤屋酒店', price: 888, match: '95%', reason: '近期全网热度上升 40%', img: 'https://picsum.photos/id/164/500/300', tag: '口碑王' },
];

const mallProducts = [
  { id: 'p1', name: '黄果树VIP免排队特权包', price: 198, originalPrice: 250, agency: '天悦旅行社', category: '特权', img: 'https://picsum.photos/id/1018/300/200', tag: 'AI推荐', sales: '1.2k+', countdown: '02:45:12' },
  { id: 'p2', name: '苗家非遗长桌宴(专属席位)', price: 128, originalPrice: 158, agency: '多彩贵州国旅', category: '美食', img: 'https://picsum.photos/id/292/300/200', tag: '口碑', sales: '3k+', countdown: null },
  { id: 'p3', name: '西江千户苗寨旅拍精选套餐', price: 399, originalPrice: 599, agency: '天悦旅行社', category: '娱乐', img: 'https://picsum.photos/id/1036/300/200', tag: '爆款', sales: '800+', countdown: '05:12:00' },
  { id: 'p4', name: '梵净山索道往返+快速入园', price: 160, originalPrice: 180, agency: '山水假日旅游', category: '票务', img: 'https://picsum.photos/id/1040/300/200', tag: '官方', sales: '5k+', countdown: null },
];

const QuickEntryCard = ({ title, sub, img, icon: Icon, color }: any) => (
  <div className="relative group cursor-pointer overflow-hidden rounded-[2rem] h-24 shadow-sm border border-white transition-all active:scale-95">
    <img src={img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={title} />
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-85`}></div>
    <div className="absolute inset-0 p-4 flex flex-col justify-between">
      <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/10">
        <Icon size={18} />
      </div>
      <div>
        <div className="text-white font-black text-sm">{title}</div>
        <div className="text-white/70 text-[8px] font-bold uppercase tracking-wider">{sub}</div>
      </div>
    </div>
  </div>
);

const MallView: React.FC<Props> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('全部');

  const handleAgencyClick = (agencyName: string) => {
    if (agencyName === '天悦旅行社') {
       window.dispatchEvent(new CustomEvent('OPEN_AGENCY_SHOP'));
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] overflow-hidden">
      {/* 沉浸式搜索头部 */}
      <div className="bg-white/90 backdrop-blur-xl sticky top-0 z-40 border-b border-slate-100 shadow-sm shadow-slate-200/20">
         <div className="px-4 py-3 flex items-center gap-3">
            <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors"><ArrowLeft size={22} className="text-slate-700" /></button>
            <div className="flex-1 relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
               <input type="text" placeholder="搜索当地好物、导游推荐..." className="w-full bg-slate-100/80 border-none rounded-full h-10 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-100 outline-none font-medium" />
            </div>
            <div className="relative">
               <button className="p-2 text-slate-500 hover:text-indigo-600 transition-colors"><ShoppingCart size={20} /></button>
               <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border border-white shadow-sm"></span>
            </div>
         </div>
         
         <div className="flex px-4 pb-2 gap-6 overflow-x-auto no-scrollbar">
            {['全部', '尊享特权', '深度游玩', '特色美食', '酒店民宿'].map(cat => (
               <button 
                  key={cat} 
                  onClick={() => setActiveTab(cat)}
                  className={`text-xs font-black whitespace-nowrap pb-2 transition-all relative uppercase tracking-widest ${activeTab === cat ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
               >
                  {cat}
                  {activeTab === cat && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full animate-in zoom-in duration-300"></div>}
               </button>
            ))}
         </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
         {/* 1. 高颜值快捷入口卡片组 */}
         <section className="px-4 pt-6 pb-8 grid grid-cols-2 gap-3">
            <QuickEntryCard title="秘境景区" sub="Nature Escape" img="https://picsum.photos/id/1018/200/200" icon={Mountain} color="from-emerald-600 to-teal-900" />
            <QuickEntryCard title="云端酒店" sub="Dreamy Stay" img="https://picsum.photos/id/164/200/200" icon={BedDouble} color="from-indigo-600 to-blue-900" />
            <QuickEntryCard title="精选线路" sub="Expert Path" img="https://picsum.photos/id/1015/200/200" icon={Map} color="from-orange-600 to-rose-900" />
            <QuickEntryCard title="黔地特产" sub="Local Gifts" img="https://picsum.photos/id/102/200/200" icon={Gift} color="from-amber-500 to-orange-800" />
         </section>

         {/* 2. 黄小西精选 */}
         <section className="mb-12">
            <div className="px-4 flex justify-between items-center mb-5">
               <div>
                  <h3 className="font-black text-slate-800 text-lg flex items-center gap-2">
                     <Sparkles size={20} className="text-amber-500 fill-amber-500 animate-pulse" /> 黄小西今日精选
                  </h3>
                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest ml-7">AI Personalized Selection</p>
               </div>
               <button className="text-[10px] font-black text-indigo-600 flex items-center gap-1 uppercase bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100/50 hover:bg-indigo-100 transition-all">换一换 <TrendingUp size={12}/></button>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar px-4 snap-x">
               {xiaoxiPicks.map(item => (
                  <div key={item.id} className="min-w-[300px] bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden snap-center relative group hover:border-indigo-200 transition-all">
                     <div className="h-48 relative overflow-hidden">
                        <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="pick" />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-white">
                           <Bot size={14} className="text-indigo-600" />
                           <span className="text-[10px] font-black text-indigo-600 italic">Match {item.match}</span>
                        </div>
                        <div className="absolute top-4 right-4 bg-amber-500 text-white text-[9px] px-3 py-1 rounded-full font-black uppercase shadow-md border border-white/20">
                           {item.tag}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                           <div className="text-white/80 text-[10px] font-bold flex items-center gap-1 mb-1">
                              <Sparkles size={10} className="text-amber-300" /> {item.reason}
                           </div>
                           <h4 className="text-white font-black text-lg leading-tight line-clamp-1">{item.name}</h4>
                        </div>
                     </div>
                     <div className="p-5 flex justify-between items-center bg-white border-t border-slate-50">
                        <div>
                           <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Start From</div>
                           <div className="text-2xl font-black text-slate-900">¥{item.price}</div>
                        </div>
                        <button className="bg-slate-900 text-white px-7 py-3.5 rounded-2xl font-black text-xs shadow-lg shadow-slate-200 active:scale-95 transition-all hover:bg-black">立即开启</button>
                     </div>
                  </div>
               ))}
               <div className="min-w-[40px] shrink-0"></div>
            </div>
         </section>

         {/* 3. 合作机构 */}
         <section className="mb-12">
            <div className="mx-4 bg-slate-50/50 border border-slate-100 rounded-[2.5rem] py-6">
               <div className="px-5 flex justify-between items-center mb-5">
                  <h3 className="font-black text-slate-700 text-sm flex items-center gap-2 uppercase tracking-tight">
                     <ShieldCheck size={18} className="text-indigo-600" /> 合作优质旅行社
                  </h3>
                  <button className="text-[9px] font-black text-slate-400 flex items-center gap-1 uppercase bg-white px-2 py-1 rounded-lg border border-slate-100 shadow-sm">全部机构 <ChevronRight size={10}/></button>
               </div>
               <div className="flex gap-4 overflow-x-auto no-scrollbar px-5">
                  {partnerAgencies.map(agency => (
                     <div 
                        key={agency.id} 
                        onClick={() => handleAgencyClick(agency.name)}
                        className="bg-white p-3.5 rounded-[2.2rem] shadow-sm border border-white flex flex-col items-center min-w-[110px] active:scale-95 transition-transform cursor-pointer group hover:border-indigo-100"
                     >
                        <div className="w-14 h-14 rounded-2xl bg-slate-50 overflow-hidden mb-3 border border-slate-50 group-hover:border-indigo-100 transition-colors shadow-inner">
                           <img src={agency.logo} className="w-full h-full object-cover" alt="logo" />
                        </div>
                        <div className="text-[10px] font-black text-slate-800 mb-1 truncate w-full text-center tracking-tighter">{agency.name}</div>
                        <div className="flex items-center gap-0.5 text-[9px] text-orange-500 font-black mb-2">
                           <Star size={10} fill="currentColor" /> {agency.score}
                        </div>
                        <div className={`text-[8px] ${agency.color} text-white px-2.5 py-1 rounded-full font-black uppercase tracking-tighter shadow-sm`}>{agency.badge}</div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* 4. 瀑布流产品 */}
         <section className="px-4 pb-20">
            <div className="flex justify-between items-end mb-6">
               <div>
                  <h3 className="font-black text-slate-800 text-sm uppercase flex items-center gap-2 tracking-tighter">
                     <Flame size={18} className="text-rose-500 animate-bounce" /> 正在热抢 · 限量特惠
                  </h3>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest ml-6">Real-time Hot Flash Deals</p>
               </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               {mallProducts.map(p => (
                  <div key={p.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 group active:scale-[0.98] transition-all flex flex-col hover:border-indigo-100">
                     <div className="h-36 relative overflow-hidden shrink-0">
                        <img src={p.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="p" />
                        
                        {p.countdown && (
                           <div className="absolute top-2 left-2 bg-rose-600 text-white text-[8px] px-2 py-1 rounded-lg font-black flex items-center gap-1 shadow-lg backdrop-blur-sm border border-white/20">
                              <Clock size={8} /> {p.countdown}
                           </div>
                        )}
                        
                        <div className={`absolute ${p.countdown ? 'top-2 right-2' : 'top-2 left-2'} bg-black/60 backdrop-blur-md text-white text-[8px] px-2 py-1 rounded-lg font-black flex items-center gap-1 border border-white/10`}>
                           <Zap size={10} className="text-yellow-400 fill-yellow-400" /> {p.tag}
                        </div>

                        <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2 py-1.5 rounded-xl shadow-sm border border-white/50">
                           <Building2 size={10} className="text-indigo-600" />
                           <span className="text-[8px] font-black text-slate-700 truncate">{p.agency}</span>
                        </div>
                     </div>
                     <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                           <h4 className="font-black text-slate-800 text-xs line-clamp-2 h-8 mb-3 leading-tight group-hover:text-indigo-600 transition-colors">{p.name}</h4>
                           <div className="flex items-center gap-2 mb-3">
                              <div className="flex -space-x-1.5">
                                 {[1,2,3].map(i => <div key={i} className="w-4 h-4 rounded-full border border-white bg-slate-200 overflow-hidden shadow-sm"><img src={`https://i.pravatar.cc/100?u=${p.id}${i}`} /></div>)}
                              </div>
                              <span className="text-[8px] text-slate-400 font-black tracking-tighter">{p.sales} 人已购买</span>
                           </div>
                        </div>
                        <div className="flex justify-between items-end pt-2 border-t border-slate-50">
                           <div>
                              <div className="flex items-baseline gap-1">
                                 <span className="text-indigo-600 font-black text-sm">¥{p.price}</span>
                                 <span className="text-slate-300 text-[8px] line-through font-bold">¥{p.originalPrice}</span>
                              </div>
                           </div>
                           <button className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-md active:scale-90 transition-transform hover:bg-indigo-600">
                              <ShoppingBag size={16} />
                           </button>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </section>
      </div>

      {/* 悬浮工具 */}
      <div className="fixed bottom-28 right-6 z-50 flex flex-col gap-3">
         <button className="w-12 h-12 bg-white text-slate-600 rounded-2xl shadow-xl flex items-center justify-center border border-slate-50 active:scale-90 transition-transform hover:text-indigo-600">
            <Bot size={22} className="text-indigo-600" />
         </button>
         <button className="w-16 h-16 bg-indigo-600 text-white rounded-[2.2rem] shadow-2xl shadow-indigo-200 flex items-center justify-center active:scale-90 transition-transform border-4 border-white relative">
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-black w-6 h-6 rounded-full border-2 border-white flex items-center justify-center shadow-sm animate-bounce">2</span>
         </button>
      </div>
    </div>
  );
};

export default MallView;
