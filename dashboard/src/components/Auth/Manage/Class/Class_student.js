import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import env from '../../../../../../env.json';
import { change_day_format, change_date_format } from "../../../../Helper";


function Class_student() {

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







    return (
        <div>
            <br />
            <h2 style={{ textAlign: "center" }}>จัดการรายวิชาเรียน</h2>
            <h4 style={{ textAlign: "center" }}>ชื่อวิชา : {class_name_header}</h4>
            {
                list_sect && list_schedule && list_sect.map(element => {
                    const {
                        class_id, class_sect, class_name
                    } = element
                    const data_target = 'show' + class_id + '_' + class_sect
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
                                        <div class="card card-body">
                                            <p>ตารางเวลาของวิชา : </p>
                                            <div style={{ margin: "auto", width: "80%", textAlign: "center" }} class="table-responsive">
                                                <table class="table">
                                                    <thead>
                                                        <tr class="d-flex">
                                                            <th class="col-1" scope="col">sect</th>
                                                            <th class="col-2" scope="col">วัน</th>
                                                            <th class="col-3" scope="col">เวลาเริ่ม</th>
                                                            <th class="col-3" scope="col">เวลาจบ</th>
                                                            <th class="col-2" scope="col">Id ห้อง</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {schedule && schedule.map(e => {
                                                            const {
                                                                class_day, class_start_time, class_end_time, room_id
                                                            } = e
                                                            return (
                                                                <tr style={{backgroundColor:"#f5f5f5"}}class="d-flex">
                                                                    <th scope="row" class="col-1">{class_sect}</th>
                                                                    <td class="col-2">{change_day_format(class_day)}</td>
                                                                    <td class="col-3">{class_start_time}</td>
                                                                    <td class="col-3">{class_end_time}</td>
                                                                    <td class="col-2">{room_id}</td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>

                                            </div>
                                            {console.log(schedule)}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                })}

        </div>

    )
}

export default Class_student;