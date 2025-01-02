import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { useFormik } from "formik";
import { UpdateDocumentPayloadType } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DocumentInvoiceApiService } from "@/services";
import { InvoiceForm, validationSchema } from "./form";

export function InvoiceEditPage() {
  const { invoiceId } = useParams();

  const { data: invoice } = useQuery({
    queryKey: ["invoices", invoiceId],
    queryFn: () => DocumentInvoiceApiService.findOne(invoiceId!),
    enabled: Boolean(invoiceId),
  });

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: updateInvoice } = useMutation({
    mutationKey: ["invoices", invoiceId],
    mutationFn: (payload: UpdateDocumentPayloadType) => {
      return DocumentInvoiceApiService.update(invoiceId!, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      navigate("/invoices");
    },
  });

  const form = useFormik<UpdateDocumentPayloadType>({
    initialValues: invoice!,
    validationSchema,
    onSubmit: (values) => updateInvoice(values),
    enableReinitialize: true,
  });

  return (
    <Dialog open={true} onOpenChange={() => navigate("/invoices")}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Edition</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <InvoiceForm form={form} />
      </DialogContent>
    </Dialog>
  );
}
