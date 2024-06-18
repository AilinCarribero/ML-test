import React from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "./customInput.scss"

interface Props {
    name: string;
    value?: string | number;
    search: boolean;
    placeholder?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: () => {};
}

const CustomInput = ({name, value, onChange, search = false, placeholder, onClick }: Props) => {
    return (
        <div className='content-input'>
            <input name={name} value={value} onChange={onChange} placeholder={placeholder} />
            {search === true &&
                <button type='submit' onClick={onClick} className='button-icon-search'>
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
            }
        </div>
    )
}

export default CustomInput