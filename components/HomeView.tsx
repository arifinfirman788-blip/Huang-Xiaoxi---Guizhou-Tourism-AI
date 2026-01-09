
import React, { useState, useEffect } from 'react';
import ExpertCard from './ExpertCard';
import PromoBanner from './PromoBanner';
import DashboardGrid from './DashboardGrid';
import AskBar from './AskBar';
import SuggestionRail from './SuggestionRail';
import MallView from './MallView';
import ScanOverlay from './ScanOverlay';
import AgentChatView from './AgentChatView';
import AgencyShopView from './AgencyShopView';
import { ServiceItem } from '../types';

interface Props {
  onOpenExperts?: () => void;
}

const HomeView: React.FC<Props> = ({ onOpenExperts }) => {
  const [overlay, setOverlay] = useState<'none' | 'mall' | 'scan' | 'dist_chat' | 'agency_shop'>('none');
  const [distAgent, setDistAgent] = useState<ServiceItem | null>(null);

  useEffect(() => {
    const handleOpenScan = () => setOverlay('scan');
    const handleOpenMall = () => setOverlay('mall');
    const handleOpenAgencyShop = () => setOverlay('agency_shop');

    window.addEventListener('OPEN_SCAN', handleOpenScan);
    window.addEventListener('OPEN_MALL', handleOpenMall);
    window.addEventListener('OPEN_AGENCY_SHOP', handleOpenAgencyShop);

    return () => {
      window.removeEventListener('OPEN_SCAN', handleOpenScan);
      window.removeEventListener('OPEN_MALL', handleOpenMall);
      window.removeEventListener('OPEN_AGENCY_SHOP', handleOpenAgencyShop);
    };
  }, []);

  const handleScanSuccess = (intentData: any) => {
    const brokerAgent: ServiceItem = {
      id: 'dist_broker',
      name: intentData.broker,
      avatarUrl: 'https://picsum.photos/id/64/200/200',
      isVerified: true,
      verifiedLabel: '金牌认证',
      organizationName: '天悦旅行社 · 服务保障部',
      description: intentData.intentText,
      tags: [{ text: '特权推荐', level: 'highlight' }, { text: '专业保障', level: 'primary' }],
      consultationCount: 999,
      promptQuestion: '立即开启专属服务通道',
      category: 'guide'
    };
    
    setDistAgent(brokerAgent);
    setOverlay('dist_chat');
  };

  return (
    <div className="pt-4 pb-32">
       {/* 基础组件 */}
       <ExpertCard onClick={onOpenExperts} />
       <SuggestionRail />
       <PromoBanner />
       <DashboardGrid />
       <AskBar />

       {/* 全屏覆盖层管理器 */}
       {overlay === 'mall' && (
         <div className="fixed inset-0 z-[100] bg-white animate-in slide-in-from-right duration-300">
            <MallView onBack={() => setOverlay('none')} />
         </div>
       )}

       {overlay === 'scan' && (
         <ScanOverlay 
           onClose={() => setOverlay('none')} 
           onSuccess={handleScanSuccess} 
         />
       )}

       {overlay === 'dist_chat' && distAgent && (
         <div className="fixed inset-0 z-[110] bg-white animate-in slide-in-from-bottom duration-500">
            <AgentChatView 
              agent={distAgent} 
              onBack={() => {
                setOverlay('none');
                setDistAgent(null);
              }} 
              onOpenShop={() => setOverlay('agency_shop')}
            />
         </div>
       )}

       {overlay === 'agency_shop' && (
         <div className="fixed inset-0 z-[120] bg-white animate-in slide-in-from-right duration-500">
            <AgencyShopView onBack={() => setOverlay('none')} />
         </div>
       )}
    </div>
  );
};

export default HomeView;
