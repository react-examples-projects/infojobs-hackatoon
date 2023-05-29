import React from "react";
import ReactDOM from "react-dom/client";
import App from "app";
import "@css/index.scss";
import "inter-ui/inter.css";
import { Notifications } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
    },
  },
});

const theme = {
  colorScheme: "dark",
  fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
  fontFamilyMonospace: "Monaco, Courier, monospace",
  headings: {
    fontFamily: " Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
  },
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        theme={theme}
        withCSSVariables
        withGlobalStyles
        withNormalizeCSS
      >
        <Notifications />
        <App />
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
