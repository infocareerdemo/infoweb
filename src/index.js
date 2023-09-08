import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ProSidebarProvider } from "react-pro-sidebar";
import GlobalEventHandlers from "./utils/GlobalEventHandlers";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalEventHandlers>
    <ProSidebarProvider>
     
      <App />
      
    </ProSidebarProvider>
    </GlobalEventHandlers>
  </React.StrictMode>
);