import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
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

  const { company, setCompany } = useSessionStore();

  const findCompanyById = useCallback(
    (companyId: string) => {
      return companies?.find(
        (company) => company.id === companyId
      ) as CompanyType;
    },
    [companies]
  );

  const handleSwitchCompany = useCallback(
    (companyId: string) => {
      if (companyId) {
        const company = findCompanyById(companyId);
        setCompany(company);
      }
      navigate("/articles");
    },
    [findCompanyById, navigate, setCompany]
  );

  return (
    <div className="min-h-screen grid place-items-center">
      <Card className="h-5/6 w-6/12">
        <CardHeader>
          <CardTitle>Entreprises</CardTitle>
          <CardDescription>Séléctionner une entreprise</CardDescription>
        </CardHeader>
        <CardContent>
          <ToggleGroup
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            type="single"
            value={company.id}
            onValueChange={handleSwitchCompany}
          >
            {companies?.map((company) => (
              <ToggleGroupItem
                key={company.id}
                className="min-h-48"
                variant="outline"
                value={company.id}
              >
                <div>{company.name}</div>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </CardContent>
      </Card>
    </div>
  );
}
