import {
    ADD_CATEGORY,
    ADD_NOTE,
    CHANGE_CURRENT_CATEGORY,
    DELETE_CATEGORY,
    DELETE_NOTE, HIDE_ALERT, SHOW_ALERT,
    UPDATE_NOTE,
    UPDATE_SEARCH
} from "./types";

export function addCategory(categoryName) {
    return {
        type: ADD_CATEGORY,
        categoryName
    }
}

export function deleteCategory(categoryName) {
    return {
        type: DELETE_CATEGORY,
        categoryName
    }
}

export function changeCurrentCategory(categoryName) {
    return {
        type: CHANGE_CURRENT_CATEGORY,
        categoryName
    }
}

export function addNote(category, note) {
    return {
        type: ADD_NOTE,
        category,
        note
    }
}

export function deleteNote(noteId) {
    return {
        type: DELETE_NOTE,
        noteId
    }
}

export function updateNote(category, note) {
    return {
        type: UPDATE_NOTE,
        category,
        note
    }
}

export function updateSearch(searchString) {
    return {
        type: UPDATE_SEARCH,
        searchString
    }
}

export function showAlert(alertText) {
    return {
        type: SHOW_ALERT,
        alertText
    }
}

export function hideAlert() {
    return {
        type: HIDE_ALERT
    }
}
