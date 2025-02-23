import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { CreateDocumentPayloadType, DocumentType } from "@/types";
import { useNavigate } from "react-router";
import { useSessionStore } from "@/stores";
import { DocumentInvoiceApiService } from "@/services";
import { Button } from "@/components/ui/button";
import { InvoiceForm } from "./form";
import { InvoiceDefaultTemplate } from "@/components/invoice-template";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";
import { generateDocumentNumber } from "@/lib";

export function InvoiceNewPage() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { company } = useSessionStore();

  const { mutate: createInvoice } = useMutation({
    mutationKey: ["invoices"],
    mutationFn: (payload: CreateDocumentPayloadType) => {
      return DocumentInvoiceApiService.create(company.id!, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      navigate("/invoices");
    },
  });

  const form = useFormik<CreateDocumentPayloadType>({
    initialValues: {
      number: generateDocumentNumber(),
      issuedAt: new Date(),
      documentArticles: [],
    },
    onSubmit: (values) => createInvoice(values),
  });

  return (
    <main className="grid grid-cols-[40%_1fr] gap-8 p-4">
      <div className="grid gap-4">
        <ScrollArea className="h-[1080px]">
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

      <AspectRatio className="p-4 bg-gray-100">
        <InvoiceDefaultTemplate invoice={form.values as DocumentType} />
      </AspectRatio>
    </main>
  );
}
