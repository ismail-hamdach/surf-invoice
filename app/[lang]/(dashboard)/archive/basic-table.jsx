"use client";
import * as React from "react";
import * as XLSX from "xlsx";

import { ArrowUpDown, ChevronDown } from "lucide-react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DatePickerWithRange from "@/components/date-picker-with-range";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Download } from "lucide-react";

import { Icon } from "@iconify/react";
import { cn, formatDate, formatTime } from "@/lib/utils";


const columns = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase whitespace-nowrap text-center">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "nom",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nom
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase whitespace-nowrap text-center">{row.getValue("nom")}</div>,
  },
  {
    accessorKey: "num_tele",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Numero de Telephone
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase whitespace-nowrap text-center">{row.getValue("num_tele")}</div>,
  },
  {
    accessorKey: "nbr_jrs",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre des Jours
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase whitespace-nowrap text-center">{row.getValue("nbr_jrs")}</div>,
  },
  {
    accessorKey: "num_planche",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Numéro de la Planche
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase whitespace-nowrap text-center">{row.getValue("num_planche")}</div>,
  },
  {
    accessorKey: "date_sortie",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Sortie
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase whitespace-nowrap text-center">{formatDate(row.getValue("date_sortie")) + " " + formatTime(row.getValue("date_sortie"))}</div>,
  },
  {
    accessorKey: "date_rentre",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Rentrée
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase whitespace-nowrap text-center">{formatDate(row.getValue("date_rentre")) + " " + formatTime(row.getValue("date_rentre"))}</div>,
  },
  {
    accessorKey: "prix_planche",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Prix Planche
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="whitespace-nowrap text-center">{row.getValue("prix_planche").toFixed(2) + " DH"}</div>,
  },
  {
    accessorKey: "prix_combine",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Prix Combine
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="whitespace-nowrap text-center">{row.getValue("prix_combine").toFixed(2) + " DH"}</div>,
  },
  {
    accessorKey: "prix_cours",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Prix Cours
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="whitespace-nowrap text-center">{row.getValue("prix_cours").toFixed(2) + " DH"}</div>,
  },
  {
    accessorKey: "note",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Note
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase whitespace-nowrap text-center">{row.getValue("note")}</div>,
  },


];

export function BasicDataTable({ trans, data = [], selectedDate, setSelectedDate, isLoading = false }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });


  const exportToExcel = () => {
    // Prepare the data for Excel
    const formattedData = data.map(item => ({
      ...item,
      date_sortie: formatDate(item.date_sortie) + " " + formatTime(item.date_sortie), // Format date_sortie
      date_rentre: formatDate(item.date_rentre) + " " + formatTime(item.date_rentre), // Format date_rentre
      created_at: formatDate(item.created_at) + " " + formatTime(item.created_at), // Format created_at
      prix_planche: item.prix_planche.toFixed(2),
      prix_combine: item.prix_combine.toFixed(2),
      prix_cours: item.prix_cours.toFixed(2),


    }));
    const worksheet = XLSX.utils.json_to_sheet(formattedData); // Convert data to a worksheet
    const workbook = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data"); // Append the worksheet to the workbook

    // Generate a file name
    const fileName = `table_data_${formatDate(selectedDate.from)}_${formatDate(selectedDate.to)}.xlsx`;

    // Save the workbook
    XLSX.writeFile(workbook, fileName);
  };

  const printTable = () => {
    const printWindow = window.open("", "_blank");
    const tableHtml = `
      <html>
        <head>
          <title>Print Table</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h2>Table Data</h2>
          <table>
            <thead>
              <tr>
                ${columns.map(column => `<th>${column.header({ column })}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${data.map(row => `
                <tr>
                  ${columns.map(column => `<td>${row[column.accessorKey]}</td>`).join("")}
                </tr>
              `).join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;
    printWindow.document.write(tableHtml);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <>
      <div className="flex items-center flex-wrap gap-2 ">
        <Input
          placeholder="Filter Nom..."
          value={table.getColumn("nom")?.getFilterValue() || ""}
          onChange={(event) =>
            table.getColumn("nom")?.setFilterValue(event.target.value)
          }
          className="max-w-sm min-w-[200px] h-10"
        />

        <Button asChild variant="outline" className="text-xs font-semibold text-primary-500">
          <Link href="#" onClick={() => {
            exportToExcel()
          }}>
            <Download className="w-3.5 h-3.5 ltr:mr-1.5 rtl:ml-1.5" />
            <span>Rapport Excel</span>
          </Link>
        </Button>
        <Button className="text-xs font-semibold " onClick={() => {
          printTable()
        }}>
          <Icon icon="heroicons:printer" className="w-5 h-5 ltr:mr-1 rtl:ml-1" /> Imprimer
        </Button>

        <DatePickerWithRange selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <Table >
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? <TableRow>
              <TableCell
                colSpan={columns.length - columns.length / 2 - columns.length / 2}
                className="h-24 text-center"
              >
                Loading ...
              </TableCell>
            </TableRow> :

              table?.getRowModel().rows?.length ? (
                table?.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length - columns.length / 2 - columns.length / 2}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center flex-wrap gap-4 px-4 py-4">
        <div className="flex-1 text-sm text-muted-foreground whitespace-nowrap">
          {table.getFilteredRowModel().rows.length} lignes trouvées
        </div>

        <div className="flex gap-2  items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="h-8 w-8"
          >
            <Icon icon="heroicons:chevron-left" className="w-5 h-5 rtl:rotate-180" />
          </Button>

          {table.getPageOptions().map((page, pageIdx) => (
            <Button
              key={`basic-data-table-${pageIdx}`}
              onClick={() => table.setPageIndex(pageIdx)}
              variant={`${pageIdx === table.getState().pagination.pageIndex ? "" : "outline"}`}
              className={cn("w-8 h-8")}
            >
              {page + 1}
            </Button>

          ))}


          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            variant="outline"
            size="icon"
            className="h-8 w-8"
          >
            <Icon icon="heroicons:chevron-right" className="w-5 h-5 rtl:rotate-180" />
          </Button>
        </div>
      </div>
    </>
  );
}

export default BasicDataTable;
