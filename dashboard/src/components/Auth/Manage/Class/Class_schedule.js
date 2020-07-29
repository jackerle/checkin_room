import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import env from '../../../../../../env.json';
import { change_day_format, change_date_format } from "../../../../Helper";
import add_help_1 from "./../../../../../public/help_add_reg_class_1.png";
import add_help_2 from "./../../../../../public/help_add_reg_class_2.png"

function Class_schedule() {

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }


    let query = useQuery();

    const [class_student, setClass] = useState({
        class_id: query.get('class_id')
    })
    const [list_sect, set_sect] = useState([])
    const [class_name_header, setHeader] = useState('')
    const [list_schedule, set_schedule] = useState([]);
    const [delete_class,set_delete_class] = useState({})



    useEffect(() => {
        Axios({
            method: 'post',
            url: env.API + '/get_sect',
            data: {
                class_id: class_student.class_id,
            },
        }).then((res) => {
            set_sect(res.data)
            setHeader(res.data[0].class_name.split('(')[0]);
        });

    }, [])


    useEffect(() => {
        Axios({
            method: 'post',
            url: env.API + '/get_schedule',
            data: {
                class_id: class_student.class_id,
            },
        }).then((res) => {
            set_schedule(res.data)
        })
    }, [list_sect])



    const add_button_handle = async (list_std, class_sect) => {
        if (class_student.class_id && list_std) {
            let obj = ''
            let id = list_std.trim().split(/\s+/)
            id.map((e, i) => {
                id[i] = `('${class_student.class_id}','${class_sect}' , '${e}')`;
            })
            obj = id.toString()
            if (obj) {
                await Axios({
                    method: 'post',
                    url: env.API + '/add_reg_student',
                    data: {
                        msg: obj
                    }
                }).then((res) => {
                    alert('เพิ่มรายชื่อสำเร็จแล้ว')
                })
                    .catch((ex) => {
                        alert('เพิ่มรายชื่อไม่สำเร็จ')
                        console.log(ex);
                    })
            }
        }
        else {
            alert('เกิดข้อผิดพลาด กรุณาใส่รหัสนักศึกษา')
        }

    }





    const list_button_handle = (class_sect) => {
        if (class_sect) {
            window.open('/class_student?class_id=' + class_student.class_id + '&&class_sect=' + class_sect)
        }
    }








    return (
        <div>
            <br />
            <h2 style={{ textAlign: "center" }}>จัดการรายวิชาเรียน</h2>
            <h4 style={{ textAlign: "center" }}>ชื่อวิชา : {class_name_header}</h4>
            {
                list_sect && list_schedule && list_sect.map((element, i) => {

                    let msg = ''
                    const handle_change = (event) => {
                        msg = event.target.value
                    }

                    const {
                        class_id, class_sect, class_name
                    } = element
                    const data_target = 'show' + class_id + '_' + i
                    const schedule = list_schedule.filter(e => e.class_id == class_id && e.class_sect == class_sect)
                    return (
                        <div style={{ width: "80%", margin: "auto" }}>
                            <br />
                            <div class="row p-3 shadow rounded " data-toggle="collapse" role="button" style={{ backgroundColor: "#ededeb" }} data-target={'#' + data_target}>
                                <div class="col-10">
                                    <h5 class="p-2 text-secondary">{class_id} sect : {class_sect} ชื่อ {class_name} </h5>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="collapse multi-collapse" id={data_target}>
                                        <div style={{ textAlign: "center", margin: "auto" }} class="card card-body">
                                            <div class="row">
                                                <div class='col-6' />
                                                <p class="text-right">ตารางเวลา</p>
                                                <div class='col-4'>
                                                </div>
                                                <div class="col-1">
                                                    <a data-toggle="modal" onClick={()=>{
                                                        set_delete_class({
                                                            class_id:class_id,
                                                            class_sect:class_sect
                                                        })
                                                    }}data-target="#delete_class_sect" href="#">ลบวิชา</a>
                                                </div>
                                            </div>

                                            <div style={{ margin: "auto" }} class="table-responsive">
                                                <table class="table">
                                                    <thead>
                                                        <tr class="d-flex">
                                                            <th class="col-2" scope="col">วัน</th>
                                                            <th class="col-3" scope="col">เวลาเริ่ม</th>
                                                            <th class="col-3" scope="col">เวลาจบ</th>
                                                            <th class="col-2" scope="col">Id ห้อง</th>
                                                            <th class="col-2" scope="col">จัดการ</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {schedule && schedule.map(e => {
                                                            const {
                                                                class_day, class_start_time, class_end_time, room_id
                                                            } = e
                                                            return (
                                                                <tr style={{ backgroundColor: "#f5f5f5" }} class="d-flex">
                                                                    <td class="col-2">{change_day_format(class_day)}</td>
                                                                    <td class="col-3">{class_start_time}</td>
                                                                    <td class="col-3">{class_end_time}</td>
                                                                    <td class="col-2">{room_id}</td>
                                                                    <td class="col-2">
                                                                        <a href="#">แก้ไข</a>
                                                                        <a href="#">{" ลบ"}</a>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="row">

                                            </div>
                                            <div class="row">
                                                <div style={{ textAlign: "left" }} class="col-9">

                                                    <a href="#" class="text-left">+ เพิ่มเวลา</a>
                                                </div>
                                                <div class="col-1">
                                                    <button type="button" class="btn btn-primary" onClick={() => { list_button_handle(class_sect) }}>รายชื่อ</button>
                                                </div>
                                                <div class="col-1">
                                                    <button data-toggle="modal" data-target={"#add_std_" + i} type="button" class="btn btn-success">เพิ่ม นศ.</button>
                                                </div>
                                            </div>
                                            <div class="modal fade" id={"add_std_" + i} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div class="modal-dialog">
                                                    <div class="modal-content">
                                                        <div style={{ backgroundColor: "green" }} class="modal-header">
                                                            <h5 class="modal-title text-white" id="exampleModalLabel">เพิ่มรายชื่อนักศึกษาในรายวิชา</h5>
                                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <h5>
                                                                ใส่รหัสนักศึกษาที่ต้องการจะเพิ่มในรายวิชาดังกล่าว
                                                            </h5>
                                                            <div class="form-group">
                                                                <textarea class="form-control" id={"add_std_modal_" + i} rows="3" onChange={handle_change}></textarea>
                                                            </div>
                                                            <div style={{ textAlign: "left" }}>
                                                                <details>
                                                                    <summary>
                                                                        วิธีการใช้งาน
                                                                    </summary>
                                                                    <p>1. ใส่หมายเลขนักศึกษาที่ต้องการจะลงทะเบียนในวิชานี้ในช่องว่างด้านบน</p>
                                                                    <p>2. หากต้องการที่จะเพิ่มนักศึกษาเป็นจำนวนมากสามารถคัดลอกมาเป็นจำนวนมาก โดยคั่นด้วยการเว้นบรรทัดได้ เช่น</p>
                                                                    <img class="border border-success" src={add_help_1} />
                                                                    <p>3. ไฟล์ประเภท Excel ต่างๆ สามารถลากและคัดลอกในหลายแถวได้เลย ดังภาพ</p>
                                                                    <img class="border border-success" src={add_help_2} />
                                                                </details>
                                                            </div>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-success" data-dismiss="modal" onClick={async () => { await add_button_handle(msg, class_sect) }}>เพิ่ม</button>
                                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">ยกเลิก</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    )
                })}
            <div class="modal fade" id={"delete_class_sect"} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div style={{ backgroundColor: "red" }} class="modal-header">
                            <h5 class="modal-title text-white" id="exampleModalLabel">ยืนยันการลบวิชา</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <h5>
                                ต้องการที่จะลบวิชาที่เลือกไว้หรือไม่?
                        </h5>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">ยกเลิก</button>
                            <button type="button" onClick={()=>{
                                console.log(delete_class)
                            }}class="btn btn-danger"   data-dismiss="modal">ยืนยัน</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Class_schedule;