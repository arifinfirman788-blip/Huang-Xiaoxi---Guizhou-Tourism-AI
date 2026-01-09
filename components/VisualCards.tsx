import React from 'react';

const cards = [
  { id: 1, title: "贵州有什么好玩...", img: "https://picsum.photos/seed/gui1/200/120" },
  { id: 2, title: "贵阳咖啡哪家强?", img: "https://picsum.photos/seed/coffee/200/120" },
  { id: 3, title: "贵州周边不踩坑...", img: "https://picsum.photos/seed/mount/200/120" },
];

const VisualCards: React.FC<{ onSelect: (t: string) => void }> = ({ onSelect }) => {
  return (
    <div className="mb-6">
      <h3 className="font-bold text-sm text-gray-600 mb-3 px-1">热门问题推荐</h3>
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
        {cards.map((card) => (
          <div 
            key={card.id} 
            onClick={() => onSelect(card.title)}
            className="relative flex-shrink-0 w-36 h-24 rounded-xl overflow-hidden cursor-pointer shadow-md"
          >
            <img src={card.img} alt={card.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-2">
              <span className="text-white text-xs font-bold leading-tight line-clamp-2">
                {card.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisualCards;
