import { isValidUuidV4 } from "@/lib";
import { ArticleTypeEnum } from "@/types";
import { array, number, object, string } from "yup";

export const validationSchema = object().shape({
  name: string().required("Obligatoire"),
  type: string().oneOf(Object.values(ArticleTypeEnum)).required("Obligatoire"),
  salePrice: number().min(0),
  purchasePrice: number().min(0),
  categoryId: string().nullable(),
  taxIds: array()
    .of(
      string()
        .required("taxIds must not be empty")
        .test("valid", "taxIds must be contains valid UUID 4", isValidUuidV4)
    )
    .nullable(),
});
