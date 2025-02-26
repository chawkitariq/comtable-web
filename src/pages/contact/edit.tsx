import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { useFormik } from "formik";
import { UpdateContactPayloadType } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ContactApiService } from "@/services/contact-api";
import { ContactForm, contactFormValidationSchema } from "./form";
import { Button } from "@/components/ui/button";
import { convertNullToUndefined } from "@/lib";

export function ContactEditPage() {
  const { contactId } = useParams();

  const { data: contact } = useQuery({
    queryKey: ["contacts", contactId],
    queryFn: () => ContactApiService.findOne(contactId!),
    enabled: Boolean(contactId),
  });

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: updateContact } = useMutation({
    mutationKey: ["contacts", contactId],
    mutationFn: (payload: UpdateContactPayloadType) => {
      return ContactApiService.update(contactId!, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      navigate("/contacts");
    },
  });

  const form = useFormik<UpdateContactPayloadType>({
    initialValues: convertNullToUndefined(contact),
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
          <DialogTitle>Edition</DialogTitle>
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
          <Button type="submit" onClick={() => form.submitForm()}>
            Confirmer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
