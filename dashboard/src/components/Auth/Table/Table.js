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
    const [room_select_data,set_room_select_data] = useState({})



   



    


    


    const set_current_class = function(obj){
        setCurrent_class(obj)
    } 



    function fetch_student(room_id) {
        Axios.get(env.API + '/getCheckin?room_id=' + room_id)
            .then(res => {
                setStudent(res.data);
            })
    }


    useEffect(()=>{
        fetch_student(room_select)
    },[time_now])





    useEffect(() => {


        setInterval(() => {
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
        let t = room_list.filter(e=>e.room_id==target)
        set_room_select_data(t)
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
            <div class="row">
                <div class="col-4">
                </div>
                <div class="col-2">
                    <button class="btn btn-success" disabled={true}>
                    </button>
                    <small> : ลงทะเบียนในวิชานี้</small>
                </div>
                <div class="col-2">
                    <button class="btn btn-secondary" disabled={true}>
                    </button>
                    <small> : ไม่ได้ลงทะเบียนในวิชานี้</small>
                </div>
                <div class="col-1">
                </div>
                <div class="col-1">
                    <b title="จำนวนคนใช้ห้องตอนนี้">{room_select_data[0]? student_in.length +"/"+room_select_data[0].capacity : "-"}</b>
                </div>
                <div class="col-2">
                    <button type="button" class="btn btn-outline-secondary" data-toggle="modal" data-target="#clear-all">Reject-All</button>
                </div>
            </div>
            <div class="row pb-2">
                <div class="col text-center" >
                    {/* <button style={{float:"right"}} class="btn btn-outline-secondary" onClick={refresh_button_active}><span class="glyphicon glyphicon-refresh"></span> Refresh</button> */}
                </div>
                
            </div>
            
            <Student_show_list student_in={student_in} current_class={current_class} room_select = {room_select}/>
            <div class="modal fade" id={"clear-all"} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div style={{ backgroundColor: "red" }} class="modal-header">
                            <h5 class="modal-title text-white" id="exampleModalLabel">ยืนยันการบังคับลงชื่อออก</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <h5>
                                ต้องการที่จะล้างการลงชื่อทั้งหมดในห้องนี้หรือไม่?
                        </h5>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">ยกเลิก</button>
                            <button type="button" class="btn btn-danger"  data-dismiss="modal">ยืนยัน</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}









export default Table;