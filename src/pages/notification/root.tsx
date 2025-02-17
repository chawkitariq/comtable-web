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
import { ArrowUpDown, Check, Eye, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { NotificationApiService } from "@/services";
import { DataTable } from "@/components/data-table";
import { useDataTableSelectableColumn } from "@/lib";
import { NotificationType } from "@/types";
import { useAlertDialogConfirmRemove } from "@/hooks";

export function NotificationRootPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: NotificationApiService.findAll,
  });

  const queryClient = useQueryClient();

  const { mutate: deleteAllNotification } = useMutation({
    mutationKey: ["notifications"],
    mutationFn: NotificationApiService.deleteAll,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const { mutate: readAllNotification } = useMutation({
    mutationKey: ["notifications"],
    mutationFn: NotificationApiService.readAll,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const navigate = useNavigate();

  const alertDialogConfirmRemove = useAlertDialogConfirmRemove();

  const tableData = useMemo(() => notifications ?? [], [notifications]);

  const table = useReactTable({
    data: tableData,
    columns: [
      useDataTableSelectableColumn<NotificationType>(),
      {
        accessorKey: "subject",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Sujet
              <ArrowUpDown />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="lowercase">{row.getValue("subject")}</div>
        ),
      },
      {
        accessorKey: "message",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Message
              <ArrowUpDown />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="lowercase">{row.getValue("message")}</div>
        ),
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="grid gap-2 grid-cols-[repeat(3,_min-content)]">
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate(`${item.id}/show`)}
              >
                <Eye />
              </Button>
              {!item.isReaded && (
                <Button
                  size="sm"
                  onClick={() => readAllNotification([item.id])}
                >
                  <Check />
                </Button>
              )}
              <Button
                size="sm"
                variant="destructive"
                onClick={() =>
                  alertDialogConfirmRemove().then((isConfirm) => {
                    if (isConfirm) {
                      deleteAllNotification([item.id]);
                    }
                  })
                }
              >
                <Trash />
              </Button>
            </div>
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

  const hasUnreadedNotifications = useMemo(
    () =>
      table
        .getSelectedRowModel()
        .rows.map(({ original }) => original)
        .some(({ isReaded }) => !isReaded),
    [table.getSelectedRowModel().rows]
  );

  const isSelectedDataTableRows = useMemo(
    () => table.getSelectedRowModel().rows.length > 0,
    [table.getSelectedRowModel().rows]
  );

  return (
    <>
      <div className="grid gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>

        {isSelectedDataTableRows && (
          <div className="flex items-center gap-2 ml-auto">
            {hasUnreadedNotifications && (
              <Button
                onClick={() =>
                  readAllNotification(
                    table
                      .getSelectedRowModel()
                      .rows.filter(({ original }) => !original.isReaded)
                      .map(({ original }) => original.id)
                  )
                }
              >
                <Check />
                Tout lire
              </Button>
            )}
            <Button
              variant="destructive"
              onClick={() =>
                alertDialogConfirmRemove().then((isConfirm) => {
                  if (isConfirm) {
                    deleteAllNotification(
                      table
                        .getSelectedRowModel()
                        .rows.map(({ original }) => original.id)
                    );
                  }
                })
              }
            >
              <Trash /> Tout supprimer
            </Button>
          </div>
        )}

        <DataTable table={table} />
      </div>
      <Outlet />
    </>
  );
}
