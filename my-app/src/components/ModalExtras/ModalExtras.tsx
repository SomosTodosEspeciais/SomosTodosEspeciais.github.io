import React, {  } from 'react';
import './ModalExtras.css';
import Close from './../../assets/close.png';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

interface ModalExtrasProps {

    showButtons: boolean;
    onClose: () => void;
    addTema: () => Promise<void>;
    titulo: string;
    height: string;
    buttonDisable?: boolean;
    children?: React.ReactNode;
}

const ModalExtras: React.FC<ModalExtrasProps> = ({ onClose,addTema, titulo, height, buttonDisable, children }) => {

    return (
        <div className={`modal-extra`}>
            <div className="modal-overlay" style={{ height: height }} onClick={onClose}>
                <div className="modal-content-aux" style={{ height: height }} onClick={(e) => e.stopPropagation()}>
                    <div className="modal-title">
                        <Typography variant='h2' sx={{ marginTop: "5px" }}>
                            {titulo}
                        </Typography>
                        <img src={Close} alt='' className="modal-close" onClick={onClose} />
                    </div>
                    <div className='modal-text'>
                        {children}
                    </div>
                    <div className='btn-container'>
                        <Button 
                            sx={{ textTransform: 'uppercase', textAlign:"center" }} 
                            variant="contained" 
                            color='primary' 
                            size='medium'
                            onClick={addTema}
                            disabled={buttonDisable}
                        >
                            <Typography
                                fontFamily={'Roboto'}
                                fontWeight={500}
                                
                                fontSize={"14px"}
                                lineHeight={"24px"}
                                style={{margin:"0"}}
                            >
                               Adicioanr
                            </Typography>
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ModalExtras;
