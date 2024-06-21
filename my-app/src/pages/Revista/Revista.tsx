import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './Revista.css';
import Switch from '@mui/material/Switch';
import Revista2 from './Revista2';
import pdf from './revista.pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Revista = () => {
  const [numPages, setNumPages] = useState<number>();
  const [type, setType] = useState<boolean>(true);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.checked);
  };

  return (
    <div className="Revista">
      <div className='pdf-container'>
        <Revista2></Revista2>
      </div>
    </div>
  )
};

export default Revista;
