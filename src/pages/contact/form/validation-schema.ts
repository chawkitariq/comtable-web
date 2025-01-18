import { ContactTypeEnum } from "@/types";
import { object, string } from "yup";

export const contactFormValidationSchema = object().shape({
  name: string().required("Obligatoire"),
  type: string().oneOf(Object.values(ContactTypeEnum)).required("Obligatoire"),
});
