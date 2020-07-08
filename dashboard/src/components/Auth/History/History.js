import React, { useState } from "react";
import Input_search from "./Input_search";

function History(){

    const [input_student_id,set_input_student_id] = useState('')
    const [input_student_name,set_input_student_name] = useState('')
    const [input_class_id,set_input_class_id]= useState('')
    const [input_class_name,set_input_class_name] = useState('')
    const [input_start_time,set_input_start_time] = useState('')
    const [input_end_time,set_input_end_time] = useState('')
    const [input_room_id,set_input_room_id] = useState('')


    const handle_student_id = (event)=>{
        set_input_student_id(event.target.value);
    }

    const handle_student_name = (event)=>{
        set_input_student_name(event.target.value);
    }

    const handle_class_id = (event)=>{
        set_input_class_id(event.target.value)
    }

    const handle_class_name = (event)=>{
        set_input_class_name(event.target.value)
    }

    const handle_start_time = (event)=>{
        set_input_start_time(event.target.value);
    }

    const handle_end_time = (event)=>{
        set_input_end_time(event.target.value);
    }

    const handle_room_id =(event)=>{
        set_input_room_id(event.target.value)
    }


    const [search_button,set_search_button] = useState(0);

    const onClick_button = ()=>{
        set_search_button(search_button+1)
        console.log(input_student_id+" "+input_student_name+" "+input_class_id+" "+input_class_name+" "+input_start_time+" "+input_end_time+" "+input_room_id)
    }







    
    return(
        <div class="container">
            <br />
            <h2 style={{ textAlign: "center" }}>ประวัติการใช้งาน</h2>
            <br />
            <Input_search
                handle_student_id = {handle_student_id}
                handle_student_name = {handle_student_name}
                handle_class_id = {handle_class_id}
                handle_class_name = {handle_class_name}
                handle_start_time = {handle_start_time}
                handle_end_time = {handle_end_time}
                handle_room_id = {handle_room_id}
                onClick_button = {onClick_button}
            />
        </div>
    )
}

export default History;