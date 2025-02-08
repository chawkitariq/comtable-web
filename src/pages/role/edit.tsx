import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { useFormik } from "formik";
import { UpdateRolePayloadType } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RoleApiService } from "@/services";
import { RoleForm, roleFormValidationSchema } from "./form";
import { convertNullToUndefined } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function RoleEditPage() {
  const { roleId } = useParams();

  const { data: role } = useQuery({
    queryKey: ["roles", roleId],
    queryFn: () => RoleApiService.findOne(roleId!),
    enabled: Boolean(roleId),
  });

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: updateRole } = useMutation({
    mutationKey: ["roles", roleId],
    mutationFn: (payload: UpdateRolePayloadType) => {
      return RoleApiService.update(roleId!, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      navigate("/roles");
    },
  });

  const form = useFormik<UpdateRolePayloadType>({
    initialValues: convertNullToUndefined(role),
    validationSchema: roleFormValidationSchema,
    onSubmit: (values) => updateRole(values),
    enableReinitialize: true,
  });

  return (
    <Dialog open={true} onOpenChange={() => navigate("/roles")}>
      <DialogContent
        className="h-[90vh] min-w-[35vw] overflow-y-auto grid grid-rows-[auto_1fr]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Edition</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <RoleForm form={form} />

        <DialogFooter className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/roles")}
          >
            Annuler
          </Button>
          <Button onClick={() => form.submitForm()}>Confirmer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
