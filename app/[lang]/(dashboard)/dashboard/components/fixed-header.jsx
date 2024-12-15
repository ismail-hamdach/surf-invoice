"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, formatTime } from "@/lib/utils";


const FixedHeader = ({ trans, data = [] }) => {
  const columns = [
    "Id",
    "Nom",
    "Numero de Telephone",
    "Nombre des Jours",
    "Numéro de la Planche",
    "Date Sortie",
    "Date Rentrée",
    "Prix Planche",
    "Prix Combine",
    "Prix Cours",
    "Note",

  ]
  return (

    <Table wrapperClass="h-[400px] overflow-auto custom-scrollbar">
      <TableHeader>
        <TableRow>
          {
            columns.map(column => (
              <TableHead key={column} className="bg-default-100 last:pr-6  sticky top-0">
                {column}
              </TableHead>
            ))
          }
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>{item.price} DH</TableCell>
            <TableCell>{item.quantity * item.price + " DH"}</TableCell>
            <TableCell>{formatDate(item.created_at) + " " + formatTime(item.created_at)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FixedHeader;
