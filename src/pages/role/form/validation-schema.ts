import { object, string } from "yup";

export const roleFormValidationSchema = object().shape({
  name: string().required("Obligatoire"),
  description: string().optional(),
});
