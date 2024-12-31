import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ArticleTypeEnum, UpdateArticlePayloadType } from "@/types";
import { useFormik } from "formik";
import { forwardRef } from "react";
import { useNavigate } from "react-router";

interface InvoiceFormProps {
  form: ReturnType<typeof useFormik<UpdateArticlePayloadType>>;
}

export const InvoiceForm = forwardRef<HTMLFormElement, InvoiceFormProps>(
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
            <ToggleGroupItem value={ArticleTypeEnum.Product}>
              Produit
            </ToggleGroupItem>
            <ToggleGroupItem value={ArticleTypeEnum.Service}>
              Service
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="grid gap-4">
          <Label htmlFor="name">Nom</Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={form.values.name}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
        </div>

        <div className="grid gap-4">
          <Label htmlFor="salePrice">Prix de vente</Label>
          <Input
            id="salePrice"
            name="salePrice"
            type="number"
            value={form.values.salePrice}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
        </div>

        <div className="grid gap-4">
          <Label htmlFor="purchasePrice">Prix d'achat</Label>
          <Input
            id="purchasePrice"
            name="purchasePrice"
            type="number"
            value={form.values.purchasePrice}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
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
    );
  }
);
