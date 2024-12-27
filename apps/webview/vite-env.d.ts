//// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BROADCAST_URL: string;
  // Add other environment variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
// <reference types="vite/client" />
