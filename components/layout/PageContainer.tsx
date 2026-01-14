import { cn } from "@/lib/utils/cn";
import type { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  /**
   * Padding size variant
   * @default "default"
   */
  size?: "tight" | "default" | "wide";
  /**
   * Remove vertical padding
   * @default false
   */
  noPaddingY?: boolean;
}

const sizeVariants = {
  tight: "px-4 md:px-8 lg:px-12",
  default: "px-8 md:px-16 lg:px-24",
  wide: "px-12 md:px-24 lg:px-36",
};

export function PageContainer({
  children,
  className,
  size = "default",
}: PageContainerProps) {
  return (
    <div className={cn("container mx-auto", sizeVariants[size], className)}>
      {children}
    </div>
  );
}
