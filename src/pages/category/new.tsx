import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { CategoryTypeEnum, CreateCategoryPayloadType } from "@/types";
import { number, object, string } from "yup";
import { CategoryForm } from "./form";
import { useNavigate } from "react-router";
import { useSessionStore } from "@/stores";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CategoryApiService } from "@/services";

const validationSchema = object().shape({
  name: string().required("Obligatoire"),
  type: string().oneOf(["product", "service"]).required("Obligatoire"),
  salePrice: number().min(0),
  purchasePrice: number().min(0),
});

export function CategoryNewPage() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { company } = useSessionStore();

  const { mutate: createCategory } = useMutation({
    mutationKey: ["categorys"],
    mutationFn: (payload: CreateCategoryPayloadType) => {
      return CategoryApiService.create(company?.id!, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorys"] });
      navigate("/categorys");
    },
  });

  const form = useFormik<CreateCategoryPayloadType>({
    initialValues: {
      name: "",
      type: CategoryTypeEnum.Income,
    },
    validationSchema,
    onSubmit: (values) => createCategory(values),
  });

  return (
    <Dialog open={true} onOpenChange={() => navigate("/categorys")}>
      <DialogContent
        className="h-[90vh] min-w-[35vw] overflow-y-auto"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Nouveau</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <CategoryForm form={form} />
      </DialogContent>
    </Dialog>
  );
}
