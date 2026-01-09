
import React, { useState } from 'react';
import { Box, Plus, Search, Globe, LayoutGrid, Info, CheckCircle2, QrCode, Filter, MoreVertical, Edit3, Trash2, ShieldCheck, Zap } from 'lucide-react';

interface ResourceItem {
  id: string;
  name: string;
  source: 'self' | 'hx';
  supplier: string;
  originalPrice: number; // 协议成本
  suggestedPrice: number; // 建议零售
  commission: number; // 预留分成/分润
  stock: number | 'unlimited';
  category: string;
  cover: string;
  tag: string;
}

const mockInventory: ResourceItem[] = [
  { 
    id: 'self1', name: '【自营】天逸定制：黄果树摄影私享包车', source: 'self', supplier: '天逸车队', 
    originalPrice: 880, suggestedPrice: 1280, commission: 200, stock: 12, category: '用车', 
    cover: 'https://picsum.photos/id/1071/400/300', tag: '高毛利' 
  },
  { 
    id: 'self2', name: '【自营】苗家非遗长桌宴(天逸专属预留位)', source: 'self', supplier: '西江餐饮部', 
    originalPrice: 128, suggestedPrice: 198, commission: 50, stock: 40, category: '餐饮', 
    cover: 'https://picsum.photos/id/292/400/300', tag: '口碑' 
  },
  { 
    id: 'hx1', name: '黄果树VIP免排队快速通道', source: 'hx', supplier: '黄果树旅投', 
    originalPrice: 150, suggestedPrice: 198, commission: 20, stock: 'unlimited', category: '景区特权', 
    cover: 'https://picsum.photos/id/1018/400/300', tag: '爆款' 
  },
  { 
    id: 'hx2', name: '西江千户苗寨旅拍精选A套餐', source: 'hx', supplier: '西江影像', 
    originalPrice: 350, suggestedPrice: 498, commission: 45, stock: 100, category: '娱乐', 
    cover: 'https://picsum.photos/id/1036/400/300', tag: '高转化' 
  },
  { 
    id: 'hx3', name: '梵净山索道往返优选票', source: 'hx', supplier: '三特索道', 
    originalPrice: 140, suggestedPrice: 160, commission: 15, stock: 'unlimited', category: '票务', 
    cover: 'https://picsum.photos/id/1040/400/300', tag: '官方' 
  },
];

