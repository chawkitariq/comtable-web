import { TaxTypeEnum } from "@/types";
import { object, string } from "yup";

export const validationSchema = object().shape({
  name: string().required("Obligatoire"),
  type: string().oneOf(Object.values(TaxTypeEnum)).required("Obligatoire"),
});
