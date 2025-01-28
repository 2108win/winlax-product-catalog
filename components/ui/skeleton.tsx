import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md border bg-secondary shadow-lg",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
