"use client"

import * as React from "react"
import { Search, SlidersHorizontal, X } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Dispatch, SetStateAction } from 'react'

export default function FilterDropdown({ filter, setFilter, genres }: { filter: string, setFilter: Dispatch<SetStateAction<string>>, genres: string[] }) {

    const [open, SetOpen] = React.useState<boolean>(false)
    return (
        <div className="">
            <div className="overflow-x-auto pb-4">
                <div className="flex flex-wrap gap-2">
                    {genres.slice(0, 3).map((genre) => (
                        <Button
                            key={genre}
                            variant="outline"
                            className={`hover:bg-primary border rounded-full px-4 py-2 hover:text-white text-gray-500 text-sm font-semibold ${filter === genre ? 'bg-primary text-white' : ''
                                }`}
                            onClick={() => setFilter(genre)}
                        >
                            {genre}
                        </Button>
                    ))}
                    <Popover open={open} onOpenChange={SetOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="rounded-full border border-black px-4">
                                <SlidersHorizontal onClick={() => SetOpen(!open)} className='min-h-5 min-w-5 ' />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className="space-y-4">
                                <div className=" flex justify-between items-center">
                                    <h3 className="font-medium">Filter</h3>
                                    <X onClick={() => SetOpen(false)} className="min-w-5 min-h-5 hover:text-primary" />
                                </div>
                                <div className="relative ">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        onChange={(e) => setFilter(e.target.value)}
                                        placeholder="Search genres"
                                        className="pl-8 bg-muted/50"
                                    />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {genres.map((genre) => (
                                        <Button
                                            key={genre}
                                            variant="outline"
                                            size="sm"
                                            className={`hover:bg-primary border rounded-full px-4 py-2 hover:text-white text-gray-500 text-sm font-semibold ${filter === genre ? 'bg-primary text-white' : ''
                                                }`}
                                            onClick={() => setFilter(genre)}
                                        >
                                            {genre}
                                        </Button>
                                    ))}
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-sm font-medium">Review type</h4>
                                    <Select defaultValue="pdf" onValueChange={e => setFilter(e)}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pdf">PDF Download</SelectItem>
                                            <SelectItem value="epub">EPUB</SelectItem>
                                            <SelectItem value="mobi">MOBI</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    )
}

