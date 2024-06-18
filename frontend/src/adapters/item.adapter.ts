import { PaginationTS } from "@/app/models";

export const createItemsAdapter = (items: AdapterPagination): PaginationTS => {
    const itemsAdapter = items.productos.map(item => {
        return {
            id: item.id,
            title: item.title,
            condition: item.condition || '',
            currency_id: item.currency_id || '',
            img: item.thumbnail,
            price: item.price || 0,
            original_price: item.original_price || '',
            sale_price: item.sale_price || '',
            stop_time: item.stop_time || '',
            shipping: {
                free_shipping: item.shipping.free_shipping
            },
            location: {
                address_line: item.location?.address_line || '',
                zip_code: item.location?.zip_code || '',
                subneighborhood: item.location?.subneighborhood || '',
                neighborhood: item.location?.neighborhood.name || '',
                city: item.location?.city.name || '',
                state: item.location?.state.name || '',
                country: item.location?.country.name || '',
                latitude: item.location?.latitude || '',
                longitude: item.location?.longitude || ''
            },
            promotions: item.promotions || ''
        }
    })

    const adapter = {
        items: itemsAdapter,
        paginate: {
            total_productos: items.totalProductos,
            total_page: items.totalPage
        },
        categorias: items.categorias
    }

    return adapter
}

export const createItemAdapter = (item: ItemDescription) => {
    const itemAdapter = {
        id: item.id,
        title: item.title,
        seller_id: item.seller_id,
        price: item.price,
        base_price: item.price,
        original_price: item.price,
        currency_id: item.currency_id,
        initial_quantity: item.initial_quantity,
        buying_mode: item.buying_mode,
        listing_type_id: item.listing_type_id,
        condition: item.condition,
        //"permalink": "https://articulo.mercadolibre.com.ar/MLA-909922852-apple-iphone-11-128-gb-negro-_JM",
        //"thumbnail_id": "865864-MLA46114990464_052021",
        //"thumbnail": "http://http2.mlstatic.com/D_865864-MLA46114990464_052021-I.jpg",
        /*[
            {
                "id": "865864-MLA46114990464_052021",
                "url": "http://http2.mlstatic.com/D_865864-MLA46114990464_052021-O.jpg",
                "secure_url": "https://http2.mlstatic.com/D_865864-MLA46114990464_052021-O.jpg",
                "size": "368x500",
                "max_size": "885x1200",
                "quality": ""
            },
            {
                "id": "995869-MLA46114829820_052021",
                "url": "http://http2.mlstatic.com/D_995869-MLA46114829820_052021-O.jpg",
                "secure_url": "https://http2.mlstatic.com/D_995869-MLA46114829820_052021-O.jpg",
                "size": "244x500",
                "max_size": "586x1200",
                "quality": ""
            },
            {
                "id": "861897-MLA46114990467_052021",
                "url": "http://http2.mlstatic.com/D_861897-MLA46114990467_052021-O.jpg",
                "secure_url": "https://http2.mlstatic.com/D_861897-MLA46114990467_052021-O.jpg",
                "size": "483x500",
                "max_size": "1160x1200",
                "quality": ""
            },
            {
                "id": "922812-MLA46114829821_052021",
                "url": "http://http2.mlstatic.com/D_922812-MLA46114829821_052021-O.jpg",
                "secure_url": "https://http2.mlstatic.com/D_922812-MLA46114829821_052021-O.jpg",
                "size": "435x500",
                "max_size": "1046x1200",
                "quality": ""
            },
            {
                "id": "960221-MLA46115014391_052021",
                "url": "http://http2.mlstatic.com/D_960221-MLA46115014391_052021-O.jpg",
                "secure_url": "https://http2.mlstatic.com/D_960221-MLA46115014391_052021-O.jpg",
                "size": "500x500",
                "max_size": "1200x1200",
                "quality": ""
            },
            {
                "id": "717128-MLA46114990469_052021",
                "url": "http://http2.mlstatic.com/D_717128-MLA46114990469_052021-O.jpg",
                "secure_url": "https://http2.mlstatic.com/D_717128-MLA46114990469_052021-O.jpg",
                "size": "500x371",
                "max_size": "1200x891",
                "quality": ""
            },
            {
                "id": "782043-MLA46114990471_052021",
                "url": "http://http2.mlstatic.com/D_782043-MLA46114990471_052021-O.jpg",
                "secure_url": "https://http2.mlstatic.com/D_782043-MLA46114990471_052021-O.jpg",
                "size": "500x500",
                "max_size": "1200x1200",
                "quality": ""
            }
        ],*/
        video_id: item.video_id,
        descriptions: item.descriptions,
        seller_address: {
            city: item.seller_address?.city.name || '',
            state: item.seller_address?.state.name || '',
            country: item.seller_address?.country.name || '',
            search_location: {
                city: item.seller_address?.search_location?.city.name || '',
                state: item.seller_address?.search_location?.state.name || ''
            },
            id: item.seller_address?.id || ''
        },
        location: item.location,
        status: item.status,
        sub_status: item.sub_status,
        warranty: item.warranty,
        date_created: item.date_created,
        last_updated: item.last_updated,
        pictures: item.pictures.map(picture => {
            return {
                id: picture.id,
                url: picture.url,
                secure_url: picture.secure_url,
                size: picture.size,
                max_size: picture.max_size,
                quality: picture.quality
            }
        }),
        text: item.text,
        plain_text: item.plain_text,
        categorias: [...item.categorias, {id: item.id, name: item.title}]
    }

    return itemAdapter
}


