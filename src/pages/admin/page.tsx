import { Link } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { supabase } from "@/lib/supabase";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";

export default function AdminPage() {
  const { session, checking, isAdmin } = useAdminAuth();

  if (checking) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background-50 text-foreground-400">
        <i className="ri-loader-4-line mr-2 animate-spin text-xl" />
        <span className="text-sm">Checking access…</span>
      </div>
    );
  }

  if (!session) {
    return <AdminLogin />;
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-5 bg-background-50 px-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-500/15 text-accent-300">
          <i className="ri-lock-2-line text-2xl" />
        </div>
        <div>
          <h1 className="font-heading text-2xl font-semibold text-foreground-50">Access restricted</h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-foreground-400">
            This account isn't authorised to manage projects. Sign in with the owner account to continue.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => supabase.auth.signOut()}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-primary-500 px-4 py-2 text-sm font-semibold text-background-50 transition-colors hover:bg-primary-600"
          >
            <i className="ri-logout-box-r-line" />
            Sign out
          </button>
          <Link
            to="/"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-background-300/60 px-4 py-2 text-sm font-medium text-foreground-200 transition-colors hover:bg-background-200/60"
          >
            <i className="ri-arrow-left-line" />
            Back to portfolio
          </Link>
        </div>
      </div>
    );
  }

  return <AdminDashboard />;
}