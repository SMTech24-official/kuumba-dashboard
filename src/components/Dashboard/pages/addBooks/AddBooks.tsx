'use client'

import BreadCrumb from "@/components/common/breadCrumb/BreadCrumb"
import DnDInput from "@/components/ui/DnDInput"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAddBookMutation } from "@/redux/features/book/bookApi"
import { useAppDispatch } from "@/redux/hooks"
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast"
import { Button } from "@nextui-org/react"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"


export default function AddBooksO() {
    // eslint-disable-next-line prefer-const
    const [bookCover, setBookCover] = useState<File[] | null>(null)
    const [limit, setLimit] = useState<number>(1)

    const dispatch = useAppDispatch();
    const [addBook] = useAddBookMutation()
    const router = useRouter()

    console.log(bookCover);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const formData = new FormData();

            const Alldata = new FormData(e.currentTarget);

            const data = Object.fromEntries(Alldata.entries());
            console.log(bookCover);
            console.log(JSON.stringify(bookCover));
            if (bookCover) {
                bookCover.forEach((image) => {
                    if (image) {
                        formData.append(`images`, image)
                    }
                })
                const otherData = {
                    title: data.title,
                    description: data.description,
                    packageDetails: data.packageDetails,
                    price: parseFloat(data.price as string),
                    regularPrice: parseFloat(data.regularPrice as string),
                    quantity: parseInt(data.quantity as string),
                }
                console.log(otherData);
                formData.append("data", JSON.stringify(otherData))
                const finishRes = await handleAsyncWithToast(
                    async () => {
                        return addBook(formData); // Replace with your actual login function
                    },
                    "Adding Products...", // Toast message for the start of the process
                    "Products Added Completed!", // Toast message for success
                    `Please Check Your Products Data`, // Toast message for failure
                    true,
                    dispatch
                );
                if (finishRes?.data?.success) {
                    router.push("/myProducts")
                }
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error("Some error happened")
        }

    }

    const handleImagesLimit = () => {
        if (limit <= 9) {
            setLimit((prev) => prev + 1)
        }
    }

    const handleDelete = () => {
        if (limit <= 9) {
            setLimit((prev) => prev - 1)
        }
    }

    return (
        <div className="">
            <BreadCrumb />

            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="title">Product title</Label>
                        <Input id="title" name="title" placeholder="Product title" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Input id="description" name="description" placeholder="Description" />
                    </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="packageDetails">Package Details</Label>
                        <Input id="packageDetails" name="packageDetails" placeholder="Package Details" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="price">Price</Label>
                        <Input id="price" name="price" placeholder="$20" />
                    </div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input id="quantity" name="quantity" placeholder="Package Quantity" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="regularPrice">Regular Price</Label>
                        <Input id="regularPrice" name="regularPrice" placeholder="Regular Price" />
                    </div>
                </div>

                <div>
                    <div className="grid gap-6 sm:grid-cols-3 items-center justify-center h-full">
                        {
                            new Array(limit).fill("").map((data, idx) => <DnDInput
                                handleDelete={handleDelete}
                                key={idx}
                                width="w-full"
                                setNew={setBookCover}
                                initialFile={null}
                                id={`bookCover${idx + 1}`}
                                label={`Upload Product Image ${idx + 1}`}
                                acceptedTypes="image"
                            />)
                        }
                        {
                            (limit <= 9) && <div>
                                <Label className="text-gray-500 mb-4 block">Add Another</Label>
                                <div className="border-2 border-dashed rounded-lg p-6 h-[322px] flex flex-col items-center justify-center cursor-pointer">
                                    <div className=" h-full flex items-center justify-center">
                                        <button type="button" onClick={handleImagesLimit} className=' rounded-full  text-white bg-primary w-fit'>
                                            <Plus className="min-h-10 min-w-10  rounded-full" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>

                </div>

                <div className="flex gap-4">
                    <Button radius="sm" type="button">
                        Discard
                    </Button>
                    <Button radius="sm" className="bg-primary text-white" type="submit">
                        Submit your book
                    </Button>
                </div>
            </form>
        </div>
    )
}