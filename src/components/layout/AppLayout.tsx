import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function AppLayout() {
    return (
        <div className="flex h-full">
            <Navbar />
            <main className="flex flex-1 items-center justify-center px-5">
                <Outlet />
            </main>
        </div>
    );
}

export default AppLayout;
