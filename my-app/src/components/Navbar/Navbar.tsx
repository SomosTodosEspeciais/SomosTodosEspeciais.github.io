import React, { useState } from 'react';
import './Navbar.css';
import icon from '../../assets/todos-icon.jpg';
import MenuDropdown from '../MenuDropdown/MenuDropdown';
import { useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../../context/AuthContext/AuthContext';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import { auth } from '../../Firebase/firebase';

const Navbar = () => {
  const { isAdmin, emailVerified, currentUser } = useAuth();
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showSignup, setShowSignup] = useState<boolean>(false);

  const isSmallScreen = useMediaQuery('(max-width: 900px)');

  const closeModals = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  const handleLogout = () => {
    auth.signOut(); // Função de logout do Firebase
  };

  // Itens do menu
  const menuItems = [
    { nome: 'Atividades', link: '/atividades' },
    { nome: 'Jogos', link: '/jogos' },
    { nome: 'Revista', link: '/revista' },
    { nome: 'Página Inicial', link: '/' },
    { nome: 'Constituição', link: '/constituicao' },
    { nome: 'Contacto', link: '/contacto' },
    { nome: 'Mascote', link: '/mascote' },
    { nome: 'Bastidores', link: '/extras' },
    { nome: 'História', link: '/historia' },
  ];

  return (
    <div className='Navbar'>
      <nav className='navbar'>
        {isSmallScreen ? (
          <>
            <ul>
              <li>
                <Link className='button-nav-icon' to={'/'}>
                  <img src={icon} alt='' />
                </Link>
              </li>
              <li>
                <MenuDropdown itens={menuItems} titulo={''} icon={MenuIcon} />
              </li>
            </ul>
            <ul className='second-nav'>
              {currentUser && emailVerified ? (
                <>
                  <li>
                    <Button
                      variant='outlined'
                      onClick={handleLogout}
                      sx={{
                        border: '1px solid black',
                        color: 'black',
                        '&:hover': {
                          borderColor: 'black',
                          backgroundColor: '#FFFFDA',
                        },
                      }}
                    >
                      Logout
                    </Button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Button
                      variant='outlined'
                      onClick={() => {
                        setShowSignup(false);
                        setShowLogin(true);
                      }}
                      sx={{
                        border: '1px solid black',
                        color: 'black',
                        '&:hover': {
                          borderColor: 'black',
                          backgroundColor: '#FFFFDA',
                        },
                      }}
                    >
                      Login
                    </Button>
                  </li>
                  <li>
                    <Button
                      variant='outlined'
                      onClick={() => {
                        setShowSignup(true);
                        setShowLogin(false);
                      }}
                      sx={{
                        border: '1px solid black',
                        color: 'black',
                        '&:hover': {
                          borderColor: 'black',
                          backgroundColor: '#FFFFDA',
                        },
                      }}
                    >
                      Criar Conta
                    </Button>
                  </li>
                </>
              )}
            </ul>
          </>
        ) : (
          <>
            <ul>
              <li>
                <Link className='button-nav-icon' to={'/'}>
                  <img src={icon} alt='' />
                </Link>
              </li>
              <li>
                <Link className='button-nav-icon' to={'/'}>
                  Página Inicial
                </Link>
              </li>
              <li>
                <Link className='button-nav-icon' to={'/historia'}>
                  História
                </Link>
              </li>
              <li>
                <Link className='button-nav-icon' to={'/constituicao'}>
                  Constituição
                </Link>
              </li>
              <li>
                <MenuDropdown itens={[menuItems[0], menuItems[1], menuItems[2]]} titulo={'Dinâmica'} />
              </li>
              <li>
                <Link className='button-nav-icon' to={'/mascote'}>
                  Mascote
                </Link>
              </li>
              <li>
                <Link className='button-nav-icon' to={'/extras'}>
                  Bastidores
                </Link>
              </li>
              <li>
                <Link className='button-nav-icon' to={'/contacto'}>
                  Contacto
                </Link>
              </li>
              {isAdmin && (
                <li>
                  <Link className='button-nav-icon' to='/admin'>
                    AdminView
                  </Link>
                </li>
              )}
            </ul>
            <ul className='second-nav'>
              {currentUser && emailVerified ? (
                <>
                  <li>
                    <Button
                      variant='outlined'
                      onClick={handleLogout}
                      sx={{
                        border: '1px solid black',
                        color: 'black',
                        '&:hover': {
                          borderColor: 'black',
                          backgroundColor: '#FFFFDA',
                        },
                      }}
                    >
                      Logout
                    </Button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Button
                      variant='outlined'
                      onClick={() => {
                        setShowSignup(false);
                        setShowLogin(true);
                      }}
                      sx={{
                        border: '1px solid black',
                        color: 'black',
                        '&:hover': {
                          borderColor: 'black',
                          backgroundColor: '#FFFFDA',
                        },
                      }}
                    >
                      Login
                    </Button>
                  </li>
                  <li>
                    <Button
                      variant='outlined'
                      onClick={() => {
                        setShowSignup(true);
                        setShowLogin(false);
                      }}
                      sx={{
                        border: '1px solid black',
                        color: 'black',
                        '&:hover': {
                          borderColor: 'black',
                          backgroundColor: '#FFFFDA',
                        },
                      }}
                    >
                      Criar Conta
                    </Button>
                  </li>
                </>
              )}
            </ul>
          </>
        )}
      </nav>
      {showLogin && <Login onClose={closeModals} />}
      {showSignup && <Signup onClose={closeModals} />}
    </div>
  );
};

export default Navbar;
