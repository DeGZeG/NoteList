import React from 'react';
import Content from "./Content";
import AddNote from "./AddNote";

function Main() {
    return (
        <main className='main'>
            <header className="header main-header">
                <AddNote />
            </header>
            <Content />
        </main>
    )
}

export default Main;