import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { CreateRolePayloadType } from "@/types";
import { useNavigate } from "react-router";
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
import { Button } from "@/components/ui/button";

export function RoleNewPage() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: createRole } = useMutation({
    mutationKey: ["roles"],
    mutationFn: (payload: CreateRolePayloadType) =>
      RoleApiService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      navigate("/roles");
    },
  });

  const form = useFormik<CreateRolePayloadType>({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: roleFormValidationSchema,
    onSubmit: (values) => createRole(values),
  });

  return (
    <Dialog open={true} onOpenChange={() => navigate("/roles")}>
      <DialogContent
        className="h-[90vh] min-w-[30vw] overflow-y-auto grid grid-rows-[auto_1fr]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Nouveau</DialogTitle>
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
