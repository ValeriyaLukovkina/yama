import React  from 'react';
import {Navigation} from './components/navigation'
import {Product} from './components/product'
import {useProducts} from './hooks/products'

function App() {
  const {products} = useProducts()

  return (
    <>
      <div className='wrp'>
        <Navigation/>
        <div className='shisha group'>
          <p className='shisha_title group_title'>Кальяны</p>
          <div className='shisha_name group_name'>
            {products.map(product => product.type === 'Кальяны' && <Product product={product}/>)}
          </div>
        </div>
        <div className='coffeetea group'>
          <p className='coffeetea_title group_title'>Кофе и чай</p>
          <div className='coffeetea_name group_name'>
            {products.map(product => product.type === 'Кофе и чай' && <Product product={product}/>)}
          </div>
        </div>
        <div className='pizza group'>
          <h3 className='pizza_title group_title'>Пироги и пиццы</h3>
          <div className='pizza_name group_name'>
            {products.map(product => product.type === 'Пироги и пиццы' && <Product product={product}/>)}
          </div>
        </div>
        <div className='salad group'>
          <p className='salad_title group_title'>Салаты</p>
          <div className='salad_name group_name'>
            {products.map(product => product.type === 'Салаты' && <Product product={product}/>)}
          </div>
        </div>
        <div className='grill group'>
          <p className='grill_title group_title'>Блюда на углях</p>
          <div className='grill_name group_name'>
            {products.map(product => product.type === 'Блюда на углях' && <Product product={product}/>)}
          </div>
        </div>
        <div className='garnish group'>
          <h3 className='garnish_title group_title'>Гарниры</h3>
          <div className='garnish_name group_name'>
            {products.map(product => product.type === 'Гарниры' && <Product product={product}/>)}
          </div>
        </div>
        <div className='lemonade group'>
          <h3 className='lemonade_title group_title'>Лимонады</h3>
          <div className='lemonade_name group_name'>
            {products.map(product => product.type === 'Лимонады' && <Product product={product}/>)}
          </div>
        </div>
        <div className='icecream group'>
          <p className='icecream_title group_title'>Мороженное</p>
          <div className='icecream_name group_name'>
            {products.map(product => product.type === 'Мороженное' && <Product product={product}/>)}
          </div>
        </div>
        <div className='milkshake group'>
          <p className='milkshake_title group_title'>Милкшейки</p>
          <div className='milkshake_name group_name'>
            {products.map(product => product.type === 'milkshake' && <Product product={product}/>)}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
