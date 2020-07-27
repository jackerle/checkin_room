import React, { useState, useEffect } from "react";
import Axios from 'axios'
import env from './../../../../../../env.json'



let student_list_element = null

function show_all_student({
    student_list, room_list, time_now,set_count_class
}) {



    const [status_student, setStatus] = useState([])






    useEffect(() => {
        Axios({
            method: 'post',
            url: env.API + '/get_student_status',
            data: {
                room: room_list,
            },
        }).then(res => {
            setStatus(res.data)
        }).catch(err => {
            console.log(err)
        })

        student_list_element = createStudentList()
    }, [room_list, time_now])




    const createStudentList = () => {
        if (!student_list)
            return
        let std_list = []
        let _count = 0
        for (const iterator of student_list) {
            const { student_id, student_name } = iterator
            let isCheckin = status_student.filter(e => e.student_id == student_id).length > 0
            iterator.isCheckin = false
            if (isCheckin > 0) {
                iterator.isCheckin = true
                _count++
            }
            std_list.push(iterator)
        }

        set_count_class(_count)

        return std_list
    }


















    return (

        <div style={{ width: "80%", margin: "auto", textAlign: "center", height: "500px", overflowY: "scroll" }} class="table-responsive">
            <table class="table">
                <thead>
                    <tr class="d-flex">
                        <th class="col-1" scope="col">#</th>
                        <th class="col-2" scope="col">รหัสนักศึกษา</th>
                        <th class="col-4" scope="col">ชื่อนักศึกษา</th>
                        <th class="col-2" scope="col">สถานะ</th>
                    </tr>
                </thead>
                <tbody >
                    {
                        student_list_element && student_list_element.map((student, i) => {

                            const { student_id, student_name, isCheckin } = student


                            return (
                                <tr class="d-flex">
                                    <th scope="row" class="col-1">{i + 1}</th>
                                    <td class="col-2">{student_id}</td>
                                    <td class="col-4">{student_name}</td>
                                    <td class="col-2">
                                        {isCheckin ? <button id="inclass" type="button" title="เข้าห้องเรียนแล้ว" class="btn btn-success" disabled={true}></button> : <button title="ยังไม่เข้าห้องเรียน" type="button" class="btn btn-secondary" disabled={true}></button>}
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
        </div>


    )


}

export default show_all_student;