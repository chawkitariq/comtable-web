import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UpdateRolePayloadType } from "@/types";
import { useFormik } from "formik";
import { forwardRef } from "react";

interface RoleFormProps {
  form: ReturnType<typeof useFormik<UpdateRolePayloadType>>;
}

export const RoleForm = forwardRef<HTMLFormElement, RoleFormProps>(
  ({ form }, ref) => {
    return (
      <form
        className="grid gap-4 content-between"
        onSubmit={form.handleSubmit}
        ref={ref}
      >
        <div className="grid gap-4">
          <div className="grid gap-4">
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              name="name"
              value={form.values.name}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
          </div>

          <div className="grid gap-4">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={form.values.description}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
          </div>
        </div>
      </form>
    );
  }
);
