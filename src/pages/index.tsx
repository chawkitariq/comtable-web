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
import { useQuery } from "@tanstack/react-query";

export function IndexPage() {
  const { data: companies } = useQuery({
    queryKey: ["companies"],
    queryFn: CompanyApiService.findAll,
  });

  return (
    <main className="min-h-screen grid place-items-center">
      <Card className="w-[900px] mx-auto">
        <CardHeader>
          <CardTitle>Entreprises</CardTitle>
          <CardDescription>Sélectionner une entreprise</CardDescription>
        </CardHeader>
        <CardContent>
          {companies && (
            <ul className="grid grid-cols-2 gap-4">
              {companies.map(() => (
                <li>
                  <Card>
                    <CardHeader>
                      <CardTitle></CardTitle>
                      <CardDescription></CardDescription>
                    </CardHeader>
                    <CardContent></CardContent>
                    <CardFooter>
                      <Button>Sélectionner</Button>
                    </CardFooter>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
