"use client";
import {
  ColumnFilter,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColumnBook } from "./ColumnBook";
import { fetchBooks } from "../../../../controller/BookController";

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const BookTable = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
    
  const initialValues = useMemo(() => ({
    page: Number(searchParams.get("page")) || 1,
    perPage: Number(searchParams.get("perPage")) || 5,
    search: searchParams.get("search") || "",
  }), []);
  
  const [page, setPage] = useState(initialValues.page);
  const [perPage, setPerPage] = useState(initialValues.perPage);
  const [searchValue, setSearchValue] = useState(initialValues.search);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
    
  const debouncedSearch = useDebounce(searchValue, 500);
    
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (page > 1) params.set("page", String(page));
    if (perPage !== 5) params.set("perPage", String(perPage));
    
    const newUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ''}`;
        
    if (window.location.pathname + window.location.search !== newUrl) {
      router.replace(newUrl, { scroll: false });
    }
  }, [debouncedSearch, page, perPage, pathname, router]);
  
  useEffect(() => {
    if (debouncedSearch !== initialValues.search && page !== 1) {
      setPage(1);
    }
  }, [debouncedSearch]);
  
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["books", page, perPage, debouncedSearch], 
    queryFn: () => fetchBooks(page, perPage, debouncedSearch || undefined),
    staleTime: 5000,     
  });

  const books = data?.items || [];
  const meta = {
    current_page: data?.meta?.current_page || 1,
    total_pages: data?.meta?.last_page || 1,
    total_items: data?.meta?.total || 0,
    has_more_pages: data?.meta?.current_page < data?.meta?.last_page,
  };

  const columnDefaults = ColumnBook();

  const bookTable = useReactTable({ 
    data: books,
    columns: columnDefaults,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: true,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const generatePageNumbers = (current: number, total: number) => {
    const pages = [];

    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (current <= 3) {
      pages.push(1, 2, 3, "...", total);
    } else if (current >= total - 2) {
      pages.push(1, "...", total - 2, total - 1, total);
    } else {
      pages.push(1, "...", current, "...", total);
    }

    return pages;
  };
  
  if (isLoading) {
    return (
      <div className="w-full p-4 space-y-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
            <p>Loading books...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full p-4 space-y-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-500 mb-2">Error loading books</p>
            <Button onClick={() => refetch()}>Try Again</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative max-w-sm">
          <Input
            placeholder="Search books..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchValue !== debouncedSearch && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-3 w-3 border-b border-gray-400"></div>
            </div>
          )}
        </div>

        <Select
          value={String(perPage)}
          onValueChange={(value) => {
            setPerPage(Number(value));
            setPage(1);
          }}
          disabled={isLoading}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Items per page" />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20, 50].map((value) => (
              <SelectItem key={value} value={String(value)}>
                {value} / page
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {bookTable
              .getAllColumns()
              .filter((col) => col.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  className="capitalize"
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {debouncedSearch && (
        <div className="text-sm text-muted-foreground">
          {meta.total_items > 0 
            ? `Found ${meta.total_items} results for "${debouncedSearch}"`
            : `No results found for "${debouncedSearch}"`
          }
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {bookTable.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {bookTable.getRowModel().rows.length ? (
              bookTable.getRowModel().rows.map((row) => (
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
                  colSpan={columnDefaults.length}
                  className="h-24 text-center"
                >
                  <div className="w-full">No results.</div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground py-2">
        <div className="flex flex-col gap-2 items-center justify-between text-sm text-muted-foreground py-2 md:flex-row">
          <div>
            Page {meta.current_page} of {meta.total_pages} — Total:{" "}
            {meta.total_items} items
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={meta.current_page <= 1 || isLoading}
            >
              Previous
            </Button>

            {generatePageNumbers(meta.current_page, meta.total_pages).map(
              (pageNum, idx) =>
                pageNum === "..." ? (
                  <span key={idx} className="px-2 text-muted-foreground">
                    ...
                  </span>
                ) : (
                  <Button
                    key={idx}
                    variant={
                      pageNum === meta.current_page ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setPage(Number(pageNum))}
                    disabled={isLoading}
                  >
                    {pageNum}
                  </Button>
                )
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setPage((prev) => (meta.has_more_pages ? prev + 1 : prev))
              }
              disabled={!meta.has_more_pages || isLoading}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookTable;