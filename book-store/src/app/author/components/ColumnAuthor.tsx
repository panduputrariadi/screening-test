"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,  
  DropdownMenuItem,  
} from "@/components/ui/dropdown-menu";
import { Author } from "../../../../types/type";
import { Checkbox } from "@/components/ui/checkbox";

export const ColumnAuthor = (
//   handleDelete: (id: string) => void,
//   handleUpdate: (author: Author) => void
): ColumnDef<Author>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Author Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "rating_author_given_count",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Voter
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("rating_author_given_count")}</div>,
  },
//   {
//     accessorKey: "description",
//     header: ({ column }) => (
//       <Button
//         variant="ghost"
//         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//       >
//         Description
//         <ArrowUpDown className="ml-2 h-4 w-4" />
//       </Button>
//     ),
//     cell: ({ row }) => (
//       <div className="lowercase">{row.getValue("description")}</div>
//     ),
//   },
//   {
//     id: "actions",
//     enableHiding: false,
//     cell: ({ row }) => {
//     //   const category = row.original;
//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">    
//             {/* <DropdownMenuItem onClick={() => handleUpdate(category)} variant="default">
//               <Pencil /> Update Category
//             </DropdownMenuItem>                    
//             <DropdownMenuItem onClick={() => handleDelete(category.id)} variant="destructive">
//               <Trash /> Delete Category
//             </DropdownMenuItem> */}
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
];
