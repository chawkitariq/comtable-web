import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { ContactTypeEnum, CreateContactPayloadType } from "@/types";
import { useNavigate } from "react-router";
import { useSessionStore } from "@/stores";
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

export function ContactNewPage() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { company } = useSessionStore();

  const { mutate: createContact } = useMutation({
    mutationKey: ["contacts"],
    mutationFn: (payload: CreateContactPayloadType) =>
      ContactApiService.create(company?.id!, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      navigate("/contacts");
    },
  });

  const form = useFormik<CreateContactPayloadType>({
    initialValues: {
      name: "",
      type: ContactTypeEnum.Customer,
    },
    validationSchema: contactFormValidationSchema,
    onSubmit: (values) => createContact(values),
  });

  return (
    <Dialog open={true} onOpenChange={() => navigate("/contacts")}>
      <DialogContent
        className="h-[90vh] min-w-[35vw] overflow-y-auto grid grid-rows-[auto_1fr]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Nouveau</DialogTitle>
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
