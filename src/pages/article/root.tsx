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
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMemo, useState } from "react";
import { ArticleApiService } from "@/services";
import { Badge } from "@/components/ui/badge";
import { Outlet, useNavigate } from "react-router";
import { useSessionStore } from "@/stores";
import { DataTable } from "@/components/data-table";
import { CategoryType, TaxType } from "@/types";

export function ArticleRootPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const { company } = useSessionStore();

  const { data: articles } = useQuery({
    queryKey: ["articles", company?.id],
    queryFn: () => ArticleApiService.findAll(company?.id!),
    enabled: Boolean(company?.id),
  });

  const queryClient = useQueryClient();

  const { mutate: deleteArticle } = useMutation({
    mutationKey: ["articles"],
    mutationFn: ArticleApiService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });

  const navigate = useNavigate();

  const tableData = useMemo(() => articles ?? [], [articles]);

  const table = useReactTable({
    data: tableData,
    columns: [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
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
        accessorKey: "taxes",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Taxes
              <ArrowUpDown />
            </Button>
          );
        },
        cell: ({ row }) => {
          const taxes = row
            .getValue<TaxType[]>("taxes")
            ?.map(({ name }) => name);

          return (
            <>
              {taxes?.map((name, i) => (
                <Badge key={i} className="lowercase" variant="outline">
                  {name}
                </Badge>
              ))}
            </>
          );
        },
      },
      {
        accessorKey: "category",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Catégorie
              <ArrowUpDown />
            </Button>
          );
        },
        cell: ({ row }) => {
          const category = row.getValue<CategoryType>("category")?.name;
          return (
            <>
              {category && (
                <Badge className="lowercase" variant="outline">
                  {category}
                </Badge>
              )}
            </>
          );
        },
      },
      {
        accessorKey: "salePrice",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Prix de vente
              <ArrowUpDown />
            </Button>
          );
        },
        cell: ({ row }) => <p>{row.getValue("salePrice")}</p>,
      },
      {
        accessorKey: "purchasePrice",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Prix d'achat
              <ArrowUpDown />
            </Button>
          );
        },
        cell: ({ row }) => <p>{row.getValue("purchasePrice")}</p>,
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
                  onClick={() => deleteArticle(item.id)}
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
          <h1 className="text-3xl font-bold tracking-tight">Articles</h1>
          <Button onClick={() => navigate("/articles/new")} className="ml-auto">
            Nouveau
          </Button>
        </div>
        <DataTable table={table} />
      </div>
      <Outlet />
    </>
  );
}
