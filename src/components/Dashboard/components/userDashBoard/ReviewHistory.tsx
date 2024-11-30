/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useReviewDataQuery } from "@/redux/features/auth/authApi"

export default function ReviewHistory() {
  const { data: reviews } = useReviewDataQuery(undefined)

  return (
    <div className="w-full max-w-4xl space-y-4 ">
      <div className="flex items-center justify-between ">
        <h2 className="text-2xl font-semibold tracking-tight">Review History</h2>


        <Select defaultValue="this-month">
          <SelectTrigger className="w-[180px] bg-">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-month">This month</SelectItem>
            <SelectItem value="last-month">Last month</SelectItem>
            <SelectItem value="last-3-months">Last 3 months</SelectItem>
            <SelectItem value="last-6-months">Last 6 months</SelectItem>
            <SelectItem value="last-year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table className=" max-h-[50vh] overflow-y-scroll">
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold !text-black">Book Name</TableHead>
            <TableHead className="font-bold !text-black">Review</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

          {reviews?.data.map((review: any, idx: number) => (
            <TableRow key={idx}>
              <TableCell className="font-medium  hover:underline">
                <p>{review.bookTitle}</p>
              </TableCell>
              <TableCell>{review.reviewCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}