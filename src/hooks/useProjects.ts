import { useEffect, useState } from "react";
import { fetchProjects, type Project } from "@/lib/projects";

interface UseProjectsResult {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

export function useProjects(): UseProjectsResult {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const data = await fetchProjects();
        if (active) {
          setProjects(data);
        }
      } catch {
        if (active) {
          setError("We couldn't load the projects right now. Please try again later.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  return { projects, loading, error };
}

export default useProjects;