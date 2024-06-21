import React from 'react';
import './Jogos.css'

const Jogos = () => {
    return (
        <div className="Jogos">
            <div className='jogo'>
                <iframe
                    src="https://scratch.mit.edu/projects/860189704/embed"
                    width="600"
                    height="600"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default Jogos;
