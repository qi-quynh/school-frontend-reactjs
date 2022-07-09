import React from "react";
import './CardSchool.css';
import { Link } from "react-router-dom";
//import default_image from "../../../assets/images/loading.png";

const Card = (props) =>{
    return(
        <div className="card mb-20">
            
            <div className="card-body">
                
                    <p>School Id: {props.id}</p>
                    <p>School Name: {props.name}</p>
                    <p>Type : {props.type}</p>
                    <p>Address: {props.address}</p>
                  
            </div>
        </div>
    )
}
export default Card