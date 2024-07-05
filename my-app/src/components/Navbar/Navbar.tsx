import React, { useEffect, useState } from 'react';
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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

const Navbar = () => {
  const { isAdmin, emailVerified, currentUser } = useAuth();
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showSignup, setShowSignup] = useState<boolean>(false);
  const navigate = useNavigate()
  const isSmallScreen = useMediaQuery('(max-width: 900px)');

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const closeModals = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  const handleLogout = () => {
    auth.signOut(); // Função de logout do Firebase
  };

  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    if (currentUser) {
      const db = getFirestore();
      const fetchUserData = async () => {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            const userDataFromFirestore = userDoc.data();
            if (userDataFromFirestore) {
              setUserData({
                name: userDataFromFirestore.name,
                email: currentUser.email || ''
              });
            }
          } else {
            console.log('Documento do usuário não encontrado.');
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      };

      fetchUserData();
    }
  }, [currentUser]);

  // Itens do menu
  const menuItems = [
    { nome: 'Página Inicial', link: '/' },
    { nome: 'História', link: '/historia' },
    { nome: 'Constituição', link: '/constituicao' },
    { nome: 'Atividades', link: '/atividades' },
    { nome: 'Jogos', link: '/jogos' },
    { nome: 'Revista', link: '/revista' },
    
    { nome: 'Mascote', link: '/mascote' },
    { nome: 'Bastidores', link: '/extras' },
    { nome: 'Contacto', link: '/contacto' },
    
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
              {currentUser && emailVerified && userData ? (
                <>
                  <li>
                    <React.Fragment>
                      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                        <Tooltip title="Definições de Conta">
                          <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                          >
                            <Avatar sx={{ width: 35, height: 35 }}>{userData.name[0]}</Avatar>
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                          elevation: 0,
                          sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                            },
                            '&::before': {
                              content: '""',
                              display: 'block',
                              position: 'absolute',
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: 'background.paper',
                              transform: 'translateY(-50%) rotate(45deg)',
                              zIndex: 0,
                            },
                          },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                      >
                        <MenuItem onClick={()=>navigate('/perfil')}>
                          <Avatar /> Perfil
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleClose}>
                          <ListItemIcon>
                            <Settings fontSize="small" />
                          </ListItemIcon>
                          Definições
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                          <ListItemIcon>
                            <Logout fontSize="small" />
                          </ListItemIcon>
                          Logout
                        </MenuItem>
                      </Menu>
                    </React.Fragment>
                  </li>
                </>
              ) : (
                <>
                  <li style={{ padding: "10px" }}>
                    <Button
                      variant='outlined'
                      onClick={() => {
                        setShowSignup(false);
                        setShowLogin(true);
                      }}
                      style={{ margin: "0px" }}
                      sx={{
                        fontSize: "8px",
                        height: "25px",
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
                  <li style={{ padding: "10px" }}>
                    <Button
                      variant='outlined'
                      onClick={() => {
                        setShowSignup(true);
                        setShowLogin(false);
                      }}
                      sx={{
                        fontSize: "8px",
                        height: "25px",
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
                <MenuDropdown itens={[menuItems[3], menuItems[4], menuItems[5]]} titulo={'Dinâmica'} />
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
              {currentUser && emailVerified && userData ? (
                <>
                  <li>
                    <React.Fragment>
                      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                        <Tooltip title="Definições de Conta">
                          <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                          >
                            <Avatar sx={{ width: 50, height: 50 }}>{userData.name[0]}</Avatar>
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                          elevation: 0,
                          sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                            },
                            '&::before': {
                              content: '""',
                              display: 'block',
                              position: 'absolute',
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: 'background.paper',
                              transform: 'translateY(-50%) rotate(45deg)',
                              zIndex: 0,
                            },
                          },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                      >
                        <MenuItem onClick={()=>navigate('/perfil')}>
                          <Avatar /> Perfil
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleClose}>
                          <ListItemIcon>
                            <Settings fontSize="small" />
                          </ListItemIcon>
                          Definições
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                          <ListItemIcon>
                            <Logout fontSize="small" />
                          </ListItemIcon>
                          Logout
                        </MenuItem>
                      </Menu>
                    </React.Fragment>
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
