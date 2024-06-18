export const formatValorMoneda = (number: number) => {
    if(number) {
        return new Intl.NumberFormat("ES-AR", {
            style: "decimal",
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }).format(number)
    }
    
    return 0
}