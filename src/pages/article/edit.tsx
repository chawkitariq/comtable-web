import { ArticleApiService } from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { useFormik } from "formik";
import { ArticleTypeEnum, UpdateArticlePayloadType } from "@/types";
import { number, object, string } from "yup";
import { ArticleForm } from "./form";

const validationSchema = object().shape({
  name: string().required("Obligatoire"),
  type: string().oneOf(["product", "service"]).required("Obligatoire"),
  salePrice: number().min(0),
  purchasePrice: number().min(0),
});

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
      name: article?.name,
      type: article?.type as ArticleTypeEnum,
      salePrice: article?.salePrice,
      purchasePrice: article?.purchasePrice,
    },
    validationSchema,
    onSubmit: (values) => updateArticle(values),
    enableReinitialize: true,
  });

  return <ArticleForm form={form} />;
}
