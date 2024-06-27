import React, { useEffect, useState } from "react";
import SlideImage from '../../components/SlideImages/SlideImages';
import '../../components/SlideImages/SlideImages.css';
import './Extras.css';
import { CarouselProvider } from "pure-react-carousel";
import Pagination from '@mui/material/Pagination';
import { useMediaQuery } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';

const images = [
    { url: require('../../assets/extra-revista-1.jpeg') },
    { url: require('../../assets/extra-revista-2.jpeg') },
    { url: require('../../assets/extra-revista-3.mp4') },
    { url: require('../../assets/extra-revista-4.mp4') },
];

const images2 = [
    { url: require('../../assets/extra-feira-1.mp4') },
    { url: require('../../assets/extra-feira-2.mp4') },
    { url: require('../../assets/extra-feira-3-fixed.mp4') },
    { url: require('../../assets/extra-feira-4.mp4') },
    { url: require('../../assets/extra-feira-5.jpeg') },
    { url: require('../../assets/extra-feira-6.mp4') },
];

const images3 = [
    { url: require('../../assets/extra-live-1.jpeg') },
];

const images4 = [
    { url: require('../../assets/extra-jogo-1.mp4') },
    { url: require('../../assets/extra-jogo-2.mp4') },
    { url: require('../../assets/extra-jogo-3.mp4') },
];

const images5 = [
    { url: require('../../assets/extra-praia-1.mp4') },
    { url: require('../../assets/extra-praia-2.mp4') },
];

const images6 = [
    { url: require('../../assets/extra-reuniao-1.mp4') },
    { url: require('../../assets/extra-reuniao-2.mp4') },
];

const images7 = [
    { url: require('../../assets/extra-estilo-1.mp4') },
];

const descricaoLimpeza = '';
const descricaoGatil = '';
const descricaoRevista = '';

const atividades = [
    { titulo: "Juntos Pela Limpeza de Esposende", imagens: images5, descricao: descricaoLimpeza },
    { titulo: "Encerramento da Semana Incluir + 2023 na Biblioteca Lúcio Craveiro da Silva", imagens: images, descricao: descricaoGatil },
    { titulo: "Live com o Sr. Braga do 'Inclusão e Acessibilidade Para Todos'", imagens: images3, descricao: descricaoRevista },
    { titulo: "Desenvolvimento do Jogo no Scratch", imagens: images4, descricao: descricaoRevista },
    { titulo: "Mercadinho de Primavera", imagens: images2, descricao: descricaoRevista },
    { titulo: "Reunião do Todos Somos Especiais", imagens: images6, descricao: descricaoRevista },
    { titulo: "Estilo Todos Somos Especiais", imagens: images7, descricao: "" },
];


const Extras = () => {

    useEffect(() => {
        AOS.init({
            once: false, // Permitir animações repetidas ao subir na página
        });
    }, []);


    const atividadesPorPagina = 2;
    const paginasTotal = Math.ceil(atividades.length / atividadesPorPagina);
    const [pageIndex, setPageIndex] = useState<number>(1);

    const [showExtras, setShowExtras] = useState<{
        titulo: string;
        imagens: {
            url: any;
        }[];
        descricao: string;
    }[]>(JSON.parse(JSON.stringify(atividades.slice(0, atividadesPorPagina))));

    useEffect(() => {
        const startIndex = (pageIndex - 1) * atividadesPorPagina;
        const endIndex = startIndex + atividadesPorPagina;
        setShowExtras(JSON.parse(JSON.stringify(atividades.slice(startIndex, endIndex))));
    }, [pageIndex]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPageIndex(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const isSmallScreen = useMediaQuery('(max-width: 900px)');


    return (
        <div className='Extras'>
            <div className='header'>
                <h1>Bastidores</h1>
            </div>
            <div className="content">
                <p>Bem vindos aos nossos "bastidores". Um espaço mais informal mas exposto por ser fundamental no, e para, o grupo. Aqui encontrarão a fase de preparação das diversas atividades, assim como momentos de diversão e descontração decorrentes das respetivas ações. Afinal, Todos Somos Especiais é um grupo jovem caracterizado pela sua boa disposição, naturalidade e união, sendo estes alguns dos momentos que o exprimem. ❤️</p>

            </div>
            {showExtras.map(({ titulo, imagens, descricao }, index) => (
                <div key={`${pageIndex}-${index}`}>
                    <CarouselProvider
                        key={`${titulo}-${index}`}
                        visibleSlides={1}
                        totalSlides={imagens.length}
                        naturalSlideWidth={200}
                        naturalSlideHeight={200}
                        interval={3000}
                        infinite={true}
                    >
                        <SlideImage images={imagens} titulo={titulo} descricao={descricao} />
                    </CarouselProvider>
                </div>
            ))}
            {paginasTotal > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '10px', paddingTop: '10px' }}>
                    <Pagination count={paginasTotal} page={pageIndex} onChange={handleChange} size="large" />
                </div>
            )}
            <div className='citation' data-aos={isSmallScreen ? "fade-up" : "fade-right"}>
                <div className='content2'>
                    <p><q>As coisas mais belas são ditadas pela loucra e escritas pela razão</q></p>
                    <p className='author'>- André Gide</p>
                </div>
            </div>
        </div>
    );
};

export default Extras;
