import React, {useState} from "react"
import { IProduct } from "../models"
import {useProducts} from '../hooks/products'

interface ProductProps {
    product: IProduct
}

export function Product (props: ProductProps) {
    const {products} = useProducts()
    const [details, setDetails] = useState(false)
    // const [showBtn, setShowBtn] = useState(true)
    const root = document.querySelector('#root') as HTMLElement
    let body = document.querySelector('body') as HTMLElement
    function addDescription () {
        setDetails(true)
        let fixed = document.createElement('div')
        body?.classList.add('fixed1')
        fixed.classList.add('fixed')
        fixed.classList.add('mute')
        fixed.addEventListener('click', closeDescription);
        root?.appendChild(fixed)
    }
    function closeDescription () {
        setDetails(false)
        let fixed = document.querySelector('.fixed')
        fixed?.remove()
        body?.classList.remove('fixed1')
        // root?.removeChild(fixed)
    }
    // if (props.product.description.trim().length === 0) {
    //     setShowBtn(false)
    // }
    
    // setShowBtn(props.product.description || props.product.imageId ? true : false)
    return (
        <>
            <div className="product">
                <span className="product_name">{props.product.name}</span>
                <span className="product_price">{props.product.price} &#8381;</span>\
                {props.product.description !== '' && <button 
                    className="product_btn"
                    onClick={addDescription}
                >
                    Подробнее...
                </button>}
            </div>
            {details && <div className="product_description">
                <button 
                    className="product_description_close"
                    onClick={closeDescription}
                    >
                </button>
                {props.product.imageId && <img className="product_description_img" src={'http://yama-new.ru/images/'+props.product.imageId} alt="image" />}
                {/* <img className="product_description_img" src={'http://yama-new.ru/images/'+props.product.imageId} alt="image" /> */}
                <span className="product_description_txt">{props.product.description}</span>
            </div>}
        </>
    )
}