import { startTransition } from 'react'

import { cn } from '@/utils/cn'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'

interface MoviePaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function MoviePagination({ currentPage, totalPages, onPageChange }: MoviePaginationProps) {
  const showPageNumbers = totalPages > 2

  function renderPageNumbers() {
    const pageNumbers = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <PaginationItem key={i}>
            <PaginationLink
              className="cursor-pointer"
              onClick={() => onPageChange(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      }
    } else {
      // Always show first page
      pageNumbers.push(
        <PaginationItem key={1}>
          <PaginationLink
            className="cursor-pointer"
            onClick={() => onPageChange(1)}
            isActive={currentPage === 1}
          >
            1
          </PaginationLink>
        </PaginationItem>
      )

      // Show ellipsis if needed
      if (currentPage > 3) {
        pageNumbers.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        )
      }

      // Show current page and surrounding pages
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pageNumbers.push(
          <PaginationItem key={i}>
            <PaginationLink
              className="cursor-pointer"
              onClick={() => onPageChange(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      }

      // Show ellipsis if needed
      if (currentPage < totalPages - 2) {
        pageNumbers.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        )
      }

      // Always show last page
      pageNumbers.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            className="cursor-pointer"
            onClick={() => onPageChange(totalPages)}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      )
    }

    return pageNumbers
  }

  function handleClickPrevious() {
    startTransition(() => {
      if (currentPage > 1) {
        onPageChange(currentPage - 1)
      }
    })
  }

  function handleClickNext() {
    startTransition(() => {
      if (currentPage < totalPages) {
        onPageChange(currentPage + 1)
      }
    })
  }

  return (
    <Pagination className="animate-in fade-in duration-300">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={cn(
              'transition-colors duration-300',
              currentPage === 1 ? 'opacity-50 pointer-events-none' : 'cursor-pointer'
            )}
            onClick={handleClickPrevious}
          />
        </PaginationItem>

        {showPageNumbers && renderPageNumbers()}

        <PaginationItem>
          <PaginationNext
            className={cn(
              'transition-colors duration-300',
              currentPage === totalPages ? 'opacity-50 pointer-events-none' : 'cursor-pointer'
            )}
            onClick={handleClickNext}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
