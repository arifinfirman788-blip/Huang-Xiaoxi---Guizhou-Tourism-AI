
import React, { useState } from 'react';
import { 
  ArrowLeft, Search, Building2, Star, ShieldCheck, 
  ChevronRight, ShoppingBag, MapPin, Sparkles, 
  Flame, Award, Headphones, Phone, CheckCircle2, Ticket, Map, BedDouble, Plus
} from 'lucide-react';

interface Props {
  onBack: () => void;
}

const AgencyShopView: React.FC<Props> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('Home');

  const products = [
    { id: '1', name: '【旗舰专供】贵阳周边3日私享小团', price: 1299, img: 'https://picsum.photos/id/1015/300/200', tag: '爆款' },
    { id: '2', name: '西江千户苗寨·高端江景民宿套餐', price: 888, img: 'https://picsum.photos/id/1036/300/200', tag: '精选' },
    { id: '3', name: '梵净山一日游·含往返接送+快速票', price: 450, img: 'https://picsum.photos/id/1040/300/200', tag: '超值' },
  ];

  const guideStars = [
    { name: '王金牌', role: '高级导游', score: 5.0, avatar: 'https://picsum.photos/id/64/100/100' },
    { name: '李阿美', role: '民俗专家', score: 4.9, avatar: 'https://picsum.photos/id/106/100/100' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#f8fafc]">
      {/* Header Overlay */}
      <div className="relative h-56 bg-slate-900 overflow-hidden shrink-0">
        <img src="https://picsum.photos/id/1019/800/400" className="w-full h-full object-cover opacity-50" alt="banner" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        
        <button onClick={onBack} className="absolute top-10 left-4 p-2 bg-white/10 backdrop-blur-md rounded-full text-white active:scale-90 transition-transform">
          <ArrowLeft size={20} />
        </button>

        <div className="absolute bottom-6 left-6 flex items-center gap-4">
           <div className="w-16 h-16 bg-white rounded-2xl p-2 shadow-2xl border border-indigo-100 flex items-center justify-center">
              <Building2 size={32} className="text-indigo-600" />
           </div>
           <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-black text-white italic tracking-tighter">天悦旅行社</h1>
                <span className="bg-indigo-600 text-white text-[8px] font-black px-2 py-0.5 rounded-full border border-indigo-400 uppercase tracking-widest">Flagship Store</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="flex items-center gap-1 text-orange-400 text-[10px] font-black">
                    <Star size={10} fill="currentColor" /> 4.9 
                    <span className="text-white/60 font-medium ml-1">诚信示范机构</span>
                 </div>
                 <div className="w-px h-3 bg-white/20"></div>
                 <span className="text-white/60 text-[10px] font-bold">已服务 5.8w+ 游客</span>
              </div>
           </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-32 -mt-4 relative z-10 bg-[#f8fafc] rounded-t-[2.5rem] p-6">
        {/* Quality Promises */}
        <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6">
          <div className="flex flex-col items-center gap-1">
            <ShieldCheck size={18} className="text-indigo-600" />
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">官方质检</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Headphones size={18} className="text-indigo-600" />
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">24H 响应</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <CheckCircle2 size={18} className="text-indigo-600" />
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">价格透明</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Award size={18} className="text-indigo-600" />
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">售后无忧</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-4 gap-4 mb-8">
           {[
             { icon: Map, label: '精品路线', color: 'bg-blue-50 text-blue-600' },
             { icon: BedDouble, label: '品质酒店', color: 'bg-indigo-50 text-indigo-600' },
             { icon: Ticket, label: '景区特权', color: 'bg-emerald-50 text-emerald-600' },
             { icon: Building2, label: '关于我们', color: 'bg-slate-50 text-slate-600' },
           ].map((item, i) => (
             <div key={i} className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.color} shadow-sm border border-white/10`}>
                   <item.icon size={20} />
                </div>
                <span className="text-[10px] font-black text-slate-700">{item.label}</span>
             </div>
           ))}
        </div>

        {/* Shop Recommendations */}
        <section className="mb-8">
           <div className="flex justify-between items-center mb-4">
              <h2 className="font-black text-slate-800 text-sm flex items-center gap-2 uppercase tracking-widest">
                 <Flame size={16} className="text-rose-500" /> 店长力荐路线
              </h2>
              <button className="text-[10px] font-black text-indigo-600 flex items-center gap-1">查看全部 <ChevronRight size={12}/></button>
           </div>
           
           <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {products.map(p => (
                 <div key={p.id} className="min-w-[200px] bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 active:scale-95 transition-transform">
                    <div className="h-28 relative">
                       <img src={p.img} className="w-full h-full object-cover" alt="p" />
                       <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[8px] px-2 py-0.5 rounded-full font-black">
                          {p.tag}
                       </div>
                    </div>
                    <div className="p-4">
                       <h3 className="text-[11px] font-black text-slate-800 line-clamp-1 mb-2">{p.name}</h3>
                       <div className="flex justify-between items-center">
                          <span className="text-indigo-600 font-black text-sm">¥{p.price}</span>
                          {/* Fix: Added Plus icon from lucide-react */}
                          <button className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg active:scale-90 transition-transform">
                             <Plus size={14} />
                          </button>
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </section>

        {/* Top Guides */}
        <section>
           <h2 className="font-black text-slate-800 text-sm flex items-center gap-2 uppercase tracking-widest mb-4">
              <Award size={16} className="text-indigo-600" /> 天悦金牌导游库
           </h2>
           <div className="space-y-3">
              {guideStars.map((g, i) => (
                 <div key={i} className="flex items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-slate-100 group hover:border-indigo-200 transition-colors">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-100">
                       <img src={g.avatar} className="w-full h-full object-cover" alt="avatar" />
                    </div>
                    <div className="flex-1">
                       <div className="font-black text-slate-800 text-xs">{g.name}</div>
                       <div className="text-[10px] text-slate-400 font-bold">{g.role}</div>
                    </div>
                    <div className="flex flex-col items-end">
                       <div className="flex items-center gap-0.5 text-[10px] text-orange-500 font-black">
                          <Star size={10} fill="currentColor" /> {g.score}
                       </div>
                       <button className="mt-1 text-[10px] font-black text-indigo-600">去咨询</button>
                    </div>
                 </div>
              ))}
           </div>
        </section>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-28 left-0 right-0 px-6 z-50 pointer-events-none">
         <div className="max-w-md mx-auto flex justify-between pointer-events-auto">
            <button className="w-14 h-14 bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center text-slate-700 border border-slate-100 active:scale-90 transition-transform">
               <Phone size={20} />
               <span className="text-[8px] font-black uppercase mt-1">客服</span>
            </button>
            <button className="flex-1 ml-4 bg-indigo-600 text-white rounded-2xl shadow-[0_15px_30px_rgba(79,70,229,0.3)] font-black flex items-center justify-center gap-3 active:scale-[0.98] transition-all">
               <ShoppingBag size={20} />
               立即定制行程
            </button>
         </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default AgencyShopView;
