
import React, { useState, useEffect } from 'react';
import { Landmark, Sparkles, ChevronDown, ChevronUp, BellRing, DollarSign, FileText, CheckCircle2, Search, ArrowRight, X, Loader2, Plus, Calendar } from 'lucide-react';
import { PolicyItem } from '../../types';

const mockPolicies: PolicyItem[] = [
  { 
    id: 'p1', 
    title: '关于2024年冬季旅游市场营销奖励补贴的通知', 
    date: '2023-12-10', 
    tags: ['补贴', '重磅'], 
    isSubsidyRelated: true,
    summary: '关键点提取：\n1. 针对组织省外游客入黔旅游的企业进行奖励。\n2. 旅游包机奖：最高3万元/架次。\n3. 旅游专列奖：最高5万元/车次。\n4. 申报时间：需在行程结束后15个工作日内通过系统提交电子行程单。'
  },
  { 
    id: 'p2', 
    title: '贵州省旅游服务质量提升行动方案', 
    date: '2023-12-08', 
    tags: ['合规', '通知'], 
    isSubsidyRelated: false,
    summary: '重点要求：\n1. 严禁导游在车上兜售商品。\n2. 电子行程单必须包含所有购物点信息。\n3. 违规企业将纳入征信黑名单。'
  },
  { 
    id: 'p3', 
    title: '关于暂退旅游服务质量保证金的补充通知', 
    date: '2023-11-20', 
    tags: ['财务', '通知'], 
    isSubsidyRelated: false,
    summary: '为进一步纾解企业困难，暂退比例提高至100%。申请流程已简化，可直接在线办理。'
  },
];

interface ApplicationRecord {
  id: string;
  name: string;
  date: string;
  amount: string;
  status: string;
  statusType: 'pending' | 'approved' | 'rejected';
}

interface Props {
  initialTab?: 'read' | 'apply';
}

