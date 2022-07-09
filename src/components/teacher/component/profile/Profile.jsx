import React, {useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux';
import { useParams } from "react-router";

const Profile =() => {
    let {id} = useParams();
    const username = localStorage.getItem("username");
    
}