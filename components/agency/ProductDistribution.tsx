
import React, { useState, useMemo } from 'react';
import { 
  Plus, Bot, Edit3, Trash2, Sparkles, ArrowLeft, ArrowRight, 
  Save, Target, Clock, MapPin, ChevronRight, LayoutGrid, 
  Package, Check, ShoppingCart, CheckCircle2, AlertCircle, 
  ToggleLeft, ToggleRight, CloudRain, Users, Loader2, QrCode,
  Zap, Settings, Coins, ShieldCheck, Activity, Search
} from 'lucide-react';

// --- 数据模型 ---
interface ResourceItem {
  id: string;
  name: string;
  supplier: string;
  originalPrice: number; // 底价
  suggestedPrice: number; // 零售价
  category: string;
  cover: string;
  source: 'self' | 'hx';
}

interface StrategyItem {
  id: string;
  name: string;
  relatedProducts: string[];
  triggerScene: string;
  price: number;
  profit: number;
  guideComm: number;
  agencyProfit: number;
  status: 'active' | 'paused';
  showInMall: boolean; 
}

// --- Mock 资源数据 ---
const mockAllProducts: ResourceItem[] = [
  { id: 'p1', name: '【自营】黄果树摄影私享包车', supplier: '天逸车队', originalPrice: 880, suggestedPrice: 1280, category: '用车', cover: 'https://picsum.photos/id/1071/400/300', source: 'self' },
  { id: 'p2', name: '【自营】苗家非遗长桌宴', supplier: '西江餐饮部', originalPrice: 128, suggestedPrice: 198, category: '餐饮', cover: 'https://picsum.photos/id/292/400/300', source: 'self' },
  { id: 'p3', name: '黄果树VIP免排队通道', supplier: '黄果树旅投', originalPrice: 150, suggestedPrice: 198, category: '景区特权', cover: 'https://picsum.photos/id/1018/400/300', source: 'hx' },
  { id: 'p4', name: '西江旅拍精选A套餐', supplier: '西江影像', originalPrice: 350, suggestedPrice: 498, category: '娱乐', cover: 'https://picsum.photos/id/1036/400/300', source: 'hx' },
];

const scenarioTemplates = [
  { id: 'sc1', label: '景区排队太久', icon: Clock, desc: '排队超40分钟触发', color: 'text-orange-500' },
  { id: 'sc2', label: '进入特定区域', icon: MapPin, desc: 'LBS地理围栏触发', color: 'text-blue-500' },
  { id: 'sc3', label: '离团自由活动', icon: Users, desc: '解散队伍后触发', color: 'text-emerald-500' },
  { id: 'sc4', label: '导游现场引导', icon: QrCode, desc: '导游扫意图码触发', color: 'text-indigo-500' },
  { id: 'sc5', label: '自定义场景', icon: Settings, desc: '手动配置特殊条件', color: 'text-slate-500' },
];

const initialStrategies: StrategyItem[] = [
  { id: 'st1', name: '黄果树VIP免排队策略', relatedProducts: ['p3'], triggerScene: '景区排队太久', price: 198, profit: 48, guideComm: 15, agencyProfit: 33, status: 'active', showInMall: true },
  { id: 'st2', name: '【尊享】摄影包车+长桌宴', relatedProducts: ['p1', 'p2'], triggerScene: '离团自由活动', price: 1478, profit: 470, guideComm: 150, agencyProfit: 320, status: 'active', showInMall: false },
];

