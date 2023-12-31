import React from 'react';

const Checkbox = ({ label, value, onChange }) => (
    <div className='Checkbox'>
        <input
            type='checkbox'
            checked={value}
            onChange={onChange} />
        <span>&nbsp;<b>{label}</b></span>
    </div>
)

export default Checkbox