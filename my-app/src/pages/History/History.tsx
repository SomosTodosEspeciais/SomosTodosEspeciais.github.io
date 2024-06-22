import './History.css'
import { useMediaQuery } from '@mui/material';
import Biblioteca from '../../assets/bib-barcelos.jpg'

import { Box, Typography } from '@mui/material';

interface ImageWithCaptionProps {
  src: string;
  alt: string;
  caption: string;
}

const History = () => {

    const isSmallScreen = useMediaQuery('(max-width: 900px)');

    return (
        <>
            <div className='History'>
                <div className='header'>
                    <h1>Origens e Inspiração</h1>
                </div>
                <div className='content'>


                    <p>No dia 4 de Julho de 2023, marcou-se o nascimento desta iniciativa revolucionária com a realização da revista inaugural "Todos Somos Especiais - Perspetivas da Inclusão em Contexto Escolar", exposta na biblioteca municipal de Barcelos. Este evento emblemático não apenas sinalizou o início de uma jornada significativa, mas também estabeleceu os alicerces para uma missão extraordinária que transcende os limites convencionais da atuação social.</p>
                    <Box textAlign="center" sx={{marginBottom:isSmallScreen ? "20px":"50px"}}>
                        <img src={Biblioteca} alt={""} style={{ maxWidth: '100%' }} />
                        <Typography variant="caption" display="block" marginTop={1}>
                            {"Biblioteca Municipal de Barcelos"}
                        </Typography>
                    </Box>

                    <p>No coração do distrito de Braga, um grupo diversificado de jovens apaixonados, provenientes de diferentes áreas de formação, uniu-se em prol de uma causa comum: a promoção da inclusão e a transformação de realidades. Movidos por uma visão compartilhada de um mundo mais justo e igualitário, esses jovens visionários deram vida a uma iniciativa sem precedentes: um grupo promotor de entreajuda e mudança, que tece uma aliança única entre Ação Comunitária e Solidariedade.</p>


                </div>
            </div>
        </>
    )
}
export default History