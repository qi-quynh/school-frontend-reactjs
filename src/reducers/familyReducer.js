import { findIndex } from "../utils/utils"

import { 
    FETCH_ALL_FAMILY,
    FETCH_ALL_FAMILY_FAIL,
    GET_FAMILY_BY_ID,
    GET_FAMILY_BY_ID_FAIL,
    RESET_FAMILY,
    RESET_FAMILY_FAIL,
    ADD_FAMILY,
    ADD_FAMILY_FAIL,
    UPDATE_FAMILY,
    UPDATE_FAMILY_FAIL,
    DELETE_FAMILY,
    DELETE_FAMILY_FAIL
   
} from '../action-types/family-action-types'
const initialState ={
    listFamily:[],
    family: {},
    error :""
}
const familyReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_FAMILY:{ 
            console.log(state);
            console.log(action.payload);
            return {...state, listFamily: action.payload, error: ""}
        }
        case FETCH_ALL_FAMILY_FAIL:{
            console.log(state);
            console.log(action.payload);
            return {...state, listFamily: [],error: action.payload}
            
        }
        case ADD_FAMILY:{
            const newList = [...state.listFamily];
            newList.push(action.payload);
            return {...state, listFamily: newList};
        }
        case ADD_FAMILY_FAIL:{
            return {...state, error: action.payload}
        }
        case UPDATE_FAMILY:{
            const index = findIndex(state.listFamily, action.payload.id)
            const newList = [...state.listFamily];
            newList[index] = action.payload;
            console.log(newList);
            
            return {...state, listFamily: newList};
        }
        case UPDATE_FAMILY_FAIL:{
            return {...state, error: action.payload}
        }
        case DELETE_FAMILY:{
            const index = findIndex(state.listFamily, action.payload)
            const newList = [...state.listFamily];
            newList.splice(index, 1);
            console.log(newList);
            return {...state, listFamily: newList}
        }   
        case DELETE_FAMILY_FAIL:{
            return {...state, error: action.payload}
        }
        case GET_FAMILY_BY_ID:{
            console.log("Tui nè");
            return {...state, family: action.payload}
        }
        case GET_FAMILY_BY_ID_FAIL:{
            return {...state, error: action.payload}
        }
        case RESET_FAMILY:{
            return {...state, family: null}
        }
        case RESET_FAMILY_FAIL:{
            return {...state, error: action.payload}
        }
        
        default:
            return state   
    }
}

export default familyReducer;