import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { CreateDocumentPayloadType, DocumentType } from "@/types";
import { useNavigate } from "react-router";
import { useSessionStore } from "@/stores";
import { DocumentInvoiceApiService } from "@/services";
import { Button } from "@/components/ui/button";
import { InvoiceForm } from "./form";
import { InvoiceDefaultTemplate } from "@/components/invoice-template";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    initialValues: {
      documentArticles: [],
    },
    onSubmit: (values) => createInvoice(values),
  });

  return (
    <main className="grid grid-cols-[auto_65%] gap-4 p-4">
      <div className="grid gap-4">
        <ScrollArea className="h-[81vh] pr-4">
          <InvoiceForm form={form} />
        </ScrollArea>
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
      <div className="h-full w-full p-9 bg-gray-100">
        <InvoiceDefaultTemplate invoice={form.values as DocumentType} />
      </div>
    </main>
  );
}
