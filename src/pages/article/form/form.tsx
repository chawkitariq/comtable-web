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
import { forwardRef, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { TaxApiService } from "@/services";
import { useSessionStore } from "@/stores";
import MultipleSelector, {
  Option,
} from "@/components/customs/multiple-selector";

interface ArticleFormProps {
  form: ReturnType<typeof useFormik<UpdateArticlePayloadType>>;
}

export const ArticleForm = forwardRef<HTMLFormElement, ArticleFormProps>(
  ({ form }, ref) => {
    const { company } = useSessionStore();

    const { data: taxes } = useQuery({
      queryKey: ["taxes"],
      queryFn: () => TaxApiService.findAll(company.id!),
    });

    const handleTaxesOptionsChange = useCallback(
      (options: Option[]) =>
        form.setFieldValue(
          "taxIds",
          options.map(({ value }) => value)
        ),
      [form]
    );

    const taxesOptionsValue = useMemo(
      () =>
        taxes
          ?.filter(({ id }) => form.values.taxIds?.includes(id))
          .map(({ id, name }) => ({ label: name, value: id })),
      [taxes, form]
    );

    const defaultTaxesOptions: Option[] = useMemo(
      () =>
        taxes?.map(({ id, name }) => ({
          label: name,
          value: id,
          [id]: id,
        })) ?? [],
      [taxes]
    );

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

          <div className="grid gap-4">
            <Label htmlFor="purchasePrice">Taxes</Label>
            <MultipleSelector
              value={taxesOptionsValue}
              onChange={handleTaxesOptionsChange}
              defaultOptions={defaultTaxesOptions}
              placeholder="Sélectionner les taxes..."
              emptyIndicator={
                <p className="text-center leading-10 text-gray-600 dark:text-gray-400">
                  Aucun résultat trouvé
                </p>
              }
            />
          </div>
        </div>
      </form>
    );
  }
);
