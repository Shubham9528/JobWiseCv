import React from "react";
import App from './App';
import AiResume from './components/AiResume';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
function MainApp() {
   
    return (
        <div>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<App/>} />
      <Route path="/aiResume" element={<AiResume />} />
    </Routes>

    </BrowserRouter>

    <Footer />
        </div>
    );
}
export default MainApp