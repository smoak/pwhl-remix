import type { PropsWithChildren } from "react";

type TableCellProps = PropsWithChildren<{ className?: string }>;

export const TableCell = ({ children, className = "" }: TableCellProps) => {
  return (
    <td className={`border border-pwhl-purple-50 px-3 py-2 ${className}`}>
      {children}
    </td>
  );
};
