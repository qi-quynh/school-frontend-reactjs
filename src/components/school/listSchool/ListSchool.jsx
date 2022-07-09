import React from "react";
import { useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux'
import { getAllSchool, getPurchasedSchool } from "../../../services/school-service";
import CardSchool from '../cardSchool/CardSchool';

const ListSchool = () =>{
    const dispatch = useDispatch()
    const listSchool = useSelector(state => state.school.listSchool)
    console.log(listSchool);
  
    //const purchasedSchool = useSelector(state => state.school.purchasedSchool)
    
    useEffect(()=>{
        dispatch(getAllSchool());
        console.log(listSchool);
        return () => {
            return []
        }
    }, [dispatch])
    return (
        <div className="row page-body">
        {
            listSchool.map((item)=>(
                <div className="col-md-3 col-sm-6 " key={item.id}>
                    <CardSchool
                        id= {item.id}
                        name = {item.name}
                        address = {item.address}
                        type = {item.type}
                        description= {item.description}
                    />
                </div>
                
            ))
        }
        </div>
    )
}
export default ListSchool