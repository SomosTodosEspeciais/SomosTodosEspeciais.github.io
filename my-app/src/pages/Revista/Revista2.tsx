import React, { useState, useEffect, useRef } from 'react';
import { Document, Page } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';
import './Revista2.css';
import { useMediaQuery } from '@mui/material';
import pdf from './revista.pdf';

const Revista2 = () => {
    const [numPages, setNumPages] = useState<number>();
    const flipBookContainerRef = useRef<HTMLDivElement>(null);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    const isSmallScreen = useMediaQuery('(max-width: 900px)');
    let pageWidth = 400;
    let pageHeight = 600;

    if (isSmallScreen) {
        pageWidth = 340;
        pageHeight = 480;
    }

    return (
        <div className="Revista2">
            <div className='header'>
                <h1>Perspetivas da Inclusão em Contexto Escolar</h1>
            </div>

            <Document
                file={pdf}
                onLoadSuccess={onDocumentLoadSuccess}

            >
                <div className="flip-book-container" style={{ overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
                    <HTMLFlipBook
                        width={pageWidth}
                        height={pageHeight}
                        size="stretch"
                        minWidth={pageWidth}
                        maxWidth={pageWidth}
                        minHeight={pageHeight}
                        maxHeight={pageHeight}
                        maxShadowOpacity={0.5}
                        showCover={true}
                        mobileScrollSupport={true}
                        className="flip-book"
                        style={{ display: "flex", justifyContent: 'center' }}
                        startPage={0}
                        drawShadow={true}
                        flippingTime={600}
                        useMouseEvents={true}
                        usePortrait={true}
                        startZIndex={1000}
                        autoSize={true}
                        clickEventForward={true}
                        swipeDistance={30}
                        showPageCorners={false}
                        disableFlipByClick={false}
                    >
                        {Array.from(new Array(numPages || 0), (el, index) => (
                            <div key={`page_${index + 1}`} className="pdf-page">
                                <Page
                                    pageNumber={index + 1}
                                    width={pageWidth}
                                    height={pageHeight}
                                />
                            </div>
                        ))}
                    </HTMLFlipBook>
                </div>
            </Document>
        </div>
    );
};

export default Revista2;
