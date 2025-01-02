import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { CategoryTypeEnum, CreateCategoryPayloadType } from "@/types";
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
import { CategoryForm, validationSchema } from "./form";

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
      navigate("/categories");
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
    <Dialog open={true} onOpenChange={() => navigate("/categories")}>
      <DialogContent
        className="h-[90vh] min-w-[30vw] overflow-y-auto grid grid-rows-[auto_1fr]"
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
