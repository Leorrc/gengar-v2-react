import React from 'react';

const SkeletonSummary: React.FC = () => {
  return (
    <>
      <section className="grid grid-cols-3 gap-8 -mt-28 max-w-[1120px] mx-auto">

        <div className="bg-gray-500 rounded animate-pulse w-[352px] h-[136px] ">
          <div className="mx-auto my-2"></div>
        </div>

        <div className="bg-gray-500 rounded animate-pulse w-[352px] h-[136px] ">
          <div className="mx-auto my-2"></div>
        </div>

        <div className="bg-gray-500 rounded animate-pulse w-[352px] h-[136px] ">
          <div className="mx-auto my-2"></div>
        </div>

      </section>
    </>
  )
}

export default SkeletonSummary;