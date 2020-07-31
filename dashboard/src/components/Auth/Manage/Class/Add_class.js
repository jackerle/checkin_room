import React, { useState, useEffect } from "react";
import Axios from "axios";
import env from './../../../../../../env.json'
import { Redirect } from "react-router-dom";


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
        schedule: []
    })



    const [schedule_list, setSchedule] = useState({
        day: 0,
        start_time: "00:00",
        end_time: "00:00",
        room_id: 0
    })

    const handle_time_start_form = (event) => {
        let dummy = { ...schedule_list }
        dummy.start_time = event.target.value
        setSchedule(dummy)
    }

    const handle_time_end_form = (event) => {
        let dummy = { ...schedule_list }
        dummy.end_time = event.target.value
        setSchedule(dummy)
    }


    const handle_day_form = (event) => {
        let dummy = { ...schedule_list }
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
        dummy.room_id = target
        setSchedule(dummy)
    }


    const add_class_button = ()=>{
        if(form_input.schedule.length!=0&&form_input.class_id.length!=0&&form_input.class_sect.length!=0&&form_input.class_name.length!=0&&form_input.class_sect.length<10&&form_input.class_id.indexOf('-')==-1&&form_input.class_sect.indexOf('-')==-1){
            Axios({
                method:'post',
                url:env.API + '/add_class',
                data :{
                    class_id:form_input.class_id,
                    class_sect:form_input.class_sect,
                    class_name:form_input.class_name,
                    schedule:form_input.schedule
                }
            }).then((res)=>{
                location.reload()
            }).catch(ex=>{
                alert('ไม่สำเร็จ')
            })
        }
        else{
            alert(`กรุณากรอกข้อมูลให้ครบถ้วน 
            -(รหัสวิชา , sect (ถ้าไม่มีให้ใส่ 1 ) ,ชื่อวิชา)
            - sect ใส่ได้ไม่เกิน 10 ตัวเท่านั้น
            - รหัสวิชา และ sect ห้ามใส่อักขระ "-"`)
        }
        
    }





    const createRoom_list = room_list && room_list.map(room => {
        return (
            <option value={room.room_id} key={room.room_id}>{room.room_name}</option>
        )
    })



    const add_class_handle = function () {
        let dummy = { ...form_input }
        dummy.schedule.push(schedule_list)
        set_Form_input(dummy)
    }

    const delete_schedule_handle = function(i){
        let dummy = {...form_input}
        dummy.schedule.splice(i,1)
        set_Form_input(dummy)
    }

    const schedule_list_element = form_input.schedule && form_input.schedule.map((ele,i) => {
        let day, time_s, time_e, room
        switch (+ele.day) {
            case 0:
                day = 'วันอาทิตย์'
                break;
            case 1:
                day = 'วันจันทร์'
                break;
            case 2:
                day = 'วันอังคาร'
                break;
            case 3:
                day = 'วันพุธ'
                break;
            case 4:
                day = 'วันพฤหัสบดี'
                break;
            case 5:
                day = 'วันศุกร์'
                break;
            case 6:
                day = 'วันเสาร์'
                break;
            default:
                break;
        }

        time_s = `เวลาเริ่มต้น ${ele.start_time} น.`
        time_e = `เวลาจบคาบ ${ele.end_time} น.`
        room = `id ของห้อง : ${ele.room_id}`



        return (
            <div style={{ textAlign: "center",backgroundColor:"#d4d4d4" }} class="row">
                <div class="col-2">
                    <p>{day}</p>
                </div>
                <div class="col-3">
                    <p>{time_s}</p>
                </div>
                <div class="col-3">
                    <p>{time_e}</p>
                </div>
                <div class="col-2">
                    <p>{room}</p>
                </div>
                <div class="col-2">
                    <a onClick={()=>{
                        delete_schedule_handle(i)
                    }}href="#">ลบออก</a>
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
                    <select class="form-control" id="day_select" value={schedule_list.day} onChange={handle_day_form}>
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
                    <input type="time" id="start_time" name="end_time" value={schedule_list.time_end} onChange={handle_time_end_form}></input>
                </div>
                <div class="col-2">
                    <select class="form-control" id="room_select"  onChange={handleSelect}>
                        <option value="-" >--กรุณาเลือกห้อง--</option>
                        {createRoom_list}
                    </select>
                </div>
                <div class="col-2">
                    <button type="button" class="btn btn-outline-primary" onClick={add_class_handle}>เพิ่มเวลา</button>
                </div>
            </div>
            <br/>
            <div class ="row">
                <div class = "col-9">
                    <small style={{color:"red"}}>* กรุณาใส่ข้อมูลให้ครบถ้วน และอย่าเพิ่มวิชาที่ไม่จำเป็น หากไม่มั่นใจติดต่อเจ้าหน้าที่</small>
                </div>
                <div class = "col-2">
                <button type="button" class="btn btn-primary" onClick={add_class_button}>เพิ่มวิชา</button>
                </div>
            </div>
            <br/>
            
        </div>
    )
}

export default ADD_CLASS;