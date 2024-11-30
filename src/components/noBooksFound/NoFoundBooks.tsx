import { BookX } from 'lucide-react'



export function NoBooksFound() {
    return (
        <div className=" w-full flex items-center justify-center">
            <div className="max-w-md ">
                <div className="flex flex-col items-center justify-center p-6 text-center">
                    <BookX className="w-16 h-16 text-muted-foreground mb-4" />
                    <h2 className="text-2xl font-bold mb-2">No Products Found</h2>
                    <p className="text-muted-foreground mb-4">
                        We couldn&apos;t find any Products matching your criteria
                    </p>
                </div>
            </div>
        </div>
    )
}

