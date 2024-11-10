import React from "react";
import App from './App';

import { BrowserRouter, Routes, Route } from "react-router-dom";

function MainApp() {
   
    return (
        <div>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<App/>} />
      
    </Routes>

    </BrowserRouter>
        </div>
    );
}
export default MainApp