export const translateConditionItem = (condition: string) => {
    switch(condition) {
        case 'new': 
            return 'Nuevo'
        case 'used': 
            return 'Usado'
    }
}