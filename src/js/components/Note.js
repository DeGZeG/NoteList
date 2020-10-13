import React, {useState, useRef, useEffect} from 'react';
import {connect} from 'react-redux'
import {updateNote, deleteNote} from "../redux/actions";
import { TextareaAutosize } from '@material-ui/core';

function Note({note, content, currentCategory, updateNote, deleteNote}) {
    const [inputs, setInputs] = useState(note.inputs.slice().map(inputs => Object.assign({}, inputs)));
    const [textarea, setTextarea] = useState(note.textarea);
    const [saved, setSaved] = useState(true);
    const headerRef = useRef(null);
    const bodyRef = useRef(null);

    function handleInputsChange(e, inputIndex) {
        const tempInputs = inputs.map((input, index) => {
            if (inputIndex === index) {
                input.inputValue = e.target.value;
            }
            return input;
        });
        setInputs(tempInputs);
        setSaved(false);
    }

    function handleTextareaChange(e) {
        setTextarea(e.target.value);
        setSaved(false);
    }

    function saveButtonHandler() {
        const newNote = {
            ...note,
            inputs: inputs.slice().map(inputs => Object.assign({}, inputs)),
            textarea
        };
        updateNote(currentCategory, newNote);
        setSaved(true);
    }

    function deleteButtonHandler() {
        deleteNote(note.id);
    }

    function toggleNoteBody() {
        headerRef.current.classList.toggle('note__header_opened');
        bodyRef.current.classList.toggle('hide');
    }

    return (
        <div className='note'>
            <div ref={headerRef} onClick={toggleNoteBody} className='note__header'>
                <p className='note__name'>{note.noteName}</p>
                {
                    !saved && <div onClick={saveButtonHandler} className='note__save-btn save-btn' />
                }
                <div onClick={deleteButtonHandler} className='note__delete-btn delete-btn' />
            </div>
            <div ref={bodyRef} className='note__body hide'>
                {
                    inputs.map((input, i) => {
                        return (
                            <div className='note__input-wrapper' key={i}>
                                <label className='note__input-name'>{input.inputName}:</label>
                                <input onChange={e => handleInputsChange.call(null, e, i)} className='note__input' type='text' value={input.inputValue}/>
                            </div>
                        )
                    })
                }
                {
                    note.textarea !== null && (
                        <div className='note__input-wrapper'>
                            <label className='note__input-name'>Текст к заметке:</label>
                            <textarea onChange={handleTextareaChange} className='note__text' rows='5' value={textarea} />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    currentCategory: state.content.currentCategory,
    content: state.content.content
});

const mapDispatchToProps = {
    updateNote, deleteNote
};

export default connect(mapStateToProps, mapDispatchToProps)(Note);