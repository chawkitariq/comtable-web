import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { CreateCompanyPayloadType } from "@/types";
import { useNavigate } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CompanyApiService } from "@/services/company-api";
import { CompanyForm, companyFormValidationSchema } from "./form";

export function CompanyNewPage() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: createCompany } = useMutation({
    mutationKey: ["companies"],
    mutationFn: (payload: CreateCompanyPayloadType) =>
      CompanyApiService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      navigate("/companies");
    },
  });

  const form = useFormik<CreateCompanyPayloadType>({
    initialValues: {
      name: "",
    },
    validationSchema: companyFormValidationSchema,
    onSubmit: (values) => createCompany(values),
  });

  return (
    <Dialog open={true} onOpenChange={() => navigate("/companies")}>
      <DialogContent
        className="h-[90vh] min-w-[35vw] overflow-y-auto grid grid-rows-[auto_1fr]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Nouveau</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {/* @ts-ignore */}
        <CompanyForm form={form} />
      </DialogContent>
    </Dialog>
  );
}
