import "./App.css";
import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import SignUp from "./screens/SignUp";
import ChatBox from "./screens/ChatBox";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/chat-box" element={<ChatBox />} />
        <Route path="*" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
