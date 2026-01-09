
import React from 'react';
import { ShoppingBag, CalendarDays, Map, Building2 } from 'lucide-react';

interface Props {
  onMallClick?: () => void;
}

const DashboardGrid: React.FC<Props> = ({ onMallClick }) => {
  const handleMallClick = () => {
    if (onMallClick) {
      onMallClick();
    } else {
      window.dispatchEvent(new CustomEvent('OPEN_MALL'));
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3 mb-6 h-48">
      
      {/* Left Card: Quick Booking (Tall) */}
      <div 
        onClick={handleMallClick}
        className="row-span-2 relative rounded-3xl overflow-hidden shadow-sm group cursor-pointer border border-slate-100"
      >
        <img 
           src="https://picsum.photos/id/164/300/400" 
           alt="Mall" 
           className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        {/* Top Tag */}
        <div className="absolute top-3 left-3 w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30 text-white">
           <ShoppingBag size={18} />
        </div>
        <div className="absolute top-3 right-3 bg-indigo-600 text-white text-[9px] font-black px-2 py-1 rounded-lg flex items-center gap-1 shadow-lg border border-white/10 uppercase tracking-widest animate-pulse">
           Official
        </div>

        {/* Bottom Label */}
        <div className="absolute bottom-4 left-4 right-4">
           <div className="flex items-center gap-1 text-white/50 text-[8px] font-black uppercase mb-1">
              <Building2 size={8}/> Travel Agency Mall
           </div>
           <span className="text-xl font-black text-white tracking-tight italic">快捷订购</span>
           <p className="text-[10px] text-white/60 font-bold mt-1 line-clamp-1">官方直营 · 多家保障</p>
        </div>
      </div>

      {/* Right Top: Activity Calendar */}
      <div className="relative rounded-3xl overflow-hidden shadow-sm group cursor-pointer bg-blue-50 border border-slate-100">
        <img 
           src="https://picsum.photos/id/58/300/200" 
           alt="Calendar" 
           className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-transparent"></div>
        
        <div className="absolute top-3 left-3 w-9 h-9 bg-white/30 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/40 text-white">
           <CalendarDays size={16} />
        </div>
        
        <div className="absolute bottom-3 left-3">
           <span className="text-sm font-black text-white italic drop-shadow-md">活动日历</span>
        </div>
      </div>

      {/* Right Bottom: Travel Record */}
      <div className="relative rounded-3xl overflow-hidden shadow-sm group cursor-pointer bg-amber-50 border border-slate-100">
        <img 
           src="https://picsum.photos/id/1036/300/200" 
           alt="Record" 
           className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/40 to-transparent"></div>

        <div className="absolute top-3 left-3 w-9 h-9 bg-white/30 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/40 text-white">
           <Map size={16} />
        </div>

        <div className="absolute bottom-3 left-3">
           <span className="text-sm font-black text-white italic drop-shadow-md">旅行记录</span>
        </div>
      </div>

    </div>
  );
};

export default DashboardGrid;
