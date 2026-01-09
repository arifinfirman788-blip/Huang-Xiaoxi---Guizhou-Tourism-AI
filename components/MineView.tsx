
import React, { useState } from 'react';
import { User, Settings, CreditCard, Heart, Map, Clock, ChevronRight, Star, Award, ShieldCheck, FileText, Calendar, MapPin, MessageSquare } from 'lucide-react';
import TripReportOverlay from './TripReportOverlay';
import ServiceEvaluationOverlay from './ServiceEvaluationOverlay';
import { TripEvaluation } from '../types';

interface TripHistoryItem {
  id: string;
  title: string;
  date: string;
  status: 'active' | 'completed';
  days: number;
  cover: string;
}

const mockTrips: TripHistoryItem[] = [
  { id: '1', title: '黄果树+苗寨5日深度游', date: '2023.12.11 - 12.15', status: 'active', days: 5, cover: 'https://picsum.photos/id/10/300/150' },
  { id: '2', title: '遵义红色研学之旅', date: '2023.10.01 - 10.03', status: 'completed', days: 3, cover: 'https://picsum.photos/id/16/300/150' },
  { id: '3', title: '荔波小七孔避暑行', date: '2023.08.15 - 08.18', status: 'completed', days: 4, cover: 'https://picsum.photos/id/28/300/150' },
];

