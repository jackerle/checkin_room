import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import env from './../../../../../env.json'


function STUDENT_SHOW_LIST(prop) {


    const { student_in,  current_class } = prop
    const [student_reg, setStudent] = useState([])


    useEffect(() => {
        if (current_class.class_id != undefined) {
            Axios({
                method: 'post',
                url: env.API + '/getReg',
                data: {
                    class_id: current_class.class_id,
                    class_sect: current_class.class_sect
                },
            }).then(res => {
                setStudent(res.data)
            }).catch(err => {
                console.log(err)
            })
        }
        console.log('useEffect!')

    }, [current_class])


    


    const _create_student_list = student_in && student_in.map((student, i) => {
        const { student_name, student_id, timestamp_checkin } = student
        let isReg = student_reg.filter(e => e.student_id == student_id).length > 0
        console.log(isReg)
        return (
            <tr class="d-flex">
                <th scope="row" class="col-1">{i + 1}</th>
                <td class="col-2">{student_id}</td>
                <td class="col-4">{student_name}</td>
                <td class="col-3">{timestamp_checkin}</td>
                <td class="col-2">
                    {isReg ? <button type="button" class="btn btn-success"></button> : <button type="button" class="btn btn-secondary"></button>}


                </td>
            </tr>
        )
    })

    return (
        
            
            <div style={{ width: "80%", margin: "auto", textAlign: "center" }} class="table-responsive">
                <table class="table">
                    <thead>
                        <tr class="d-flex">
                            <th class="col-1" scope="col">#</th>
                            <th class="col-2" scope="col">รหัสนักศึกษา</th>
                            <th class="col-4" scope="col">ชื่อนักศึกษา</th>
                            <th class="col-3" scope="col">เวลาที่ลงชื่อ</th>
                            <th class="col-2" scope="col">สถานะ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {_create_student_list}
                    </tbody>
                </table>
            </div>

    )
}


export default STUDENT_SHOW_LIST;