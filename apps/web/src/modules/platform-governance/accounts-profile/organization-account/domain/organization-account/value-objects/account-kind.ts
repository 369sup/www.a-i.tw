export const accountKinds = ["personal", "organization"] as const;

export type AccountKind = (typeof accountKinds)[number];
