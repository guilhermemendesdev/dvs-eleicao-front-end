import React from 'react';

const Pesquisa = ({ valor, onChange, placeholder, onClick }) => (
    <div className='Pesquisa flex horizontal'>
        <input value={valor} onChange={onChange} placeholder={placeholder} />

        <button onClick={onClick}>

            <i style={{ color: 'black' }} className='fas fa-search' />
        </button>

    </div>
)

export default Pesquisa;