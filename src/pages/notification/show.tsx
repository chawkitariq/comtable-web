import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { NotificationApiService } from "@/services";

export function NotificationShowPage() {
  const { notificationId } = useParams();

  const { data: notification } = useQuery({
    queryKey: ["notifications", notificationId],
    queryFn: () => NotificationApiService.findOne(notificationId!),
    enabled: Boolean(notificationId),
  });

  const navigate = useNavigate();

  return (
    <Dialog open={true} onOpenChange={() => navigate("/notifications")}>
      <DialogContent
        className="h-[90vh] min-w-[35vw] overflow-y-auto grid grid-rows-[auto_1fr]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{notification?.subject}</DialogTitle>
          <DialogDescription className="leading-7 [&:not(:first-child)]:mt-6">
            {notification?.subject}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
