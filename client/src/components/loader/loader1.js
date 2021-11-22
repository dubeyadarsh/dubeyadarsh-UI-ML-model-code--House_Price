import React,{useState,useEffect} from 'react'
import ReactLoading from "react-loading";
import "./loader.css";

export const Loader1 = () => {

  
    return (
        <div className="vh-100 bg-dark">
            <div className="loader">
                <ReactLoading  type={"bars"} color={"#16E2F5"} height={150} width={150}/>
            </div>
        </div>
    )
}
