import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { useFormik } from "formik";
import { UpdateUserPayloadType } from "@/types";
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
import { convertNullToUndefined } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function UserEditPage() {
  const { userId } = useParams();

  const { data: user } = useQuery({
    queryKey: ["users", userId],
    queryFn: () => UserApiService.findOne(userId!),
    enabled: Boolean(userId),
  });

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: updateUser } = useMutation({
    mutationKey: ["users", userId],
    mutationFn: (payload: UpdateUserPayloadType) => {
      return UserApiService.update(userId!, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/users");
    },
  });

  const form = useFormik<UpdateUserPayloadType>({
    initialValues: convertNullToUndefined({
      ...user,
      roleId: user?.role.id,
    }),
    validationSchema: userFormValidationSchema,
    onSubmit: (values) => updateUser(values),
    enableReinitialize: true,
  });

  return (
    <Dialog open={true} onOpenChange={() => navigate("/users")}>
      <DialogContent
        className="h-[90vh] min-w-[35vw] overflow-y-auto grid grid-rows-[auto_1fr]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Edition</DialogTitle>
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