const ProductDistribution: React.FC = () => {
  const [strategies, setStrategies] = useState<StrategyItem[]>(initialStrategies);
  const [isAdding, setIsAdding] = useState(false);
  const [step, setStep] = useState(1); 
  
  // 表单状态
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('sc1');
  const [sellingPoints, setSellingPoints] = useState('');
  const [aiText, setAiText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [customScenario, setCustomScenario] = useState('');
  
  // AI 诊断状态
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<{status: 'none' | 'loading' | 'success' | 'warning', text: string}>({ status: 'none', text: '' });

  // 利润分成状态
  const [guideCommRate, setGuideCommRate] = useState(30); // 导游分成比例 %

  const selectedProducts = useMemo(() => 
    mockAllProducts.filter(p => selectedProductIds.includes(p.id)), 
  [selectedProductIds]);

  const totalPrice = useMemo(() => selectedProducts.reduce((acc, p) => acc + p.suggestedPrice, 0), [selectedProducts]);
  const totalCost = useMemo(() => selectedProducts.reduce((acc, p) => acc + p.originalPrice, 0), [selectedProducts]);
  const totalProfit = totalPrice - totalCost;
  const guideComm = Math.round(totalProfit * (guideCommRate / 100));
  const agencyProfit = totalProfit - guideComm;

  const toggleProductSelection = (id: string) => {
    setSelectedProductIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleGenerateAiText = () => {
    if (selectedProductIds.length === 0) return;
    setIsGenerating(true);
    setTimeout(() => {
      const productNames = selectedProducts.map(p => p.name).join(' + ');
      setAiText(`哈喽！我是黄小西。检测到您当前的行程环境。王导特意为您申请了【${productNames}】的专属优惠！${sellingPoints || '该方案能帮您节省排队时间，体验更地道。'} 仅需点击下方按钮即可开启绿色通道。`);
      setIsGenerating(false);
    }, 1200);
  };

  const handleDiagnose = () => {
    setIsDiagnosing(true);
    setDiagnosisResult({ status: 'loading', text: 'AI 正在模拟游客行为路径...' });
    setTimeout(() => {
      setIsDiagnosing(false);
      setDiagnosisResult({ 
        status: 'success', 
        text: '诊断通过：触发逻辑严密，文案与场景契合度 96%，预计转化提升 25%。' 
      });
    }, 2000);
  };

  const handleFinish = () => {
    const newStrategy: StrategyItem = {
      id: Date.now().toString(),
      name: selectedProducts.length > 1 ? `组合策略-${Date.now()}` : `${selectedProducts[0]?.name}策略`,
      relatedProducts: selectedProductIds,
      triggerScene: scenarioTemplates.find(s => s.id === selectedScenarioId)?.label || '自定义',
      price: totalPrice,
      profit: totalProfit,
      guideComm: guideComm,
      agencyProfit: agencyProfit,
      status: 'active',
      showInMall: true
    };
    setStrategies([newStrategy, ...strategies]);
    setIsAdding(false);
  };

  const toggleMallDisplay = (id: string) => {
    setStrategies(prev => prev.map(st => st.id === id ? { ...st, showInMall: !st.showInMall } : st));
  };

  if (isAdding) {
    return (
      <div className="max-w-7xl mx-auto pb-20 animate-in fade-in duration-300">
         <div className="flex items-center justify-between mb-8 bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
            <div className="flex items-center gap-6">
               <button onClick={() => { if(step === 1) setIsAdding(false); else setStep(step - 1); }} className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-colors">
                  <ArrowLeft size={20} className="text-slate-500" />
               </button>
               <div>
                  <h1 className="text-2xl font-black text-slate-800">
                     {step === 1 && '第 1/3 步：挑选策略商品'}
                     {step === 2 && '第 2/3 步：配置触发与文案'}
                     {step === 3 && '第 3/3 步：设置分润比例'}
                  </h1>
                  <div className="flex gap-2 mt-2">
                     {[1, 2, 3].map(i => (
                        <div key={i} className={`h-1.5 w-12 rounded-full transition-all ${step >= i ? 'bg-indigo-600' : 'bg-slate-200'}`}></div>
                     ))}
                  </div>
               </div>
            </div>
            {step < 3 ? (
               <button 
                  disabled={selectedProductIds.length === 0}
                  onClick={() => setStep(step + 1)} 
                  className="bg-indigo-600 disabled:bg-slate-200 text-white px-10 py-3 rounded-2xl font-black shadow-xl shadow-indigo-100 flex items-center gap-2"
               >
                  下一步 <ArrowRight size={18} />
               </button>
            ) : (
               <button 
                  onClick={handleFinish}
                  className="bg-emerald-600 text-white px-10 py-3 rounded-2xl font-black shadow-xl shadow-emerald-100 flex items-center gap-2"
               >
                  <Save size={18} /> 发布策略
               </button>
            )}
         </div>

         {/* 第一步：商品选择 */}
         {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
               {mockAllProducts.map(p => (
                  <div key={p.id} onClick={() => toggleProductSelection(p.id)} className={`group bg-white rounded-[2rem] border-2 transition-all p-4 shadow-sm cursor-pointer relative ${selectedProductIds.includes(p.id) ? 'border-indigo-600 ring-4 ring-indigo-50' : 'border-transparent hover:border-slate-200'}`}>
                     <div className={`absolute top-6 right-6 w-6 h-6 rounded-full border-2 flex items-center justify-center z-10 ${selectedProductIds.includes(p.id) ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white/80 border-slate-300 text-transparent'}`}><Check size={14} strokeWidth={4} /></div>
                     <div className="h-40 rounded-[1.5rem] overflow-hidden mb-4"><img src={p.cover} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.name} /></div>
                     <div className="px-1">
                        <div className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1">{p.source === 'self' ? '自营' : '精选库'}</div>
                        <h4 className="font-bold text-slate-800 text-sm line-clamp-1 mb-3">{p.name}</h4>
                        <div className="flex justify-between items-end">
                           <div>
                              <div className="text-[10px] text-slate-400 font-bold">成本 ¥{p.originalPrice}</div>
                              <div className="text-sm font-black text-slate-800">零售价 ¥{p.suggestedPrice}</div>
                           </div>
                           <div className="text-right"><div className="text-[10px] text-emerald-600 font-bold">利润 ¥{p.suggestedPrice - p.originalPrice}</div></div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         )}

         {/* 第二步：配置触发与诊断 */}
         {step === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in slide-in-from-right-8 duration-500">
               <div className="lg:col-span-8 space-y-6">
                  <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-10">
                     <div>
                        <h3 className="font-black text-2xl text-slate-800 mb-6 flex items-center gap-3"><Target size={24} className="text-indigo-600" /> 1. 何时推荐给游客？</h3>
                        <div className="grid grid-cols-3 gap-4">
                           {scenarioTemplates.map(sc => (
                              <div key={sc.id} onClick={() => setSelectedScenarioId(sc.id)} className={`p-5 rounded-[2rem] border-2 cursor-pointer transition-all ${selectedScenarioId === sc.id ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-4 ring-indigo-50' : 'border-slate-100 hover:border-slate-300 bg-slate-50'}`}>
                                 <div className={`w-10 h-10 rounded-xl mb-3 flex items-center justify-center ${selectedScenarioId === sc.id ? 'bg-indigo-600 text-white' : 'bg-white shadow-sm'}`}><sc.icon size={20} className={selectedScenarioId === sc.id ? '' : sc.color} /></div>
                                 <span className="font-black text-sm text-slate-800 block mb-1">{sc.label}</span>
                                 <p className="text-[10px] text-slate-500 leading-tight">{sc.desc}</p>
                              </div>
                           ))}
                        </div>
                        {selectedScenarioId === 'sc5' && (
                           <input 
                              type="text" 
                              value={customScenario}
                              onChange={(e) => setCustomScenario(e.target.value)}
                              placeholder="描述具体触发场景，如：天气转雨且气温低于15度..."
                              className="w-full mt-4 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm outline-none focus:ring-4 focus:ring-indigo-100"
                           />
                        )}
                     </div>

                     <div>
                        <h3 className="font-black text-2xl text-slate-800 mb-6 flex items-center gap-3"><Sparkles size={24} className="text-purple-600" /> 2. 推荐语润色</h3>
                        <div className="space-y-4">
                           <div className="flex gap-2">
                              <input type="text" value={sellingPoints} onChange={(e) => setSellingPoints(e.target.value)} placeholder="输入核心卖点关键词..." className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm outline-none focus:ring-4 focus:ring-indigo-100" />
                              <button onClick={handleGenerateAiText} className="bg-slate-900 text-white px-6 rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-black transition-all active:scale-95"><Bot size={18} /> AI 润色</button>
                           </div>
                           <div className="bg-slate-900 rounded-[2.5rem] p-8 text-slate-200 text-base leading-relaxed min-h-[120px] relative">
                              {isGenerating && <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 rounded-[2.5rem] backdrop-blur-sm z-10"><Loader2 size={32} className="animate-spin text-indigo-400" /></div>}
                              {aiText || "AI 将为您生成对话式文案..."}
                           </div>
                        </div>
                     </div>

                     <div className="pt-6 border-t border-slate-100">
                        <div className="flex items-center justify-between">
                           <div>
                              <h4 className="font-black text-slate-800 flex items-center gap-2"><Zap size={18} className="text-yellow-500" /> 策略健康度诊断</h4>
                              <p className="text-xs text-slate-400 mt-1">检测当前文案、商品与触发条件的逻辑合规性</p>
                           </div>
                           <button 
                              onClick={handleDiagnose}
                              disabled={!aiText || isDiagnosing}
                              className="bg-white border-2 border-indigo-600 text-indigo-600 px-6 py-2.5 rounded-xl font-black text-sm hover:bg-indigo-50 transition-all flex items-center gap-2 disabled:opacity-50"
                           >
                              {isDiagnosing ? <Loader2 size={16} className="animate-spin" /> : <Activity size={16} />}
                              一键诊断
                           </button>
                        </div>
                        {diagnosisResult.status !== 'none' && (
                           <div className={`mt-4 p-4 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2 ${diagnosisResult.status === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : 'bg-blue-50 text-blue-800'}`}>
                              {diagnosisResult.status === 'loading' ? <Loader2 size={16} className="animate-spin mt-1" /> : <CheckCircle2 size={16} className="mt-1" />}
                              <p className="text-sm font-medium">{diagnosisResult.text}</p>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
               
               <div className="lg:col-span-4 flex flex-col items-center">
                  <div className="bg-slate-800 p-4 rounded-[4rem] border-[10px] border-slate-900 h-[600px] shadow-2xl relative w-full">
                     <div className="bg-white rounded-[3.5rem] h-full overflow-hidden flex flex-col relative">
                        <div className="h-6 w-full bg-white flex items-center justify-center"><div className="w-16 h-4 bg-slate-900 rounded-b-xl"></div></div>
                        <div className="flex-1 bg-slate-50/50 p-4 space-y-4 overflow-y-auto no-scrollbar">
                           <div className="flex gap-2">
                              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 shadow-lg"><Bot size={16} className="text-white" /></div>
                              <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm text-[10px] text-slate-600 border border-slate-100 animate-in slide-in-from-left-2">{aiText || '您好！我是您的智能助手黄小西...'}</div>
                           </div>
                           <div className="bg-white rounded-3xl shadow-xl border border-indigo-100 overflow-hidden ml-8 animate-in slide-in-from-bottom-4">
                              <div className="h-28 bg-indigo-600 relative overflow-hidden"><div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div></div>
                              <div className="p-4"><div className="font-black text-slate-800 text-[10px] truncate mb-2">已关联：{selectedProducts.length}款精品</div><button className="w-full bg-slate-900 text-white py-2 rounded-xl text-[9px] font-black">立即订购</button></div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {/* 第三步：分润配置 */}
         {step === 3 && (
            <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
               <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-8">
                  <div className="flex items-center gap-4 mb-8">
                     <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-600 flex items-center justify-center text-white shadow-lg"><Coins size={32}/></div>
                     <div>
                        <h3 className="text-2xl font-black text-slate-800">收益分配设定</h3>
                        <p className="text-sm text-slate-500">基于“导游分销/扫码”场景，设定导游与旅行社的利润分成。</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                     <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                        <div className="text-xs text-slate-400 font-bold uppercase mb-2">商品底价总计</div>
                        <div className="text-2xl font-black text-slate-800">¥{totalCost}</div>
                     </div>
                     <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                        <div className="text-xs text-slate-400 font-bold uppercase mb-2">建议零售总计</div>
                        <div className="text-2xl font-black text-indigo-600">¥{totalPrice}</div>
                     </div>
                  </div>

                  <div className="p-8 bg-indigo-50/50 rounded-[2.5rem] border border-indigo-100 space-y-6">
                     <div className="flex justify-between items-center">
                        <span className="font-black text-slate-700">导游分润比例</span>
                        <div className="flex items-center gap-4">
                           <input 
                              type="range" 
                              min="0" 
                              max="100" 
                              value={guideCommRate} 
                              onChange={(e) => setGuideCommRate(Number(e.target.value))}
                              className="w-48 h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" 
                           />
                           <span className="font-black text-indigo-600 w-12 text-right">{guideCommRate}%</span>
                        </div>
                     </div>

                     <div className="h-px bg-indigo-100 w-full"></div>

                     <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                           <span className="text-slate-500 font-bold">单笔总毛利</span>
                           <span className="font-black text-slate-800">¥{totalProfit}</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-slate-500 font-bold flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-400"></div> 导游分润 (D端)</span>
                           <span className="font-black text-orange-500 text-xl">¥{guideComm}</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-slate-500 font-bold flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div> 旅行社净利 (B端)</span>
                           <span className="font-black text-blue-600 text-xl">¥{agencyProfit}</span>
                        </div>
                     </div>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex items-start gap-3">
                     <ShieldCheck size={18} className="text-amber-600 mt-1" />
                     <p className="text-xs text-amber-800 leading-relaxed">
                        <span className="font-black">智能风控建议：</span> 
                        当前分成比例处于市场平均水平。系统检测到所选商品【黄果树VIP通道】为爆款，导游参与度预计极高。
                     </p>
                  </div>
               </div>
            </div>
         )}
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 flex justify-between items-center relative overflow-hidden">
         <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
         <div className="relative z-10">
            <h2 className="font-black text-3xl text-slate-800 flex items-center gap-4">
               <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg"><Target size={24} /></div>
               AI 策略管理中心
            </h2>
            <p className="text-sm text-slate-500 mt-3 font-medium">配置行程中的智能推荐逻辑，实现从分发到分润的自动化闭环。</p>
         </div>
         <button onClick={() => { setIsAdding(true); setStep(1); setSelectedProductIds([]); setDiagnosisResult({status:'none', text:''}); setAiText(''); }} className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl hover:bg-indigo-700 transition-all flex items-center gap-3 active:scale-95 group">
            <Plus size={24} className="group-hover:rotate-90 transition-transform" /> 配置新策略
         </button>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
         <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/50 text-slate-500 font-black border-b border-slate-100 uppercase tracking-tighter">
               <tr>
                  <th className="px-8 py-6">策略名称</th>
                  <th className="px-8 py-6">触发场景 (AI)</th>
                  <th className="px-8 py-6 text-center">传统商城展示</th>
                  <th className="px-8 py-6">价格/利润</th>
                  <th className="px-8 py-6">导游分成</th>
                  <th className="px-8 py-6 text-right">管理</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
               {strategies.map(st => (
                  <tr key={st.id} className="hover:bg-indigo-50/20 transition-all group">
                     <td className="px-8 py-6"><div className="font-black text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">{st.name}</div><div className="text-[10px] text-slate-400 font-bold mt-1">关联 {st.relatedProducts.length} 个资源</div></td>
                     <td className="px-8 py-6"><span className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-100 px-4 py-2 rounded-2xl"><Bot size={14} className="text-indigo-600" /> {st.triggerScene}</span></td>
                     <td className="px-8 py-6 text-center">
                        <button onClick={() => toggleMallDisplay(st.id)} className={`p-1 rounded-full transition-all inline-flex items-center ${st.showInMall ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                           {st.showInMall ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                        </button>
                     </td>
                     <td className="px-8 py-6"><div className="flex flex-col"><span className="text-indigo-600 font-black text-lg">¥{st.price}</span><span className="text-emerald-600 text-[10px] font-bold">单笔毛利 ¥{st.profit}</span></div></td>
                     <td className="px-8 py-6"><div className="flex flex-col"><span className="text-orange-500 font-black text-lg">¥{st.guideComm}</span><span className="text-[10px] text-slate-400 font-bold">导游分得</span></div></td>
                     <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-3"><button className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-2xl transition-all shadow-sm border border-transparent hover:border-slate-200"><Edit3 size={18} /></button><button className="p-3 text-slate-400 hover:text-red-500 hover:bg-white rounded-2xl transition-all shadow-sm border border-transparent hover:border-slate-200"><Trash2 size={18} /></button></div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  );
};

export default ProductDistribution;
