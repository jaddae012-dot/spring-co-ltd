declare module "next/server.js" {
  export interface NextRequest {
    cookies: {
      get: (name: string) => { value?: string } | undefined;
    };
    nextUrl: {
      pathname: string;
      searchParams: URLSearchParams;
    };
    url: string;
  }

  export class NextResponse {
    static json(body: unknown, init?: ResponseInit): Response;
    static redirect(url: string | URL, init?: number | ResponseInit): Response;
    static next(): Response;
    constructor(body?: BodyInit | null, init?: ResponseInit);
  }
}

declare module "next/types.js" {
  export type ResolvingMetadata = Record<string, unknown>;
  export type ResolvingViewport = Record<string, unknown>;
}

declare module "next/dist/lib/metadata/types/metadata-interface.js" {
  export type ResolvingMetadata = Record<string, unknown>;
  export type ResolvingViewport = Record<string, unknown>;
}
