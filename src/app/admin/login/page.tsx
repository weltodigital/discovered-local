import { Suspense } from "react";

import { LoginForm } from "@/components/admin/LoginForm";
import { LogoLockup } from "@/components/site/Logo";

export default function AdminLoginPage() {
  return (
    <main className="container-page flex min-h-dvh items-center justify-center py-16">
      <div className="w-full max-w-sm">
        <LogoLockup className="h-14 w-auto" />
        <h1 className="mt-8 text-2xl font-semibold tracking-[-0.02em]">
          Admin sign in
        </h1>
        <p className="mt-2 text-[0.95rem] text-ink-muted">
          Creator applications are private. Sign in to continue.
        </p>

        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
