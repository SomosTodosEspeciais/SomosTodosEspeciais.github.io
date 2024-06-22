import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Profile from '../../assets/Generic-Profile.jpg';
import './Constituicao.css';
import { useMediaQuery } from '@mui/material';
import Ligia from '../../assets/equipa-ligia.jpg'
import Marcia from '../../assets/equipa-marcia.jpg'
import Andre from '../../assets/equipa-andre.jpg'
import Sandra from '../../assets/equipa-sandra.jpeg'
import Paulo from '../../assets/equipa-paulo.jpeg'
import Grupo from '../../assets/gatos-18.jpg'
const Constituicao = () => {
    useEffect(() => {
        AOS.init({
            once: false, // Permitir animações repetidas ao subir na página
        });
    }, []);



    const serviceCategories = [
        { name: 'Márcia Gonçalves', description: "Texto da Pessoa 1sssssssssssssssssssssssssssssssssssssssssssssssssssss ssssssssssssssssssssssssssssssssssssss dsada", img: Marcia },
        { name: 'Lígia Mano', description: "Texto da Pessoa 2", img: Ligia },
        { name: 'Sandra Almeida', description: "Texto da Pessoa 3", img: Sandra },
        { name: 'Paulo Miranda', description: "Texto da Pessoa 4", img: Paulo },
        { name: 'Joana Carvalho', description: "Texto da Pessoa 5", img: Profile },
        { name: 'Hernani Lopes', description: "Texto da Pessoa 6", img: Profile },
        { name: 'Cecília da Cruz', description: "Texto da Pessoa 7", img: Profile },
        { name: 'André Ferreira', description: "Texto da Pessoa 8", img: Andre }
    ];


    const isSmallScreen = useMediaQuery('(max-width: 900px)');


    return (
        <div className='Constituicao' style={{}}>
            <div className='first-row' data-aos="fade-right">
                <div className='left-column' >
                    <h2 >Equipa Todos Somos Especiais</h2>
                    <p >Algum Texto. Foto de grupo - Algum Texto. Foto de grupo -Algum Texto. Foto de grupo -Algum Texto. Foto de grupo -Algum Texto. Foto de grupo -Algum Texto. Foto de grupo -Algum Texto. Foto de grupo -Algum Texto. Foto de grupo -Algum Texto. Foto de grupo -Algum Texto. Foto de grupo -Algum Texto. Foto de grupo -</p>
                </div>
                <div className='right-column'>
                    <img src={Grupo} alt="" />
                </div>
            </div>
            <div className='persones'>
                {serviceCategories.map(({ name, description, img }, index) => (
                    <div className='person' key={index} data-aos={isSmallScreen ? "fade-up" : (index % 2 === 0 ? "fade-left" : "fade-right")} data-aos-delay={index * 100}>
                        {index % 2 === 0 ? (
                            <>
                                <div className='person-image'>
                                    <img src={img} alt="" />
                                </div>
                                <div className='person-description'>
                                    <h3>{name}</h3>
                                    <p>{description}</p>
                                </div>
                            </>
                        ) : (
                            <>
                                {isSmallScreen ?
                                    <>
                                    <div className='person-image'>
                                            <img src={img} alt="" />
                                        </div>
                                        <div className='person-description'>
                                            <h3>{name}</h3>
                                            <p>{description}</p>
                                        </div>
                                        
                                    </>

                                    :

                                    <>
                                        <div className='person-description'>
                                            <h3>{name}</h3>
                                            <p>{description}</p>
                                        </div>
                                        <div className='person-image'>
                                            <img src={img} alt="" />
                                        </div>
                                    </>}

                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Constituicao;
