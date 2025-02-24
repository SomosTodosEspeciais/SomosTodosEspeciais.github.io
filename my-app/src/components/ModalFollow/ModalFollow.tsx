import React, { useState } from 'react';
import './ModalFollow.css';
import Close from './../../assets/close.png';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ConfettiExplosion from 'react-confetti-explosion';

interface ModalFollowProps {
    isOpen: boolean;
    showButtons: boolean;
    onClose: () => void;
    onSave: () => void;
    titulo: string;
    height: string;
    buttonDisable?: boolean;
    children?: React.ReactNode;
}

const ModalFollow: React.FC<ModalFollowProps> = ({ isOpen, onClose, titulo, height, children }) => {


    return (
        <div className={`modal-escala-vigor-2 ${isOpen ? 'open' : ''}`}>
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
                        
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default ModalFollow;