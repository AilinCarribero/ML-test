const { getCategoriaId } = require("../services/MeLi/CategoriaService")
const { getItemSearchId, getItemsSearch, getItemSearchIdDescription } = require("../services/MeLi/ItemsService")

exports.listenItems = async (req, res) => {
    const queryQ = req.query.q
    const queryLimit = req.query.limit
    const queryPage = (req.query.page - 1) * queryLimit

    try {
        const items_search = await getItemsSearch({ q: queryQ, limit: queryLimit, offset: queryPage })

        let flagCategory = true;

        if (items_search.results) {
            items_search.results.forEach((item, i) => {
                if (i > 0) {
                    if (item.category_id !== items_search.results[i - 1].category_id) {
                        flagCategory = false;
                    }
                }
            });

            let category_search = [];

            if (flagCategory === true) {
                const response = await getCategoriaId(items_search.results[items_search.results.length - 1].category_id)

                if (response && 'path_from_root' in response) {
                    category_search = await plusCategoryLink(response.path_from_root)
                }
            }

            const returnResult = {
                totalProductos: items_search.paging.total,
                page: queryPage,
                totalPage: Math.ceil(items_search.paging.primary_results / queryLimit),
                categorias: category_search,
                productos: items_search.results,
            }

            res.json(returnResult)
        } else {
            res.status(400)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.detalleItem = async (req, res) => {
    const id = req.params.id

    try {
        const item_search = await getItemSearchId(id)
        const item_search_description = await getItemSearchIdDescription(id)

        let category_search = [];

        if (item_search && item_search_description) {
            const response = await getCategoriaId(item_search.category_id)

            if (response && 'path_from_root' in response) {
                category_search = await plusCategoryLink(response.path_from_root)
            }

            res.json({ ...item_search, ...item_search_description, categorias: category_search });
        } else {
            res.status(400)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.paginacionItems = async (req, res) => {const queryQ = req.query.q
    const queryLimit = req.query.limit
    const queryPage = (req.query.page - 1) * queryLimit

    try {
        const items_search = await getItemsSearch({ q: queryQ, limit: queryLimit, offset: queryPage })

        if (items_search.paging) {

            const returnResult = {
                totalProductos: items_search.paging.total,
                page: queryPage,
                totalPage: Math.ceil(items_search.paging.primary_results / queryLimit)
            }

            res.json(returnResult)
        } else {
            res.status(400)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

/*-------------------Functions-----------------------*/
const plusCategoryLink = async (categorias) => {
    try {
        if (categorias.length > 0) {
            const categoriasLinkPromises = categorias.map(async (categoria) => {
                const categoriaSearch = await getCategoriaId(categoria.id)

                return {
                    id: categoriaSearch.id,
                    name: categoriaSearch.name,
                    permalink: categoriaSearch.permalink
                }
            })

            const categoriasLink = await Promise.all(categoriasLinkPromises);

            return categoriasLink
        }

        return []
    } catch (error) {
        return []
    }
}