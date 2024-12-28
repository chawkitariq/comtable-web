import { ArticleApiService } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { ArticleTypeEnum, CreateArticlePayloadType } from "@/types";
import { number, object, string } from "yup";
import { ArticleForm } from "./form";
import { useNavigate } from "react-router";

const validationSchema = object().shape({
  name: string().required("Obligatoire"),
  type: string().oneOf(["product", "service"]).required("Obligatoire"),
  salePrice: number().min(0),
  purchasePrice: number().min(0),
});

export function ArticlesNewPage() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: createArticle } = useMutation({
    mutationKey: ["articles"],
    mutationFn: ArticleApiService.create,
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

  return <ArticleForm form={form} />;
}
