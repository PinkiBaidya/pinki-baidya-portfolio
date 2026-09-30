import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

interface AdminAuthState {
  session: Session | null;
  checking: boolean;
  isAdmin: boolean;
}

/**
 * Tracks the current auth session and whether that user is an allowed project admin.
 * The auth listener only updates local state synchronously; the privileged admin
 * lookup happens in a separate effect so auth init is never blocked.
 */
export function useAdminAuth(): AdminAuthState {
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let active = true;

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (active) {
          setSession(data.session);
        }
      })
      .catch(() => {
        /* noop - treated as signed out */
      })
      .finally(() => {
        if (active) {
          setChecking(false);
        }
      });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session) {
      setIsAdmin(false);
      return;
    }

    let active = true;

    supabase
      .rpc("is_project_admin")
      .then(({ data, error }) => {
        if (active) {
          setIsAdmin(!error && data === true);
        }
      })
      .catch(() => {
        if (active) {
          setIsAdmin(false);
        }
      });

    return () => {
      active = false;
    };
  }, [session]);

  return { session, checking, isAdmin };
}

export default useAdminAuth;