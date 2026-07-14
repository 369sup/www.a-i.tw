import { Avatar, AvatarFallback } from "@a-i/shadcn/ui/avatar";

export function AccountAvatar({
  label,
  size = "default",
}: {
  label: string;
  size?: "sm" | "default";
}) {
  return (
    <Avatar aria-hidden="true" size={size}>
      <AvatarFallback className="font-semibold">
        {label.slice(0, 1).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
