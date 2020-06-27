import React, { useState, useEffect } from "react";
import Axios from "axios";
import env from "./../../../../env.json";



function Table() {

    const [room_list, setRoom_list] = useState([]);
    const [student_in,setStudent] = useState([]);
    const [room_select,setRoom_Select] = useState(0);

    


    function fetch_student(room_id){
        Axios.get(env.API+'/getCheckin?room_id='+room_id)
        .then(res =>{
           setStudent(res.data);
        })
    }

    useEffect(() => {
        Axios.get(env.API + '/getroom')
            .then(res => {
                setRoom_list(res.data)
            }).catch(err => {
                console.log(err)
            })
    }, [])


    const handleSelect = function(event){
        let target = event.target.value.split(".")[0];
        setRoom_Select(target);
        fetch_student(target)
        console.log(target);
    }


    const createRoom_list = room_list && room_list.map(room => {
        return (
        <option data-value= {room.room_id} value={room.room_id +'.  '+room.room_name} key={room.room_id}></option>
        )
    })

    const create_student_list = student_in&&student_in.map(student => {
        return(
        <h3>ชื่อ {student.student_name} รหัสนักศึกษา {student.student_id} เวลาที่ลงชื่อ {student.timestamp_checkin}</h3>
        )
    })



    return (
        <div>
            <br />
            <h2 style={{ textAlign: "center" }}>บันทึกการใช้งานห้องเรียน</h2>
            <br />
            <input style={{ width: "80%", margin: "auto", textAlign: "center" }} class="form-control" type="text" placeholder="เลือกห้อง" list="room_select" onChange={handleSelect} />
            <datalist id="room_select" >
                <option value="-- กรุณาเลือกห้อง --" disabled={true}></option>
                { createRoom_list }
            </datalist>
            <br/>
            <div style ={{textAlign:"center"}}>
            {create_student_list}
            </div>
             
        </div>

    )
}

export default Table;