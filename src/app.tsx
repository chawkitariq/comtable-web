import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router } from "./pages/router";
import { AlertDialogProvider } from "./contexts";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AlertDialogProvider>
        <Router />
      </AlertDialogProvider>
    </QueryClientProvider>
  );
}
