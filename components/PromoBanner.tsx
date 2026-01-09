
import React from 'react';
import { ArrowRight } from 'lucide-react';

const PromoBanner: React.FC = () => {
  return (
    <div className="mb-4 relative rounded-2xl overflow-hidden shadow-sm group cursor-pointer">
      <img 
        src="https://picsum.photos/id/234/600/200" 
        alt="Guiyang Travel Guide" 
        className="w-full h-32 object-cover transform group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-teal-900/40 to-transparent flex flex-col justify-center px-6">
        <h3 className="text-2xl font-black text-white italic tracking-tighter drop-shadow-md">
           贵阳旅居
           <br />
           爽游指南!
        </h3>
        <div className="flex items-center gap-1 text-white/90 text-xs font-medium mt-2 backdrop-blur-sm bg-white/20 w-fit px-2 py-1 rounded-full">
           点击进入 <ArrowRight size={10} />
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
