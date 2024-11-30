

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useUserActivityQuery } from '@/redux/features/auth/authApi'
import { Check, Pencil } from 'lucide-react'

export default function Activity() {
  const { data: activities } = useUserActivityQuery(undefined)

  return (
    <div className="w-full max-w-2xl p-4">
      <h2 className="text-2xl font-semibold mb-6">Your Activity</h2>
      <div className="space-y-4">
        {activities?.data.map((activity: any, index: number) => (
          <div key={index} className="flex items-start gap-3">
            <div className="mt-1">
              {activity.icon === "edit" ? (
                <Pencil className="h-4 w-4 text-gray-500" />
              ) : (
                <Check className="h-4 w-4 text-gray-500" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-gray-600">{activity.message}</p>
              <p className="text-sm text-gray-400">{ new Date(activity.createdAt).toDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}