"use client";

import { Link } from "react-router-dom";
import NavProfile from "./NavProfile";

function Navbar() {
    return (
        <header className="fixed left-0 right-0 top-0 z-10 mb-6 flex items-center justify-between rounded-lg bg-white px-8 py-4 shadow-md">
            <Link to="/" className="text-4xl">
                MTP
            </Link>
            <NavProfile />
        </header>
    );
}

export default Navbar;
