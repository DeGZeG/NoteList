import {
    ADD_CATEGORY,
    ADD_NOTE,
    CHANGE_CURRENT_CATEGORY,
    DELETE_CATEGORY,
    DELETE_NOTE, HIDE_ALERT, SHOW_ALERT,
    UPDATE_NOTE,
    UPDATE_SEARCH
} from "./types";
import {combineReducers} from "redux";

const initContent = {
    currentCategory: '',
    currentId: 2,
    content: [
        {
            categoryName: 'Аккаунты',
            notes: [
                {
                    id: 1,
                    noteName: 'Основная почта',
                    inputs: [
                        {
                            inputName: 'Почта',
                            inputValue: 'degzeg@gmail.com'
                        }
                    ],
                    textarea: 'Большая история о том, как я зарегистрировал эту почту'
                },
                {
                    id: 2,
                    noteName: 'Данные от какого-нибудь аккаунта',
                    inputs: [
                        {
                            inputName: 'Логин',
                            inputValue: 'login123'
                        },
                        {
                            inputName: 'Пароль',
                            inputValue: 'password321'
                        }
                    ],
                    textarea: null
                }
            ]
        },
        {
            categoryName: 'Тестовая категория',
            notes: [

            ]
        },
    ]
};

function contentReducer(state = initContent, action) {
    switch (action.type) {
        case ADD_NOTE:
            return {
                ...state,
                currentId: state.currentId + 1,
                content: state.content.map(category => {
                    if (category.categoryName === action.category) category.notes.push(action.note);
                    return category;
                })
            };

        case DELETE_NOTE:
            return {
                ...state,
                content: state.content.map(category => {
                    category.notes = category.notes.filter(note => note.id !== action.noteId);
                    return category;
                })
            };

        case UPDATE_NOTE:
            let newState = {
                ...state,
                content: state.content.map(category => {
                    if (category.categoryName === action.category) {
                        category.notes = category.notes.map(note => {
                            if (note.id === action.note.id) return action.note;
                            return note;
                        });
                    }
                    return category;
                })
            };
            return newState;

        case ADD_CATEGORY:
            if (action.categoryName.trim())
                return {...state, content: [...state.content, {categoryName: action.categoryName, notes: []}]};
            else return state;

        case DELETE_CATEGORY:
            if (action.categoryName)
                return {...state, content: state.content.filter(category => category.categoryName !== action.categoryName)};
            else return state;

        case CHANGE_CURRENT_CATEGORY:
            return {...state, currentCategory: action.categoryName};

        default:
            return state;
    }
}

const initApp = {
    search: '',
    alertShow: false,
    alertText: ''
};

function appReducer(state = initApp, action) {
    switch (action.type) {
        case UPDATE_SEARCH:
            return {...state, search: action.searchString};
        case SHOW_ALERT:
            return {...state, alertShow: true, alertText: action.alertText};
        case HIDE_ALERT:
            return {...state, alertShow: false, alertText: ''};
        default:
            return state;
    }
}

export const rootReducer = combineReducers({
    content: contentReducer,
    app: appReducer
});
