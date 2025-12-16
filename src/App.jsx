import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Survey from "./components/Survey";
import AdminPanel from "./components/steps/AdminHous"; // FIX definitivo

export default function App() {
  return (
    <BrowserRouter >
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#F9EEDF]">
        <main className="card max-w-3xl w-full">
          <Routes>
            <Route path="/" element={<Survey />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
