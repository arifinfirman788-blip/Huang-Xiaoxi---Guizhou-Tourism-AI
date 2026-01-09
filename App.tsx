
import React, { useState } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import ItineraryTimeline from './components/ItineraryTimeline';
import HomeView from './components/HomeView';
import ExpertListView from './components/ExpertListView';
import AgentChatView from './components/AgentChatView';
import QuickMenuOverlay from './components/QuickMenuOverlay';
import AgencyApp from './components/agency/AgencyApp';
import GuideApp from './components/guide/GuideApp';
import MineView from './components/MineView';
import { ServiceItem, UserRole } from './types';
import { 
  Smartphone, LayoutDashboard, ArrowRight, UserCircle2, 
  Workflow, Database, ShieldCheck, Network, Cpu, Layers, 
  CheckCircle2, Users, Sparkles, Server, Bot, 
  FileText, CreditCard, MapPin, AlertTriangle, Search, Flag, Briefcase,
  MessagesSquare, Camera, Wallet, Globe, BookOpen, Megaphone, Store, Share2, PenTool,
  ChevronDown, X, MonitorPlay, Zap, Headphones, FileBarChart, Receipt, Languages, CircleDollarSign,
  Building2, LineChart, MessageCircle, Plus, Gavel, Scale, Truck, Utensils, BedDouble, Landmark,
  QrCode, ShoppingCart, Coins, TrendingUp
} from 'lucide-react';

// --- 3. MOBILE APP WRAPPER (Responsive Phone Simulator) ---
const MobileWrapper: React.FC<{ children: React.ReactNode; onBack: () => void }> = ({ children, onBack }) => (
     <div className="min-h-[100dvh] w-full bg-[#cbd5e1] md:bg-slate-200 flex items-center justify-center font-sans overflow-hidden relative">
        {/* Back to Portal Button (Desktop) */}
        <div className="hidden md:block absolute top-8 left-8">
           <button 
              onClick={onBack} 
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm text-slate-600 font-bold hover:bg-slate-50 transition-colors"
           >
              <ArrowRight className="rotate-180" size={18} /> 返回架构首页
           </button>
        </div>

        {/* Back to Portal Button (Mobile - Floating) */}
        <div className="md:hidden fixed bottom-24 right-4 z-[60]">
           <button 
              onClick={onBack} 
              className="bg-black/80 backdrop-blur-md text-white p-3 rounded-full shadow-lg border border-white/20 active:scale-90 transition-transform"
           >
              <ArrowRight className="rotate-180" size={20} />
           </button>
        </div>

        {/* The Phone Container */}
        <div className="w-full h-[100dvh] md:h-[844px] md:w-[390px] bg-white md:rounded-[3rem] md:border-[8px] md:border-slate-800 md:shadow-2xl relative overflow-hidden flex flex-col shadow-slate-400/50 [transform:translateZ(0)]">
           {/* Desktop Notch Simulation */}
           <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-800 rounded-b-2xl z-50 pointer-events-none"></div>
           
           {children}
        </div>

        {/* Desktop Context Label */}
        <div className="hidden md:block absolute bottom-8 text-slate-400 font-mono text-xs">
           Interactive App Simulation
        </div>
     </div>
);

