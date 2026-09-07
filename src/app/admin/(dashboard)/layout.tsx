import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { getAdminSession } from "@/lib/auth";
import { signOut } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  if (!session) {
    // Signed in but not an admin, or not signed in at all.
    redirect("/admin/login");
  }

  return (
    <div className="min-h-dvh bg-paper">
      <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <Link href="/admin" className="flex items-center gap-2.5">
            <Image
              src="/logo-mark.png"
              alt=""
              width={512}
              height={512}
              className="size-8 shrink-0 object-contain"
            />
            <span className="text-[1.05rem] font-semibold tracking-[-0.02em]">
              Discovered <span className="text-accent">Local</span>
            </span>
            <span className="rounded-full border border-line bg-paper-deep px-2 py-0.5 text-xs text-ink-muted">
              Admin
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-ink-muted sm:block">
              {session.email}
            </span>
            <form action={signOut}>
              <button
                type="submit"
                className="rounded-full border border-line-strong px-3.5 py-1.5 text-sm transition-colors hover:border-ink"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      {children}
    </div>
  );
}
