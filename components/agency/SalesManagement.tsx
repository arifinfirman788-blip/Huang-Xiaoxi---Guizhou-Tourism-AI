
import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, DollarSign, Users, ShoppingCart, Search, Filter, 
  ArrowUpRight, ChevronRight, User, Calendar, QrCode, Download, FileBarChart, 
  PieChart, LineChart, LayoutGrid, Globe, MousePointer2 
} from 'lucide-react';

interface SaleRecord {
  id: string;
  orderNo: string;
  productName: string;
  customerName: string;
  customerPhone: string;
  sellerName: string; 
  sellerRole: 'guide' | 'broker' | 'system' | 'mall';
  salePrice: number;
  costPrice: number;
  commission: number;
  profit: number;
  time: string;
  status: 'paid' | 'completed' | 'refunded';
}

const mockSales: SaleRecord[] = [
  { id: 's1', orderNo: 'ORD-1211-889', productName: '黄果树VIP免排队快速通道', customerName: '张建国', customerPhone: '138****1234', sellerName: '王金牌', sellerRole: 'guide', salePrice: 198, costPrice: 150, commission: 20, profit: 28, time: '2023-12-11 10:25', status: 'completed' },
  { id: 's2', orderNo: 'ORD-1211-912', productName: '【自营】苗家非遗长桌宴', customerName: '李淑芬', customerPhone: '139****5678', sellerName: '王金牌', sellerRole: 'guide', salePrice: 198, costPrice: 128, commission: 30, profit: 40, time: '2023-12-11 11:45', status: 'paid' },
  { id: 's3', orderNo: 'ORD-1210-456', productName: '黄果树摄影私享包车', customerName: '赵雷', customerPhone: '137****0000', sellerName: 'AI自动推荐', sellerRole: 'system', salePrice: 1280, costPrice: 880, commission: 0, profit: 400, time: '2023-12-10 16:10', status: 'completed' },
  { id: 's4', orderNo: 'ORD-1209-112', productName: '西江旅拍精选A套餐', customerName: '陈漫', customerPhone: '135****8888', sellerName: '游客自主浏览', sellerRole: 'mall', salePrice: 498, costPrice: 350, commission: 0, profit: 148, time: '2023-12-09 20:30', status: 'completed' },
];

