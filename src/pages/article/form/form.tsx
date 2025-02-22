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
import { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import { Tag, TagInput } from "emblor";
import { useQuery } from "@tanstack/react-query";
import { TaxApiService } from "@/services";
import { useSessionStore } from "@/stores";

interface ArticleFormProps {
  form: ReturnType<typeof useFormik<UpdateArticlePayloadType>>;
}

export const ArticleForm = forwardRef<HTMLFormElement, ArticleFormProps>(
  ({ form }, ref) => {
    const [activeTaxesTagIndex, setActiveTaxesTagIndex] = useState<
      number | null
    >(null);

    const [taxesTags, setTaxesTags] = useState<Tag[]>([]);

    const { company } = useSessionStore();

    const { data: taxes } = useQuery({
      queryKey: ["taxes"],
      queryFn: () => TaxApiService.findAll(company.id!),
    });

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
            <TagInput
              tags={taxes?.map()}
              setTags={setTaxesTags}
              placeholder="Sélectionner des taxes"
              activeTagIndex={activeTaxesTagIndex}
              setActiveTagIndex={setActiveTaxesTagIndex}
              enableAutocomplete={true}
              restrictTagsToAutocompleteOptions={true}
            />
          </div>
        </div>
      </form>
    );
  }
);
