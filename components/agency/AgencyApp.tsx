
import React, { useState } from 'react';
import { LayoutDashboard, FileText, Landmark, Settings, LogOut, Bell, Search, Menu, Map, ChevronDown, ChevronRight, MessageSquare, Headphones, ShoppingBag, Box, Target, BarChart3 } from 'lucide-react';
import AgencyWorkbench from './AgencyWorkbench';
import ItineraryManager from './ItineraryManager';
import PolicyCenter from './PolicyCenter';
import TripTracker from './TripTracker';
import ComplaintCenter from './ComplaintCenter';
import ProductDistribution from './ProductDistribution';
import InventoryManagement from './InventoryManagement';
import SalesManagement from './SalesManagement';

// Define Menu Structure
type MenuId = 'workbench' | 'itinerary_original' | 'itinerary_tracking' | 'itinerary_archived' | 'policy_read' | 'policy_apply' | 'complaint_assist' | 'complaint_wiki' | 'dist_inventory' | 'dist_strategy' | 'dist_sales';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  children?: { id: MenuId; label: string }[];
}

const menuItems: MenuItem[] = [
  { 
    id: 'workbench', 
    label: '工作台', 
    icon: LayoutDashboard 
  },
  {
    id: 'distribution',
    label: '智能分销中心',
    icon: ShoppingBag,
    children: [
      { id: 'dist_inventory', label: '自营商品库' },
      { id: 'dist_strategy', label: 'AI策略管理' },
      { id: 'dist_sales', label: '销售管理' }
    ]
  },
  { 
    id: 'itinerary', 
    label: '行程中心', 
    icon: Map,
    children: [
      { id: 'itinerary_original', label: '原始行程' },
      { id: 'itinerary_tracking', label: '行程跟踪' },
      { id: 'itinerary_archived', label: '归档行程' },
    ]
  },
  { 
    id: 'policy', 
    label: '政策补贴', 
    icon: Landmark,
    children: [
      { id: 'policy_read', label: '政策解读' },
      { id: 'policy_apply', label: '申报补贴' },
    ]
  },
  { 
    id: 'complaint', 
    label: '客诉处理', 
    icon: Headphones,
    children: [
      { id: 'complaint_assist', label: '客服助手' },
      { id: 'complaint_wiki', label: '话术知识库' },
    ]
  },
];

const AgencyApp: React.FC = () => {
  const [activeMenuId, setActiveMenuId] = useState<MenuId>('workbench');
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['distribution', 'itinerary', 'policy']);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleMenu = (id: string) => {
    if (expandedMenus.includes(id)) {
      setExpandedMenus(expandedMenus.filter(m => m !== id));
    } else {
      setExpandedMenus([...expandedMenus, id]);
    }
  };

  const renderContent = () => {
    switch (activeMenuId) {
      case 'workbench': return <AgencyWorkbench onNavigate={(id) => setActiveMenuId(id)} />;
      case 'dist_inventory': return <InventoryManagement />;
      case 'dist_strategy': return <ProductDistribution />;
      case 'dist_sales': return <SalesManagement />;
      case 'itinerary_original': return <ItineraryManager />;
      case 'itinerary_tracking': return <TripTracker viewMode="active" />;
      case 'itinerary_archived': return <TripTracker viewMode="archived" />;
      case 'policy_read': return <PolicyCenter initialTab="read" />;
      case 'policy_apply': return <PolicyCenter initialTab="apply" />;
      case 'complaint_assist': return <ComplaintCenter initialTab="assist" />;
      case 'complaint_wiki': return <ComplaintCenter initialTab="wiki" />;
      default: return <AgencyWorkbench onNavigate={(id) => setActiveMenuId(id)} />;
    }
  };

  return (
    <div className="flex h-full bg-slate-100">
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 text-white transition-all duration-300 flex flex-col shadow-xl z-20`}>
         <div className="h-16 flex items-center px-4 border-b border-slate-800 bg-slate-950">
            {isSidebarOpen ? (
               <div className="leading-tight">
                 <div className="font-bold text-sm tracking-wide text-indigo-400">天逸 · 智能分销</div>
                 <div className="font-bold text-xs text-slate-300 italic">Context Agent</div>
               </div>
            ) : (
               <span className="font-bold text-lg text-indigo-400">AI</span>
            )}
         </div>
         <nav className="flex-1 py-4 space-y-1 px-3 overflow-y-auto no-scrollbar">
            {menuItems.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isExpanded = expandedMenus.includes(item.id);
              const isChildActive = item.children?.some(c => c.id === activeMenuId);
              const isDirectActive = item.id === activeMenuId;
              return (
                <div key={item.id} className="mb-1">
                  <button onClick={() => { if (hasChildren && isSidebarOpen) toggleMenu(item.id); else if (!hasChildren) setActiveMenuId(item.id as MenuId); }} className={`w-full flex items-center ${!isSidebarOpen ? 'justify-center' : 'justify-between px-3'} py-3 rounded-xl transition-all ${(isDirectActive || (!isSidebarOpen && isChildActive)) ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                    <div className="flex items-center gap-3"><item.icon size={20} />{isSidebarOpen && <span className="text-sm font-medium">{item.label}</span>}</div>
                    {hasChildren && isSidebarOpen && <div className="text-slate-500">{isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}</div>}
                  </button>
                  {hasChildren && isExpanded && isSidebarOpen && (
                    <div className="mt-1 ml-4 border-l border-slate-700 pl-2 space-y-1 animate-in slide-in-from-top-2">
                      {item.children!.map((sub) => (
                        <button key={sub.id} onClick={() => setActiveMenuId(sub.id)} className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all ${activeMenuId === sub.id ? 'bg-slate-800 text-indigo-400 font-bold' : 'text-slate-500 hover:text-slate-300'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${activeMenuId === sub.id ? 'bg-indigo-400' : 'bg-slate-600'}`}></div>{sub.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
         </nav>
      </aside>
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
         <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 z-10 border-b border-slate-200">
            <div className="flex items-center gap-4"><button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"><Menu size={20} /></button><div className="text-sm font-bold text-slate-700">分销中心 / <span className="text-indigo-600">管理后台</span></div></div>
            <div className="flex items-center gap-4"><div className="h-6 w-[1px] bg-slate-200 mx-2"></div><button className="relative p-2 hover:bg-slate-100 rounded-full text-slate-500"><Bell size={20} /><span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span></button><div className="flex items-center gap-3 pl-2 cursor-pointer hover:bg-slate-50 p-1 rounded-full pr-3 transition-colors"><img src="https://picsum.photos/id/1005/100/100" className="w-8 h-8 rounded-full border border-slate-200" alt="Admin" /><div className="hidden md:block text-left"><div className="text-xs font-bold text-slate-700">运营经理</div><div className="text-[10px] text-slate-400">天逸旅行社</div></div></div></div>
         </header>
         <main className="flex-1 overflow-auto p-6 bg-[#f8fafc]"><div className="max-w-[1600px] mx-auto h-full">{renderContent()}</div></main>
      </div>
    </div>
  );
};

export default AgencyApp;
