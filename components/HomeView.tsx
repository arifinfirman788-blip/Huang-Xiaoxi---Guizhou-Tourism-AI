
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
    // 构造特权服务对应的 Agent 数据
    const brokerAgent: ServiceItem = {
      id: 'service_broker',
      name: intentData.broker,
      avatarUrl: 'https://picsum.photos/id/64/200/200',
      isVerified: true,
      verifiedLabel: '官方直选',
      organizationName: '天悦旅行社 · 优质服务部',
      description: intentData.intentText,
      tags: [{ text: '专属权益', level: 'highlight' }],
      consultationCount: 99,
      promptQuestion: '如何开启此项特权？',
      category: 'guide'
    };
    
    setDistAgent(brokerAgent);
    setOverlay('dist_chat');
  };

  return (
    <div className="pt-4 pb-32">
       {/* Expert Profile Card */}
       <ExpertCard onClick={onOpenExperts} />

       {/* Dynamic Suggestion Rail */}
       <SuggestionRail />

       {/* Banner */}
       <PromoBanner />

       {/* Functional Grid */}
       <DashboardGrid />

       {/* Floating Input Section (Sticky Bottom) */}
       <AskBar />

       {/* Overlays Container */}
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
