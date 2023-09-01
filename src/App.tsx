import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { CagrPage, CalculatorsPage, HomePage, XirrPage } from "@/pages";
import CalculatorLayout from "@/components/layout/CalculatorLayout";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/calculators" element={<CalculatorLayout />}>
                        <Route index element={<CalculatorsPage />} />
                        <Route path="cagr" element={<CagrPage />} />
                        <Route path="xirr" element={<XirrPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
