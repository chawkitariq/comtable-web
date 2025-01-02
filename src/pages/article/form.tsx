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
import { ArticleTypeEnum, UpdateArticlePayloadType } from "@/types";
import { useFormik } from "formik";
import { forwardRef } from "react";
import { useNavigate } from "react-router";

interface ArticleFormProps {
  form: ReturnType<typeof useFormik<UpdateArticlePayloadType>>;
}

export const ArticleForm = forwardRef<HTMLFormElement, ArticleFormProps>(
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
                  {Object.values(ArticleTypeEnum).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/articles")}
          >
            Annuler
          </Button>
          <Button type="submit">Confirmer</Button>
        </div>
      </form>
    );
  }
);
