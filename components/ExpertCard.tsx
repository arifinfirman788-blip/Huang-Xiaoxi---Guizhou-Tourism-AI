
import React from 'react';
import { ChevronRight, Star } from 'lucide-react';

interface Props {
  onClick?: () => void;
}

const experts = [
  "https://picsum.photos/id/64/100/100",
  "https://picsum.photos/id/65/100/100",
  "https://picsum.photos/id/91/100/100",
];

const ExpertCard: React.FC<Props> = ({ onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-5 shadow-sm border border-blue-100 mb-4 relative overflow-hidden active:scale-[0.99] transition-transform cursor-pointer"
    >
      {/* Decorative background blob */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-20 pointer-events-none"></div>

      <div className="flex justify-between items-start mb-3 relative z-10">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <span className="text-blue-600">遇见</span> 专业分身
          </h2>
          <p className="text-xs text-gray-500 mt-1">百位文旅专家 · 24小时在线 · 1对1服务</p>
        </div>
        <button className="bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="flex items-center gap-3 relative z-10">
        <div className="flex -space-x-3">
          {experts.map((url, i) => (
            <img 
              key={i} 
              src={url} 
              alt="expert" 
              className="w-10 h-10 rounded-full border-2 border-white object-cover"
            />
          ))}
          <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs text-gray-500 font-medium">
            +6
          </div>
        </div>
        <div className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-lg flex items-center gap-1 font-semibold">
           <Star size={10} fill="currentColor" /> 金牌服务团队
        </div>
      </div>

      <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar relative z-10">
        {['旅行社', '导游', '酒店', '景区', '车队', '餐饮'].map((tag) => (
          <span key={tag} className="px-3 py-1 bg-white border border-gray-100 rounded-full text-xs text-gray-600 whitespace-nowrap shadow-sm">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ExpertCard;
