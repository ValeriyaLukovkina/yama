import React, {FormEvent, useState} from "react";
import {ProductData, ProductItem} from "../../models";
import axios from "axios";

interface EditProductProps {
    product: ProductItem
    onEdit: (product: ProductData) => void
    onClose: () => void
}




export function EditProduct({product, onEdit, onClose} : EditProductProps) {

    const url = 'http://yama-new.ru:8088/admin/edit/'+product.id
    const [valueSelector, setValueSelector] = useState(product.type)
    const [valueName, setValueName] = useState(product.name)
    const [valuePrice, setValuePrice] = useState(product.price)
    const [valueDescription, setValueDescription] = useState(product.description)

    const arOptions = ['Кальяны', 'Кофе и чай', 'Пироги и пиццы', 'Салаты',
        'Блюда на углях', 'Гарниры', 'Лимонады', 'Милкшейки', 'Мороженное']


    const productData = {
        type: '',
        name: '',
        price: '',
        description: ''
    }

    const submitHandler = async (event: FormEvent) => {
        event.preventDefault();

        productData.type = valueSelector;
        productData.name = valueName;
        productData.price = valuePrice;
        productData.description = valueDescription;

        await axios.post<ProductItem>(url, productData)
        setValueName('')
        setValueSelector('')
        setValuePrice('')
        setValueDescription('')

        onEdit(productData)
        onClose()
    }


    const options = arOptions.map(text => {
        return <option key={text}>{text}</option>
    })
    return (
        <div>
            <form encType="multipart/form-data" onSubmit={submitHandler}>
                <h1 className="text-2xl text-center mb-2">Редактирование товара</h1><br/>
                <select className="border py-2 px-4 mb-2"
                        placeholder="Выберите категорию товара"
                        value={valueSelector}
                        onChange={(event) => setValueSelector(event.target.value)}
                        required={true}>
                    {options}
                </select>
                <input
                    type="text"
                    className="border py-2 px-4 mb-2 w-full"
                    placeholder="Введите название товара..."
                    value={valueName}
                    onChange={event => setValueName(event.target.value)}
                    required={true}
                /><br/>
                <input
                    type="text"
                    className="border py-2 px-4 mb-2 w-full"
                    placeholder="Введите цену товара..."
                    value={valuePrice}
                    onChange={event => setValuePrice(event.target.value)}
                    required={true}
                />
                <textarea
                    rows={10}
                    cols={40}
                    value={valueDescription}
                    onChange={event => setValueDescription(event.target.value)}
                    className="border py-2 px-4 mb-2"
                    required={false}
                /><br/>
                <button type="submit" className="py-2 px-4 border bg-yellow-400 hover:text-white">Редактировать</button>
            </form>
        </div>
    )
}