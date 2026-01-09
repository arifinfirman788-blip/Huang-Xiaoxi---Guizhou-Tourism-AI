
import React from 'react';
import { Tag } from '../types';

const TagBadge: React.FC<{ tag: Tag }> = ({ tag }) => {
  const styles = {
    primary: "bg-blue-600 text-white border-blue-600",
    highlight: "bg-orange-50 text-orange-600 border-orange-100",
    secondary: "bg-blue-50 text-blue-600 border-blue-100",
    tertiary: "bg-gray-50 text-gray-500 border-gray-100"
  };

  return (
    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${styles[tag.level]} font-medium whitespace-nowrap`}>
      {tag.text}
    </span>
  );
};

export default TagBadge;
