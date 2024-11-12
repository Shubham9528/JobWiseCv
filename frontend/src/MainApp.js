import React from "react";
import App from './App';
import AiResume from './components/AiResume';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function MainApp() {
   
    return (
        <div>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<App/>} />
      <Route path="/aiResume" element={<AiResume />} />
    </Routes>

    </BrowserRouter>
        </div>
    );
}
export default MainApp