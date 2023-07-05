import PacmanLoader from 'react-spinners/PacmanLoader'

export function Loading() {
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-shape2">
        <div className="">
          <PacmanLoader color="#6f42c1" size={100} />
        </div>
      </div>
    </>
  )
}
