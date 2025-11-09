import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Servicios from './pages/Servicios'
import Proyectos from './pages/Proyectos'
import Asesoramiento from './pages/Asesoramiento'
import Quienes from './pages/Quienes'
import Footer from './components/Footer'  


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/proyectos" element={<Proyectos />} />
        <Route path="/asesoramiento" element={<Asesoramiento />} />
        <Route path="/quienes" element={<Quienes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
