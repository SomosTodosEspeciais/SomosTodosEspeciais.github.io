import React, { useState } from 'react';
import './Contactos.css';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';

import emailjs from '@emailjs/browser';
import { Box, Button, TextField, Typography, useMediaQuery } from '@mui/material';

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InputAdornment from '@mui/material/InputAdornment';

import { SERVICE_ID, TEMPLATE_ID, PUBLICKEY } from '../../var'
import Close from '../../assets/close.png'
import { SnackbarKey, SnackbarProvider, closeSnackbar, enqueueSnackbar } from 'notistack';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { MailOutlineOutlined } from '@mui/icons-material';



const Contactos = () => {

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const [error, setError] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string>("");


    const [errorMail, setErrorMail] = useState<boolean>(false);
    const [ErrorTextMail, setErrorTextMail] = useState<string>("");

    const [errorMessage, setErrorMessage,] = useState<boolean>(false);
    const [ErrorTextMessage, setErrorTextMessage] = useState<string>("");

    const isSmallScreen = useMediaQuery('(max-width: 900px)');

    // Função para validar o nome (por exemplo)
    const validateName = (value: string) => {
        if (value.trim().length == 0) {
            setErrorText('É Obrigatório Preencher o Nome');
            setError(true);
        } else {
            setError(false);
            setErrorText("");
        }
    };

    const validateMail = (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value.trim().length === 0) {

            setErrorTextMail('É Obrigatório Preencher o email');
            setErrorMail(true);
        } else if (!emailRegex.test(value)) {

            setErrorTextMail('Email inválido: o formato correto é "exemplo@dominio.com"');
            setErrorMail(true);
        } else {

            setErrorMail(false);
            setErrorTextMail('');
        }
    };
    const validateMessage = (value: string) => {
        if (value.trim().length == 0) {
            setErrorTextMessage('É Obrigatório Preencher a Mensagem');
            setErrorMessage(true);
        } else {
            setErrorMessage(false);
            setErrorTextMessage("");
        }
    };


    const actionSave = (snackbarId: SnackbarKey | undefined) => (
        <>
            <img src={Close} className='close-image' onClick={() => { closeSnackbar(snackbarId) }}></img>
        </>
    );

    const actionErrorInfo = (snackbarId: SnackbarKey | undefined) => (
        <>
            <img src={Close} className='close-image' onClick={() => { closeSnackbar(snackbarId) }}></img>
        </>
    );


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const templateParams = {
            from_name: name,
            from_email: email,
            message: message,
        };

        validateName(name)
        validateMail(email)
        validateMessage(message)


        if (!error && !errorMail && !errorMessage) {

            emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                templateParams,
                PUBLICKEY
            )
                .then((response) => {
                    setName('');
                    setEmail('');
                    setMessage('');
                    enqueueSnackbar(
                        <Typography
                            fontFamily={"Open Sans Variable"}
                            fontWeight={400}
                            fontSize={"14px"}
                            lineHeight={"20.02px"}
                        >
                            Email enviado com sucesso
                        </Typography>
                        , {
                            action: actionSave,
                            variant: 'success',
                            autoHideDuration: 10000
                        });
                })
                .catch((e) => {
                    if (!error && !errorMail && !errorMessage) {
                        enqueueSnackbar(
                            <Typography
                                fontFamily={"Open Sans Variable"}
                                fontWeight={400}
                                fontSize={"14px"}
                                lineHeight={"20.02px"}
                            >
                                Erro ao enviar o e-mail, tente novamente mais tarde
                            </Typography>
                            , {
                                action: actionErrorInfo,
                                variant: 'error',
                                autoHideDuration: 10000
                            });
                    }
                });
        }
    };


    return (
        <>
            <div className='Contactos'>
                <SnackbarProvider classes={{ root: 'snackbarMaxWidth' }} maxSnack={4} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant='info' autoHideDuration={null} hideIconVariant={true} >

                    <div className='header'>
                        <h1>Contactos</h1>
                    </div>
                    <div className='content'>
                        <div className='infos'>
                            <div className='dados'>
                                <h2>Contactos</h2>
                                <div className='dado'>
                                    <Box
                                        sx={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: 40,
                                                height: 40,
                                                borderRadius: '50%',
                                                backgroundColor: 'yellow',
                                                marginRight: 1,
                                            }}
                                        >
                                            <EmailOutlinedIcon />
                                        </Box>
                                        <Typography variant="body1">somotodosespeciais@gmail.com</Typography>
                                    </Box>

                                </div>

                                <div className='dado'>
                                    <Box
                                        sx={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: 40,
                                                height: 40,
                                                borderRadius: '50%',
                                                backgroundColor: 'yellow',
                                                marginRight: 1, // Espaço entre o círculo e o texto
                                            }}
                                        >
                                            <LocalPhoneOutlinedIcon />
                                        </Box>
                                        <Typography variant="body1">Número de Telemovel</Typography>
                                    </Box>
                                </div>

                            </div>
                            <div className='slogans'>
                                <Typography variant="body1" sx={{ fontFamily: '"Dancing Script", cursive;', fontWeight: "700", fontSize: isSmallScreen ? '18px' : '16px' }}>
                                    SE AS FLORES SÃO DIFERENTES, E TODAS ELAS BELAS, PORQUE OS
                                    SERES HUMANOS NÃO VEEM BELEZA NA SUA DIFERENÇA?
                                </Typography>
                                <Typography variant="body1" sx={{ marginTop: "25px", fontFamily: '"Dancing Script", cursive;', fontWeight: "700", fontSize: isSmallScreen ? '18px' : '16px' }} >
                                    SE AS PEÇAS DE UM PUZZLE PRECISAM DE SER TODAS DIFERENTES
                                    PARA ENCAIXAR, PORQUE TEMOS DE SER TODOS IGUAIS PARA ENCAIXAR NA
                                    SOCIEDADE?
                                </Typography>

                            </div>
                            <div className='redesSociais'>
                                <h2>Redes Sociais</h2>
                                <div className='redes'>
                                    <a href="https://www.instagram.com/todossomosespeciais23/" target="_blank" rel="noopener noreferrer" >
                                        <InstagramIcon style={{ color: '#E1306C', fontSize: 40 }} />
                                    </a>
                                    <a href="https://www.facebook.com/profile.php?id=100094503303826" target="_blank" rel="noopener noreferrer">
                                        <FacebookIcon style={{ color: '#1877F2', fontSize: 40 }} />
                                    </a>
                                    <a href="https://www.youtube.com/@TodosSomosEspeciais" target="_blank" rel="noopener noreferrer">
                                        <YouTubeIcon style={{ color: '#FF0000', fontSize: 40 }} />
                                    </a>
                                </div>

                            </div>


                        </div>
                        <div className='mail'>
                            <Box sx={{ maxWidth: 500, mt: 0, paddingY: isSmallScreen ? '15px' : '0pc' }}>
                                <div style={{ textAlign: isSmallScreen ? 'center' : 'left', marginTop: "0px" }}>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: isSmallScreen ? '26px' : '2.125rem' }} gutterBottom>Entre em Contato Conosco</Typography>
                                </div>
                                <Typography variant="h6" sx={{ fontSize: isSmallScreen ? '18px' : '16px' }} gutterBottom>Estamos aqui para incluir novas ideias, sugestões e pessoas!! Preencha o formulário abaixo e envie-nos a sua mensagem 🌻.</Typography>
                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        fullWidth
                                        label="Nome"
                                        variant="outlined"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        margin="normal"

                                        error={!!error}
                                        helperText={errorText}

                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonOutlineOutlinedIcon />
                                                </InputAdornment>
                                            ),
                                        }}

                                    />


                                    <TextField
                                        fullWidth
                                        label="Email"
                                        variant="outlined"
                                        sx={{ fontSize: isSmallScreen ? '10px' : '16px' }}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        margin="normal"
                                        error={!!errorMail}
                                        helperText={ErrorTextMail}

                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <MailOutlineOutlined />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Mensagem"
                                        variant="outlined"
                                        multiline
                                        rows={4}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        margin="normal"
                                        error={!!errorMessage}
                                        helperText={ErrorTextMessage}
                                        sx={{ fontSize: isSmallScreen ? '10px' : '16px' }}

                                    />
                                    <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
                                        Enviar
                                    </Button>
                                </form>

                            </Box>
                        </div>
                    </div>
                </SnackbarProvider>
            </div>
        </>
    )
}
export default Contactos