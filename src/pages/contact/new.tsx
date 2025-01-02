import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { ContactTypeEnum, CreateContactPayloadType } from "@/types";
import { number, object, string } from "yup";
import { ContactForm } from "./form";
import { useNavigate } from "react-router";
import { useSessionStore } from "@/stores";
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
  type: string().oneOf(["product", "service"]).required("Obligatoire"),
  salePrice: number().min(0),
  purchasePrice: number().min(0),
});

export function ContactNewPage() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { company } = useSessionStore();

  const { mutate: createContact } = useMutation({
    mutationKey: ["contacts"],
    mutationFn: (payload: CreateContactPayloadType) => {
      return ContactApiService.create(company?.id!, payload);
    },
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
    validationSchema,
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
      </DialogContent>
    </Dialog>
  );
}
