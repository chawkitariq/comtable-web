import { FormErrorMessage, InputCalendar } from "@/components";
import { Combobox } from "@/components/customs/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RoleApiService } from "@/services";
import { UpdateInvitationPayloadType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { forwardRef } from "react";

interface InvitationFormProps {
  form: ReturnType<typeof useFormik<UpdateInvitationPayloadType>>;
}

export const InvitationForm = forwardRef<HTMLFormElement, InvitationFormProps>(
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
            <Label htmlFor="expiredAt">Date d'expiration</Label>
            <InputCalendar
              value={form.values.expiredAt}
              onChange={(expiredAt) =>
                form.setFieldValue("expiredAt", expiredAt)
              }
              onBlur={() => form.setFieldTouched("expiredAt", true)}
            />
          </div>

          <div className="grid gap-4">
            <Label>Rôle</Label>
            <Combobox
              placeholder="Sélectionner un rôle..."
              searchPlaceholder="Rechercher un rôle..."
              value={form.values.roleId || ""}
              onSelect={(roleId) => form.setFieldValue("roleId", roleId || null)}
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
