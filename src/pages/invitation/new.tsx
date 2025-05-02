import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { CreateInvitationPayloadType } from "@/types";
import { useNavigate } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InvitationApiService } from "@/services";
import { InvitationForm, invitationFormValidationSchema } from "./form";
import { Button } from "@/components/ui/button";

export function InvitationNewPage() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: createInvitation } = useMutation({
    mutationKey: ["invitations"],
    mutationFn: InvitationApiService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invitations"] });
      navigate("/invitations");
    },
  });

  const form = useFormik<CreateInvitationPayloadType>({
    initialValues: {
      email: "",
      expiredAt: undefined,
      roleId: undefined,
    },
    validationSchema: invitationFormValidationSchema,
    onSubmit: (values) => createInvitation(values),
  });

  return (
    <Dialog open={true} onOpenChange={() => navigate("/invitations")}>
      <DialogContent
        className="h-[90vh] min-w-[35vw] overflow-y-auto grid grid-rows-[auto_1fr]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Nouveau</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        
        {/* @ts-ignore */}
        <InvitationForm form={form} />

        <DialogFooter className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/invitations")}
          >
            Annuler
          </Button>
          <Button onClick={() => form.submitForm()}>Confirmer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
