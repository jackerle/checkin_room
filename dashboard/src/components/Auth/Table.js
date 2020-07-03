import React, { useState, useEffect } from "react";
import Axios from "axios";
import env from "./../../../../env.json";

const d = new Date();


function Table() {

    const [room_list, setRoom_list] = useState([]);
    const [student_in, setStudent] = useState([]);
    const [room_select, setRoom_Select] = useState(0);
    const [class_list, setClass_list] = useState([]);
    const [time_now, setTimeNow] = useState({
        hours: d.getHours(),
        minute: d.getMinutes()
    });
    const [check_talbe, Toggle_button] = useState(false)
    const [current_class, setCurrent_class] = useState({})



    function fetch_student(room_id) {
        Axios.get(env.API + '/getCheckin?room_id=' + room_id)
            .then(res => {
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



    useEffect(() => {
        handle_current_class()
        console.log('handle class_list')
    }, [class_list])



    useEffect(() => {
        Axios({
            method: 'post',
            url: env.API + '/getClass_room',
            data: {
                room_id: room_select,
                day: 4//new Date().getDay()
            },
        }).then(res => {
            setClass_list(res.data)
            console.log('select room')
        })
            .catch(err => {
                console.log(err)
            })

    }, [room_select, room_list])


    useEffect(() => {
        setInterval(() => {
            setTimeNow({
                hours: new Date().getHours(),
                minute: new Date().getMinutes()
            })

        }, 60000)
    }, [time_now])



    const handle_current_class = function () {
        class_list && class_list.map(obj => {
            const {
                class_id, class_sect, class_start_time, class_end_time, class_name, room_id, room_name, capacity
            } = obj
            const [h_start, m_start] = class_start_time.split(':');
            const [h_end, m_end] = class_end_time.split(':');
            if ( (+h_start * 60) + m_start <= ((time_now.hours * 60) + time_now.minute )&&
                (+h_end * 60) + m_end >= ((time_now.hours * 60) + time_now.minute) &&
                    room_select == room_id){
                        console.log('in hereee')
                        setCurrent_class({
                            class_id:class_id,
                            class_sect:class_sect,
                            class_name:class_name
                        })
            }
            else {
                console.log('in here')
                setCurrent_class({})
            }
        })
        if(class_list.length<1){
            setCurrent_class({})
        }
        

    }


    const show_class_list = class_list && class_list.map(obj => {
        const {
            class_id, class_sect, class_start_time, class_end_time, class_name, room_name, capacity
        } = obj;
        let show_start = class_start_time.split(':')[0] + ":" + class_start_time.split(':')[1]
        let show_end = class_end_time.split(':')[0] + ":" + class_end_time.split(':')[1]
        if (check_talbe) {
            return (
                <div class="row">
                    <div class="col-2">เวลา : {show_start} - {show_end} น.</div>
                    <div class="col-2">วิชา :{class_id} sect : {class_sect}</div>
                    <div class="col-4">{class_name}</div>
                </div>

            )
        }

    })

    const handleSelect = function (event) {
        let target = event.target.value;
        setRoom_Select(target);
        fetch_student(target)
        console.log(target);
    }

    const handle_button_table = function () {
        Toggle_button(!check_talbe);
    }


    const createRoom_list = room_list && room_list.map(room => {
        return (
            <option value={room.room_id} key={room.room_id}>{room.room_name}</option>
        )
    })

    const create_student_list = student_in && student_in.map((student, i) => {
        const { student_name, student_id, timestamp_checkin } = student
        return (
            <tr class="d-flex">
                <th scope="row" class="col-1">{i + 1}</th>
                <td class="col-2">{student_id}</td>
                <td class="col-5">{student_name}</td>
                <td class="col-3">{timestamp_checkin}</td>
                <td class="col-1"></td>
            </tr>
        )
    })




    return (
        <div>
            <br />
            <h2 style={{ textAlign: "center" }}>บันทึกการใช้งานห้องเรียน</h2>
            <br />
            <select style={{ width: "50%", margin: "auto", textAlign: "center" }} class="form-control" id="room_select" onChange={handleSelect}>
                <option value="-- กรุณาเลือกห้อง --" >--กรุณาเลือกห้อง--</option>
                {createRoom_list}
            </select>
            <br />
            <div class="container">
                <div class="row">
                    <div class="col-2">
                        <p>เวลาปัจจุบัน : {time_now.hours}:{time_now.minute}:{time_now.seconds} น.</p>
                    </div>
                    <div class="col-3">
                        <b>วิชาที่กำลังเรียนอยู่ในขณะนี้ : </b>
                    </div>
                    <div class="col-4">
                        <p>{current_class.class_id !=undefined ? current_class.class_id + 'sect:' + current_class.class_sect + ' ' + current_class.class_name : 'ขณะนี้ไม่มีการเรียนวิชาใด'}</p>
                    </div>
                    <div class="col-3">
                        <button style={{ margin: "auto", textAlign: "center" }} type="button" class={check_talbe ? "btn btn-secondary" : "btn btn-info"} onClick={handle_button_table}>{check_talbe ? "ซ่อน" : "ดูตารางวันนี้"}</button>
                    </div>
                </div>
                <hr />
                {show_class_list}



            </div>

            <br />
            <div style={{ width: "80%", margin: "auto", textAlign: "center" }} class="table-responsive">
                <table class="table">
                    <thead>
                        <tr class="d-flex">
                            <th class="col-1" scope="col">#</th>
                            <th class="col-2" scope="col">รหัสนักศึกษา</th>
                            <th class="col-5" scope="col">ชื่อนักศึกษา</th>
                            <th class="col-3" scope="col">เวลาที่ลงชื่อ</th>
                            <th class="col-1" scope="col">สถานะ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {create_student_list}
                    </tbody>
                </table>
            </div>

        </div>

    )
}

export default Table;