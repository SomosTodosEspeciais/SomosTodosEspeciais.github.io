import { pdfjs } from 'react-pdf';
import './Revista.css';
import Revista2 from './Revista2';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Revista = () => {

  return (
    <div className="Revista">
      <div className='pdf-container'>
        <Revista2></Revista2>
      </div>
    </div>
  )
};

export default Revista;
