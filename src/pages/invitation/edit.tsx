import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { useFormik } from "formik";
import { UpdateInvitationPayloadType } from "@/types";
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
import { convertNullToUndefined } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function InvitationEditPage() {
  const { invitationId } = useParams();

  const { data: invitation } = useQuery({
    queryKey: ["invitations", invitationId],
    queryFn: () => InvitationApiService.findOne(invitationId!),
    enabled: Boolean(invitationId),
  });

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: updateInvitation } = useMutation({
    mutationKey: ["invitations", invitationId],
    mutationFn: (payload: UpdateInvitationPayloadType) => {
      return InvitationApiService.update(invitationId!, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invitations"] });
      navigate("/invitations");
    },
  });

  const form = useFormik<UpdateInvitationPayloadType>({
    initialValues: {
      ...convertNullToUndefined(invitation),
      roleId: invitation?.role?.id,
      expiredAt: invitation?.expiredAt && new Date(invitation.expiredAt),
    },
    validationSchema: invitationFormValidationSchema,
    onSubmit: (values) => updateInvitation(values),
    enableReinitialize: true,
  });

  return (
    <Dialog open={true} onOpenChange={() => navigate("/invitations")}>
      <DialogContent
        className="h-[90vh] min-w-[35vw] overflow-y-auto grid grid-rows-[auto_1fr]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Edition</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
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
