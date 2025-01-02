import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TaxTypeEnum, UpdateTaxPayloadType } from "@/types";
import { useFormik } from "formik";
import { forwardRef } from "react";
import { useNavigate } from "react-router";

interface TaxFormProps {
  form: ReturnType<typeof useFormik<UpdateTaxPayloadType>>;
}

export const TaxForm = forwardRef<HTMLFormElement, TaxFormProps>(
  ({ form }, ref) => {
    const navigate = useNavigate();

    return (
      <form
        className="grid gap-4 content-between"
        onSubmit={form.handleSubmit}
        ref={ref}
      >
        <div className="grid gap-4">
          <div className="grid gap-4">
            <Label>Type</Label>
            <Select
              value={form.values.type}
              onValueChange={(type) => form.setFieldValue("type", type)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(TaxTypeEnum).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            <Label htmlFor="rate">Taux</Label>
            <Input
              type="number"
              id="rate"
              name="rate"
              value={form.values.rate}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/taxes")}
          >
            Annuler
          </Button>
          <Button type="submit">Confirmer</Button>
        </div>
      </form>
    );
  }
);
