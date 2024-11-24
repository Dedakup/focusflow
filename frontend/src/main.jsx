import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from '@auth0/auth0-react';
import App from "./App";
import "./index.css";

import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-6zeb418i7xs8g1lc.us.auth0.com"
      clientId="I6OcR4a74Bw97KHAJ6IpfWrEu5GcV2cz"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: 'focusflow-audience'
      }}
    >
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>,
);
