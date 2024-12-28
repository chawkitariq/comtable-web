import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthenticationApiService } from "@/services/authentication-api";
import { AuthenticationRegisterPayloadType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router";
import { object, string } from "yup";

const validationSchema = object().shape({
  email: string().email("Invalide").required("Obligatoire"),
  password: string().required("Obligatoire"),
});

export function RegisterPage() {
  const navigate = useNavigate();

  const { mutate: createArticle } = useMutation({
    mutationKey: ["articles"],
    mutationFn: AuthenticationApiService.register,
    onSuccess: () => navigate("/login"),
  });

  const form = useFormik<AuthenticationRegisterPayloadType>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => createArticle(values),
  });

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <form onSubmit={form.handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-xl font-bold">Inscription</h1>
              </div>

              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.values.email}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    value={form.values.password}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    required
                  />
                </div>

                <div className="text-center text-sm">
                  Vous déjà un compte ?{" "}
                  <Link to="/login" className="underline underline-offset-4">
                    Connexion
                  </Link>
                </div>

                <Button type="submit" className="w-full">
                  S'inscrire
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
