/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from '@nextui-org/react';

const KnowledgeHubStartReadingCard = ({ item }: { item: any }) => {
  const [imageError, setImageError] = useState(false); // State to track if image fails to load

  // Handle PDF download
  const handleDownloadPdf = (pdfUrl: string) => {
    if (!pdfUrl) {
      alert('PDF not available');
      return;
    }
    // Open the PDF in a new tab
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };

  // Fallback image URL
  const fallbackImage =
    'https://img.freepik.com/free-photo/yellow-book-cover_1101-1118.jpg';

  return (
    <div className="border p-3 flex flex-col items-gap-3 rounded-xl">
      {
        // If image loading fails, use the fallback image
        !imageError && item?.cover ? (
          <Image
            src={item?.cover}
            height={400}
            width={200}
            alt="img"
            className="mx-auto h-full max-h-60"
            onError={() => setImageError(true)} // Handle error here
          />
        ) : (
          <Image
            src={fallbackImage}
            height={400}
            width={200}
            alt="img"
            className="mx-auto"
          />
        )
      }
      <h3 className="text-xl font-medium mt-1 mb-3">{item?.title}</h3>
      <p className="text-start font-medium text-xs mb-2">By: {item?.addedBy}</p>
      <Button radius="sm" onClick={() => handleDownloadPdf(item?.pdfFile)} className="bg-primary text-white">
        Start reading
      </Button>
    </div>
  );
};

export default KnowledgeHubStartReadingCard;
