export interface OrganizationAccountDirectory {
  resolve(organizationAccountId: string): Promise<
    | Readonly<{
        organizationAccountId: string;
        status: "active" | "suspended";
      }>
    | undefined
  >;
}
