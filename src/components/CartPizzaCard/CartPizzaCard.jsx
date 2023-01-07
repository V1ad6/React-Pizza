import React, { useState } from 'react';
import cl from './CartPizzaCard.module.scss';

const CartPizzaCard = ({ id, pizza, pizzas, setPizzas, setPrice }) => {
    const [count, setCount] = useState(pizza.count);

    const decreaseCounter = () => {
        setCount(prev => prev > 0 ? prev - 1 : prev);
        if (pizza.count > 0) {
            pizza.count -= 1;
            setPrice(prev => prev - pizza.price);
        }
    }

    const increaseCounter = () => {
        setCount(prev => prev + 1);
        pizza.count += 1;
        setPrice(prev => prev + pizza.price);
    }

    return (
        <div className={cl.card}>
            <div className={cl.mainInfo}>
                <img src={pizza.imgURL} alt="pizza" className={cl.pizzaImg}/>
                <div>
                    <h3>{pizza.title}</h3>
                    <p>{pizza.thickness} тесто, {pizza.size}</p>
                </div>
            </div>
            <div className={cl.count}>
                <button onClick={decreaseCounter}>-</button>
                <h3>{count}</h3>
                <button onClick={increaseCounter}>+</button> 
            </div>
            <div className={cl.end}>
                <h3>от {pizza.price} ₴</h3> 
                <button 
                    className={cl.remove}
                    onClick={() => {
                        setPizzas(pizzas.filter((pizza) => pizza.id2 !== id));
                        pizza.count = 1;
                    }}
                >
                    <img src="/images/remove.svg" alt="remove"/>
                </button>
            </div>
        </div>
    );
}

export default CartPizzaCard;
