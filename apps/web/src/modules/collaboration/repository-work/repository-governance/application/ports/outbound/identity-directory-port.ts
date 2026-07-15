export interface IdentityDirectory {
  principal(principalId: string): Promise<
    | Readonly<{
        principalId: string;
        status: "active" | "disabled";
      }>
    | undefined
  >;
}
