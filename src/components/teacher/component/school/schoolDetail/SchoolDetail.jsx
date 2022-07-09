import React, {useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux';
import { useParams } from "react-router";

import { getSchoolById , deleteSchool } from "../../../../../services/school-service";
import './SchoolDetail.css';


import {Link} from "react-router-dom";
const SchoolDetail = () => {
    let {id} = useParams();
    console.log(id);
    const school = useSelector(state => state.school.school);
    
    console.log(school);
    const dispatch = useDispatch();
   
    useEffect(() => {
        dispatch(getSchoolById(id))
       // console.log(getCourseById(id))
        return () => {
            return [];
        }
    }, [dispatch, id]);
    
    
    console.log(school);

    return (
        <div className="detail">
            <br/>
            <h3 >Thông tin trường {school.id}</h3>
            <h4>Tên :            {school.name}</h4>
            <h4>Cấp :            {school.type}</h4>
            <h4>Địa chỉ :        {school.address}</h4>
            <h4>Mô tả :          {school.description}</h4>
            <h4>Ngày nhập:       {school.createDay}</h4>
            <h4>Ngày chỉnh sửa:  {school.updateDay}</h4>
            <div>
                <Link to={'school/'+ school.id + '/edit'}>
                    <button className="btn-a btn btn-success mr-10 mt-20">Chỉnh sửa</button>
                </Link>
                <Link to= {'school'}>
                    <button className="btn-a btn btn-info mr-10">Quay về trang chủ</button>
                </Link>
            </div>
        </div>
    )

}
export default SchoolDetail