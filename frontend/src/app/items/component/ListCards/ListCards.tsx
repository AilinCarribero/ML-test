import React from 'react'
import { Breadcrumb, Card } from '@/components'
import { Item } from '@/app/models';
import { getItems } from '@/services/items.service';

import './list.scss'

interface Props {
    query?: string;
    page: number;
    limit: number;
    mobileCheck: boolean;
}

const fetch = async (params: { q?: string, limit?: number, page?: number }) => {
    const itemsFetch = await getItems(params)

    return itemsFetch
}

const ListCards = async ({ query, page, limit, mobileCheck }: Props) => {
    const itemsFetch = await fetch({ q: query, limit: limit, page: page })

    return (<>
        <Breadcrumb breadcrumbs={itemsFetch.data.categorias} />
        <div className='cards-content'>
            {'message' in itemsFetch.error && <div className='error-cards'>{itemsFetch.error.message}</div> }
            {itemsFetch.data.items.map((item: Item, index: number) => (
                <Card key={item.id} isMobile={mobileCheck} data={{
                    id: item.id,
                    precio: item.price,
                    isEnvioGratis: item.shipping.free_shipping,
                    title: item.title,
                    img: item.img,
                    estado: item.condition,
                    provincia: item.location?.state,
                    url: `/items/${item.id}`
                }} >
                    {index < itemsFetch.data.items.length -1 && <div className='card-border'></div>}
                </Card>
            ))}
        </div>
    </>)
}

export default ListCards