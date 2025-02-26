import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { useFormik } from "formik";
import { UpdateCompanyPayloadType } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CompanyApiService } from "@/services/company-api";
import { CompanyForm, companyFormValidationSchema } from "./form";
import { convertNullToUndefined } from "@/lib";

export function CompanyEditPage() {
  const { companyId } = useParams();

  const { data: company } = useQuery({
    queryKey: ["companies", companyId],
    queryFn: () => CompanyApiService.findOne(companyId!),
    enabled: Boolean(companyId),
  });

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: updateCompany } = useMutation({
    mutationKey: ["companies", companyId],
    mutationFn: (payload: UpdateCompanyPayloadType) =>
      CompanyApiService.update(companyId!, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      navigate("/companies");
    },
  });

  const form = useFormik<UpdateCompanyPayloadType>({
    initialValues: convertNullToUndefined(company),
    validationSchema: companyFormValidationSchema,
    onSubmit: (values) => updateCompany(values),
    enableReinitialize: true,
  });

  return (
    <Dialog open={true} onOpenChange={() => navigate("/companies")}>
      <DialogContent
        className="h-[90vh] min-w-[35vw] overflow-y-auto grid grid-rows-[auto_1fr]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Edition</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <CompanyForm form={form} />
      </DialogContent>
    </Dialog>
  );
}
