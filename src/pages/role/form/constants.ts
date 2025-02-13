export const permissions = {
  companies: {
    label: "Entreprise",
    actions: ["create", "read", "update", "delete"] as const,
  },
  invoices: {
    label: "Factures",
    actions: ["create", "read", "update", "delete"] as const,
  },
};
