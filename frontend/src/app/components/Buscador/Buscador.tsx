'use client'

import React, { useEffect, useState } from 'react'
import { CustomInput } from '@/components'
import { useDebounce, useDebouncedCallback } from 'use-debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const time_between_search = 300

const Buscador = () => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { push } = useRouter()

    const [search, setSearch] = useState<string>(searchParams.get('search')?.toString() || '');
    const [params, setParams] = useState<URLSearchParams>(new URLSearchParams(searchParams));

    const changeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target

        if (target.name === 'search') {
            setSearch(target.value)
        }

        createParam(target.name, target.value)

        delayUrlComplete()
    }

    const delayUrlComplete = useDebouncedCallback(() => {
        urlComplete()
    }, time_between_search)

    const submitSearch = async () => {
        createParam('search', search)
        urlComplete()
    }

    const createParam = (name: string, value: string | undefined) => {
        const paramsQuery = params == undefined ? new URLSearchParams(searchParams) : params

        if (value) {
            paramsQuery.set(name, value)
        } else {
            paramsQuery.delete(name)
        }

        setParams(paramsQuery)
    }

    useEffect(() => {
        if (!pathname.includes('items')) {
            setSearch('')
        }

    }, [pathname])

    const urlComplete = () => {
        if (params?.toString()) {
            push(`/items?${params?.toString()}`)
        } else {
            push(`/`)
        }
    }

    return (
        <CustomInput name={'search'} value={search} search={true} placeholder={'Nunca dejes de buscar'} onChange={changeSearch} onClick={submitSearch} />
    )
}

export default Buscador