'use client'

import React, { ReactNode } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import './pagination.scss'

interface Props {
    children?: ReactNode;
    limit?: number;
    page?: number;
    totalPages?: number;
    totalItems?: number;
}

const Pagination = async ({ children, limit = 4, page = 1, totalPages = 1, totalItems = 0}: Props) => {
    const searchParams = useSearchParams()
    const { push } = useRouter()

    const next = () => {
        changePage(page + 1)
    }

    const prev = () => {
        changePage(page - 1)
    }

    const changePage = (newPage: number) => {
        const params = new URLSearchParams(searchParams)

        params.set('page', newPage.toString())

        push(`/items?${params?.toString()}`)
    }

    const cantNumPaginacion = () => {
        if (totalPages > 4) {
            if (page === 1) {
                return (
                    <div className='pagination-numbers-content'>
                        <div className='active' onClick={() => changePage(1)}>1</div>
                        <div onClick={() => changePage(2)}>2</div>
                        <div onClick={() => changePage(3)}>3</div>
                        <span>...</span>
                        <div onClick={() => changePage(totalPages)}>{totalPages}</div>
                    </div>
                )
            } else if (page === totalPages) {
                return (
                    <div className='pagination-numbers-content'>
                        <div className={page == 1 ? 'active' : 'no-active'} onClick={() => changePage(1)}>1</div>
                        <span>...</span>
                        <div onClick={() => changePage(totalPages - 2)}>{totalPages - 2}</div>
                        <div onClick={() => changePage(totalPages - 1)}>{totalPages - 1}</div>
                        <div className='active' onClick={() => changePage(totalPages)}>{totalPages}</div>
                    </div>
                )
            } else {
                return (
                    <div className='pagination-numbers-content'>
                        {page > 1 && <div onClick={() => changePage(1)}>1</div>}
                        {page - 1 > 1 && <span>...</span>}
                        {page == totalPages - 1 && <div onClick={() => changePage(totalPages - 2)}>{totalPages - 2}</div>}
                        <div className='active' onClick={() => changePage(page)}>{page}</div>
                        {page == 2 && <div onClick={() => changePage(3)}>3</div>}
                        {page + 1 < totalPages && <span>...</span>}
                        {page < totalPages && <div onClick={() => changePage(totalPages)}>{totalPages}</div>}
                    </div>
                )
            }
        } else {
            let numPaginador = `<div className={page == 1 ? 'active' : 'no-active'} onClick={() => changePage(1)}>1</div>`
            for (let i = 2; i < totalPages; i++) {
                numPaginador += `<div className={page == ${i} ? 'active' : 'no-active'} onClick={() => changePage(${i})}>${i}</div>`
            }

            return (<div className='pagination-numbers-content'>{numPaginador}</div>)
        }
    }

    return (
        <div className='pagination-content'>
            <button type='button' onClick={prev} disabled={totalPages === 1 || page <= 1 ? true : false}>{'<'}</button>
            {totalPages <= 1 ?
                <div className='pagination-numbers-content'>
                    <div className='active' onClick={() => changePage(1)}>1</div> 
                </div>
                : cantNumPaginacion()
            }
            <button type='button' onClick={next} disabled={totalPages === 1 || page >= totalPages ? true : false}>{'>'}</button>
        </div>
    )
}

export default Pagination