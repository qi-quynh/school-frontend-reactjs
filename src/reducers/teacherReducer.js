import { findIndex } from "../utils/utils"

import { 
    FETCH_ALL_TEACHER,
    FETCH_ALL_TEACHER_FAIL,
    GET_TEACHER_BY_ID,
    GET_TEACHER_BY_ID_FAIL,
    RESET_TEACHER,
    RESET_TEACHER_FAIL,
    ADD_TEACHER,
    ADD_TEACHER_FAIL,
    UPDATE_TEACHER,
    UPDATE_TEACHER_FAIL,
    DELETE_TEACHER,
    DELETE_TEACHER_FAIL
   
} from '../action-types/teacher-action-types'
const initialState ={
    listTeacher:[],
    teacher: {}, 
    error : ""
}
const teacherReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_TEACHER:{ 
            console.log(state);
            return {...state, listTeacher: action.payload, error: ""}
        }
        case FETCH_ALL_TEACHER_FAIL:{
            return {...state, listTeacher: [], error: action.payload}
        }
        case ADD_TEACHER:{
            const newList = [...state.listTeacher];
            newList.push(action.payload);
            return {...state, listTeacher: newList, error : ""};
        }
        case ADD_TEACHER_FAIL:{
            return {...state, error: action.payload}
        }
        case UPDATE_TEACHER:{
            const index = findIndex(state.listTeacher, action.payload.id)
            const newList = [...state.listTeacher];
            newList[index] = action.payload;
            console.log(newList);
            
            return {...state, listTeacher: newList, error : ""};
        }
        case UPDATE_TEACHER_FAIL:{
            return {...state, error: action.payload}
        }
        case DELETE_TEACHER:{
            const index = findIndex(state.listTeacher, action.payload)
            const newList = [...state.listTeacher];
            newList.splice(index, 1);
            console.log(newList);
            return {...state, listTeacher: newList}
        }   
        case DELETE_TEACHER_FAIL:{
            return {...state, error: action.payload}
        }
        case GET_TEACHER_BY_ID:{
            console.log(state);
            return {...state, teacher: action.payload, error : ""}
        }
        case GET_TEACHER_BY_ID_FAIL:{
            return {...state, error: action.payload}
        }
        case RESET_TEACHER:{
            return {...state, teacher: null, error : ""}
        }
        case RESET_TEACHER_FAIL:{
            return {...state, error: action.payload}
        }
        
        default:
            return state   
    }
}

export default teacherReducer;