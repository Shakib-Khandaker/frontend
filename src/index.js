import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import ReactDOM from "react-dom/client";

export default function App() {
  
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);


