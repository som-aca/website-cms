import { RouteMiddleware } from "rwsdk/router";
import { IS_DEV } from "rwsdk/constants";

export const setCommonHeaders =
  (): RouteMiddleware =>
  ({ headers, rw: { nonce } }) => {
    if (!IS_DEV) {
      // Forces browsers to always use HTTPS for a specified time period (2 years)
      headers.set(
        "Strict-Transport-Security",
        "max-age=63072000; includeSubDomains; preload",
      );
    }

    // Forces browser to use the declared content-type instead of trying to guess/sniff it
    headers.set("X-Content-Type-Options", "nosniff");

    // Stops browsers from sending the referring webpage URL in HTTP headers
    headers.set("Referrer-Policy", "no-referrer");

    // Explicitly disables access to specific browser features/APIs
    headers.set(
      "Permissions-Policy",
      "geolocation=(), microphone=(), camera=()",
    );

    // Defines trusted sources for content loading and script execution:
    headers.set(
      "Content-Security-Policy",
      `default-src 'self'; ` +
      `script-src 'self' https://challenges.cloudflare.com https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://www.gstatic.com 'unsafe-inline' 'unsafe-eval'; ` +
      `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://tagmanager.google.com; ` +
      `font-src 'self' https://fonts.gstatic.com; ` +
      `img-src 'self' https://cdn.sanity.io https://images.unsplash.com https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://*.google-analytics.com https://*.googletagmanager.com data:; ` +
      `connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com; ` +
      `frame-src https://challenges.cloudflare.com https://www.googletagmanager.com; ` +
      `object-src 'none';`,
    );
  };
