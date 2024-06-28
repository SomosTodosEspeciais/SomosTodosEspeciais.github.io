import { Link, Navigate, Route, Routes, HashRouter } from 'react-router-dom';
import HomePage from "./pages/HomePage/HomePage";
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Atividades from './pages/Atividades/Atividades';
import Contactos from './pages/Contactos/Contactos';
import Jogos from './pages/Jogos/Jogos';
import Constituicao from './pages/Constituicao/Constituicao';
import Revista from './pages/Revista/Revista';
import Mascote from './pages/Mascote/Mascote';
import Extras from './pages/Extras/Extras';
import History from './pages/History/History';
import Privacidade from './pages/Privacidade/Privacidade';
import TermosCondicoes from './pages/TermosCondicoes/TermosCondicoes';
import CookieConsent from "react-cookie-consent";
import { AuthProvider } from './context/AuthContext/AuthContext';
import AdminView from './pages/AdminView/AdminView';
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute';


function App() {
  return (
    <div className="App">
      <HashRouter  >
        <CookieConsent

          location="bottom"
          buttonText="Aceitar"
          cookieName="myAwesomeCookieName2"
          style={{ background: "#2B373B" }}
          buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
          expires={150}
        >
          Este website usa cookies para otimizar a sua experiência.{" "}
          <Link to={"/politica-privacidade"}>Detalhes.</Link>
        </CookieConsent>
        <AuthProvider>
          <Navbar />
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/atividades' element={<Atividades />} />
              <Route path='/contacto' element={<Contactos />} />
              <Route path='/jogos' element={<Jogos />} />
              <Route path='/constituicao' element={<Constituicao />} />
              <Route path='/mascote' element={<Mascote />} />
              <Route path='/revista' element={<Revista />} />
              <Route path='/extras' element={<Extras />} />
              <Route path='/politica-privacidade' element={<Privacidade />} />
              <Route path='/termos-e-condicoes' element={<TermosCondicoes />} />
              <Route path='/historia' element={<History />} />
              <Route path='/admin' element={
                <ProtectedRoute>
                  <AdminView />
                </ProtectedRoute>
              } />
              <Route path='*' element={<Navigate to="/" replace />} />
            </Routes>
          

          <Footer />
        </AuthProvider>
      </HashRouter >
    </div>
  );
}

export default App;
