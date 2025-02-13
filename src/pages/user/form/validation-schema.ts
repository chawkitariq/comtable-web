import { object, string } from "yup";

export const userFormValidationSchema = object().shape({
  email: string().email("Invalide").required("Obligatoire"),
  password: string().required("Obligatoire"),
  roleId: string().required("Obligatoire"),
});
