import { CategoryTypeEnum } from "@/types";
import { object, string } from "yup";

export const validationSchema = object().shape({
  name: string().required("Obligatoire"),
  type: string().oneOf(Object.values(CategoryTypeEnum)).required("Obligatoire"),
});
