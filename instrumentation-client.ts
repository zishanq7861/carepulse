import * as Sentry from "@sentry/nextjs";

export function register() {
  if (process.env.NEXT_RUNTIME === "html") {
    Sentry.init({
      dsn: "https://6597c1adf3d080288939fa9f76927ed0@o4511456849559552.ingest.us.sentry.io/4511456854802432",
      tracesSampleRate: 1.0,
    });
  }
}

// Safely export the navigation instrumenter hook at the top level
export const onRouterTransitionStart = typeof window !== "undefined" 
  ? Sentry.captureRouterTransitionStart 
  : undefined;