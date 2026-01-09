import React from 'react';
import { Map, ShoppingCart, Gift, Camera } from 'lucide-react';

const actions = [
  { id: 'plan', label: '旅行规划', icon: <Map size={18} />, color: 'text-teal-600 bg-teal-50' },
  { id: 'book', label: '快捷订购', icon: <ShoppingCart size={18} />, color: 'text-blue-600 bg-blue-50' },
  { id: 'event', label: '文娱活动', icon: <Gift size={18} />, color: 'text-orange-600 bg-orange-50' },
  { id: 'photo', label: '打卡留言', icon: <Camera size={18} />, color: 'text-red-600 bg-red-50' },
];

const QuickActions: React.FC = () => {
  return (
    <div className="grid grid-cols-4 gap-2 mb-6">
      {actions.map((action) => (
        <button 
          key={action.id}
          className={`${action.color} py-3 px-1 rounded-xl flex flex-col items-center justify-center gap-1 shadow-sm active:scale-95 transition-transform`}
        >
          <div className="mb-1">{action.icon}</div>
          <span className="text-[10px] font-bold">{action.label}</span>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
