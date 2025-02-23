import { object, string } from "yup";

export const companyFormValidationSchema = object().shape({
  name: string().required("Obligatoire"),
});
