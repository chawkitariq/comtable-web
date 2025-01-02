import { useFormik } from "formik";
import { forwardRef } from "react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UpdateCompanyPayloadType } from "@/types";

interface CompanyFormProps {
  form: ReturnType<typeof useFormik<UpdateCompanyPayloadType>>;
}

export const CompanyForm = forwardRef<HTMLFormElement, CompanyFormProps>(
  ({ form }, ref) => {
    const navigate = useNavigate();

    return (
      <form
        className="grid gap-4 content-between"
        onSubmit={form.handleSubmit}
        ref={ref}
      >
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              name="name"
              value={form.values.name}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={form.values.email}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name">Numéro fiscale</Label>
            <Input
              id="taxNumber"
              name="taxNumber"
              value={form.values.taxNumber}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
          </div>

          <div className="grid gap-2">
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

          <div className="grid gap-2">
            <Label htmlFor="address">Adresse</Label>
            <Input
              id="address"
              name="address"
              value={form.values.address}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="city">Ville</Label>
            <Input
              id="city"
              name="city"
              value={form.values.city}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="postalCode">Code postale</Label>
            <Input
              id="postalCode"
              name="postalCode"
              value={form.values.postalCode}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="state">Région</Label>
            <Input
              id="state"
              name="state"
              value={form.values.state}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="country">Pays</Label>
            <Input
              id="country"
              name="country"
              value={form.values.country}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/companies")}
          >
            Annuler
          </Button>
          <Button type="submit">Confirmer</Button>
        </div>
      </form>
    );
  }
);
