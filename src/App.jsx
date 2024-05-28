import AppRoutes from "./router";
import React, { useState } from "react";
import SessionHelper from "./helpers/SessionHelper";
import { SessionProvider } from "./helpers/SessionContext";

export default function App() {
  return (
    <SessionProvider>
      <AppRoutes />
    </SessionProvider>
  );
}
