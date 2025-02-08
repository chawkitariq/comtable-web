import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { useFormik } from "formik";
import { UpdateDocumentPayloadType } from "@/types";
import { DocumentInvoiceApiService } from "@/services";
import { InvoiceForm, validationSchema } from "./form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { InvoiceDefaultTemplate } from "@/components";
import { convertNullToUndefined } from "@/lib/utils";

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
    initialValues: {
      ...convertNullToUndefined(invoice),
      issuedAt: invoice?.issuedAt ? new Date(invoice?.issuedAt) : undefined,
      dueAt: invoice?.dueAt ? new Date(invoice?.dueAt) : undefined,
    },
    validationSchema,
    onSubmit: (values) => updateInvoice(values),
    enableReinitialize: true,
  });

  return (
    <main className="grid grid-cols-[auto_60%] gap-4">
      <ScrollArea className="max-h-[90vh]">
        <form onSubmit={form.handleSubmit} className="grid gap-4">
          <InvoiceForm form={form} />
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/invoices")}
            >
              Annuler
            </Button>
            <Button type="submit">Confirmer</Button>
          </div>
        </form>
      </ScrollArea>
      <div>
        <div className="flex justify-center items-center mx-auto">
          <InvoiceDefaultTemplate
            invoice={form.values as unknown as DocumentType}
          />
        </div>
      </div>
    </main>
  );
}
