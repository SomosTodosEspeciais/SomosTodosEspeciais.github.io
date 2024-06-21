import React from 'react';
import './Mascote.css';
import Puzzflor from '../../assets/puzzflor.jpg';
import Flower from '../../assets/flower.png';
import { useMediaQuery } from '@mui/material';

const Mascote = () => {


    const isSmallScreen = useMediaQuery('(max-width: 900px)');


    return (
        <div className="Mascote">
            <div className='header'>
                <div className='flower-container' style={{  left: isSmallScreen ? "0px" : "90px" }}>
                    <img src={Flower} alt="Flower"  style={{  height: isSmallScreen ? "100px" : "130px" }} />
                </div>
                <h1>Puzzleflor</h1>
            </div>
            <div className='content'>
                <img src={Puzzflor} alt="Puzzflor"  style={{  height: isSmallScreen ? "350px" : "450px" }} />
                <div className='descricao'>
                    <h2>Descrição da Mascote</h2>
                    <p>Puzzleflor é uma flor mágica e brincalhona, cujas pétalas são como peças de puzzle. Cada pétala tem uma cor única e um padrão especial, representando a diversidade e a singularidade de cada pessoa. Ela é conhecida por sua energia contagiante e por encontrar sempre uma maneira divertida de resolver qualquer desafio.</p>
                </div>
                <div className='caracteristicas'>
                    <h2>Características da Puzzleflor</h2>
                    <ul>
                        <li>Pétalas de Puzzle: Cada pétala é como uma peça de puzzle, variando em cor e padrão.</li>
                        <li>Expressão Alegre: Puzzleflor tem olhos brilhantes e um sorriso animado, transmitindo positividade e acolhimento.</li>
                        <li>Personalidade Curiosa: Sempre interessada em conhecer novos amigos e aprender sobre as suas histórias únicas.</li>
                    </ul>
                </div>
                <div className='history'>
                    <h2>História da Puzzleflor</h2>
                    <p>
                        Puzzleflor nasceu num jardim encantado onde todas as flores eram especiais. Desde pequena, ela notou que as suas pétalas eram diferentes das outras flores: elas encaixavam-se como um puzzle, formando uma flor única e colorida. Puzzleflor adorava explorar o jardim e fazer novos amigos entre as flores, animais e até mesmo entre os pequenos seres que viviam ali.
                        Um dia, Puzzleflor decidiu sair numa jornada pelo mundo para descobrir novos lugares e compartilhar a sua mensagem especial. Ao longo das suas aventuras, ela encontrou crianças de diferentes culturas, animais com habilidades únicas e até plantas que tinham histórias incríveis para contar. Em cada lugar que visitava, Puzzleflor espalhava a mensagem de que a diversidade é o que torna o mundo tão maravilhoso e que, juntos, somos capazes de criar um lugar melhor para todos.
                    </p>
                </div>
                <div className='message'>
                    <h2>Mensagem da Mascote</h2>
                    <p>"Eu sou Puzzleflor, a flor que mostra como cada um de nós é uma peça única e importante no grande puzzle da vida. Vamos celebrar a nossa diversidade e aprender uns com os outros, porque juntos somos mais fortes e mais bonitos!"</p>
                </div>
            </div>
        </div>
    );
};

export default Mascote;
