import './History.css'
import { useMediaQuery } from '@mui/material';
import Biblioteca from '../../assets/bib-barcelos.jpg'

const History = () => {

    const isSmallScreen = useMediaQuery('(max-width: 900px)');

    return (
        <>
            <div className='History'>
                <div className='header'>
                    <h1>Origens e Inspiração</h1>
                </div>
                <div className='content'>
                    
                        
                        <p>No dia 4 de Julho de 2023, marcou-se o nascimento desta iniciativa revolucionária com a realização da revista inaugural "Todos Somos Especiais - Perspetivas da Inclusão em Contexto Escolar". Este evento emblemático não apenas sinalizou o início de uma jornada significativa, mas também estabeleceu os alicerces para uma missão extraordinária que transcende os limites convencionais da atuação social.</p>
                        <img src={Biblioteca}/>
                        
                        <p>No coração do distrito de Braga, um grupo diversificado de jovens apaixonados, provenientes de diferentes áreas de formação, uniu-se em prol de uma causa comum: a promoção da inclusão e a transformação de realidades. Movidos por uma visão compartilhada de um mundo mais justo e igualitário, esses jovens visionários deram vida a uma iniciativa sem precedentes: um grupo promotor de entreajuda e mudança, que tece uma aliança única entre Ação Comunitária e Solidariedade.</p>

                  
                </div>
            </div>
        </>
    )
}
export default History