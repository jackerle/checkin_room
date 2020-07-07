import React, { useState } from "react";
import Axios from 'axios'
import env from './../../../../../../env.json'

function show_all_student({
    student_list
}) {


    const _create_student_list = student_list && student_list.map((student, i) => {
        const { student_id, student_name } = student
        return (
            <tr class="d-flex">
                <th scope="row" class="col-1">{i + 1}</th>
                <td class="col-2">{student_id}</td>
                <td class="col-4">{student_name}</td>
                <td class="col-2">
                    <button type="button" class="btn btn-success"></button>
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

export default show_all_student;