
import React, { useState, useEffect } from 'react';
import { X, Zap, Image as ImageIcon, QrCode, Bot, Sparkles, Loader2, Target } from 'lucide-react';

interface Props {
  onClose: () => void;
  onSuccess: (intentData: any) => void;
}

const ScanOverlay: React.FC<Props> = ({ onClose, onSuccess }) => {
  const [phase, setPhase] = useState<'scanning' | 'analyzing' | 'redirecting'>('scanning');

  useEffect(() => {
    // 模拟识别过程
    const timer = setTimeout(() => {
       setPhase('analyzing');
       
       setTimeout(() => {
          setPhase('redirecting');
          
          setTimeout(() => {
            onSuccess({
               type: 'privilege',
               broker: '王导 · 金牌导游',
               product: '黄果树VIP免排队特权包',
               intentText: '您好！检测到王导正在为您申请【VIP绿色通道】专属权益。该服务旨在优化您的游玩路径，避开人流峰值，是否立即开启？'
            });
          }, 1000);
       }, 2000);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onSuccess]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center animate-in fade-in duration-300">
      {/* 顶部工具栏 */}
      <div className="absolute top-10 left-0 right-0 px-6 flex justify-between items-center z-20">
         <button onClick={onClose} className="p-2 bg-white/10 rounded-full text-white active:scale-90 transition-transform"><X size={24}/></button>
         <div className="bg-indigo-600/40 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-[10px] font-black flex items-center gap-2 border border-white/20 uppercase tracking-widest">
            <Target size={14} className="animate-pulse" /> AI Service Recognition
         </div>
         <button className="p-2 bg-white/10 rounded-full text-white"><ImageIcon size={24}/></button>
      </div>

      {phase === 'scanning' && (
        <div className="relative w-72 h-72">
          {/* 四角边框 */}
          <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-indigo-500 rounded-tl-3xl"></div>
          <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-indigo-500 rounded-tr-3xl"></div>
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-indigo-500 rounded-bl-3xl"></div>
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-indigo-500 rounded-br-3xl"></div>
          
          {/* 模拟相机的扫描线 */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent shadow-[0_0_20px_rgba(99,102,241,1)] animate-[scan_2s_ease-in-out_infinite]"></div>
          
          {/* 中心焦点 */}
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center animate-ping">
                <div className="w-2 h-2 bg-white rounded-full"></div>
             </div>
          </div>

          <div className="absolute -bottom-20 left-0 right-0 text-center">
             <p className="text-white text-sm font-bold tracking-widest animate-pulse">对准行程码或推荐标识获取特权</p>
             <p className="text-white/40 text-[10px] mt-2 uppercase tracking-widest">Accessing exclusive travel benefits...</p>
          </div>
        </div>
      )}

      {phase !== 'scanning' && (
        <div className="flex flex-col items-center animate-in zoom-in-95 duration-500">
           <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-[2.5rem] flex items-center justify-center text-white mb-8 shadow-2xl relative">
              <Bot size={48} className={phase === 'analyzing' ? 'animate-bounce' : 'animate-spin'} />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center border-4 border-black">
                 <Sparkles size={14} className="text-yellow-400" />
              </div>
           </div>
           <h3 className="text-white text-xl font-black mb-3">
              {phase === 'analyzing' ? '正在匹配专属权益...' : '正在为您开启特权通道...'}
           </h3>
           <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-2xl border border-white/10">
              <Loader2 size={16} className="animate-spin text-indigo-400" />
              <span className="text-xs font-bold text-white/60">正在验证金牌导游推荐资质</span>
           </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { transform: translateY(0); opacity: 0.2; }
          50% { transform: translateY(288px); opacity: 1; }
          100% { transform: translateY(0); opacity: 0.2; }
        }
      `}} />
    </div>
  );
};

export default ScanOverlay;
