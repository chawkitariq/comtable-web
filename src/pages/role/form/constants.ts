export const permissions = {
  companies: {
    label: "Entreprise",
    actions: ["create", "read", "update", "delete"] as const,
  },
  invoices: {
    label: "Factures",
    actions: ["create", "read", "update", "delete"] as const,
  },
  contacts: {
    label: "Contacts",
    actions: ["create", "read", "update", "delete"] as const,
  },
  articles: {
    label: "Articles",
    actions: ["create", "read", "update", "delete"] as const,
  },
  taxes: {
    label: "Tax",
    actions: ["create", "read", "update", "delete"] as const,
  },
};
