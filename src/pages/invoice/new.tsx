import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { CreateDocumentPayloadType, DocumentType } from "@/types";
import { useNavigate } from "react-router";
import { useSessionStore } from "@/stores";
import { DocumentInvoiceApiService } from "@/services";
import { Button } from "@/components/ui/button";
import { InvoiceForm, validationSchema } from "./form";
import { InvoiceDefaultTemplate } from "@/components/invoice-template";
import { AspectRatio } from "@/components/ui/aspect-ratio";
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
      articles: [],
    },
    validationSchema,
    onSubmit: (values) => createInvoice(values),
  });

  return (
    <main className="grid grid-cols-[auto_65%] gap-4 p-4">
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
        <AspectRatio
          ratio={19 / 16}
          className="w-[70%] flex justify-center items-center mx-auto"
        >
          <InvoiceDefaultTemplate invoice={form.values as DocumentType} />
        </AspectRatio>
      </div>
    </main>
  );
}
