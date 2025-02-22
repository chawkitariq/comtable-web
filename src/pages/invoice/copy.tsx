import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { useFormik } from "formik";
import { CreateDocumentPayloadType } from "@/types";
import { DocumentInvoiceApiService } from "@/services";
import { InvoiceForm, validationSchema } from "./form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { InvoiceDefaultTemplate } from "@/components";
import { convertNullToUndefined } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export function InvoiceCopyPage() {
  const { invoiceId } = useParams();

  const { data: invoice } = useQuery({
    queryKey: ["invoices", invoiceId],
    queryFn: () => DocumentInvoiceApiService.findOne(invoiceId!),
    enabled: Boolean(invoiceId),
  });

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: createInvoice } = useMutation({
    mutationKey: ["invoices", invoiceId],
    mutationFn: (payload: CreateDocumentPayloadType) => {
      return DocumentInvoiceApiService.create(invoiceId!, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      navigate("/invoices");
    },
  });

  const form = useFormik<CreateDocumentPayloadType>({
    initialValues: {
      ...convertNullToUndefined(invoice),
      issuedAt: invoice?.issuedAt ? new Date(invoice?.issuedAt) : undefined,
      dueAt: invoice?.dueAt ? new Date(invoice?.dueAt) : undefined,
    },
    validationSchema,
    onSubmit: (values) => createInvoice(values),
    enableReinitialize: true,
  });

  return (
    <main className="grid grid-cols-[35%_1fr] gap-8 p-4">
      <div className="grid gap-4">
        <InvoiceForm form={form} />

        <div className="flex justify-end gap-4 place-self-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/invoices")}
          >
            Annuler
          </Button>
          <Button onClick={() => form.submitForm()}>Confirmer</Button>
        </div>
      </div>

      <AspectRatio className="p-4 bg-gray-100">
        <InvoiceDefaultTemplate invoice={form.values as DocumentType} />
      </AspectRatio>
    </main>
  );
}
