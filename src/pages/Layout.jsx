import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Layout() {
    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <Outlet />
            </div>
            <Footer />
        </>
    );
}
