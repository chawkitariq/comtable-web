import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CompanyApiService } from "@/services/company-api";
import { useSessionStore } from "@/stores";
import { CompanyType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { useNavigate } from "react-router";

export function RootPage() {
  const { data: companies } = useQuery({
    queryKey: ["companies"],
    queryFn: CompanyApiService.findAll,
  });

  const navigate = useNavigate();

  const { setCompany } = useSessionStore();

  const handleSwitchCompany = useCallback(
    (company: CompanyType) => {
      setCompany(company);
      navigate("/articles");
    },
    [navigate, setCompany]
  );

  return (
    <main className="min-h-screen py-48">
      <section className="w-[900px] mx-auto grid gap-4">
        <div>
          <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Entreprise
          </h1>
          <p className="text-muted-foreground">Sélectionner une entreprise</p>
        </div>
        {companies && (
          <ul className="grid grid-cols-2 gap-4">
            {companies.map((company) => (
              <li key={company.id}>
                <Card>
                  <CardHeader>
                    <CardTitle>{company.name}</CardTitle>
                    <CardDescription></CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button
                      size="sm"
                      onClick={() => handleSwitchCompany(company)}
                    >
                      Sélectionner
                    </Button>
                  </CardFooter>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
