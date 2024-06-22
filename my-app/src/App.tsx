import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/HomePage/HomePage";
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Atividades from './pages/Atividades/Atividades';
import Contactos from './pages/Contactos/Contactos';
import Jogos from './pages/Jogos/Jogos';
import Constituicao from './pages/Constituicao/Constituicao';
import FAQ from './pages/Mascote/Mascote';
import Revista from './pages/Revista/Revista';
import Mascote from './pages/Mascote/Mascote';
import Extras from './pages/Extras/Extras';
import History from './pages/History/History';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/atividades' element={<Atividades />} />
            <Route path='/contacto' element={<Contactos />} />
            <Route path='/jogos' element={<Jogos />} />
            <Route path='/constituicao' element={<Constituicao />} />
            <Route path='/mascote' element={<Mascote />} />
            <Route path='/revista' element={<Revista />} />
            <Route path='/extras' element={<Extras />} />
            <Route path='/historia' element={<History />} />
            <Route path='*' element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
