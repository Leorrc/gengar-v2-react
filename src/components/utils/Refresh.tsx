import React from 'react';

interface RefreshButtonProps {
  onClick: () => void;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({ onClick }) => {
  return (
    <button
      className="flex items-center justify-center px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      onClick={onClick}
    >
      <svg
        className="w-4 h-4 mr-2 animate-spin"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
      Atualizar
    </button>
  );
};

export default RefreshButton;