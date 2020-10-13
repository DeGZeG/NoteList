import React from 'react';
import Categories from "./Categories";

function Menu() {
    return (
        <aside className='menu'>
            <header className='header menu__header'>
                <a href='#'><img className='logo' src='./img/logo.png' alt='Стыренный логотип'/></a>
            </header>
            <Categories />
        </aside>
    )
}



export default Menu;