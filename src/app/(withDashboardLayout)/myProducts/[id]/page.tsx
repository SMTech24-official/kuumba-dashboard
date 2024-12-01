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
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function AddBooksO() {
    const path = useParams()
    const { data: productsData, isLoading } = useSingleBookQuery(path.id)

    // eslint-disable-next-line prefer-const
    const [bookCover, setBookCover] = useState<File[] | null>(null)


    const [limit, setLimit] = useState<number>(0)
    console.log(limit);
    const dispatch = useAppDispatch();
    const [update] = useUpdateBookMutation()

    const [deleteProduct] = useDeleteBookMutation()

    const router = useRouter()


    useEffect(() => {
        const fetchImages = async () => {
            console.log(productsData?.data?.images.length);
            if (productsData?.data?.images.length > 0) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const allFile = await Promise.all(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    productsData?.data?.images.map(async (image: any) => {
                        const convertImage = await createFile(image, "image");
                        return convertImage;
                    })
                );
                setBookCover(allFile);
            }
        };

        fetchImages();
    }, [productsData?.data?.images])

    console.log(bookCover);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
        try {
            e.preventDefault()
            const formData = new FormData();

            const Alldata = new FormData(e.currentTarget);

            const data = Object.fromEntries(Alldata.entries());

            if (bookCover) {
                bookCover?.forEach((image) => {
                    if (image) {
                        formData.append(`images`, image)
                    }
                })

                const otherData = {
                    title: data.title,
                    description: data.description,
                    packageDetails: data.packageDetails,
                    price: parseFloat(data.price as string),
                    quantity: parseInt(data.quantity as string),
                    regularPrice: parseFloat(data.regularPrice as string),
                }
                formData.append("data", JSON.stringify(otherData))

                const sd = Object.fromEntries(formData.entries());
                console.log(sd);

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

    const handleImagesLimit = () => {
        if ((productsData?.data?.images.length + limit) <= 9) {
            setLimit((prev) => prev + 1)
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
                    <div className="space-y-2">
                        <Label htmlFor="regularPrice">Regular Price</Label>
                        <Input defaultValue={productsData?.data?.regularPrice} id="regularPrice" name="regularPrice" placeholder="Regular Price" />
                    </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-3 items-center justify-center h-full">
                    {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        productsData?.data?.images?.map((data: any, idx: number) => <DnDInput
                            key={idx}
                            width="w-full"
                            setNew={setBookCover}
                            initialFile={data}
                            id={`bookCover${idx + 1}`}
                            label={`Upload Product Image ${idx + 1}`}
                            acceptedTypes="image"
                        />)
                    }
                    {
                        new Array(limit).fill("").map((data, idx) => (
                            <DnDInput
                                key={idx}
                                width="w-full"
                                setNew={setBookCover}
                                initialFile={null}
                                id={`bookCover${idx + 1}`}  // Ensure the ID is a string
                                label={`Upload Product Image ${productsData?.data?.images.length + limit}`}
                                acceptedTypes="image"
                            />
                        ))

                    }
                    {
                        ((productsData?.data?.images.length + limit) <= 9) && <div>
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