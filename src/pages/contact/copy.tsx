import { ContactApiService } from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { useFormik } from "formik";
import { CreateContactPayloadType, UpdateContactPayloadType } from "@/types";
import { useSessionStore } from "@/stores";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ContactForm, contactFormValidationSchema } from "./form";
import { Button } from "@/components/ui/button";

export function ContactCopyPage() {
  const { contactId } = useParams();

  const { data: contact } = useQuery({
    queryKey: ["contacts", contactId],
    queryFn: () => ContactApiService.findOne(contactId!),
    enabled: Boolean(contactId),
  });

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { company } = useSessionStore();

  const { mutate: updateContact } = useMutation({
    mutationKey: ["contacts", contactId],
    mutationFn: (payload: UpdateContactPayloadType) => {
      return ContactApiService.create(
        company.id!,
        payload as CreateContactPayloadType
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      navigate("/contacts");
    },
  });

  const form = useFormik<UpdateContactPayloadType>({
    initialValues: {
      name: contact?.name,
      type: contact?.type,
    },
    validationSchema: contactFormValidationSchema,
    onSubmit: (values) => updateContact(values),
    enableReinitialize: true,
  });

  return (
    <Dialog open={true} onOpenChange={() => navigate("/contacts")}>
      <DialogContent
        className="h-[90vh] min-w-[35vw] overflow-y-auto grid grid-rows-[auto_1fr]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Copie</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <ContactForm form={form} />

        <DialogFooter className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/contacts")}
          >
            Annuler
          </Button>
          <Button type="submit">Confirmer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
