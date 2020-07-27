import React, { useState, useEffect } from "react";
import Axios from 'axios'
import env from './../../../../../env.json'


function Class_show_list({
    room_select,current_class,set_current_class,time_now
}) {


   


    const [class_list, setClass_list] = useState([]);


    const [check_talbe, Toggle_button] = useState(false)



   



    useEffect(() => {
        Axios({
            method: 'post',
            url: env.API + '/getClass_room',
            data: {
                room_id: room_select,
                day: new Date().getDay()
            },
        }).then(res => {
            setClass_list(res.data)
        })
            .catch(err => {
                console.log(err)
            })

    }, [room_select])


    


    useEffect(() => {
        handle_current_class()

    }, [class_list,time_now])




    const handle_current_class = function () {
        /*class_list && class_list.map(obj => {
            
        })*/
        if (class_list.length < 1) {
            set_current_class({})
        }
        else{
            for(const obj of class_list){
                const {
                    class_id, class_sect, class_start_time, class_end_time, class_name, room_id, room_name, capacity
                } = obj
                const [h_start, m_start,s_start] = class_start_time.split(':');
                const [h_end, m_end,s_end] = class_end_time.split(':');
    
                if ((parseInt(h_start) * 60) + parseInt(m_start) <= ((time_now.hours * 60) + time_now.minute) &&
                    (parseInt(h_end )* 60) + parseInt(m_end) >= ((time_now.hours * 60) + time_now.minute) &&
                    room_select == room_id) {
                    set_current_class({
                        class_id: class_id,
                        class_sect: class_sect,
                        class_name: class_name,
                        capacity:capacity
                    })
                    break;
                }
                else {
                    set_current_class({})
                }
            }
        }
    }



    const handle_button_table = function () {
        Toggle_button(!check_talbe);
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



    return (
        <div >
            <div class="row">
                <div class="col-2">
                    <p>เวลาปัจจุบัน : {time_now.hours}:{time_now.minute} น.</p>
                </div>
                <div class="col-3">
                    <b>วิชาที่กำลังมีการเรียนการสอน : </b>
                </div>
                <div class="col-4">
                    {(()=>{
                        let _to = `/class_student?class_id=${current_class.class_id}&&class_sect=${current_class.class_sect}`
                        if(current_class.class_id != undefined){
                            return(
                                <a href={_to}>{current_class.class_id + 'sect:' + current_class.class_sect + ' ' + current_class.class_name}</a>
                            )
                        }
                        else{
                            return(
                                <p>--ขณะนี้ไม่มีการเรียนวิชาใดๆ--</p>
                            )
                        }
                        
                    })()}
                    
                </div>
                <div class="col-3">
                    <button style={{ margin: "auto", textAlign: "center" }} type="button" class={check_talbe ? "btn btn-secondary" : "btn btn-info"} onClick={handle_button_table}>{check_talbe ? "ซ่อน" : "ดูตารางวันนี้"}</button>
                </div>
            </div>
            <hr />
            {show_class_list}
        </div>
    )
}

export default Class_show_list;