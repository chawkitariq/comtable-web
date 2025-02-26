import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { useFormik } from "formik";
import { UpdateTaxPayloadType } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TaxApiService } from "@/services";
import { TaxForm, taxFormValidationSchema } from "./form";
import { convertNullToUndefined } from "@/lib";
import { Button } from "@/components/ui/button";

export function TaxEditPage() {
  const { taxId } = useParams();

  const { data: tax } = useQuery({
    queryKey: ["taxes", taxId],
    queryFn: () => TaxApiService.findOne(taxId!),
    enabled: Boolean(taxId),
  });

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: updateTax } = useMutation({
    mutationKey: ["taxes", taxId],
    mutationFn: (payload: UpdateTaxPayloadType) =>
      TaxApiService.update(taxId!, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taxes"] });
      navigate("/taxes");
    },
  });

  const form = useFormik<UpdateTaxPayloadType>({
    initialValues: convertNullToUndefined(tax),
    validationSchema: taxFormValidationSchema,
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

        <DialogFooter>
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/taxes")}
            >
              Annuler
            </Button>
            <Button type="submit" onClick={() => form.submitForm()}>
              Confirmer
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
