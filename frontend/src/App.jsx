import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "@/components/RootLayout";
import Home from "@/pages/Home";
import Servicios from "@/pages/Servicios";
import ServiciosImportacion from "@/pages/ServiciosImportacion";
import ServiciosInstalacion from "@/pages/ServiciosInstalacion";
import Proyectos from "@/pages/Proyectos";
import Asesoramiento from "@/pages/Asesoramiento";
import Quienes from "@/pages/Quienes";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Servicios />} />
        <Route path="/servicios/importacion" element={<ServiciosImportacion />} />
        <Route path="/servicios/instalacion" element={<ServiciosInstalacion />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/asesoramiento" element={<Asesoramiento />} />
          <Route path="/quienes" element={<Quienes />} />
          <Route path="*" element={<Home />} />
         
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
