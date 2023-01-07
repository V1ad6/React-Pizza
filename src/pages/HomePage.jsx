import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Categories from '../components/Categories';
import Header from '../components/Header/Header';
import PizzaCard from '../components/PizzaCard/PizzaCard';
import '../search.scss';
import '../shop.scss';

const HomePage = ({ cartPizzas, setCartPizzas, cartCount, cartPrice, lastCartId, setLastCartId }) => {
    const [pizzas, setPizzas] = useState([]);
    const [categories, setCategories] = useState({});
    const [sort, setSort] = useState({});
    const [sortParametr, setSortParametr] = useState('популярности');
    const [sortFunc, setSortFunc] = useState({f: sortByOrders});
    const [category, setCategory] = useState('');
    const [shopTitle, setShopTitle] = useState('Все');
    

    useEffect(() => {
        axios.get('http://localhost:3001/pizzas')
            .then(json => setPizzas(json.data));
    }, []);

    function sortByOrders(prevItem, item) {
        return item.orders - prevItem.orders;
    }

    function showCategories(e) {
        categories.display === 'flex' 
        ? setCategories({top: e.clientY, left: e.clientX, display: 'none'})
        : setCategories({top: e.clientY, left: e.clientX, display: 'flex'});
        
        e.stopPropagation(); 
    }

    function showSort(e) {
        sort.display === 'flex' 
        ? setSort({top: e.clientY, left: e.clientX, display: 'none'})
        : setSort({top: e.clientY, left: e.clientX, display: 'flex'});

        e.stopPropagation();
    }

    return (
        <div style={{height: '100%'}} onClick={(e) => { 
            setCategories({...categories, display: 'none'});
            setSort({...sort, display: 'none'});
        }}>
            <Header display1='flex' display2='none' cartCount={cartCount} cartPrice={cartPrice}/>

            <div className="search">
                <div className="categories">
                    <h5 onClick={e => showCategories(e)} className='categories__title'>Выберите категорию</h5>
                    <Categories 
                        mod='categories__selector_mob'
                        style={{top: categories.top, left: categories.left, display: categories.display}} 
                        category={category}
                        setCategory={setCategory}
                        setShopTitle={setShopTitle}
                    />
                    <Categories 
                        mod='categories__selector_comp'
                        setCategory={setCategory}
                        setShopTitle={setShopTitle}
                    />
                </div>
                <div className="sort">
                    <h5 onClick={e => showSort(e) }>Сортировка по: <span>{sortParametr}</span></h5>
                    <ul 
                        style={{top: sort.top, left: sort.left, display: sort.display}}
                        onClick={e => {
                            if (e.target.tagName !== 'LI') return;

                            setSortParametr(e.target.textContent);
                        }}
                    >
                        <li onClick={() => setSortFunc({f: (prevItem, item) => item.orders - prevItem.orders })}>популярности</li>
                        <li onClick={() => setSortFunc({f: (prevItem, item) => prevItem.price - item.price})}>цене</li>
                        <li onClick={() => setSortFunc({f: (prevItem, item) => prevItem.title > item.title ? 1 : -1})}>алфавиту</li>
                    </ul>
                </div>
            </div>

            <div className="shop">
                <h1 className='shop__title'>{shopTitle} пиццы</h1>
                <div className='shop__content'>
                    {pizzas
                        .sort(sortFunc.f)
                        .filter(pizza => pizza.feature.toLowerCase().includes(category.toLowerCase()))
                        .map((card, index) => 
                            <PizzaCard 
                                key={index} 
                                pizza={card} 
                                title={card.title} 
                                imgURL={card.imgURL} 
                                price={card.price}
                                cartPizzas={cartPizzas}
                                setCartPizzas={setCartPizzas}
                                cartCount={cartCount}
                                lastCartId={lastCartId}
                                setLastCartId={setLastCartId}
                            />   
                    )}
                </div>
            </div>
        </div>
    ); 
}

export default HomePage;