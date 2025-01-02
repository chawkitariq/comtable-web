import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { useFormik } from "formik";
import { UpdateTaxPayloadType } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TaxApiService } from "@/services";
import { TaxForm, validationSchema } from "./form";

export function TaxEditPage() {
  const { taxId } = useParams();

  const { data: tax } = useQuery({
    queryKey: ["taxs", taxId],
    queryFn: () => TaxApiService.findOne(taxId!),
    enabled: Boolean(taxId),
  });

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: updateTax } = useMutation({
    mutationKey: ["taxs", taxId],
    mutationFn: (payload: UpdateTaxPayloadType) => {
      return TaxApiService.update(taxId!, payload);
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
          <DialogTitle>Edition</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <TaxForm form={form} />
      </DialogContent>
    </Dialog>
  );
}
