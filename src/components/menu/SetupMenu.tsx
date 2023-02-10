
import {MenuLoader} from "../admin_panel/MenuLoader";
import {Menu} from "./Menu";
import {useEffect, useState} from "react";
import {ProductItem} from "../../models";
import axios from "axios";

export function SetupMenu() {
    const [products, setProducts] = useState<ProductItem[]>([])
    const [loading, setLoading] = useState(false)

    async function fetchProducts () {
        setLoading(true)
        try {
            const response = await axios.get<ProductItem[]>('http://yama-new.ru:8088/menu/list');
            setProducts(response.data)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div>
        {loading ? <MenuLoader/>
                 : <Menu products={products}/>}
        </div>
    )
}