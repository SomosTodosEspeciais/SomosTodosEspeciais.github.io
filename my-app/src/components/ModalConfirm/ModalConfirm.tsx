import React, { } from 'react';
import './ModalConfirm.css';
import Close from './../../assets/close.png';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

interface ModalConfirmProps {

    showButtons: boolean;
    onClose: () => void;
    deleteTema: () => Promise<void>;
    titulo: string;
    height: string;
    buttonDisable?: boolean;
    children?: React.ReactNode;
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({ onClose, deleteTema, titulo, height, buttonDisable, children }) => {

    return (
        <div className={`modal-confirm`}>
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
                        <Button sx={{ textTransform: 'uppercase' }} color='primary' size='medium' onClick={onClose}>
                            <Typography
                                fontFamily={'Roboto'}
                                fontWeight={500}
                                fontSize={"14px"}
                                lineHeight={"24px"}
                                letterSpacing={"0.4px"}
                            >
                                Cancelar
                            </Typography>
                        </Button>
                        <Button sx={{ textTransform: 'uppercase' }} color='primary' size='medium' onClick={deleteTema} >
                            <Typography
                                fontFamily={'Roboto'}
                                fontWeight={500}
                                fontSize={"14px"}
                                lineHeight={"24px"}
                                letterSpacing={"0.4px"}
                                
                            >
                                Eliminar
                            </Typography>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirm;
