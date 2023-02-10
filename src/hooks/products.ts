import axios from 'axios';
import { useEffect, useState } from 'react';
import {ProductItem} from '../models';

export function useProducts () {
    const [products, setProducts] = useState<ProductItem[]>([])
    const [loading, setLoading] = useState(false)
  
    async function fetchProducts () {
        setLoading(true)
        try {
            const response = await axios.get<ProductItem[]>('http://localhost:8088/menu/list');
            setProducts(response.data)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }
  
    useEffect(() => {
      fetchProducts()
    }, [])

    return { products, loading }
}