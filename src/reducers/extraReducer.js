import { findIndex } from "../utils/utils"

import { 
    FETCH_ALL_EXTRA,
    FETCH_ALL_EXTRA_FAIL,
    GET_EXTRA_BY_ID,
    GET_EXTRA_BY_ID_FAIL,
    RESET_EXTRA,
    RESET_EXTRA_FAIL,
    ADD_EXTRA,
    ADD_EXTRA_FAIL,
    UPDATE_EXTRA,
    UPDATE_EXTRA_FAIL,
    DELETE_EXTRA,
    DELETE_EXTRA_FAIL
   
} from '../action-types/extra-action-types'
const initialState ={
    listExtra:[],
    extra: {},
    error :""
}
const extraReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_EXTRA:{ 
            
            return {...state, listExtra: action.payload, error: ""}
        }
        case FETCH_ALL_EXTRA_FAIL:{
            
            return {...state, listExtra: [],error: action.payload}
            
        }
        case ADD_EXTRA:{
            const newList = [...state.listExtra];
            newList.push(action.payload);
            return {...state, listExtra: newList};
        }
        case ADD_EXTRA_FAIL:{
            return {...state, error: action.payload}
        }
        case UPDATE_EXTRA:{
            const index = findIndex(state.listExtra, action.payload.id)
            const newList = [...state.listExtra];
            newList[index] = action.payload;
            console.log(newList);
            
            return {...state, listExtra: newList};
        }
        case UPDATE_EXTRA_FAIL:{
            return {...state, error: action.payload}
        }
        case DELETE_EXTRA:{
            const index = findIndex(state.listExtra, action.payload)
            const newList = [...state.listExtra];
            newList.splice(index, 1);
            console.log(newList);
            return {...state, listExtra: newList}
        }   
        case DELETE_EXTRA_FAIL:{
            return {...state, error: action.payload}
        }
        case GET_EXTRA_BY_ID:{
            console.log("Tui nè");
            return {...state, extra: action.payload}
        }
        case GET_EXTRA_BY_ID_FAIL:{
            return {...state, error: action.payload}
        }
        case RESET_EXTRA:{
            return {...state, extra: null}
        }
        case RESET_EXTRA_FAIL:{
            return {...state, error: action.payload}
        }
        
        default:
            return state   
    }
}

export default extraReducer;