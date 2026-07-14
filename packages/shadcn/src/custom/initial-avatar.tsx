import { Avatar, AvatarFallback } from "#ui/avatar";

export function InitialAvatar({
  label,
  size = "default",
}: Readonly<{
  label: string;
  size?: "sm" | "default" | "lg";
}>) {
  const initial = label.trim().slice(0, 1).toLocaleUpperCase() || "?";

  return (
    <Avatar aria-hidden="true" size={size}>
      <AvatarFallback>{initial}</AvatarFallback>
    </Avatar>
  );
}
