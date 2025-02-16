import { Link } from '@tanstack/react-router'

import { Button } from './button'

export function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      <div className="text-center">
        <h2 className="text-4xl font-extrabold text-emerald-500 animate-pulse">404</h2>

        <div className="max-w-lg mx-auto">
          <div className="space-y-4">
            <h4 className="text-2xl font-semibold sm:text-3xl text-gray-800">Page not found</h4>

            <p className="text-gray-600">Sorry, the page you are looking for doesn't exist.</p>

            <Link to="/">
              <Button variant="ghost">Go back home</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
