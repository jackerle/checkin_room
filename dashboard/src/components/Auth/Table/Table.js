import React, { useState, useEffect } from "react";
import Axios from "axios";
import env from "../../../../../env.json";
import Student_show_list from './Student_show_list'
import Class_show_list from "./Class_show_list";





function Table() {

    const [room_list, setRoom_list] = useState([]);
    const [student_in, setStudent] = useState([]);
    const [room_select, setRoom_Select] = useState(0);
    const [current_class,setCurrent_class] = useState({})
    const [refresh_button,setRefresh] = useState(0);
    const [time_now, setTimeNow] = useState({
        hours: new Date().getHours(),
        minute: new Date().getMinutes()
    });



    useEffect(() => {
        
    }, [time_now])


    


    
    const refresh_button_active = function(){
        console.log("asd")
        fetch_student(room_select)
    }


    const set_current_class = function(obj){
        setCurrent_class(obj)
    } 



    function fetch_student(room_id) {
        console.log('from fetch')
        Axios.get(env.API + '/getCheckin?room_id=' + room_id)
            .then(res => {
                setStudent(res.data);
            })
    }



    useEffect(() => {


        setInterval(() => {
            console.log('interval!')
            setTimeNow({
                hours: new Date().getHours(),
                minute: new Date().getMinutes()
            })
    
        }, env.TIME_REFRESH)

        
        console.log('first time')
        Axios.get(env.API + '/getroom')
            .then(res => {
                setRoom_list(res.data)
            }).catch(err => {
                console.log(err)
            })

    }, [])





    const handleSelect = function (event) {
        let target = event.target.value;
        setRoom_Select(target);
        fetch_student(target)
        console.log(target);
    }




    const createRoom_list = room_list && room_list.map(room => {
        return (
            <option value={room.room_id} key={room.room_id}>{room.room_name}</option>
        )
    })






    return (
        <div class="container">
            <br />
            <h2 style={{ textAlign: "center" }}>บันทึกการใช้งานห้องเรียน</h2>
            <br />
            <select style={{ width: "50%", margin: "auto", textAlign: "center" }} class="form-control" id="room_select" onChange={handleSelect}>
                <option value="-- กรุณาเลือกห้อง --" >--กรุณาเลือกห้อง--</option>
                {createRoom_list}
            </select>
            <br />
            <Class_show_list room_select={room_select} current_class={current_class} set_current_class={set_current_class}  time_now={time_now}/>
            <br/>
            <div class="row pb-2">
                <div class="col text-center" >
                    <button style={{float:"right"}} class="btn btn-outline-secondary" onClick={refresh_button_active}><span class="glyphicon glyphicon-refresh"></span> Refresh</button>
                </div>
                
            </div>
            
            <Student_show_list student_in={student_in} current_class={current_class}/>

        </div>

    )
}









export default Table;