const SalesManagement: React.FC = () => {
  const [activeAnalysisTab, setActiveAnalysisTab] = useState<'list' | 'analytics'>('list');

  // --- 趋势分析视图 ---
  const AnalyticsView = () => {
    const data = [45, 52, 38, 65, 48, 72, 85]; // 模拟7天订单量
    const max = Math.max(...data);
    
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 1. GMV 趋势图 */}
            <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
               <div className="flex justify-between items-center mb-8">
                  <div>
                     <h3 className="font-black text-slate-800 text-lg flex items-center gap-2">
                        <LineChart size={20} className="text-indigo-600" /> 近7日分销成交趋势
                     </h3>
                     <p className="text-xs text-slate-400 mt-1">对比每日成交总额与净利润</p>
                  </div>
                  <div className="flex gap-4">
                     <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                        <div className="w-3 h-3 rounded-full bg-indigo-600"></div> GMV
                     </div>
                     <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div> 利润
                     </div>
                  </div>
               </div>

               <div className="h-64 w-full flex items-end justify-between px-4 relative">
                  {/* 网格线 */}
                  <div className="absolute inset-x-0 top-0 h-px bg-slate-50"></div>
                  <div className="absolute inset-x-0 top-1/4 h-px bg-slate-50"></div>
                  <div className="absolute inset-x-0 top-2/4 h-px bg-slate-50"></div>
                  <div className="absolute inset-x-0 top-3/4 h-px bg-slate-50"></div>
                  
                  {data.map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                       <div className="w-full max-w-[40px] flex items-end justify-center gap-1 h-48 relative">
                          {/* GMV Bar */}
                          <div 
                             style={{ height: `${(val/max)*100}%` }}
                             className="w-4 bg-indigo-600 rounded-t-lg transition-all duration-1000 group-hover:bg-indigo-400 cursor-help"
                          >
                             <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">¥{(val*100).toLocaleString()}</div>
                          </div>
                          {/* Profit Bar */}
                          <div 
                             style={{ height: `${(val*0.3/max)*100}%` }}
                             className="w-4 bg-emerald-500 rounded-t-lg transition-all duration-1000 group-hover:bg-emerald-300"
                          ></div>
                       </div>
                       <span className="text-[10px] font-black text-slate-400 uppercase">12-{11-i}</span>
                    </div>
                  ))}
               </div>
            </div>

            {/* 2. 渠道占比分析 */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col">
               <h3 className="font-black text-slate-800 text-lg mb-6">销售渠道构成</h3>
               <div className="flex-1 flex items-center justify-center relative">
                  <div className="w-40 h-40 rounded-full border-[12px] border-slate-50 flex items-center justify-center flex-col relative overflow-hidden">
                     {/* 模拟饼图区块 */}
                     <div className="absolute inset-0 bg-indigo-600" style={{ clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 0 100%, 0 70%)' }}></div>
                     <div className="absolute inset-0 bg-orange-400" style={{ clipPath: 'polygon(50% 50%, 50% 0, 0 0, 0 70%)' }}></div>
                     {/* 中心镂空 */}
                     <div className="absolute inset-4 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Total GMV</span>
                        <span className="text-lg font-black text-slate-800">100%</span>
                     </div>
                  </div>
               </div>
               <div className="space-y-3 mt-6">
                  <ChannelItem color="bg-indigo-600" label="AI 智能推荐" value="65%" sub="System Trigger" />
                  <ChannelItem color="bg-orange-400" label="导游意图分销" value="25%" sub="Agent Sales" />
                  <ChannelItem color="bg-slate-200" label="货架商城自主购" value="10%" sub="Direct Mall" />
               </div>
            </div>
         </div>

         {/* 热销榜单 */}
         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <h3 className="font-black text-slate-800 text-lg mb-6 flex items-center gap-2">
               <TrendingUp size={20} className="text-orange-500" /> 分销产品爆款榜
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
               {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:border-indigo-200 transition-all cursor-pointer group">
                     <div className="text-2xl font-black text-slate-200 group-hover:text-indigo-100 italic transition-colors">0{i}</div>
                     <div className="flex-1 min-w-0">
                        <div className="font-bold text-slate-700 text-sm truncate">黄果树VIP免排队快速通道</div>
                        <div className="flex items-center gap-2 mt-1">
                           <span className="text-[10px] text-indigo-600 font-black">1.2k+ 销量</span>
                           <span className="text-[10px] text-emerald-500 font-bold">42% 转化</span>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 顶部看板保持不变 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-4">
               <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl"><ShoppingCart size={22}/></div>
               <span className="text-[10px] font-black text-emerald-500 flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full"><ArrowUpRight size={10}/> +15.4%</span>
            </div>
            <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">分销总成交 (GMV)</div>
            <div className="text-2xl font-black text-slate-800 italic">¥ 28,450.00</div>
         </div>
         <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-4">
               <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-2xl"><DollarSign size={22}/></div>
               <span className="text-[10px] font-black text-emerald-500 flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full"><ArrowUpRight size={10}/> +12.8%</span>
            </div>
            <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">旅行社净利润贡献</div>
            <div className="text-2xl font-black text-emerald-600 italic">¥ 8,120.00</div>
         </div>
         <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-4">
               <div className="p-2.5 bg-orange-50 text-orange-600 rounded-2xl"><Users size={22}/></div>
               <span className="text-[10px] font-black text-slate-400 flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-full">Active</span>
            </div>
            <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">已支取导游提成</div>
            <div className="text-2xl font-black text-slate-800 italic">¥ 3,450.00</div>
         </div>
         <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-3xl shadow-lg text-white relative overflow-hidden">
            <div className="absolute -right-2 -top-2 opacity-10"><BarChart3 size={80} /></div>
            <div className="relative z-10">
               <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">当前转化冠军</div>
               <div className="text-lg font-black truncate">导游 · 王金牌</div>
               <div className="flex items-center gap-2 mt-2">
                  <span className="text-2xl font-black text-indigo-400">12 笔</span>
                  <span className="text-[9px] bg-indigo-500/30 px-2 py-0.5 rounded-full font-bold">Conv. Rate 42%</span>
               </div>
            </div>
         </div>
      </div>

      <div className="flex justify-between items-center bg-white p-4 rounded-[2rem] shadow-sm border border-slate-200">
         <div className="flex items-center gap-8">
            <div className="flex p-1 bg-slate-100 rounded-xl">
               <button onClick={() => setActiveAnalysisTab('list')} className={`px-8 py-2.5 text-xs font-black rounded-lg transition-all flex items-center gap-2 ${activeAnalysisTab === 'list' ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-500'}`}>
                  <FileBarChart size={14}/> 销售明细表
               </button>
               <button onClick={() => setActiveAnalysisTab('analytics')} className={`px-8 py-2.5 text-xs font-black rounded-lg transition-all flex items-center gap-2 ${activeAnalysisTab === 'analytics' ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-500'}`}>
                  <TrendingUp size={14}/> 趋势分析
               </button>
            </div>
         </div>
         <div className="flex items-center gap-3">
            <div className="relative w-64">
               <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
               <input type="text" placeholder="搜索订单、客户、人员..." className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs outline-none focus:ring-4 focus:ring-indigo-50" />
            </div>
            <button className="p-2.5 bg-slate-50 text-slate-500 hover:text-indigo-600 rounded-xl border border-slate-200 hover:border-indigo-200 transition-all"><Download size={18} /></button>
         </div>
      </div>

      {activeAnalysisTab === 'list' ? (
         <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left text-sm">
               <thead className="bg-slate-50/80 border-b border-slate-100">
                  <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                     <th className="px-8 py-5">成交订单 / 时间</th>
                     <th className="px-8 py-5">销售商品</th>
                     <th className="px-8 py-5">销售人员 / 渠道</th>
                     <th className="px-8 py-5">实收金额</th>
                     <th className="px-8 py-5 text-right">状态</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {mockSales.map(sale => (
                     <tr key={sale.id} className="hover:bg-slate-50/50 transition-all group">
                        <td className="px-8 py-5">
                           <div className="font-black text-slate-800 font-mono text-xs">{sale.orderNo}</div>
                           <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1"><Calendar size={10}/> {sale.time}</div>
                        </td>
                        <td className="px-8 py-5">
                           <div className="font-bold text-slate-800 line-clamp-1">{sale.productName}</div>
                        </td>
                        <td className="px-8 py-5">
                           <div className="flex items-center gap-2">
                              <div className={`p-1.5 rounded-lg ${sale.sellerRole === 'system' ? 'bg-indigo-50 text-indigo-600' : sale.sellerRole === 'mall' ? 'bg-slate-100 text-slate-500' : 'bg-orange-50 text-orange-600'}`}>
                                 {sale.sellerRole === 'system' ? <TrendingUp size={14}/> : sale.sellerRole === 'mall' ? <LayoutGrid size={14}/> : <QrCode size={14}/>}
                              </div>
                              <div>
                                 <div className="font-bold text-slate-700">{sale.sellerName}</div>
                                 <div className="text-[9px] font-black uppercase tracking-tighter opacity-50">{sale.sellerRole}</div>
                              </div>
                           </div>
                        </td>
                        <td className="px-8 py-5">
                           <div className="font-black text-indigo-600 text-lg">¥{sale.salePrice}</div>
                        </td>
                        <td className="px-8 py-5 text-right">
                           <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${sale.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                              {sale.status === 'completed' ? '已核销' : '已支付'}
                           </span>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      ) : <AnalyticsView />}
    </div>
  );
};

const ChannelItem = ({ color, label, value, sub }: any) => (
   <div className="flex justify-between items-center group">
      <div className="flex items-center gap-3">
         <div className={`w-2.5 h-2.5 rounded-full ${color}`}></div>
         <div>
            <div className="text-xs font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">{label}</div>
            <div className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">{sub}</div>
         </div>
      </div>
      <span className="text-sm font-black text-slate-800">{value}</span>
   </div>
);

export default SalesManagement;
