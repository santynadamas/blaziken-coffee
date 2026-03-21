// /types/next-sanity.d.ts
declare module "next-sanity" {
  import { SanityClient } from "@sanity/client";

  export interface SanityClientConfig {
    projectId: string;
    dataset: string;
    apiVersion?: string;
    useCdn?: boolean;
    token?: string;
    ignoreBrowserTokenWarning?: boolean;
    withCredentials?: boolean;
  }

  export function createClient(config: SanityClientConfig): SanityClient;

  export function groq(query: TemplateStringsArray, ...placeholders: unknown[]): string;
}