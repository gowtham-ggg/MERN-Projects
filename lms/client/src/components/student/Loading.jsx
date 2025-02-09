import React from 'react'

const Loading = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-800'>
      <div className='w-16 sm:w-20 aspect-square border-4 border-gray-300 border-t-4 border-t-blue-500 rounded-full animate-spin'></div>
      <p className='mt-3 text-lg font-semibold text-white animate-pulse'>
        Loading<span className='text-blue-500'>...</span>
      </p>
    </div>
  )
}

export default Loading
