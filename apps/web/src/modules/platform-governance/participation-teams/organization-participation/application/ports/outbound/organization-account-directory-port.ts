export interface OrganizationAccountDirectory {
  resolve(accountId: string): Promise<
    | Readonly<{
        kind: "organization";
        status: "active" | "suspended";
      }>
    | undefined
  >;
}
