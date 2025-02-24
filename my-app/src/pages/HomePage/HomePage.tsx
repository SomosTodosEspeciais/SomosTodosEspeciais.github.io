import './HomePage.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';
import flower1 from '../../assets/flores-1.png';
import flower2 from '../../assets/flores-2.png';
import flower3 from '../../assets/flores-3.png';
import Flower from '../../components/Flower/Flower';
import { Key, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Modal from '../../components/Modal/Modal';
import ModalFollow from '../../components/ModalFollow/ModalFollow';
import Hoya from '../../assets/hoya.jpg'
import Hernani from '../../assets/hernani.jpg'

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
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const [isModalOpen2, setIsModalOpen2] = useState(true);

  const closeModal2 = () => {
    setIsModalOpen2(false);
  };


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

      const calculatedFlowersPhone = [
        // Flower 1
        { src: flower1, top: `${offsetHeight * 0.02}px`, left: `-${offsetWidth * 0.020}px` },
        { src: flower1, top: `${offsetHeight * 0.2}px`, left: `-${offsetWidth * 0.03}px` },
        { src: flower1, top: `${offsetHeight * 0.5}px`, left: `${offsetWidth * 0.9}px` },
        { src: flower1, top: `${offsetHeight * 0.7}px`, left: `${offsetWidth * 0.90}px` },
        { src: flower1, top: `${offsetHeight * 0.95}px`, left: `-${offsetWidth * 0.05}px` },

        // Flower 2
        { src: flower2, top: `${offsetHeight * 0.15}px`, left: `-${offsetWidth * 0.02}px` },
        { src: flower2, top: `${offsetHeight * 0.4}px`, left: `${offsetWidth * 0.9}px` },
        { src: flower2, top: `${offsetHeight * 0.6}px`, left: `-${offsetWidth * 0.05}px` },
        { src: flower2, top: `${offsetHeight * 0.8}px`, left: `${offsetWidth * 0.90}px` },
        { src: flower2, top: `${offsetHeight * 0.99}px`, left: `${offsetWidth * 0.90}px` },

        // Flower 3
        { src: flower3, top: `${offsetHeight * 0.25}px`, left: `${offsetWidth * 0.90}px` },
        { src: flower3, top: `${offsetHeight * 0.55}px`, left: `${offsetWidth * 0.92}px` },
        { src: flower3, top: `${offsetHeight * 0.75}px`, left: `-${offsetWidth * 0.028}px` },
        { src: flower3, top: `${offsetHeight * 0.85}px`, left: `${offsetWidth * 0.93}px` },
        { src: flower3, top: `${offsetHeight * 0.98}px`, left: `-${offsetWidth * 0.03}px` },
      ];

      if (isSmallScreen) {
        setFlowers(calculatedFlowersPhone);
      } else {
        setFlowers(calculatedFlowers);
      }
    };

    calculateFlowerPositions();
  }, [isSmallScreen]);


  const data = {
    generalObjective: 'Fomentar uma cultura de inclusão e diversidade em todos os âmbitos da sociedade, com ênfase especial na ação comunitária e na solidariedade como ferramentas de transformação social.',
    specificObjectives: [
      'Sensibilizar e educar a comunidade sobre a importância da inclusão e da valorização da diversidade.',
      'Promover o acesso equitativo à educação e às oportunidades para todos os membros da sociedade, independentemente das suas origens ou condições.',
      'Capacitar os jovens para se tornarem agentes de mudança, incentivando-os a usar as suas habilidades e paixões para promover o bem comum.',
      'Estimular o diálogo intercultural e a colaboração entre diferentes grupos e comunidades, visando à construção de sociedades mais coesas e solidárias.',
    ],
    cores: [
      '#FCFCD5', '#FCFCD5', '#FCFCD5', 'FCFCD5'

    ]
  };


  return (
    <div className="HomePage">

      <div className="lateral-left"></div>

      <div className="content">
        <div style={{ textAlign: "center" }}>
          <h1>Inclusão em Ação: Uma Jornada de Transformação através da Ação Comunitária e Solidariedade</h1>
        </div>
        <p style={{ marginTop: "10px", marginBottom: "60px" }}>
          Estamos comprometidos em desafiar o status quo, inspirar a esperança e fazer a diferença, um passo de cada vez, em direção a um futuro onde a inclusão não seja apenas uma ideia, mas sim uma realidade tangível para todos. Junte-se a nós nesta jornada emocionante de transformação e descubra como, juntos, podemos criar um mundo mais inclusivo, acolhedor e compassivo para todos os seres humanos. 🌻
        </p>

        <div style={{ marginBottom: "50px" }}>
          <div className="title" style={{ textAlign: "center" }}>
            <h1>Missão</h1>
          </div>

          <TableContainer component={Paper} style={{ margin: '20px auto', maxWidth: isSmallScreen ? "100%" : '50%' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={2} style={{ backgroundColor: '#D7B8DA', textAlign: 'center', border: '1px groove black' }}>
                    <Typography variant="h1" fontWeight={700} >
                      Rumo a um Mundo Mais Inclusivo
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell style={{ backgroundColor: '#FCFCD5', border: '1px groove black' }}>
                    <Typography>
                      A nossa missão é clara e urgente: trabalhar incansavelmente para promover a inclusão em todas as suas formas, desafiando estereótipos, quebrando barreiras e construindo pontes de compreensão e empatia. Através da sinergia entre Ação Comunitária e Solidariedade, aspiramos não apenas a sensibilizar, mas também a inspirar ação concreta em direção a uma sociedade mais justa e acolhedora para todos.
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className='objetivos'>
          <div className="title" style={{ textAlign: "center" }}>
            <h1>Objetivos</h1>
          </div>


          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ backgroundColor: '#9999CC', border: "1px groove black" }}>
                        <Typography variant="h1" gutterBottom fontWeight={700}>
                          Objetivo Geral
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ backgroundColor: '#FCFCD5' }}>
                    <TableRow>
                      <TableCell sx={{ border: "1px groove black" }}>
                        <Typography>{data.generalObjective} </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12} md={6}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ backgroundColor: '#9999CC', border: "1px groove black" }}>
                        <Typography variant="h1" gutterBottom fontWeight={700} >
                          Objetivos Específicos
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ backgroundColor: '#FCFCD5' }}>
                    {data.specificObjectives.map((objective, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ border: `1px groove black`, backgroundColor: data.cores[index] }}>
                          <Typography>{objective} </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </div>
        <div className="valores">
          <div className="title" style={{ textAlign: "center" }}>
            <h1>Valores</h1>
          </div>

          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <StyledPaper sx={{
                  my: 1,
                  p: 2,
                  height: 270,
                  backgroundColor: '#A0E1A0',
                  border: "1px groove black",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center"
                }}>
                  <Typography variant="h1" gutterBottom fontWeight={700} marginBottom={'15px'}>
                    Inclusão
                  </Typography>
                  <Typography sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    Acreditamos na dignidade e no valor intrínseco de cada indivíduo, independentemente das suas características ou circunstâncias
                  </Typography>
                </StyledPaper>
              </Grid>
              <Grid item>
                <StyledPaper sx={{
                  my: 1,
                  p: 2,
                  height: 270,
                  backgroundColor: '#FCFCD5',
                  border: "1px groove black",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center"
                }}>
                  <Typography variant="h1" gutterBottom fontWeight={700} marginBottom={'15px'}>
                    Empatia
                  </Typography>
                  <Typography sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    Comprometemo-nos a ouvir e compreender as experiências e perspectivas dos outros, cultivando um ambiente de respeito mútuo e compaixão
                  </Typography>
                </StyledPaper>
              </Grid>
              <Grid item>
                <StyledPaper sx={{
                  my: 1,
                  p: 2,
                  height: 270,
                  backgroundColor: '#D7B8DA',
                  border: "1px groove black",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center"
                }}>
                  <Typography variant="h1" gutterBottom fontWeight={700} marginBottom={'15px'}>
                    Criatividade
                  </Typography>
                  <Typography sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    Reconhecemos o poder transformador da arte e da expressão criativa como ferramentas para a mudança social e pessoal
                  </Typography>
                </StyledPaper>
              </Grid>
              <Grid item>
                <StyledPaper sx={{
                  my: 1,
                  p: 2,
                  height: 270,
                  backgroundColor: '#e2b126',
                  border: "1px groove black",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center"
                }}>
                  <Typography variant="h1" gutterBottom fontWeight={700} marginBottom={'15px'}>
                    Colaboração
                  </Typography>
                  <Typography sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    Valorizamos a colaboração e o trabalho em equipa como meios eficazes para alcançar os nossos objetivos e ampliar o nosso impacto na comunidade
                  </Typography>
                </StyledPaper>
              </Grid>
              <Grid item>
                <StyledPaper
                  sx={{
                    my: 1,
                    p: 2,
                    height: 270,
                    backgroundColor: '#9999CC',
                    border: "1px groove black",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                  }}
                >
                  <Typography variant="h1" gutterBottom fontWeight={700}>
                    Compromisso
                  </Typography>
                  <Typography sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    Mantemos-nos firmes no nosso compromisso de agir com integridade, dedicação e determinação em busca de um mundo mais inclusivo e justo para todos
                  </Typography>
                </StyledPaper>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
      <div className="lateral-right"></div>


      {isModalOpen2 && (

        <ModalFollow
          isOpen={isModalOpen2}
          onClose={closeModal2}
          titulo={"Hernâni Barber"}
          onSave={() => {
            setIsModalOpen2(false);
          }}
          showButtons={false}
          height={'auto'}
        >
          <div style={{ width: "100%", display: "flex", justifyContent: "space-between", flexDirection: isSmallScreen ? "column" : "row" }}>
            <Typography
              variant="body1"
              lineHeight="24px"
              width={isSmallScreen ? "100%" : "60%"}
              sx={{ whiteSpace: "pre-line" }}
            >
              Poderás gostar de ... Hernâni Barber {"\n"}
              Aceda ao link e usufrui de um resultado como tu, especial.{"\n\n"}



              <a href="https://www.instagram.com/nanibarber2511/" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </Typography>


            <img src={Hernani} alt='' />
          </div>
        </ModalFollow>
      )}
      {isModalOpen && (

        <ModalFollow
          isOpen={isModalOpen}
          onClose={closeModal}
          titulo={"Hoya"}
          onSave={() => {
            setIsModalOpen(false);
          }}
          showButtons={false}
          height={'auto'}
        >
          <div style={{ width: "100%", display: "flex", justifyContent: "space-between", flexDirection: isSmallScreen ? "column" : "row" }}>
            <Typography
              variant="body1"
              lineHeight="24px"
              width={isSmallScreen ? "100%" : "60%"}
              sx={{ whiteSpace: "pre-line" }}
            >
              Poderás gostar de ... Hoya {"\n"}
              Aceda ao link e descobre esta Lojinha de peças de croché tão especial{"\n\n"}

              <a href="https://www.facebook.com/people/Hoya/61573137994529/" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>{" | "}

              <a href="https://www.instagram.com/hoya.crochet/" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </Typography>


            <img src={Hoya} alt='' />
          </div>
        </ModalFollow>
      )}
    </div>
  );
};

export default HomePage;