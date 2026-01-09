
import React, { useState } from 'react';
import { ArrowLeft, Search, SlidersHorizontal } from 'lucide-react';
import ServiceCard from './ServiceCard';
import { ServiceItem } from '../types';

interface Props {
  onBack: () => void;
  onConsult: (item: ServiceItem) => void;
}

// Mock Data
const mockServices: ServiceItem[] = [
  // 旅行社 (Agency)
  {
    id: 'a1',
    name: '贵州省中国青年旅行社',
    avatarUrl: 'https://picsum.photos/id/1015/200/200',
    isVerified: true,
    verifiedLabel: '官方认证',
    organizationName: '贵州省青旅总部',
    organizationRank: '5A级旅行社',
    description: '专注贵州深度游30年，提供小包团、定制游服务。资源直采，无隐形消费。',
    tags: [
      { text: '国企背景', level: 'primary' },
      { text: '纯玩无购物', level: 'highlight' },
      { text: '家庭游', level: 'secondary' },
      { text: '研学', level: 'secondary' }
    ],
    consultationCount: 12580,
    score: 4.9,
    promptQuestion: '一家人来贵州玩5天，怎么安排不累？',
    category: 'agency'
  },
  {
    id: 'a2',
    name: '山水假日国际旅行社',
    avatarUrl: 'https://picsum.photos/id/1036/200/200',
    isVerified: true,
    organizationName: '贵阳分社',
    organizationRank: '金牌商家',
    description: '年轻人首选的旅行社，主打房车露营、户外探险等新潮玩法。',
    tags: [
      { text: '特种兵旅游', level: 'highlight' },
      { text: '房车', level: 'secondary' },
      { text: '徒步', level: 'secondary' }
    ],
    consultationCount: 5600,
    score: 4.8,
    promptQuestion: '有哪些适合年轻人的小众路线？',
    category: 'agency'
  },
  // 导游 (Guide)
  {
    id: 'g1',
    name: '王金牌',
    avatarUrl: 'https://picsum.photos/id/64/200/200',
    isVerified: true,
    verifiedLabel: '金牌导游',
    organizationName: '贵州省导游协会',
    organizationRank: '高级导游',
    description: '10年从业经验，风趣幽默，擅长历史文化讲解与摄影指导。',
    tags: [
      { text: '摄影达人', level: 'primary' },
      { text: '亲子友好', level: 'highlight' },
      { text: '历史通', level: 'secondary' }
    ],
    consultationCount: 8900,
    score: 5.0,
    promptQuestion: '带老人小孩去黄果树要注意什么？',
    category: 'guide'
  },
  {
    id: 'g2',
    name: '苗寨阿朵',
    avatarUrl: 'https://picsum.photos/id/338/200/200',
    isVerified: true,
    verifiedLabel: '民俗专家',
    organizationName: '西江千户苗寨',
    organizationRank: '本地向导',
    description: '土生土长的苗家姑娘，带你体验最地道的长桌宴和高山流水。',
    tags: [
      { text: '苗族文化', level: 'primary' },
      { text: '旅拍', level: 'secondary' }
    ],
    consultationCount: 3400,
    score: 4.9,
    promptQuestion: '苗寨里面哪家民宿风景最好？',
    category: 'guide'
  },
  // 酒店 (Hotel)
  {
    id: 'h1',
    name: '黄果树柏联酒店',
    avatarUrl: 'https://picsum.photos/id/1040/200/200',
    isVerified: true,
    organizationName: '柏联集团',
    organizationRank: '奢华度假',
    description: '坐落于黄果树瀑布核心景区，拥有私密汤屋与极致山水景观。',
    tags: [
      { text: '景观房', level: 'primary' },
      { text: '温泉', level: 'highlight' },
      { text: '避世', level: 'secondary' }
    ],
    consultationCount: 2100,
    score: 4.9,
    promptQuestion: '酒店可以直接看到瀑布吗？',
    category: 'hotel'
  },
  // 景区 (Spot)
  {
    id: 's1',
    name: '西江千户苗寨·智慧服务',
    avatarUrl: 'https://picsum.photos/id/1018/200/200',
    isVerified: true,
    organizationName: '西江旅游集团',
    organizationRank: '5A景区',
    description: '官方智能助手，提供门票预订、演出时刻表、路线规划服务。',
    tags: [
      { text: '官方直营', level: 'primary' },
      { text: '智能客服', level: 'secondary' }
    ],
    consultationCount: 45000,
    score: 4.7,
    promptQuestion: '今晚的《美丽西江》演出还有票吗？',
    category: 'spot'
  },
  // 车队 (Car)
  {
    id: 'c1',
    name: '黔爽行商务车队',
    avatarUrl: 'https://picsum.photos/id/1071/200/200',
    isVerified: true,
    organizationName: '贵州交运集团',
    organizationRank: '星级车队',
    description: '全系别克GL8、奔驰V260，司机驾龄15年以上，配矿泉水/充电线。',
    tags: [
      { text: '正规营运', level: 'primary' },
      { text: '舒适', level: 'secondary' },
      { text: '接送机', level: 'secondary' }
    ],
    consultationCount: 6700,
    score: 4.9,
    promptQuestion: '包车环线游一天大概多少钱？',
    category: 'car'
  },
  // 餐饮 (Food)
  {
    id: 'f1',
    name: '老凯俚酸汤鱼·总店',
    avatarUrl: 'https://picsum.photos/id/292/200/200',
    isVerified: true,
    organizationName: '餐饮协会理事',
    organizationRank: '必吃榜',
    description: '非遗酸汤传承人，贵州必打卡美食。',
    tags: [
      { text: '非遗', level: 'highlight' },
      { text: '老字号', level: 'primary' },
      { text: '排队王', level: 'secondary' }
    ],
    consultationCount: 18000,
    score: 4.8,
    promptQuestion: '两个人吃大概需要多少钱？',
    category: 'food'
  }
];

const categories = [
  { id: 'all', label: '全部' },
  { id: 'agency', label: '旅行社' },
  { id: 'guide', label: '导游' },
  { id: 'hotel', label: '酒店' },
  { id: 'spot', label: '景区' },
  { id: 'car', label: '车队' },
  { id: 'food', label: '餐饮' },
];

const ExpertListView: React.FC<Props> = ({ onBack, onConsult }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredServices = activeCategory === 'all' 
    ? mockServices 
    : mockServices.filter(s => s.category === activeCategory);

  return (
    <div className="min-h-full bg-[#f5f7fa] flex flex-col">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="flex items-center px-4 h-14 gap-4">
          <button 
            onClick={onBack}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition-all"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="搜索金牌导游 / 酒店 / 路线" 
              className="w-full bg-gray-100 rounded-full h-9 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
          <button className="text-gray-500 hover:text-gray-700">
             <SlidersHorizontal size={20} />
          </button>
        </div>

        {/* Categories Tab */}
        <div className="px-4 pb-2 overflow-x-auto no-scrollbar flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`
                px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300
                ${activeCategory === cat.id 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                  : 'bg-white text-gray-600 border border-gray-100 hover:bg-gray-50'}
              `}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* List Content */}
      <div className="p-4 space-y-3 pb-32">
         {filteredServices.map(item => (
            <ServiceCard key={item.id} item={item} onConsult={onConsult} />
         ))}
         
         <div className="text-center py-6">
            <p className="text-xs text-gray-400">—— 已显示全部专业服务 ——</p>
         </div>
      </div>
    </div>
  );
};

export default ExpertListView;
