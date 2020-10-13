import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {changeCurrentCategory, addNote} from "../redux/actions";
import Note from "./Note";

function Content(props) {
    const {content, currentCategory, changeCurrentCategory, searchString} = props;

    useEffect(() => {
        changeCurrentCategory(content[0].categoryName);
    }, []);

    return (
        <div className='notes'>
            {
                content.map(category => {
                    if (category.categoryName === currentCategory) {
                        return category.notes.map(note => {
                                if (note.noteName.toLowerCase().includes(searchString.toLowerCase()))
                                    return <Note note={note} key={note.id}/>
                            }
                        );
                    }
                })
            }
        </div>
    )
}

const mapStateToProps = state => ({
    currentCategory: state.content.currentCategory,
    content: state.content.content,
    searchString: state.app.search
});

const mapDispatchToProps = {
    changeCurrentCategory, addNote
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);