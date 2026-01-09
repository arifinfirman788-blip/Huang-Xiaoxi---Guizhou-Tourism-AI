
import React, { useState } from 'react';
import { X, Star, Heart, MessageSquare, CheckCircle2, Sparkles, User, Truck, Mountain, BedDouble, Utensils, Award } from 'lucide-react';
import { TripEvaluation } from '../types';

interface Props {
  tripTitle: string;
  onClose: () => void;
  onSubmit: (data: TripEvaluation) => void;
}

const ServiceEvaluationOverlay: React.FC<Props> = ({ tripTitle, onClose, onSubmit }) => {
  const [evaluation, setEvaluation] = useState<TripEvaluation>({
    overall: 5,
    service: 5,
    guide: 5,
    driver: 5,
    spot: 5,
    hotel: 5,
    food: 5,
    car: 5,
    favoritePart: '',
    comment: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRating = (key: keyof TripEvaluation, value: number) => {
    setEvaluation(prev => ({ ...prev, [key]: value }));
  };

  const handleText = (key: keyof TripEvaluation, value: string) => {
    setEvaluation(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      onSubmit(evaluation);
    }, 1500);
  };

  const RatingRow = ({ label, value, field, icon: Icon }: { label: string, value: number, field: keyof TripEvaluation, icon?: any }) => (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2">
        {Icon && <Icon size={14} className="text-slate-400" />}
        <span className="text-sm font-medium text-slate-700">{label}</span>
      </div>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <button 
            key={star} 
            onClick={() => handleRating(field, star)}
            className="transition-transform active:scale-125"
          >
            <Star 
              size={20} 
              className={star <= value ? "text-yellow-400 fill-yellow-400" : "text-slate-200"} 
            />
          </button>
        ))}
      </div>
    </div>
  );

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
        <div className="bg-white rounded-[2rem] p-8 flex flex-col items-center text-center shadow-2xl animate-in zoom-in-95">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-6 animate-bounce">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-2">感谢您的评价!</h2>
          <p className="text-slate-500 text-sm">您的反馈已实时反馈至旅行社，<br/>小西会根据您的建议持续优化服务。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-sm h-full max-h-[90vh] bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 slide-in-from-bottom-5 duration-300">
        
        {/* Header */}
        <div className="bg-indigo-600 p-6 text-white relative">
           <button onClick={onClose} className="absolute top-4 right-4 bg-white/20 p-1.5 rounded-full hover:bg-white/30 transition-colors">
              <X size={18} />
           </button>
           <div className="flex items-center gap-2 mb-2">
              <Sparkles size={20} className="text-yellow-300" />
              <h2 className="text-lg font-bold">服务满意度评价</h2>
           </div>
           <p className="text-indigo-100 text-xs font-medium line-clamp-1">{tripTitle}</p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 no-scrollbar">
           
           {/* Section 1: Overall */}
           <div className="space-y-1">
              <h3 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                 <Award size={14} /> 总体评分
              </h3>
              <RatingRow label="总体行程体验" value={evaluation.overall} field="overall" />
              <RatingRow label="服务内容安排" value={evaluation.service} field="service" />
           </div>

           {/* Section 2: Resources */}
           <div className="space-y-1">
              <h3 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                 <Truck size={14} /> 资源服务质量
              </h3>
              <div className="bg-slate-50 rounded-2xl p-4 space-y-1 border border-slate-100">
                <RatingRow label="导游服务" value={evaluation.guide} field="guide" icon={User} />
                <RatingRow label="司机服务" value={evaluation.driver} field="driver" icon={Truck} />
                <RatingRow label="景点游览" value={evaluation.spot} field="spot" icon={Mountain} />
                <RatingRow label="酒店住宿" value={evaluation.hotel} field="hotel" icon={BedDouble} />
                <RatingRow label="餐饮质量" value={evaluation.food} field="food" icon={Utensils} />
                <RatingRow label="用车舒适度" value={evaluation.car} field="car" icon={Truck} />
              </div>
           </div>

           {/* Section 3: Open Feedback */}
           <div className="space-y-4">
              <div>
                <label className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                   <Heart size={14} /> 最喜欢的行程环节
                </label>
                <input 
                  type="text" 
                  value={evaluation.favoritePart}
                  onChange={(e) => handleText('favoritePart', e.target.value)}
                  placeholder="例如：黄果树瀑布大合影" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                   <MessageSquare size={14} /> 您的建议与评语
                </label>
                <textarea 
                  value={evaluation.comment}
                  onChange={(e) => handleText('comment', e.target.value)}
                  placeholder="说说您的真实感受，我们会认真听取并改进..." 
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm h-32 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
                />
              </div>
           </div>

           <div className="pb-4"></div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-white">
           <button 
             onClick={handleSubmit}
             className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-100 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
           >
              提交评价报告
           </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceEvaluationOverlay;
