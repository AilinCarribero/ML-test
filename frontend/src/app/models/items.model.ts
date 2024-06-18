export interface PaginationTS {
    items: Item[];
    paginate: Paginate;
    categorias: Categorias[];
}

interface Categorias {
    id: string;
    name: string;
    permalink: string;
}

interface Paginate {
    total_productos: number;
    total_page: number;
}

export interface Item {
    id: string;
    title: string;
    condition: string;
    currency_id: string;
    img: string;
    price: number;
    shipping: Shipping;
    original_price?: string;
    sale_price?: string;
    stop_time: string;
    location?: Location;
    promotions: any[];
}

interface Shipping {
    free_shipping: boolean
}

interface Location {
    address_line?: string;
    zip_code?: string;
    subneighborhood?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    country?: string;
    latitude?: string | number;
    longitude?: string | number;
}



export interface Picture {
    id: string;
    url: string;
    secure_url: string;
    size: string;
    max_size: string;
    quality: string;
}
