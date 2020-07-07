import React, { useState, useEffect } from "react";
import Axios from "axios";
import env from './../../../../../env.json';


function Table_class (){

    const [class_select,setClassSelect] = useState({})

    const handleClassSelect = function (event){
        let target = event.target.value;
        setClassSelect(target)
    }


    useEffect(()=>{
        Axios.get()
    })




    return(
        <div>
            <br/>
            <h2 style={{ textAlign: "center" }}>บันทึกการใช้งานรายวิชา</h2>
            <br />
            <select style={{ width: "50%", margin: "auto", textAlign: "center" }} class="form-control" id="class_select" >
                <option value="-- กรุณาเลือกวิชา --" >--กรุณาเลือกวิชา--</option>
                
            </select>
        </div>
    )
}

export default Table_class;