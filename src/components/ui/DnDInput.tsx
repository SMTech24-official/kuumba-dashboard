"use client"

import React, { Dispatch, SetStateAction } from 'react';
import { FileText, Plus } from 'lucide-react'
import { Label } from "@/components/ui/label"
import { useState } from "react"
import Image from "next/image"



const DnDInput = ({ id, newId, acceptedTypes, handleImageChange, setNew, initialFile, label, width }: { label: string, handleImageChange: Dispatch<SetStateAction<File[]>>, setNew: Dispatch<SetStateAction<File | null>>, initialFile: string | null, id: string, newId: number, acceptedTypes: string, width: string }) => {
    const [file, setFile] = useState<string | null>(initialFile)
    // const [newFileType, setNewFileType] = useState<'image' | 'pdf' | null>(null)

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        const droppedFile = e.dataTransfer.files[0]
        setNew(droppedFile)
        handleFile(droppedFile)
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
            setNew(selectedFile)
            handleImageChange(selectedFile, newId)
            handleFile(selectedFile)
        }
    }

    const handleFile = (file: File) => {
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setFile(e.target?.result as string)
                // setNewFileType(file.type.startsWith('image/') ? 'image' : 'pdf')
            }
            reader.readAsDataURL(file)
        }
    }



    return (
        <div>
            <Label className="text-gray-500 mb-4 block">{label}</Label>
            <div
                className={`border-2 border-dashed rounded-lg p-6 ${width} h-[322px] flex flex-col items-center justify-center cursor-pointer`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                {file ? (
                    <div className="flex flex-col items-center w-full">
                        <div className="w-36 h-36 md:w-44 md:h-44 mb-4">
                            {acceptedTypes === 'image' ? (
                                <Image
                                    src={file}
                                    alt="Uploaded file"
                                    width={180}
                                    height={180}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                                    <FileText className="w-16 h-16 text-gray-400" />
                                </div>
                            )}
                        </div>
                        <div className='w-full flex flex-col items-center justify-center gap-2'>
                            <p className="text-sm text-center text-gray-500">Drag and drop</p>
                            <p className="text-sm text-center text-gray-500">Or</p>
                            <label className="bg-primary text-white px-4 py-2 rounded-md cursor-pointer">
                                Select
                                <input
                                    name={id}
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileSelect}
                                    accept={acceptedTypes === 'image' ? "image/*" : ".pdf"}
                                />
                            </label>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className='border p-2 rounded-full mb-2 text-white bg-primary '>
                            <Plus className="min-h-10 min-w-10  aspect-square" />
                        </div>
                        <p className="text-sm text-center text-gray-500">Drag and drop</p>
                        <p className="text-sm text-center text-gray-500 mb-2">Or</p>
                        <label className="bg-primary text-white px-4 py-2 rounded-md cursor-pointer">
                            Select
                            <input name={id} type="file" className="hidden" onChange={handleFileSelect} accept={acceptedTypes === 'image' ? "image/*" : ".pdf"} />
                        </label>
                    </>
                )}
            </div>
        </div>

    );
};

export default DnDInput;