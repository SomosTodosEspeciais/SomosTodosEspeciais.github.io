import React, { useEffect, useState } from "react";
import SlideImage from '../../components/SlideImages/SlideImages';
import '../../components/SlideImages/SlideImages.css';
import './Extras.css';
import { CarouselProvider } from "pure-react-carousel";
import Pagination from '@mui/material/Pagination';

const Extras = () => {
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
        
        { url: require('../../assets/extra-feira-0.mp4') },
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
        { titulo: "Feirinha", imagens: images2, descricao: descricaoRevista },
        { titulo: "Reunião do Todos Somos Especiais", imagens: images6, descricao: descricaoRevista },
        { titulo: "Estilo Todos somos especiais", imagens: images7, descricao: "" },
    ];

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

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [imageSize, setImageSize] = useState(200);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
        if (windowWidth < 400) {
            setImageSize(200);
        } else {
            setImageSize(800);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [windowWidth]);

    useEffect(() => {
        const startIndex = (pageIndex - 1) * atividadesPorPagina;
        const endIndex = startIndex + atividadesPorPagina;
        setShowExtras(atividades.slice(startIndex, endIndex));
    }, [pageIndex]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPageIndex(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className='Extras'>
            <div className='header'>
                <h1>Extras</h1>
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
                        <SlideImage images={imagens} titulo={titulo} descricao={descricao}  />
                    </CarouselProvider>
                </div>
            ))}
            {paginasTotal > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '10px', paddingTop: '10px' }}>
                    <Pagination count={paginasTotal} page={pageIndex} onChange={handleChange} size="large" />
                </div>
            )}
        </div>
    );
};

export default Extras;
