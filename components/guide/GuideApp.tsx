
import React, { useState, useRef, useEffect } from 'react';
import { 
  MapPin, Calendar, CheckCircle2, MessageSquare, Bell, Navigation, ShieldCheck, 
  LayoutGrid, User, Settings, Wallet, Camera, Languages, FileText, CreditCard, 
  BookOpen, ChevronRight, LogOut, Search, Mic, Send, AlertTriangle, CloudRain, 
  Users, Bot, ArrowLeft, Flag, Map, CircleDollarSign, QrCode, Award, Edit3, X, 
  CheckSquare, Square, Utensils, Phone, AlertCircle, Database, ShoppingCart, TrendingUp, Sparkles
} from 'lucide-react';
import MineView from '../MineView';

// --- Types & Mock Data ---
type GuideTab = 'itinerary' | 'apps' | 'message' | 'mine';

const tools = [
  { id: 'distribution', label: '意图分销', icon: QrCode, color: 'text-indigo-600 bg-indigo-50', isNew: true },
  { id: 'resource', label: '合作资源库', icon: Database, color: 'text-emerald-600 bg-emerald-50' },
  { id: 'fund', label: '备用金管理', icon: CircleDollarSign, color: 'text-orange-600 bg-orange-50' },
  { id: 'bill', label: '报销记账', icon: FileText, color: 'text-blue-600 bg-blue-50' },
  { id: 'photo', label: '拍照助手', icon: Camera, color: 'text-pink-600 bg-pink-50' },
  { id: 'trans', label: '多语种翻译', icon: Languages, color: 'text-purple-600 bg-purple-50' },
  { id: 'contract', label: '合同管理', icon: FileText, color: 'text-teal-600 bg-teal-50' },
  { id: 'nav', label: '大巴定位', icon: Navigation, color: 'text-slate-600 bg-slate-50' },
];

const mockDistItems = [
  { id: 'dp1', name: '黄果树VIP免排队权益', price: 198, comm: 25, icon: Navigation, scene: '前往景区途中或排队严重时推荐' },
  { id: 'dp2', name: '老凯俚酸汤鱼尊享晚餐', price: 288, comm: 35, icon: Utensils, scene: '行程快结束时推荐，导游协助留位' },
  { id: 'dp3', name: '苗寨旅拍精选A套餐', price: 399, comm: 80, icon: Camera, scene: '苗寨内自由活动时间推荐' },
];

const mockScheduleItems = [
  { id: 's1', time: "08:00", title: "酒店集合出发", status: "completed" },
  { id: 's2', time: "10:00", title: "抵达黄果树景区", status: "pending", isNext: true },
  { id: 's3', time: "12:30", title: "午餐: 瀑布轩餐厅", status: "pending" },
  { id: 's4', time: "14:00", title: "天星桥景区游览", status: "pending" },
  { id: 's5', time: "18:00", title: "晚餐: 苗家酸汤鱼", status: "pending" },
];

const GuideApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<GuideTab>('itinerary');
  const [currentView, setCurrentView] = useState<'main' | 'distribution'>('main');
  const [showQrGen, setShowQrGen] = useState<any>(null);

  const handleToolClick = (toolId: string) => {
     if (toolId === 'distribution') setCurrentView('distribution');
  };

  // --- New Views ---

  // 1. 意图分销应用视图 (应用板块内叠加)
  const DistributionView = () => (
     <div className="absolute inset-0 z-50 bg-slate-50 flex flex-col animate-in slide-in-from-right duration-300">
        <div className="bg-white px-4 py-3 flex items-center gap-4 border-b border-slate-100 shadow-sm">
           <button onClick={() => setCurrentView('main')}><ArrowLeft className="text-slate-700" /></button>
           <h2 className="font-bold text-lg">意图分销工具</h2>
        </div>
        
        <div className="p-4 space-y-4 overflow-y-auto pb-24">
           {/* 收益看板 */}
           <div className="bg-indigo-600 rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden">
              <TrendingUp className="absolute -right-4 -bottom-4 w-40 h-40 opacity-10" />
              <div className="relative z-10">
                 <div className="text-indigo-100 text-[10px] font-black uppercase tracking-widest mb-1">今日分润收益</div>
                 <div className="text-4xl font-black">¥ 458.00</div>
                 <div className="mt-4 flex gap-4">
                    <div className="bg-white/10 px-3 py-1 rounded-lg text-xs font-bold border border-white/5">成交: 6 笔</div>
                    <div className="bg-white/10 px-3 py-1 rounded-lg text-xs font-bold border border-white/5">意图码扫码: 24 次</div>
                 </div>
              </div>
           </div>

           {/* 可分销列表 */}
           <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                 <h3 className="font-bold text-slate-800">当前行程适配策略</h3>
                 <span className="text-[10px] text-slate-400 font-bold uppercase">Intent Recommended</span>
              </div>
              {mockDistItems.map(item => (
                 <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 active:scale-[0.98] transition-all">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 shrink-0">
                       <item.icon size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                       <div className="font-bold text-slate-800 text-sm truncate">{item.name}</div>
                       <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-rose-500 font-black">分润: ¥{item.comm}</span>
                          <span className="text-[10px] text-slate-300">|</span>
                          <span className="text-[10px] text-slate-400">场景: {item.scene}</span>
                       </div>
                    </div>
                    <button 
                       onClick={() => setShowQrGen(item)}
                       className="bg-indigo-600 text-white px-3 py-2 rounded-xl text-xs font-bold shadow-md shadow-indigo-100"
                    >
                       生成意图码
                    </button>
                 </div>
              ))}
           </div>
        </div>

        {/* 二维码生成遮罩 */}
        {showQrGen && (
           <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-6 animate-in zoom-in-95">
              <div className="bg-white w-full max-w-xs rounded-[3rem] p-8 flex flex-col items-center text-center shadow-2xl relative">
                 <button onClick={() => setShowQrGen(null)} className="absolute top-6 right-6 text-slate-300 hover:text-slate-500"><X size={24}/></button>
                 
                 <div className="bg-slate-50 p-6 rounded-[2.5rem] mb-6 border-2 border-dashed border-indigo-200">
                    <QrCode size={180} className="text-slate-800" />
                 </div>
                 
                 <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-indigo-200">
                    <Bot size={24} />
                 </div>
                 
                 <h4 className="font-bold text-lg text-slate-800 mb-2">{showQrGen.name}</h4>
                 <p className="text-xs text-slate-500 leading-relaxed">
                    游客扫码将由 <span className="text-indigo-600 font-bold">黄小西AI</span> 识别您的 <span className="text-indigo-600 font-bold">推荐意图</span> 并提供订购建议，跳过货架列表。
                 </p>
                 
                 <div className="mt-8 grid grid-cols-2 gap-3 w-full">
                    <button className="bg-slate-100 text-slate-700 py-3 rounded-2xl font-bold text-sm active:scale-95 transition-transform">分享到游客群</button>
                    <button className="bg-indigo-600 text-white py-3 rounded-2xl font-bold text-sm shadow-xl shadow-indigo-200 active:scale-95 transition-transform">保存到相册</button>
                 </div>
              </div>
           </div>
        )}
     </div>
  );

  // --- Original Views (Maintained per requirement) ---

  const ItineraryView = () => (
    <div className="space-y-4 p-4 pb-24 relative animate-in fade-in">
       <div className="bg-teal-600 rounded-2xl p-5 text-white shadow-lg shadow-teal-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10"><Navigation size={80} /></div>
          <div className="relative z-10">
             <div className="flex justify-between items-start mb-4">
                <div>
                   <div className="text-teal-100 text-xs font-medium mb-1 flex items-center gap-1"><span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>当前执行任务</div>
                   <h2 className="text-xl font-bold">黄果树+苗寨5日深度游</h2>
                   <div className="flex items-center gap-2 mt-1 opacity-90"><span className="text-xs font-mono bg-white/20 px-1.5 rounded">GZ-231215-A</span><span className="text-xs bg-orange-500 px-1.5 rounded font-bold">Day 2</span></div>
                </div>
             </div>
             <div className="grid grid-cols-3 gap-2 border-t border-teal-500/50 pt-3">
                <div className="text-center"><div className="text-xl font-bold">24</div><div className="text-[10px] text-teal-100">游客(人)</div></div>
                <div className="text-center border-l border-teal-500/50 group"><div className="text-xl font-bold text-orange-300">4</div><div className="text-[10px] text-orange-200 font-bold flex items-center justify-center gap-0.5"><AlertTriangle size={10} /> 风险</div></div>
                <div className="text-center border-l border-teal-500/50"><div className="text-xl font-bold">98%</div><div className="text-[10px] text-teal-100">满意度</div></div>
             </div>
          </div>
       </div>
       
       <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
          <div className="flex justify-between items-center mb-2"><span className="text-xs font-bold text-slate-400 uppercase">下一步操作</span><span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">待打卡</span></div>
          <div className="flex items-center gap-3 mb-4"><div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600"><MapPin size={24} /></div><div><h3 className="font-bold text-slate-800 text-lg">抵达黄果树景区入口</h3><p className="text-xs text-slate-500">计划时间: 10:00 · 剩余 25分钟</p></div></div>
          <button className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-orange-200 active:scale-95 transition-all flex items-center justify-center gap-2"><CheckCircle2 size={18} />立即打卡</button>
       </div>

       <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
             <div className="flex items-center gap-2"><h3 className="font-bold text-slate-800">今日行程</h3><span className="text-xs text-slate-400">12月12日</span></div>
             <button className="flex items-center gap-1 text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg active:scale-95 transition-transform"><Edit3 size={14} /> 申请调整</button>
          </div>
          {mockScheduleItems.map((item, idx) => (
             <div key={idx} className={`flex items-center gap-4 p-3 rounded-xl border ${item.isNext ? 'bg-orange-50 border-orange-200' : 'bg-white border-slate-100'}`}>
                <div className={`font-mono text-sm font-bold ${item.isNext ? 'text-orange-600' : 'text-slate-500'}`}>{item.time}</div>
                <div className={`w-3 h-3 rounded-full border-2 ${item.status === 'completed' ? 'bg-teal-500 border-teal-500' : item.isNext ? 'bg-white border-orange-500' : 'bg-slate-200 border-slate-200'}`}></div>
                <div className={`flex-1 text-sm font-medium ${item.status === 'completed' ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{item.title}</div>
                {item.status === 'completed' && <CheckCircle2 size={16} className="text-teal-500" />}
             </div>
          ))}
       </div>
    </div>
  );

  const AppsView = () => (
    <div className="p-4 space-y-6 pb-24 animate-in fade-in">
       <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-5 text-white shadow-lg">
          <h2 className="text-lg font-bold mb-1">导游工具箱</h2>
          <p className="text-xs text-blue-100 opacity-80">叠加智能意图分润，带团增收两不误</p>
       </div>

       <div>
          <h3 className="font-bold text-slate-800 mb-4 px-1">全功能应用</h3>
          <div className="grid grid-cols-4 gap-4">
             {tools.map(tool => (
                <div 
                  key={tool.id} 
                  onClick={() => handleToolClick(tool.id)}
                  className="flex flex-col items-center gap-2 cursor-pointer group"
                >
                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tool.color} shadow-sm group-active:scale-95 transition-transform relative`}>
                      <tool.icon size={24} />
                      {tool.isNew && <span className="absolute -top-1 -right-1 flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span></span>}
                   </div>
                   <span className="text-[10px] font-bold text-slate-600 text-center">{tool.label}</span>
                </div>
             ))}
          </div>
       </div>
    </div>
  );

  if (currentView === 'distribution') return <DistributionView />;

  return (
    <div className="flex flex-col h-full bg-slate-50 relative">
      <main className="flex-1 overflow-y-auto no-scrollbar">
         {activeTab === 'itinerary' && <ItineraryView />}
         {activeTab === 'apps' && <AppsView />}
         {activeTab === 'message' && <div className="p-8 text-center text-slate-400">消息列表加载中...</div>}
         {activeTab === 'mine' && <MineView />}
      </main>
      <div className="bg-white border-t border-slate-200 pb-safe z-40">
        <div className="grid grid-cols-4 h-16">
          <NavBtn active={activeTab === 'itinerary'} onClick={() => setActiveTab('itinerary')} icon={Calendar} label="行程" />
          <NavBtn active={activeTab === 'apps'} onClick={() => setActiveTab('apps')} icon={LayoutGrid} label="应用" />
          <NavBtn active={activeTab === 'message'} onClick={() => setActiveTab('message')} icon={MessageSquare} label="消息" />
          <NavBtn active={activeTab === 'mine'} onClick={() => setActiveTab('mine')} icon={User} label="我的" />
        </div>
      </div>
    </div>
  );
};

const NavBtn = ({active, onClick, icon: Icon, label}: any) => (
   <button onClick={onClick} className="flex flex-col items-center justify-center gap-1">
      <div className={`transition-colors ${active ? 'text-teal-600' : 'text-slate-400'}`}><Icon size={24} strokeWidth={active ? 2.5 : 2} /></div>
      <span className={`text-[10px] font-bold transition-colors ${active ? 'text-teal-600' : 'text-slate-400'}`}>{label}</span>
   </button>
);

export default GuideApp;
