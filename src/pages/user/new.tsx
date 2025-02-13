import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { CreateUserPayloadType } from "@/types";
import { useNavigate } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserApiService } from "@/services";
import { UserForm, userFormValidationSchema } from "./form";
import { Button } from "@/components/ui/button";

export function UserNewPage() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: createUser } = useMutation({
    mutationKey: ["users"],
    mutationFn: UserApiService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/users");
    },
  });

  const form = useFormik<CreateUserPayloadType>({
    initialValues: {
      email: "",
      password: "",
      roleId: "",
    },
    validationSchema: userFormValidationSchema,
    onSubmit: (values) => createUser(values),
  });

  return (
    <Dialog open={true} onOpenChange={() => navigate("/users")}>
      <DialogContent
        className="h-[90vh] min-w-[35vw] overflow-y-auto grid grid-rows-[auto_1fr]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Nouveau</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <UserForm form={form} />

        <DialogFooter className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/users")}
          >
            Annuler
          </Button>
          <Button onClick={() => form.submitForm()}>Confirmer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
