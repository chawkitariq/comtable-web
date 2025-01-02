import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { useFormik } from "formik";
import { CategoryTypeEnum, UpdateCategoryPayloadType } from "@/types";
import { object, string } from "yup";
import { CategoryForm } from "./form";
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
  type: string().oneOf(Object.values(CategoryTypeEnum)).required("Obligatoire"),
});

export function CategoryEditPage() {
  const { categoryId } = useParams();

  const { data: category } = useQuery({
    queryKey: ["categorys", categoryId],
    queryFn: () => CategoryApiService.findOne(categoryId!),
    enabled: Boolean(categoryId),
  });

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: updateCategory } = useMutation({
    mutationKey: ["categorys", categoryId],
    mutationFn: (payload: UpdateCategoryPayloadType) => {
      return CategoryApiService.update(categoryId!, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorys"] });
      navigate("/categories");
    },
  });

  const form = useFormik<UpdateCategoryPayloadType>({
    initialValues: {
      name: category?.name,
      type: category?.type,
    },
    validationSchema,
    onSubmit: (values) => updateCategory(values),
    enableReinitialize: true,
  });

  return (
    <Dialog open={true} onOpenChange={() => navigate("/categories")}>
      <DialogContent
        className="h-[90vh] min-w-[35vw] overflow-y-auto grid grid-rows-[auto_1fr]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Edition</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <CategoryForm form={form} />
      </DialogContent>
    </Dialog>
  );
}
