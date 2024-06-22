import React from 'react';
import './Jogos.css'

const Jogos = () => {
    return (
        <div className="Jogos">
            <div className='content'>
                <div className='jogo'>
                    <iframe
                        src="https://scratch.mit.edu/projects/860189704/embed"
                        width="600"
                        height="600"
                        allowFullScreen
                    ></iframe>
                </div>
                <div >
                    <p>Esta animação integra a revista "Todos somos especiais - Perspetivas de inclusão em contexto escolar." A partir do momento que deres início na bandeira, estarás a embarcar connosco numa viagem muito especial! Nela estão as pessoas que fizeram parte deste projeto ao longo de meses. Faltas tu! Para isso, convidamos te a comentar com uma frase da tua autoria e que reflita a inclusão tal como as famosas citações que descobrirás. Atreveste a ser especial?</p>
                </div>
            </div>

        </div>
    );
};

export default Jogos;
