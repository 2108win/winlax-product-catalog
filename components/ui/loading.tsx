import { cn } from "@/lib/utils";
import { LoaderPinwheel } from "lucide-react";

function Loading({ className }: { className?: string }) {
  return (
    <div className="flex items-center justify-center">
      <LoaderPinwheel className={cn("animate-spin", className)} />
    </div>
  );
}

export default Loading;
