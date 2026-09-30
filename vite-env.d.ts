/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_EMAILJS_SERVICE_ID: string;
  readonly VITE_PUBLIC_EMAILJS_TEMPLATE_ID: string;
  readonly VITE_PUBLIC_EMAILJS_PUBLIC_KEY: string;
  readonly VITE_PUBLIC_SUPABASE_URL: string;
  readonly VITE_PUBLIC_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const __BASE_PATH__: string;
declare const __IS_PREVIEW__: boolean;
declare const __READDY_PROJECT_ID__: string;
declare const __READDY_VERSION_ID__: string;
declare const __READDY_AI_DOMAIN__: string;