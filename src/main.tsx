// main.tsx or index.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BuisnessPage from "./pages/buisness.tsx";
import Entertainment from "./pages/entertainment.tsx";
import Health from "./pages/health.tsx";
import Technology from "./pages/technology.tsx";
import GeneralPage from "./pages/general.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* App is the layout */}
        <Route path="/" element={<App />}>
          <Route index element={<GeneralPage />} />
          <Route path="business" element={<BuisnessPage />} />
          <Route path="entertainment" element={<Entertainment />} />
          <Route path="health" element={<Health />} />
          <Route path="technology" element={<Technology />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
