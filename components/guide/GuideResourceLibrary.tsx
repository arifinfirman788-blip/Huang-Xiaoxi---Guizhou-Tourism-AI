
import React, { useState } from 'react';
import { Search, MapPin, Phone, Navigation, Filter, ArrowLeft, Star, Building2, Utensils, Car, Mountain, Tag } from 'lucide-react';

interface Props {
  onBack: () => void;
}

type ResourceType = 'all' | 'spot' | 'hotel' | 'food' | 'car';

const mockResources = [
  { 
    id: '1', 
    type: 'spot', 
    name: '黄果树大瀑布', 
    image: 'https://picsum.photos/id/1018/100/100',
    location: '安顺市镇宁县', 
    rating: 4.9, 
    tags: ['绿色通道', '免票政策'], 
    contact: '0851-33596666', 
    distance: '2.5km',
    desc: '5A级景区，旅行社协议价'
  },
  { 
    id: '2', 
    type: 'food', 
    name: '老凯俚酸汤鱼(省府路店)', 
    image: 'https://picsum.photos/id/292/100/100',
    location: '贵阳市云岩区', 
    rating: 4.8, 
    tags: ['团餐协议', '包间预留'], 
    contact: '0851-86855555', 
    distance: '500m',
    desc: '非遗美食，支持签单'
  },
  { 
    id: '3', 
    type: 'hotel', 
    name: '安顺希尔顿逸林酒店', 
    image: 'https://picsum.photos/id/164/100/100',
    location: '安顺市虹山湖路', 
    rating: 4.9, 
    tags: ['司陪房免费', '早餐早开'], 
    contact: '0851-33888888', 
    distance: '12km',
    desc: '金牌合作酒店'
  },
  { 
    id: '4', 
    type: 'car', 
    name: '黔爽行车队调度中心', 
    image: 'https://picsum.photos/id/1071/100/100',
    location: '贵阳市南明区', 
    rating: 5.0, 
    tags: ['应急车辆', '24h响应'], 
    contact: '400-888-9999', 
    distance: '-',
    desc: '自有车队，快速调配'
  },
  { 
    id: '5', 
    type: 'spot', 
    name: '西江千户苗寨', 
    image: 'https://picsum.photos/id/1036/100/100',
    location: '雷山县西江镇', 
    rating: 4.7, 
    tags: ['演出票务', '行李转运'], 
    contact: '0855-3348888', 
    distance: '180km',
    desc: '含长桌宴预订服务'
  },
];

const GuideResourceLibrary: React.FC<Props> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<ResourceType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = mockResources.filter(item => {
    const matchesTab = activeTab === 'all' || item.type === activeTab;
    const matchesSearch = item.name.includes(searchQuery) || item.tags.some(t => t.includes(searchQuery));
    return matchesTab && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
     switch(type) {
        case 'spot': return <Mountain size={14} />;
        case 'hotel': return <Building2 size={14} />;
        case 'food': return <Utensils size={14} />;
        case 'car': return <Car size={14} />;
        default: return <Building2 size={14} />;
     }
  };

  const getTypeLabel = (type: string) => {
      switch(type) {
        case 'spot': return '景区';
        case 'hotel': return '酒店';
        case 'food': return '餐饮';
        case 'car': return '车队';
        default: return '资源';
     }
  }

  return (
    <div className="flex flex-col h-full bg-slate-50 absolute inset-0 z-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 pt-3 pb-3 border-b border-slate-100 sticky top-0 z-10">
         <div className="flex items-center gap-3 mb-3">
            <button onClick={onBack} className="p-1 -ml-1 hover:bg-slate-50 rounded-full transition-colors">
               <ArrowLeft size={22} className="text-slate-700" />
            </button>
            <h2 className="font-bold text-lg text-slate-800">合作资源库</h2>
         </div>
         
         <div className="flex gap-3">
            <div className="flex-1 relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
               <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索资源名称、标签..." 
                  className="w-full bg-slate-100 h-9 rounded-xl pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
               />
            </div>
            <button className="w-9 h-9 flex items-center justify-center bg-slate-100 rounded-xl text-slate-600">
               <Filter size={18} />
            </button>
         </div>

         {/* Tabs */}
         <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar">
            {[
               { id: 'all', label: '全部' },
               { id: 'spot', label: '景区' },
               { id: 'hotel', label: '酒店' },
               { id: 'food', label: '餐饮' },
               { id: 'car', label: '车队' },
            ].map(tab => (
               <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ResourceType)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                     activeTab === tab.id 
                     ? 'bg-slate-800 text-white shadow-md' 
                     : 'bg-white border border-slate-200 text-slate-600'
                  }`}
               >
                  {tab.label}
               </button>
            ))}
         </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
         {filteredResources.map(item => (
            <div key={item.id} className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 flex gap-3">
               <div className="w-20 h-20 rounded-xl bg-slate-100 shrink-0 overflow-hidden relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  <div className="absolute top-1 left-1 bg-black/60 backdrop-blur-md text-white text-[9px] px-1.5 py-0.5 rounded flex items-center gap-0.5">
                     {getTypeIcon(item.type)} {getTypeLabel(item.type)}
                  </div>
               </div>
               
               <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                     <div className="flex justify-between items-start">
                        <h3 className="font-bold text-slate-800 text-sm truncate pr-2">{item.name}</h3>
                        <div className="flex items-center gap-0.5 text-[10px] text-orange-500 font-bold bg-orange-50 px-1.5 py-0.5 rounded">
                           <Star size={8} fill="currentColor" /> {item.rating}
                        </div>
                     </div>
                     <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                        <MapPin size={10} />
                        <span className="truncate">{item.location}</span>
                        {item.distance !== '-' && <span>· 距您 {item.distance}</span>}
                     </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 my-1.5">
                     {item.tags.map((tag, i) => (
                        <span key={i} className="text-[9px] text-indigo-600 bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded">
                           {tag}
                        </span>
                     ))}
                  </div>

                  <div className="flex gap-2">
                     <button className="flex-1 bg-white border border-slate-200 text-slate-700 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1 hover:bg-slate-50 active:scale-95 transition-all">
                        <Navigation size={12} className="text-blue-500" /> 导航
                     </button>
                     <button className="flex-1 bg-slate-800 text-white py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1 hover:bg-slate-700 active:scale-95 transition-all shadow-sm">
                        <Phone size={12} /> 联系
                     </button>
                  </div>
               </div>
            </div>
         ))}
         
         {filteredResources.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
               <Search size={40} className="mb-2 opacity-20" />
               <p className="text-xs">未找到相关资源</p>
            </div>
         )}
      </div>
    </div>
  );
};

export default GuideResourceLibrary;
