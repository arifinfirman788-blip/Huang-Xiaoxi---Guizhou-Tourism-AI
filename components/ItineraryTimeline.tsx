
import React, { useState } from 'react';
import { Plane, MapPin, BedDouble, Utensils, Navigation, CloudRain, Cloud, Info, CalendarDays, Sparkles, Headphones, Ticket, Phone, Clock, Car, QrCode, Bot, Zap, Wifi, ShieldCheck, ChevronUp, UserCheck, Star, Loader2, Share2, MessageCircle, X, Award, Map, ThumbsUp, Search, Building2, AlertTriangle, FileText, BadgeCheck, BookOpen, ShieldAlert } from 'lucide-react';
import ComplaintOverlay from './ComplaintOverlay';

// --- Types ---

type Category = 'all' | 'transport' | 'food' | 'spot' | 'hotel';

interface TimelineEvent {
  id: number;
  time: string;
  type: Category;
  title: string;
  icon: React.ElementType;
  color: string;
  content: React.ReactNode;
  isHighlight?: boolean; // NEW: Daily Highlight Flag
}

interface DayItinerary {
  dayId: string;
  date: string;
  routeSummary: string;
  weather: {
    condition: string;
    temp: string;
    icon: React.ElementType;
    color: string;
  };
  tips: string;
  events: TimelineEvent[];
}

