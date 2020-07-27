import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import env from '../../../../../../env.json';
import { change_day_format } from "../../../../Helper";


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
    const [student_list, setStudent] = useState([])
    const [student_list_regis, setRegis] = useState([])




    useEffect(() => {
        Axios({
            method: 'post',
            url: env.API + '/get_sect',
            data: {
                class_id: class_student.class_id,
            },
        }).then((res) => {
            set_sect(res.data)
            setHeader(res.data[0].class_name);
        });

    }, [])







    return (
        <div>
            <br />
            <h2 style={{ textAlign: "center" }}>จัดการรายวิชาเรียน</h2>
            <h3>ชื่อวิชา : {class_name_header}</h3>
            {
                list_sect && list_sect.map(element => {
                    const {
                        class_id, class_sect, class_name
                    } = element
                    return (
                        <p>{class_id} sect : {class_sect} ชื่อ {class_name} </p>
                    )
                })}

        </div>

    )
}

export default Class_student;