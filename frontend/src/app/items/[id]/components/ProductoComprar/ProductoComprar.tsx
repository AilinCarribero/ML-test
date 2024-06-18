'use client'

import React, { ReactNode } from 'react'

interface Props {
    //onClickButton: () => void;
    idProducto: string;
    classNameButton: string;
    typeButton?: "button" | "submit" | "reset";
    children: ReactNode;
    textButton: string
}

const ProductoComprar = ({ /*onClickButton, */idProducto, classNameButton, typeButton = "button", children, textButton }: Props) => {
    const handleClick = () => {
        //onClickButton()
    }
    return (
        <div>
            {children}
            <div className='item-detalle-compra-compra'>
                <button className={classNameButton} type={typeButton} onClick={handleClick}>{textButton}</button>
            </div>
        </div>

    )
}

export default ProductoComprar