// --- Helper Component for Service Actions ---
const ServiceAction: React.FC<{ icon: React.ElementType; label: string; highlight?: boolean; warning?: boolean; onClick?: (e: React.MouseEvent) => void }> = ({ icon: Icon, label, highlight, warning, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all active:scale-95 whitespace-nowrap ${
    warning
      ? 'bg-red-50 text-red-600 border border-red-100 hover:bg-red-100'
      : highlight 
        ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
        : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
  }`}>
    <Icon size={12} />
    {label}
  </button>
);

// --- NEW: Agent Connection Component ---
const AgentConnect: React.FC<{ name: string; status: string; type: Category }> = ({ name, status, type }) => {
  const styles = {
    transport: 'bg-blue-50 text-blue-700 border-blue-100',
    food: 'bg-orange-50 text-orange-700 border-orange-100',
    spot: 'bg-green-50 text-green-700 border-green-100',
    hotel: 'bg-purple-50 text-purple-700 border-purple-100',
    all: 'bg-gray-50 text-gray-700 border-gray-100' // fallback
  };

  const activeStyle = styles[type] || styles.all;

  return (
    <div className={`flex justify-between items-center px-3 py-2 rounded-lg mb-3 border ${activeStyle}`}>
      <div className="flex items-center gap-2">
         <div className="p-1 bg-white rounded-full shadow-sm">
            <Bot size={12} className="fill-current opacity-80" />
         </div>
         <span className="text-[10px] font-bold tracking-wide uppercase">{name}</span>
      </div>
      <div className="flex items-center gap-1.5 opacity-80">
         <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
         </div>
         <span className="text-[10px] font-medium">{status}</span>
      </div>
    </div>
  );
};

// --- Filters definition for itinerary categories ---
const filters: { id: Category; label: string }[] = [
  { id: 'all', label: '全部' },
  { id: 'transport', label: '交通' },
  { id: 'food', label: '餐饮' },
  { id: 'spot', label: '景点' },
  { id: 'hotel', label: '住宿' },
];

// --- ItineraryTimeline Component ---

const ItineraryTimeline: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<Category>('all');
  const [hasTripResources, setHasTripResources] = useState(false);
  const [showGuideCard, setShowGuideCard] = useState(false);
  
  // Complaint State
  const [complaintNode, setComplaintNode] = useState<{title: string, type: string} | null>(null);

  // Agency Lookup State
  const [showAgencyModal, setShowAgencyModal] = useState(false);
  const [searchAgency, setSearchAgency] = useState('');
  const [agencyResult, setAgencyResult] = useState<any | null>(null);

  const handleSearchAgency = () => {
     if(!searchAgency.trim()) return;
     // Mock Search Result
     setAgencyResult({
        name: '贵州省中国青年旅行社',
        code: 'L-GZ-CJ00001',
        years: 30,
        score: '4.9',
        penalties: 0,
        tags: ['国有企业', '5A级旅行社', '诚信示范单位'],
        complaints: '近90天无重大投诉'
     });
  };

  const scrollToDay = (dayId: string) => {
    const element = document.getElementById(`day-anchor-${dayId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Mock Multi-Day Data inside component to access state if needed
  const multiDayData: DayItinerary[] = [
    {
      dayId: "DAY 1",
      date: "12月11日 · 抵达日",
      routeSummary: "抵达贵阳 — 特色早餐 — 文昌阁 — 入住酒店",
      weather: {
        condition: "多云转晴",
        temp: "12°C - 18°C",
        icon: Cloud,
        color: "text-blue-400"
      },
      tips: "为您监控到今日进港航班流量较大，建议下机后直接使用下方「一键叫车」服务。",
      events: [
        {
          id: 101,
          time: '08:00-09:00',
          type: 'transport',
          title: '航班抵达',
          icon: Plane,
          color: 'bg-blue-500',
          content: (
            <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100 relative overflow-hidden">
              <AgentConnect type="transport" name="民航运行中心·数据智能体" status="实时监控航路" />
              
              <div className="flex justify-between items-center text-center mb-4">
                <div className="text-left">
                  <div className="text-xl font-bold text-gray-800">06:00</div>
                  <div className="text-xs text-gray-500">北京大兴</div>
                </div>
                <div className="flex flex-col items-center px-4 flex-1">
                  <span className="text-xs text-blue-600 font-bold mb-1">CZ3685 · 飞行中</span>
                  <div className="w-full h-[2px] bg-blue-100 relative rounded-full">
                    <div className="absolute left-0 top-0 bottom-0 w-3/4 bg-blue-500 rounded-full"></div>
                    <Plane size={14} className="absolute -top-[6px] left-[75%] -translate-x-1/2 text-blue-500 rotate-90 fill-current" />
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1">预计提前10分钟抵达</span>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-800">08:10</div>
                  <div className="text-xs text-gray-500">龙洞堡T2</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-50">
                 <ServiceAction icon={QrCode} label="电子登机牌" highlight />
                 <ServiceAction icon={ShieldAlert} label="遇到问题？" warning onClick={() => setComplaintNode({title: 'CZ3685 航班服务', type: '交通'})} />
              </div>
            </div>
          )
        },
        {
          id: 102,
          time: '12:00-13:00',
          type: 'food',
          title: '团餐: 老凯俚酸汤鱼',
          icon: Utensils,
          color: 'bg-orange-500',
          isHighlight: true,
          content: (
            <div className="bg-white rounded-xl p-3 shadow-sm border border-orange-100">
               <AgentConnect type="food" name="老凯俚·数字店长" status="菜单已确认" />
  
               <div className="flex gap-3 mb-3">
                  <img src="https://picsum.photos/id/292/100/100" className="w-16 h-16 rounded-lg object-cover shrink-0" alt="food" />
                  <div className="flex-1">
                      <h4 className="font-bold text-gray-800 text-sm">省府路店 (总店)</h4>
                      <div className="flex flex-col gap-1 mt-1">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                           <span className="font-bold">8号桌</span>
                           <span className="text-gray-300">|</span>
                           <span>标准: 50元/人</span>
                        </div>
                        <div className="flex gap-1">
                          <span className="text-[10px] bg-orange-50 text-orange-600 px-1 rounded">团餐协议</span>
                          <span className="text-[10px] bg-gray-100 text-gray-500 px-1 rounded">含酒水</span>
                        </div>
                      </div>
                  </div>
               </div>
               <div className="flex flex-wrap gap-2">
                  <ServiceAction icon={FileText} label="添加备注" highlight />
                  <ServiceAction icon={ShieldAlert} label="遇到问题？" warning onClick={() => setComplaintNode({title: '老凯俚酸汤鱼(总店) 餐饮服务', type: '餐饮'})} />
               </div>
            </div>
          )
        },
        {
          id: 103,
          time: '14:00-16:00',
          type: 'spot',
          title: '甲秀楼',
          icon: MapPin,
          color: 'bg-green-500',
          content: (
            <div className="bg-white rounded-xl p-3 shadow-sm border border-green-100">
               <AgentConnect type="spot" name="甲秀楼·文旅智能体" status="客流监测中" />
  
               <div className="flex justify-between items-start mb-2">
                  <div>
                     <h4 className="font-bold text-gray-800">甲秀楼</h4>
                     <p className="text-xs text-gray-500 mt-0.5">建议游玩时长 1.5 小时</p>
                  </div>
                  <div className="text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded">
                     适宜游览
                  </div>
               </div>
               
               <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="bg-gray-50 rounded-lg p-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100 transition-colors">
                     <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-500 shadow-sm">
                        <Headphones size={14} />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-700">AI语音讲解</span>
                        <span className="text-[10px] text-gray-400">数字分身伴游</span>
                     </div>
                  </div>
                  <div className="bg-gray-100/50 rounded-lg p-2 flex items-center justify-center gap-1.5 cursor-pointer hover:bg-red-50 transition-colors border border-transparent hover:border-red-100" onClick={() => setComplaintNode({title: '甲秀楼 景点游览', type: '景点'})}>
                     <ShieldAlert size={14} className="text-red-400" />
                     <span className="text-[10px] font-bold text-red-400">遇到问题？</span>
                  </div>
               </div>
            </div>
          )
        }
      ]
    },
    {
      dayId: "DAY 2",
      date: "12月12日 · 瀑布之旅",
      routeSummary: "贵阳 — 黄果树瀑布 — 陡坡塘",
      weather: {
        condition: "小雨",
        temp: "10°C - 15°C",
        icon: CloudRain,
        color: "text-blue-500"
      },
      tips: "已为您通知包车司机提前15分钟到达。今日雨势较小，瀑布水量充沛，观赏效果极佳。",
      events: [
        {
          id: 201,
          time: '07:30-09:30',
          type: 'transport',
          title: '专车出行',
          icon: Navigation,
          color: 'bg-blue-500',
          content: (
            <div className="bg-white rounded-xl p-3 shadow-sm border border-blue-100">
               <AgentConnect type="transport" name="黔爽行·交通调度智能体" status="司机已就位" />
  
               <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                     <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                        <img src="https://picsum.photos/id/1005/100/100" className="w-full h-full object-cover" alt="Driver" />
                     </div>
                     <div>
                        <div className="font-bold text-gray-800 text-sm">别克GL8 · 贵A 88***</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                           <ShieldCheck size={10} className="text-green-500"/> 实名认证司机
                        </div>
                     </div>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center border border-green-100">
                     <Phone size={14} />
                  </button>
               </div>
               <div className="flex flex-wrap gap-2">
                 <ServiceAction icon={Navigation} label="查看位置" highlight />
                 <ServiceAction icon={ShieldAlert} label="遇到问题？" warning onClick={() => setComplaintNode({title: '专车用车服务', type: '交通'})} />
               </div>
            </div>
          )
        },
        {
          id: 202,
          time: '10:00-14:00',
          type: 'spot',
          title: '黄果树大瀑布',
          icon: MapPin,
          color: 'bg-green-500',
          isHighlight: true,
          content: (
            <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100">
               <AgentConnect type="spot" name="黄果树·景区智慧大脑" status="最佳游览路线规划中" />
  
              <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                 黄果树大瀑布
                 <span className="text-[10px] px-1.5 py-0.5 bg-red-50 text-red-500 rounded border border-red-100">人流适中</span>
              </h4>
              
              <div className="bg-yellow-50 p-2.5 rounded-lg text-xs text-yellow-800 flex items-start gap-2 mb-3">
                 <div className="bg-white p-1 rounded-full shadow-sm shrink-0 mt-0.5">
                    <Sparkles size={10} className="text-yellow-600" />
                 </div>
                 <div>
                    <span className="font-bold">智能推荐：</span>
                    水帘洞目前排队30分钟。建议先前往天星桥，下午1点再返回大瀑布。
                 </div>
              </div>
  
              <div className="flex flex-wrap gap-2">
                 <ServiceAction icon={MapPin} label="VR全景导览" />
                 <ServiceAction icon={ShieldAlert} label="遇到问题？" warning onClick={() => setComplaintNode({title: '黄果树大瀑布景区', type: '景点'})} />
              </div>
            </div>
          )
        },
        {
          id: 203,
          time: '18:00-19:30',
          type: 'hotel',
          title: '安顺希尔顿',
          icon: BedDouble,
          color: 'bg-purple-500',
          content: (
            <div className="bg-white rounded-xl p-3 shadow-sm border border-purple-100">
               <AgentConnect type="hotel" name="安顺希尔顿·AI管家" status="房间准备完毕" />
  
               <div className="flex justify-between items-start mb-3">
                   <div>
                      <h4 className="font-bold text-gray-800 text-sm">安顺百灵希尔顿逸林酒店</h4>
                      <div className="text-xs text-gray-500 mt-1">湖景大床房 · 含双早</div>
                   </div>
                   <div className="flex flex-col items-end">
                      <span className="text-xs text-purple-600 font-bold">已预付</span>
                   </div>
               </div>
               <div className="flex flex-wrap gap-2">
                  <ServiceAction icon={Navigation} label="一键导航" highlight />
                  <ServiceAction icon={ShieldAlert} label="遇到问题？" warning onClick={() => setComplaintNode({title: '安顺希尔顿逸林酒店', type: '住宿'})} />
               </div>
            </div>
          )
        }
      ]
    }
  ];

  return (
    <div className="pb-8 relative">
      
      {/* 1. New Agency Lookup Entry */}
      <div className="px-1 mb-3">
         <div 
            onClick={() => setShowAgencyModal(true)}
            className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-3 flex items-center justify-between text-white shadow-md cursor-pointer active:scale-[0.99] transition-transform"
         >
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Building2 size={16} className="text-blue-300" />
               </div>
               <div>
                  <div className="text-sm font-bold text-white">旅行社信用查询</div>
                  <div className="text-[10px] text-slate-300">查资质 · 查口碑 · 查处罚</div>
               </div>
            </div>
            <div className="bg-white/20 p-1 rounded-lg">
               <Search size={16} />
            </div>
         </div>
      </div>

      {/* Filter Tabs - Sticky Level 1 */}
      <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar pl-1 sticky top-0 bg-[#f5f7fa]/95 backdrop-blur-md z-40 py-3 -mx-4 px-4 shadow-[0_12px_20px_-8px_#f5f7fa] border-b border-white/50">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`
              px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300
              ${activeFilter === f.id 
                ? 'bg-gray-800 text-white shadow-md scale-105' 
                : 'bg-white text-gray-500 border border-gray-100 hover:bg-gray-50'}
            `}
          >
            {f.label}
          </button>
        ))}
      </div>

       {/* Trip Resources Section */}
       <div className="px-1 mb-6 mt-2">
         {!hasTripResources ? (
            // Pending State
            <div 
              onClick={() => setHasTripResources(true)}
              className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm cursor-pointer hover:bg-blue-50 transition-colors group relative overflow-hidden"
            >
               {/* Animated Status Bar */}
               <div className="absolute top-0 left-0 bottom-0 w-1 bg-gray-200 group-hover:bg-blue-400 transition-colors"></div>

               <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-blue-500 transition-all shrink-0">
                  <UserCheck size={20} />
               </div>
               <div className="flex-1">
                  <h3 className="text-sm font-bold text-gray-800 group-hover:text-blue-700 transition-colors">导游与车队服务</h3>
                  <div className="flex items-center gap-1.5 mt-1">
                     <Loader2 size={12} className="text-orange-500 animate-spin" />
                     <span className="text-xs text-orange-500 font-bold">待分配</span>
                     <span className="text-[10px] text-gray-400">· 系统正在匹配金牌服务资源...</span>
                  </div>
               </div>
               <div className="bg-blue-600 text-white p-2 rounded-full shadow-lg shadow-blue-200 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                  <ShieldCheck size={16} />
               </div>
            </div>
         ) : (
            // Assigned State
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 animate-in fade-in zoom-in-95 duration-300">
               <div className="flex justify-between items-center mb-4 border-b border-gray-50 pb-2">
                  <h3 className="font-bold text-gray-800 flex items-center gap-2">
                     <ShieldCheck size={16} className="text-green-500" />
                     全程尊享服务
                  </h3>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setHasTripResources(false); }}
                    className="text-xs text-gray-400 hover:text-gray-600"
                  >
                    重置
                  </button>
               </div>
               
               {/* Guide Info - Clickable for Modal */}
               <div 
                 onClick={() => setShowGuideCard(true)}
                 className="flex items-center gap-3 mb-4 p-2 -mx-2 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors group"
               >
                  <div className="relative">
                     <img src="https://picsum.photos/id/64/100/100" className="w-12 h-12 rounded-full object-cover border-2 border-yellow-100 group-hover:border-yellow-300 transition-colors" alt="Guide" />
                     <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-white text-[10px] px-1.5 py-0.5 rounded-full border border-white font-bold flex items-center gap-0.5 shadow-sm">
                        <Star size={8} fill="currentColor" /> 9.9
                     </div>
                  </div>
                  <div className="flex-1">
                     <div className="flex items-center gap-2">
                        <h4 className="font-bold text-gray-800 text-sm">王金牌</h4>
                        <span className="text-[10px] bg-yellow-50 text-yellow-700 px-1.5 py-0.5 rounded border border-yellow-100">金牌导游</span>
                     </div>
                     <p className="text-xs text-gray-500 mt-0.5">贵州通 · 摄影达人 · 10年经验</p>
                  </div>
                  <button className="text-[10px] text-blue-600 bg-blue-50 px-2 py-1 rounded-full font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                     查看名片
                  </button>
                  <div className="w-9 h-9 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 active:scale-95 transition-transform shadow-sm border border-green-100">
                     <Phone size={16} />
                  </div>
               </div>

               {/* Divider */}
               <div className="h-[1px] bg-gray-50 mb-4 mx-2"></div>

               {/* Vehicle Info */}
               <div className="flex items-center gap-3 p-2 -mx-2">
                  <div className="w-14 h-10 rounded-lg bg-gray-100 overflow-hidden relative shrink-0">
                      <img src="https://picsum.photos/id/1071/200/200" className="w-full h-full object-cover" alt="Car" />
                  </div>
                  <div className="flex-1">
                     <div className="flex items-center gap-2">
                        <h4 className="font-bold text-gray-800 text-sm">别克 GL8</h4>
                        <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded border border-gray-200">7座商务</span>
                     </div>
                     <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                        <span className="bg-blue-50 text-blue-700 px-1 rounded text-[10px] font-mono">贵A·88888</span>
                        <span>李师傅</span>
                     </p>
                  </div>
                  <button className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 active:scale-95 transition-transform shadow-sm border border-blue-100">
                     <Phone size={16} />
                  </button>
               </div>
            </div>
         )}
       </div>

      {/* Guide Business Card Modal */}
      {showGuideCard && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
           <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowGuideCard(false)}></div>
           
           <div className="relative w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-5 duration-300">
              {/* Header Background */}
              <div className="h-32 bg-gradient-to-br from-blue-600 to-indigo-700 relative">
                 <div className="absolute top-0 right-0 p-4">
                    <button onClick={() => setShowGuideCard(false)} className="bg-black/20 text-white rounded-full p-1 hover:bg-black/30 transition-colors">
                       <X size={20} />
                    </button>
                 </div>
                 {/* Decorative circles */}
                 <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                 <div className="absolute bottom-0 right-0 w-32 h-32 bg-indigo-500/30 rounded-full blur-2xl"></div>
              </div>

              {/* Avatar & Main Info */}
              <div className="px-6 relative -mt-12 flex flex-col items-center text-center">
                 <div className="w-24 h-24 rounded-full p-1 bg-white shadow-lg mb-3 relative">
                    <img src="https://picsum.photos/id/64/200/200" className="w-full h-full rounded-full object-cover" alt="Guide Large" />
                    <div className="absolute bottom-1 right-1 bg-yellow-400 text-white text-xs px-2 py-0.5 rounded-full border-2 border-white font-bold flex items-center gap-1 shadow-sm">
                       <Award size={10} fill="currentColor" /> 金牌
                    </div>
                 </div>
                 <h2 className="text-xl font-black text-gray-800">王金牌</h2>
                 <p className="text-xs text-gray-500 mt-1 mb-4">贵州省文旅厅认证 · 高级导游</p>
                 
                 {/* Stats */}
                 <div className="flex gap-6 mb-6 w-full justify-center">
                    <div className="text-center">
                       <div className="text-lg font-bold text-gray-800">10年</div>
                       <div className="text-[10px] text-gray-400 font-medium">从业经验</div>
                    </div>
                    <div className="w-[1px] bg-gray-100"></div>
                    <div className="text-center">
                       <div className="text-lg font-bold text-gray-800">5000+</div>
                       <div className="text-[10px] text-gray-400 font-medium">服务人次</div>
                    </div>
                    <div className="w-[1px] bg-gray-100"></div>
                     <div className="text-center">
                       <div className="text-lg font-bold text-gray-800">4.99</div>
                       <div className="text-[10px] text-gray-400 font-medium">用户评分</div>
                    </div>
                 </div>

                 {/* Tags */}
                 <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {["幽默风趣", "摄影达人", "民俗专家", "亲子友好"].map(tag => (
                       <span key={tag} className="px-3 py-1 bg-gray-50 text-gray-600 text-xs rounded-full font-medium border border-gray-100">
                          {tag}
                       </span>
                    ))}
                 </div>

                 {/* Action Buttons */}
                 <div className="flex gap-3 w-full mb-8">
                    <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-colors border border-gray-200">
                       <Share2 size={16} />
                       分享名片
                    </button>
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-200">
                       <MessageCircle size={16} />
                       立即沟通
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Agency Lookup Modal */}
      {showAgencyModal && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:px-4">
           <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowAgencyModal(false)}></div>
           
           <div className="relative w-full max-w-lg bg-white sm:rounded-3xl rounded-t-3xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-10 duration-300 max-h-[85vh] flex flex-col">
              <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <Building2 className="text-indigo-600" size={20} />
                    旅行社信息查询
                 </h3>
                 <button onClick={() => setShowAgencyModal(false)} className="text-slate-400 hover:text-slate-600 p-1 bg-slate-100 rounded-full">
                    <X size={18} />
                 </button>
              </div>

              <div className="p-5 space-y-4">
                 <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="输入旅行社全称或许可证号" 
                      value={searchAgency}
                      onChange={(e) => setSearchAgency(e.target.value)}
                      className="w-full pl-11 pr-20 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none"
                    />
                    <button 
                      onClick={handleSearchAgency}
                      className="absolute right-2 top-1.5 bottom-1.5 px-4 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                       查询
                    </button>
                 </div>

                 {agencyResult ? (
                    <div className="animate-in fade-in slide-in-from-bottom-2">
                       <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-2xl p-5 shadow-sm relative overflow-hidden">
                          {/* Official Watermark */}
                          <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-100 rounded-full opacity-50 blur-xl"></div>
                          
                          <div className="flex items-start justify-between mb-4 relative z-10">
                             <div>
                                <h4 className="font-bold text-lg text-slate-900 mb-1">{agencyResult.name}</h4>
                                <div className="text-xs font-mono text-slate-500 bg-white/60 px-2 py-0.5 rounded w-fit border border-slate-100">
                                   许可证: {agencyResult.code}
                                </div>
                             </div>
                             <BadgeCheck className="text-indigo-600" size={24} />
                          </div>

                          <div className="grid grid-cols-3 gap-3 mb-5 relative z-10">
                             <div className="bg-white p-3 rounded-xl border border-slate-100 text-center">
                                <div className="text-2xl font-black text-slate-800">{agencyResult.years}<span className="text-xs font-normal text-slate-400 ml-0.5">年</span></div>
                                <div className="text-[10px] text-slate-500 font-bold">从业经验</div>
                             </div>
                             <div className="bg-white p-3 rounded-xl border border-slate-100 text-center">
                                <div className="text-2xl font-black text-indigo-600">{agencyResult.score}</div>
                                <div className="text-[10px] text-slate-500 font-bold">综合评分</div>
                             </div>
                             <div className="bg-white p-3 rounded-xl border border-slate-100 text-center">
                                <div className="text-2xl font-black text-emerald-500">{agencyResult.penalties}</div>
                                <div className="text-[10px] text-slate-500 font-bold">行政处罚</div>
                             </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                             {agencyResult.tags.map((tag: string, i: number) => (
                                <span key={i} className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-md font-bold">
                                   {tag}
                                </span>
                             ))}
                          </div>

                          <div className="bg-white/80 p-3 rounded-xl border border-slate-100 flex gap-3 items-start relative z-10">
                             <ShieldCheck className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                             <div>
                                <div className="text-xs font-bold text-emerald-800">监管状态正常</div>
                                <div className="text-[10px] text-slate-500 mt-0.5">{agencyResult.complaints}</div>
                             </div>
                          </div>
                       </div>
                    </div>
                 ) : (
                    <div className="text-center py-10 text-slate-400">
                       <Building2 size={48} className="mx-auto mb-3 opacity-20" />
                       <p className="text-xs">输入旅行社名称查询官方备案信息</p>
                    </div>
                 )}
              </div>
           </div>
        </div>
      )}

      {/* Main Itinerary Content */}
      <div className="space-y-4">
        {multiDayData.map((day, dayIndex) => {
          const filteredEvents = activeFilter === 'all' 
            ? day.events 
            : day.events.filter(e => e.type === activeFilter);

          if (filteredEvents.length === 0 && activeFilter !== 'all') return null;

          const WeatherIcon = day.weather.icon;
          const stickyTop = 58 + (dayIndex * 49);
          const [mainDate, subLabel] = day.date.split(' · ');

          return (
            <React.Fragment key={day.dayId}>
              <div id={`day-anchor-${day.dayId}`} className="scroll-mt-40"></div>

              {/* STICKY DAY HEADER */}
              <div 
                className="sticky z-30 -mx-4 px-4 py-3 bg-[#f5f7fa]/95 backdrop-blur-md border-b border-white/50 shadow-[0_12px_20px_-8px_#f5f7fa] flex items-center justify-between cursor-pointer hover:bg-white transition-all mb-2 group"
                style={{ top: `${stickyTop}px` }}
                onClick={() => scrollToDay(day.dayId)}
              >
                 <div className="flex items-baseline gap-2 pl-2">
                    <h2 className="text-2xl font-black text-gray-800 italic group-hover:text-blue-600 transition-colors tracking-tighter">
                      {mainDate}
                    </h2>
                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                      {subLabel}
                    </span>
                 </div>
                 <div className="bg-white p-1 rounded-full shadow-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronUp size={14} />
                 </div>
              </div>
              
              <div className="pl-2 pb-8">
                 {/* Daily Overview Card (Weather & Tips) */}
                 <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-4 shadow-sm border border-blue-100/50 relative overflow-hidden group mb-6">
                    <WeatherIcon className={`absolute -right-4 -top-4 w-24 h-24 ${day.weather.color} opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-700`} />
                    
                    <div className="flex items-start justify-between relative z-10">
                       <div className="flex flex-col gap-1">
                          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">今日天气</span>
                          <div className="flex items-center gap-2">
                             <WeatherIcon className={`w-6 h-6 ${day.weather.color}`} />
                             <span className="text-lg font-bold text-gray-700">{day.weather.temp}</span>
                             <span className="text-xs text-gray-500 bg-white/60 px-1.5 py-0.5 rounded">{day.weather.condition}</span>
                          </div>
                       </div>
                       <div className="w-[1px] h-10 bg-gray-200 mx-2"></div>
                       <div className="flex-1">
                          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                             <CalendarDays size={10} /> 行程重点
                          </span>
                          <p className="text-xs text-gray-700 font-medium mt-1 leading-relaxed line-clamp-2">
                             {day.routeSummary}
                          </p>
                       </div>
                    </div>

                    <div className="h-[1px] bg-blue-100/50 my-3 relative z-10"></div>

                    <div className="flex items-start gap-2 relative z-10">
                       <div className="bg-yellow-100 text-yellow-600 p-1 rounded-full shrink-0 mt-0.5">
                          <Info size={10} strokeWidth={3} />
                       </div>
                       <p className="text-xs text-gray-600 leading-tight">
                         <span className="font-bold text-gray-800">小西助手提醒：</span>
                         {day.tips}
                       </p>
                    </div>
                 </div>

                 {/* Timeline Section */}
                 <div className="relative">
                   <div className="absolute left-[19px] top-2 bottom-4 w-[2px] bg-gray-100/80 z-0"></div>

                   <div className="space-y-6 relative z-10">
                     {filteredEvents.map((item) => (
                       <div key={item.id} className="flex gap-4 group">
                         {/* Left Column: Time & Node */}
                         <div className="flex flex-col items-center flex-shrink-0 w-10 pt-1">
                            <div className="mb-1 bg-white px-1 text-[10px] text-gray-400 font-mono font-medium z-10 relative">
                               {item.time.split('-')[0]}
                            </div>
                            <div className={`w-3 h-3 rounded-full border-2 border-white ring-4 transition-all duration-300 group-hover:scale-110 ${
                               item.type === 'transport' ? 'ring-blue-100 bg-blue-500' :
                               item.type === 'food' ? 'ring-orange-100 bg-orange-500' :
                               item.type === 'spot' ? 'ring-green-100 bg-green-500' :
                               'ring-purple-100 bg-purple-500'
                            }`}></div>
                         </div>

                         {/* Right Column: Content */}
                         <div className="flex-1 min-w-0 pb-2">
                           <div className="flex items-center gap-2 mb-2">
                              <span className={`text-[10px] text-white px-2 py-0.5 rounded-full font-bold shadow-sm ${item.color}`}>
                                 {item.type === 'transport' ? '交通服务' : item.type === 'food' ? '餐饮服务' : item.type === 'spot' ? '景区服务' : '住宿服务'}
                              </span>
                              
                              {/* --- DAILY HIGHLIGHT MARKER --- */}
                              {item.isHighlight && (
                                <span className="flex items-center gap-1 text-[10px] bg-red-50 text-red-600 border border-red-100 px-2 py-0.5 rounded-full font-bold animate-pulse">
                                  <Star size={10} fill="currentColor" /> 今日重点
                                </span>
                              )}
                              
                              <span className="text-sm font-bold text-gray-700 ml-auto">{item.title}</span>
                           </div>
                           
                           <div className={`transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] hover:shadow-md cursor-pointer ${item.isHighlight ? 'ring-2 ring-red-100 rounded-xl' : ''}`}>
                              {item.content}
                           </div>
                         </div>
                       </div>
                     ))}
                     
                     {dayIndex !== multiDayData.length - 1 && (
                        <div className="flex gap-4 items-center opacity-50 pl-1">
                           <div className="w-8 h-[2px] bg-gray-200"></div>
                           <span className="text-[10px] text-gray-400">稍作休息，小西正在准备明日行程...</span>
                        </div>
                     )}
                   </div>
                 </div>
              </div>
            </React.Fragment>
          );
        })}
        
        {/* End of Trip */}
        <div className="text-center py-6">
           <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 shadow-sm rounded-full text-gray-500 text-xs font-medium">
              <Sparkles size={14} className="text-blue-500" />
              <span>需要调整行程吗？呼叫小西帮您安排</span>
           </div>
        </div>
      </div>

      {/* Complaint Overlay */}
      {complaintNode && (
         <ComplaintOverlay 
            nodeTitle={complaintNode.title}
            nodeType={complaintNode.type}
            onClose={() => setComplaintNode(null)}
            onSubmit={(data) => {
               console.log('Complaint Submitted:', data);
               setComplaintNode(null);
            }}
         />
      )}
    </div>
  );
};

export default ItineraryTimeline;
