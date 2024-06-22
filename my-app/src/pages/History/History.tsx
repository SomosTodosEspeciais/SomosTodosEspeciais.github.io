import './History.css'
import { useMediaQuery } from '@mui/material';


const History = () => {

    const isSmallScreen = useMediaQuery('(max-width: 900px)');

    return (
        <>
            <div className='History'>
                <div className='header'>
                    <h1>Origens e Inspiração</h1>
                </div>
                <div className='content'>
                    <div className={isSmallScreen ? "" : 'origens'}>
                        
                        <p>No dia 4 de Julho de 2023, marcou-se o nascimento desta iniciativa revolucionária com a realização da revista inaugural "Todos Somos Especiais - Perspetivas da Inclusão em Contexto Escolar". Este evento emblemático não apenas sinalizou o início de uma jornada significativa, mas também estabeleceu os alicerces para uma missão extraordinária que transcende os limites convencionais da atuação social.</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default History