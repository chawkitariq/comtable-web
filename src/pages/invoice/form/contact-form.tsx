import { Combobox } from "@/components/customs/combobox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ContactApiService } from "@/services";
import { useSessionStore } from "@/stores";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useCallback, useState } from "react";
import { InvoiceFormProps } from "./form";

type InvoiceContactFormProps = InvoiceFormProps;

export const InvoiceContactForm = ({ form }: InvoiceContactFormProps) => {
  const [isContactFormVisible, setIsContactFormVisible] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState("");

  const { company } = useSessionStore();

  const { data: contacts } = useQuery({
    queryKey: ["contacts", company],
    queryFn: () => ContactApiService.findAll(company.id!),
    enabled: Boolean(company?.id),
  });

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
    <Collapsible
      open={isContactFormVisible}
      onOpenChange={setIsContactFormVisible}
    >
      <Card>
        <CardHeader className="flex flex-row justify-between items-center gap-4">
          <CardTitle>Contact</CardTitle>
          <CollapsibleTrigger asChild>
            <Button size="icon" variant="ghost">
              {!isContactFormVisible ? <ChevronDown /> : <ChevronUp />}
            </Button>
          </CollapsibleTrigger>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-4">
            <Label>Contact</Label>
            <Combobox
              value={selectedContactId}
              onSelect={handleSelectedContact}
              items={contacts?.map((contact) => ({
                label: contact.name,
                value: contact.id,
              }))}
            />
          </div>
          <CollapsibleContent className="grid gap-4">
            <div className="grid gap-4">
              <Label htmlFor="number">Nom</Label>
              <Input
                id="contactName"
                name="contactName"
                value={form.values.contactName}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
            </div>

            <div className="grid gap-4">
              <Label htmlFor="contactEmail">Email</Label>
              <Input
                id="contactEmail"
                name="contactEmail"
                value={form.values.contactEmail}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
            </div>

            <div className="grid gap-4">
              <Label htmlFor="contactPhone">Téléphone</Label>
              <Input
                id="contactPhone"
                name="contactPhone"
                value={form.values.contactPhone}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
            </div>

            <div className="grid gap-4">
              <Label htmlFor="contactAddress">Adresse</Label>
              <Input
                id="contactAddress"
                name="contactAddress"
                value={form.values.contactAddress}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
            </div>

            <div className="grid gap-4">
              <Label htmlFor="contactPostalCode">Code postale</Label>
              <Input
                id="contactPostalCode"
                name="contactPostalCode"
                value={form.values.contactPostalCode}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
            </div>

            <div className="grid gap-4">
              <Label htmlFor="contactCity">Ville</Label>
              <Input
                id="contactCity"
                name="contactCity"
                value={form.values.contactCity}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
            </div>

            <div className="grid gap-4">
              <Label htmlFor="contactState">Région</Label>
              <Input
                id="contactState"
                name="contactState"
                value={form.values.contactState}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
            </div>

            <div className="grid gap-4">
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
  );
};
