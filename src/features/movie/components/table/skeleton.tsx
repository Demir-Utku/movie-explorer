import './table.scss'

import { cn } from '@/utils/cn'
import { Skeleton } from '@/components/ui/skeleton'

import { columns } from './columns'

export function MovieTableSkeleton() {
  function renderBody(column: (typeof columns)[number]) {
    if (column.key === 'Poster') {
      return <Skeleton className="!w-12 aspect-[0.6] mx-auto rounded-md" />
    }

    if (column.key === 'Title') {
      return <Skeleton className="h-8 !w-full flex-1 rounded-md" />
    }

    return <Skeleton className="h-8 w-28 rounded-md" />
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="ui-table">
        <thead className="bg-gray-100">
          <tr className="font-semibold text-gray-700 text-sm">
            {columns.map(column => (
              <th
                key={column.key}
                className={cn([
                  'px-3 py-2 min-w-28 max-w-96',
                  { '!min-w-16 w-16': column.key === 'Poster' }
                ])}
              >
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
                    'px-3 py-2 min-w-28 max-w-96',
                    {
                      '!min-w-16 !w-16': column.key === 'Poster',
                      'capitalize': column.key === 'Type'
                    }
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
