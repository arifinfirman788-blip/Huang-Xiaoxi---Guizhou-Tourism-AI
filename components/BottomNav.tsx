
import React from 'react';
import { Compass, Calendar, MapPin, User, Plus } from 'lucide-react';

interface Props {
  onToggleMenu: () => void;
  isMenuOpen: boolean;
  activeTab: number;
  onTabChange: (index: number) => void;
}

const tabs = [
  { id: 'home', icon: Compass, label: '对话' },
  { id: 'plan', icon: Calendar, label: '行程' },
  // Middle slot is skipped
  { id: 'nearby', icon: MapPin, label: '附近' },
  { id: 'mine', icon: User, label: '我的' },
];

const BottomNav: React.FC<Props> = ({ onToggleMenu, isMenuOpen, activeTab, onTabChange }) => {
  
  // Map activeTab (0..3) to visual slots (0, 1, 3, 4)
  const getVisualIndex = (index: number) => {
    return index < 2 ? index : index + 1;
  };

  const currentVisualIndex = getVisualIndex(activeTab);

  return (
    <div className="absolute bottom-0 left-0 w-full z-50">
      {/* The Wave Container */}
      <div className="relative h-20 bg-white shadow-[0_-5px_20px_rgba(0,0,0,0.03)] pb-safe">
        
        {/* The Moving Wave SVG */}
        <div 
          className="absolute -top-[14px] left-0 h-[15px] w-[20%] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] pointer-events-none text-white z-10"
          style={{ transform: `translateX(${currentVisualIndex * 100}%)` }}
        >
           <svg 
             viewBox="0 0 100 20" 
             className="w-full h-full fill-current drop-shadow-[0_-2px_2px_rgba(0,0,0,0.02)]" 
             preserveAspectRatio="none"
           >
             <path d="M0,20 C30,20 35,0 50,0 C65,0 70,20 100,20 Z" />
           </svg>
        </div>

        {/* Grid Container for 5 items */}
        <div className="grid grid-cols-5 h-full relative z-20">
          
          {/* Tab 0 */}
          <NavButton 
            item={tabs[0]} 
            isActive={activeTab === 0} 
            onClick={() => onTabChange(0)} 
          />
          
          {/* Tab 1 */}
          <NavButton 
            item={tabs[1]} 
            isActive={activeTab === 1} 
            onClick={() => onTabChange(1)} 
          />

          {/* Middle: PLUS Button */}
          <div className="flex flex-col items-center justify-start -mt-6">
             <button
                onClick={onToggleMenu}
                className={`
                   w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300
                   ${isMenuOpen 
                      ? 'bg-gray-800 text-white rotate-45 scale-90' 
                      : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:scale-105 hover:shadow-blue-200'}
                `}
             >
                <Plus size={32} strokeWidth={2.5} />
             </button>
             <span className="text-[10px] text-gray-400 font-medium mt-2 opacity-0">发布</span>
          </div>

          {/* Tab 2 */}
          <NavButton 
            item={tabs[2]} 
            isActive={activeTab === 2} 
            onClick={() => onTabChange(2)} 
          />

          {/* Tab 3 */}
          <NavButton 
            item={tabs[3]} 
            isActive={activeTab === 3} 
            onClick={() => onTabChange(3)} 
          />

        </div>
      </div>
    </div>
  );
};

// Helper Subcomponent
const NavButton: React.FC<{ 
  item: { label: string; icon: React.ElementType }; 
  isActive: boolean; 
  onClick: () => void 
}> = ({ item, isActive, onClick }) => {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center relative outline-none -mt-3 active:scale-95 transition-transform"
    >
      <div
        className={`
          relative p-2.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          flex items-center justify-center
          ${isActive ? '-translate-y-5 scale-110 shadow-lg shadow-blue-500/30 bg-blue-500' : 'translate-y-1 bg-transparent'}
        `}
      >
        <Icon 
          size={22} 
          className={`
            transition-colors duration-500
            ${isActive ? 'text-white' : 'text-gray-400'}
          `} 
          strokeWidth={isActive ? 2.5 : 2}
        />
      </div>

      <span 
        className={`
          absolute bottom-3 text-[10px] font-medium transition-all duration-500
          ${isActive ? 'opacity-100 translate-y-0 text-blue-600' : 'opacity-0 translate-y-2 text-gray-400'}
        `}
      >
        {item.label}
      </span>
    </button>
  );
};

export default BottomNav;
