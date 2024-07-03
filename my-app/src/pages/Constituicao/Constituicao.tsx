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
const descricao_cici = 'O meu nome é Cecília da Cruz, nasci no ano de 2001 e sou de Vila Verde. Atualmente, estou a frequentar um Mestrado na Universidade do Minho e pretendo continuar meus estudos e fortalecer os meus conhecimentos. Uma vez, Isaac Newton afirmou "Construímos muros demais e pontes de menos.”, neste contexto a construção de pontes promove a diversidade, a inclusão e a cooperação, para um mundo mais harmonioso e justo, é essencial que direcionemos nossos esforços para a construção de pontes, fomentando o entendimento mútuo e a solidariedade.'
const descricao_marcia = 'O meu nome é Márcia Gonçalves, nasci em 2001, e estou atualmente a frequentar um mestrado em Educação, com especialização em Formação, Trabalho e Recursos Humanos, na Universidade do Minho.\n A menina que outrora sonhava em crescer e ajudar, hoje aspira participar ativamente na criação de projetos que possam transformar a realidade presente num futuro mais promissor. Um exemplo disso é o projeto "Todos Somos Especiais".\nE porque a educação é o elo que une todos os seres humanos, que possamos todos ser verdadeiras inspirações na vida uns dos outros, contribuindo para um mundo melhor através das nossas singularidades .'
const descricao_nani = 'O meu nome é Hernâni Lopes, tenho 21 anos, estou a trabalhar mas no processo de tirar um curso de barbeiro e começar a trabalhar na área.\nSempre fui um rapaz brincalhão, às vezes demais, gosto de ajudar quem precisa, e desde pequeno que cresci rodeada de pessoas com necessidades especiais.\nFui introduzido ao grupo através da Márcia, e comecei a ajudar com algumas coisinhas até que decidi juntar-me.\nEspero poder ajudar o Todos somos Especiais a crescer e a passar a nossa mensagem.'
const descricao_joana = 'O meu nome é Joana de Carvalho e tenho 23 anos. Atualmente tiro o mestrado em Artes Plásticas, com especialização em Intermedia, na Faculdade de Belas Artes da Universidade do Porto.\nÉ a partir da concepção da revista Todos Somos Especiais - Perspetivas sobre a Inclusão em Contexto Escolar que é gerada a aliança entre a educação e a  arte, colocando como objetivos estimular o criar, a liberdade de expressão bem como, o potencializar das capacidades intelectuais, tornando possível a mostra de singularidades de cada indivíduo.'
const descricao_paulo = 'O meu nome é Paulo Miranda, tenho 22 anos. Trabalho na área da restauração tendo como sonho abrir o meu próprio restaurante. Fui introduzido no projeto através da Lígia que me solicitou a projeção de uma animação e uns jogos na mesma.'
const descricao_sanda = 'O meu nome é Sandra Almeida, tenho 25 anos e sou licenciada em Gestão, com uma pós-graduação em Negócios Internacionais. Atualmente, trabalho numa multinacional no departamento de Tesouraria.\nO Todos Somos Especiais foi me apresentado pelo Paulo, sendo que daí adveio a oportunidade de me juntar ao projeto. \nEstou ansiosa para colaborar e fazer a diferença através deste projeto inspirador.'


const Constituicao = () => {
    useEffect(() => {
        AOS.init({
            once: false, // Permitir animações repetidas ao subir na página
        });
    }, []);



    const serviceCategories = [
        {
            name: 'Márcia Gonçalves', description: descricao_marcia, img: Marcia, cargos: [
                "Co-fundadora do grupo Todos Somos Especiais;",
                "Direção e gestão do grupo;",
                "Criação e procura de atividades culturais."]
        },
        {
            name: 'Lígia Mano', description: descricao_Ligia, img: Ligia, cargos: [
                "Co-fundadora do grupo Todos Somos Especiais;",
                "Direção e gestão do grupo;",
                "Criação e procura de atividades culturais."]
        },
        { name: 'Sandra Almeida', description: descricao_sanda, img: Sandra, cargos: ['Organização'] },
        { name: 'Paulo Miranda', description: descricao_paulo, img: Paulo, cargos: ["Recrutador de novos membros."] },
        { name: 'Joana de Carvalho', description: descricao_joana, img: Joana, cargos: ['Departamento criativo/design.'] },
        { name: 'Hernani Lopes', description: descricao_nani, img: Nani, cargos: ["Porta Voz."] },
        { name: 'Cecília da Cruz', description: descricao_cici, img: Cici, cargos: ["Marketing;", "Criador de Conteúdos."] },
        { name: 'André Ferreira', description: descricao_andre, img: Andre, cargos: ["Tesoureiro;", "Informático."] }
    ];


    const isSmallScreen = useMediaQuery('(max-width: 900px)');


    return (
        <div className='Constituicao' style={{}}>
            <div className='first-row' data-aos="fade-right">
                {!isSmallScreen && (
                    <>
                        <div className='left-column' >
                            <h2 >Equipa Todos Somos Especiais</h2>
                            <div className='citation' data-aos={isSmallScreen ? "fade-up" : "fade-right"}>
                                <div className='content'>
                                    <p><q>O amor é a sabedoria dos loucos e a loucura dos sábios</q></p>
                                    <p className='author'>- Samuel Johnson</p>
                                </div>
                            </div>
                        </div>
                        <div className='right-column'>
                            <img src={Grupo} alt="" />
                        </div>
                    </>
                )}

                {isSmallScreen && (
                    <>
                        <div className='left-column' >
                            <h2 >Equipa Todos Somos Especiais</h2>
                            <div className='right-column'>
                                <img src={Grupo} alt="" />
                            </div>
                            <div className='citation' data-aos={isSmallScreen ? "fade-up" : "fade-right"}>
                                <div className='content'>
                                    <p><q>O amor é a sabedoria dos loucos e a loucura dos sábios</q></p>
                                    <p className='author'>- Samuel Johnson</p>
                                </div>
                            </div>
                        </div>

                    </>
                )}

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
                                    <div style={{ display: "flex", justifyContent: "left", width: "100%", flexDirection: "column", whiteSpace: "break-spaces" }}>
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
                                            <div style={{ display: "flex", justifyContent: "left", width: "100%", flexDirection: "column", whiteSpace: "break-spaces" }}>
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
                                            <div style={{ display: "flex", justifyContent: "left", width: "100%", flexDirection: "column", whiteSpace: "break-spaces" }}>
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
