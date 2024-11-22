import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClientsPages from './pages/clientsPages.jsx';
import Navbar from './components/Navbar.jsx';
import NotasPage from './pages/notasPages.jsx';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Navbar />
    <StrictMode>
      <Routes>
        <Route path={'/'} element={<App />} />
        <Route path={'/clients'} element={<ClientsPages />} />
        <Route path={'/notas'} element={<NotasPage/>} />
      </Routes>

    </StrictMode>

  </BrowserRouter>
)
