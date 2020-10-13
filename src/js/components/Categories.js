import React, {useState} from 'react';
import {connect} from 'react-redux';
import {addCategory, changeCurrentCategory, deleteCategory, showAlert, hideAlert} from '../redux/actions'

function Categories(props) {
    const {content, changeCurrentCategory, addCategory, deleteCategory, currentCategory, showAlert, hideAlert} = props;
    const [newCategoryName, setNewCategoryName] = useState('');

    function handleAddCategoryButton() {
        const allCategories = content.map(category => category.categoryName.toLowerCase());

        if (!newCategoryName.trim()) {
            showAlert('Введите название раздела!');
        }
        else if (allCategories.includes(newCategoryName.toLowerCase())) {
            showAlert('Такой раздел уже существует!');
        }

        if (newCategoryName.trim() && !allCategories.includes(newCategoryName.toLowerCase())) {
            addCategory(newCategoryName);
            changeCurrentCategory(newCategoryName);
            setNewCategoryName('');
            hideAlert();
        }
    }

    function itemClickHandler(categoryName) {
        changeCurrentCategory(categoryName);
    }

    function handleDeleteButton() {
        deleteCategory(currentCategory);
    }

    return (
        <div className='categories'>
            <ul className='categories-list'>
                {content.map(category => {
                    return (
                        <li
                            className="categories-list__item"
                            key={category.categoryName}
                            onClick={itemClickHandler.bind(null, category.categoryName)}
                        >
                            {
                                currentCategory === category.categoryName ? <b style={{color: '#29ce24'}}>{category.categoryName}</b> : category.categoryName
                            }
                        </li>
                    )
                })}
            </ul>
            <input onChange={e => setNewCategoryName(e.target.value)} className='categories__input' type='text' value={newCategoryName} placeholder='Название раздела' />
            <button onClick={handleAddCategoryButton} className="btn categories__add-btn">Добавить раздел</button>
            <button className='btn categories__delete-btn' onClick={handleDeleteButton}>Удалить текущий раздел</button>
        </div>
    )
}

const mapStateToProps = state => ({
    content: state.content.content,
    currentCategory: state.content.currentCategory
});

const mapDispatchToProps = {
    addCategory, changeCurrentCategory, deleteCategory, showAlert, hideAlert
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);