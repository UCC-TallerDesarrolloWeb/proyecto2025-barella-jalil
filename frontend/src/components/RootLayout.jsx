import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
/**
 * Layout raíz con header, contenido (Outlet) y footer.
 * @returns {JSX.Element}
 */