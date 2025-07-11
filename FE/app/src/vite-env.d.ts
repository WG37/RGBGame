/// <reference types="vite/client" />

// add your custom env vars here
interface ImportMetaEnv {
  readonly VITE_APP_API_URL: string;
}


interface ImportMeta {
  readonly env: ImportMetaEnv;
}