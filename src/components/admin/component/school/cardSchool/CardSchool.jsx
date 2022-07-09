import React from "react";
import './CardSchool.css';
import { Link } from "react-router-dom";

const Card = (props) =>{
    return(
        <div >
            <p>School Id: {props.id}</p>
            <p>School Name: {props.name}</p>
            <p>Type : {props.type}</p>
            <p>Address: {props.address}</p>
        </div>
    )
}
export default Card