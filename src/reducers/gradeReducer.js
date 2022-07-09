import { findIndex } from "../utils/utils"

import { 
    FETCH_ALL_GRADE,
    FETCH_ALL_GRADE_FAIL,
    GET_GRADE_BY_ID,
    GET_GRADE_BY_ID_FAIL,
    RESET_GRADE,
    RESET_GRADE_FAIL,
    ADD_GRADE,
    ADD_GRADE_FAIL,
    UPDATE_GRADE,
    UPDATE_GRADE_FAIL,
    DELETE_GRADE,
    DELETE_GRADE_FAIL
   
} from '../action-types/grade-action-types'
const initialState ={
    listGrade:[],
    grade: {}
}
const gradeReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_GRADE:{ 
            console.log(state);
            console.log(action.payload);
            return {...state, listGrade: action.payload, error: ""}
        }
        case FETCH_ALL_GRADE_FAIL:{
            console.log(state);
            console.log(action.payload);
            return {...state, listGrade : [], error: action.payload}
            
        }
        case ADD_GRADE:{
            const newList = [...state.listGrade];
            newList.push(action.payload);
            return {...state, listGrade: newList};
        }
        case ADD_GRADE_FAIL:{
            return {...state, error: action.payload}
        }
        case UPDATE_GRADE:{
            
            const index = findIndex(state.listGrade, action.payload.id)
            const newList = [...state.listGrade];
            newList[index] = action.payload;
            console.log(newList);
            
            return {...state, listGrade: newList};
        }
        case UPDATE_GRADE_FAIL:{
            return {...state, error: action.payload}
        }
        case DELETE_GRADE:{
            console.log("Dang xoa");
            console.log(action.payload);
            const index = findIndex(state.listGrade, action.payload)
            console.log(index);
            console.log(state.listGrade);
            const newList = [...state.listGrade];
            newList.splice(index, 1);
            console.log(newList);
            return {...state, listGrade: newList}
        }   
        case DELETE_GRADE_FAIL:{
            return {...state, error: action.payload}
        }
        case GET_GRADE_BY_ID:{
            console.log(state);
            return {...state, grade: action.payload}
        }
        case GET_GRADE_BY_ID_FAIL:{
            return {...state, error: action.payload}
        }
        case RESET_GRADE:{
            return {...state, grade: null}
        }
        case RESET_GRADE_FAIL:{
            return {...state, error: action.payload}
        }
        
        default:
            return state   
    }
}

export default gradeReducer;