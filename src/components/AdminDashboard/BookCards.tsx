"use client";
import { TBooksAndMembers } from "@/interface/globalType";
import { cn } from "@/lib/utils";
import { isNonEmptyArray } from "@/utils/isNonEmptyArray";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface BookTableProps {
  books: TBooksAndMembers[]; // books prop should be an array of Book
  className?: string;
}

const BookCards = ({ books, className }: BookTableProps) => {

  const router = useRouter()
  // State for handling fallback images
  const [imgSrcs, setImgSrcs] = useState(
    books.map(
      (book) =>
        book?.bookCover ||
        "https://img.freepik.com/free-photo/yellow-book-cover_1101-1118.jpg?ga=GA1.1.1655684950.1728801784&semt=ais_hybrid%20"
    )
  );

  const handleImageError = (index: number) => {
    setImgSrcs((prev) =>
      prev.map((src, i) =>
        i === index
          ? "https://img.freepik.com/free-photo/yellow-book-cover_1101-1118.jpg?ga=GA1.1.1655684950.1728801784&semt=ais_hybrid%20"
          : src
      )
    );
  };
  const handleDetails = (id: string | number) => {
    localStorage.setItem("id", JSON.stringify(id))
    router.push(`/admin-dashboard/new-Books/book-details`)
  }

  return (
    <div className={cn("grid gap-3 xl:hidden p-4", className)}>
      {isNonEmptyArray(books) &&
        books.map((book, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col"
          >
            {/* Book Image */}
            <div className="w-full max-w-56 mx-auto max-h-72">
              <Image
                src={imgSrcs[index]} // Use the current image source from state
                alt={book.title || "Default Book Cover"}
                width={100}
                height={100}
                className="rounded-t-lg h-full w-full object-fill"
                onError={() => handleImageError(index)} // Handle error for this image
              />
            </div>

            {/* Book Info */}
            <div className="p-4 flex flex-col justify-between flex-grow">
              <h3 className="text-lg font-semibold text-center">
                {book?.title || "Unknown Title"}
              </h3>
              {book?.authorName && (
                <p className="text-sm text-center text-gray-600">
                  {book?.authorName}
                </p>
              )}
              <p className="text-sm text-center text-gray-500">
                {new Date(book?.createdAt || Date.now()).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>

              {/* View Button */}
              <div className="mt-4 text-center">
                <Button onClick={() => handleDetails(book?._id)} radius="sm" className="bg-primary text-white">
                  View
                </Button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default BookCards;
