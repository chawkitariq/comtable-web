import { TaxApiService } from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { useFormik } from "formik";
import { CreateTaxPayloadType, UpdateTaxPayloadType } from "@/types";
import { useSessionStore } from "@/stores";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TaxForm, validationSchema } from "./form";

export function TaxCopyPage() {
  const { taxId } = useParams();

  const { data: tax } = useQuery({
    queryKey: ["taxs", taxId],
    queryFn: () => TaxApiService.findOne(taxId!),
    enabled: Boolean(taxId),
  });

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { company } = useSessionStore();

  const { mutate: updateTax } = useMutation({
    mutationKey: ["taxs", taxId],
    mutationFn: (payload: UpdateTaxPayloadType) => {
      return TaxApiService.create(company.id!, payload as CreateTaxPayloadType);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taxs"] });
      navigate("/taxes");
    },
  });

  const form = useFormik<UpdateTaxPayloadType>({
    initialValues: {
      name: tax?.name,
      type: tax?.type,
    },
    validationSchema,
    onSubmit: (values) => updateTax(values),
    enableReinitialize: true,
  });

  return (
    <Dialog open={true} onOpenChange={() => navigate("/taxes")}>
      <DialogContent
        className="h-[90vh] min-w-[35vw] overflow-y-auto grid grid-rows-[auto_1fr]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Copie</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <TaxForm form={form} />
      </DialogContent>
    </Dialog>
  );
}
