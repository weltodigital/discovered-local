"use client";

import { useFormStatus } from "react-dom";

import { buttonStyles } from "@/components/ui/button";

export function SubmitButton({
  children,
  pendingLabel,
  variant = "secondary",
  size = "md",
  className = "",
}: {
  children: React.ReactNode;
  pendingLabel: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={buttonStyles({ variant, size, className })}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
