import ClipLoader from 'react-spinners/ClipLoader'

export function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <ClipLoader color="#6f42c1" size={40} />
    </div>
  )
}
