import React, { useState, useEffect } from "react";
import Axios from "axios";
import env from './../../../../../env.json';
import Show_all_student from "./Table_class/show_all_student";
import Student_show_list from "./Student_show_list";


function Table_class() {

    const [class_select, setClassSelect] = useState(null)
    const [class_list, setClassList] = useState([])
    const [student_list, setStudent] = useState([])
    const [room_list, setRoom_list] = useState([])

    const [time_now, setTimeNow] = useState({
        hours: new Date().getHours(),
        minute: new Date().getMinutes()
    });


   
 



    const handleClassSelect = function (event) {
        let target = event.target.value;
        setClassSelect({
            class_id: target.split('-')[0],
            class_sect: target.split('-')[1]
        })
    }


    useEffect(() => {

        setInterval(() => {
            console.log('interval!')
            setTimeNow({
                hours: new Date().getHours(),
                minute: new Date().getMinutes()
            })

        }, env.TIME_REFRESH)



        Axios.get(env.API + '/getClass')
            .then(res => {
                setClassList(res.data)

            }).catch(err => {
                console.log(err)
            })


    }, [])



    useEffect(() => {
        if (class_select != null) {
            console.log(class_select)
            Axios({
                method: 'post',
                url: env.API + '/get_room_from_class',
                data: {
                    class_id: class_select.class_id,
                    class_sect: class_select.class_sect
                },
            }).then(res => {
                setRoom_list(res.data)
                console.log(res.data)
            }).catch(err => {
                console.log(err)
            })
            Axios({
                method: 'post',
                url: env.API + '/getReg',
                data: {
                    class_id: class_select.class_id,
                    class_sect: class_select.class_sect
                },
            }).then(res => {
                console.log(res.data)
                setStudent(res.data)
            }).catch(err => {
                console.log(err)
            })
        }
    }, [class_select])








    const createClass_list = class_list && class_list.map(class_l => {
        return (
            <option value={class_l.class_id + "-" + class_l.class_sect}>{class_l.class_id + "-" + class_l.class_sect + " " + class_l.class_name}</option>

        )
    })






    return (
        <div class="container">
            <br />
            <h2 style={{ textAlign: "center" }}>บันทึกการใช้งานรายวิชา</h2>
            <br />
            <select style={{ width: "50%", margin: "auto", textAlign: "center" }} class="form-control" id="class_select" onChange={handleClassSelect}>
                <option value="-- กรุณาเลือกวิชา --" >--กรุณาเลือกวิชา--</option>
                {createClass_list}
            </select>
            <br />
            <Student_all_collapse room_list={room_list} student_list={student_list} class_select={class_select} time_now={time_now} />
        </div>
    )
}

export default Table_class;




function Student_all_collapse({ room_list, student_list, class_select, time_now }) {


    const [count_class,set_count_class] = useState(0);
    const [student_reg_list, setStudent_reg] = useState({
        init: 0
    })







    useEffect(() => {
        async function fetchData() {
            let dummy = { ...student_reg_list }
            for (const room of room_list) {
                const { room_id } = room
                let res = await Axios.get(env.API + '/getCheckin?room_id=' + room_id)
                dummy[room_id] = res.data
            }
            setStudent_reg(dummy)

        }
        fetchData()

        console.log(document.getElementById('inclass'))
    }, [room_list, time_now])


    const handle_student_list = () => {
        //console.log(student_reg_list)
    }


    const create_collapse_room = room_list && room_list.map(room => {
        const { room_id, room_name } = room
        const data_target = `#student_in_${room_id}`
        const _id = `student_in_${room_id}`
        return (
            <div>
                <div class="row p-3 shadow rounded " data-toggle="collapse" role="button" style={{ backgroundColor: "#ededeb" }} onClick={handle_student_list} data-target={data_target}>
                    <div class="col-10">
                        <h5 class="p-2 text-secondary">- {room_name}</h5>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="collapse multi-collapse" id={_id}>
                            <div class="card card-body">
                                <Student_show_list student_in={student_reg_list[room_id]} current_class={class_select} room_select={room_id}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    })

    return (
        <div>
            <div class="row p-3 shadow rounded " data-toggle="collapse" role="button" style={{ backgroundColor: "#ededeb" }} onClick={handle_student_list} data-target="#student_all">
                <div class="col-10">
                    <h5 class="p-2 text-secondary">- รายชื่อนักเรียน</h5>
                </div>
                <div class="col-1">
                    <h5 class="p-2 text-secondary">{count_class+"/"+student_list.length}</h5>
                </div>
            </div>
            <div class="row" >
                <div class="col">
                    <div class="collapse multi-collapse" id="student_all">
                        <div class="card card-body">
                            <Show_all_student student_list={student_list} room_list={room_list} time_now={time_now} set_count_class={set_count_class}/>
                        </div>
                    </div>
                </div>
            </div>
            {create_collapse_room}
        </div>


    )
}
