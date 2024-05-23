import { Input } from '../ui/input'
import { Table } from '@tanstack/react-table'

import { barangays } from '../data-table/barangay-filter-utils'
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import { statuses } from '../data-table/data-table-status-filter'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { DataTableViewOptionsBatchDispersals } from '../data-table/data-table-view-options-batch-dispersals'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function BatchDispersalToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search Name"
          value={(table.getColumn('current_beneficiary')?.getFilterValue() as string) || ''}
          onChange={(e) => {
            table.getColumn('current_beneficiary')?.setFilterValue(e.target.value)
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {table.getColumn('barangay_name') && (
          <DataTableFacetedFilter
            column={table.getColumn('barangay_name')}
            title="Barangay"
            options={barangays}
          />
        )}

        {table.getColumn('status') && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title="Status"
            options={statuses}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptionsBatchDispersals table={table} />
    </div>
  )
}
