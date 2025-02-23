import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowUpDown, Copy, MoreVertical, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Outlet, useNavigate } from "react-router";
import { useSessionStore } from "@/stores";
import { TaxApiService } from "@/services";
import { DataTable } from "@/components/data-table";
import { useAlertDialogConfirmRemove } from "@/hooks";

export function TaxRootPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const { company } = useSessionStore();

  const { data: taxes } = useQuery({
    queryKey: ["taxes", company],
    queryFn: () => TaxApiService.findAll(company.id!),
    enabled: Boolean(company?.id),
  });

  const queryClient = useQueryClient();

  const { mutate: deleteTax } = useMutation({
    mutationKey: ["taxes"],
    mutationFn: TaxApiService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taxes"] });
    },
  });

  const navigate = useNavigate();

  const alertDialogConfirmRemove = useAlertDialogConfirmRemove();

  const tableData = useMemo(() => taxes ?? [], [taxes]);

  const table = useReactTable({
    data: tableData,
    columns: [
      {
        accessorKey: "name",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Nom
              <ArrowUpDown />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="lowercase">{row.getValue("name")}</div>
        ),
      },
      {
        accessorKey: "rate",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Taux
              <ArrowUpDown />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="lowercase">{row.getValue("rate")}</div>
        ),
      },
      {
        accessorKey: "type",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Type
              <ArrowUpDown />
            </Button>
          );
        },
        cell: ({ row }) => (
          <Badge className="lowercase" variant="outline">
            {row.getValue("type")}
          </Badge>
        ),
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const item = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate(`${item.id}/edit`)}>
                  <Pencil />
                  Modifier
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate(`${item.id}/copy`)}>
                  <Copy />
                  Dupliquer
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-500"
                  onClick={() =>
                    alertDialogConfirmRemove().then(
                      (isConfirm) => isConfirm && deleteTax(item.id)
                    )
                  }
                >
                  <Trash />
                  Supprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
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

  return (
    <>
      <div className="grid gap-4">
        <div className="flex">
          <h1 className="text-3xl font-bold tracking-tight">Taxes</h1>
          <Button onClick={() => navigate("/taxes/new")} className="ml-auto">
            Nouveau
          </Button>
        </div>
        <DataTable table={table} />
      </div>
      <Outlet />
    </>
  );
}
