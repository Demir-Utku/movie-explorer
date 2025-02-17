import './table.scss'

import { cn } from '@/utils/cn'
import { Skeleton } from '@/components/ui/skeleton'

import { columns } from './columns'

const columnWidths = {
  Poster: 'w-16 min-w-[4rem]',
  Title: 'w-[40%] min-w-[15rem] md:min-w-[20rem]',
  Year: 'w-[15%] min-w-[6.25rem] md:min-w-[7.5rem]',
  Type: 'w-[15%] min-w-[6.25rem] md:min-w-[7.5rem]',
  imdbID: 'w-[20%] min-w-[7.5rem] md:min-w-[10rem]'
}

export function MovieTableSkeleton() {
  function renderBody(column: (typeof columns)[number]) {
    if (column.key === 'Poster') {
      return <Skeleton className="!w-12 aspect-[0.6] mx-auto rounded-md" />
    }

    return <Skeleton className="h-8 w-full rounded-md" />
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="ui-table table-fixed">
        <thead className="bg-gray-100">
          <tr className="font-semibold text-gray-700 text-sm">
            {columns.map(column => (
              <th key={column.key} className={cn('px-3 py-2', columnWidths[column.key])}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index}>
              {columns.map(column => (
                <td
                  key={column.key}
                  className={cn([
                    'px-3 py-2',
                    columnWidths[column.key],
                    { capitalize: column.key === 'Type' }
                  ])}
                >
                  {renderBody(column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
