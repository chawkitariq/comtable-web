import { ArticleApiService } from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { useFormik } from "formik";
import {
  ArticleTypeEnum,
  CreateArticlePayloadType,
  UpdateArticlePayloadType,
} from "@/types";
import { number, object, string } from "yup";
import { ArticleForm } from "./form";
import { useSessionStore } from "@/stores";

const validationSchema = object().shape({
  name: string().required("Obligatoire"),
  type: string().oneOf(["product", "service"]).required("Obligatoire"),
  salePrice: number().min(0),
  purchasePrice: number().min(0),
});

export function ArticleCopyPage() {
  const { articleId } = useParams();

  const { data: article } = useQuery({
    queryKey: ["articles", articleId],
    queryFn: () => ArticleApiService.findOne(articleId!),
    enabled: Boolean(articleId),
  });

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { company } = useSessionStore();

  const { mutate: updateArticle } = useMutation({
    mutationKey: ["articles", articleId],
    mutationFn: (payload: UpdateArticlePayloadType) => {
      return ArticleApiService.create(
        company.id!,
        payload as CreateArticlePayloadType
      );
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
