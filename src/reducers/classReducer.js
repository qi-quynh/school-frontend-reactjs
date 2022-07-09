import { findIndex } from "../utils/utils"

import { 
    FETCH_ALL_CLASS,
    FETCH_ALL_CLASS_FAIL,
    GET_CLASS_BY_ID,
    GET_CLASS_BY_ID_FAIL,
    RESET_CLASS, 
    RESET_CLASS_FAIL,
    ADD_CLASS,
    ADD_CLASS_FAIL,
    UPDATE_CLASS,
    UPDATE_CLASS_FAIL,
    DELETE_CLASS,
    DELETE_CLASS_FAIL
   
} from '../action-types/class-action-types'
const initialState ={
    listClass:[],
    class: {}, 
    error : ""
}
const classReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_CLASS:{ 
            console.log(state);
            console.log(action.payload);
            return {...state, listClass: action.payload, error: ""}
        }
        case FETCH_ALL_CLASS_FAIL:{
            console.log(state);
            console.log(action.payload);
            return {...state, listClass : [],  error: action.payload}
            
        }
        case ADD_CLASS:{
            const newList = [...state.listClass];
            newList.push(action.payload);
            return {...state, listClass: newList, error:""};
        }
        case ADD_CLASS_FAIL:{
            console.log(action.payload);
            return {...state, error: action.payload}
        }
        case UPDATE_CLASS:{
            const index = findIndex(state.listClass, action.payload.id)
            const newList = [...state.listClass];
            newList[index] = action.payload;
            console.log(newList);
            
            return {...state, listCLASS: newList};
        }
        case UPDATE_CLASS_FAIL:{
            return {...state, error: action.payload}
        }
        case DELETE_CLASS:{
            const index = findIndex(state.listClass, action.payload)
            const newList = [...state.listClass];
            newList.splice(index, 1);
            console.log(newList);
            console.log(index);
            return {...state, listClass: newList}
        }   
        case DELETE_CLASS_FAIL:{
            return {...state, error: action.payload}
        }
        case GET_CLASS_BY_ID:{
            console.log(state);
            return {...state, class: action.payload, error :""}
        }
        case GET_CLASS_BY_ID_FAIL:{
            return {...state, error: action.payload}
        }
        case RESET_CLASS:{
            return {...state, class: null}
        }
        case RESET_CLASS_FAIL:{
            return {...state, error: action.payload}
        }
        
        default:
            return state   
    }
}

export default classReducer;