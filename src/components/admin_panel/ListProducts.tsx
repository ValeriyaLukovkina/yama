import {ProductItem} from "../../models";
import {Product} from "./Product";

interface ListProductsProps {
    products : ProductItem[]
    remove : (product: ProductItem) => void
}

export function ListProducts({products, remove} : ListProductsProps) {

    return (
        <div>
            <h1 className="text-2xl text-center mt-2 mb-2 font-bold">Список товаров</h1>
            { products?.map((product:ProductItem) =>
                <Product remove={remove} product={product} key={product.id} />) }
        </div>
    )
}