
import React from 'react';
import { Menu, Scan, RefreshCw } from 'lucide-react';
import { UserRole } from '../types';

interface Props {
  userRole?: UserRole;
  onToggleRole?: () => void;
  onScanClick?: () => void; // 保留接口兼容性
}

const Header: React.FC<Props> = ({ userRole = 'tourist', onToggleRole, onScanClick }) => {
  const isAgency = userRole === 'agency';
  const isGuide = userRole === 'guide';
  const isTourist = userRole === 'tourist';

  const handleScanAction = () => {
    if (onScanClick) {
      onScanClick();
    } else {
      // 如果 App.tsx 没传回调（当前情况），通过 CustomEvent 触发 HomeView 监听
      window.dispatchEvent(new CustomEvent('OPEN_SCAN'));
    }
  };

  const getRoleLabel = () => {
    if (isAgency) return 'B端 · 旅行社管理';
    if (isGuide) return '员工端 · 导游助手';
    return 'C端 · 智能导服';
  };

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md px-4 py-3 flex items-center justify-between shadow-sm transition-colors duration-500 
      ${isAgency ? 'bg-indigo-900 text-white' : ''}
      ${isGuide ? 'bg-teal-600 text-white' : ''}
      ${isTourist ? 'bg-white/95 text-black border-b border-slate-100' : ''}
    `}>
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-black italic tracking-tighter flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded-lg transition-colors ${isTourist ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-white text-black'}`}>
            {isAgency ? '天逸' : '黄小西'}
          </span>
          <span className={`font-bold not-italic text-sm ${isTourist ? 'text-slate-800' : 'opacity-80'}`}>
            {getRoleLabel()}
          </span>
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {isTourist ? (
          <button 
            onClick={handleScanAction}
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-full shadow-xl shadow-indigo-100 active:scale-95 transition-all group"
          >
            <Scan size={16} strokeWidth={3} className="group-hover:rotate-90 transition-transform" />
            <span className="text-xs font-black">扫一扫</span>
          </button>
        ) : (
          <>
            {onToggleRole && (
              <button 
                onClick={onToggleRole}
                className="flex items-center gap-1 text-[10px] px-3 py-1.5 rounded-full border border-white/30 text-white hover:bg-white/10 transition-all"
              >
                <RefreshCw size={10} />
                <span>切换身份</span>
              </button>
            )}
            <Menu className="w-6 h-6 opacity-90 cursor-pointer" />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
