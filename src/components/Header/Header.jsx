import React from 'react';
import { Link } from 'react-router-dom';
import cl from './Header.module.scss';

const Header = ({ display1, display2, cartCount, cartPrice }) => {
    return (
        <div className={cl.head}>
            <div className={cl.intro}>
                <img src="/images/pizza.png" alt="logo" />
                <div className={cl.body}>
                    <h1>REACT PIZZA</h1>
                    <p>самая вкусная пицца во вселенной</p>
                </div>
            </div>

            <Link className={cl.cartInfo} style={{display: display1}} to='/cart'>
                <h5 className={cl.price}>{cartPrice} ₴</h5>
                <div>
                    <img src="/images/cartImg.svg" alt="cart"/>
                    <h5>{cartCount}</h5>
                </div>
            </Link>

            <Link to={'/'} style={{display: display2}} className={cl.back}>Назад</Link>
        </div>
    );
}

export default Header;
