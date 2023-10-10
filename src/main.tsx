import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AuthContextProvider from "@/contexts/AuthContextProvider";
import { ThemeProvider } from "@/components/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <AuthContextProvider>
        <ThemeProvider defaultTheme="dark">
            <App />
        </ThemeProvider>
    </AuthContextProvider>,
);
