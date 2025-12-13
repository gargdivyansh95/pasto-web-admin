import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'

export default function OrderFilters({ filterCategories, selectedStatus, onStatusChange }) {
    return (
        <div className="flex flex-col items-end mb-4">
            <Select value={selectedStatus?.id} onValueChange={onStatusChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue>
                        {selectedStatus?.label || "Select order status"}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {filterCategories?.map((status) => (
                        <SelectItem key={status.id} value={status.id}>{status.label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
