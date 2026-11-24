import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Eyebrow } from "./Eyebrow";
import { cn } from "@/lib/cn";

/** Consistent section intro: eyebrow + split-reveal heading + optional lead / action on the right. */
export function SectionHeader({
  eyebrow,
  title,
  id,
  lead,
  action,
  className,
  as = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  id?: string;
  lead?: ReactNode;
  action?: ReactNode;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <header className={cn("grid gap-x-10 gap-y-5 lg:grid-cols-12 lg:items-end", className)}>
      <div className="lg:col-span-7">
        {eyebrow && (
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
        )}
        <SplitText as={as} id={id} className={cn(as === "h1" ? "type-display" : "type-h2", eyebrow && "mt-4")}>
          {title}
        </SplitText>
      </div>
      {(lead || action) && (
        <Reveal className="flex flex-col items-start gap-5 lg:col-span-5">
          {lead && <div className="max-w-[480px] text-muted">{lead}</div>}
          {action}
        </Reveal>
      )}
    </header>
  );
}
