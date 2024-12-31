import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { CreateDocumentPayloadType } from "@/types";
import { number, object, string } from "yup";
import { useNavigate } from "react-router";
import { useSessionStore } from "@/stores";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DocumentInvoiceApiService } from "@/services";
import { InvoiceForm } from "./form";

const validationSchema = object().shape({
  name: string().required("Obligatoire"),
  type: string().oneOf(["product", "service"]).required("Obligatoire"),
  salePrice: number().min(0),
  purchasePrice: number().min(0),
});

export function InvoiceNewPage() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { company } = useSessionStore();

  const { mutate: createInvoice } = useMutation({
    mutationKey: ["invoices"],
    mutationFn: (payload: CreateDocumentPayloadType) => {
      return DocumentInvoiceApiService.create(company?.id!, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      navigate("/invoices");
    },
  });

  const form = useFormik<CreateDocumentPayloadType>({
    initialValues: {},
    validationSchema,
    onSubmit: (values) => createInvoice(values),
  });

  return (
    <Dialog open={true} onOpenChange={() => navigate("/invoices")}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Nouveau</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <InvoiceForm form={form} />
      </DialogContent>
    </Dialog>
  );
}
