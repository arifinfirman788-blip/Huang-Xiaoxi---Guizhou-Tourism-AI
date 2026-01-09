import React from 'react';
import { AlertCircle, CheckCircle2, FileBarChart, Users, ChevronRight, MapPin, Bell, Briefcase, TrendingUp, DollarSign } from 'lucide-react';
import { Complaint } from '../../types';

interface Props {
  onNavigate: (tab: any) => void;
}

const mockComplaints: Complaint[] = [
  { id: 'c1', touristName: '李先生', level: 'critical', content: '导游强制购物，态度恶劣', status: 'pending', time: '10分钟前' },
  { id: 'c2', touristName: '王女士', level: 'general', content: '酒店早餐供应不足', status: 'processing', time: '2小时前' },
  { id: 'c3', touristName: '赵先生', level: 'general', content: '车辆空调故障', status: 'pending', time: '3小时前' },
];

const AgencyWorkbench: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      
      {/* 1. Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <StatCard 
            title="当前在团游客" 
            value="1,286" 
            trend="+12%" 
            icon={Users} 
            color="bg-indigo-600" 
         />
         <StatCard 
            title="今日出团数" 
            value="42" 
            trend="+5" 
            icon={MapPin} 
            color="bg-blue-500" 
            subValue="个团"
         />
         <StatCard 
            title="本月合规分" 
            value="98.5" 
            trend="优" 
            icon={FileBarChart} 
            color="bg-emerald-500" 
         />
         <StatCard 
            title="待申报补贴" 
            value="¥ 12.5w" 
            trend="3笔" 
            icon={DollarSign} 
            color="bg-orange-500" 
         />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         {/* 2. Left Column: Complaints & Alerts (Wider) */}
         <div className="lg:col-span-2 space-y-6">
            
            {/* Complaints Panel */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                     <AlertCircle size={20} className="text-red-500" />
                     投诉处理中心
                     <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">{mockComplaints.length} 待办</span>
                  </h3>
                  <button className="text-sm text-slate-500 hover:text-indigo-600">查看全部</button>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                     <thead>
                        <tr className="border-b border-slate-100 text-slate-400">
                           <th className="pb-3 font-medium">状态</th>
                           <th className="pb-3 font-medium">游客/团号</th>
                           <th className="pb-3 font-medium">投诉内容</th>
                           <th className="pb-3 font-medium">时间</th>
                           <th className="pb-3 font-medium text-right">操作</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        {mockComplaints.map(c => (
                           <tr key={c.id} className="group hover:bg-slate-50 transition-colors">
                              <td className="py-3">
                                 {c.level === 'critical' 
                                    ? <span className="bg-red-50 text-red-600 px-2 py-1 rounded text-xs font-bold">重大</span>
                                    : <span className="bg-orange-50 text-orange-600 px-2 py-1 rounded text-xs">一般</span>}
                              </td>
                              <td className="py-3 font-medium text-slate-800">{c.touristName}</td>
                              <td className="py-3 text-slate-600 max-w-xs truncate" title={c.content}>{c.content}</td>
                              <td className="py-3 text-slate-400 text-xs">{c.time}</td>
                              <td className="py-3 text-right">
                                 <button className="text-indigo-600 hover:text-indigo-800 font-medium text-xs border border-indigo-200 hover:bg-indigo-50 px-3 py-1 rounded-lg transition-colors">处理</button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>

            {/* Monitoring Panel */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                     <MapPin size={20} className="text-blue-500" />
                     导游/司机实时监控
                  </h3>
                  <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full flex items-center gap-1">
                     <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                     系统运行正常
                  </span>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-50 rounded-xl p-4 flex items-start gap-3 border border-red-100">
                     <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-red-500 shadow-sm shrink-0">
                        <Bell size={20} />
                     </div>
                     <div>
                        <div className="text-sm font-bold text-red-800">打卡异常: 导游 张伟</div>
                        <div className="text-xs text-red-600 mt-1">黄果树团 (GZ-20231211-A) 未在规定时间(08:30)集合打卡，已超时30分钟。</div>
                        <div className="mt-2 flex gap-2">
                           <button className="text-xs bg-white text-red-600 border border-red-200 px-3 py-1 rounded hover:bg-red-50">呼叫导游</button>
                           <button className="text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">发送警告</button>
                        </div>
                     </div>
                  </div>
                  
                  <div className="bg-slate-50 rounded-xl p-4 flex items-center justify-between border border-slate-100">
                     <div>
                        <div className="text-slate-500 text-xs mb-1">今日打卡完成率</div>
                        <div className="text-2xl font-black text-slate-800">92%</div>
                        <div className="text-xs text-emerald-500 mt-1">36/39 已打卡</div>
                     </div>
                     <div className="w-16 h-16 rounded-full border-4 border-slate-200 border-t-emerald-500 rotate-45"></div>
                  </div>
               </div>
            </div>
         </div>

         {/* 3. Right Column: Quick Tools & Notifications */}
         <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
               <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Briefcase size={20} className="text-indigo-600" /> 
                  常用工具
               </h3>
               <div className="grid grid-cols-2 gap-3">
                  <ToolButton label="行程导入" icon={Briefcase} onClick={() => onNavigate('itinerary')} />
                  <ToolButton label="补贴申报" icon={DollarSign} onClick={() => onNavigate('policy')} />
                  <ToolButton label="电子合同" icon={FileBarChart} onClick={() => {}} />
                  <ToolButton label="满意度调研" icon={TrendingUp} onClick={() => {}} />
               </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-2xl p-6 text-white shadow-lg">
               <h3 className="font-bold mb-2">政策速递</h3>
               <div className="space-y-3">
                  <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm cursor-pointer hover:bg-white/20 transition-colors">
                     <div className="flex gap-2 items-center mb-1">
                        <span className="bg-red-500 text-[10px] px-1.5 rounded">补贴</span>
                        <span className="text-xs opacity-70">12-10</span>
                     </div>
                     <p className="text-sm font-medium leading-tight">2024年冬季旅游市场营销奖励补贴申报窗口已开启</p>
                  </div>
                  <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm cursor-pointer hover:bg-white/20 transition-colors">
                     <div className="flex gap-2 items-center mb-1">
                        <span className="bg-emerald-500 text-[10px] px-1.5 rounded">合规</span>
                        <span className="text-xs opacity-70">12-08</span>
                     </div>
                     <p className="text-sm font-medium leading-tight">关于加强元旦期间旅游市场秩序监管的通知</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: string; trend: string; icon: React.ElementType; color: string; subValue?: string }> = ({ title, value, trend, icon: Icon, color, subValue }) => (
   <div className={`rounded-2xl p-5 text-white shadow-md relative overflow-hidden ${color}`}>
      <div className="absolute top-0 right-0 p-4 opacity-10">
         <Icon size={64} />
      </div>
      <div className="relative z-10">
         <div className="flex items-center gap-2 opacity-90 mb-2">
            <Icon size={16} />
            <span className="text-sm font-medium">{title}</span>
         </div>
         <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black tracking-tight">{value}</span>
            {subValue && <span className="text-sm opacity-80">{subValue}</span>}
         </div>
         <div className="mt-3 inline-flex items-center px-2 py-0.5 rounded bg-white/20 text-xs font-medium backdrop-blur-sm">
            {trend}
         </div>
      </div>
   </div>
);

const ToolButton: React.FC<{ label: string; icon: React.ElementType; onClick: () => void }> = ({ label, icon: Icon, onClick }) => (
   <button onClick={onClick} className="flex flex-col items-center justify-center gap-2 p-4 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all border border-slate-100">
      <Icon size={24} className="opacity-70" />
      <span className="text-xs font-bold">{label}</span>
   </button>
);

export default AgencyWorkbench;