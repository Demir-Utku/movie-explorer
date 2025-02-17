import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'

// add queryClient to the context to use in loaders
export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: () => (
    <>
      <header className="p-3 sm:p-4 lg:p-5 w-full bg-indigo-100">
        <h3 className="text-2xl sm:text-3xl font-semibold text-blue-800 text-center">
          Movie Explorer
        </h3>
      </header>

      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </>
  )
})
