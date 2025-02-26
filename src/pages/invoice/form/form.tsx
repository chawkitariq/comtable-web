import { CreateDocumentPayloadType } from "@/types";
import { useFormik } from "formik";
import { InvoiceContactForm } from "./contact-form";
import { InvoiceArticlesForm } from "./articles-form";
import { InvoiceInvoicingForm } from "./invoicing-form";

export interface InvoiceFormProps {
  form: ReturnType<typeof useFormik<CreateDocumentPayloadType>>;
}

export const InvoiceForm = ({ form }: InvoiceFormProps) => {
  return (
    <form onSubmit={form.handleSubmit}>
      <div className="grid gap-4">
        <InvoiceInvoicingForm form={form} />
        <InvoiceContactForm form={form} />
        <InvoiceArticlesForm form={form} />
      </div>
    </form>
  );
};
