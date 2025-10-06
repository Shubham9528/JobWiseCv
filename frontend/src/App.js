import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import ResumePage from './pages/ResumePage';
import Footer from "./components/layout/Footer";

function App() {
    return (
        <div className="min-h-screen bg-gray-50">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/resume" element={<ResumePage />} />
                </Routes>
            </BrowserRouter>
            <Footer />
        </div>
    );
}

export default App;
