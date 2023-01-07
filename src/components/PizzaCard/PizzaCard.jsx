import React, { useState } from 'react';
import cl from './PizzaCard.module.scss';

const PizzaCard = ({ pizza, title, imgURL, price, cartPizzas, setCartPizzas, lastCartId, setLastCartId }) => {
    const [color, setColor] = useState('#FE5F1E');
    const [li1Prev, setLi1Prev] = useState();
    const [li2Prev, setLi2Prev] = useState();
    const [addParametrs, setAddParametrs] = useState({thickness: '', size: ''});

    function getThickness(e) {
        const li = e.target;
        if (li.tagName !== 'LI') return;

        li1Prev?.classList.remove('op5');
        li.classList.add('op5');

        if (li === li1Prev) {
            li.classList.remove('op5');
            setLi1Prev(null);
            setAddParametrs({...addParametrs, thickness: ''});
        } else {
            setLi1Prev(li);
            setAddParametrs({...addParametrs, thickness: li.textContent});
        }
    }

    function getSize(e) {
        const li = e.target;
        if (e.target.tagName !== 'LI') return;
        
        li2Prev?.classList.remove('op5');
        li.classList.add('op5');

        if (li === li2Prev) {
            li.classList.remove('op5');
            setLi2Prev(null);
            setAddParametrs({...addParametrs, size: ''});
        } else {
            setLi2Prev(li);
            setAddParametrs({...addParametrs, size: li.textContent});
        }
    }

    return (
        <div className={cl.card}>
            <img src={imgURL} alt="pizza"/>
            <h3>{title}</h3>
            <ul onClick={e => getThickness(e)}>
                <li>тонкое</li>
                <li>традиционное</li>
            </ul>
            <ul onClick={e => getSize(e)}>
                <li>26 см.</li>
                <li>30 см.</li>
                <li>40 см.</li>
            </ul>
            <div className={cl.priceNadd}>
                <h1>от {price} ₴</h1>
                <button 
                    onPointerOver={() => setColor('white')}
                    onPointerOut={() => setColor('#FE5F1E')}
                    onClick={() => {
                        if (addParametrs.thickness === '' || addParametrs.size === '') {
                            alert('Укажите размер и толщину теста пиццы');
                        } else {
                            setLastCartId(lastCartId + 1);
                            setCartPizzas([...cartPizzas, {...pizza, ...addParametrs, id2: lastCartId, count: 1}]);
                        }
                    }}
                >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z" fill={color}/>
                    </svg>
                    <p>Добавить</p>
                </button>
            </div>
        </div>
    );
}

export default PizzaCard;