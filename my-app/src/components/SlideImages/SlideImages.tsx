import React, { useState, useEffect, useContext, useRef } from "react";
import './SlideImages.css';
import { Slider, Slide, ButtonBack, ButtonNext, CarouselContext } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Typography, useMediaQuery } from '@mui/material';
import { VideoPlayer, VideoPlayerProps } from "@graphland/react-video-player";

interface Slide {
    url: string;
}

interface SlideImagesProps {
    images: Slide[];
    titulo: string;
    descricao: string;
}

const SlideImages: React.FC<SlideImagesProps> = ({ images, titulo, descricao }) => {
    const [slideIndex, setSlideIndex] = useState<number>(0);
    const carouselContext = useContext(CarouselContext);
    const isSmallScreen = useMediaQuery('(max-width: 900px)');

    useEffect(() => {
        const onChange = () => {
            const { currentSlide } = carouselContext.state;
            setSlideIndex(currentSlide);
        };

        carouselContext.subscribe(onChange);
        return () => carouselContext.unsubscribe(onChange);
    }, [carouselContext]);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [imageSize, setImageSize] = useState(500);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        if (windowWidth > 480) {
            setImageSize(600);
        } else {
            setImageSize(320);
        }
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [windowWidth]);



    const renderMedia = (url: string, index: number) => {

        const extension = url.split(".").pop()?.toLowerCase();
        if (extension === "jpg" || extension === "jpeg" || extension === "png" || extension === "gif") {
            return (
                <div className="media-container">
                    <img src={url} alt="" className="media-content" />
                </div>
            );
        } else if (extension === "mp4") {
            return (
                <div className="media-container">
                    <VideoPlayer
                    
                        height={isSmallScreen? 300 :610}
                        isFluid
                        playbackRates={[0.5, 1, 1.5, 2]}
                        sources={[{ src: url, type: 'video/mp4' }]}
                        theme="fantasy"
                        width={310}
                        
                    />
                </div>
            );
        } else {
            return null;
        }
    };

    return (
        <div className="SlideImage" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div className="title" style={{ marginTop: isSmallScreen ? '8%' : '2.5%', textAlign: "center" }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: isSmallScreen ? '1.8rem' : '2.125rem', }} gutterBottom>
                    {titulo}
                </Typography>
            </div>
            <div style={{ position: 'relative', width: `${imageSize}px`, height: `${imageSize}px`, marginTop: "10px" }}>
                <Slider className={"slider"}>
                    {images.map((slide, index) => (
                        <Slide index={index} key={index}>
                            <div className="slide-content">
                                {renderMedia(slide.url, index)}
                            </div>
                        </Slide>
                    ))}
                </Slider>
                <ButtonBack style={{ ...arrowButtonStyle, left: 0 }}>
                    <ArrowBackIosIcon />
                </ButtonBack>
                <ButtonNext style={{ ...arrowButtonStyle, right: 0 }}>
                    <ArrowForwardIosIcon />
                </ButtonNext>
            </div>
            <div className="descricao">
                <Typography variant="h6" gutterBottom sx={{ whiteSpace: 'pre-line', fontSize: isSmallScreen ? '1.0rem' : '1.25rem', }}>
                    {descricao}
                </Typography>
            </div>
        </div>
    );
};

const arrowButtonStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    border: 'none',
    cursor: 'pointer',
    padding: '10px',
    zIndex: 2,
};

export default SlideImages;