/*------------------------Adapter Items---------------------------*/
interface AdapterPagination {
    totalProductos: number;
    page: number;
    totalPage: number;
    productos: Item[];
    categorias: Categorias[];
}

interface Categorias {
    id: string;
    name: string;
    permalink: string;
}

interface Item {
    id: string;
    title: string;
    condition: string;
    thumbnail_id: string;
    catalog_product_id: null;
    listing_type_id: string;
    permalink: string;
    buying_mode: string;
    site_id: string;
    category_id: string;
    domain_id: string;
    thumbnail: string;
    currency_id: string;
    order_backend: number;
    price: number;
    original_price: null;
    sale_price: null;
    available_quantity: number;
    official_store_id: null;
    use_thumbnail_id: boolean;
    accepts_mercadopago: boolean;
    variation_filters: string[];
    shipping: ShippingItem;
    stop_time: string;
    seller: SellerItem;
    attributes: AttributeItem[];
    location?: LocationItem;
    variations_data: Variationsdata;
    installments: InstallmentsItem;
    winner_item_id: null;
    catalog_listing: boolean;
    discounts: null;
    promotions: any[];
    inventory_id: null;
}

interface LocationItem {
    address_line: string;
    zip_code: string;
    subneighborhood: null;
    neighborhood: IDName;
    city: IDName;
    state: IDName;
    country: IDName;
    latitude: number;
    longitude: number;
}

interface IDName {
    id: string;
    name: string;
}

interface InstallmentsItem {
    quantity: number;
    amount: number;
    rate: number;
    currency_id: string;
}

interface Variationsdata {
    '180745617927': NumberVeriationsdataItem;
    '44563134999': NumberVeriationsdataItem;
}

interface NumberVeriationsdataItem {
    thumbnail: string;
    ratio: string;
    name: string;
    pictures_qty: number;
    price: number;
    user_product_id: string;
    attributes: any[];
}

interface AttributeItem {
    id: string;
    name: string;
    value_id: null | string;
    value_name: string;
    attribute_group_id: string;
    attribute_group_name: string;
    value_struct: ValuestructItem | null;
    values: ValueItem[];
    source: number;
    value_type: string;
}

interface ValueItem {
    id: null | string;
    name: string;
    struct: ValuestructItem | null;
    source: number;
}

interface ValuestructItem {
    number: number;
    unit: string;
}

interface SellerItem {
    id: number;
    nickname: string;
}

interface ShippingItem {
    store_pick_up: boolean;
    free_shipping: boolean;
    logistic_type: string;
    mode: string;
    tags: any[];
    benefits: null;
    promise: null;
    shipping_score: number;
}

/*---------------Adapter Item Description---------------*/
interface ItemDescription {
    id: string;
    site_id: string;
    title: string;
    seller_id: number;
    category_id: string;
    official_store_id: null;
    price: number;
    base_price: number;
    original_price: null;
    currency_id: string;
    initial_quantity: number;
    sale_terms: Saleterm[];
    buying_mode: string;
    listing_type_id: string;
    condition: string;
    permalink: string;
    thumbnail_id: string;
    thumbnail: string;
    pictures: Picture[];
    video_id: null;
    descriptions: any[];
    accepts_mercadopago: boolean;
    non_mercado_pago_payment_methods: any[];
    shipping: Shipping;
    international_delivery_mode: string;
    seller_address: Selleraddress;
    seller_contact: null;
    location: Location;
    coverage_areas: any[];
    attributes: Attribute[];
    listing_source: string;
    variations: Variation[];
    status: string;
    sub_status: any[];
    tags: string[];
    warranty: string;
    catalog_product_id: null;
    domain_id: string;
    parent_item_id: null;
    deal_ids: string[];
    automatic_relist: boolean;
    date_created: string;
    last_updated: string;
    health: number;
    catalog_listing: boolean;
    text: string;
    plain_text: string;
    snapshot: Snapshot;
    categorias: Categorias[];
}

interface Snapshot {
    url: string;
    width: number;
    height: number;
    status: string;
}

interface Variation {
    id: number;
    price: number;
    attribute_combinations: Attributecombination[];
    sale_terms: any[];
    picture_ids: string[];
    catalog_product_id: null;
}

interface Attributecombination {
    id: string;
    name: string;
    value_id: null | string;
    value_name: string;
    values: ValueAttributeC[];
    value_type: string;
}

interface ValueAttributeC {
    id: null | string;
    name: string;
    struct: null;
}

interface Attribute {
    id: string;
    name: string;
    value_id: null | string;
    value_name: null | string;
    values: ValueAttribute[];
    value_type: string;
}

interface ValueAttribute {
    id: null | string;
    name: null | string;
    struct: Struct | null;
}

interface Struct {
    number: number;
    unit: string;
}

interface Location {
}

interface Selleraddress {
    city: City;
    state: State;
    country: State;
    search_location: Searchlocation;
    id: number;
}

interface Searchlocation {
    neighborhood: State;
    city: State;
    state: State;
}

interface State {
    id: string;
    name: string;
}

interface City {
    name: string;
}

interface Shipping {
    mode: string;
    methods: any[];
    tags: string[];
    dimensions: null;
    local_pick_up: boolean;
    free_shipping: boolean;
    logistic_type: string;
    store_pick_up: boolean;
}

interface Picture {
    id: string;
    url: string;
    secure_url: string;
    size: string;
    max_size: string;
    quality: string;
}

interface Saleterm {
    id: string;
    name: string;
    value_id: string;
    value_name: string;
    value_struct: null;
    values: ValueSaleterm[];
    value_type: string;
}

interface ValueSaleterm {
    id: string;
    name: string;
    struct: null;
}