import React, { useState } from 'react';
import './Modal.css';
import Close from './../../assets/close.png';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ConfettiExplosion from 'react-confetti-explosion';

interface ModalProps {
    isOpen: boolean;
    showButtons: boolean;
    onClose: () => void;
    onSave: () => void;
    titulo: string;
    height: string;
    buttonDisable?: boolean;
    children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, titulo, onSave, height, buttonDisable, children }) => {
    const [isExploding1, setIsExploding1] = useState<boolean>(false);
    const [isExploding2, setIsExploding2] = useState<boolean>(false);
    const [isExploding3, setIsExploding3] = useState<boolean>(false);
    const [isExploding4, setIsExploding4] = useState<boolean>(false);
    const [isExploding5, setIsExploding5] = useState<boolean>(false);
    const [positions, setPositions] = useState<{ top: string; left: string }[]>([]);

    const generateRandomPosition = () => {
        const top = `${20 + Math.random() * 60}%`;  // Generate a number between 20 and 80
        const left = `${20 + Math.random() * 60}%`; // Generate a number between 20 and 80
        return { top, left };
    };

    const handleButtonClick = () => {
        const newPositions = Array(5).fill(null).map(() => generateRandomPosition());
        setPositions(newPositions);

        setIsExploding1(true);
        setTimeout(() => setIsExploding1(false), 8000); // Confetti explosion duration

        setTimeout(() => {
            setIsExploding2(true);
            setIsExploding4(true);
            setTimeout(() => {
                setIsExploding2(false);
                setIsExploding4(false);
            }, 8000); // Confetti explosion duration
        }, 1000); 

        setTimeout(() => {
            setIsExploding3(true);
            setIsExploding5(true);
            setTimeout(() => {
                setIsExploding3(false);
                setIsExploding5(false);
            }, 8000); // Confetti explosion duration
        }, 500); // Delay for the third explosion
    };

    return (
        <div className={`modal-escala-vigor ${isOpen ? 'open' : ''}`}>
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
                            onClick={handleButtonClick}
                            disabled={buttonDisable}
                        >
                            <Typography
                                fontFamily={'Roboto'}
                                fontWeight={500}
                                fontSize={"14px"}
                                lineHeight={"24px"}
                                style={{margin:"0"}}
                            >
                                Dar Parabéns
                            </Typography>
                        </Button>
                    </div>
                </div>
                <div className="confetti-container">
                    {isExploding1 && (
                        <div className="confetti" style={positions[0]}>
                            <ConfettiExplosion zIndex={1200} />
                        </div>
                    )}
                    {isExploding2 && (
                        <div className="confetti" style={positions[1]}>
                            <ConfettiExplosion zIndex={1200} />
                        </div>
                    )}
                    {isExploding3 && (
                        <div className="confetti" style={positions[2]}>
                            <ConfettiExplosion zIndex={1200} />
                        </div>
                    )}
                    {isExploding4 && (
                        <div className="confetti" style={positions[3]}>
                            <ConfettiExplosion zIndex={1200} />
                        </div>
                    )}
                    {isExploding5 && (
                        <div className="confetti" style={positions[4]}>
                            <ConfettiExplosion zIndex={1200} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
