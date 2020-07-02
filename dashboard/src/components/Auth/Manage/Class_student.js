import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import env from './../../../../../env.json';

function Class_student (){

    function useQuery() {
        return new URLSearchParams(useLocation().search);
      }


    let query = useQuery();

    const [class_student,setClass] = useState({
        class_id : query.get('class_id'),
        class_sect : query.get('class_sect')
    })
    const [list_schedule,setSchedule]  = useState([])
    const [class_name_header,setHeader] = useState('')


    useEffect(()=>{
        Axios({
            method: 'post',
            url: env.API + '/getSchedule',
            data: {
              class_id: class_student.class_id ,
              class_sect: class_student.class_sect
            },
          }).then((res)=>{
              setSchedule(res.data)
              setHeader(res.data[0].class_name);
          })
        
    },[])

    const show_schedule_element = list_schedule &&list_schedule.map(element=>{
        const {
            class_id,class_name,class_start_time,class_end_time,room_id
        } = element
        return (
        <p>{class_id} ชื่อ {class_name} เวลาเริ่ม {class_start_time} เวลาจบ {class_end_time} ห้อง {room_id}</p>
        )
    })


    return(
    <div>
        <h1>ชื่อวิชา : {class_name_header} sect : {class_student.class_sect}</h1>
        {show_schedule_element}
        <h2></h2>
    </div>
    
    )
}

export default Class_student;