
import React from 'react';
import { Mic, Map, PenTool, MessageSquare } from 'lucide-react';

const AskBar: React.FC = () => {
  return (
    <div className="fixed bottom-24 left-0 right-0 z-40 px-4">
       <div className="max-w-md mx-auto">
          {/* Suggestion Chips */}
          <div className="flex gap-2 mb-3">
             <button className="bg-white/90 backdrop-blur shadow-sm border border-gray-100 rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 active:scale-95 transition-transform">
                <Map size={12} className="text-blue-500" />
                旅行规划
             </button>
             <button className="bg-white/90 backdrop-blur shadow-sm border border-gray-100 rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 active:scale-95 transition-transform">
                <PenTool size={12} className="text-purple-500" />
                帮写游记
             </button>
          </div>

          {/* Input Bar */}
          <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 p-1.5 pl-4 flex items-center gap-3 border border-gray-100">
             <Mic className="text-gray-400 w-5 h-5" />
             <div className="flex-1">
                <input 
                   type="text" 
                   placeholder="问问黄小西关于贵州的一切..." 
                   className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                />
             </div>
             <button className="w-10 h-10 bg-gradient-to-tr from-[#0ea5e9] to-[#2563eb] rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/30 active:scale-90 transition-transform">
                <MessageSquare size={18} fill="currentColor" className="text-white" />
             </button>
          </div>
       </div>
    </div>
  );
};

export default AskBar;
