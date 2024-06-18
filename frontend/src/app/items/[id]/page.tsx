import React from 'react'
import { headers } from 'next/headers'
import { Breadcrumb, Carousel } from '@/components'
import { ProductoComprar } from './components'
import { getItemDetalle } from '@/services/items.service'
import { formatValorMoneda, isMobile, translateConditionItem } from '@/utils'

import './detalle.scss'

interface Props {
    params: any
}

const Item = async ({ params }: Props) => {
    const { id } = params
    const itemDetalleFetch = await getItemDetalle(id)

    const userAgent = headers().get("user-agent") || ""
    const mobileCheck = isMobile(userAgent);

    return (
        <div className='item-content'>
            {'categorias' in itemDetalleFetch.data && <Breadcrumb breadcrumbs={itemDetalleFetch.data.categorias} />}

            {'pictures' in itemDetalleFetch.data && 'id' in itemDetalleFetch.data &&
                <div className='item-detalle-content'>
                    <div className='item-detalle-carousel-content'>
                        {<Carousel images={itemDetalleFetch.data.pictures} isMobile={mobileCheck} />}
                    </div>
                    <div className='item-detalle-compra-content'>
                        <div className='item-detalle-compra-cant-venta'>
                            <p>{translateConditionItem(itemDetalleFetch.data.condition)} - {itemDetalleFetch.data.initial_quantity} vendidos</p>
                        </div>
                        <ProductoComprar classNameButton={'item-detalle-button-compra'} typeButton={"button"} textButton={"Comprar"} idProducto={itemDetalleFetch.data.id} >
                            <div className='item-detalle-compra-titulo'>
                                <h2>{itemDetalleFetch.data.title}</h2>
                            </div>
                            <div className='item-detalle-compra-precio'>
                                <p>${formatValorMoneda(itemDetalleFetch.data.price)}</p>
                            </div>
                        </ProductoComprar>
                    </div>
                    <div className='item-detalle-detalle-content'>
                        <div>
                            <h2>Descripción del producto</h2>
                            <p>{itemDetalleFetch.data.text}</p>
                            <p>{itemDetalleFetch.data.plain_text}</p>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Item