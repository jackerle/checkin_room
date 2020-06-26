import React, { useState, useEffect } from "react";
import Axios from "axios";
import env from "./../../../../env.json";



function Table() {

    const [room_list, setRoom_list] = useState([]);
    const [student_in,setStudent] = useState([]);
    const [room_select,setRoom_Select] = useState([]);

    function onSelect (room_id){

    }


    function fetch_student(room_id){
        Axios.get(env.API)
    }

    useEffect(() => {
        Axios.get(env.API + '/getroom')
            .then(res => {
                setRoom_list(res.data)
            }).catch(err => {
                console.log(err)
            })
    }, [])


    const createRoom_list = room_list && room_list.map(room => {
        return (
        <option roomId={room.room_id} value={room.room_name} key={room.room_id}></option>
        )
    })



    return (
        <div>
            <br />
            <h2 style={{ textAlign: "center" }}>บันทึกการใช้งานห้องเรียน</h2>
            <br />
            <input style={{ width: "80%", margin: "auto", textAlign: "center" }} class="form-control" type="text" placeholder="เลือกห้อง" list="room_select" />
            <datalist id="room_select">
                <option value="-- กรุณาเลือกห้อง --" ></option>
                { createRoom_list }
            </datalist>
        </div>

    )
}

export default Table;