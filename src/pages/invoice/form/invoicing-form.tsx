import { InputCalendar } from "@/components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InvoiceFormProps } from "./form";

type InvoiceInvoicingFormProps = InvoiceFormProps;

export const InvoiceInvoicingForm = ({ form }: InvoiceInvoicingFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Facturation</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
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
            <Label htmlFor="issuedAt">Date d'émission</Label>
            <InputCalendar
              value={form.values.issuedAt}
              onChange={(issuedAt) => form.setFieldValue("issuedAt", issuedAt)}
              onBlur={() => form.setFieldTouched("issuedAt", true)}
            />
          </div>

          <div className="grid gap-4">
            <Label htmlFor="dueAt">Date d'échéance</Label>
            <InputCalendar
              value={form.values.dueAt}
              onChange={(dueAt) => form.setFieldValue("dueAt", dueAt)}
              onBlur={() => form.setFieldTouched("dueAt", true)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
