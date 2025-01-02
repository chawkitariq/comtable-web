import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { TaxTypeEnum, CreateTaxPayloadType } from "@/types";
import { useNavigate } from "react-router";
import { useSessionStore } from "@/stores";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TaxApiService } from "@/services";
import { TaxForm, validationSchema } from "./form";

export function TaxNewPage() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { company } = useSessionStore();

  const { mutate: createTax } = useMutation({
    mutationKey: ["taxs"],
    mutationFn: (payload: CreateTaxPayloadType) => {
      return TaxApiService.create(company?.id!, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taxs"] });
      navigate("/taxes");
    },
  });

  const form = useFormik<CreateTaxPayloadType>({
    initialValues: {
      name: "",
      type: TaxTypeEnum.Normal,
    },
    validationSchema,
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
        <TaxForm form={form} />
      </DialogContent>
    </Dialog>
  );
}
