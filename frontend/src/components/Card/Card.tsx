import Image from 'next/image';
import React, { ReactNode } from 'react'
import { formatValorMoneda, translateConditionItem } from '@/utils';
import Link from 'next/link';

import "./card.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck } from '@fortawesome/free-solid-svg-icons';

export const Card = ({ data, isMobile = false, children }: Props) => {
    return (
        <Link href={data.url}  className={isMobile ? 'card-content-mobile' : 'card-content'}>
            {data.img &&
                <div className='card-img-content'>
                    <Image className='card-img-product' src={data.img} alt='image-product' width={180} height={180} />
                </div>
            }
            <div className='card-text-content'>
                <div className='card-text'>
                    {data.precio && 
                        <div className='card-text-precio'>
                            <span className='text-precio-item'>${formatValorMoneda(data.precio)} </span>
                            {data.isEnvioGratis == true && 
                                <span className='icon-envio-gratis'><FontAwesomeIcon icon={faTruck}/></span>
                            } 
                        </div>
                    }
                    <div>{data.title}</div>
                    {data.estado && <div>{translateConditionItem(data.estado)}</div>}
                </div>
                <div>
                    <div className='card-text-provincia'>{data.provincia}</div>
                </div>
            </div>
            {children}
        </Link>
    )
}

interface Props {
    data: DataCar;
    isMobile?: boolean;
    children: ReactNode
}

interface DataCar {
    id: string; 
    precio?: number;
    isEnvioGratis?: boolean;
    title: string;
    img?: string;
    estado?: string;
    provincia?: string;
    url: string;
}
