import {CreateProduct} from "./CreateProduct";
import {ProductItem} from "../../models";
import {useEffect, useMemo, useState} from "react";
import axios from "axios";
import {ListProducts} from "./ListProducts";
import {Loader} from "./Loader";


export function AdminPanel() {

    const [products, setProducts] = useState<ProductItem[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const createHandler = (product: ProductItem) => {
        setProducts(prev => [...prev, product])
    }

    const removePost = (product: ProductItem) => {
        setProducts(products?.filter(p => p.id !== product.id))
    }

    const searchedProducts = useMemo(() => {
        return products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [searchQuery, products])

    async function fetchProducts() {
        try {
            setLoading(true)
            const response = await axios.get<ProductItem[]>('http://yama-new.ru:8088/admin?p=HZrjORJGj')
            setProducts(response.data)
            setLoading(false)
        }catch (error){
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    },[])


    return (
        <div className="bg-white">
            <CreateProduct onCreate={createHandler}/>
            <hr style={{margin: '15px 0'}}/>
            <input
                placeholder="Поиск по названию"
                className="border border-blue-400 py-2 px-4 mb-2 w-full "
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
            />
            {error && <p className="text-2xl text-red-700 text-center mb-2 font-bold bg-white"> Ошибка подключения. Проверьте соединение с интернетом</p>}
            {loading ? <div className="flex justify-center mb-10 bg-white"><Loader/></div>
                    : (products.length !== 0) ? <ListProducts products={searchedProducts}
                                                             remove={removePost}/>
                        : <p className="text-2xl text-center mb-2 font-bold"> Позиции не найдены</p>}



        </div>
    )
}