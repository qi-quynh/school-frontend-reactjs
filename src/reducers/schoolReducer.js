import { findIndex } from "../utils/utils"

import { 
    FETCH_ALL_SCHOOL,
    FETCH_ALL_SCHOOL_FAIL,
    GET_SCHOOL_BY_ID,
    GET_SCHOOL_BY_ID_FAIL,
    RESET_SCHOOL,
    RESET_SCHOOL_FAIL,
    ADD_SCHOOL,
    ADD_SCHOOL_FAIL,
    UPDATE_SCHOOL,
    UPDATE_SCHOOL_FAIL,
    DELETE_SCHOOL,
    DELETE_SCHOOL_FAIL
   
} from '../action-types/school-action-types'
const initialState ={
    listSchool:[],
    school: {}
}
const schoolReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_SCHOOL:{ 
            console.log(state);
            console.log(action.payload);
            return {...state, listSchool: action.payload, error : "" }
        }
        case FETCH_ALL_SCHOOL_FAIL:{
            console.log(state);
            console.log(action.payload);
            return {...state, listSchool: [], error: action.payload}
            
        }
        case ADD_SCHOOL:{
            const newList = [...state.listSchool];
            newList.push(action.payload);
            return {...state, listSchool: newList};
        }
        case ADD_SCHOOL_FAIL:{
            return {...state, error: action.payload}
        }
        case UPDATE_SCHOOL:{
            const index = findIndex(state.listSchool, action.payload.id)
            const newList = [...state.listSchool];
            newList[index] = action.payload;
            console.log(newList);
            
            return {...state, listSchool: newList};
        }
        case UPDATE_SCHOOL_FAIL:{
            return {...state, error: action.payload}
        }
        case DELETE_SCHOOL:{
            const index = findIndex(state.listSchool, action.payload)
            const newList = [...state.listSchool];
            newList.splice(index, 1);
            console.log(newList);
            return {...state, listSchool: newList}
        }   
        case DELETE_SCHOOL_FAIL:{
            return {...state, error: action.payload}
        }
        case GET_SCHOOL_BY_ID:{
            console.log(state);
            return {...state, school: action.payload}
        }
        case GET_SCHOOL_BY_ID_FAIL:{
            return {...state, error: action.payload}
        }
        case RESET_SCHOOL:{
            return {...state, school: null}
        }
        case RESET_SCHOOL_FAIL:{
            return {...state, error: action.payload}
        }
        
        default:
            return state   
    }
}

export default schoolReducer;