import { ArticleApiService } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { ArticleTypeEnum, CreateArticlePayloadType } from "@/types";
import { ArticleForm, validationSchema } from "./form";
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
import { Button } from "@/components/ui/button";

export function ArticleNewPage() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { company } = useSessionStore();

  const { mutate: createArticle } = useMutation({
    mutationKey: ["articles"],
    mutationFn: (payload: CreateArticlePayloadType) => {
      return ArticleApiService.create(company?.id!, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      navigate("/articles");
    },
  });

  const form = useFormik<CreateArticlePayloadType>({
    initialValues: {
      name: "",
      type: ArticleTypeEnum.Product,
      salePrice: 0,
      purchasePrice: 0,
    },
    validationSchema,
    onSubmit: (values) => createArticle(values),
  });

  return (
    <Dialog open={true} onOpenChange={() => navigate("/articles")}>
      <DialogContent
        className="h-[90vh] min-w-[35vw] overflow-y-auto grid grid-rows-[auto_1fr]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Nouveau</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <ArticleForm form={form} />

        <DialogFooter className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/articles")}
          >
            Annuler
          </Button>
          <Button onClick={() => form.submitForm()}>Confirmer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
