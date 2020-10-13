import React, {useRef, useState, useEffect} from 'react';
import {connect} from "react-redux";
import {addNote, showAlert, hideAlert, updateSearch} from '../redux/actions'

function AddNote(props) {
    const {content, currentCategory, currentId, addNote, updateSearch, showAlert, hideAlert} = props;
    const popupRef = useRef(null);
    const [noteNameInput, setNoteNameInput] = useState('');
    const [inputs, setInputs] = useState(['']);
    const [textarea, setTextarea] = useState(true);

    function popupToggle(_, event) {
        if (event) {
            if (event.target === popupRef.current) popupRef.current.classList.toggle('hide');
        }
        else popupRef.current.classList.toggle('hide');
    }

    function handleAddNoteButton() {
        const noteInputs = inputs.map(input => ({
            inputName: input,
            inputValue: ''
        }));
        const noteTextarea = textarea ? '' : null;
        const newNote = {
            id: currentId+1,
            noteName: noteNameInput,
            inputs: noteInputs,
            textarea: noteTextarea
        };

        if (!noteInputs.filter(input => input.inputName === '')[0] && noteNameInput) {
            addNote(currentCategory, newNote);
            setInputs(['']);
            setNoteNameInput('');
            setTextarea(true);
            hideAlert();
            popupToggle();
        }
        else {
            showAlert('Заполните все поля!');
        }
    }

    function addInput() {
        const temp = inputs.slice();
        setInputs([...inputs, '']);
    }

    function deleteInput(index) {
        const temp = inputs.slice();
        temp.splice(index, 1);
        setInputs(temp);
    }

    function handleInputsChange(e, index) {
        const temp = inputs.slice();
        temp.splice(index, 1, e.target.value);
        setInputs(temp);
    }

    function handleSearchChange(e) {
        updateSearch(e.target.value.trim());
    }

    return (
        <>
            <button onClick={popupToggle} className="btn main-header__add-button">Добавить заметку</button>
            <input onChange={handleSearchChange} className='main-header__search' type='text' placeholder='Поиск'/>
            <div ref={popupRef} onClick={event => popupToggle.call(null, null, event)} className='main__popup-overlay hide'>
                <div className='main__popup'>
                    <div className='popup__container'>
                        <p className='popup__title'>Добавить заметку</p>
                        <div onClick={popupToggle} className='cancel-btn popup__close' />
                        <input
                            onChange={(e) => setNoteNameInput(e.target.value)}
                            required
                            className='popup__name-input'
                            type='text'
                            value={noteNameInput}
                            placeholder='Название заметки' />
                        <div className='popup__checkbox'>
                            <label htmlFor="textarea-checkbox">Использовать большое текстовое поле</label>
                            <input
                                onChange={() => setTextarea(!textarea)}
                                type='checkbox'
                                defaultChecked
                                id='textarea-checkbox'/>
                        </div>
                        <button className='btn popup__add-input' onClick={addInput}>Добавить поле</button>
                        {
                            inputs.map((input, i) => {
                                return (
                                    <div className='input-wrapper' key={i}>
                                        <input
                                            className='popup__input'
                                            type='text'
                                            onChange={e => handleInputsChange.call(null, e, i)}
                                            placeholder='Название поля'
                                            required
                                            value={input}
                                        />
                                        <div
                                            className='delete-btn'
                                            onClick={deleteInput.bind(null, i)}
                                        />
                                    </div>
                                    )
                            })
                        }
                        <button className='btn popup__add-note' onClick={handleAddNoteButton}>Добавить</button>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    currentCategory: state.content.currentCategory,
    currentId: state.content.currentId,
    content: state.content.content,
});

const mapDispatchToProps = {
    addNote, updateSearch, showAlert, hideAlert
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNote);