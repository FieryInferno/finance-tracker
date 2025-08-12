'use client' // Error boundaries must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col justify-center items-center bg-red-50 shadow-md p-6 border border-red-200 rounded-2xl min-h-[200px]">
      <h2 className="mb-2 font-semibold text-red-700 text-2xl">
        Something went wrong!
      </h2>
      <p className="mb-4 text-red-600 text-center">{error.message}</p>
      <button
        onClick={() => reset()}
        className="bg-red-600 hover:bg-red-700 shadow-sm px-5 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1 text-white transition-colors duration-200"
      >
        Try Again
      </button>
    </div>
  )
}