import React, { useState, useEffect } from "react";
import Axios from "axios";
import env from './../../../../../env.json';


function Table_class (){

    const [class_select,setClassSelect] = useState('')
    const [class_list,setClassList] = useState([])



    const handleClassSelect = function (event){
        let target = event.target.value;
        setClassSelect(target)
    }


    useEffect(()=>{
        Axios.get(env.API+'/getClass')
        .then(res=>{
            setClassList(res.data)
            
        }).catch(err=>{
            console.log(err)
        })
    },[])



    useEffect(()=>{
        console.log(class_select)
        
    },[class_select])









    const createClass_list = class_list && class_list.map(class_l =>{
        return(
            <option value={class_l.class_id +"-"+class_l.class_sect}>{class_l.class_id+"-"+class_l.class_sect+" "+class_l.class_name}</option>

        )
    })




    return(
        <div>
            <br/>
            <h2 style={{ textAlign: "center" }}>บันทึกการใช้งานรายวิชา</h2>
            <br />
            <select style={{ width: "50%", margin: "auto", textAlign: "center" }} class="form-control" id="class_select" onChange={handleClassSelect}>
                <option value="-- กรุณาเลือกวิชา --" >--กรุณาเลือกวิชา--</option>
                {createClass_list}
            </select>
            <br/>


        </div>
    )
}

export default Table_class;