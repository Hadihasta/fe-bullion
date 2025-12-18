import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const SkeletonTable = ({dataLength = 5}) => {
 return (
    <>
      {Array.from({ length: dataLength }).map((_, index) => (
        <Skeleton
          key={index}
          className="h-[63px] p-2 w-full mb-2"
        />
      ))}
    </>
  )
}

export default SkeletonTable
