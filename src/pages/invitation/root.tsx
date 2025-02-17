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
import { InvitationApiService } from "@/services";
import { DataTable } from "@/components/data-table";
import {
  InvitationFetchTypeEnum,
  InvitationStatusEnum,
  InvitationType,
} from "@/types";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useAlertDialogConfirmRemove } from "@/hooks";

const invitationStatusVariant = {
  [InvitationStatusEnum.Accepted]: "default",
  [InvitationStatusEnum.Rejected]: "destructive",
  [InvitationStatusEnum.Canceled]: "outline",
};

export function InvitationRootPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [invitationFetchType, setInvitationFetchType] =
    useState<InvitationFetchTypeEnum>(InvitationFetchTypeEnum.All);

  const { data: invitations } = useQuery({
    queryKey: ["invitations", invitationFetchType],
    queryFn: () => {
      switch (invitationFetchType) {
        case InvitationFetchTypeEnum.Sended:
          return InvitationApiService.findAllSended();
        case InvitationFetchTypeEnum.Received:
          return InvitationApiService.findAllReceived();
        default:
          return InvitationApiService.findAll();
      }
    },
  });

  const queryClient = useQueryClient();

  const { mutate: deleteInvitation } = useMutation({
    mutationKey: ["invitations"],
    mutationFn: InvitationApiService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invitations"] });
    },
  });

  const { mutate: acceptInvitation } = useMutation({
    mutationKey: ["invitations"],
    mutationFn: InvitationApiService.accept,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invitations"] });
    },
  });

  const { mutate: rejectInvitation } = useMutation({
    mutationKey: ["invitations"],
    mutationFn: InvitationApiService.reject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invitations"] });
    },
  });

  const { mutate: cancelInvitation } = useMutation({
    mutationKey: ["invitations"],
    mutationFn: InvitationApiService.cancel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invitations"] });
    },
  });

  const navigate = useNavigate();

  const alertDialogConfirmRemove = useAlertDialogConfirmRemove();

  const tableData = useMemo(() => invitations ?? [], [invitations]);

  const table = useReactTable({
    data: tableData,
    columns: [
      {
        accessorKey: "email",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Email
              <ArrowUpDown />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="lowercase">{row.getValue("email")}</div>
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Statut
              <ArrowUpDown />
            </Button>
          );
        },
        cell: ({ row }) => (
          <Badge
            className="lowercase"
            variant={invitationStatusVariant[row.getValue("status")]}
          >
            {row.getValue("status")}
          </Badge>
        ),
      },
      {
        accessorKey: "role",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Role
              <ArrowUpDown />
            </Button>
          );
        },
        cell: ({ row }) => (
          <Badge className="lowercase" variant="outline">
            {row.getValue<InvitationType["role"]>("role")?.name}
          </Badge>
        ),
      },
      {
        accessorKey: "expiredAt",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Date d'expiration
              <ArrowUpDown />
            </Button>
          );
        },
        cell: ({ row }) => {
          const expiredAt = row.getValue<string>("expiredAt");
          return (
            <div className="lowercase">
              {expiredAt && new Date(expiredAt).toLocaleDateString()}
            </div>
          );
        },
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="grid gap-2 grid-cols-[repeat(4,_min-content)]">
              {item.isPending && (
                <>
                  <Button size="sm" onClick={() => acceptInvitation(item.id)}>
                    <span>Accepter</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => rejectInvitation(item.id)}
                  >
                    <span>Refuser</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => cancelInvitation(item.id)}
                  >
                    <span>Annuler</span>
                  </Button>
                </>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {item.isPending && (
                    <>
                      <DropdownMenuItem
                        onClick={() => navigate(`${item.id}/edit`)}
                      >
                        <Pencil />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate(`${item.id}/copy`)}
                      >
                        <Copy />
                        Dupliquer
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem
                    className="text-red-500"
                    onClick={() =>
                      alertDialogConfirmRemove().then((isConfirm) => {
                        if (isConfirm) {
                          deleteInvitation(item.id);
                        }
                      })
                    }
                  >
                    <Trash />
                    Supprimer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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

  return (
    <>
      <div className="grid gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Invitations</h1>

        <div className="flex">
          <ToggleGroup
            type="single"
            variant="outline"
            value={invitationFetchType}
            onValueChange={setInvitationFetchType}
          >
            <ToggleGroupItem value={InvitationFetchTypeEnum.All}>
              Tout
            </ToggleGroupItem>
            <ToggleGroupItem value={InvitationFetchTypeEnum.Sended}>
              Envoyées
            </ToggleGroupItem>
            <ToggleGroupItem value={InvitationFetchTypeEnum.Received}>
              Reçues
            </ToggleGroupItem>
          </ToggleGroup>

          <Button
            onClick={() => navigate("/invitations/new")}
            className="ml-auto"
          >
            Nouveau
          </Button>
        </div>

        <DataTable table={table} />
      </div>
      <Outlet />
    </>
  );
}
