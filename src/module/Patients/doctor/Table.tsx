interface TableProps {
    headers: string[];
    data: (string | { name: string; avatar: string })[][];
  }

const Table = ({ headers, data }: TableProps) => (
    <div className=" overflow-x-auto border rounded-lg font-inter border-[#eaecf0]">
      <table className="w-full">
        <thead className="bg-[#f9fafb] text-left">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-4 py-4 text-xs font-medium text-[#211B1B] h-[44px] ">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {row.map((cell: any, i: number) => (
                <td key={i} className="px-4 py-4 border-t h-[72px] font-medium text-sm">
                  {typeof cell === "object" && cell.name ? (
                    <div className="flex items-center gap-2">
                      {cell.avatar && (
                        <img
                          src={cell.avatar}
                          alt="doctor-image"
                          className="w-10 h-10 rounded-full"
                        />
                      )}
                      {cell.name}
                    </div>
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  export default Table