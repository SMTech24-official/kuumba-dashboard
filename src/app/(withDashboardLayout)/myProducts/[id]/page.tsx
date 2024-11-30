'use client'

import BreadCrumb from "@/components/common/breadCrumb/BreadCrumb"
import { Button } from "@/components/ui/button"
import DnDInput from "@/components/ui/DnDInput"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import MyLoading from "@/components/ui/MyLoading"
import { useDeleteBookMutation, useSingleBookQuery, useUpdateBookMutation } from "@/redux/features/book/bookApi"
import { useAppDispatch } from "@/redux/hooks"
import { createFile } from "@/utils/downloadImage"
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export default function AddBooksO() {
    const path = useParams()
    const { data: productsData, isLoading } = useSingleBookQuery(path.id)

    const [bookCover, setBookCover] = useState<File | null>(null)
    const [selectedImages, setSelectedImages] = useState<File[]>([])
    const dispatch = useAppDispatch();
    const [update] = useUpdateBookMutation()

    const [deleteProduct] = useDeleteBookMutation()

    const handleImageChange = (newImage: File, idx: number) => {
        setSelectedImages((prevImages) => {
            // If the image is being replaced, update it at the specified index
            const updatedImages = [...prevImages];
            updatedImages[idx] = newImage; // Replace the image at the given index
            return updatedImages;
        });
    }

    const router = useRouter()


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
        try {
            e.preventDefault()
            const formData = new FormData();

            const Alldata = new FormData(e.currentTarget);

            const data = Object.fromEntries(Alldata.entries());

            if (bookCover || productsData?.data?.image) {
                const file = await createFile(productsData?.data?.image, "image");
                formData.append("image", bookCover || file)

                const otherData = {
                    title: data.title,
                    description: data.description,
                    packageDetails: data.packageDetails,
                    price: parseFloat(data.price as string),
                    quantity: parseInt(data.quantity as string),
                }
                console.log(otherData);

                formData.append("data", JSON.stringify(otherData))
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const finishRes = await handleAsyncWithToast(
                    async () => {
                        return update({ data: formData, id }); // Replace with your actual login function
                    },
                    "Updating Products...", // Toast message for the start of the process
                    "Products Update successful!", // Toast message for success
                    `Please Check Your Products Data`, // Toast message for failure
                    true,
                    dispatch
                );
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error("Some error happend")
        }
    }

    if (isLoading) {
        return <div><MyLoading /></div>
    }

    const handleDelete = async (id: string) => {
        try {
            const finishRes = await handleAsyncWithToast(
                async () => {
                    return deleteProduct(id); // Replace with your actual login function
                },
                "Deleting Products...", // Toast message for the start of the process
                "Products Deleted successful!", // Toast message for success
                `Please Check Your Network `, // Toast message for failure
                true,
                dispatch
            );

            if (finishRes?.data?.success) {
                router.push("/myProducts")
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error("Some error happend")
        }

    }

    return (
        <div className="dashboard-containers ">
            <BreadCrumb />

            <form onSubmit={(e) => handleSubmit(e, productsData?.data?.id)} className="space-y-6 mt-4">
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="title">Product title</Label>
                        <Input defaultValue={productsData?.data?.title} id="title" name="title" placeholder="Product title" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Input defaultValue={productsData?.data?.description} id="description" name="description" placeholder="Description" />
                    </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="packageDetails">Package Details</Label>
                        <Input defaultValue={productsData?.data?.description} id="packageDetails" name="packageDetails" placeholder="Package Details" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="price">Price</Label>
                        <Input defaultValue={productsData?.data?.price} id="price" name="price" placeholder="$20" />
                    </div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input defaultValue={productsData?.data?.quantity} id="quantity" name="quantity" placeholder="Package Details" />
                    </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                    {
                        productsData?.data?.images?.map((image: string, idx: number) => {
                            return (
                                <div key={idx} className="space-y-2">
                                    <DnDInput
                                        width="w-full"
                                        newId={idx}
                                        setNew={setBookCover}
                                        initialFile={image}
                                        handleImageChange={handleImageChange}
                                        id="bookCover"
                                        label={`Upload Book cover ${idx + 1}`}
                                        acceptedTypes="image"
                                    />
                                </div>
                            )
                        })
                    }

                </div>

                <div className="flex gap-4">
                    <Button className="bg-primary" type="submit">
                        Update your Product
                    </Button>

                </div>
            </form>
            <Button onClick={() => handleDelete(productsData?.data?.id)} className="bg-red-500 text-white mt-8">
                Delete your Product
            </Button>
        </div>
    )
}