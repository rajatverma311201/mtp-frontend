import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import {
    CagrPage,
    CalculatorsPage,
    HomePage,
    LoginPage,
    SignUpPage,
    SipPage,
    StocksPage,
    XirrPage,
} from "@/pages";
import CalculatorLayout from "@/components/layout/CalculatorLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import AppLayout from "./components/layout/AppLayout";

const queryClient = new QueryClient();

function App() {
    return (
        <>
            <Toaster />
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<AppLayout />}>
                            <Route index element={<HomePage />} />
                            <Route
                                path="calculators"
                                element={<CalculatorLayout />}
                            >
                                <Route index element={<CalculatorsPage />} />
                                <Route path="cagr" element={<CagrPage />} />
                                <Route path="xirr" element={<XirrPage />} />
                                <Route path="sip" element={<SipPage />} />
                            </Route>
                            <Route path="stocks" element={<StocksPage />} />

                            <Route path="login" element={<LoginPage />} />
                            <Route path="signup" element={<SignUpPage />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </>
    );
}

export default App;
