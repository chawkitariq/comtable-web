import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { useFormik } from "formik";
import { CreateDocumentPayloadType } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DocumentInvoiceApiService } from "@/services";
import { InvoiceForm, validationSchema } from "./form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { InvoiceDefaultTemplate } from "@/components";
import { convertNullToUndefined } from "@/lib/utils";

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
      ...convertNullToUndefined({
        ...invoice,
        documentArticles: invoice?.documentArticles?.map((documentArticle) =>
          convertNullToUndefined({
            ...documentArticle,
            documentArticleTaxes: invoice?.documentArticleTaxes?.map(
              convertNullToUndefined
            ),
          })
        ),
      }),
      issuedAt: invoice?.issuedAt ? new Date(invoice?.issuedAt) : undefined,
      dueAt: invoice?.dueAt ? new Date(invoice?.dueAt) : undefined,
    },
    validationSchema,
    onSubmit: (values) => createInvoice(values),
    enableReinitialize: true,
  });

  return (
    <Dialog open={true} onOpenChange={() => navigate("/invoices")}>
      <DialogContent
        className="min-w-[90vw] max-h-[95vh]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Edition</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {JSON.stringify(form.errors)}
        <main className="grid grid-cols-[auto_60%] gap-4 p-4">
          <ScrollArea className="h-[90vh] pr-4">
            <form
              onSubmit={form.handleSubmit}
              className="grid grid-rows-3 gap-4"
            >
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
      </DialogContent>
    </Dialog>
  );
}
