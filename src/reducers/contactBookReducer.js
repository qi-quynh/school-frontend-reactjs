import { findIndex } from "../utils/utils"

import { 
    FETCH_ALL_CONTACT_BOOK,
    FETCH_ALL_CONTACT_BOOK_FAIL,
    GET_CONTACT_BOOK_BY_ID,
    GET_CONTACT_BOOK_BY_ID_FAIL,
    RESET_CONTACT_BOOK,
    RESET_CONTACT_BOOK_FAIL,
    ADD_CONTACT_BOOK,
    ADD_CONTACT_BOOK_FAIL,
    UPDATE_CONTACT_BOOK,
    UPDATE_CONTACT_BOOK_FAIL,
    DELETE_CONTACT_BOOK,
    DELETE_CONTACT_BOOK_FAIL
   
} from '../action-types/contactBook-action-types'
const initialState ={
    listContactBook:[],
    contactBook: {},
    error :""
}
const contactBookReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_CONTACT_BOOK:{ 
            console.log(state);
            console.log(action.payload);
            return {...state, listContactBook: action.payload, error :""}
        }
        case FETCH_ALL_CONTACT_BOOK_FAIL:{
            console.log(state);
            console.log(action.payload);
            return {...state, listContactBook: [], error: action.payload}
            
        }
        case ADD_CONTACT_BOOK:{
            const newList = [...state.listContactBook];
            newList.push(action.payload);
            return {...state, listContactBook: newList , error : ""};
        }
        case ADD_CONTACT_BOOK_FAIL:{
            return {...state, error: action.payload}
        }
        case UPDATE_CONTACT_BOOK:{
            const index = findIndex(state.listContactBook, action.payload.id)
            const newList = [...state.listContactBook];
            newList[index] = action.payload;
            console.log(newList);
            
            return {...state, listContactBook: newList};
        }
        case UPDATE_CONTACT_BOOK_FAIL:{
            return {...state, error: action.payload}
        }
        case DELETE_CONTACT_BOOK:{
            const index = findIndex(state.listContactBook, action.payload)
            const newList = [...state.listContactBook];
            newList.splice(index, 1);
            console.log(newList);
            return {...state, listContactBook: newList}
        }   
        case DELETE_CONTACT_BOOK_FAIL:{
            return {...state, error: action.payload}
        }
        case GET_CONTACT_BOOK_BY_ID:{
            console.log("Tui nè");
            return {...state, contactBook: action.payload, error : ""}
        }
        case GET_CONTACT_BOOK_BY_ID_FAIL:{
            return {...state, error: action.payload}
        }
        case RESET_CONTACT_BOOK:{
            return {...state, contactBook: null, error : ""}
        }
        case RESET_CONTACT_BOOK_FAIL:{
            return {...state, error: action.payload}
        }
        
        default:
            return state   
    }
}

export default contactBookReducer;