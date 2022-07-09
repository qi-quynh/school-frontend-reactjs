import { findIndex } from "../utils/utils"

import { 
    FETCH_ALL_YEAR,
    FETCH_ALL_YEAR_FAIL,
    GET_YEAR_BY_ID,
    GET_YEAR_BY_ID_FAIL,
    RESET_YEAR,
    RESET_YEAR_FAIL,
    ADD_YEAR,
    ADD_YEAR_FAIL,
    UPDATE_YEAR,
    UPDATE_YEAR_FAIL,
    DELETE_YEAR,
    DELETE_YEAR_FAIL
   
} from '../action-types/year-action-types'
const initialState ={
    listYear:[],
    year: {},
    error :""
}
const yearReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_YEAR:{ 
            console.log(state);
            console.log(action.payload);
            return {...state, listYear: action.payload}
        }
        case FETCH_ALL_YEAR_FAIL:{
            console.log(state);
            console.log(action.payload);
            return {...state, listYear: [],error: action.payload}
            
        }
        case ADD_YEAR:{
            const newList = [...state.listYear];
            newList.push(action.payload);
            return {...state, listYear: newList};
        }
        case ADD_YEAR_FAIL:{
            return {...state, error: action.payload}
        }
        case UPDATE_YEAR:{
            const index = findIndex(state.listYear, action.payload.id)
            const newList = [...state.listYear];
            newList[index] = action.payload;
            console.log(newList);
            
            return {...state, listYear: newList};
        }
        case UPDATE_YEAR_FAIL:{
            return {...state, error: action.payload}
        }
        case DELETE_YEAR:{
            const index = findIndex(state.listYear, action.payload)
            const newList = [...state.listYear];
            newList.splice(index, 1);
            console.log(newList);
            return {...state, listYear: newList}
        }   
        case DELETE_YEAR_FAIL:{
            return {...state, error: action.payload}
        }
        case GET_YEAR_BY_ID:{
            console.log("Tui nè");
            return {...state, year: action.payload}
        }
        case GET_YEAR_BY_ID_FAIL:{
            return {...state, error: action.payload}
        }
        case RESET_YEAR:{
            return {...state, year: null}
        }
        case RESET_YEAR_FAIL:{
            return {...state, error: action.payload}
        }
        
        default:
            return state   
    }
}

export default yearReducer;