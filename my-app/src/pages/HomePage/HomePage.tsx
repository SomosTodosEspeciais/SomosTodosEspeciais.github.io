import './HomePage.css'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';

import flower1 from '../../assets/flores-1.png'; // Importe imagens das flores
import flower2 from '../../assets/flores-2.png';
import flower3 from '../../assets/flores-3.png';
import Flower from '../../components/Flower/Flower';
import { Key, useEffect, useState } from 'react';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  textAlign: 'center',
  color: theme.palette.text.primary,
}));


interface FlowerPosition {
  src: string;
  top: string;
  left: string;
}


const HomePage = () => {

  const isSmallScreen = useMediaQuery('(max-width: 900px)');
  const [flowers, setFlowers] = useState<FlowerPosition[]>([]);
  
  useEffect(() => {
    const calculateFlowerPositions = () => {
      const homePageElement = document.querySelector('.HomePage') as HTMLElement | null;
      if (!homePageElement) return [];

      const { offsetWidth, offsetHeight } = homePageElement;

      const calculatedFlowers = [
        // Flower 1
        { src: flower1, top: `${offsetHeight * 0.08}px`, left: `${offsetWidth * 0.001}px` },
        { src: flower1, top: `${offsetHeight * 0.2}px`, left: `${offsetWidth * 0.07}px` },
        { src: flower1, top: `${offsetHeight * 0.5}px`, left: `${offsetWidth * 0.9}px` },
        { src: flower1, top: `${offsetHeight * 0.7}px`, left: `${offsetWidth * 0.97}px` },
        { src: flower1, top: `${offsetHeight * 0.95}px`, left: `${offsetWidth * 0.05}px` },

        // Flower 2
        { src: flower2, top: `${offsetHeight * 0.15}px`, left: `${offsetWidth * 0.02}px` },
        { src: flower2, top: `${offsetHeight * 0.4}px`, left: `${offsetWidth * 0.9}px` },
        { src: flower2, top: `${offsetHeight * 0.6}px`, left: `${offsetWidth * 0.05}px` },
        { src: flower2, top: `${offsetHeight * 0.8}px`, left: `${offsetWidth * 0.93}px` },
        { src: flower2, top: `${offsetHeight * 0.99}px`, left: `${offsetWidth * 0.06}px` },

        // Flower 3
        { src: flower3, top: `${offsetHeight * 0.25}px`, left: `${offsetWidth * 0.05}px` },
        { src: flower3, top: `${offsetHeight * 0.55}px`, left: `${offsetWidth * 0.92}px` },
        { src: flower3, top: `${offsetHeight * 0.75}px`, left: `${offsetWidth * 0.02}px` },
        { src: flower3, top: `${offsetHeight * 0.85}px`, left: `${offsetWidth * 0.95}px` },
        { src: flower3, top: `${offsetHeight * 0.98}px`, left: `${offsetWidth * 0.03}px` },
      ];

      setFlowers(calculatedFlowers);
    };

    calculateFlowerPositions();
  }, []);





  return (
    <>
      <div className='HomePage'>
        {flowers.map((flower: { src: string; top: string; left: string; }, index: Key | null | undefined) => (
          <Flower key={index} src={flower.src} top={flower.top} left={flower.left} />
        ))}
        <div className='lateral-left'></div>
        <div className='content'>
          <div style={{ textAlign: "center" }}>
            <h1>Inclusão em Ação: Uma Jornada de Transformação através da Ação Comunitária e Solidariedade</h1>

          </div>
          <p>No coração do distrito de Braga, um grupo diversificado de jovens apaixonados, provenientes de diferentes áreas de formação, uniu-se em prol de uma causa comum: a promoção da inclusão e a transformação de realidades. Movidos por uma visão compartilhada de um mundo mais justo e igualitário, esses jovens visionários deram vida a uma iniciativa sem precedentes: um grupo promotor de entreajuda e mudança, que tece uma aliança única entre Ação Comunitária e Solidariedade.</p>

          <div style={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", gap: "10px", textAlign: "center", marginBottom: "10px" }}>
            <div className={isSmallScreen ? "" : 'origens'}>
              <h2>Origens e Inspiração</h2>
              <p>No dia 4 de Julho de 2023, marcou-se o nascimento desta iniciativa revolucionária com a realização da revista inaugural "Todos Somos Especiais - Perspetivas da Inclusão em Contexto Escolar". Este evento emblemático não apenas sinalizou o início de uma jornada significativa, mas também estabeleceu os alicerces para uma missão extraordinária que transcende os limites convencionais da atuação social.</p>

            </div>
            <div className={isSmallScreen ? "" : 'missao'}>
              <h2>Missão: Rumo a um Mundo Mais Inclusivo</h2>
              <p>A nossa missão é clara e urgente: trabalhar incansavelmente para promover a inclusão em todas as suas formas, desafiando estereótipos, quebrando barreiras e construindo pontes de compreensão e empatia. Através da sinergia entre Ação Comunitária e Solidariedade, aspiramos não apenas a sensibilizar, mas também a inspirar ação concreta em direção a uma sociedade mais justa e acolhedora para todos.</p>

            </div>

          </div>

          <h3>Objetivos e Valores</h3>
          <ul>
            <li><strong>Objetivo Geral:</strong> Fomentar uma cultura de inclusão e diversidade em todos os âmbitos da sociedade, com ênfase especial na ação comunitária e na solidariedade como ferramentas de transformação social.</li>
            <li><strong>Objetivos Específicos:</strong>
              <ul>
                <li>Sensibilizar e educar a comunidade sobre a importância da inclusão e da valorização da diversidade.</li>
                <li>Promover o acesso equitativo à educação e às oportunidades para todos os membros da sociedade, independentemente de suas origens ou condições.</li>
                <li>Capacitar os jovens para se tornarem agentes de mudança, incentivando-os a usar suas habilidades e paixões para promover o bem comum.</li>
                <li>Estimular o diálogo intercultural e a colaboração entre diferentes grupos e comunidades, visando à construção de sociedades mais coesas e solidárias.</li>
              </ul>
            </li>

          </ul>

          <div className='valores'>
            <div className='title' style={{ textAlign: "center" }}>
              <h1>Os Nossos Valores</h1>
            </div>

            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <StyledPaper sx={{ my: 1, p: 2, height: 250,backgroundColor: '#c92a40', }}>
                    <Typography variant="h1" gutterBottom fontWeight={700}>
                      Inclusão
                    </Typography>
                    <Typography>
                      Acreditamos na dignidade e no valor intrínseco de cada indivíduo, independentemente de suas características ou circunstâncias
                    </Typography>
                  </StyledPaper>
                </Grid>
                <Grid item>
                  <StyledPaper sx={{ my: 1, p: 2, height: 250,backgroundColor: '#ffff99', }}>
                    <Typography variant="h1" gutterBottom fontWeight={700}>
                      Empatia
                    </Typography>
                    <Typography>
                      Comprometemo-nos a ouvir e compreender as experiências e perspectivas dos outros, cultivando um ambiente de respeito mútuo e compaixão
                    </Typography>
                  </StyledPaper>
                </Grid>
                <Grid item>
                  <StyledPaper sx={{ my: 1, p: 2, height: 250 ,backgroundColor: 'rgba(28,133,181,255)',}}>
                    <Typography variant="h1" gutterBottom fontWeight={700}>
                      Criatividade                    </Typography>
                    <Typography>
                      Reconhecemos o poder transformador da arte e da expressão criativa como ferramentas para a mudança social e pessoal
                    </Typography>
                  </StyledPaper>
                </Grid>
                <Grid item>
                  <StyledPaper sx={{ my: 1, p: 2, height: 250,backgroundColor: '#e2b126', }}>
                    <Typography variant="h1" gutterBottom fontWeight={700}>
                      Colaboração
                    </Typography>
                    <Typography>
                      Valorizamos a colaboração e o trabalho em equipe como meios eficazes para alcançar nossos objetivos e ampliar nosso impacto na comunidade
                    </Typography>
                  </StyledPaper>
                </Grid>
                <Grid item>
                  <StyledPaper sx={{ my: 1, p: 2, height: 250,backgroundColor: '#b787b7', }}>
                    <Typography variant="h1" gutterBottom fontWeight={700}>
                      Compromisso
                    </Typography>
                    <Typography>
                      Mantemos-nos firmes em nosso compromisso de agir com integridade, dedicação e determinação em busca de um mundo mais inclusivo e justo para todos
                    </Typography>
                  </StyledPaper>
                </Grid>
              </Grid>
            </Box>
          </div>

          <p style={{ marginTop: "50px", marginBottom: "0px" }}>Em resumo, estamos comprometidos em desafiar o status quo, inspirar a esperança e fazer a diferença, um passo de cada vez, em direção a um futuro onde a inclusão não seja apenas uma ideia, mas sim uma realidade tangível para todos. Junte-se a nós nesta jornada emocionante de transformação e descubra como, juntos, podemos criar um mundo mais inclusivo, acolhedor e compassivo para todos os seres humanos. 🌻</p>
        </div>
        <div className='lateral-right'> </div>

      </div>
    </>
  )
}
export default HomePage