import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function TableSkeleton() {
    return (
        <div className="border rounded-xl p-4">
            <div className="grid grid-cols-4 gap-4 mb-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-32" />
            </div>
            {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="grid grid-cols-4 gap-4 py-3 border-t">
                    <Skeleton className="h-5" />
                    <Skeleton className="h-5" />
                    <Skeleton className="h-5" />
                    <Skeleton className="h-5" />
                </div>
            ))}
        </div>
    )
}
