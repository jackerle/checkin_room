import React, { useState, useEffect } from "react";
import Axios from "axios";
import env from './../../../../../../env.json'


function ADD_CLASS() {

    const [timeValue, setTimeValue] = useState('')
    const [room_list, setRoom_list] = useState([])
    const [add_class_list, setClass_List] = useState([])



    useEffect(() => {
        Axios.get(env.API + '/getroom')
            .then(res => {
                setRoom_list(res.data)
            }).catch(err => {
                console.log(err)
            })
    }, [])





    const [form_input, set_Form_input] = useState({
        class_id: "",
        class_sect: '',
        class_name: "",
        schedule:[]
    })



    const [schedule_list, setSchedule] = useState({day: 0,
        time_start: "00:00",
        time_end: "00:00",
        room_id: '-'})

    const handle_time_start_form = (event) => {
        let dummy = { ...schedule_list }
        dummy.time_start = event.target.value
        setSchedule(dummy)
    }

    const handle_time_end_form = (event) => {
        let dummy = { ...schedule_list }
        dummy.time_end = event.target.value
        setSchedule(dummy)
    }


    const handle_day_form = (event)=>{
        let dummy = {...schedule_list}
        dummy.day = event.target.value
        setSchedule(dummy)
    }


    const handle_classs_id_form = (event) => {
        let dummy = { ...form_input }
        dummy.class_id = event.target.value
        set_Form_input(dummy);
    }

    const handle_classs_sect_form = (event) => {
        let dummy = { ...form_input }
        dummy.class_sect = event.target.value
        set_Form_input(dummy);
    }

    const handle_classs_name_form = (event) => {
        let dummy = { ...form_input }
        dummy.class_name = event.target.value
        set_Form_input(dummy);
    }


    const handleSelect = function (event) {
        let target = event.target.value;
        let dummy = { ...schedule_list }
        dummy.room_id = event.target.value
        setSchedule(dummy)
        console.log(target);
    }





    const createRoom_list = room_list && room_list.map(room => {
        return (
            <option value={room.room_id} key={room.room_id}>{room.room_name}</option>
        )
    })



    const add_class_handle = function () {
        let dummy = {...form_input}
        dummy.schedule.push(schedule_list)
        set_Form_input(dummy)
        setSchedule({day: 0,
            time_start: "00:00",
            time_end: "00:00",
            room_id: '-'})
        console.log(form_input)
    }

    const schedule_list_element = form_input.schedule && form_input.schedule.map(ele => {
        return(<div class="row">
        <div class="col-2">
            <p>{ele.day}</p>
        </div>
        <div class="col-3">
            <p>{ele.time_start}</p>
        </div>
        <div class="col-3">
            <p>{ele.time_end}</p>
        </div>
        <div class="col-2">
            <p>{ele.room_id}</p>
        </div>
        <div class="col-2">
        </div>
    </div>)
        
    })


    return (
        <div class="container">
            <br />
            <h5 style={{ textAlign: "center" }}>เพิ่มรายวิชาเรียน</h5>
            <hr />
            <div class="row">
                <div class="col-1" />
                <div class="col-3">
                    <input style={{ width: "100%", margin: "auto", textAlign: "center" }} class="form-control" type="text" placeholder="รหัสวิชา" value={form_input.class_id} onChange={handle_classs_id_form} />
                </div>
                <div class="col-1">
                    <input style={{ width: "100%", margin: "auto", textAlign: "center" }} class="form-control" type="text" placeholder="sect" value={form_input.class_sect} onChange={handle_classs_sect_form} />
                </div>
                <div class="col-7">
                    <input style={{ width: "100%", margin: "auto", textAlign: "center" }} class="form-control" type="text" placeholder="ชื่อวิชา" value={form_input.class_name} onChange={handle_classs_name_form} />
                </div>
            </div>
            <br />
            {schedule_list_element}
            <div class="row">
                <div class="col-2" >
                    <select class="form-control" id="day_select" value = {schedule_list.day}onChange={handle_day_form}>
                        <option value="0" >วันอาทิตย์</option>
                        <option value="1" >วันจันทร์</option>
                        <option value="2" >วันอังคาร</option>
                        <option value="3" >วันพุธ</option>
                        <option value="4" >วันพฤหัสบดี</option>
                        <option value="5" >วันศุกร์</option>
                        <option value="6" >วันเสาร์</option>
                    </select>
                </div>
                <div class="col-3">
                    <label for="start_time">เลือกเวลาที่เริ่มต้น:</label>
                    <input type="time" id="start_time" name="start_time" value={schedule_list.time_start} onChange={handle_time_start_form}></input>
                </div>
                <div class="col-3">
                    <label for="end_time">เลือกเวลาที่จบคาบ:</label>
                    <input type="time" id="start_time" name="end_time" value={schedule_list.time_end}onChange={handle_time_end_form}></input>
                </div>
                <div class="col-2">
                    <select class="form-control" id="room_select" value={schedule_list.room_id} onChange={handleSelect}>
                        <option value="-" >--กรุณาเลือกห้อง--</option>
                        {createRoom_list}
                    </select>
                </div>
                <div class="col-2">
                    <button type="button" class="btn btn-outline-primary" onClick={add_class_handle}>เพิ่มเวลา</button>
                </div>
            </div>
        </div>
    )
}

export default ADD_CLASS;