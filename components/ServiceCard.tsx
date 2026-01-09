
import React from 'react';
import { MessageCircle, Sparkles, MapPin } from 'lucide-react';
import { ServiceItem } from '../types';
import TagBadge from './TagBadge';

interface ServiceCardProps {
  item: ServiceItem;
  onConsult: (item: ServiceItem) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ item, onConsult }) => {
  return (
    <div 
      className="bg-white rounded-xl p-4 shadow-sm mb-3 border border-slate-100 relative overflow-hidden transition-all active:scale-[0.99] cursor-pointer"
      onClick={() => onConsult(item)}
    >
      {/* Top Section: Avatar & Info */}
      <div className="flex gap-3">
        {/* Avatar Container */}
        <div className="relative flex-shrink-0">
          <div className="w-14 h-14 rounded-full overflow-hidden border border-slate-100">
            <img
              src={item.avatarUrl}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Badge (Verified/AI/Status) */}
          {item.isVerified && (
            <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white flex items-center shadow-sm">
              {item.verifiedLabel || 'AI'}
            </div>
          )}
        </div>

        {/* Content Column */}
        <div className="flex-1 min-w-0">
          {/* Header Line: Name + Primary Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-gray-900 truncate">
              {item.name}
            </h3>
            {/* Render Primary Tags immediately after name if space permits, or flex wrap */}
            {item.tags
              .filter((t) => t.level === 'primary' || t.level === 'highlight')
              .map((tag, idx) => (
                <TagBadge key={idx} tag={tag} />
              ))}
          </div>

          {/* Sub-Header: Organization + Rank */}
          <div className="flex items-center gap-2 text-xs mb-2">
            <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 font-medium border border-blue-100">
              {item.organizationRank || 'Certified'}
            </span>
            <span className="text-gray-500 truncate flex items-center">
               <MapPin className="w-3 h-3 mr-0.5 inline" />
              {item.organizationName}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-2">
             <span className="font-medium text-gray-700">擅长/特色：</span>
             {item.description}
          </p>
          
           {/* Remaining Tags (Secondary/Tertiary) */}
           <div className="flex flex-wrap gap-1 mb-2">
            {item.tags
              .filter((t) => t.level !== 'primary' && t.level !== 'highlight')
              .map((tag, idx) => (
                <TagBadge key={idx} tag={tag} />
              ))}
          </div>

          {/* Stats Row */}
          <div className="flex items-center text-xs text-gray-400 gap-4 mb-3">
            <span className="flex items-center">
              <MessageCircle className="w-3 h-3 mr-1" />
              {item.consultationCount} 人咨询
            </span>
            {item.score && (
               <span className="text-orange-500 font-medium">
                 {item.score} 分
               </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Bar (Gray Prompts + Blue Button) */}
      <div className="flex items-center justify-between mt-1 gap-2">
        {/* The Prompt Question Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); onConsult(item); }}
          className="flex-1 text-left bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs py-2 px-3 rounded-lg truncate transition-colors font-medium"
        >
          {item.promptQuestion}
        </button>

        {/* Primary Action Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); onConsult(item); }}
          className="flex-shrink-0 bg-[#566BF1] hover:bg-[#4355d6] text-white text-xs font-semibold py-2 px-4 rounded-full flex items-center shadow-md shadow-indigo-100 transition-all active:scale-95"
        >
          <Sparkles className="w-3 h-3 mr-1.5" />
          去咨询
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
