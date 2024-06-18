import { LoadingWindow } from '@/components'
import { Pagination } from './component'
import { ListCards } from './component/ListCards'
import { getPaginacion } from '@/services/items.service'
import React, { Suspense } from 'react'
import { headers } from 'next/headers'
import { isMobile } from '@/utils'

import './items.scss'

const paginacionFetch = async (params: { q?: string, limit?: number, page?: number }) => {
    const paginacion = await getPaginacion(params)

    return paginacion
}

const Items = async ({ searchParams }: { searchParams?: { search?: string, limit?: number, page?: number } }) => {
    const query = searchParams?.search
    const page = Number(searchParams?.page) || 1
    const limit = Number(searchParams?.limit) || 4

    const paginacionRes = await paginacionFetch({ q: query, limit: limit, page: page })

    const userAgent = headers().get("user-agent") || ""
    const mobileCheck = isMobile(userAgent);

    return (
        <div className='items-content'>
            <Suspense key={query + '' + page + '' + limit} fallback={<div className='cards-content'><LoadingWindow /></div>} >
                <ListCards page={page} query={query} limit={limit} mobileCheck={mobileCheck} />
            </Suspense>
            <Pagination limit={limit} page={page} totalPages={paginacionRes.data.totalPage} totalItems={paginacionRes.data.totalProductos} />
        </div>
    )
}

export default Items