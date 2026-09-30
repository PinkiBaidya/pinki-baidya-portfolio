import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function AdminLogin() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setNotice(null);
    setBusy(true);

    try {
      if (mode === "signin") {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) {
          throw signInError;
        }
      } else {
        const { data, error: signUpError } = await supabase.auth.signUp({ email, password });
        if (signUpError) {
          throw signUpError;
        }
        if (!data.session) {
          setNotice("Account created. Please confirm it from your inbox, then sign in.");
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const inputClass =
    "w-full rounded-md border border-background-300/60 bg-background-50/80 px-3 py-2 text-sm text-foreground-100 outline-none transition-colors focus:border-primary-400 placeholder:text-foreground-600";

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background-50 px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-500/15 text-primary-300">
            <i className="ri-shield-keyhole-line text-2xl" />
          </div>
          <h1 className="font-heading text-2xl font-semibold text-foreground-50">Project Management</h1>
          <p className="mt-2 text-sm text-foreground-400">
            Private area. Sign in to manage your portfolio projects.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card-surface flex flex-col gap-4 rounded-lg p-6">
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-foreground-400" htmlFor="admin-email">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="email"
              required
              className={inputClass}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-foreground-400" htmlFor="admin-password">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              required
              minLength={6}
              className={inputClass}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
            />
          </div>

          {error ? (
            <p className="flex items-start gap-2 rounded-md bg-accent-500/10 px-3 py-2 text-xs text-accent-300">
              <i className="ri-error-warning-line mt-0.5" />
              <span>{error}</span>
            </p>
          ) : null}

          {notice ? (
            <p className="flex items-start gap-2 rounded-md bg-primary-500/10 px-3 py-2 text-xs text-primary-200">
              <i className="ri-mail-check-line mt-0.5" />
              <span>{notice}</span>
            </p>
          ) : null}

          <button
            type="submit"
            disabled={busy}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary-500 px-5 py-2.5 text-sm font-semibold text-background-50 transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? (
              <>
                <i className="ri-loader-4-line mr-2 animate-spin" />
                Please wait…
              </>
            ) : mode === "signin" ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setMode((prev) => (prev === "signin" ? "signup" : "signin"));
              setError(null);
              setNotice(null);
            }}
            className="text-center text-xs text-foreground-400 transition-colors hover:text-foreground-100"
          >
            {mode === "signin"
              ? "First time here? Create your admin account"
              : "Already have an account? Sign in"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-foreground-500 transition-colors hover:text-foreground-200"
          >
            <i className="ri-arrow-left-line" />
            Back to portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}