
import React, { useState, useEffect } from 'react';
import { Map, ArrowLeft, Clock, CheckCircle2, PlayCircle, Image as ImageIcon, Users, Phone, MapPin, Bus, Utensils, BedDouble, AlertCircle, FileBarChart, Sparkles, Printer, Share2, Archive, Star, TrendingUp, Calendar, AlertTriangle, MessageSquare, ShieldCheck, Car, HelpCircle, ArrowRight } from 'lucide-react';
import { TrackingEvent, TouristInfo, AgencyItinerary, TripReport, ModificationRequest } from '../../types';

// --- Mock Data ---

const initialTrips: AgencyItinerary[] = [
  { 
    id: '1', title: '黄果树+苗寨5日深度游', date: '2023-12-15', groupCode: 'GZ-231215-A', status: 'active', touristCount: 24, complianceScore: 85, vehicleStatus: 'unregistered', guideName: '王金牌', driverName: '李师傅',
    modificationRequest: {
       id: 'req1',
       requestTime: '10:05',
       guideName: '王金牌',
       reason: '客人集体要求晚餐不吃团餐，改为去吃当地特色的酸汤鱼火锅，需调整餐厅预约。',
       targetEventIds: ['e5'],
       status: 'pending'
    }
  },
  { id: '2', title: '荔波小七孔专线', date: '2023-12-16', groupCode: 'GZ-231216-B', status: 'planning', touristCount: 12, complianceScore: 100, vehicleStatus: 'processing', guideName: '待定', driverName: '待定' },
  { id: '3', title: '遵义红色研学团', date: '2023-12-10', groupCode: 'GZ-231210-C', status: 'completed', touristCount: 45, complianceScore: 98, vehicleStatus: 'registered', guideName: '张红', driverName: '陈师傅' },
  { id: '4', title: '梵净山朝圣之旅', date: '2023-11-20', groupCode: 'GZ-231120-D', status: 'completed', touristCount: 30, complianceScore: 95, vehicleStatus: 'registered', guideName: '李强', driverName: '赵师傅' },
];

const initialEvents: TrackingEvent[] = [
  { 
    id: 'e1', time: '08:00', title: '酒店集合出发', type: 'transport', status: 'completed', checkInTime: '08:05', operator: '导游 王金牌',
    evidence: [{ type: 'image', url: 'https://picsum.photos/id/10/200/200', timestamp: '08:05:12' }]
  },
  { 
    id: 'e2', time: '10:00', title: '抵达黄果树景区', type: 'spot', status: 'completed', checkInTime: '10:15', operator: '导游 王金牌',
    evidence: [{ type: 'image', url: 'https://picsum.photos/id/11/200/200', timestamp: '10:15:33' }, { type: 'audio', url: '', timestamp: '10:16:00' }]
  },
  { 
    id: 'e3', time: '12:30', title: '午餐: 瀑布轩餐厅', type: 'food', status: 'completed', checkInTime: '12:40', operator: '导游 王金牌',
    evidence: [{ type: 'image', url: 'https://picsum.photos/id/292/200/200', timestamp: '12:42:15' }]
  },
  { 
    id: 'e4', time: '14:00', title: '天星桥景区游览', type: 'spot', status: 'pending', operator: '导游 王金牌',
    isDeviated: true,
    deviationReason: 'AI检测异常：车辆定位显示当前位于"安顺特产博览中心"，偏离原定"天星桥景区"路线，且停留超过30分钟，疑似擅自增加购物点。'
  },
  { 
    id: 'e5', time: '17:30', title: '晚餐: 团餐', type: 'food', status: 'pending', operator: '导游 王金牌' 
  },
  { 
    id: 'e6', time: '19:00', title: '返回酒店', type: 'transport', status: 'pending', operator: '司机 李师傅' 
  },
];

const mockTourists: TouristInfo[] = [
  { id: 't1', name: '张建国', phone: '138****1234', idCard: '5201****1234', checkInStatus: 'checked' },
  { id: 't2', name: '李淑芬', phone: '139****5678', idCard: '5201****5678', checkInStatus: 'checked' },
  { id: 't3', name: '王小明', phone: '137****9012', idCard: '5201****9012', checkInStatus: 'unchecked' },
];

