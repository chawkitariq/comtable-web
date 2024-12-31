import { Combobox } from "@/components/customs/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ContactApiService } from "@/services/contact-api";
import { useSessionStore } from "@/stores";
import { CreateDocumentPayloadType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useMemo } from "react";

interface InvoiceFormProps {
  form: ReturnType<typeof useFormik<CreateDocumentPayloadType>>;
}

export const InvoiceForm = ({ form }: InvoiceFormProps) => {
  const { company } = useSessionStore();

  const { data: contacts } = useQuery({
    queryKey: ["contacts"],
    queryFn: () => ContactApiService.findAll(company?.id!),
    enabled: Boolean(company?.id),
  });

  const items = useMemo(() => contacts ?? [], [contacts]);

  return (
    <>
      <div className="grid gap-4">
        <Label htmlFor="number">Contact</Label>
        <Combobox
          value="sdf"
          onSelect={console.log}
          items={items.map((contact) => ({
            label: contact.name,
            value: contact.id,
          }))}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-4">
          <Label htmlFor="number">Numéro de facturation</Label>
          <Input
            id="number"
            name="number"
            value={form.values.number}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
        </div>

        <div className="grid gap-4">
          <Label htmlFor="orderNumber">Numéro de commande</Label>
          <Input
            id="orderNumber"
            name="orderNumber"
            value={form.values.orderNumber}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-4">
          <Label htmlFor="issuedAt">Prix de vente</Label>
          <Input
            id="issuedAt"
            name="issuedAt"
            type="datetime-local"
            value={form.values.issuedAt?.toISOString()}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
        </div>

        <div className="grid gap-4">
          <Label htmlFor="dueAt">Prix d'achat</Label>
          <Input
            id="dueAt"
            name="dueAt"
            type="datetime-local"
            value={form.values.dueAt?.toISOString()}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
        </div>
      </div>
    </>
  );
};
