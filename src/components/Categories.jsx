import React, { useState } from 'react';

const Categories = ({ style, mod, setCategory, setShopTitle }) => {
    const [liPrev, setliPrev] = useState();

    return (
        <ul
            className={"categories__selector " + mod} 
            style={style}
            onClick={e => { 
                e.stopPropagation();
                
                const li = e.target;

                if (li.tagName !== 'LI') return;

                setCategory(li.dataset.feature);
                setShopTitle(li.textContent);

                if (mod === 'categories__selector_mob') return;

                li.classList.add('category-active');
                liPrev?.classList.remove('category-active');
                setliPrev(li);
            }}
        >
            <li data-feature="">Все</li>
            <li data-feature="Мясные">Мясные</li>
            <li data-feature="Вегетарианские">Вегетарианские</li>
            <li data-feature="Гриль">Гриль</li>
            <li data-feature="Острые">Острые</li>
            <li data-feature="Закрытые">Закрытые</li>
        </ul>
    );
}

export default Categories;
