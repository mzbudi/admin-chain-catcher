import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { LineraProvider } from "./Provider/LineraWebClientProvider.tsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage.tsx";
import LeaderboardPage from "./pages/LeaderboardPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LineraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Routes>
      </BrowserRouter>
    </LineraProvider>
  </StrictMode>
);
