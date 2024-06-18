const axios = require('axios')

exports.getItemsSearch = async (params) => {
    const response = await axios.get(`${process.env.API}/sites/MLA/search`,{params: params})

    if(response.status === 200 && response.data){
        return response.data
    } else {
        return {message: "Ocurrio un error"}
    }
}

exports.getItemSearchId = async (id) => {
    const response = await axios.get(`${process.env.API}/items/${id}`)
    
    if(response.status === 200 && response.data){
        return response.data
    } else {
        return {message: "Ocurrio un error"}
    }
}

exports.getItemSearchIdDescription = async (id) => {
    const response = await axios.get(`${process.env.API}/items/${id}/description`)
    
    if(response.status === 200 && response.data){
        return response.data
    } else {
        return {message: "Ocurrio un error"}
    }
}