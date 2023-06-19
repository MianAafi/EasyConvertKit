import React from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.js";
import Homepage from "./Homepage/Homepage";
import Header from "./Homepage/Layout/Header";
import CompleteConversion from "./CompleteConversion";

function App() {
    return (
        <>
            <BrowserRouter>
                <div>
                    <Header />
                    <main>
                        <Routes>
                            <Route path="/" element={<CompleteConversion />} />
                        </Routes>
                    </main>
                </div>
                <Homepage />
            </BrowserRouter>
        </>
    );
}

if (document.getElementById("app")) {
    createRoot(document.getElementById("app")).render(<App />);
}
