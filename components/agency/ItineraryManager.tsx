
import React, { useState } from 'react';
import { FileText, Upload, Plus, Search, Car, ScanLine, Printer, Send, Filter, Download, Save, X, Calendar, MapPin, Users, User, File, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { AgencyItinerary } from '../../types';

const mockItineraries: AgencyItinerary[] = [
  { id: '1', title: '黄果树+苗寨5日深度游', date: '2023-12-15', groupCode: 'GZ-231215-A', status: 'planning', touristCount: 24, complianceScore: 85, vehicleStatus: 'unregistered', guideName: '待定', driverName: '待定' },
  { id: '2', title: '荔波小七孔专线', date: '2023-12-11', groupCode: 'GZ-231211-B', status: 'active', touristCount: 12, complianceScore: 100, vehicleStatus: 'processing', guideName: '王金牌', driverName: '李师傅' },
  { id: '3', title: '赤水丹霞摄影团', date: '2023-12-20', groupCode: 'GZ-231220-C', status: 'planning', touristCount: 18, complianceScore: 100, vehicleStatus: 'unregistered', guideName: '张伟', driverName: '刘师傅' },
  { id: '4', title: '贵阳周边亲子周末', date: '2023-12-09', groupCode: 'GZ-231209-D', status: 'completed', touristCount: 8, complianceScore: 100, vehicleStatus: 'registered', guideName: '李娜', driverName: '陈师傅' },
];

const ItineraryManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'import'>('list');
  const [importStep, setImportStep] = useState(0);

  // --- Import Flow Component ---
  const ImportView = () => {
    // File Upload State
    const [files, setFiles] = useState<{name: string, size: string}[]>([]);

    // Tourist List State
    const [touristPage, setTouristPage] = useState(1);
    const [touristDayFilter, setTouristDayFilter] = useState('all');
    const ITEMS_PER_PAGE = 5;

    // Mock Parsed Data State
    const [parsedData, setParsedData] = useState({
      routeName: '黄大小西青岩6日游 NK',
      planCode: 'TYT-YJ-251217A No.00619185',
      touristCount: '15',
      adultCount: '15',
      departureInfo: '2025/12/17 /',
      returnInfo: '2025/12/22 /',
      gatheringPlace: '无',
      guideInfo: '杜寅 18985015286',
      schedule: [
        { date: '12/17', desc: '区间交通：贵阳接，入住酒店\n行程内容：贵阳接，入住酒店\n入住酒店：贵阳五方智选酒店(喷水池店)', city: '贵阳', meal: '无' },
        { date: '12/18', desc: '区间交通：黄果树，住贵阳\n行程内容：黄果树，住贵阳', city: '贵阳', meal: '早中晚' },
        { date: '12/19', desc: '区间交通：小七孔，住荔波\n行程内容：大小七孔深度游', city: '荔波', meal: '早中' },
        { date: '12/20', desc: '区间交通：西江千户苗寨\n行程内容：苗寨风情体验', city: '西江', meal: '早晚' },
      ],
      tourists: Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        name: ['常金亮', '高文清', '常翠萍', '常秀萍', '常爱平', '高惹清', '冯春喜', '梁云海', '邢爱平', '李茹爱', '李马龙', '陈子泉', '任应珍', '张根平', '王完英'][i] || `游客${i+1}`,
        phone: i === 0 ? '13037072285' : `13${Math.floor(Math.random()*9)}****${Math.floor(Math.random()*10000)}`,
        idCard: `14233119${60+i}0101${1000+i}`,
        // Mock data: first 10 tourists join all days, last 5 only join first 2 days
        participatingDays: i < 10 ? ['12/17', '12/18', '12/19', '12/20'] : ['12/17', '12/18']
      }))
    });

    // Simulate Scan Process
    if (importStep === 1) {
       setTimeout(() => setImportStep(2), 2000);
    }

    const handleFileSelect = () => {
       setFiles(prev => [...prev, 
         { name: `行程单_扫描件_${prev.length + 1}.pdf`, size: `${(Math.random() * 2 + 0.5).toFixed(1)} MB` }
       ]);
    };

    const handleRemoveFile = (idx: number) => {
       setFiles(prev => prev.filter((_, i) => i !== idx));
    };

    // Pagination Logic
    const filteredTourists = touristDayFilter === 'all' 
      ? parsedData.tourists 
      : parsedData.tourists.filter(t => t.participatingDays.includes(touristDayFilter));
    
    const totalPages = Math.ceil(filteredTourists.length / ITEMS_PER_PAGE);
    const currentTourists = filteredTourists.slice((touristPage - 1) * ITEMS_PER_PAGE, touristPage * ITEMS_PER_PAGE);

    // Shared Styles
    const labelStyle = "block text-xs font-bold text-slate-600 mb-1.5";
    const inputStyle = "w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 outline-none transition-all shadow-sm hover:border-indigo-200 placeholder-slate-300";

    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center min-h-[600px] animate-in fade-in zoom-in-95 mx-auto w-full">
        
        {/* Step 0: Upload */}
        {importStep === 0 && (
          <div className="text-center max-w-2xl w-full p-12">
            
            {files.length === 0 ? (
               <>
                  <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6 animate-pulse mx-auto border-2 border-indigo-100">
                     <Upload size={48} className="text-indigo-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">智能行程识别</h3>
                  <p className="text-slate-500 mb-8">
                  支持批量上传 PDF、Excel、Word 出团通知书/行程单。
                  <br/>AI 将自动解析线路、游客名单与行程安排。
                  </p>
               </>
            ) : (
               <div className="mb-8 w-full max-w-md mx-auto">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 text-left">已添加文件 ({files.length})</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                     {files.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
                           <div className="flex items-center gap-3 overflow-hidden">
                              <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-500 shrink-0">
                                 <File size={16} />
                              </div>
                              <div className="text-left min-w-0">
                                 <div className="text-sm font-bold text-slate-700 truncate">{file.name}</div>
                                 <div className="text-xs text-slate-400">{file.size}</div>
                              </div>
                           </div>
                           <button onClick={() => handleRemoveFile(idx)} className="text-slate-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors">
                              <Trash2 size={16} />
                           </button>
                        </div>
                     ))}
                  </div>
               </div>
            )}

            <div className="flex gap-4 w-full justify-center">
               <button 
                  onClick={handleFileSelect}
                  className={`px-8 py-4 rounded-xl font-bold shadow-lg transition-colors flex items-center gap-2 ${files.length > 0 ? 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50' : 'bg-indigo-600 text-white shadow-indigo-200 hover:bg-indigo-700'}`}
               >
                  {files.length > 0 ? <><Plus size={18}/> 继续添加文件</> : '点击选择/拖拽文件'}
               </button>
               
               {files.length > 0 ? (
                  <button 
                     onClick={() => setImportStep(1)}
                     className="px-8 bg-indigo-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors flex items-center gap-2"
                  >
                     <ScanLine size={18} /> 开始智能识别
                  </button>
               ) : (
                  <button className="px-8 bg-white text-slate-700 border border-slate-200 py-4 rounded-xl font-bold hover:bg-slate-50 transition-colors">
                     从 ERP 同步
                  </button>
               )}
            </div>
          </div>
        )}
        
        {/* Step 1: Scanning */}
        {importStep === 1 && (
          <div className="flex flex-col items-center justify-center text-center p-12">
             <div className="relative w-80 aspect-video bg-slate-50 rounded-xl mb-6 overflow-hidden border-2 border-indigo-500 border-dashed">
                <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                   <ScanLine size={48} className="mb-2" />
                   <span className="text-sm">正在OCR解析 {files.length} 个文件...</span>
                </div>
             </div>
             <p className="text-slate-600 font-medium">正在提取行程与名单关键信息...</p>
          </div>
        )}

        {/* Step 2: Review & Edit */}
        {importStep === 2 && (
          <div className="w-full max-w-5xl p-6 h-full flex flex-col bg-slate-50/50">
             <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 bg-white px-6 pt-4 rounded-t-2xl shadow-sm">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                   <FileText className="text-indigo-600" /> 
                   解析结果校对
                   <span className="text-xs font-normal bg-green-50 text-green-600 px-2 py-0.5 rounded border border-green-100">OCR识别完成</span>
                </h3>
                <div className="flex gap-3">
                   <button onClick={() => { setImportStep(0); setFiles([]); }} className="text-slate-500 hover:text-slate-700 font-medium text-sm px-4 py-2">重新上传</button>
                   <button 
                      onClick={() => { setImportStep(0); setActiveTab('list'); }}
                      className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-indigo-700 flex items-center gap-2"
                   >
                      <Save size={16} /> 确认生成行程
                   </button>
                </div>
             </div>

             <div className="flex-1 overflow-y-auto pr-2 space-y-6 pb-12">
                
                {/* Section 1: Basic Info */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                   <h4 className="font-bold text-slate-800 mb-5 text-sm flex items-center gap-2 pb-3 border-b border-slate-100">
                      <div className="w-6 h-6 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center"><FileText size={14}/></div>
                      基础信息
                   </h4>
                   <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                      <div className="col-span-2">
                         <label className={labelStyle}>线路名称</label>
                         <input type="text" value={parsedData.routeName} onChange={e => setParsedData({...parsedData, routeName: e.target.value})} className={inputStyle} />
                      </div>
                      <div>
                         <label className={labelStyle}>计划编号</label>
                         <input type="text" value={parsedData.planCode} onChange={e => setParsedData({...parsedData, planCode: e.target.value})} className={inputStyle} />
                      </div>
                      <div className="flex gap-4">
                         <div className="flex-1">
                           <label className={labelStyle}>报名人数</label>
                           <input type="text" value={parsedData.touristCount} onChange={e => setParsedData({...parsedData, touristCount: e.target.value})} className={inputStyle} />
                         </div>
                         <div className="flex-1">
                           <label className={labelStyle}>成人数</label>
                           <input type="text" value={parsedData.adultCount} onChange={e => setParsedData({...parsedData, adultCount: e.target.value})} className={inputStyle} />
                         </div>
                      </div>
                      <div>
                         <label className={labelStyle}>去程信息</label>
                         <input type="text" value={parsedData.departureInfo} onChange={e => setParsedData({...parsedData, departureInfo: e.target.value})} className={inputStyle} />
                      </div>
                      <div>
                         <label className={labelStyle}>返程信息</label>
                         <input type="text" value={parsedData.returnInfo} onChange={e => setParsedData({...parsedData, returnInfo: e.target.value})} className={inputStyle} />
                      </div>
                      <div>
                         <label className={labelStyle}>集合地点</label>
                         <input type="text" value={parsedData.gatheringPlace} onChange={e => setParsedData({...parsedData, gatheringPlace: e.target.value})} className={inputStyle} />
                      </div>
                      <div>
                         <label className={labelStyle}>导游信息</label>
                         <input type="text" value={parsedData.guideInfo} onChange={e => setParsedData({...parsedData, guideInfo: e.target.value})} className={inputStyle} />
                      </div>
                   </div>
                </div>

                {/* Section 2: Itinerary Schedule */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                   <h4 className="font-bold text-slate-800 mb-4 text-sm flex items-center gap-2 pb-3 border-b border-slate-100">
                      <div className="w-6 h-6 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center"><Calendar size={14}/></div>
                      参考行程
                   </h4>
                   <div className="border border-slate-200 rounded-lg overflow-hidden ring-1 ring-slate-100">
                      <table className="w-full text-sm text-left">
                         <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                            <tr>
                               <th className="px-4 py-3 border-r border-slate-200 w-28">行程日期</th>
                               <th className="px-4 py-3 border-r border-slate-200">行程描述</th>
                               <th className="px-4 py-3 border-r border-slate-200 w-32">住宿城市</th>
                               <th className="px-4 py-3 w-24">含餐</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-100">
                            {parsedData.schedule.map((day, i) => (
                               <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                  <td className="p-3 border-r border-slate-100 align-top">
                                     <input type="text" defaultValue={day.date} className="w-full bg-white border border-slate-200 rounded px-2 py-1.5 text-center font-mono text-indigo-600 font-bold outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100" />
                                  </td>
                                  <td className="p-3 border-r border-slate-100">
                                     <textarea defaultValue={day.desc} className="w-full bg-white border border-slate-200 rounded px-3 py-2 text-slate-700 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 resize-none h-24 text-sm leading-relaxed" />
                                  </td>
                                  <td className="p-3 border-r border-slate-100 align-top">
                                     <input type="text" defaultValue={day.city} className="w-full bg-white border border-slate-200 rounded px-2 py-1.5 text-center text-slate-800 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100" />
                                  </td>
                                  <td className="p-3 align-top">
                                     <input type="text" defaultValue={day.meal} className="w-full bg-white border border-slate-200 rounded px-2 py-1.5 text-center text-slate-800 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100" />
                                  </td>
                               </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </div>

                {/* Section 3: Tourist List */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                   <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
                      <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                         <div className="w-6 h-6 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center"><Users size={14}/></div>
                         客人名单
                         <span className="text-xs font-normal text-slate-400">共解析 {parsedData.touristCount} 人</span>
                      </h4>
                      
                      {/* Day Filter Tabs */}
                      <div className="flex bg-slate-100 rounded-lg p-1 gap-1">
                         <button
                            onClick={() => { setTouristDayFilter('all'); setTouristPage(1); }}
                            className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${touristDayFilter === 'all' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-slate-200/50'}`}
                         >
                            全部行程
                         </button>
                         {parsedData.schedule.map((day, i) => (
                            <button
                               key={i}
                               onClick={() => { setTouristDayFilter(day.date); setTouristPage(1); }}
                               className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${touristDayFilter === day.date ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-slate-200/50'}`}
                            >
                               {day.date}
                            </button>
                         ))}
                      </div>
                   </div>

                   <div className="border border-slate-200 rounded-lg overflow-hidden ring-1 ring-slate-100 mb-4">
                      <table className="w-full text-sm text-left">
                         <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                            <tr>
                               <th className="px-4 py-3 w-20 border-r border-slate-200 text-center">序号</th>
                               <th className="px-4 py-3 w-32 border-r border-slate-200">姓名</th>
                               <th className="px-4 py-3 w-40 border-r border-slate-200">联系电话</th>
                               <th className="px-4 py-3">证件号码</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-100 bg-white">
                            {currentTourists.length > 0 ? currentTourists.map((p, i) => (
                               <tr key={i} className="hover:bg-slate-50/50">
                                  <td className="px-4 py-2 text-center text-slate-400 border-r border-slate-100">
                                     {(touristPage - 1) * ITEMS_PER_PAGE + i + 1}
                                  </td>
                                  <td className="px-4 py-2 border-r border-slate-100">
                                     <input type="text" defaultValue={p.name} className="w-full bg-transparent outline-none font-bold text-slate-800 focus:bg-indigo-50/30 rounded px-2 py-1 -ml-2" />
                                  </td>
                                  <td className="px-4 py-2 border-r border-slate-100">
                                     <input type="text" defaultValue={p.phone} className="w-full bg-transparent outline-none font-mono text-slate-600 focus:bg-indigo-50/30 rounded px-2 py-1 -ml-2" />
                                  </td>
                                  <td className="px-4 py-2">
                                     <input type="text" defaultValue={p.idCard} className="w-full bg-transparent outline-none font-mono text-slate-600 focus:bg-indigo-50/30 rounded px-2 py-1 -ml-2" />
                                  </td>
                               </tr>
                            )) : (
                               <tr>
                                  <td colSpan={4} className="px-4 py-8 text-center text-slate-400 text-xs">
                                     该行程日期下暂无分配游客
                                  </td>
                               </tr>
                            )}
                         </tbody>
                      </table>
                   </div>
                   
                   {/* Pagination */}
                   {totalPages > 1 && (
                      <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                         <div className="text-xs text-slate-400">
                            显示第 <span className="font-bold text-slate-600">{(touristPage - 1) * ITEMS_PER_PAGE + 1}</span> 到 <span className="font-bold text-slate-600">{Math.min(touristPage * ITEMS_PER_PAGE, filteredTourists.length)}</span> 条，共 {filteredTourists.length} 条
                         </div>
                         <div className="flex gap-2">
                            <button 
                               onClick={() => setTouristPage(p => Math.max(1, p - 1))}
                               disabled={touristPage === 1}
                               className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                               <ChevronLeft size={16} />
                            </button>
                            <span className="text-xs flex items-center font-bold text-slate-600 bg-slate-50 px-3 rounded-lg border border-slate-200">
                               {touristPage} / {totalPages}
                            </span>
                            <button 
                               onClick={() => setTouristPage(p => Math.min(totalPages, p + 1))}
                               disabled={touristPage === totalPages}
                               className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                               <ChevronRight size={16} />
                            </button>
                         </div>
                      </div>
                   )}
                </div>

             </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Header Toolbar */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200">
         <h2 className="font-bold text-xl text-slate-800 flex items-center gap-2">
            <FileText className="text-indigo-600" /> 行程管理
            <span className="text-sm font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{mockItineraries.length} 个行程</span>
         </h2>
         <div className="flex gap-3">
            <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
               <input type="text" placeholder="搜索行程..." className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-100" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50">
               <Filter size={16} /> 筛选
            </button>
            <button 
              onClick={() => setActiveTab(activeTab === 'list' ? 'import' : 'list')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors ${activeTab === 'import' ? 'bg-slate-200 text-slate-600' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
            >
               {activeTab === 'import' ? '返回列表' : <><Plus size={16} /> 新建/导入行程</>}
            </button>
         </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        {activeTab === 'import' ? <ImportView /> : (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
             <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 font-medium">
                   <tr>
                      <th className="px-6 py-4">团号 / 名称</th>
                      <th className="px-6 py-4">出发日期</th>
                      <th className="px-6 py-4">状态</th>
                      <th className="px-6 py-4">人数</th>
                      <th className="px-6 py-4">导游/司机</th>
                      <th className="px-6 py-4">合规性</th>
                      <th className="px-6 py-4">车辆备案状态</th>
                      <th className="px-6 py-4 text-right">操作</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                   {mockItineraries.map(trip => (
                      <tr key={trip.id} className="hover:bg-indigo-50/30 transition-colors group">
                         <td className="px-6 py-4">
                            <div className="font-bold text-slate-800">{trip.title}</div>
                            <div className="text-xs text-slate-500 font-mono mt-0.5">{trip.groupCode}</div>
                         </td>
                         <td className="px-6 py-4 text-slate-600">{trip.date}</td>
                         <td className="px-6 py-4">
                            <StatusBadge status={trip.status} />
                         </td>
                         <td className="px-6 py-4 text-slate-600">{trip.touristCount}人</td>
                         <td className="px-6 py-4 text-slate-600 text-xs">
                            <div>导: {trip.guideName}</div>
                            <div>车: {trip.driverName}</div>
                         </td>
                         <td className="px-6 py-4">
                            <div className="flex items-center gap-1.5">
                               <div className={`w-16 h-2 rounded-full overflow-hidden bg-slate-100`}>
                                  <div className={`h-full ${trip.complianceScore === 100 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${trip.complianceScore}%` }}></div>
                               </div>
                               <span className={`text-xs font-bold ${trip.complianceScore === 100 ? 'text-emerald-600' : 'text-amber-600'}`}>{trip.complianceScore}分</span>
                            </div>
                            {trip.complianceScore < 100 && <div className="text-[10px] text-red-500 mt-1">缺少车辆备案</div>}
                         </td>
                         <td className="px-6 py-4">
                            <VehicleStatusBadge status={trip.vehicleStatus} />
                         </td>
                         <td className="px-6 py-4 text-right">
                           <div className="flex justify-end gap-2">
                              {trip.vehicleStatus === 'unregistered' && (
                                 <button className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-lg shadow-sm shadow-indigo-200 transition-colors flex items-center gap-1"><Car size={12} /> 一键备案</button>
                              )}
                              {trip.vehicleStatus === 'processing' && (
                                 <>
                                    <button className="text-xs font-medium text-red-600 hover:text-red-700 px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-50 transition-colors">撤回备案</button>
                                    <button className="text-xs font-medium text-blue-600 hover:text-blue-700 px-3 py-1.5 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">进度查询</button>
                                 </>
                              )}
                              {trip.vehicleStatus === 'registered' && (
                                 <>
                                    <button className="text-xs font-medium text-slate-600 hover:text-indigo-600 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50 transition-colors">查看详情</button>
                                    <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-200 hover:bg-emerald-50 transition-colors">电子备案</button>
                                 </>
                              )}
                           </div>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        )}
      </div>
    </div>
  );
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
   const styles: any = {
      planning: 'bg-slate-100 text-slate-500',
      active: 'bg-green-50 text-green-600 border-green-100',
      completed: 'bg-indigo-50 text-indigo-600',
   };
   const labels: any = { planning: '计划中', active: '进行中', completed: '已结束' };
   return <span className={`text-xs px-2 py-1 rounded border border-transparent ${styles[status]}`}>{labels[status]}</span>;
};

const VehicleStatusBadge: React.FC<{ status: string }> = ({ status }) => {
   if (status === 'unregistered') return <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded border border-orange-100">未备案</span>;
   if (status === 'processing') return <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100">审核中</span>;
   if (status === 'registered') return <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">已备案</span>;
   return <span className="text-xs text-slate-300">未知</span>;
};

export default ItineraryManager;
