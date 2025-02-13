import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { UpdateRolePayloadType } from "@/types";
import { useFormik } from "formik";
import { forwardRef, useCallback } from "react";
import { permissions } from "./constants";

interface RoleFormProps {
  form: ReturnType<typeof useFormik<UpdateRolePayloadType>>;
}

export const RoleForm = forwardRef<HTMLFormElement, RoleFormProps>(
  ({ form }, ref) => {
    const findPermissionIndexByName = useCallback(
      (name: string) =>
        form.values.permissions?.findIndex(
          (permission) => permission.name === name
        ) ?? -1,
      [form]
    );

    const handleTogglePermission = (name: string, toggle: boolean) => {
      const permissionIndex = findPermissionIndexByName(name);
      const permissions = form.values.permissions || [];

      if (toggle && permissionIndex === -1) {
        permissions.push({ name });
      } else if (!toggle && permissionIndex >= 0) {
        permissions.splice(permissionIndex, 1);
      }

      form.setFieldValue("permissions", permissions);
    };

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

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Création</TableHead>
                <TableHead>Lecture</TableHead>
                <TableHead>Edition</TableHead>
                <TableHead>Suppression</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(permissions).map(([name, title]) => (
                <TableRow key={name}>
                  <TableCell>{title}</TableCell>
                  {["create", "read", "update", "delete"].map((action) => (
                    <TableCell key={action}>
                      <Checkbox
                        checked={
                          findPermissionIndexByName(`${action}:${name}`) >= 0
                        }
                        onCheckedChange={(toggle: boolean) =>
                          handleTogglePermission(`${action}:${name}`, toggle)
                        }
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </form>
    );
  }
);
