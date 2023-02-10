import {ProductData, ProductItem} from "../../models";
import "../../styles/Product.css"
import axios from "axios";
import React, {useState} from "react";
import {Modal} from "./Modal";
import {SavePhoto} from "./SavePhoto";
import {EditProduct} from "./EditProduct";
import {Image} from "./Image";


interface ProductProps {
    product: ProductItem
    remove: (product: ProductItem) => void
}



export function Product({ product, remove }: ProductProps) {
    const urlDeleteProduct = 'http://yama-new.ru:8088/admin/delete/' + product.id
    const urlDeleteImage =  'http://yama-new.ru:8088/admin/deleteImage/'+product.id

    const [modal, setModal] = useState(false)
    const [modalVar, setModalVar] = useState('')
    const [type, setType] = useState(product.type)
    const [name, setName] = useState(product.name)
    const [price, setPrice] = useState(product.price)
    const [description, setDescription] = useState(product.description)
    const [imageId, setImageId] = useState(product.imageId)

    const productForEdit: ProductItem = {
        id: product.id,
        type: type,
        name: name,
        price: price,
        description: description,
        imageId: product.imageId
    }

    const modalOption = (option : string) => {
        setModalVar(option)
        setModal(true)
    }

    const getModal = () => {
        switch (modalVar) {
            case '1':
                return <SavePhoto id={product.id}
                                  onClose={() => setModal(false)}
                                  onSave={saveHandler}
                />
            case '2':
                return <EditProduct product={productForEdit}
                                    onEdit={editHandler}
                                    onClose={() => setModal(false)}/>
        }
    }


    const saveHandler = (id : number) => {
        setImageId(id)
    }

    const editHandler = (product : ProductData) => {
        setType(product.type)
        setName(product.name)
        setPrice(product.price)
        setDescription(product.description)
    }

    const isImageIdExist = (imageId: number) => {
        return imageId != null && imageId != -1
    }
    return (
        <div className="border py-2 px-4 rounded flex flex-col items-center m-10 mb-2">

            <p> Категория: {type}</p>
            <p> Название: {name}</p>
            <div className="flex flex-row items-center mb-2 space-x-10">
                { isImageIdExist(imageId)
                    ? <Image
                        imageId={imageId}
                        src={'http://yama-new.ru:8088/images/'}/>
                    : <p>Нет фотографии</p>}
                <p className="whitespace-pre-line text-center">
                    {description==='' ? <p>Описания нет</p>
                                        :description}
                </p>
            </div>
            <p> Цена: {price}</p>

            <div className="flex flex-row items-center mb-2 space-x-1">
                { isImageIdExist(imageId) &&
                        <button className="py-2 px-4 border bg-orange-400"
                            onClick={ async (event) => {
                            event.preventDefault()
                            await axios.post(urlDeleteImage)
                            setImageId(-1)
                            }}
                            >Удалить фотографию</button>}

                <button onClick={() => modalOption('1')}
                        className="py-2 px-4 border bg-green-400"
                >Добавить(Изменить) фотографию</button>

                <button className="py-2 px-4 border bg-blue-300"
                        onClick={() => modalOption('2')}
                >Редактировать</button>

                {modal && <Modal onClose={() => setModal(false)}>{getModal()}</Modal>}

                <button className="py-2 px-4 border bg-red-300" onClick={ async event => {
                    event.preventDefault();
                    await axios.post(urlDeleteProduct)
                    remove(product)
                    }}>Удалить</button>
            </div>
        </div>
    )
}