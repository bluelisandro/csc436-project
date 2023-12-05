'use client'
import { useState, useTransition } from 'react'

export default function RefreshButton() {
  const [isPending, startTransition] = useTransition()
  const [count, setCount] = useState(0);
  const handleClick = () => {
    // Update state to trigger a rerender
    setCount(count + 1);
  };

  return (
    <button
      className={`${
        isPending ? 'cursor-not-allowed text-gray-400' : ''
      } text-lg text-orange-300 hover:text-orange-500`}
      disabled={isPending}
      onClick={() => {
        startTransition(() => {
          handleClick()
        })
      }}
    >
      {isPending ? 'Refreshing...' : 'Refresh'}
    </button>
  )
}