import { date, object, string } from "yup";

export const invitationFormValidationSchema = object().shape({
  email: string().email("Invalide").required("Obligatoire"),
  roleId: string().nullable().optional(),
  expiredAt: date().optional(),
});
