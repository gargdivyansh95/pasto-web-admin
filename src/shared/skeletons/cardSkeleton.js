import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function CardSkeleton() {
    return (
        <div className="space-y-4">
            <div className="flex justify-between">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-8 w-32" />
            </div>
            <div className="flex gap-4">
                <Skeleton className="h-36 w-36 rounded-md" />
                <div className="space-y-3 w-full">
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-6 w-56" />
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-6 w-44" />
                </div>
            </div>
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
        </div>
    )
}
