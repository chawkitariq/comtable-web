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
    const getPermissionIndex = useCallback(
      (subject: string) => {
        return form.values.permissions?.findIndex(
          (permission) => permission.subject === subject
        );
      },
      [form.values.permissions]
    );

    const handleCheckboxChange = useCallback(
      (subject: string, action: string, canAction: boolean) => {
        const permissionIndex = getPermissionIndex(subject) ?? 0;
        const index =
          permissionIndex > 0
            ? permissionIndex
            : form.values.permissions?.length;

        form.setFieldValue(`permissions.${index}.subject`, subject);
        form.setFieldValue(`permissions.${index}.${action}`, canAction);
      },
      [form, getPermissionIndex]
    );

    const findPermissionActionForSubject = useCallback(
      (subject: string) =>
        form.values.permissions?.find(
          (permission) => permission.subject === subject
        ),
      [form.values.permissions]
    );

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
              {Object.entries(permissions).map(
                ([subject, { label, actions }]) => (
                  <TableRow key={subject}>
                    <TableCell>{label}</TableCell>
                    {actions.map((action) => (
                      <TableCell key={action}>
                        <Checkbox
                          checked={
                            findPermissionActionForSubject(subject)?.[action]
                          }
                          onCheckedChange={(canAction: boolean) =>
                            handleCheckboxChange(subject, action, canAction)
                          }
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </div>
      </form>
    );
  }
);
