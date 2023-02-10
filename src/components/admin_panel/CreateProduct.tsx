import React, {useState} from "react";
import axios from "axios";
import {ProductItem} from "../../models";

interface CreateProductProps {
    onCreate: (product: ProductItem) => void
}

export function CreateProduct({ onCreate} : CreateProductProps) {


    const arOptions = ['Кальяны', 'Кофе и чай', 'Пироги и пиццы', 'Салаты',
                        'Блюда на углях', 'Гарниры', 'Лимонады', 'Милкшейки', 'Мороженное']
    const [valueSelector, setValueSelector] = useState('')
    const [valueName, setValueName] = useState('')
    const [valuePrice, setValuePrice] = useState('')
    const [valueDescription, setValueDescription] = useState('')


    const productData = {
        type: '',
        name: '',
        price: '',
        description: ''
    }

    const options = arOptions.map(text => {
        return <option key={text}>{text}</option>
    })


    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        productData.type = valueSelector;
        productData.name = valueName;
        productData.price = valuePrice;
        productData.description = valueDescription;

        const response = await axios.post<ProductItem>('http://yama-new.ru:8088/admin/create', productData)
        setValueName('')
        setValueSelector('')
        setValuePrice('')
        setValueDescription('')

        onCreate(response.data)
        }
    return (
        <form encType="multipart/form-data" onSubmit={submitHandler}>
            <h1 className="text-2xl mb-2 mt-3 font-bold">Создать товар</h1>
            <select className="border py-2 px-4 mb-2"
                    placeholder="Выберите категорию товара"
                    value={valueSelector}
                    onChange={(event) => setValueSelector(event.target.value)}
                    required={true}>
                <option value="" disabled selected hidden>Выберите категорию товара</option>
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
            <button type="submit" className="py-2 px-4 border bg-yellow-400 hover:text-white">Создать</button>
        </form>
    )
}