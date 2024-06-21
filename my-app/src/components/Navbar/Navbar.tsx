import { Link } from 'react-router-dom'
import './Navbar.css'
import icon from '../../assets/todos-icon.jpg'
import MenuDropdown from '../MenuDropdown/MenuDropdown'
import { useMediaQuery } from '@mui/material';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
    interface Item {
        nome: string;
        link: string;
    }

    const Item1: Item = {
        nome: 'Atividades',
        link: '/atividades'
    }
    const Item2: Item = {
        nome: 'Jogos',
        link: '/jogos'
    }

    const Item3: Item = {
        nome: 'Revista',
        link: '/revista'
    }

    const Item4: Item = {
        nome: ' Página Inicial',
        link: '/'
    }
    const Item5: Item = {
        nome: 'Constituição',
        link: '/constituicao'
    }

    const Item6: Item = {
        nome: 'Contacto',
        link: '/contacto'
    }

    const Item7: Item = {
        nome: 'Mascote',
        link: '/mascote'
    }

    const Item8: Item = {
        nome: 'Extras',
        link: '/extras'
    }

    const isSmallScreen = useMediaQuery('(max-width: 900px)');

    return (
        <>

            <div className='Navbar'>
                <nav className='navbar'>
                    {isSmallScreen ?

                        <>
                            <ul>
                                <li><Link className='button-nav-icon' to={'/'} ><img src={icon} alt="" /></Link></li>
                                <li><MenuDropdown itens={[Item4,Item1, Item2, Item3,Item5,Item6,Item7,Item8]} titulo={""} icon={MenuIcon} ></MenuDropdown></li>
                            </ul>
                        </>

                        :
                        <>
                            <ul>
                                <li><Link className='button-nav-icon' to={'/'} ><img src={icon} alt="" /></Link></li>
                                <li><Link className='button-nav-icon' to={'/'} > Página Inicial</Link></li>
                                <li><MenuDropdown itens={[Item1, Item2, Item3]}  titulo={'Dinâmica'} ></MenuDropdown></li>
                                <li><Link className='button-nav-icon' to={'/constituicao'} > Constituição</Link></li>
                                <li><Link className='button-nav-icon' to={'/contacto'} > Contacto</Link></li>
                                <li><Link className='button-nav-icon' to={'/mascote'} > Mascote </Link></li>
                                <li><Link className='button-nav-icon' to={'/extras'} > Extras </Link></li>
                            </ul>

                        </>
                    }


                </nav>
            </div>
        </>

    )
}
export default Navbar