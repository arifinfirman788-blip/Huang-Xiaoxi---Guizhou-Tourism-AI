import React from 'react';
import { Suggestion } from '../types';

interface Props {
  onSelect: (text: string) => void;
}

const suggestions: Suggestion[] = [
  { id: 1, text: "贵州必玩天花板 | 经典景点，不容错过！" },
  { id: 2, text: "贵州爆款线路 | 闭眼照抄直接出发" },
  { id: 3, text: "贵州冬天的正确打开方式——泡汤♨️" },
  { id: 4, text: "出发！去山野吸氧" },
  { id: 5, text: "孩子最爱的贵州怎么玩？" },
];

const SuggestionList: React.FC<Props> = ({ onSelect }) => {
  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-4">
      <h3 className="font-bold text-lg text-gray-800 mb-4">贵州旅行的N种玩法</h3>
      <div className="space-y-4">
        {suggestions.map((item, index) => (
          <div 
            key={item.id} 
            onClick={() => onSelect(item.text)}
            className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 rounded-lg p-1 transition-colors"
          >
            <span className="text-lg font-serif italic text-gray-400 font-bold group-hover:text-blue-500 transition-colors">
              {index + 1}
            </span>
            <span className="text-sm text-gray-700 font-medium border-b border-gray-100 pb-2 w-full group-hover:border-transparent">
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestionList;
