import { ArticleApiService } from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { useFormik } from "formik";
import { ArticleTypeEnum, UpdateArticlePayloadType } from "@/types";
import { ArticleForm, validationSchema } from "./form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { convertNullToUndefined } from "@/lib";
import { Button } from "@/components/ui/button";

export function ArticleEditPage() {
  const { articleId } = useParams();

  const { data: article } = useQuery({
    queryKey: ["articles", articleId],
    queryFn: () => ArticleApiService.findOne(articleId!),
    enabled: Boolean(articleId),
  });

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: updateArticle } = useMutation({
    mutationKey: ["articles", articleId],
    mutationFn: (payload: UpdateArticlePayloadType) => {
      return ArticleApiService.update(articleId!, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      navigate("/articles");
    },
  });

  const form = useFormik<UpdateArticlePayloadType>({
    initialValues: {
      ...convertNullToUndefined(article),
      type: article?.type as ArticleTypeEnum,
      categoryId: article?.category?.id,
      taxIds: article?.taxes?.map(({ id }) => id),
    },
    validationSchema,
    onSubmit: (values) => updateArticle(values),
    enableReinitialize: true,
  });

  return (
    <Dialog open={true} onOpenChange={() => navigate("/articles")}>
      <DialogContent
        className="h-[90vh] min-w-[35vw] overflow-y-auto grid grid-rows-[auto_1fr]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Edition</DialogTitle>
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
