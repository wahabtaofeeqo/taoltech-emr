import { ReactElement } from "react";

export interface TableColumn<T> {
  key: string;
  header?: string | ReactElement;
  render?: (column: TableColumn<T>, item: T) => ReactElement;
}

// Define the props for our Table component
export interface TableProps<T> {
  data: T[];
  columns?: TableColumn<T>[];
  className?: string;
}

export function Table<T>({ data, columns }: TableProps<T>) {
  const headers = columns?.map((column, index) => {
    return (
      <th
        key={`headCell-${index}`}
        className="!z-0 text-left px-4 py-2 font-medium text-gray-600"
      >
        {column.header}
      </th>
    );
  });

  const rows = !data?.length ? (
    <tr>
      <td colSpan={columns?.length} className="text-center">
        No data
      </td>
    </tr>
  ) : (
    data?.map((row, index) => {
      return (
        <tr key={`row-${index}`} className="border-b">
          {columns?.map((column, index2) => {
            const value = column.render
              ? column.render(column, row as T)
              : (row[column.key as keyof typeof row] as string);

            return (
              <td key={`cell-${index2}`} className=" text-gray-700 xl:w-[20%] px-5 py-4 flex-1">
                {value}
              </td>
            );
          })}
        </tr>
      );
    })
  );

  return (
    <div className="overflow-x-auto  border border-gray-200 rounded-lg">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100 border-b">
          <tr>{headers}</tr>
        </thead>

        <tbody>{rows}</tbody>
      </table>
    </div>
  );

}
