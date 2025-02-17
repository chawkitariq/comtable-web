import { AlertDialogContext, Params } from "@/contexts/alert-dialog";
import { useCallback, useContext } from "react";

export function useAlertDialogConfirm() {
  const dialog = useContext(AlertDialogContext);

  return useCallback(
    (params: Params<"confirm">) => {
      return dialog({
        ...(typeof params === "string" ? { title: params } : params),
        type: "confirm",
      });
    },
    [dialog]
  );
}

export function useAlertDialogConfirmRemove() {
  const alertDialogConfirm = useAlertDialogConfirm();

  return useCallback(
    () =>
      alertDialogConfirm({
        title: "Confirmation de la suppression",
        body: "Êtes-vous sûr de vouloir supprimer cet élément (ces éléments) ?",
        cancelButton: "Annuler",
        actionButton: "Confirmer",
        cancelButtonVariant: "outline",
        actionButtonVariant: "destructive",
      }),
    [alertDialogConfirm]
  );
}

export function useAlertDialogPrompt() {
  const dialog = useContext(AlertDialogContext);

  return (params: Params<"prompt">) =>
    dialog({
      ...(typeof params === "string" ? { title: params } : params),
      type: "prompt",
    });
}

export function useAlertDialogAlert() {
  const dialog = useContext(AlertDialogContext);
  return (params: Params<"alert">) =>
    dialog({
      ...(typeof params === "string" ? { title: params } : params),
      type: "alert",
    });
}
