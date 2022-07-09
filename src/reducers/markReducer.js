import { findIndex } from "../utils/utils"

import { 
    FETCH_ALL_MARK,
    FETCH_ALL_MARK_FAIL,
    GET_MARK_BY_ID,
    GET_MARK_BY_ID_FAIL,
    RESET_MARK,
    RESET_MARK_FAIL,
    ADD_MARK,
    ADD_MARK_FAIL,
    UPDATE_MARK,
    UPDATE_MARK_FAIL,
    DELETE_MARK,
    DELETE_MARK_FAIL
   
} from '../action-types/mark-action-types'
const initialState ={
    listMark:[],
    mark: {}, 
    error :""
}
const markReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_MARK:{ 
            console.log(state);
            console.log(action.payload);
            return {...state, listMark: action.payload, error: ""}
        }
        case FETCH_ALL_MARK_FAIL:{
            console.log(state);
            console.log(action.payload);
            return {...state, error: action.payload, listMark : []}
            
        }
        case ADD_MARK:{
            const newList = [...state.listMark];
            newList.push(action.payload);
            return {...state, listMark: newList, error:""};
        }
        case ADD_MARK_FAIL:{
            console.log(action.payload)
            return {...state, error: action.payload}
        }
        case UPDATE_MARK:{
            const index = findIndex(state.listMark, action.payload.id)
            const newList = [...state.listMark];
            newList[index] = action.payload;
            console.log(newList);
            
            return {...state, listMark: newList, error :""};
        }
        case UPDATE_MARK_FAIL:{
            return {...state, error: action.payload}
        }
        case DELETE_MARK:{
            const index = findIndex(state.listMark, action.payload)
            const newList = [...state.listMark];
            newList.splice(index, 1);
            console.log(newList);
            return {...state, listMark: newList}
        }   
        case DELETE_MARK_FAIL:{
            return {...state, error: action.payload}
        }
        case GET_MARK_BY_ID:{
            console.log(state);
            return {...state, mark: action.payload}
        }
        case GET_MARK_BY_ID_FAIL:{
            return {...state, error: action.payload}
        }
        case RESET_MARK:{
            return {...state, mark: null, error:""}
        }
        case RESET_MARK_FAIL:{
            return {...state, error: action.payload}
        }
        
        default:
            return state   
    }
}

export default markReducer;