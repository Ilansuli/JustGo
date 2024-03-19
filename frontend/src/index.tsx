import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/design-tokens.css";
import "./assets/styles/theme.css";
import "./assets/styles/index.css";
import { routes } from "./router";
import { RouterProvider } from "@tanstack/react-router";
import { Router } from "@tanstack/react-router";
import rootRoute from "./router/rootRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ParallaxProvider } from "react-scroll-parallax";

const queryClient = new QueryClient();

const routeTree = rootRoute.addChildren(routes);

const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        }))
      );

const ReactQueryDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import("@tanstack/react-query-devtools").then((res) => ({
          default: res.ReactQueryDevtools,
          // For Embedded Mode
        }))
      );

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  // <React.StrictMode>
  <ParallaxProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* <TanStackRouterDevtools router={router} /> */}
      <ReactQueryDevtools position="right" />
    </QueryClientProvider>
  </ParallaxProvider>
  // </React.StrictMode>
);