const InventoryManagement: React.FC = () => {
  const [sourceFilter, setSourceFilter] = useState<'all' | 'self' | 'hx'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = mockInventory.filter(item => {
    const matchesSource = sourceFilter === 'all' || item.source === sourceFilter;
    const matchesSearch = item.name.includes(searchQuery) || item.supplier.includes(searchQuery);
    return matchesSource && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 顶部统计与工具栏 */}
      <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
         <div className="flex items-center gap-6">
            <div className="flex flex-col">
               <h2 className="font-black text-2xl text-slate-800 flex items-center gap-3">
                  <Box size={28} className="text-indigo-600" /> 商品资源库
               </h2>
               <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Resource & Inventory Management</p>
            </div>
            
            <div className="h-10 w-px bg-slate-100 hidden md:block"></div>
            
            <div className="flex p-1 bg-slate-100 rounded-xl">
               <button 
                  onClick={() => setSourceFilter('all')}
                  className={`px-5 py-2 text-xs font-black rounded-lg transition-all ${sourceFilter === 'all' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
               >
                  全部
               </button>
               <button 
                  onClick={() => setSourceFilter('self')}
                  className={`px-5 py-2 text-xs font-black rounded-lg transition-all ${sourceFilter === 'self' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
               >
                  自营资源
               </button>
               <button 
                  onClick={() => setSourceFilter('hx')}
                  className={`px-5 py-2 text-xs font-black rounded-lg transition-all ${sourceFilter === 'hx' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
               >
                  黄小西精选
               </button>
            </div>
         </div>

         <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
               <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
               <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索商品名、供应商..." 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-4 focus:ring-indigo-50 transition-all"
               />
            </div>
            <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-black text-sm shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all flex items-center gap-2">
               <Plus size={18} /> 新增自营资源
            </button>
         </div>
      </div>

      {/* 资源列表表格 */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
         <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/80 border-b border-slate-100">
               <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <th className="px-8 py-5">商品信息 / 属性</th>
                  <th className="px-8 py-5">库存状态</th>
                  <th className="px-8 py-5">协议成本</th>
                  <th className="px-8 py-5">建议零售价</th>
                  <th className="px-8 py-5">分销分润</th>
                  <th className="px-8 py-5">来源</th>
                  <th className="px-8 py-5 text-right">操作</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
               {filteredItems.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-all group">
                     <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                           <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-sm border border-slate-100 relative group">
                              <img src={item.cover} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="cover" />
                              <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-white/90 text-[8px] font-black text-slate-800 shadow-sm">{item.category}</div>
                           </div>
                           <div>
                              <div className="font-black text-slate-800 group-hover:text-indigo-600 transition-colors flex items-center gap-2">
                                 {item.name}
                                 {item.tag && <span className="px-1.5 py-0.5 rounded-md bg-orange-50 text-orange-600 text-[9px] font-black border border-orange-100">{item.tag}</span>}
                              </div>
                              <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                                 <ShieldCheck size={10} className="text-emerald-500" />
                                 {item.supplier}
                              </div>
                           </div>
                        </div>
                     </td>
                     <td className="px-8 py-5">
                        {item.stock === 'unlimited' ? (
                           <div className="flex items-center gap-1.5 text-emerald-600 font-black">
                              <Zap size={14} /> 实时确认
                           </div>
                        ) : (
                           <div className="flex flex-col gap-1">
                              <div className="font-black text-slate-700">{item.stock} <span className="text-[10px] text-slate-400 font-normal">剩余</span></div>
                              <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                 <div className={`h-full ${item.stock < 10 ? 'bg-rose-500' : 'bg-indigo-500'} rounded-full`} style={{ width: `${Math.min(100, (Number(item.stock)/50)*100)}%` }}></div>
                              </div>
                           </div>
                        )}
                     </td>
                     <td className="px-8 py-5">
                        <div className="font-black text-slate-800">¥{item.originalPrice}</div>
                     </td>
                     <td className="px-8 py-5">
                        <div className="font-black text-slate-800">¥{item.suggestedPrice}</div>
                     </td>
                     <td className="px-8 py-5">
                        <div className="flex flex-col">
                           <span className="font-black text-emerald-600">¥{item.commission}</span>
                           <span className="text-[9px] text-slate-400 font-bold uppercase">Estimated Profit</span>
                        </div>
                     </td>
                     <td className="px-8 py-5">
                        <div className={`text-[10px] font-black inline-flex items-center gap-1 px-3 py-1 rounded-full border shadow-sm ${item.source === 'self' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-indigo-50 text-indigo-600 border-indigo-100'}`}>
                           {item.source === 'self' ? <LayoutGrid size={10} /> : <Globe size={10} />}
                           {item.source === 'self' ? '自营' : '精选库'}
                        </div>
                     </td>
                     <td className="px-8 py-5 text-right">
                        <div className="flex justify-end gap-2">
                           <button className="p-2.5 bg-white text-slate-400 hover:text-indigo-600 rounded-xl border border-slate-100 hover:border-indigo-100 shadow-sm transition-all"><Edit3 size={16}/></button>
                           {item.source === 'self' && <button className="p-2.5 bg-white text-slate-400 hover:text-rose-600 rounded-xl border border-slate-100 hover:border-rose-100 shadow-sm transition-all"><Trash2 size={16}/></button>}
                           <button className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100 shadow-sm hover:bg-indigo-100 transition-all" title="查看详情"><Info size={16}/></button>
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
         {filteredItems.length === 0 && (
            <div className="py-20 text-center text-slate-400">
               <Box size={48} className="mx-auto mb-4 opacity-10" />
               <p className="font-black">未找到匹配的资源项</p>
            </div>
         )}
      </div>
    </div>
  );
};

export default InventoryManagement;