const mockReport: TripReport = {
  id: 'r1',
  tripId: '1',
  generatedAt: '2023-12-18 10:00',
  overallScore: 96,
  ratingLevel: 'S',
  aiSummary: '本次行程整体执行流畅，导游服务热情，游客满意度高。行程时间控制精准，无重大延误。餐饮安排受到好评，但车辆卫生状况有待微调。合规性检查全部通过，符合补贴申报标准。',
  dimensions: {
    guide: { score: 98, comment: '讲解专业，互动性强，无强制购物投诉。' },
    driver: { score: 92, comment: '驾驶平稳，但在Day3早晨迟到5分钟。' },
    schedule: { score: 95, comment: '行程节点按时完成率100%，时间安排合理。' },
    resources: { score: 97, comment: '酒店与餐饮供应商履约情况良好。' },
  },
  touristFeedback: {
    positiveRatio: 98,
    keywords: ['导游负责', '风景美', '餐食好吃', '比较累'],
    summary: '98%的游客给出了五星好评，特别表扬了导游王金牌的贴心服务。少部分老年游客反映行程略显紧凑。'
  }
};

// --- Radar Chart Component ---
const RadarChart: React.FC<{ data: { label: string; value: number }[] }> = ({ data }) => {
  const size = 200;
  const center = size / 2;
  const radius = 70;
  const angleSlice = (Math.PI * 2) / data.length;

  // Calculate polygon points
  const points = data.map((d, i) => {
    const r = (d.value / 100) * radius;
    const x = center + r * Math.cos(i * angleSlice - Math.PI / 2);
    const y = center + r * Math.sin(i * angleSlice - Math.PI / 2);
    return `${x},${y}`;
  }).join(' ');

  // Calculate grid lines
  const levels = [0.25, 0.5, 0.75, 1];
  
  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background Grid */}
        {levels.map((level, i) => (
          <circle 
            key={i} 
            cx={center} 
            cy={center} 
            r={radius * level} 
            fill="none" 
            stroke="#e2e8f0" 
            strokeWidth="1" 
          />
        ))}
        {/* Axes */}
        {data.map((_, i) => {
           const x = center + radius * Math.cos(i * angleSlice - Math.PI / 2);
           const y = center + radius * Math.sin(i * angleSlice - Math.PI / 2);
           return <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="#e2e8f0" strokeWidth="1" />;
        })}

        {/* Data Polygon */}
        <polygon points={points} fill="rgba(99, 102, 241, 0.2)" stroke="#6366f1" strokeWidth="2" />
        
        {/* Points */}
        {data.map((d, i) => {
          const r = (d.value / 100) * radius;
          const x = center + r * Math.cos(i * angleSlice - Math.PI / 2);
          const y = center + r * Math.sin(i * angleSlice - Math.PI / 2);
          return (
             <circle key={i} cx={x} cy={y} r="3" fill="#6366f1" />
          );
        })}

        {/* Labels */}
        {data.map((d, i) => {
           const r = radius + 20; // Text radius
           const x = center + r * Math.cos(i * angleSlice - Math.PI / 2);
           const y = center + r * Math.sin(i * angleSlice - Math.PI / 2);
           return (
              <text 
                key={i} 
                x={x} 
                y={y} 
                textAnchor="middle" 
                dominantBaseline="middle" 
                className="text-[10px] fill-slate-500 font-bold"
              >
                 {d.label}
              </text>
           );
        })}
      </svg>
    </div>
  );
};

interface TripTrackerProps {
  viewMode?: 'active' | 'archived';
}

