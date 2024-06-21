import * as React from "react";
import { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './MenuDropdown.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMediaQuery } from '@mui/material';

interface Item {
    nome: string;
    link: string;
}

interface MenuDropdownProps {
    itens: Item[];
    titulo: string;
    icon?: React.ElementType; // Ícone é opcional
}

const MenuDropdown: React.FC<MenuDropdownProps> = ({ itens, titulo, icon: Icon }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const isSmallScreen = useMediaQuery('(max-width: 900px)');
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const navigate = useNavigate();

    useEffect(() => {
        const checkIfMobile = () => {
            const mobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            setIsMobile(mobileDevice);
        };
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    const handleMouseEnter = () => {
        if (!isMobile) {
            setIsDropdownOpen(true);
        }
    };

    const handleMouseLeave = () => {
        if (!isMobile) {
            setIsDropdownOpen(false);
        }
    };

    const handleMenuItemClick = (link: string) => {
        navigate(link);
        setIsDropdownOpen(false);
    };

    const handleToggleClick = () => {
        if (isMobile) {
            setIsDropdownOpen(!isDropdownOpen);
        }
    };


    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);



    return (
        <Dropdown
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleToggleClick}
            show={isDropdownOpen}
            style={{ height: "100%" }}
        >
            <Dropdown.Toggle id="dropdown-basic" className="custom-dropdown-toggle">
            {Icon && <Icon />} {/* Renderiza o ícone se existir */}
            {titulo}
            </Dropdown.Toggle>

            <Dropdown.Menu
                className={isDropdownOpen ? 'show' : ''}
                style={{ 
                    width: isSmallScreen ? (windowWidth + 5) : '500px !important', 
                    marginLeft: "-1px", 
                    borderRadius: isSmallScreen ? 0 : '5px' 
                }}
            >
                {itens.map((item: Item, index: number) => (
                    <Dropdown.Item
                        key={index}
                        style={{ width: isSmallScreen ? (windowWidth + 5) : '500px !important' }}
                        onClick={() => handleMenuItemClick(item.link)}
                    >
                        {item.nome}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default MenuDropdown;
