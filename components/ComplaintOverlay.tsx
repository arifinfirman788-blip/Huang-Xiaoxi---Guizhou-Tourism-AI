
import React, { useState } from 'react';
import { X, AlertTriangle, Camera, Send, CheckCircle2, Info, MessageSquare, ShieldAlert, Sparkles } from 'lucide-react';

interface Props {
  nodeTitle: string;
  nodeType: string;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const tags = ["服务态度差", "环境/设施陈旧", "等待时间太长", "额外收费/诱导消费", "安全隐患", "餐食品质差"];

const ComplaintOverlay: React.FC<Props> = ({ nodeTitle, nodeType, onClose, onSubmit }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    if (!description.trim() && selectedTags.length === 0) return;
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onSubmit({ nodeTitle, selectedTags, description });
      }, 2000);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
        <div className="bg-white rounded-[2rem] p-8 flex flex-col items-center text-center shadow-2xl animate-in zoom-in-95">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500 mb-6 animate-bounce">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-2">投诉已受理</h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            小西已实时通知旅行社值班计调。<br/>
            我们承诺在 <span className="text-indigo-600 font-bold">15分钟内</span> 介入处理并回访。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col animate-in slide-in-from-bottom-10 duration-300 max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-center">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
                 <ShieldAlert size={24} />
              </div>
              <div>
                 <h2 className="text-lg font-bold text-slate-800">服务质量投诉</h2>
                 <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Service Quality Report</p>
              </div>
           </div>
           <button onClick={onClose} className="bg-slate-200/50 p-2 rounded-full hover:bg-slate-200 transition-colors">
              <X size={20} className="text-slate-500" />
           </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 no-scrollbar">
           
           {/* Node Info Context */}
           <div className="bg-indigo-50/50 rounded-2xl p-4 border border-indigo-100/50 flex items-center justify-between">
              <div>
                 <span className="text-[10px] font-bold text-indigo-400 uppercase block mb-1">针对行程节点</span>
                 <h3 className="font-bold text-indigo-900">{nodeTitle}</h3>
              </div>
              <div className="text-[10px] font-bold bg-white text-indigo-600 px-2 py-1 rounded-lg shadow-sm border border-indigo-50">
                 {nodeType}
              </div>
           </div>

           {/* Quick Tags */}
           <div className="space-y-3">
              <h4 className="text-xs font-black text-slate-400 flex items-center gap-2">
                 <Info size={14} /> 快速选择问题类型
              </h4>
              <div className="flex flex-wrap gap-2">
                 {tags.map(tag => (
                    <button 
                       key={tag}
                       onClick={() => toggleTag(tag)}
                       className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                          selectedTags.includes(tag) 
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-105' 
                          : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-200 hover:text-indigo-600'
                       }`}
                    >
                       {tag}
                    </button>
                 ))}
              </div>
           </div>

           {/* Detailed Description */}
           <div className="space-y-3">
              <h4 className="text-xs font-black text-slate-400 flex items-center gap-2">
                 <MessageSquare size={14} /> 问题描述
              </h4>
              <textarea 
                 value={description}
                 onChange={(e) => setDescription(e.target.value)}
                 placeholder="请详细描述您遇到的情况，以便我们更精准地为您解决问题..."
                 className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm min-h-[120px] focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all resize-none"
              />
           </div>

           {/* Evidence Upload Placeholder */}
           <div className="space-y-3">
              <h4 className="text-xs font-black text-slate-400 flex items-center gap-2">
                 <Camera size={14} /> 上传凭证 (可选)
              </h4>
              <div className="flex gap-2">
                 <button className="w-20 h-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:bg-white hover:border-indigo-300 hover:text-indigo-400 transition-all group">
                    <Camera size={20} className="group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold mt-1">添加照片</span>
                 </button>
              </div>
           </div>

           {/* AI Hint */}
           <div className="bg-orange-50/50 p-4 rounded-2xl flex items-start gap-3 border border-orange-100">
              <Sparkles size={16} className="text-orange-500 mt-0.5" />
              <p className="text-[11px] text-orange-800 leading-relaxed font-medium">
                 小西助手已为您开启 <span className="font-black">“极速处理通道”</span>，您的投诉将跳过常规流程，直接触达该团负责计调及旅行社总管。
              </p>
           </div>

           <div className="h-4"></div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-white">
           <button 
             onClick={handleSubmit}
             disabled={isSubmitting || (!description.trim() && selectedTags.length === 0)}
             className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl active:scale-[0.98] ${
                isSubmitting 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
             }`}
           >
              {isSubmitting ? (
                 <>处理中...</>
              ) : (
                 <>
                    <Send size={18} />
                    提交并启动极速处理
                 </>
              )}
           </button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintOverlay;
