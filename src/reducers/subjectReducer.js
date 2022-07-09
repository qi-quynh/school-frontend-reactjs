import { findIndex } from "../utils/utils"

import { 
    FETCH_ALL_SUBJECT,
    FETCH_ALL_SUBJECT_FAIL,
    GET_SUBJECT_BY_ID,
    GET_SUBJECT_BY_ID_FAIL,
    RESET_SUBJECT,
    RESET_SUBJECT_FAIL,
    ADD_SUBJECT,
    ADD_SUBJECT_FAIL,
    UPDATE_SUBJECT,
    UPDATE_SUBJECT_FAIL,
    DELETE_SUBJECT,
    DELETE_SUBJECT_FAIL
   
} from '../action-types/subject-action-types'
const initialState ={
    listSubject:[],
    subject: {},
    error :""
}
const subjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_SUBJECT:{ 
            console.log(state);
            console.log(action.payload);
            return {...state, listSubject: action.payload, error : ""}
        }
        case FETCH_ALL_SUBJECT_FAIL:{
            console.log(state);
            console.log(action.payload);
            return {...state, listSubject: [],error: action.payload}
            
        }
        case ADD_SUBJECT:{
            const newList = [...state.listSubject];
            newList.push(action.payload);
            return {...state, listSubject: newList};
        }
        case ADD_SUBJECT_FAIL:{
            return {...state, error: action.payload}
        }
        case UPDATE_SUBJECT:{
            const index = findIndex(state.listSubject, action.payload.id)
            const newList = [...state.listSubject];
            newList[index] = action.payload;
            console.log(newList);
            
            return {...state, listSubject: newList, error : ""};
        }
        case UPDATE_SUBJECT_FAIL:{
            return {...state, error: action.payload}
        }
        case DELETE_SUBJECT:{
            const index = findIndex(state.listSubject, action.payload)
            const newList = [...state.listSubject];
            newList.splice(index, 1);
            console.log(newList);
            return {...state, listSubject: newList}
        }   
        case DELETE_SUBJECT_FAIL:{
            return {...state, error: action.payload}
        }
        case GET_SUBJECT_BY_ID:{
            console.log(state);
            return {...state, subject: action.payload, error : ""}
        }
        case GET_SUBJECT_BY_ID_FAIL:{
            return {...state, error: action.payload}
        }
        case RESET_SUBJECT:{
            return {...state, subject: null}
        }
        case RESET_SUBJECT_FAIL:{
            return {...state, error: action.payload}
        }
        
        default:
            return state   
    }
}

export default subjectReducer;