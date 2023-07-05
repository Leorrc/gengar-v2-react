
interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}

export function PaginationItem({
  isCurrent = false,
  onPageChange,
  number
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <button
        className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-blue-400 hover:text-white"
        disabled
      >
        {number}
      </button>
    )
  }

  return (
    <button
      className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-blue-400 hover:text-white"
      onClick={() => onPageChange(number)}
    >
      {number}
    </button>
  )
}