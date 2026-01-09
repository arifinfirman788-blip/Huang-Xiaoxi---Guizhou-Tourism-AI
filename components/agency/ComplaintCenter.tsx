
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, BookOpen, MessageSquare, Search, Copy, ThumbsUp, ChevronRight, AlertTriangle, Phone, MapPin, Calendar, Bus, Utensils, Zap, CheckCircle2, Upload, FileText, ArrowRight, X, Sparkles } from 'lucide-react';

interface Props {
  initialTab?: 'assist' | 'wiki';
}

// 1. Complaint Type
interface TouristComplaint {
   id: string;
   touristName: string;
   avatar: string;
   phone: string;
   groupCode: string;
   status: 'pending' | 'processing' | 'resolved';
   content: string;
   time: string;
   matchAnalysis?: {
      eventNode: string; // e.g., "Day 2 · 12:30 午餐"
      eventType: 'food' | 'transport' | 'hotel' | 'spot';
      provider: string; // e.g., "Waterfall Restaurant"
      aiOpinion: string;
      suggestedReply: string;
   }
}

// Mock Data
const mockComplaintsList: TouristComplaint[] = [
   {
      id: 'c1',
      touristName: '李先生',
      avatar: 'https://picsum.photos/id/1012/100/100',
      phone: '138****1234',
      groupCode: 'GZ-231215-A',
      status: 'pending',
      content: '今天中午的瀑布轩餐厅太差了，鱼根本不新鲜，而且上菜特别慢，我们等了半个小时才上第一道菜！',
      time: '10分钟前',
      matchAnalysis: {
         eventNode: 'Day 2 · 12:30 午餐',
         eventType: 'food',
         provider: '瀑布轩餐厅 (协议商家)',
         aiOpinion: '检测到“食材不新鲜”与“上菜慢”两个关键负面评价。该餐厅为协议商家，历史评分为4.7，此类投诉较少。建议立即安抚并核实，若属实可触发B级赔付标准。',
         suggestedReply: '李先生您好，非常抱歉给您带来了不好的用餐体验。我们对食品安全和用餐效率非常重视，已经联系餐厅经理调取监控并核实食材。为了表示歉意，今晚会为您加赠一份特色果盘，并督促后续餐食安排，请您消消气。'
      }
   },
   {
      id: 'c2',
      touristName: '王女士',
      avatar: 'https://picsum.photos/id/1027/100/100',
      phone: '139****5678',
      groupCode: 'GZ-231216-B',
      status: 'processing',
      content: '导游说车坏了要换车，我们在路边等了快40分钟了，这么冷的天，有没有人管啊？',
      time: '25分钟前',
      matchAnalysis: {
         eventNode: 'Day 2 · 09:00 交通转场',
         eventType: 'transport',
         provider: '黔爽行车队 (贵A·88888)',
         aiOpinion: '关联到车辆故障事件。当前气温较低，游客情绪容易激动。系统显示调度车辆已在5分钟前抵达。重点在于安抚情绪并说明不可抗力。',
         suggestedReply: '王女士，让您受冻了，真的非常抱歉。我刚查看了调度系统，新调配的车辆已经在5分钟前抵达现场了，导游马上会安排大家上车暖和一下。为了弥补大家的时间损失，我们今晚会安排入住升级或加餐，请您谅解突发状况。'
      }
   },
   {
      id: 'c3',
      touristName: '陈小姐',
      avatar: 'https://picsum.photos/id/106/100/100',
      phone: '135****9999',
      groupCode: 'GZ-231215-A',
      status: 'resolved',
      content: '想问一下明天的千户苗寨能不能帮我订个且兰古国的演出票？',
      time: '2小时前'
   }
];

// Mock Timeline Data for Context
const mockTimelineContext = [
   { time: 'Day 1 · 08:00', title: '全团集合出发', type: 'transport', status: 'completed' },
   { time: 'Day 1 · 18:00', title: '入住贵阳酒店', type: 'hotel', status: 'completed' },
   { time: 'Day 2 · 09:00', title: '交通转场', subtitle: '贵阳 -> 黄果树', type: 'transport', status: 'completed' },
   { time: 'Day 2 · 10:30', title: '黄果树大瀑布', type: 'spot', status: 'completed' },
   { time: 'Day 2 · 12:30', title: '午餐', subtitle: '瀑布轩餐厅', type: 'food', status: 'completed' },
   { time: 'Day 2 · 14:00', title: '天星桥景区', type: 'spot', status: 'in-progress' },
   { time: 'Day 2 · 18:30', title: '晚餐', type: 'food', status: 'pending' },
];

