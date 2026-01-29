import React, { ReactNode } from "react";

interface TableProps {
  headers: string[];
  tableDesc?: string;
  children: ReactNode;
  pagination?: ReactNode;
}

const Table: React.FC<TableProps> = ({
  headers,
  tableDesc = "Table",
  children,
  pagination,
}) => {
  return (
    <div
      className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg"
      id="scroll"
    >
      <table
        aria-describedby={tableDesc}
        className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
      >
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                scope="col"
                className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
          {children}
        </tbody>
      </table>
      {pagination && <div className="my-4">{pagination}</div>}
    </div>
  );
};

export default Table;
