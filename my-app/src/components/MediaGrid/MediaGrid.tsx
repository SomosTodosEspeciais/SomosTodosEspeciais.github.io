import React from 'react';
import './MediaGrid.css';
import { Typography, useMediaQuery, Checkbox } from '@mui/material';
import { VideoPlayer } from "@graphland/react-video-player";

interface Slide2 {
    url: string;
    type: 'image' | 'video';
    url_original: string;
}

interface MediaGridProps {
    mediaItems: Slide2[];
    titulo: string;
    descricao: string;
    selectedItems: string[];
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}

const MediaGrid: React.FC<MediaGridProps> = ({ mediaItems, titulo, descricao, selectedItems, setSelectedItems }) => {
    const isSmallScreen = useMediaQuery('(max-width: 900px)');

    const handleCheckboxChange = (url_original: string) => {
        setSelectedItems(prevSelectedItems =>
            prevSelectedItems.includes(url_original)
                ? prevSelectedItems.filter(item => item !== url_original)
                : [...prevSelectedItems, url_original]
        );
    };

    const renderMedia = (url: string, type: 'image' | 'video', url_original: string, index: number) => {
        // Verifica se url_original é válido antes de usar como chave
        const key = url_original || index.toString();
    
        return (
            <div className="media-item" key={key}>
                {type === 'image' ? (
                    <img src={url} alt="" className="media-content" />
                ) : (
                    <VideoPlayer
                        height={isSmallScreen ? 150 : 300}
                        isFluid
                        playbackRates={[0.5, 1, 1.5, 2]}
                        sources={[{ src: url, type: 'video/mp4' }]}
                        theme="fantasy"
                        width={isSmallScreen ? 150 : 300}
                    />
                )}
                <Checkbox
                    className="checkbox-container"
                    checked={selectedItems.includes(url_original)}
                    onChange={() => handleCheckboxChange(url_original)}
                />
            </div>
        );
    };

    return (
        <div className="media-grid">
            <div className="title" style={{ marginTop: isSmallScreen ? '8%' : '2.5%', textAlign: "center" }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: isSmallScreen ? '1.8rem' : '2.125rem' }} gutterBottom>
                    {titulo}
                </Typography>
            </div>
            <div className="media-items-container">
                {mediaItems && mediaItems.map((item, index) => renderMedia(item.url, item.type, item.url_original, index))}
            </div>
            <div className="descricao">
                <Typography variant="h6" gutterBottom sx={{ whiteSpace: 'pre-line', fontSize: isSmallScreen ? '1.0rem' : '1.25rem' }}>
                    {descricao}
                </Typography>
            </div>
        </div>
    );
};
export default MediaGrid;
