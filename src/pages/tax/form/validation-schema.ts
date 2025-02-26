import { TaxTypeEnum } from "@/types";
import { object, string } from "yup";

export const taxFormValidationSchema = object().shape({
  name: string().required("Obligatoire"),
  type: string().oneOf(Object.values(TaxTypeEnum)).required("Obligatoire"),
  rate: string().required("Obligatoire"),
});
