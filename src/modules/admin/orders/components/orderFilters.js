import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search } from 'lucide-react'
import React from 'react'

export default function OrderFilters({ filterCategories, selectedStatus, searchText, onSearch, onStatusChange }) {
    return (
        <div className="flex flex-row items-center justify-between gap-4 mb-4">
            <InputGroup className={'border h-11 w-[30%]'}>
                <InputGroupInput 
                    type="text"
                    value={searchText}
                    onChange={(e) => onSearch(e.target.value)}
                    placeholder="Search orders..."
                />
                <InputGroupAddon>
                    <Search />
                </InputGroupAddon>
            </InputGroup>
            <div className="flex flex-row items-center justify-end gap-4">
                <Label className="text-base font-medium text-black">Filter by status:</Label>
                <Select value={selectedStatus?.id} onValueChange={onStatusChange}>
                    <SelectTrigger className="w-[180px] text-base font-medium text-black !h-11">
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
        </div>
    )
}
