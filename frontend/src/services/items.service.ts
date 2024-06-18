import { createItemAdapter, createItemsAdapter } from "@/adapters"
import { ParamSearch } from "@/app/models"
import axios from "axios"

export const getItems = async (params: ParamSearch) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/items`, { params: params })

        if (response.status === 200 && response.data) {
            const adapter = createItemsAdapter(response.data)

            return { data: adapter, error: {} }
        } else {
            return {
                data: { items: [], paginate: { total_page: 0, total_productos: 0 }, categorias: [] },
                error: { error: response, message: response.statusText || 'Hubo un error al querer obtener los datos' }
            }
        }
    } catch (error) {
        console.error(error)
        return {
            data: { items: [], paginate: { total_page: 0, total_productos: 0 }, categorias: [] },
            error: { message: 'Hubo un error de comunicación con el servidor', error: error }
        }
    }
}

export const getItemDetalle = async (id: string | number) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/items/${id}`)

        if (response.status === 200 && response.data) {
            const adapter = createItemAdapter(response.data)

            return { data: adapter, error: {} }
        } else {
            return { data: [], error: { error: response, message: response.statusText || 'Hubo un error al querer obtener los datos' } }
        }
    } catch (error) {
        console.error(error)
        return { data: [], error: { message: 'Hubo un error de comunicación con el servidor', error: error } }
    }
}

export const getPaginacion = async (params: ParamSearch) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/items/paginacion`, { params: params })

        if (response.status === 200 && response.data) {
            const adapter = {
                totalProductos: response.data.totalProductos,
                page: response.data.page,
                totalPage: response.data.totalPage
            }

            return { data: adapter, error: {} }
        } else {
            return {
                data: {
                    totalProductos: 0,
                    page: 1,
                    totalPage: 0
                },
                error: { error: response, message: response.statusText || 'Hubo un error al querer obtener los datos' }
            }
        }
    } catch (error) {
        console.error(error)
        return {
            data: {
                totalProductos: 0,
                page: 1,
                totalPage: 0
            },
            error: { message: 'Hubo un error de comunicación con el servidor', error: error }
        }
    }
}