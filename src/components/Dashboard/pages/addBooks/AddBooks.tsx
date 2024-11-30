'use client'

import BreadCrumb from "@/components/common/breadCrumb/BreadCrumb"
import { Button } from "@/components/ui/button"
import DnDInput from "@/components/ui/DnDInput"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAddBookMutation } from "@/redux/features/book/bookApi"
import { useAppDispatch } from "@/redux/hooks"
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export default function AddBooksO() {
    const [bookCover, setBookCover] = useState<File | null>(null)

    const dispatch = useAppDispatch();
    const [addBook] = useAddBookMutation()
    const router = useRouter()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const formData = new FormData();

            const Alldata = new FormData(e.currentTarget);

            const data = Object.fromEntries(Alldata.entries());
            console.log(bookCover);
            if (bookCover) {
                formData.append("image", bookCover)
                const otherData = {
                    title: data.title,
                    description: data.description,
                    packageDetails: data.packageDetails,
                    price: parseFloat(data.price as string),
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
                        <Input id="quantity" name="quantity" placeholder="Package Details" />
                    </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <DnDInput
                            width="w-full"
                            setNew={setBookCover}
                            initialFile={null}
                            id="bookCover"
                            label="Upload Book cover"
                            acceptedTypes="image"
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <Button variant="outline" type="button">
                        Discard
                    </Button>
                    <Button className="bg-primary" type="submit">
                        Submit your book
                    </Button>
                </div>
            </form>
        </div>
    )
}