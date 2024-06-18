const axios = require("axios")

exports.getCategoriaId = async (id) => {
    const response = await axios.get(`${process.env.API}/categories/${id}`)
    
    if(response.status === 200 && response.data){
        return response.data
    } else {
        return {message: "Ocurrio un error"}
    }
}
