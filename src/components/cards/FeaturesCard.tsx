import { cn } from '@/lib/utils';
import Image, { StaticImageData } from 'next/image';
import React from 'react';

type FeatureProps = {
  title: string;
  description: string;
  icon: string | StaticImageData;
  className?: string;
};



const FeaturesCard: React.FC<FeatureProps> = ({ title, description, icon, className  }) => {
  return (
    <div className={cn("border-2 border-[#FBEDBB] rounded-xl p-6 flex flex-col justify-center items-center", className)}>
      <div className="mb-6">
        <Image src={icon} height={50} width={50} alt={`${title} icon`} />
      </div>
      <h3 className="text-[#F3C623] text-xl font-medium mb-3 text-center">{title}</h3>
      <p className="text-[#FFFFFD] text-center">{description}</p>
    </div>
  );
};

export default FeaturesCard;
