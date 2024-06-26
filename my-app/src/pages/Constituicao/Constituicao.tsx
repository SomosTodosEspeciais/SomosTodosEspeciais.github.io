import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Constituicao.css';
import { useMediaQuery } from '@mui/material';
import Ligia from '../../assets/equipa-ligia.jpg'
import Marcia from '../../assets/equipa-marcia.jpg'
import Andre from '../../assets/equipa-andre.jpg'
import Sandra from '../../assets/equipa-sandra.jpeg'
import Paulo from '../../assets/equipa-paulo.jpeg'
import Cici from '../../assets/equipa-cici.jpeg'
import Nani from '../../assets/equipa-nani.jpeg'
import Joana from '../../assets/equipa-joana.jpeg'
import Grupo from '../../assets/gatos-18.jpg'


const descricao_Ligia = "O meu nome é Lígia Mano, nasci no ano de 2001 e atualmente estou a terminar o meu mestrado em Educação, mais especificamente na área da Formação, Trabalho e Recursos Humanos. Sou uma pessoa que aprecia ideias especiais, distintas, o que vai de encontro ao propósito do Todos Somos Especiais - se a diversidade existe, ela deve ser enaltecida e celebrada."

const descricao_andre = "O meu nome é André Ferreira, nasci no ano 2000 e atualmente estou a terminar o meu mestrado em Engenharia Informática na Universidade do Minho. Sou uma pessoa que aprecia a informática (tendo criado este website) e tenho um gosto peculiar pela matemática. Acredito que a diversidade deve ser reconhecida e valorizada, e é isso que me motiva a contribuir para esta causa."

const Constituicao = () => {
    useEffect(() => {
        AOS.init({
            once: false, // Permitir animações repetidas ao subir na página
        });
    }, []);



    const serviceCategories = [
        { name: 'Márcia Gonçalves', description: "Texto da Pessoa 1sssssssssssssssssssssssssssssssssssssssssssssssssssss ssssssssssssssssssssssssssssssssssssss dsada", img: Marcia, cargos: [] },
        {
            name: 'Lígia Mano', description: descricao_Ligia, img: Ligia, cargos: [
                "Co-fundadora do grupo Todos Somos Especiais;",
                "Direção e gestão do grupo;",
                "Criação e procura de atividades culturais."]
        },
        { name: 'Sandra Almeida', description: "Texto da Pessoa 3", img: Sandra, cargos: [] },
        { name: 'Paulo Miranda', description: "Texto da Pessoa 4", img: Paulo, cargos: [] },
        { name: 'Joana de Carvalho', description: "Texto da Pessoa 5", img: Joana, cargos: [] },
        { name: 'Hernani Lopes', description: "Texto da Pessoa 6", img: Nani, cargos: [] },
        { name: 'Cecília da Cruz', description: "Texto da Pessoa 7", img: Cici, cargos: [] },
        { name: 'André Ferreira', description: descricao_andre, img: Andre, cargos: ["Tesoureiro;", "Informático."] }
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
                {serviceCategories.map(({ name, description, img, cargos }, index) => (
                    <div className='person' key={index} data-aos={isSmallScreen ? "fade-up" : (index % 2 === 0 ? "fade-left" : "fade-right")} data-aos-delay={index * 100}>
                        {index % 2 === 0 ? (
                            <>
                                <div className='person-image'>
                                    <img src={img} alt="" />
                                </div>
                                <div className='person-description'>
                                    <h3>{name}</h3>
                                    <div style={{ display: "flex", justifyContent: "left", width: "100%", flexDirection: "column" }}>
                                        <h5>Cargo:</h5>
                                        <ul>
                                            {cargos.map((cargo, index) => (
                                                <li key={index}>{cargo}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "left", width: "100%", flexDirection: "column" }}>
                                        <h5>Apresentação:</h5>
                                        <p>{description}</p>
                                    </div>
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
                                            <div style={{ display: "flex", justifyContent: "left", width: "100%", flexDirection: "column" }}>
                                                <h5>Cargo:</h5>
                                                <ul>
                                                    {cargos.map((cargo, index) => (
                                                        <li key={index}>{cargo}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div style={{ display: "flex", justifyContent: "left", width: "100%", flexDirection: "column" }}>
                                                <h5>Apresentação:</h5>
                                                <p>{description}</p>
                                            </div>
                                        </div>

                                    </>

                                    :

                                    <>
                                        <div className='person-description'>
                                            <h3>{name}</h3>
                                            <div style={{ display: "flex", justifyContent: "left", width: "100%", flexDirection: "column" }}>
                                                <h5>Cargo:</h5>
                                                <ul>
                                                    {cargos.map((cargo, index) => (
                                                        <li key={index}>{cargo}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div style={{ display: "flex", justifyContent: "left", width: "100%", flexDirection: "column" }}>
                                                <h5>Apresentação:</h5>
                                                <p>{description}</p>
                                            </div>

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
