import requestService from "./request-service";
import{
    fetchGradeSuccess,
    fetchGradeFail,
    getGradeSuccess, 
    getGradeFail, 
    resetGradeSuccess,
    resetGradeFail,
    addGradeSuccess, 
    addGradeFail, 
    updateGradeSuccess, 
    updateGradeFail, 
    deleteGradeSuccess, 
    deleteGradeFail
}
from '../actions/grade-actions'

export const getAllGrade = (url)=> async(dispatch)=>{
    try{
       
        const {data} = await requestService.get(url, true);
       
        console.log(data);
        if(data.status === "OK")
        {
            console.log("thành công");
            dispatch(fetchGradeSuccess(data.data));
            
        }
        else
        {
            console.log("thất bại");
          
        }
    }
    catch (error){
        dispatch(fetchGradeFail(error.message));
        console.log(error.message)

    }
}

export const getGradeById  = (url) => async (dispatch) => {
    
    try {
        
        const {data} = await requestService.get(url, true);
        console.log(data);
        if(data.status ==="OK")
        {
            dispatch(getGradeSuccess(data.data[0]));
            console.log("Thành công");
        }
        else
        {
           
            console.log("Không thành công");
        }
        
       
    } catch (error) {
        dispatch(getGradeFail(error.message));
        console.log(error.message);
    }
}

export const getGradeBySchoolId = (url)=> async(dispatch)=>{
    try{
        const {data} = await requestService.get(url, true);
        dispatch(fetchGradeSuccess(data.data));
        console.log(data);
    }
    catch (error){
        dispatch(fetchGradeFail(error.message));
        console.log(error.message)
    }
}

export const resetGrade  = () => async (dispatch) => {
    try {
        dispatch(resetGradeSuccess());
    } catch (error) {
        dispatch(resetGradeFail(error.message));
        console.log(error.message);
    }
}

export const addGrade = (url, params, history) => async (dispatch) => {
    console.log(params);
    try {
        const {data} = await requestService.post(url, params, true);
        
        //console.log(data);
        if(data.status === "OK")
        {
          //console.log("thành công");
          dispatch(addGradeSuccess(data.data));
          history.goBack();
        }
        else
        {
          console.log("thất bại");
          console.log(data.message);
          dispatch(addGradeFail(data.message));
        }
    } catch (error) {
        dispatch(addGradeFail(error.message));
        console.log(error.message)
    }
}

export const updateGrade = (url, params, history) => async (dispatch) => {
  console.log(params);
  try {
      const { data } = await requestService.put(url, params, true);
      console.log(data );
      //dispatch(updateGradeSuccess(data.data));
      if(data.data !==null)
      {
          console.log("thành công");
          dispatch(updateGradeSuccess(data.data));
          history.goBack();
      }
      else
      {
          console.log("thất bại");
          console.log(data.message);
          dispatch(updateGradeFail(data.message));
      }
  } catch (error) {
      dispatch(updateGradeFail(error.message));
      console.log(error.message)
  }
}

export const deleteGrade = (url, id) => async (dispatch) => {
    try {
      const { data } = await requestService.delete(url, true);
      if(data.status ==="OK")
      {
        console.log("thành công");
        dispatch(deleteGradeSuccess(id));
      }
      else
      {
        console.log("không thành công");
        dispatch(deleteGradeFail(data.message));
      }
      
    } catch (error) {
      dispatch(deleteGradeFail(error.message));
      console.log(error.message);
    }
};

  