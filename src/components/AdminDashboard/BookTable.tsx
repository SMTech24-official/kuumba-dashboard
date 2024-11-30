'use client'
import { TBooksAndMembers } from "@/interface/globalType";
import { isNonEmptyArray } from "@/utils/isNonEmptyArray";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface BookTableProps {
  books: TBooksAndMembers[]; // books prop should be an array of Book
}

const BookTable = ({ books }: BookTableProps) => {
  // Initialize state for image sources for all books
  const router = useRouter()
  const [imgSrcs, setImgSrcs] = useState(
    books?.map(
      (book) =>
        book?.bookCover ||
        "https://img.freepik.com/free-photo/yellow-book-cover_1101-1118.jpg?ga=GA1.1.1655684950.1728801784&semt=ais_hybrid%20"
    )
  );

  const handleImageError = (index: number) => {
    // Update the image source for the specific book on error
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
    router.push(`/admin-dashboard/new-books/book-details`)
  }
  return (
    <div className="hidden xl:block">
      <table className="w-full table-auto border-collapse">
        {/* Table Header */}
        <thead>
          <tr className="text-base font-normal border-b-1">
            <th className="py-4 text-base font-normal">Book Name</th>
            <th className="py-4 text-base font-normal">Writer Name</th>
            <th className="py-4 text-base font-normal">Date</th>
            <th className="py-4 text-base font-normal">Details</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {isNonEmptyArray(books) &&
            books.map((book, index) => (
              <tr key={index} className={`hover:bg-gray-100`}>
                <td className="px-4 py-4 text-center lg:max-w-28">
                  <div className="flex gap-2 items-center">
                    <Image
                      src={imgSrcs[index]} // Use the current image source from state
                      alt={book?.title || "Default Book Cover"}
                      width={60}
                      height={90}
                      className="rounded"
                      onError={() => handleImageError(index)} // Handle errors
                    />
                    <p className="mt-2 text-base font-normal">
                      {book?.title || "Unknown Title"}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-4 text-center text-base font-normal">
                  {book?.authorName || "Unknown Author"}
                </td>
                <td className="px-4 py-4 text-center text-base font-normal">
                  {new Date(book?.createdAt || Date.now()).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </td>
                <td className="px-4 py-4 text-center">
                  <Button
                    onClick={() => handleDetails(book?._id)}
                    radius="sm"
                    className="bg-primary text-white"
                  // aria-label={`View details for ${book?.title}`}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div >
  );
};

export default BookTable;
