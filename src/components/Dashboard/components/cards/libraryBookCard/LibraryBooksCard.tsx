"use client"

import Image from "next/image";
import coins from "@/assets/coins.png"


export default function LibraryBookCard({
    bookTitleOrTitle,
    author,
    coinsPerReview,
    children,
    imageSrc,
}: {
    bookTitleOrTitle: string;
    author?: string;
    publishedDate: Date | string;
    coinsPerReview?: number;
    children: React.ReactNode;
    imageSrc: string;
}) {
    return (
        <div className="border rounded-lg shadow-sm w-[260px] md:w-[235px] lg:w-full xl:w-full  h-[368px] p-2 xl:p-4 flex flex-col ">
            <div className="w-[129px] h-[190px] mx-auto">
                <Image
                    src={imageSrc}
                    alt={`${bookTitleOrTitle} cover`}
                    className="rounded-md object-cover"
                    width={120}
                    height={180}
                    priority
                />
            </div>
            <div className="flex flex-col justify-between flex-1 mb-4">
                <h3 className="text-lg font-semibold  text-[#10375C] ">{bookTitleOrTitle}</h3>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[5px] border py-1 px-3 rounded-full">
                        <Image src={coins} alt="icon of coins earned by reding" className="max-w-6 max-h-6" />
                        <span className="text-sm text-muted-foreground">
                            {coinsPerReview}
                        </span>
                    </div>
                    <span className="text-sm text-gray-600 text-end max-w-32">By: {author}</span>
                </div>
            </div>
            <div className="">
                {children}
            </div>
        </div>
    )
}


