"use client"
import coins from "@/assets/coins.png";
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import reviewIcon from "@/assets/ReviewIcon.png"
export default function BooksCards({
  bookTitle,
  id,
  publishedDate,
  coinsPerReview,
  regularPrice,
  quantity,
  imageSrc,
  details
}: {
  bookTitle: string;
  id?: string;
  publishedDate: Date;
  coinsPerReview: number;
  regularPrice: number;
  quantity: number;
  imageSrc: string;
  details: string;

}) {

  const router = useRouter()


  const handleDetails = (id: string | number) => {
    // localStorage.setItem("id", JSON.stringify(id))
    router.push(`/myProducts/${id}`)
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 xl:h-[225px] sm:w-full w-[250px] h-full border rounded-lg shadow-sm">
      <div className="w-[129px] h-[190px] overflow-hidden">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={`${bookTitle} cover`}
            className="rounded-md object-cover"
            width={120}
            height={180}
            priority
          />
        ) : (
          <Image
            src={
              "https://img.freepik.com/free-photo/yellow-book-cover_1101-1118.jpg?ga=GA1.1.1655684950.1728801784&semt=ais_hybrid%20"
            }
            alt={`${bookTitle} cover`}
            className="rounded-md object-cover"
            width={120}
            height={180}
            priority
          />
        )}
      </div>
      <div className="flex flex-col  flex-1 gap-2">
        <div className="flex flex-col gap-3 xl:gap-0 xl:flex-row flex-1 items-start  justify-between">
          <div className="xl:space-y-2 ">
            <h2 className="text-xl font-semibold">{bookTitle}</h2>
            <div className="flex items-center gap-2 ">
              <p className=" text-sm px-2 py-[5px] rounded-md font-semibold capitalize">
                {details}
              </p>
            </div>
          </div>
          <div className="text-sm text-muted-foreground space-y-2 text-gray-600">
            <p>
              Published: {new Date(publishedDate).toLocaleDateString("en-CA")}
            </p>
            <div className="flex items-center gap-1 ">
              <Image
                src={coins}
                alt="icon of coins earned by reding"
                className="max-w-6 max-h-6"
              />
              <span className="text-sm text-muted-foreground">
                ${coinsPerReview}
              </span>
            </div>
            <div className="flex items-center gap-1 ">
              <Image
                src={coins}
                alt="icon of coins earned by reding"
                className="max-w-6 max-h-6"
              />
              <span className="text-sm text-muted-foreground">
                Regular: ${regularPrice}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 xl:gap-0 flex-col xl:flex-row items-start xl:items-center justify-between ">
          <div className="flex items-center gap-6">
            <div className="flex flex-col xl:flex-row items-start xl:items-center gap-2 xl:gap-6">
              <div className="flex items-center gap-1">
                <Image
                  src={reviewIcon}
                  alt="icon of coins earned by reding"
                  className="max-w-6 max-h-6"
                />
                <span className="text-sm text-muted-foreground">
                  Quantity: {quantity}
                </span>
              </div>
            </div>
          </div>
          <div className="ml-auto xl:mt-4">
            <Button
              radius="sm"
              className={cn(`w-full py-5 font-normal flex items-center bg-primary text-white hover:bg-primary/90 justify-center gap-2 text-xs md:text-sm lg:text-base `)}
              onClick={() => handleDetails(id!)}
            >
              Product Details
            </Button>

          </div>
        </div>
      </div>
    </div>
  );
}
