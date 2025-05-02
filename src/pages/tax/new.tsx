import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { TaxTypeEnum, CreateTaxPayloadType } from "@/types";
import { useNavigate } from "react-router";
import { useSessionStore } from "@/stores";
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
import { Button } from "@/components/ui/button";

export function TaxNewPage() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { company } = useSessionStore();

  const { mutate: createTax } = useMutation({
    mutationKey: ["taxs"],
    mutationFn: (payload: CreateTaxPayloadType) =>
      TaxApiService.create(company.id!, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taxs"] });
      navigate("/taxes");
    },
  });

  const form = useFormik<CreateTaxPayloadType>({
    initialValues: {
      name: "",
      rate: 0,
      type: TaxTypeEnum.Normal,
    },
    validationSchema: taxFormValidationSchema,
    onSubmit: (values) => createTax(values),
  });

  return (
    <Dialog open={true} onOpenChange={() => navigate("/taxes")}>
      <DialogContent
        className="h-[90vh] min-w-[30vw] overflow-y-auto grid grid-rows-[auto_1fr]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Nouveau</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        {/* @ts-ignore */}
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
