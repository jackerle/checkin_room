import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";


function Class_student (){

    function useQuery() {
        return new URLSearchParams(useLocation().search);
      }


    let query = useQuery();

    const [class_student,setClass] = useState({
        class_id : query.get('class_id'),
        class_sect : query.get('class_sect')
    })

    useEffect(()=>{

    },[])


    return(
    <h1>ชื่อวิชา : {class_student.class_id} sect : {class_student.class_sect}</h1>
    )
}

export default Class_student;