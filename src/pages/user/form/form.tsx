import { FormErrorMessage } from "@/components";
import { Combobox } from "@/components/customs/combobox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateRandomPassword } from "@/lib/utils";
import { RoleApiService } from "@/services";
import { UpdateUserPayloadType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { RefreshCw } from "lucide-react";
import { forwardRef } from "react";

interface UserFormProps {
  form: ReturnType<typeof useFormik<UpdateUserPayloadType>>;
}

export const UserForm = forwardRef<HTMLFormElement, UserFormProps>(
  ({ form }, ref) => {
    const { data: roles } = useQuery({
      queryKey: ["roles"],
      queryFn: RoleApiService.findAll,
    });

    return (
      <form onSubmit={form.handleSubmit} ref={ref}>
        <div className="grid gap-4">
          <div className="grid gap-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={form.values.email}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              required
            />
            {form.touched.email && form.errors.email && (
              <FormErrorMessage>{form.errors.email}</FormErrorMessage>
            )}
          </div>

          <div className="grid gap-4">
            <Label htmlFor="password">Mot de passe</Label>
            <div className="grid gap-4 grid-cols-[2fr_auto]">
              <Input
                type="password"
                id="password"
                name="password"
                value={form.values.password}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                required
              />
              <Button
                size="icon"
                title="générer un mot de passe"
                onClick={() =>
                  form.setFieldValue("password", generateRandomPassword())
                }
              >
                <RefreshCw />
              </Button>
            </div>
            {form.touched.password && form.errors.password && (
              <FormErrorMessage>{form.errors.password}</FormErrorMessage>
            )}
          </div>

          <div className="grid gap-4">
            <Label>Rôle</Label>
            <Combobox
              placeholder="Sélectionner un rôle..."
              searchPlaceholder="Rechercher un rôle..."
              value={form.values.roleId || ""}
              onSelect={(roleId) => form.setFieldValue("roleId", roleId)}
              items={
                roles?.map((role) => ({
                  label: role.name,
                  value: role.id,
                })) || []
              }
            />
            {form.touched.roleId && form.errors.roleId && (
              <FormErrorMessage>{form.errors.roleId}</FormErrorMessage>
            )}
          </div>
        </div>
      </form>
    );
  }
);
