"use client"

import BreadCrumb from '@/components/common/breadCrumb/BreadCrumb';
import { NoBooksFound } from '@/components/noBooksFound/NoFoundBooks';
import MyLoading from '@/components/ui/MyLoading';
import { Book } from '@/lib/types/type';
import { useGetAllBooksQuery } from '@/redux/features/book/bookApi';
import Link from 'next/link';
import { RiStickyNoteAddFill } from 'react-icons/ri';
import BooksCards from '../../components/cards/booksCard/BooksCards';

const MyBooks = () => {
    const { data: BooksData, isLoading } = useGetAllBooksQuery(undefined)
    // console.log(BooksData?.data);
    if (isLoading) {
        return <div className="h-screen"><MyLoading /></div>
    }

    return (
        <div>
            {/* heading */}
            <div className='flex xl:flex-row gap-2 md:gap-3 flex-col items-start  justify-between mb-4 '>
                <BreadCrumb />

                <div className='flex flex-wrap items-center justify-center gap-4'>

                    <Link href={"/addProducts"} className="hover:bg-primary border rounded-lg px-4 py-2 group text-sm font-semibold flex items-center gap-2 border-primary">
                        <RiStickyNoteAddFill className='min-h-7 min-w-7 text-primary group-hover:text-white' />
                        <span className='text-primary group-hover:text-white'>Add Products</span>
                    </Link>
                </div>

            </div>

            {/* Books Grid */}
            {
                BooksData?.data?.length > 0 ? <div className='sm:grid sm:grid-cols-2 flex flex-wrap items-center justify-center xl:gap-5 lg:gap-4 md:gap-3 gap-2'>
                    {BooksData?.data?.map((data: Book) => (
                        <BooksCards
                            key={data.id}
                            id={data.id}
                            bookTitle={data.title}
                            details={data.description}
                            quantity={data.quantity}
                            publishedDate={new Date(data.createdAt)}
                            coinsPerReview={data.price}
                            regularPrice={data.regularPrice}
                            imageSrc={data.images[0]}
                        />
                    ))
                    }
                </div> : <NoBooksFound />
            }

        </div>
    );
};

export default MyBooks;
