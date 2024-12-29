import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CompanyApiService } from "@/services/company-api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export function RootPage() {
  const { data: companies } = useQuery({
    queryKey: ["companies"],
    queryFn: CompanyApiService.findAll,
  });

  const navigate = useNavigate();

  const { mutate: swtichCompany } = useMutation({
    mutationKey: ["companies"],
    mutationFn: CompanyApiService.switch,
    onSuccess: () => navigate("/dashboard"),
  });

  return (
    <main className="min-h-screen grid place-items-center">
      <div className="w-[900px] mx-auto">
        {companies && (
          <ul className="grid grid-cols-2 gap-4">
            {companies.map((company) => (
              <li key={company.id}>
                <Card>
                  <CardHeader>
                    <CardTitle>{company.name}</CardTitle>
                    <CardDescription></CardDescription>
                  </CardHeader>
                  <CardContent></CardContent>
                  <CardFooter>
                    <Button onClick={() => swtichCompany(company.id)}>
                      Sélectionner
                    </Button>
                  </CardFooter>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
