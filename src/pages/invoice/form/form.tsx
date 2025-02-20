import { InputCalendar } from "@/components";
import { Combobox } from "@/components/customs/combobox";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ContactApiService } from "@/services/contact-api";
import { useSessionStore } from "@/stores";
import {
  ArticleTypeEnum,
  CreateDocumentPayloadType,
  TaxTypeEnum,
} from "@/types";
import { useQuery } from "@tanstack/react-query";
import { FieldArray, FormikProvider, useFormik } from "formik";
import {
  ChevronDown,
  ChevronUp,
  GripVertical,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";

interface InvoiceFormProps {
  form: ReturnType<typeof useFormik<CreateDocumentPayloadType>>;
}

export const InvoiceForm = ({ form }: InvoiceFormProps) => {
  const [isContactFormVisible, setIsContactFormVisible] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState("");
  const [documentArticleIndex, setDocumentArticleIndex] = useState<number>();

  const { company } = useSessionStore();

  const { data: contacts } = useQuery({
    queryKey: ["contacts"],
    queryFn: () => ContactApiService.findAll(company?.id!),
    enabled: Boolean(company?.id),
  });

  const items = useMemo(() => contacts ?? [], [contacts]);

  const handleSelectedContact = useCallback(
    (contactId: string) => {
      setSelectedContactId(contactId);
      const contact = contacts?.find(({ id }) => id === contactId);
      form.setFieldValue("contactName", contact?.name);
      form.setFieldValue("contactEmail", contact?.email);
      form.setFieldValue("contactPhone", contact?.phone);
      form.setFieldValue("contactAddress", contact?.address);
      form.setFieldValue("contactCity", contact?.city);
      form.setFieldValue("contactPostalCode", contact?.postalCode);
      form.setFieldValue("contactState", contact?.state);
      form.setFieldValue("contactCountry", contact?.country);
    },
    [contacts, form]
  );

  return (
    <form onSubmit={form.handleSubmit}>
      <div className="grid gap-4">
        <Collapsible
          open={isContactFormVisible}
          onOpenChange={setIsContactFormVisible}
        >
          <Card>
            <CardHeader className="flex flex-row justify-between items-center gap-2">
              <CardTitle>Contact</CardTitle>
              <CollapsibleTrigger asChild>
                <Button size="icon" variant="ghost">
                  {!isContactFormVisible ? <ChevronDown /> : <ChevronUp />}
                </Button>
              </CollapsibleTrigger>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label>Contact</Label>
                <Combobox
                  value={selectedContactId}
                  onSelect={handleSelectedContact}
                  items={items.map((contact) => ({
                    label: contact.name,
                    value: contact.id,
                  }))}
                />
              </div>
              <CollapsibleContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="number">Nom</Label>
                  <Input
                    id="contactName"
                    name="contactName"
                    value={form.values.contactName}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="contactEmail">Email</Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    value={form.values.contactEmail}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="contactPhone">Téléphone</Label>
                  <Input
                    id="contactPhone"
                    name="contactPhone"
                    value={form.values.contactPhone}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="contactAddress">Adresse</Label>
                  <Input
                    id="contactAddress"
                    name="contactAddress"
                    value={form.values.contactAddress}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="contactPostalCode">Code postale</Label>
                  <Input
                    id="contactPostalCode"
                    name="contactPostalCode"
                    value={form.values.contactPostalCode}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="contactCity">Ville</Label>
                  <Input
                    id="contactCity"
                    name="contactCity"
                    value={form.values.contactCity}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="contactState">Région</Label>
                  <Input
                    id="contactState"
                    name="contactState"
                    value={form.values.contactState}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="contactCountry">Pays</Label>
                  <Input
                    id="contactCountry"
                    name="contactCountry"
                    value={form.values.contactCountry}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                  />
                </div>
              </CollapsibleContent>
            </CardContent>
          </Card>
        </Collapsible>

        <Card>
          <CardHeader>
            <CardTitle>Facturation</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="issuedAt">Date d'émission</Label>
                <InputCalendar
                  value={form.values.issuedAt}
                  onChange={(issuedAt) =>
                    form.setFieldValue("issuedAt", issuedAt)
                  }
                  onBlur={() => form.setFieldTouched("issuedAt", true)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="dueAt">Date d'échéance</Label>
                <InputCalendar
                  value={form.values.dueAt}
                  onChange={(dueAt) => form.setFieldValue("dueAt", dueAt)}
                  onBlur={() => form.setFieldTouched("dueAt", true)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="number">Numéro de facturation</Label>
                <Input
                  id="number"
                  name="number"
                  value={form.values.number}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
              </div>

              <div className="grid gap-2">
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Articles</CardTitle>
          </CardHeader>
          <FormikProvider value={form}>
            <FieldArray name="documentArticles">
              {({ push, remove }) => (
                <>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-white grid grid-cols-[auto_3fr_1fr]">
                          <TableHead></TableHead>
                          <TableHead>Nom</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {form.values.documentArticles?.map((_, i) => (
                          <TableRow
                            key={i}
                            className="hover:bg-white grid grid-cols-[auto_3fr_1fr] items-center"
                          >
                            <TableCell className="cursor-grab">
                              <GripVertical />
                            </TableCell>
                            <TableCell>
                              <Input
                                id={`documentArticles.${documentArticleIndex}.documentArticleTaxes.${i}.name`}
                                name={`documentArticles.${documentArticleIndex}.documentArticleTaxes.${i}.name`}
                                value={form.values.documentArticles?.[i].name}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                              />
                            </TableCell>

                            <TableCell>
                              <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                onClick={() => setDocumentArticleIndex(i)}
                              >
                                <Pencil />
                              </Button>
                              <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                onClick={() => remove(i)}
                              >
                                <Trash2 />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="grid place-items-end">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        push({
                          name: "#",
                          description: "#",
                          price: 0,
                          quantity: 0,
                          total: 0,
                          type: ArticleTypeEnum.Product,
                        });
                        setDocumentArticleIndex(
                          form.values.documentArticles?.length
                        );
                      }}
                    >
                      <Plus /> Ajouter un article
                    </Button>
                  </CardFooter>
                </>
              )}
            </FieldArray>
          </FormikProvider>
        </Card>
      </div>
      {documentArticleIndex !== undefined && (
        <Dialog
          open={true}
          onOpenChange={() => setDocumentArticleIndex(undefined)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {form.values.documentArticles?.[documentArticleIndex!].name}
              </DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>

            <div className="grid gap-4">
              <Label htmlFor="name">Nom</Label>
              <Input
                id={`documentArticles.${documentArticleIndex}.name`}
                name={`documentArticles.${documentArticleIndex}.name`}
                value={
                  form.values.documentArticles?.[documentArticleIndex!].name
                }
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
            </div>

            <div className="grid gap-4">
              <Label htmlFor="price">Prix</Label>
              <Input
                type="number"
                id={`documentArticles.${documentArticleIndex}.price`}
                name={`documentArticles.${documentArticleIndex}.price`}
                value={
                  form.values.documentArticles?.[documentArticleIndex!].price
                }
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
            </div>

            <div className="grid gap-4">
              <Label htmlFor="quantity">Quantité</Label>
              <Input
                type="number"
                id={`documentArticles.${documentArticleIndex}.quantity`}
                name={`documentArticles.${documentArticleIndex}.quantity`}
                value={
                  form.values.documentArticles?.[documentArticleIndex!].quantity
                }
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
            </div>

            <div className="grid gap-4">
              <Label htmlFor="total">Total</Label>
              <Input
                type="number"
                id={`documentArticles.${documentArticleIndex}.total`}
                name={`documentArticles.${documentArticleIndex}.total`}
                value={
                  form.values.documentArticles?.[documentArticleIndex!].total
                }
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                disabled
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Taxes</CardTitle>
              </CardHeader>
              <FormikProvider value={form}>
                <FieldArray
                  name={`documentArticles.${documentArticleIndex}.documentArticleTaxes`}
                >
                  {({ push, remove }) => (
                    <>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow className="hover:bg-white grid grid-cols-[auto_3fr_1fr]">
                              <TableHead></TableHead>
                              <TableHead>Nom</TableHead>
                              <TableHead></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {form.values.documentArticles?.[
                              documentArticleIndex
                            ].documentArticleTaxes?.map(
                              (_, documentArticleTaxeIndex) => (
                                <TableRow
                                  key={documentArticleTaxeIndex}
                                  className="hover:bg-white grid grid-cols-[auto_3fr_1fr] items-center"
                                >
                                  <TableCell className="cursor-grab">
                                    <GripVertical />
                                  </TableCell>
                                  <TableCell className="grid gap-4">
                                    <Label htmlFor="name">Nom</Label>
                                    <Input
                                      id={`documentArticles.${documentArticleIndex}.documentArticleTaxes.${documentArticleTaxeIndex}.name`}
                                      name={`documentArticles.${documentArticleIndex}.documentArticleTaxes.${documentArticleTaxeIndex}.name`}
                                      value={
                                        form.values.documentArticles?.[
                                          documentArticleIndex
                                        ]?.documentArticleTaxes?.[
                                          documentArticleTaxeIndex
                                        ].name
                                      }
                                      onChange={form.handleChange}
                                      onBlur={form.handleBlur}
                                    />
                                  </TableCell>

                                  <TableCell>
                                    <Button
                                      type="button"
                                      size="icon"
                                      variant="ghost"
                                      onClick={() => {}}
                                    >
                                      <Pencil />
                                    </Button>
                                    <Button
                                      type="button"
                                      size="icon"
                                      variant="ghost"
                                      onClick={() =>
                                        remove(documentArticleTaxeIndex)
                                      }
                                    >
                                      <Trash2 />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              )
                            )}
                          </TableBody>
                        </Table>
                      </CardContent>
                      <CardFooter className="grid place-items-end">
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => {
                            push({
                              name: "#",
                              type: TaxTypeEnum.Normal,
                            });
                          }}
                        >
                          <Plus /> Ajouter une taxe
                        </Button>
                      </CardFooter>
                    </>
                  )}
                </FieldArray>
              </FormikProvider>
            </Card>
          </DialogContent>
        </Dialog>
      )}
    </form>
  );
};