const PolicyCenter: React.FC<Props> = ({ initialTab = 'read' }) => {
  // Policy Reading State
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Application State
  const [records, setRecords] = useState<ApplicationRecord[]>([
    { id: 'r1', name: '11月包机奖励补贴', date: '2023-12-01', amount: '¥ 30,000', status: '审核中', statusType: 'pending' },
    { id: 'r2', name: '10月专列奖励', date: '2023-11-05', amount: '¥ 50,000', status: '已发放', statusType: 'approved' },
  ]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appStep, setAppStep] = useState(1); // 1: Select Policy, 2: Review Matches
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyItem | null>(null);
  const [isMatching, setIsMatching] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleStartApply = () => {
     setAppStep(1);
     setSelectedPolicy(null);
     setIsModalOpen(true);
  };

  const handleSelectPolicy = (policy: PolicyItem) => {
     setSelectedPolicy(policy);
     setAppStep(2);
     setIsMatching(true);
     // Simulate AI Matching
     setTimeout(() => {
        setIsMatching(false);
     }, 2000);
  };

  const handleSubmitApplication = () => {
     if (!selectedPolicy) return;
     const newRecord: ApplicationRecord = {
        id: `new_${Date.now()}`,
        name: selectedPolicy.title.length > 10 ? selectedPolicy.title.substring(0, 10) + '...' : selectedPolicy.title,
        date: new Date().toISOString().split('T')[0],
        amount: '¥ 4,500', // Mock calculated amount
        status: '审核中',
        statusType: 'pending'
     };
     setRecords([newRecord, ...records]);
     setIsModalOpen(false);
  };

  const matchedItineraries = [
     { id: '1', title: '黄果树+苗寨5日深度游', code: 'GZ-231215-A', date: '2023-12-15', amount: '¥ 3,000' },
     { id: '2', title: '荔波小七孔专线', code: 'GZ-231211-B', date: '2023-12-11', amount: '¥ 1,500' },
  ];

  const ApplyView = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 relative">
       {/* Header for Apply View */}
       <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center">
          <div>
             <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <DollarSign className="text-indigo-600" /> 补贴申报管理
             </h2>
             <p className="text-slate-500 text-sm mt-1">自动抓取符合条件的行程，一键生成申报材料</p>
          </div>
          <button 
             onClick={handleStartApply}
             className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
             <Plus size={18} /> 新增申报
          </button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
             <div className="text-indigo-100 text-sm mb-1 font-medium">累计已获补贴</div>
             <div className="text-4xl font-black mb-4">¥ 125,800</div>
             <div className="flex gap-4 text-xs opacity-90">
                <div>
                   <span className="block font-bold">12笔</span>
                   <span>已发放</span>
                </div>
                <div>
                   <span className="block font-bold">3笔</span>
                   <span>审核中</span>
                </div>
             </div>
          </div>
          <div className="col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
             <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Sparkles className="text-orange-500" size={20} /> 可申报项目 (AI推荐)
             </h3>
             <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                   <div>
                      <div className="font-bold text-slate-800 text-sm">2023冬季包机奖励</div>
                      <div className="text-xs text-slate-500 mt-1">关联行程: GZ-231215-A 等3个团期</div>
                   </div>
                   <button onClick={handleStartApply} className="bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                      一键申报
                   </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                   <div>
                      <div className="font-bold text-slate-800 text-sm">引客入黔专列补贴</div>
                      <div className="text-xs text-slate-500 mt-1">关联行程: GZ-231210-C</div>
                   </div>
                   <button className="bg-white text-slate-400 border border-slate-200 text-xs font-bold px-4 py-2 rounded-lg cursor-not-allowed">
                      材料待补全
                   </button>
                </div>
             </div>
          </div>
       </div>

       <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 font-bold text-slate-800 flex justify-between items-center">
             <span>申报记录</span>
             <span className="text-xs font-normal text-slate-500">共 {records.length} 条记录</span>
          </div>
          <table className="w-full text-sm text-left">
             <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                   <th className="px-6 py-4">项目名称</th>
                   <th className="px-6 py-4">申报时间</th>
                   <th className="px-6 py-4">金额</th>
                   <th className="px-6 py-4">状态</th>
                   <th className="px-6 py-4 text-right">操作</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
                {records.map(record => (
                   <tr key={record.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-800">{record.name}</td>
                      <td className="px-6 py-4 text-slate-700 font-medium">{record.date}</td>
                      <td className="px-6 py-4 font-bold text-slate-900">{record.amount}</td>
                      <td className="px-6 py-4">
                         {record.statusType === 'approved' && <span className="text-emerald-700 bg-emerald-100 border border-emerald-200 px-2 py-1 rounded text-xs font-bold">已发放</span>}
                         {record.statusType === 'pending' && <span className="text-blue-700 bg-blue-100 border border-blue-200 px-2 py-1 rounded text-xs font-bold">审核中</span>}
                         {record.statusType === 'rejected' && <span className="text-red-700 bg-red-100 border border-red-200 px-2 py-1 rounded text-xs font-bold">未通过</span>}
                      </td>
                      <td className="px-6 py-4 text-right text-indigo-600 hover:text-indigo-800 cursor-pointer text-xs font-bold">查看进度</td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>

       {/* Application Modal */}
       {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)}></div>
             <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative z-10 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-6 border-b border-slate-100">
                   <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                      <DollarSign className="text-indigo-600" />
                      {appStep === 1 ? '选择申报政策' : '确认关联行程'}
                   </h3>
                   <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
                </div>
                
                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto p-6">
                   {appStep === 1 ? (
                      <div className="space-y-3">
                         <p className="text-sm text-slate-500 mb-2">请选择您要申报的补贴项目（仅显示有效期内的政策）：</p>
                         {mockPolicies.filter(p => p.isSubsidyRelated).map(policy => (
                            <div 
                               key={policy.id} 
                               onClick={() => handleSelectPolicy(policy)}
                               className="p-4 rounded-xl border border-slate-200 hover:border-indigo-500 hover:shadow-md cursor-pointer transition-all group bg-slate-50 hover:bg-white"
                            >
                               <div className="flex justify-between items-start">
                                  <div className="font-bold text-slate-800 mb-1 group-hover:text-indigo-700">{policy.title}</div>
                                  <ArrowRight size={16} className="text-slate-300 group-hover:text-indigo-500" />
                               </div>
                               <div className="text-xs text-slate-500 flex gap-2">
                                  <span>发布日期: {policy.date}</span>
                                  {policy.tags.map(tag => (
                                     <span key={tag} className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-600">{tag}</span>
                                  ))}
                               </div>
                            </div>
                         ))}
                      </div>
                   ) : (
                      <div className="space-y-6">
                         <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 text-indigo-900 text-sm">
                            <span className="font-bold">当前申报政策：</span> {selectedPolicy?.title}
                         </div>

                         {isMatching ? (
                            <div className="flex flex-col items-center justify-center py-12">
                               <Loader2 size={32} className="text-indigo-600 animate-spin mb-4" />
                               <p className="text-slate-600 font-medium">AI正在检索并匹配符合条件的已完结行程...</p>
                               <p className="text-slate-400 text-xs mt-1">比对时间范围、游客人数、合规性指标</p>
                            </div>
                         ) : (
                            <div className="space-y-4 animate-in fade-in">
                               <div className="flex justify-between items-end">
                                  <h4 className="font-bold text-slate-800 flex items-center gap-2">
                                     <CheckCircle2 size={18} className="text-emerald-500" />
                                     匹配到 {matchedItineraries.length} 个符合条件的行程
                                  </h4>
                                  <span className="text-xs text-slate-500">数据来源: 行程中心(已归档)</span>
                               </div>

                               <div className="border border-slate-200 rounded-xl overflow-hidden">
                                  <table className="w-full text-sm text-left">
                                     <thead className="bg-slate-50 text-slate-500">
                                        <tr>
                                           <th className="px-4 py-3 w-10"><input type="checkbox" checked readOnly className="rounded text-indigo-600 focus:ring-indigo-500"/></th>
                                           <th className="px-4 py-3">行程名称/团号</th>
                                           <th className="px-4 py-3">完结日期</th>
                                           <th className="px-4 py-3 text-right">预估补贴</th>
                                        </tr>
                                     </thead>
                                     <tbody className="divide-y divide-slate-100">
                                        {matchedItineraries.map(item => (
                                           <tr key={item.id} className="bg-white">
                                              <td className="px-4 py-3"><input type="checkbox" checked readOnly className="rounded text-indigo-600 focus:ring-indigo-500"/></td>
                                              <td className="px-4 py-3">
                                                 <div className="font-bold text-slate-800">{item.title}</div>
                                                 <div className="text-xs text-slate-500 font-mono">{item.code}</div>
                                              </td>
                                              <td className="px-4 py-3 text-slate-600 font-medium">{item.date}</td>
                                              <td className="px-4 py-3 text-right font-bold text-orange-600">{item.amount}</td>
                                           </tr>
                                        ))}
                                     </tbody>
                                     <tfoot className="bg-slate-50 border-t border-slate-200">
                                        <tr>
                                           <td colSpan={3} className="px-4 py-3 text-right font-bold text-slate-600">合计申报金额：</td>
                                           <td className="px-4 py-3 text-right font-black text-lg text-orange-600">¥ 4,500</td>
                                        </tr>
                                     </tfoot>
                                  </table>
                               </div>
                            </div>
                         )}
                      </div>
                   )}
                </div>

                {/* Modal Footer */}
                {appStep === 2 && !isMatching && (
                   <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50 rounded-b-2xl">
                      <button 
                         onClick={() => setAppStep(1)}
                         className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-600 font-bold text-sm hover:bg-white transition-colors"
                      >
                         上一步
                      </button>
                      <button 
                         onClick={handleSubmitApplication}
                         className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors flex items-center gap-2"
                      >
                         <CheckCircle2 size={16} /> 确认并提交申报
                      </button>
                   </div>
                )}
             </div>
          </div>
       )}
    </div>
  );

  const ReadView = () => (
     <div className="p-1 space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
        {/* Header for Read View */}
        <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200">
           <div>
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                 <Landmark className="text-indigo-600" /> 政策解读
              </h2>
           </div>
           <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="搜索政策关键词..." className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-100" />
           </div>
        </div>

        {/* Alert */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 px-6 py-3 rounded-xl flex items-center gap-3 text-sm text-orange-800 border border-orange-200 shadow-sm">
           <BellRing size={18} className="animate-swing text-orange-600" />
           <div>
              <span className="font-bold">新政策提醒：</span>
              冬游贵州补贴申报窗口已开启，请各旅行社在1月15日前完成申报。
           </div>
        </div>

        <div className="space-y-4">
           {mockPolicies.map(policy => (
              <div key={policy.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all group hover:border-indigo-200">
                 <div 
                   className="p-5 cursor-pointer hover:bg-slate-50 transition-colors"
                   onClick={() => toggleExpand(policy.id)}
                 >
                    <div className="flex justify-between items-start mb-2">
                       <div className="flex gap-2">
                          {policy.tags.map(tag => (
                             <span key={tag} className={`text-xs px-2 py-0.5 rounded border ${tag === '补贴' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                                {tag}
                             </span>
                          ))}
                       </div>
                       <span className="text-xs text-slate-400 font-mono">{policy.date}</span>
                    </div>
                    <h3 className="font-bold text-slate-800 text-base leading-relaxed mb-3 group-hover:text-indigo-700 transition-colors">
                       {policy.title}
                    </h3>
                    
                    {/* AI Badge */}
                    <div className="flex justify-between items-center">
                       <div className="flex items-center gap-1.5 text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg text-xs font-bold">
                          <Sparkles size={14} />
                          AI 智能解读
                       </div>
                       {expandedId === policy.id ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                    </div>
                 </div>

                 {/* Expanded Content (AI Summary) */}
                 {expandedId === policy.id && (
                    <div className="bg-indigo-50/50 p-6 border-t border-indigo-100 animate-in slide-in-from-top-2 duration-200">
                       <div className="flex gap-4">
                          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                             <Sparkles size={20} className="text-indigo-600" />
                          </div>
                          <div className="flex-1">
                             <p className="text-sm font-bold text-indigo-900 mb-2">天逸助手划重点：</p>
                             <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-white p-4 rounded-xl border border-indigo-100 shadow-sm">
                                {policy.summary}
                             </div>
                             
                             <div className="flex gap-3 mt-4">
                                <button className="flex items-center gap-1 text-slate-500 text-xs hover:text-indigo-600 transition-colors">
                                   <FileText size={14} /> 查看原文文件
                                </button>
                             </div>
                          </div>
                       </div>
                    </div>
                 )}
              </div>
           ))}
        </div>
     </div>
  );

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* We no longer render the tab switcher here. The Sidebar drives the initialTab prop. */}
      {initialTab === 'apply' ? <ApplyView /> : <ReadView />}
    </div>
  );
};

export default PolicyCenter;
