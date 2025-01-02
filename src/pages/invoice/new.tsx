import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { CreateDocumentPayloadType } from "@/types";
import { useNavigate } from "react-router";
import { useSessionStore } from "@/stores";
import { DocumentInvoiceApiService } from "@/services";
import { Button } from "@/components/ui/button";
import { InvoiceForm, validationSchema } from "./form";

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
    <main className="min-h-screen grid grid-cols-[25%_1fr] gap-4 p-4">
      <form
        className="grid grid-rows-[1fr_min-content] gap-4"
        onSubmit={form.handleSubmit}
      >
        <div className="grid gap-4 h-fit">
          <InvoiceForm form={form} />
        </div>
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
      <div className="border rounded"></div>
    </main>
  );
}
