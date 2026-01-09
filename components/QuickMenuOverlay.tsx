
import React from 'react';
import { Sparkles, Users, FileInput } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const QuickMenuOverlay: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-[60] flex flex-col justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Content Container */}
      <div className="relative z-10 w-full px-6 pb-28 flex items-end justify-center pointer-events-none">
        
        {/* Action Buttons Stack */}
        <div className="flex flex-col gap-4 w-full pointer-events-auto animate-in slide-in-from-bottom duration-500 delay-75">
            
            {/* 1. Create New Trip */}
            <button className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] text-white p-4 rounded-2xl shadow-xl shadow-indigo-500/30 flex flex-col items-start text-left hover:scale-[1.02] active:scale-95 transition-all group border border-white/20">
                <div className="flex items-center gap-2 mb-1">
                    <div className="p-1.5 bg-white/20 rounded-full group-hover:rotate-12 transition-transform">
                       <Sparkles size={18} className="text-yellow-300" />
                    </div>
                    <span className="font-bold text-lg tracking-wide">创建新行程</span>
                </div>
                <span className="text-[11px] opacity-90 font-medium">召唤智能行程规划师，为您定制规划</span>
            </button>

            {/* 2. Join Trip */}
            <button className="w-full bg-white text-gray-800 p-4 rounded-2xl shadow-lg flex flex-col items-start text-left hover:bg-gray-50 active:scale-95 transition-all border border-gray-100">
                 <div className="flex items-center gap-2 mb-1">
                     <div className="p-1.5 bg-blue-50 rounded-full text-blue-600">
                        <Users size={18} />
                     </div>
                     <span className="font-bold text-lg text-gray-800">加入行程</span>
                 </div>
                 <span className="text-[11px] text-gray-400 font-medium">加入好友创建的旅行，开启奇妙旅途</span>
            </button>

             {/* 3. Import */}
            <button className="w-full bg-white text-gray-800 p-4 rounded-2xl shadow-lg flex flex-col items-start text-left hover:bg-gray-50 active:scale-95 transition-all border border-gray-100">
                 <div className="flex items-center gap-2 mb-1">
                     <div className="p-1.5 bg-orange-50 rounded-full text-orange-600">
                        <FileInput size={18} />
                     </div>
                     <span className="font-bold text-lg text-gray-800">智能导入地点/行程</span>
                 </div>
                 <span className="text-[11px] text-gray-400 font-medium">粘贴链接、文本、上传图片进行识别</span>
            </button>

        </div>
      </div>
    </div>
  );
};

export default QuickMenuOverlay;
