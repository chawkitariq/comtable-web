import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { useFormik } from "formik";
import { ContactTypeEnum, UpdateContactPayloadType } from "@/types";
import { object, string } from "yup";
import { ContactForm } from "./form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ContactApiService } from "@/services/contact-api";

const validationSchema = object().shape({
  name: string().required("Obligatoire"),
  type: string().oneOf(Object.values(ContactTypeEnum)).required("Obligatoire"),
});

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
    initialValues: {
      name: contact?.name,
      type: contact?.type,
    },
    validationSchema,
    onSubmit: (values) => updateContact(values),
    enableReinitialize: true,
  });

  return (
    <Dialog open={true} onOpenChange={() => navigate("/contacts")}>
      <DialogContent
        className="h-[90vh] min-w-[35vw] overflow-y-auto"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Edition</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ContactForm form={form} />
      </DialogContent>
    </Dialog>
  );
}
