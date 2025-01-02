import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ContactTypeEnum, UpdateContactPayloadType } from "@/types";
import { useFormik } from "formik";
import { forwardRef } from "react";
import { useNavigate } from "react-router";

interface ContactFormProps {
  form: ReturnType<typeof useFormik<UpdateContactPayloadType>>;
}

export const ContactForm = forwardRef<HTMLFormElement, ContactFormProps>(
  ({ form }, ref) => {
    const navigate = useNavigate();

    return (
      <form className="grid gap-4" onSubmit={form.handleSubmit} ref={ref}>
        <div className="grid gap-4">
          <Label>Type</Label>
          <ToggleGroup
            type="single"
            value={form.values.type}
            onValueChange={(type) => form.setFieldValue("type", type)}
          >
            <ToggleGroupItem value={ContactTypeEnum.Customer}>
              Client
            </ToggleGroupItem>
            <ToggleGroupItem value={ContactTypeEnum.Supplier}>
              Fournisseur
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="grid gap-4">
          <Label htmlFor="name">Nom</Label>
          <Input
            id="name"
            name="name"
            value={form.values.name}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
        </div>

        <div className="grid gap-4">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={form.values.email}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
        </div>

        <div className="grid gap-4">
          <Label htmlFor="taxNumber">Numéro fiscale</Label>
          <Input
            id="taxNumber"
            name="taxNumber"
            value={form.values.taxNumber}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
        </div>

        <div className="grid gap-4">
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={form.values.phone}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
        </div>

        <div className="grid gap-4">
          <Label htmlFor="address">Adresse</Label>
          <Input
            id="address"
            name="address"
            value={form.values.address}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
        </div>

        <div className="grid gap-4">
          <Label htmlFor="city">Ville</Label>
          <Input
            id="city"
            name="city"
            value={form.values.city}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
        </div>

        <div className="grid gap-4">
          <Label htmlFor="postalCode">Code postale</Label>
          <Input
            id="postalCode"
            name="postalCode"
            value={form.values.postalCode}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
        </div>

        <div className="grid gap-4">
          <Label htmlFor="state">Région</Label>
          <Input
            id="state"
            name="state"
            value={form.values.state}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
        </div>

        <div className="grid gap-4">
          <Label htmlFor="country">Pays</Label>
          <Input
            id="country"
            name="country"
            value={form.values.country}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/contacts")}
          >
            Annuler
          </Button>
          <Button type="submit">Confirmer</Button>
        </div>
      </form>
    );
  }
);
