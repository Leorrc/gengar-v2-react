import React from 'react';

const Skeleton: React.FC = () => {
  return (
    <div className="max-w-[1120px] mx-auto min-h-[566px]">

      <table className="w-full  border-separate border-spacing-x-0 border-spacing-y-2">
        <thead className="">
          <tr>
            <th className="text-textBody font-normal py-4 px-8 text-left leading-6">
              Título
            </th>
            <th className="text-textBody font-normal py-4 px-8 text-left leading-6">
              Valor
            </th>
            <th className="text-textBody font-normal py-4 px-8 text-left leading-6">
              Categoria
            </th>
            <th className="text-textBody font-normal py-4 px-8 text-left leading-6">
              Data
            </th>
          </tr>
        </thead>
      </table>
      <div className="bg-roxo2 opacity-5 rounded-lg animate-pulse w-full">
        <div className="py-7 mx-auto w-full"></div>
      </div>
    </div>
  );
};

export default Skeleton;

