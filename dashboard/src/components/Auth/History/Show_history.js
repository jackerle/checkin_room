import React from "react";

function Show_history({ history_list }) {


    const create_history_element = history_list && history_list.map(e => {
        const {
            room_name, student_id, student_name, timestamp_checkin, timestamp_checkout, role
        } = e

        return (
            <tr class="d-flex">
                <td scope="row" class="col-2">{room_name}</td>
                <td class="col-2">{student_id}</td>
                <td class="col-3">{student_name}</td>
                <td class="col-2">{timestamp_checkin}</td>
                <td class="col-2" >{timestamp_checkout}}</td>
                <td class="col-1" >{role}</td>
               
            </tr >
        )

})

return (
    <div style={{ margin: "auto", textAlign: "center" }} class="table-responsive">
        <table class="table">
            <thead>
                <tr class="d-flex">
                    <th class="col-2" scope="col">ห้อง</th>
                    <th class="col-2" scope="col">รหัสนักศึกษา</th>
                    <th class="col-3" scope="col">ชื่อนักศึกษา</th>
                    <th class="col-2" scope="col">เวลาเข้า</th>
                    <th class="col-2" scope="col">เวลาออก</th>
                    <th class="col-1" scope="col">โดย</th>
                </tr>
            </thead>
            <tbody>
                {create_history_element}
            </tbody>
        </table>
    </div>
)
}

export default Show_history;