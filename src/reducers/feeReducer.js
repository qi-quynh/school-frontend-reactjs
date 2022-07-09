import { findIndex } from "../utils/utils"

import { 
    FETCH_ALL_FEE,
    FETCH_ALL_FEE_FAIL,
    GET_FEE_BY_ID,
    GET_FEE_BY_ID_FAIL,
    RESET_FEE,
    RESET_FEE_FAIL,
    ADD_FEE,
    ADD_FEE_FAIL,
    UPDATE_FEE,
    UPDATE_FEE_FAIL,
    DELETE_FEE,
    DELETE_FEE_FAIL
   
} from '../action-types/fee-action-types'
const initialState ={
    listFee:[],
    fee: {}
}
const feeReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_FEE:{ 
            console.log(state);
            console.log(action.payload);
            return {...state, listFee: action.payload, error: ""}
        }
        case FETCH_ALL_FEE_FAIL:{
            console.log(state);
            console.log(action.payload);
            return {...state, listFee: [],error: action.payload}
            
        }
        case ADD_FEE:{
            const newList = [...state.listFee];
            newList.push(action.payload);
            return {...state, listFee: newList};
        }
        case ADD_FEE_FAIL:{
            return {...state, error: action.payload}
        }
        case UPDATE_FEE:{
            const index = findIndex(state.listFee, action.payload.id)
            const newList = [...state.listFee];
            newList[index] = action.payload;
            console.log(newList);
            
            return {...state, listFee: newList};
        }
        case UPDATE_FEE_FAIL:{
            return {...state, error: action.payload}
        }
        case DELETE_FEE:{
            const index = findIndex(state.listFee, action.payload)
            const newList = [...state.listFee];
            newList.splice(index, 1);
            console.log(newList);
            return {...state, listFee: newList}
        }   
        case DELETE_FEE_FAIL:{
            return {...state, error: action.payload}
        }
        case GET_FEE_BY_ID:{
            console.log(state);
            return {...state, fee: action.payload}
        }
        case GET_FEE_BY_ID_FAIL:{
            return {...state, error: action.payload}
        }
        case RESET_FEE:{
            return {...state, fee: null}
        }
        case RESET_FEE_FAIL:{
            return {...state, error: action.payload}
        }
        
        default:
            return state   
    }
}

export default feeReducer;