// --- COMPONENT: Agent Card (Expandable) ---
const AgentCard = ({ 
   id, 
   icon: Icon, 
   title, 
   colorClass, 
   functions, 
   activeAgentId, 
   onToggle 
}: { 
   id: string; 
   icon: any; 
   title: string; 
   colorClass: string; 
   functions: { label: string; sub?: string }[];
   activeAgentId: string | null;
   onToggle: (id: string) => void;
}) => {
   const isOpen = activeAgentId === id;

   return (
      <div 
         onClick={(e) => { e.stopPropagation(); onToggle(id); }}
         className={`
            rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden
            ${isOpen ? `bg-slate-800 ${colorClass} border-current shadow-lg scale-[1.02]` : 'bg-slate-900/40 border-slate-700/50 hover:bg-slate-800/60 hover:border-slate-600'}
         `}
      >
         <div className="p-3 flex items-center justify-between">
            <div className={`flex items-center gap-2 font-bold text-sm ${isOpen ? 'text-white' : colorClass}`}>
               <Icon size={16} /> 
               <span>{title}</span>
            </div>
            <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
               <ChevronDown size={14} className={isOpen ? 'text-white' : 'text-slate-500'} />
            </div>
         </div>
         
         {/* Animated Content */}
         <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
            <div className="overflow-hidden">
               <div className="p-3 pt-0 space-y-2 border-t border-white/10 mt-1">
                  {functions.map((f, i) => (
                     <div key={i} className="bg-black/20 text-slate-300 text-[11px] px-2.5 py-1.5 rounded-lg border border-white/5 flex justify-between items-center">
                        <span className="truncate mr-2">{f.label}</span>
                        {f.sub && <span className="text-[9px] font-mono text-white/50 bg-white/10 px-1 rounded">{f.sub}</span>}
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};

// --- COMPONENT: System Architecture Diagram (Grouped Matrix) ---
const ArchitectureSystem = () => {
  const [activeAgent, setActiveAgent] = useState<string | null>(null);

  const toggleAgent = (id: string) => {
    setActiveAgent(activeAgent === id ? null : id);
  };

  return (
    <div className="w-full relative z-10 p-2">
      
      {/* 1. Top Node: Full-Link Data Sharing */}
      <div className="flex justify-center mb-12 relative">
         <div className="bg-blue-600 text-white p-4 rounded-3xl shadow-[0_0_40px_rgba(37,99,235,0.4)] flex flex-col items-center z-20 relative border-2 border-blue-400/50 w-full md:w-80 text-center">
            <div className="p-3 bg-white/10 rounded-full mb-2 animate-pulse"><Database size={32} /></div>
            <h3 className="font-black text-xl tracking-tight">贵州旅游服务矩阵</h3>
            <div className="text-xs opacity-80 mt-1 font-mono uppercase tracking-wider">Full-Link Data Sharing Hub</div>
         </div>
         
         {/* Lines connecting Top to Middle Layers - FIXED SVG PATHS */}
         {/* Left Line (to C-End) */}
         <svg className="absolute top-[80%] left-0 w-1/2 h-20 -z-10 overflow-visible pointer-events-none" viewBox="0 0 200 100">
            <path d="M200 0 V 30 Q 200 60 100 60 H 30 V 90" fill="none" stroke="url(#gradientLeft)" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_1s_linear_infinite]" />
            <defs>
               <linearGradient id="gradientLeft" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.8" />
               </linearGradient>
            </defs>
         </svg>
         
         {/* Right Line (to Agency Matrix) */}
         <svg className="absolute top-[80%] right-0 w-1/2 h-20 -z-10 overflow-visible pointer-events-none" viewBox="0 0 200 100">
            <path d="M0 0 V 30 Q 0 60 100 60 H 170 V 90" fill="none" stroke="url(#gradientRight)" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_1s_linear_infinite]" />
            <defs>
               <linearGradient id="gradientRight" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.8" />
               </linearGradient>
            </defs>
         </svg>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
         
         {/* === LEFT COLUMN (Public & Gov) === */}
         <div className="lg:col-span-1 flex flex-col gap-6">
            
            {/* 1. Public Service Platform (C-End) */}
            <div className="flex flex-col h-full">
                <div className="mb-3 flex items-center gap-2 px-2">
                    <div className="w-2 h-6 bg-teal-500 rounded-full"></div>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">C端 · 公共服务</h3>
                </div>
                
                <div className="rounded-3xl bg-slate-800/30 border border-teal-500/20 p-4 flex flex-col gap-3 backdrop-blur-sm relative">
                   <div className="flex items-center gap-3 mb-2 pb-3 border-b border-teal-500/20 mt-1">
                      <div className="p-2 bg-teal-500/10 rounded-lg text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.2)]">
                         <Smartphone size={20}/>
                      </div>
                      <div>
                         <h3 className="font-bold text-teal-400 text-lg">游客服务端</h3>
                         <div className="text-[10px] text-slate-500 font-mono">Public Service App</div>
                      </div>
                   </div>
                   
                   <AgentCard 
                      id="t_itin" 
                      title="行程服务智能体" 
                      icon={FileText} 
                      colorClass="text-teal-400" 
                      activeAgentId={activeAgent} 
                      onToggle={toggleAgent}
                      functions={[
                         { label: "行程节点提醒", sub: "LBS" },
                         { label: "实时航班/交通监控", sub: "Data" },
                         { label: "金牌服务资源匹配", sub: "Match" }
                      ]} 
                   />
                   <AgentCard 
                      id="t_chat" 
                      title="互动沟通智能体" 
                      icon={MessagesSquare} 
                      colorClass="text-teal-400" 
                      activeAgentId={activeAgent} 
                      onToggle={toggleAgent}
                      functions={[
                         { label: "AI 智能问答/攻略", sub: "Chat" },
                         { label: "导游一键联系", sub: "Call" },
                         { label: "紧急求助 SOS", sub: "Alert" }
                      ]} 
                   />
                   <AgentCard 
                      id="t_cult" 
                      title="文化体验智能体" 
                      icon={Sparkles} 
                      colorClass="text-teal-400" 
                      activeAgentId={activeAgent} 
                      onToggle={toggleAgent}
                      functions={[
                         { label: "AI 旅行总结报告", sub: "AIGC" },
                         { label: "足迹/高光时刻生成", sub: "Media" },
                         { label: "非遗文化深度讲解", sub: "Wiki" }
                      ]} 
                   />
                </div>
            </div>

            {/* 2. Government Supervision Matrix (New Independent Module) */}
            <div className="flex flex-col h-full mt-4">
                <div className="mb-3 flex items-center gap-2 px-2">
                    <div className="w-2 h-6 bg-rose-500 rounded-full"></div>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">政府监管矩阵</h3>
                </div>
                
                <div className="rounded-3xl bg-slate-800/30 border border-rose-500/20 p-4 flex flex-col gap-3 backdrop-blur-sm relative">
                   <div className="flex items-center gap-3 mb-2 pb-3 border-b border-rose-500/20 mt-1">
                      <div className="p-2 bg-rose-500/10 rounded-lg text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.2)]">
                         <ShieldCheck size={20}/>
                      </div>
                      <div>
                         <h3 className="font-bold text-rose-400 text-lg">监管执法端</h3>
                         <div className="text-[10px] text-slate-500 font-mono">Government Supervision</div>
                      </div>
                   </div>
                   
                   <AgentCard 
                      id="gov_law" 
                      title="执法监督处" 
                      icon={Gavel} 
                      colorClass="text-rose-400" 
                      activeAgentId={activeAgent} 
                      onToggle={toggleAgent}
                      functions={[
                         { label: "电子行程单核验", sub: "Check" },
                         { label: "违规行为自动预警", sub: "Alert" },
                         { label: "现场执法记录", sub: "Rec" }
                      ]} 
                   />
                   <AgentCard 
                      id="gov_market" 
                      title="市场管理处" 
                      icon={Scale} 
                      colorClass="text-rose-400" 
                      activeAgentId={activeAgent} 
                      onToggle={toggleAgent}
                      functions={[
                         { label: "旅行社信用评级", sub: "Credit" },
                         { label: "黑名单管理", sub: "Black" },
                         { label: "投诉工单督办", sub: "Ticket" }
                      ]} 
                   />
                   <AgentCard 
                      id="gov_policy" 
                      title="政策法规处" 
                      icon={Landmark} 
                      colorClass="text-rose-400" 
                      activeAgentId={activeAgent} 
                      onToggle={toggleAgent}
                      functions={[
                         { label: "补贴政策发布", sub: "Pub" },
                         { label: "奖励资金审核", sub: "Audit" }
                      ]} 
                   />
                </div>
            </div>

         </div>

         {/* === RIGHT COLUMN (Agency Matrix & Resources) === */}
         <div className="lg:col-span-3 flex flex-col gap-6">
            
            {/* 1. Travel Agency Matrix (Original 3 Columns) */}
            <div className="flex flex-col h-full">
                <div className="mb-3 flex items-center gap-2 px-2">
                    <div className="w-2 h-6 bg-indigo-500 rounded-full"></div>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">旅行社业务矩阵 (Enterprise Matrix)</h3>
                </div>

                <div className="rounded-3xl bg-slate-900/40 border border-indigo-500/20 p-1 backdrop-blur-sm relative">
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-1 h-full">
                      
                      {/* Sub-Col 1: Agency PC (B-End) */}
                      <div className="bg-slate-800/20 rounded-2xl p-4 flex flex-col gap-3 h-full border border-white/5">
                         <div className="flex items-center gap-3 mb-2 pb-3 border-b border-blue-500/20">
                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                               <LayoutDashboard size={20}/>
                            </div>
                            <div>
                               <h3 className="font-bold text-blue-400 text-lg">B端 · 管理PC</h3>
                               <div className="text-[10px] text-slate-500 font-mono">Management</div>
                            </div>
                         </div>

                         <AgentCard 
                            id="b_plan" 
                            title="行程管理智能体" 
                            icon={Workflow} 
                            colorClass="text-blue-400" 
                            activeAgentId={activeAgent} 
                            onToggle={toggleAgent}
                            functions={[
                               { label: "ERP导入/OCR识别", sub: "Auto" },
                               { label: "行程执行实时跟踪", sub: "Track" },
                               { label: "行程总结报告生成", sub: "Report" }
                            ]}
                         />
                         <AgentCard 
                            id="b_compliance" 
                            title="合规管控智能体" 
                            icon={ShieldCheck} 
                            colorClass="text-blue-400" 
                            activeAgentId={activeAgent} 
                            onToggle={toggleAgent}
                            functions={[
                               { label: "政策解读/合规校验", sub: "Reg" },
                               { label: "车辆/人员自动备案", sub: "Gov" },
                               { label: "补贴一键申报", sub: "Money" }
                            ]}
                         />
                         <AgentCard 
                            id="b_cs" 
                            title="内控客服智能体" 
                            icon={Headphones} 
                            colorClass="text-blue-400" 
                            activeAgentId={activeAgent} 
                            onToggle={toggleAgent}
                            functions={[
                               { label: "话术知识库检索", sub: "RAG" },
                               { label: "客诉辅助处理建议", sub: "Assist" }
                            ]}
                         />
                      </div>

                      {/* Sub-Col 2: Staff App (Guide) */}
                      <div className="bg-slate-800/20 rounded-2xl p-4 flex flex-col gap-3 h-full border border-white/5">
                         <div className="flex items-center gap-3 mb-2 pb-3 border-b border-orange-500/20">
                            <div className="p-2 bg-orange-500/10 rounded-lg text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                               <Briefcase size={20}/>
                            </div>
                            <div>
                               <h3 className="font-bold text-orange-400 text-lg">员工端 · 导游APP</h3>
                               <div className="text-[10px] text-slate-500 font-mono">Guide Staff</div>
                            </div>
                         </div>

                         <AgentCard 
                            id="g_assist" 
                            title="行程助手智能体" 
                            icon={Flag} 
                            colorClass="text-orange-400" 
                            activeAgentId={activeAgent} 
                            onToggle={toggleAgent}
                            functions={[
                               { label: "行程定时提醒", sub: "Clock" },
                               { label: "GPS 定位打卡", sub: "LBS" },
                               { label: "突发情况预警建议", sub: "Warn" }
                            ]}
                         />
                         <AgentCard 
                            id="g_admin" 
                            title="事务处理智能体" 
                            icon={FileText} 
                            colorClass="text-orange-400" 
                            activeAgentId={activeAgent} 
                            onToggle={toggleAgent}
                            functions={[
                               { label: "发票识别/报销生成", sub: "OCR" },
                               { label: "备用金申请", sub: "Fund" },
                               { label: "跨部门/合规工具", sub: "Tools" }
                            ]}
                         />
                         <AgentCard 
                            id="g_service" 
                            title="服务提升智能体" 
                            icon={Zap} 
                            colorClass="text-orange-400" 
                            activeAgentId={activeAgent} 
                            onToggle={toggleAgent}
                            functions={[
                               { label: "多语种/方言翻译", sub: "Trans" },
                               { label: "打卡拍照助手", sub: "Cam" },
                               { label: "带团数据统计报告", sub: "Data" }
                            ]}
                         />
                      </div>

                      {/* Sub-Col 3: Agency C-End (Client) */}
                      <div className="bg-slate-800/20 rounded-2xl p-4 flex flex-col gap-3 h-full border border-white/5 relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 blur-xl rounded-full pointer-events-none"></div>

                         <div className="flex items-center gap-3 mb-2 pb-3 border-b border-purple-500/20">
                            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                               <Store size={20}/>
                            </div>
                            <div>
                               <h3 className="font-bold text-purple-400 text-lg">旅行社C端 · 营销</h3>
                               <div className="text-[10px] text-slate-500 font-mono">Private Traffic (Mini-App)</div>
                            </div>
                         </div>

                         <AgentCard 
                            id="a_market" 
                            title="营销智能体" 
                            icon={LineChart} 
                            colorClass="text-purple-400" 
                            activeAgentId={activeAgent} 
                            onToggle={toggleAgent}
                            functions={[
                               { label: "千人千面线路推荐", sub: "Rec" },
                               { label: "营销海报一键生成", sub: "AIGC" },
                               { label: "私域SOP自动推送", sub: "CRM" }
                            ]}
                         />
                         <AgentCard 
                            id="a_service" 
                            title="客服智能体" 
                            icon={MessageCircle} 
                            colorClass="text-purple-400" 
                            activeAgentId={activeAgent} 
                            onToggle={toggleAgent}
                            functions={[
                               { label: "7x24h 售前咨询", sub: "Chat" },
                               { label: "自助下单助手", sub: "Order" },
                               { label: "会员权益与回访", sub: "Care" }
                            ]}
                         />
                      </div>
                   </div>
                </div>
            </div>

            {/* 2. Service Resource Matrix (New Independent Module) */}
            <div className="flex flex-col h-full mt-4">
                <div className="mb-3 flex items-center gap-2 px-2">
                    <div className="w-2 h-6 bg-emerald-500 rounded-full"></div>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">服务资源矩阵（待接入）</h3>
                </div>

                <div className="rounded-3xl bg-slate-800/30 border border-emerald-500/20 p-4 flex flex-col gap-3 backdrop-blur-sm relative">
                   <div className="flex items-center gap-3 mb-2 pb-3 border-b border-emerald-500/20 mt-1">
                      <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                         <Network size={20}/>
                      </div>
                      <div>
                         <h3 className="font-bold text-emerald-400 text-lg">资源供应商</h3>
                         <div className="text-[10px] text-slate-500 font-mono">Service Resource Matrix</div>
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <AgentCard 
                         id="res_fleet" 
                         title="车队服务" 
                         icon={Truck} 
                         colorClass="text-emerald-400" 
                         activeAgentId={activeAgent} 
                         onToggle={toggleAgent}
                         functions={[
                            { label: "车辆实时调度", sub: "Disp" },
                            { label: "司机排班管理", sub: "Shift" }
                         ]} 
                      />
                      <AgentCard 
                         id="res_spot" 
                         title="景区服务" 
                         icon={MapPin} 
                         colorClass="text-emerald-400" 
                         activeAgentId={activeAgent} 
                         onToggle={toggleAgent}
                         functions={[
                            { label: "门票库存同步", sub: "API" },
                            { label: "客流热力预警", sub: "Map" }
                         ]} 
                      />
                      <AgentCard 
                         id="res_hotel" 
                         title="酒店服务" 
                         icon={BedDouble} 
                         colorClass="text-emerald-400" 
                         activeAgentId={activeAgent} 
                         onToggle={toggleAgent}
                         functions={[
                            { label: "房态实时查询", sub: "Room" },
                            { label: "团队快速入住", sub: "CheckIn" }
                         ]} 
                      />
                      <AgentCard 
                         id="res_food" 
                         title="餐饮服务" 
                         icon={Utensils} 
                         colorClass="text-emerald-400" 
                         activeAgentId={activeAgent} 
                         onToggle={toggleAgent}
                         functions={[
                            { label: "团餐菜单定制", sub: "Menu" },
                            { label: "座位智能预留", sub: "Seat" }
                         ]} 
                      />
                   </div>
                </div>
            </div>

         </div>

      </div>
    </div>
  );
};

// --- COMPONENT: Business Flow Chart (Matches Figure 2) ---
const BusinessProcessFlow = () => {
   const steps = [
      {
         id: 1,
         role: 'B端 · 旅行社',
         title: '产品上架 & 收客',
         icon: LayoutDashboard,
         color: 'text-blue-400',
         bg: 'bg-blue-500/10',
         details: ['设计产品路线', '发布至OTA平台', '签订电子合同']
      },
      {
         id: 2,
         role: '系统核心',
         title: '成团 & 调度',
         icon: Cpu,
         color: 'text-indigo-400',
         bg: 'bg-indigo-500/10',
         details: ['自动生成行程单', '分配导游/车辆', '资源预定确认']
      },
      {
         id: 3,
         role: '员工端 · 导游',
         title: '服务执行',
         icon: Flag,
         color: 'text-orange-400',
         bg: 'bg-orange-500/10',
         details: ['接团打卡', '每日行程播报', '风险实时上报']
      },
      {
         id: 4,
         role: 'C端 · 游客',
         title: '体验 & 评价',
         icon: Smartphone,
         color: 'text-teal-400',
         bg: 'bg-teal-500/10',
         details: ['查看电子路书', '扫码核销入园', '服务满意度评价']
      },
      {
         id: 5,
         role: '监管 & 结算',
         title: '闭环归档',
         icon: ShieldCheck,
         color: 'text-red-400',
         bg: 'bg-red-500/10',
         details: ['投诉处理', '行程自动归档', '补贴资金发放']
      }
   ];

   return (
      <div className="relative py-8">
         {/* Connector Line */}
         <div className="hidden md:block absolute top-[52px] left-0 right-0 h-0.5 bg-slate-700/50 -z-10"></div>
         
         <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((step, idx) => (
               <div key={step.id} className="relative">
                  {/* Step Node */}
                  <div className="flex flex-col items-center text-center">
                     <div className={`w-12 h-12 rounded-full border-4 border-[#0f172a] ${step.bg} ${step.color} flex items-center justify-center mb-4 relative z-10 shadow-lg`}>
                        <step.icon size={20} />
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-slate-700 text-white text-[10px] flex items-center justify-center border-2 border-[#0f172a]">
                           {idx + 1}
                        </div>
                     </div>
                     
                     <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 w-full hover:bg-slate-800 transition-colors">
                        <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">{step.role}</div>
                        <h4 className="text-sm font-bold text-slate-200 mb-3">{step.title}</h4>
                        <div className="space-y-1.5 text-left">
                           {step.details.map((d, i) => (
                              <div key={i} className="flex items-start gap-1.5 text-[10px] text-slate-400">
                                 <div className={`mt-0.5 w-1 h-1 rounded-full ${step.color.replace('text-', 'bg-')}`}></div>
                                 {d}
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
                  
                  {/* Mobile Arrow (Vertical) */}
                  {idx !== steps.length - 1 && (
                     <div className="md:hidden absolute left-1/2 bottom-[-16px] -translate-x-1/2 text-slate-600">
                        ↓
                     </div>
                  )}
               </div>
            ))}
         </div>
      </div>
   );
};

// --- NEW COMPONENT: Broker Distribution Flow ---
const BrokerDistributionFlow = () => {
   const steps = [
      {
         id: 1,
         role: 'B端 · 旅行社',
         title: '资源上架',
         icon: ShoppingCart,
         color: 'text-indigo-400',
         bg: 'bg-indigo-500/10',
         desc: '组织景区、酒店、文创等供应商产品，统一在B端后台定价并上架。'
      },
      {
         id: 2,
         role: 'D端 · 工作人员',
         title: '触点分发',
         icon: QrCode,
         color: 'text-orange-400',
         bg: 'bg-orange-500/10',
         desc: '导游、司机通过专属分销ID或二维码，在行程中精准推荐给游客。'
      },
      {
         id: 3,
         role: 'C端 · 多彩黄小西',
         title: '扫码支付',
         icon: Smartphone,
         color: 'text-teal-400',
         bg: 'bg-teal-500/10',
         desc: '游客扫码直接进入智能体详情页，通过AI助手引导完成查看与快捷支付。'
      },
      {
         id: 4,
         role: '系统 · 结算中心',
         title: '自动分润',
         icon: Coins,
         color: 'text-amber-400',
         bg: 'bg-amber-500/10',
         desc: '支付完成，佣金即时结算至业务员，货款结至供应商，旅行社获取收益。'
      }
   ];

   return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-6">
         {steps.map((step, idx) => (
            <div key={step.id} className="relative flex flex-col items-center group">
               {/* Icon Circle */}
               <div className={`w-16 h-16 rounded-2xl ${step.bg} ${step.color} flex items-center justify-center mb-6 shadow-xl border border-white/5 relative z-10 transition-transform group-hover:scale-110`}>
                  <step.icon size={28} />
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-900 text-white text-[10px] flex items-center justify-center border border-slate-700">
                     {idx + 1}
                  </div>
               </div>

               {/* Connector line (Desktop) */}
               {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-full h-[1px] bg-gradient-to-r from-slate-700 to-transparent"></div>
               )}

               {/* Content Box */}
               <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5 text-center h-full hover:bg-slate-800 transition-all">
                  <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${step.color}`}>{step.role}</div>
                  <h4 className="text-base font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">{step.desc}</p>
               </div>
               
               {/* Mobile Arrow */}
               {idx < steps.length - 1 && (
                  <div className="md:hidden mt-4 text-slate-700">↓</div>
               )}
            </div>
         ))}
      </div>
   );
};

const SectionTitle = ({ title, subtitle, icon: Icon }: any) => (
   <div className="flex items-center gap-4 mb-8">
      <div className="w-1 h-8 bg-indigo-50 rounded-full"></div>
      <div>
         <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            {Icon && <Icon size={24} className="text-indigo-400" />}
            {title}
         </h2>
         <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">{subtitle}</p>
      </div>
   </div>
);

const App: React.FC = () => {
  // View State: 'portal' is the entry full-perspective view
  const [currentView, setCurrentView] = useState<'portal' | 'app'>('portal');
  const [userRole, setUserRole] = useState<UserRole>('tourist');

  // Tourist App State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [subView, setSubView] = useState<'main' | 'experts' | 'chat'>('main');
  const [selectedAgent, setSelectedAgent] = useState<ServiceItem | null>(null);

  // --- Handlers ---
  const handleEnterApp = (role: UserRole) => {
    setUserRole(role);
    setCurrentView('app');
  };

  const handleBackToPortal = () => {
    setCurrentView('portal');
  };

  const handleToggleRole = () => {
     if (userRole === 'tourist') handleEnterApp('agency');
     else if (userRole === 'agency') handleEnterApp('guide');
     else handleEnterApp('tourist');
  };

  // --- Tourist View Helpers ---
  const handleOpenExperts = () => setSubView('experts');
  const handleConsult = (agent: ServiceItem) => {
    setSelectedAgent(agent);
    setSubView('chat');
  };
  const handleBackToMain = () => setSubView('main');
  const handleBackToExperts = () => {
    setSubView('experts');
    setSelectedAgent(null);
  };

  // --- 1. PORTAL VIEW (Redesigned Architecture & Process Showcase) ---
  if (currentView === 'portal') {
    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-indigo-500 selection:text-white overflow-y-auto overflow-x-hidden relative">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-900/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-teal-900/10 rounded-full blur-[120px]"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-white/5 pb-6 gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                             <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                                <Bot size={28} className="text-white" />
                             </div>
                             <h1 className="text-3xl font-black text-white tracking-tight">黄小西 <span className="text-indigo-400">Guizhou AI</span></h1>
                        </div>
                        <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
                           贵州省全域旅游智能体系统 · 架构与流程演示
                           <br/>
                           Architecture & Workflow Showcase
                        </p>
                    </div>
                </header>

                {/* Section 1: Architecture (Figure 1) */}
                <section className="mb-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <SectionTitle title="智能体系统架构 (点击展开详情)" subtitle="System Architecture (Click to Expand Agents)" icon={Network} />
                    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-2xl">
                        <ArchitectureSystem />
                    </div>
                </section>

                {/* Section 2: Business Process (Figure 2) */}
                <section className="mb-24 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
                    <SectionTitle title="旅游业务全流程" subtitle="Standard Business Workflow" icon={Workflow} />
                    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl p-8 relative shadow-2xl">
                        <BusinessProcessFlow />
                    </div>
                </section>

                {/* Section 2.5: Broker Distribution Flow (New Requested Feature) */}
                <section className="mb-24 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                    <SectionTitle title="经济人分销业务流程" subtitle="Economic Broker Distribution Model" icon={Coins} />
                    <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-3xl p-10 relative shadow-2xl overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 -rotate-12 transition-transform group-hover:scale-110"><CircleDollarSign size={200} className="text-indigo-500" /></div>
                        <BrokerDistributionFlow />
                        <div className="mt-8 pt-8 border-t border-white/5 flex flex-wrap gap-4 justify-center">
                            <div className="flex items-center gap-2 bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20">
                                <CheckCircle2 size={14} className="text-indigo-400" />
                                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">支持分账：业务员(D端) / 供应商 / 旅行社</span>
                            </div>
                            <div className="flex items-center gap-2 bg-teal-500/10 px-3 py-1.5 rounded-lg border border-teal-500/20">
                                <CheckCircle2 size={14} className="text-teal-400" />
                                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">入口集成：多彩黄小西(C端) 扫码直达</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: Functional Modules Details (Interactive Entry Points) */}
                <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                    <SectionTitle title="核心功能模块 (点击进入)" subtitle="Core Capabilities (Interactive Entry)" icon={Layers} />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* C-End (Tourist) Entry */}
                        <div 
                           onClick={() => handleEnterApp('tourist')}
                           className="bg-slate-800 border border-slate-700 p-6 rounded-2xl hover:border-teal-500 hover:shadow-[0_0_30px_rgba(20,184,166,0.2)] transition-all cursor-pointer group relative overflow-hidden"
                        >
                           <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                           <div className="w-10 h-10 bg-teal-500/20 text-teal-400 rounded-lg flex items-center justify-center mb-4"><Smartphone size={20}/></div>
                           <h3 className="text-white font-bold text-lg mb-1 flex items-center gap-2">C端 · 游客服务 <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-teal-400"/></h3>
                           <p className="text-xs text-slate-500 mb-4 font-mono">Consumer Terminal</p>
                           
                           {/* Agent Clusters for C-End */}
                           <div className="space-y-4">
                              <div className="flex gap-2">
                                 <span className="text-[10px] bg-slate-900 text-teal-400 px-2 py-1 rounded border border-teal-900">行程规划</span>
                                 <span className="text-[10px] bg-slate-900 text-indigo-400 px-2 py-1 rounded border border-indigo-900">智能订购</span>
                              </div>
                              <ul className="space-y-2">
                                 <li className="flex items-center gap-3 text-slate-400 text-xs group-hover:text-slate-300">
                                    <CheckCircle2 size={12} className="text-teal-500"/>
                                    <span>扫码查看支付 & 电子路书</span>
                                 </li>
                                 <li className="flex items-center gap-3 text-slate-400 text-xs group-hover:text-slate-300">
                                    <CheckCircle2 size={12} className="text-teal-500"/>
                                    <span>AI 非遗文化讲解 & 旅行记录</span>
                                 </li>
                              </ul>
                           </div>
                        </div>

                        {/* B-End (Agency) Entry */}
                        <div 
                           onClick={() => handleEnterApp('agency')}
                           className="bg-slate-800 border border-slate-700 p-6 rounded-2xl hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all cursor-pointer group relative overflow-hidden"
                        >
                           <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                           <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center mb-4"><LayoutDashboard size={20}/></div>
                           <h3 className="text-white font-bold text-lg mb-1 flex items-center gap-2">B端 · 旅行社PC <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-blue-400"/></h3>
                           <p className="text-xs text-slate-500 mb-4 font-mono">Agency Management</p>
                           
                           {/* Agent Clusters for B-End */}
                           <div className="space-y-4">
                              <div className="flex gap-2">
                                 <span className="text-[10px] bg-slate-900 text-blue-400 px-2 py-1 rounded border border-blue-900">产品上架</span>
                                 <span className="text-[10px] bg-slate-900 text-purple-400 px-2 py-1 rounded border border-purple-900">经营结算</span>
                              </div>
                              <ul className="space-y-2">
                                 <li className="flex items-center gap-3 text-slate-400 text-xs group-hover:text-slate-300">
                                    <CheckCircle2 size={12} className="text-blue-500"/>
                                    <span>供应商资源组织与上架管控</span>
                                 </li>
                                 <li className="flex items-center gap-3 text-slate-400 text-xs group-hover:text-slate-300">
                                    <CheckCircle2 size={12} className="text-purple-500"/>
                                    <span>补贴一键申报 & 财务合规审计</span>
                                 </li>
                              </ul>
                           </div>
                        </div>

                        {/* Staff App (Guide) Entry */}
                        <div 
                           onClick={() => handleEnterApp('guide')}
                           className="bg-slate-800 border border-slate-700 p-6 rounded-2xl hover:border-orange-500 hover:shadow-[0_0_30px_rgba(249,115,22,0.2)] transition-all cursor-pointer group relative overflow-hidden"
                        >
                           <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                           <div className="w-10 h-10 bg-orange-500/20 text-orange-400 rounded-lg flex items-center justify-center mb-4"><Briefcase size={20}/></div>
                           <h3 className="text-white font-bold text-lg mb-1 flex items-center gap-2">员工端 · 导游APP <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-orange-400"/></h3>
                           <p className="text-xs text-slate-500 mb-4 font-mono">Guide & Staff App</p>
                           
                           {/* Agent Clusters for Staff */}
                           <div className="space-y-4">
                              <div className="flex gap-2">
                                 <span className="text-[10px] bg-slate-900 text-orange-400 px-2 py-1 rounded border border-orange-900">分销推广</span>
                                 <span className="text-[10px] bg-slate-900 text-teal-400 px-2 py-1 rounded border border-teal-900">收益管理</span>
                              </div>
                              <ul className="space-y-2">
                                 <li className="flex items-center gap-3 text-slate-400 text-xs group-hover:text-slate-300">
                                    <CheckCircle2 size={12} className="text-orange-500"/>
                                    <span>个人分销二维码/ID实时生成</span>
                                 </li>
                                 <li className="flex items-center gap-3 text-slate-400 text-xs group-hover:text-slate-300">
                                    <CheckCircle2 size={12} className="text-orange-500"/>
                                    <span>带团佣金分成实时入账统计</span>
                                 </li>
                              </ul>
                           </div>
                        </div>
                    </div>
                </section>

                <footer className="mt-20 pt-8 border-t border-white/5 text-center text-slate-500 text-xs">
                   <p>© 2024 Guizhou Provincial Department of Culture and Tourism. System Architecture Demo.</p>
                </footer>
            </div>
        </div>
    );
  }

  // --- 2. AGENCY VIEW (PC Full Screen) ---
  if (userRole === 'agency') {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden flex flex-col">
         {/* Custom Back Button for Agency View */}
         <div className="absolute bottom-4 left-4 z-50">
            <button onClick={handleBackToPortal} className="bg-slate-800 text-white p-2 rounded-full shadow-lg opacity-50 hover:opacity-100 transition-opacity" title="返回架构首页">
               <ArrowRight size={20} className="rotate-180" />
            </button>
         </div>
         <Header userRole="agency" onToggleRole={handleToggleRole} />
         <div className="flex-1 overflow-hidden">
            <AgencyApp />
         </div>
      </div>
    );
  }

  // --- GUIDE VIEW (Mobile) ---
  if (userRole === 'guide') {
    return (
      <MobileWrapper onBack={handleBackToPortal}>
         <div className="flex flex-col h-full relative">
            <Header userRole="guide" onToggleRole={handleToggleRole} />
            <div className="flex-1 w-full min-h-0 relative">
               <GuideApp />
            </div>
         </div>
      </MobileWrapper>
    );
  }

  // --- TOURIST VIEW (Mobile) ---
  return (
    <MobileWrapper onBack={handleBackToPortal}>
       <div className="flex flex-col h-full relative bg-[#f5f7fa]">
         {/* Header Logic */}
         {subView !== 'chat' && activeTab !== 3 && <Header userRole="tourist" onToggleRole={handleToggleRole} />}
         
         {/* Main Content */}
         <main className={`flex-1 relative ${activeTab === 3 ? 'bg-slate-50' : ''} ${subView === 'chat' ? 'overflow-hidden' : 'overflow-y-auto no-scrollbar'}`}>
           <div className={`min-h-full h-full ${subView === 'chat' ? 'flex flex-col' : ''}`}>
             {activeTab === 0 && (
               <>
                 {subView === 'main' && (
                    <div className="px-4"><HomeView onOpenExperts={handleOpenExperts} /></div>
                 )}
                 {subView === 'experts' && (
                    <ExpertListView onBack={handleBackToMain} onConsult={handleConsult} />
                 )}
                 {subView === 'chat' && selectedAgent && (
                    <AgentChatView agent={selectedAgent} onBack={handleBackToExperts} />
                 )}
               </>
             )}
             {activeTab === 1 && <div className="px-4 pt-4 pb-24"><ItineraryTimeline /></div>}
             {activeTab === 2 && <div className="flex items-center justify-center h-full text-gray-400 text-sm">附近功能开发中...</div>}
             {activeTab === 3 && <MineView />}
           </div>
         </main>

         {/* Overlays */}
         <QuickMenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

         {/* Bottom Nav */}
         {subView !== 'chat' && (
           <BottomNav 
             isMenuOpen={isMenuOpen} 
             onToggleMenu={() => setIsMenuOpen(!isMenuOpen)} 
             activeTab={activeTab}
             onTabChange={(index) => {
               setActiveTab(index);
               if (index !== 0) setSubView('main'); 
             }}
           />
         )}
       </div>
    </MobileWrapper>
  );
};

export default App;
