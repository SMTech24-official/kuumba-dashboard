"use client";

import MyLoading from "@/components/ui/MyLoading";
import { BookReviewData } from "@/interface/globalType";
import ReviewCards from "../ReviewCards";
import ReviewTable from "../ReviewTable";

interface BookTableProps {
  items: BookReviewData[];
  title: string;
  isLoading?: boolean;
}

const ReviewComponent = ({ items, title, isLoading }: BookTableProps) => {
  console.log(items);

  if (isLoading) {
    return <MyLoading />;
  }

  return (
    <div className="space-y-6 ">
      <div className="bg-white sm:px-6 rounded-lg   ">
        <div className="flex items-center justify-between border-b pb-5">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p>{items?.length}</p>
        </div>
        <div className=" ">
          <ReviewTable Items={items} />
          <ReviewCards Items={items} className="grid-cols-1 xs:grid-cols-2 xl:grid-cols-3"/>
        </div>
      </div>
    </div>
  );
};

export default ReviewComponent;
