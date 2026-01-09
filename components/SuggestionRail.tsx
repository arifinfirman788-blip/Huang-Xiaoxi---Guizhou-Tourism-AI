
import React from 'react';
import { Zap, TrendingUp } from 'lucide-react';

const suggestions = [
  "😋 贵阳哪家酸汤鱼最地道？",
  "🏞️ 3天时间怎么玩黄果树？",
  "📸 苗寨旅拍穿搭攻略",
  "🌡️ 贵州这几天天气如何？",
  "🚗 租车自驾注意事项",
  "🎁 必买伴手礼推荐"
];

const SuggestionRail: React.FC = () => {
  return (
    <div className="mb-5 pl-1">
      <div className="flex items-center gap-2 mb-2 px-1">
        <TrendingUp size={14} className="text-blue-600" />
        <span className="text-xs font-bold text-gray-500">黄小西随心问</span>
      </div>
      
      <div className="relative w-full">
        {/* Fade Mask for scroll indication */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#f5f7fa] to-transparent z-10 pointer-events-none"></div>

        <div className="flex overflow-x-auto no-scrollbar gap-2 pr-8 pb-1 snap-x">
          {suggestions.map((text, index) => (
            <button 
              key={index}
              className={`
                 shrink-0 snap-start
                 flex items-center gap-1.5 px-3 py-2 rounded-xl
                 bg-white border border-blue-50 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]
                 text-xs text-gray-700 font-medium
                 transition-all duration-300
                 hover:shadow-md hover:border-blue-200 hover:text-blue-600 hover:-translate-y-0.5
                 active:scale-95
                 animate-in slide-in-from-right fade-in fill-mode-backwards
              `}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {index === 0 && <Zap size={10} className="text-orange-500 fill-orange-500 animate-pulse" />}
              {text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuggestionRail;
