import { Combobox } from "@/components/customs/combobox";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ContactApiService } from "@/services/contact-api";
import { useSessionStore } from "@/stores";
import { CreateDocumentPayloadType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { Plus, Trash2 } from "lucide-react";
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

      <div className="grid gap-4">
        <Label htmlFor="issuedAt">Articles</Label>
        <FormikProvider value={form}>
          <FieldArray name="articles">
            {({ push, remove }) => (
              <ul className="grid gap-4">
                {form.values.articles?.map((article, i) => (
                  <li key={i}>
                    <Card className="shadow-none">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>{article.name}</CardTitle>
                            <CardDescription></CardDescription>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => remove(i)}
                          >
                            <Trash2 />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="grid gap-4">
                        <div className="grid gap-4">
                          <Label htmlFor={`articles.${i}.name`}>Nom</Label>
                          <Input
                            id={`articles.${i}.name`}
                            name={`articles.${i}.name`}
                            value={form.values.articles?.[i].name}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                          />
                        </div>
                        <div className="grid gap-4">
                          <Label htmlFor={`articles.${i}.price`}>Prix</Label>
                          <Input
                            id={`articles.${i}.price`}
                            name={`articles.${i}.price`}
                            value={form.values.articles?.[i].price}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                          />
                        </div>
                        <div className="grid gap-4">
                          <Label htmlFor={`articles.${i}.quantity`}>
                            Quantité
                          </Label>
                          <Input
                            id={`articles.${i}.quantity`}
                            name={`articles.${i}.quantity`}
                            value={form.values.articles?.[i].quantity}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </li>
                ))}
                <li>
                  <Button
                    className="w-full"
                    variant="secondary"
                    onClick={() =>
                      push({
                        name: `Article #${form.values.articles?.length + 1}`,
                        price: 0,
                        quantity: 0,
                      })
                    }
                  >
                    <Plus /> Ajouter un article
                  </Button>
                </li>
              </ul>
            )}
          </FieldArray>
        </FormikProvider>
      </div>
    </>
  );
};