const MineView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'trips' | 'favorites'>('trips');
  const [showReport, setShowReport] = useState<boolean>(false);
  const [evaluatingTrip, setEvaluatingTrip] = useState<TripHistoryItem | null>(null);

  const handleEvaluationSubmit = (data: TripEvaluation) => {
    console.log('Evaluation Data Submitted:', data);
    // In a production environment, this would be an API call to save the rating
    // which then populates the agency report.
    setEvaluatingTrip(null);
  };

  return (
    <div className="min-h-full bg-slate-50 relative pb-24">
      
      {/* 1. Header & Profile */}
      <div className="bg-white pb-6 rounded-b-[2rem] shadow-sm relative overflow-hidden">
         {/* Decoration */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/4"></div>
         
         <div className="px-6 pt-8 relative z-10">
            <div className="flex justify-between items-start mb-6">
               <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full border-2 border-white shadow-md overflow-hidden">
                     <img src="https://picsum.photos/id/64/200/200" className="w-full h-full object-cover" alt="User" />
                  </div>
                  <div>
                     <h2 className="text-xl font-black text-slate-800">旅行家小王</h2>
                     <div className="flex gap-2 mt-1">
                        <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-bold border border-indigo-100 flex items-center gap-1">
                           <Award size={10} /> 银牌体验官
                        </span>
                        <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold">
                           Lv.5
                        </span>
                     </div>
                  </div>
               </div>
               <button className="text-slate-400 hover:text-slate-600 p-2">
                  <Settings size={20} />
               </button>
            </div>

            {/* Stats Row */}
            <div className="flex justify-around mb-6">
               <div className="text-center">
                  <div className="text-lg font-black text-slate-800">12</div>
                  <div className="text-xs text-slate-400 font-medium">我的行程</div>
               </div>
               <div className="text-center">
                  <div className="text-lg font-black text-slate-800">58</div>
                  <div className="text-xs text-slate-400 font-medium">收藏景点</div>
               </div>
               <div className="text-center">
                  <div className="text-lg font-black text-slate-800">3</div>
                  <div className="text-xs text-slate-400 font-medium">优惠券</div>
               </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-900 text-white p-4 rounded-xl shadow-lg flex justify-between items-center">
               <div className="flex gap-4">
                  <div className="flex flex-col items-center gap-1 cursor-pointer hover:opacity-80">
                     <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><CreditCard size={16}/></div>
                     <span className="text-[10px]">我的订单</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 cursor-pointer hover:opacity-80">
                     <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><ShieldCheck size={16}/></div>
                     <span className="text-[10px]">旅游保险</span>
                  </div>
               </div>
               <div className="h-8 w-[1px] bg-white/10 mx-2"></div>
               <button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg h-10 flex items-center justify-center text-xs font-bold shadow-md active:scale-95 transition-transform">
                  <Star size={14} className="mr-1" fill="currentColor"/> 成为会员
               </button>
            </div>
         </div>
      </div>

      {/* 2. Content Tabs */}
      <div className="px-6 mt-6">
         <div className="flex gap-6 border-b border-slate-200 mb-4">
            <button 
               onClick={() => setActiveTab('trips')}
               className={`pb-3 text-sm font-bold transition-all relative ${activeTab === 'trips' ? 'text-slate-800' : 'text-slate-400'}`}
            >
               我的行程
               {activeTab === 'trips' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-800 rounded-full"></div>}
            </button>
            <button 
               onClick={() => setActiveTab('favorites')}
               className={`pb-3 text-sm font-bold transition-all relative ${activeTab === 'favorites' ? 'text-slate-800' : 'text-slate-400'}`}
            >
               收藏夹
               {activeTab === 'favorites' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-800 rounded-full"></div>}
            </button>
         </div>

         {activeTab === 'trips' ? (
            <div className="space-y-4">
               {mockTrips.map(trip => (
                  <div key={trip.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group animate-in fade-in slide-in-from-bottom-2 duration-500">
                     <div className="h-32 relative overflow-hidden">
                        <img 
                           src={trip.cover} 
                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                           alt={trip.title} 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute top-3 left-3">
                           <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20 backdrop-blur-md text-white ${trip.status === 'active' ? 'bg-green-500/80' : 'bg-slate-500/80'}`}>
                              {trip.status === 'active' ? '进行中' : '已完成'}
                           </span>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                           <h3 className="font-bold text-base truncate">{trip.title}</h3>
                           <div className="flex items-center gap-2 text-[10px] opacity-90 mt-0.5">
                              <Calendar size={10} /> {trip.date} · {trip.days}天
                           </div>
                        </div>
                     </div>
                     <div className="p-3 flex items-center justify-between bg-white">
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                           <MapPin size={12} className="text-blue-500" />
                           贵州省
                        </div>
                        <div className="flex gap-2">
                           {trip.status === 'completed' && (
                              <button 
                                 onClick={() => setEvaluatingTrip(trip)}
                                 className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg active:scale-95 transition-transform border border-indigo-100"
                              >
                                 <MessageSquare size={12} />
                                 服务评价
                              </button>
                           )}
                           <button 
                              onClick={() => trip.status === 'active' ? null : setShowReport(true)}
                              className={`flex items-center gap-1 text-[11px] font-bold px-3 py-1.5 rounded-lg active:scale-95 transition-transform border ${trip.status === 'active' ? 'bg-slate-50 text-slate-400 border-slate-100 cursor-not-allowed' : 'bg-slate-900 text-white border-slate-900 shadow-sm'}`}
                           >
                              <FileText size={12} />
                              行程报告
                           </button>
                        </div>
                     </div>
                  </div>
               ))}
               
               <button className="w-full py-4 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 text-xs font-bold flex items-center justify-center gap-2 hover:bg-white hover:border-slate-300 transition-all">
                  <Clock size={14} /> 查看更早的行程记录
               </button>
            </div>
         ) : (
            <div className="py-20 flex flex-col items-center justify-center text-center">
               <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-4">
                  <Heart size={40} />
               </div>
               <h3 className="text-slate-800 font-bold">暂无收藏</h3>
               <p className="text-slate-400 text-xs mt-1">去首页发现更多精彩景点和路线吧</p>
               <button className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-full text-xs font-bold shadow-lg shadow-indigo-100 active:scale-95 transition-transform">
                  去逛逛
               </button>
            </div>
         )}
      </div>

      {/* 3. Overlays */}
      {showReport && <TripReportOverlay onClose={() => setShowReport(false)} />}
      
      {evaluatingTrip && (
         <ServiceEvaluationOverlay 
            tripTitle={evaluatingTrip.title}
            onClose={() => setEvaluatingTrip(null)}
            onSubmit={handleEvaluationSubmit}
         />
      )}
    </div>
  );
};

export default MineView;