// Chat Interface Types
interface ChatMsg {
  id: string;
  role: 'user' | 'ai';
  text: string;
  isScript?: boolean;
}

const mockScripts = [
  { category: '安抚情绪', title: '游客投诉餐食不佳', content: '非常抱歉给您带来了不好的体验。您的反馈我们非常重视，我已经记录下来并反馈给餐厅经理。今晚我们会为您加赠一份特色果盘表达歉意，您看可以吗？' },
  { category: '突发处理', title: '车辆故障延误', content: '各位团友，非常抱歉通知大家，由于车辆突发机械故障，为了确保安全，我们正在调配新车。预计需等待30分钟。这期间请大家在休息区稍作休息，我们将为您提供矿泉水和小零食。' },
  { category: '购物纠纷', title: '游客要求退货', content: '李先生您好，关于您在苗银博物馆购买的银饰，我们完全支持无理由退货政策。请您将商品和票据拍照发给我，我马上联系商家为您办理退款流程，请您放心。' },
];

const ComplaintCenter: React.FC<Props> = ({ initialTab = 'assist' }) => {
  // Rely on initialTab prop for view switching (controlled by AgencyApp sidebar)
  
  // State for Assist View
  const [selectedComplaintId, setSelectedComplaintId] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Wiki State
  const [wikiSearch, setWikiSearch] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const selectedComplaint = mockComplaintsList.find(c => c.id === selectedComplaintId);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Reset chat when selecting a new complaint
  useEffect(() => {
    if (selectedComplaint) {
       if (selectedComplaint.matchAnalysis) {
          setMessages([
             { id: 'sys_1', role: 'ai', text: `AI已为您自动关联行程节点：${selectedComplaint.matchAnalysis.eventNode}。\n研判意见：${selectedComplaint.matchAnalysis.aiOpinion}` }
          ]);
          setChatInput(selectedComplaint.matchAnalysis.suggestedReply);
       } else {
          setMessages([
             { id: 'sys_1', role: 'ai', text: '该消息似乎是咨询类，未检测到明显负面情绪。' }
          ]);
          setChatInput('');
       }
    } else {
       setMessages([]);
       setChatInput('');
    }
  }, [selectedComplaintId]);

  const handleSend = () => {
    if (!chatInput.trim()) return;
    const userMsg: ChatMsg = { id: Date.now().toString(), role: 'user', text: chatInput };
    setMessages(prev => [...prev, userMsg]);
    setChatInput('');

    // Mock Response
    setTimeout(() => {
       setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', text: '发送成功。已同步抄送给当团导游。' }]);
    }, 500);
  };

  const AssistView = () => (
    <div className="flex h-full gap-4 overflow-hidden">
       
       {/* COL 1: Complaint List (Fixed Width) */}
       <div className="w-80 flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden shrink-0">
          <div className="p-4 border-b border-slate-100 bg-slate-50">
             <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <MessageSquare size={16} className="text-indigo-600" /> 待处理消息
             </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
             {mockComplaintsList.map(item => (
                <div 
                  key={item.id} 
                  onClick={() => setSelectedComplaintId(item.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                     selectedComplaintId === item.id 
                     ? 'bg-indigo-50 border-indigo-200 shadow-sm relative overflow-hidden' 
                     : 'bg-white border-slate-100 hover:border-indigo-100 hover:bg-slate-50'
                  }`}
                >
                   {selectedComplaintId === item.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500"></div>}
                   <div className="flex items-center gap-3 mb-2">
                      <div className="relative">
                        <img src={item.avatar} className="w-10 h-10 rounded-full object-cover" alt="avatar"/>
                        {item.status === 'pending' && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>}
                      </div>
                      <div className="flex-1 min-w-0">
                         <div className="flex justify-between items-center">
                            <span className="font-bold text-slate-800 text-sm">{item.touristName}</span>
                            <span className="text-[10px] text-slate-400">{item.time}</span>
                         </div>
                         <div className="text-[10px] text-slate-500 truncate bg-slate-100 px-1.5 py-0.5 rounded w-fit mt-0.5">
                            {item.groupCode}
                         </div>
                      </div>
                   </div>
                   <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {item.content}
                   </p>
                </div>
             ))}
          </div>
       </div>

       {/* COL 2: Chat Workspace (Flexible) */}
       <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden min-w-0">
          {selectedComplaint ? (
             <>
               {/* Header */}
               <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <div className="flex items-center gap-3">
                     <div className="relative">
                        <img src={selectedComplaint.avatar} className="w-10 h-10 rounded-full object-cover border border-slate-200" alt="avatar"/>
                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                           <div className={`w-3 h-3 rounded-full ${selectedComplaint.status === 'pending' ? 'bg-red-500' : 'bg-green-500'}`}></div>
                        </div>
                     </div>
                     <div>
                        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                           {selectedComplaint.touristName}
                           <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] text-slate-500 font-normal">{selectedComplaint.groupCode}</span>
                        </h2>
                        <p className="text-xs text-slate-500">{selectedComplaint.phone}</p>
                     </div>
                  </div>
                  <div className="flex gap-2">
                     <button className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors flex items-center gap-1">
                        <Phone size={14} /> 呼叫
                     </button>
                  </div>
               </div>

               {/* Chat List */}
               <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f8fafc]">
                  {/* Original Complaint Content as a System Note */}
                  <div className="flex justify-center">
                     <div className="bg-slate-100 text-slate-500 text-xs px-4 py-2 rounded-full border border-slate-200 max-w-md text-center leading-relaxed">
                        用户反馈："{selectedComplaint.content}"
                     </div>
                  </div>

                  {messages.map(msg => (
                     <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'items-start'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-indigo-600'}`}>
                           {msg.role === 'user' ? <User size={16} /> : <Bot size={18} />}
                        </div>
                        <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm max-w-[85%] whitespace-pre-line ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'}`}>
                           {msg.text}
                        </div>
                     </div>
                  ))}
                  <div ref={chatEndRef} />
               </div>

               {/* Input Area */}
               <div className="p-4 bg-white border-t border-slate-100">
                  <div className="mb-2 flex justify-between items-center">
                     <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Sparkles size={10} className="text-indigo-400" /> AI已辅助生成回复建议
                     </span>
                     <div className="flex gap-2">
                        {["发送优惠券", "退款流程", "上报主管"].map(tag => (
                           <button key={tag} className="text-[10px] px-2 py-1 bg-slate-50 border border-slate-200 rounded hover:border-indigo-200 hover:text-indigo-600 transition-colors">
                              {tag}
                           </button>
                        ))}
                     </div>
                  </div>
                  <div className="flex gap-2">
                     <textarea 
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => {
                           if(e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSend();
                           }
                        }}
                        placeholder="输入回复内容..."
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 resize-none h-24"
                     />
                     <button 
                        onClick={handleSend}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 rounded-xl shadow-md shadow-indigo-200 transition-colors flex flex-col items-center justify-center gap-1 h-24 w-20"
                     >
                        <Send size={20} />
                        <span className="text-xs font-bold">发送</span>
                     </button>
                  </div>
               </div>
             </>
          ) : (
             <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                <MessageSquare size={48} className="text-slate-200 mb-4" />
                <p>请从左侧列表选择一条投诉进行处理</p>
             </div>
          )}
       </div>

       {/* COL 3: Itinerary Context Sidebar (Fixed Width) - Only show when selected */}
       {selectedComplaint && (
          <div className="w-80 flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden shrink-0 animate-in slide-in-from-right-4 duration-300">
             <div className="p-4 border-b border-slate-100 bg-slate-50">
                <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                   <MapPin size={16} className="text-indigo-600" /> 关联行程轨迹
                </h3>
             </div>
             <div className="flex-1 overflow-y-auto p-4 relative bg-slate-50/30">
                {/* Timeline Line */}
                <div className="absolute left-[27px] top-4 bottom-4 w-[2px] bg-slate-200 z-0"></div>
                
                <div className="space-y-6 relative z-10">
                   {mockTimelineContext.map((item, idx) => {
                      // Check if this item matches the complaint node
                      const isMatched = selectedComplaint.matchAnalysis?.eventNode.includes(item.title) || 
                                        (item.subtitle && selectedComplaint.matchAnalysis?.provider.includes(item.subtitle));
                      
                      return (
                         <div key={idx} className={`relative pl-8 group transition-all duration-300 ${isMatched ? 'scale-105' : 'opacity-80 hover:opacity-100'}`}>
                            {/* Node Dot */}
                            <div className={`absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 flex items-center justify-center bg-white z-10 
                               ${isMatched ? 'border-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.4)]' : 'border-slate-300'}
                            `}>
                               {isMatched && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
                            </div>
                            
                            {/* Card Content */}
                            <div className={`rounded-xl p-3 border transition-all 
                               ${isMatched 
                                  ? 'bg-red-50 border-red-200 shadow-md ring-1 ring-red-100' 
                                  : 'bg-white border-slate-200 hover:border-indigo-200'}
                            `}>
                               <div className="flex justify-between items-start mb-1">
                                  <span className={`text-[10px] font-mono ${isMatched ? 'text-red-500 font-bold' : 'text-slate-400'}`}>
                                     {item.time.split('·')[1].trim()}
                                  </span>
                                  {isMatched && (
                                     <span className="flex items-center gap-1 text-[9px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-bold">
                                        <AlertTriangle size={8} /> 投诉关联
                                     </span>
                                  )}
                               </div>
                               <div className={`text-sm font-bold ${isMatched ? 'text-red-700' : 'text-slate-700'}`}>
                                  {item.title}
                               </div>
                               {item.subtitle && (
                                  <div className={`text-xs mt-0.5 ${isMatched ? 'text-red-500' : 'text-slate-500'}`}>
                                     {item.subtitle}
                                  </div>
                               )}
                            </div>
                         </div>
                      );
                   })}
                </div>
             </div>
             {/* Bottom Link */}
             <div className="p-3 border-t border-slate-100 bg-white text-center">
                <button className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center justify-center gap-1">
                   查看完整行程单 <ArrowRight size={12} />
                </button>
             </div>
          </div>
       )}
    </div>
  );

  const WikiView = () => (
     <div className="flex flex-col h-full space-y-6">
        {/* Search & Upload Header */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
           <div className="flex justify-between items-start mb-6">
               <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">天逸·金牌话术库</h2>
                  <p className="text-slate-500 text-sm">汇集 10,000+ 真实案例，让每一次沟通都更专业</p>
               </div>
               <button 
                  onClick={() => setIsUploading(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-indigo-200 transition-all flex items-center gap-2 active:scale-95"
               >
                  <Upload size={16} /> 上传话术/案例
               </button>
           </div>
           
           <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                 type="text" 
                 value={wikiSearch}
                 onChange={(e) => setWikiSearch(e.target.value)}
                 placeholder="搜索场景，如：退房、加点、车坏了..." 
                 className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
              />
           </div>
        </div>

        {/* Categories & Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pb-4">
           {mockScripts.filter(s => s.title.includes(wikiSearch) || s.content.includes(wikiSearch)).map((item, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-200 hover:shadow-md transition-all group">
                 <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-bold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded uppercase tracking-wider">
                       {item.category}
                    </span>
                    <button className="text-slate-300 hover:text-indigo-600 transition-colors">
                       <Copy size={16} />
                    </button>
                 </div>
                 <h3 className="font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">{item.title}</h3>
                 <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                    "{item.content}"
                 </p>
                 <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1 hover:text-indigo-500 cursor-pointer"><ThumbsUp size={12} /> 128 赞</span>
                    <span className="flex items-center gap-1 hover:text-indigo-500 cursor-pointer">详情 <ChevronRight size={12} /></span>
                 </div>
              </div>
           ))}
        </div>

        {/* Upload Modal Simulation */}
        {isUploading && (
           <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsUploading(false)}></div>
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 p-6 animate-in zoom-in-95 duration-200">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg text-slate-800">上传新话术</h3>
                    <button onClick={() => setIsUploading(false)} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
                 </div>
                 <div className="space-y-4">
                    <div>
                       <label className="block text-xs font-bold text-slate-500 mb-1">场景标题</label>
                       <input type="text" className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-100 outline-none" placeholder="例如：游客因天气原因要求退款" />
                    </div>
                    <div>
                       <label className="block text-xs font-bold text-slate-500 mb-1">话术内容</label>
                       <textarea className="w-full border border-slate-200 rounded-lg p-2 text-sm h-32 resize-none focus:ring-2 focus:ring-indigo-100 outline-none" placeholder="请输入话术内容..." />
                    </div>
                    <div>
                       <label className="block text-xs font-bold text-slate-500 mb-1">分类标签</label>
                       <div className="flex gap-2">
                          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold border border-indigo-100">突发处理</span>
                          <span className="px-3 py-1 bg-slate-50 text-slate-500 rounded-lg text-xs border border-slate-200">+ 添加</span>
                       </div>
                    </div>
                    <div className="pt-2">
                       <button onClick={() => setIsUploading(false)} className="w-full bg-indigo-600 text-white font-bold py-2.5 rounded-xl hover:bg-indigo-700 transition-colors">确认上传</button>
                    </div>
                 </div>
              </div>
           </div>
        )}
     </div>
  );

  return (
    <div className="flex flex-col h-full space-y-4">
       {/* Removed Internal Tab Switcher - View is controlled by props */}
       <div className="flex-1 min-h-0">
          {initialTab === 'assist' ? <AssistView /> : <WikiView />}
       </div>
    </div>
  );
};

export default ComplaintCenter;