const TripTracker: React.FC<TripTrackerProps> = ({ viewMode = 'active' }) => {
  const [trips, setTrips] = useState(initialTrips);
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
  const [activeInfoTab, setActiveInfoTab] = useState<'info' | 'tourist' | 'resource'>('info');
  const [viewType, setViewType] = useState<'monitor' | 'report'>('monitor');
  const [localEvents, setLocalEvents] = useState<TrackingEvent[]>(initialEvents);

  // Filter trips based on viewMode prop
  const filteredTrips = trips.filter(t => {
     if (viewMode === 'active') return t.status !== 'completed';
     return t.status === 'completed';
  });

  const selectedTrip = trips.find(t => t.id === selectedTripId);

  // Reset local events when selecting a different trip (Simulation)
  useEffect(() => {
     if (selectedTripId) {
        setLocalEvents(initialEvents); 
     }
  }, [selectedTripId]);

  const handleArchiveTrip = () => {
    if (selectedTrip) {
       const updatedTrips = trips.map(t => t.id === selectedTrip.id ? { ...t, status: 'completed' as const } : t);
       setTrips(updatedTrips);
       // Navigate back to list as it will disappear from 'active' view
       setSelectedTripId(null);
    }
  };

  const handleResolveDeviation = (eventId: string) => {
     setLocalEvents(prev => prev.map(e => {
        if (e.id === eventId) {
           return { ...e, isDeviated: false, deviationReason: undefined };
        }
        return e;
     }));
  };

  const handleApproveModification = () => {
     if (!selectedTrip || !selectedTrip.modificationRequest) return;
     
     // 1. Clear request on trip level
     const updatedTrips = trips.map(t => {
        if (t.id === selectedTrip.id) {
           return { ...t, modificationRequest: undefined };
        }
        return t;
     });
     setTrips(updatedTrips);

     // 2. Update local event to show change (Simulated)
     const targetIds = selectedTrip.modificationRequest.targetEventIds;
     setLocalEvents(prev => prev.map(e => {
        if (targetIds.includes(e.id)) {
           return { ...e, title: '晚餐: 苗家酸汤鱼', type: 'food' }; // Apply change
        }
        return e;
     }));
  };

  // --- Report View Component (For Archived Trips) ---
  const ReportView = ({ trip }: { trip: AgencyItinerary }) => (
    <div className="flex flex-col h-full space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
       {/* Top Bar */}
       <div className="bg-white px-6 py-4 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <button onClick={() => setSelectedTripId(null)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
                <ArrowLeft size={20} />
             </button>
             <div>
                <h2 className="font-bold text-xl text-slate-800 flex items-center gap-2">
                   {trip.title}
                   <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200">已归档</span>
                </h2>
                <div className="text-xs text-slate-500 font-mono mt-0.5">团号: {trip.groupCode} · 归档时间: {mockReport.generatedAt}</div>
             </div>
          </div>
          <div className="flex gap-2">
             <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50">
                <Printer size={16} /> 打印报告
             </button>
             <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50">
                <Share2 size={16} /> 分享
             </button>
          </div>
       </div>

       {/* Content Grid */}
       <div className="flex-1 grid grid-cols-12 gap-6 min-h-0 overflow-y-auto pr-2 pb-4">
          
          {/* Left: Overall Score & Radar (4 cols) */}
          <div className="col-span-12 md:col-span-4 space-y-6">
             {/* Score Card */}
             <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><FileBarChart size={120} /></div>
                <div className="relative z-10 text-center py-4">
                   <div className="text-indigo-200 text-sm font-bold uppercase tracking-widest mb-2">综合评分</div>
                   <div className="text-7xl font-black tracking-tighter mb-2">{mockReport.overallScore}</div>
                   <div className="inline-flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                      <Star size={14} fill="currentColor" className="text-yellow-400" />
                      <span className="font-bold">评级: {mockReport.ratingLevel}级</span>
                   </div>
                </div>
             </div>

             {/* Radar Chart Visual */}
             <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col items-center">
                <h3 className="font-bold text-slate-800 mb-4 self-start w-full border-b border-slate-100 pb-2">能力模型雷达图</h3>
                <div className="py-4">
                  <RadarChart data={[
                    { label: '导游服务', value: mockReport.dimensions.guide.score },
                    { label: '司机车辆', value: mockReport.dimensions.driver.score },
                    { label: '行程执行', value: mockReport.dimensions.schedule.score },
                    { label: '资源质量', value: mockReport.dimensions.resources.score },
                    { label: '合规性', value: 100 },
                  ]} />
                </div>
             </div>
          </div>

          {/* Right: Analysis Details (8 cols) */}
          <div className="col-span-12 md:col-span-8 space-y-6">
             
             {/* AI Summary */}
             <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                   <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
                      <Sparkles size={16} className="text-indigo-600" />
                   </div>
                   <h3 className="font-bold text-slate-800">AI 智能总结</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                   {mockReport.aiSummary}
                </p>
             </div>

             {/* Detailed Reviews */}
             <div className="grid grid-cols-2 gap-4">
                <ReviewCard title="导游表现" score={mockReport.dimensions.guide.score} comment={mockReport.dimensions.guide.comment} />
                <ReviewCard title="游客反馈" score={mockReport.touristFeedback.positiveRatio} isPercent comment={mockReport.touristFeedback.summary} />
             </div>

             {/* Resources Table */}
             <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-4">资源履约记录</h3>
                <table className="w-full text-sm text-left">
                   <thead className="bg-slate-50 text-slate-500">
                      <tr>
                         <th className="px-4 py-2 rounded-l-lg">资源名称</th>
                         <th className="px-4 py-2">类型</th>
                         <th className="px-4 py-2">状态</th>
                         <th className="px-4 py-2 rounded-r-lg text-right">评分</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                      <tr>
                         <td className="px-4 py-3 font-medium text-slate-700">安顺希尔顿酒店</td>
                         <td className="px-4 py-3 text-slate-500">酒店</td>
                         <td className="px-4 py-3 text-green-600 flex items-center gap-1"><CheckCircle2 size={12}/> 履约完成</td>
                         <td className="px-4 py-3 text-right font-bold">4.9</td>
                      </tr>
                      <tr>
                         <td className="px-4 py-3 font-medium text-slate-700">瀑布轩餐厅</td>
                         <td className="px-4 py-3 text-slate-500">餐饮</td>
                         <td className="px-4 py-3 text-green-600 flex items-center gap-1"><CheckCircle2 size={12}/> 履约完成</td>
                         <td className="px-4 py-3 text-right font-bold">4.7</td>
                      </tr>
                   </tbody>
                </table>
             </div>
          </div>
       </div>
    </div>
  );

  // --- List View ---
  if (!selectedTripId) {
    return (
      <div className="flex flex-col h-full space-y-6">
        <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200">
           <div className="flex items-center gap-4">
               <h2 className="font-bold text-xl text-slate-800 flex items-center gap-2">
                  <Map className="text-indigo-600" /> {viewMode === 'active' ? '行程跟踪监控' : '归档行程管理'}
               </h2>
               <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-md border border-slate-200">
                 共 {filteredTrips.length} 个行程
               </span>
           </div>
           
           <div className="flex gap-2">
             <div className="relative">
                 <input type="text" placeholder="搜索团号..." className="pl-4 pr-10 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-100 w-64" />
                 <ArrowLeft className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 rotate-180" size={16} />
             </div>
           </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
           {filteredTrips.length === 0 ? (
              <div className="p-12 text-center text-slate-400 flex flex-col items-center gap-2">
                 <Archive size={48} className="text-slate-200" />
                 暂无{viewMode === 'active' ? '正在进行中' : '已归档'}的行程
              </div>
           ) : (
            <table className="w-full text-left text-sm">
               <thead className="bg-slate-50 text-slate-500 font-medium">
                  <tr>
                     <th className="px-6 py-4">团号 / 名称</th>
                     <th className="px-6 py-4">出发日期</th>
                     <th className="px-6 py-4">状态</th>
                     <th className="px-6 py-4">导游/司机</th>
                     <th className="px-6 py-4">
                       {viewMode === 'active' ? '当前进度' : '综合评分'}
                     </th>
                     <th className="px-6 py-4 text-right">操作</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {filteredTrips.map(trip => (
                     <tr key={trip.id} className="hover:bg-indigo-50/30 transition-colors">
                        <td className="px-6 py-4">
                           <div className="font-bold text-slate-800">{trip.title}</div>
                           <div className="text-xs text-slate-500 font-mono mt-0.5">{trip.groupCode}</div>
                           {trip.modificationRequest && (
                              <span className="inline-block mt-1 text-[9px] bg-blue-100 text-blue-600 px-1.5 rounded-sm border border-blue-200 font-bold">
                                 有调整申请
                              </span>
                           )}
                        </td>
                        <td className="px-6 py-4 text-slate-600">{trip.date}</td>
                        <td className="px-6 py-4">
                           {trip.status === 'active' ? (
                              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100 animate-pulse">
                                 <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> 进行中
                              </span>
                           ) : trip.status === 'completed' ? (
                              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
                                 <CheckCircle2 size={12} /> 已完成
                              </span>
                           ) : (
                              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                                 <Clock size={10} /> 待出发
                              </span>
                           )}
                        </td>
                        <td className="px-6 py-4 text-slate-600 text-xs">
                           <div>导: {trip.guideName}</div>
                           <div>车: {trip.driverName}</div>
                        </td>
                        <td className="px-6 py-4">
                           {trip.status === 'completed' ? (
                              <div className="flex items-center gap-1 text-yellow-500 font-bold">
                                 <Star size={14} fill="currentColor" /> {mockReport.overallScore}分
                              </div>
                           ) : (
                              <>
                                 <div className="text-xs font-bold text-slate-600 mb-1">{trip.status === 'active' ? 'Day 2' : '未开始'}</div>
                                 <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div className={`h-full bg-indigo-500 ${trip.status === 'active' ? 'w-1/3' : 'w-0'}`}></div>
                                 </div>
                              </>
                           )}
                        </td>
                        <td className="px-6 py-4 text-right">
                           {trip.status === 'completed' ? (
                              <div className="flex items-center justify-end gap-2">
                                <button 
                                   onClick={() => { setSelectedTripId(trip.id); setViewType('report'); }}
                                   className="text-xs font-bold px-3 py-1.5 rounded-lg transition-colors border bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                                >
                                   查看报告
                                </button>
                                <button 
                                   onClick={() => { setSelectedTripId(trip.id); setViewType('monitor'); }}
                                   className="text-xs font-bold px-3 py-1.5 rounded-lg transition-colors border bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100"
                                >
                                   查看详情
                                </button>
                              </div>
                           ) : (
                              <button 
                                 onClick={() => { setSelectedTripId(trip.id); setViewType('monitor'); }}
                                 className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors border ${trip.status === 'active' ? 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200' : 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-200'}`}
                              >
                                 {trip.status === 'active' ? '进入监控' : '开始行程'}
                              </button>
                           )}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
           )}
        </div>
      </div>
    );
  }

  // --- Render Logic ---
  
  if (selectedTrip) {
     // If viewing Report for a completed trip
     if (viewType === 'report' && selectedTrip.status === 'completed') {
        return <ReportView trip={selectedTrip} />;
     }

     // If viewing Monitor (Details)
     let displayEvents = selectedTrip.status === 'completed' 
        ? localEvents.map(e => ({ ...e, status: 'completed' as const })) 
        : [...localEvents];

     // Custom Sorting based on user request: Completed -> Deviated -> Pending
     // This ensures pending events do NOT intersperse between completed and deviated/alert events.
     if (selectedTrip.status !== 'completed') {
        displayEvents.sort((a, b) => {
           // Weight: Completed=0, Deviated=1, Pending=2
           const getWeight = (e: TrackingEvent) => {
              if (e.status === 'completed') return 0;
              if (e.isDeviated) return 1;
              return 2;
           };
           const weightDiff = getWeight(a) - getWeight(b);
           // Use time for secondary sorting if weights are equal
           return weightDiff !== 0 ? weightDiff : a.time.localeCompare(b.time);
        });
     }

     const hasDeviation = displayEvents.some(e => e.isDeviated);
     const pendingModification = selectedTrip.modificationRequest;

     return (
      <div className="flex flex-col h-full space-y-4">
         {/* Monitoring UI (Existing) */}
         <div className="bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center">
            <div className="flex items-center gap-4">
               <button onClick={() => setSelectedTripId(null)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
                  <ArrowLeft size={20} />
               </button>
               <div>
                  <h2 className="font-bold text-lg text-slate-800">{selectedTrip.title}</h2>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                     <span className="font-mono bg-slate-100 px-1.5 rounded">{selectedTrip.groupCode}</span>
                     {selectedTrip.status === 'active' && <span className="text-green-600 font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> 实时监控中</span>}
                     {selectedTrip.status === 'completed' && <span className="text-indigo-600 font-bold flex items-center gap-1"><CheckCircle2 size={12}/> 行程已归档</span>}
                  </div>
               </div>
            </div>
            <div className="flex gap-4">
               {/* Finish Trip Button - Only show if active */}
               {selectedTrip.status !== 'completed' && (
                  <button 
                     onClick={handleArchiveTrip}
                     className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-md shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all"
                  >
                     <Archive size={16} /> 结束行程并归档
                  </button>
               )}
            </div>
         </div>

         {/* Main Grid */}
         <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0">
            
            {/* Left Column: Map & Timeline (2/3) */}
            <div className="lg:col-span-2 flex flex-col gap-4 overflow-hidden">
               
               {/* Map Section */}
               <div className="h-80 bg-slate-200 rounded-2xl relative overflow-hidden border border-slate-200 shadow-inner group">
                  <img src="https://picsum.photos/id/10/800/400" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000" alt="Map Placeholder" />
                  <div className="absolute inset-0 bg-indigo-900/10 pointer-events-none"></div>
                  
                  {/* Vehicle Marker */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
                     <div className="bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded shadow-md text-slate-800 whitespace-nowrap">
                        贵A·88888 (李师傅)
                     </div>
                     <div className={`w-4 h-4 bg-blue-500 border-2 border-white rounded-full shadow-lg ring-4 ring-blue-500/30 ${selectedTrip.status === 'active' ? 'animate-pulse' : ''}`}></div>
                  </div>

                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-2 rounded-lg shadow-sm text-xs">
                     <div className="text-slate-500 mb-1">当前位置</div>
                     <div className="font-bold text-slate-800 flex items-center gap-1"><MapPin size={12} /> 黄果树景区·大门停车场</div>
                  </div>
               </div>

               {/* Timeline Section */}
               <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-slate-200 overflow-y-auto">
                  <div className="flex items-center justify-between mb-4">
                     <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <Clock size={18} className="text-indigo-600" /> {selectedTrip.status === 'completed' ? '行程记录' : '实时行程流'}
                     </h3>
                     {/* AI Alert Header */}
                     {hasDeviation && (
                        <div className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 border border-red-100 animate-pulse">
                           <AlertTriangle size={14} />
                           AI 检测到行程异常，请尽快处理
                        </div>
                     )}
                  </div>

                  <div className="relative pl-2">
                     <div className="absolute left-[7px] top-2 bottom-4 w-[2px] bg-slate-100"></div>
                     <div className="space-y-6">
                        
                        {/* Pending Modification Request Card */}
                        {pendingModification && (
                           <div className="relative pl-8 animate-in slide-in-from-top-4">
                              <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-blue-500 bg-white flex items-center justify-center z-10 shadow-sm shadow-blue-200">
                                 <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                              </div>
                              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-sm">
                                 <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                       <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded">申请调整</span>
                                       <span className="text-sm font-bold text-blue-900">收到导游 {pendingModification.guideName} 的行程调整申请</span>
                                    </div>
                                    <span className="text-xs text-blue-400 font-mono">{pendingModification.requestTime}</span>
                                 </div>
                                 
                                 <div className="text-xs text-slate-600 bg-white/50 p-2 rounded-lg border border-blue-100 mb-3">
                                    <span className="font-bold">申请原因：</span> {pendingModification.reason}
                                 </div>

                                 <div className="flex gap-2 justify-end">
                                    <button className="px-3 py-1.5 bg-white border border-blue-200 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors">
                                       驳回
                                    </button>
                                    <button 
                                       onClick={handleApproveModification}
                                       className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 shadow-sm shadow-blue-200 transition-colors flex items-center gap-1"
                                    >
                                       <CheckCircle2 size={12} /> 同意并调整
                                    </button>
                                 </div>
                              </div>
                           </div>
                        )}

                        {displayEvents.map((event, idx) => (
                           <div key={event.id} className="relative pl-8 group">
                              {/* Dot */}
                              <div className={`absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 flex items-center justify-center bg-white z-10 ${
                                 event.isDeviated ? 'border-red-500 text-red-500 shadow-md shadow-red-200' :
                                 event.status === 'completed' ? 'border-green-500 text-green-500' : 'border-slate-300 text-slate-300'
                              }`}>
                                 {event.status === 'completed' && !event.isDeviated && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                                 {event.isDeviated && <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>}
                              </div>
                              
                              {/* Content */}
                              <div className={`transition-opacity ${event.status === 'pending' && !event.isDeviated ? 'opacity-60' : 'opacity-100'}`}>
                                 <div className="flex items-center gap-2 mb-1">
                                    <span className={`font-mono font-bold text-sm ${event.isDeviated ? 'text-red-600' : 'text-slate-800'}`}>{event.time}</span>
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                                       event.isDeviated ? 'bg-red-50 text-red-600 border-red-200 font-bold' :
                                       event.status === 'completed' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-slate-50 text-slate-500 border-slate-200'
                                    }`}>
                                       {event.isDeviated ? '异常预警' : event.status === 'completed' ? '已完成' : '待进行'}
                                    </span>
                                 </div>
                                 
                                 <div className={`rounded-xl p-3 border transition-all ${
                                    event.isDeviated ? 'bg-red-50 border-red-200 shadow-sm' : 
                                    pendingModification?.targetEventIds.includes(event.id) ? 'bg-blue-50 border-blue-200' :
                                    'bg-slate-50 border-slate-100 group-hover:border-indigo-100'
                                 }`}>
                                    <div className="flex justify-between items-start">
                                       <div>
                                          <div className={`font-bold text-sm ${event.isDeviated ? 'text-red-800' : 'text-slate-800'}`}>{event.title}</div>
                                          <div className={`text-xs mt-1 flex items-center gap-1 ${event.isDeviated ? 'text-red-600' : 'text-slate-500'}`}>
                                             <Users size={12} /> 操作人: {event.operator}
                                          </div>
                                          {event.checkInTime && !event.isDeviated && (
                                             <div className="text-xs text-emerald-600 mt-0.5 flex items-center gap-1">
                                                <CheckCircle2 size={12} /> 打卡时间: {event.checkInTime}
                                             </div>
                                          )}
                                       </div>
                                       <TypeIcon type={event.type} />
                                    </div>

                                    {/* Deviation Details & Actions */}
                                    {event.isDeviated && (
                                       <div className="mt-3 pt-3 border-t border-red-100 space-y-3">
                                          <div className="text-xs text-red-700 bg-white p-2 rounded-lg border border-red-100 flex gap-2 items-start">
                                             <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                                             <span className="leading-relaxed font-medium">{event.deviationReason}</span>
                                          </div>
                                          <div className="flex gap-2 justify-end">
                                             <button className="flex items-center gap-1 px-3 py-1.5 bg-white border border-red-200 text-red-600 rounded-lg text-xs font-bold hover:bg-red-50 transition-colors">
                                                <Phone size={12} /> 联系导游
                                             </button>
                                             <button className="flex items-center gap-1 px-3 py-1.5 bg-white border border-red-200 text-red-600 rounded-lg text-xs font-bold hover:bg-red-50 transition-colors">
                                                <Car size={12} /> 联系司机
                                             </button>
                                             <button 
                                                onClick={() => handleResolveDeviation(event.id)}
                                                className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 shadow-sm shadow-red-200 transition-colors"
                                             >
                                                <CheckCircle2 size={12} /> 已线下确认无误
                                             </button>
                                          </div>
                                       </div>
                                    )}

                                    {/* Evidence */}
                                    {event.evidence && !event.isDeviated && (
                                       <div className="mt-3 pt-3 border-t border-slate-100 flex gap-2">
                                          {event.evidence.map((ev, i) => (
                                             <button key={i} className="flex items-center gap-1.5 bg-white border border-slate-200 px-2 py-1.5 rounded-lg text-xs hover:text-indigo-600 hover:border-indigo-200 transition-colors">
                                                {ev.type === 'image' ? <ImageIcon size={14} /> : <PlayCircle size={14} />}
                                                {ev.type === 'image' ? '查看照片' : '播放音频'}
                                             </button>
                                          ))}
                                       </div>
                                    )}
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            {/* Right Column: Info Deck (1/3) */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
               {/* Tabs */}
               <div className="flex border-b border-slate-100">
                  <InfoTab label="团队信息" active={activeInfoTab === 'info'} onClick={() => setActiveInfoTab('info')} />
                  <InfoTab label="游客名单" active={activeInfoTab === 'tourist'} onClick={() => setActiveInfoTab('tourist')} />
                  <InfoTab label="资源详情" active={activeInfoTab === 'resource'} onClick={() => setActiveInfoTab('resource')} />
               </div>

               <div className="flex-1 p-4 overflow-y-auto">
                  {activeInfoTab === 'info' && (
                     <div className="space-y-4">
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                           <div className="text-xs text-slate-500 mb-1">带团导游</div>
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-white border border-slate-200 overflow-hidden">
                                 <img src="https://picsum.photos/id/64/100/100" className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1">
                                 <div className="font-bold text-slate-800">{selectedTrip.guideName}</div>
                                 <div className="text-xs text-slate-400">138****8888</div>
                              </div>
                              <button className="p-2 bg-white rounded-full text-indigo-600 border border-indigo-100 shadow-sm"><Phone size={16}/></button>
                           </div>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                           <div className="text-xs text-slate-500 mb-1">随车司机</div>
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-white border border-slate-200 overflow-hidden">
                                 <img src="https://picsum.photos/id/1071/100/100" className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1">
                                 <div className="font-bold text-slate-800">{selectedTrip.driverName}</div>
                                 <div className="text-xs text-slate-400">贵A·88888 (别克GL8)</div>
                              </div>
                              <button className="p-2 bg-white rounded-full text-indigo-600 border border-indigo-100 shadow-sm"><Phone size={16}/></button>
                           </div>
                        </div>
                     </div>
                  )}

                  {activeInfoTab === 'tourist' && (
                     <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs text-slate-500 mb-2 px-1">
                           <span>共 {mockTourists.length} 人</span>
                           <span>实到 {mockTourists.filter(t => t.checkInStatus === 'checked').length} 人</span>
                        </div>
                        {mockTourists.map(t => (
                           <div key={t.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                              <div>
                                 <div className="font-bold text-slate-800 text-sm">{t.name}</div>
                                 <div className="text-xs text-slate-400 font-mono mt-0.5">{t.phone}</div>
                              </div>
                              {t.checkInStatus === 'checked' ? (
                                 <span className="text-xs text-green-600 font-medium bg-green-100 px-2 py-0.5 rounded flex items-center gap-1">
                                    <CheckCircle2 size={12} /> 已上车
                                 </span>
                              ) : (
                                 <span className="text-xs text-red-500 font-medium bg-red-50 px-2 py-0.5 rounded flex items-center gap-1">
                                    <AlertCircle size={12} /> 未打卡
                                 </span>
                              )}
                           </div>
                        ))}
                     </div>
                  )}

                  {activeInfoTab === 'resource' && (
                     <div className="space-y-3">
                        <ResourceCard type="hotel" title="安顺希尔顿酒店" status="confirmed" icon={BedDouble} />
                        <ResourceCard type="food" title="瀑布轩餐厅" status="confirmed" icon={Utensils} />
                        <ResourceCard type="spot" title="黄果树大瀑布" status="confirmed" icon={MapPin} />
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
     );
  }

  // Fallback
  return null;
};

// --- Helper Components ---

const TypeIcon: React.FC<{ type: string }> = ({ type }) => {
   const icons: any = { transport: Bus, food: Utensils, spot: MapPin, hotel: BedDouble };
   const colors: any = { transport: 'text-blue-500', food: 'text-orange-500', spot: 'text-green-500', hotel: 'text-purple-500' };
   const Icon = icons[type] || MapPin;
   return <Icon size={18} className={colors[type]} />;
};

const InfoTab: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({ label, active, onClick }) => (
   <button 
      onClick={onClick}
      className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${active ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50' : 'border-transparent text-slate-500 hover:text-indigo-600'}`}
   >
      {label}
   </button>
);

const ResourceCard: React.FC<{ type: string; title: string; status: string; icon: React.ElementType }> = ({ type, title, status, icon: Icon }) => (
   <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-slate-400 shadow-sm border border-slate-100">
         <Icon size={16} />
      </div>
      <div className="flex-1">
         <div className="text-sm font-bold text-slate-700">{title}</div>
         <div className="text-xs text-green-600 flex items-center gap-0.5">
            <CheckCircle2 size={10} /> {status === 'confirmed' ? '已确认' : '待确认'}
         </div>
      </div>
   </div>
);

const ReviewCard: React.FC<{ title: string; score: number; comment: string; isPercent?: boolean }> = ({ title, score, comment, isPercent }) => (
   <div className="bg-white rounded-xl p-4 border border-slate-100">
      <div className="flex justify-between items-start mb-2">
         <span className="text-sm font-bold text-slate-700">{title}</span>
         <span className={`text-sm font-bold ${score >= 90 ? 'text-green-600' : 'text-orange-500'}`}>
            {score}{isPercent ? '%' : '分'}
         </span>
      </div>
      <p className="text-xs text-slate-500 leading-relaxed">{comment}</p>
   </div>
);

export default TripTracker;
