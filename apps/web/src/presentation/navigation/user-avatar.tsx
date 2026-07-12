export function UserAvatar({
  label,
  size = "md",
}: {
  label: string;
  size?: "sm" | "md";
}) {
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full border bg-muted font-semibold ${size === "sm" ? "size-6 text-[10px]" : "size-8 text-xs"}`}
    >
      {label.slice(0, 1).toUpperCase()}
    </span>
  );
}
