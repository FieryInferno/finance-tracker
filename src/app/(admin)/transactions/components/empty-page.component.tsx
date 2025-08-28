import Link from 'next/link'

export default function EmptyPage({
  subtitle,
  ...params
}: {
  title?: string
  subtitle?: string
  titleButton?: string
  href: string
}) {
  return (
    <div className='flex flex-col justify-center items-center bg-gray-50 h-screen'>
      <div className='text-center'>
        <svg
          className='mx-auto w-16 h-16 text-gray-400'
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          viewBox='0 0 16 16'
        >
          <g fill='currentColor'>
            <path d='M.54 3.87L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181L15.546 8H14.54l.265-2.91A1 1 0 0 0 13.81 4H2.19a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91H9v1H2.826a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31zm6.339-1.577A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139q.323-.119.684-.12h5.396z' />
            <path d='M11.854 10.146a.5.5 0 0 0-.707.708L12.293 12l-1.146 1.146a.5.5 0 0 0 .707.708L13 12.707l1.146 1.147a.5.5 0 0 0 .708-.708L13.707 12l1.147-1.146a.5.5 0 0 0-.707-.708L13 11.293z' />
          </g>
        </svg>
        <h2 className='mt-4 font-semibold text-gray-700 text-lg'>
          {params.title ?? 'No Data Found'}
        </h2>
        {subtitle && <p className='mt-2 text-gray-500 text-sm'>{subtitle}</p>}
        <Link
          href={params.href}
          className='inline-block bg-blue-600 hover:bg-blue-700 shadow mt-4 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white cursor-pointer'
        >
          {params.titleButton ?? 'Add Data'}
        </Link>
      </div>
    </div>
  )
}
