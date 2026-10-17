import type { ReactNode } from "react";

export default function ExternalLink({
  to,
  className,
  children,
}: {
  to: string;
  children: ReactNode | ReactNode[];
  className?: string;
}) {
  return (
    <a href={to} rel="noreferrer" target="_blank" className={className}>
      {children}
    </a>
  );
}
