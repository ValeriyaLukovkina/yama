import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IProduct } from '../models';

export function useProducts () {
    const [products, setProducts] = useState<IProduct[]>([])
  
    async function fetchProducts () {
      const respone = await axios.get<IProduct[]>('http://yama-new.ru/menu/list');
      setProducts(respone.data)
    }
  
    useEffect(() => {
      fetchProducts()
    }, [])

    return { products }
}