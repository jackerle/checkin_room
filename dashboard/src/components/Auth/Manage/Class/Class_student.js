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
            setHeader(res.data[0].class_name.split('(')[0]);
        });

    }, [])







    return (
        <div>
            <br />
            <h2 style={{ textAlign: "center" }}>จัดการรายวิชาเรียน</h2>
            <h4 style={{ textAlign: "center" }}>ชื่อวิชา : {class_name_header}</h4>
            {
                list_sect && list_sect.map(element => {
                    const {
                        class_id, class_sect, class_name
                    } = element
                    const data_target = 'show' + class_id + '_' + class_sect
                    return (
                       
                        <div style={{width:"80%",margin:"auto"}}>
                             <br/>
                            <div class="row p-3 shadow rounded " data-toggle="collapse" role="button" style={{ backgroundColor: "#ededeb" }} data-target={'#' + data_target}>
                                <div class="col-10">
                                    <h5 class="p-2 text-secondary">{class_id} sect : {class_sect} ชื่อ {class_name} </h5>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="collapse multi-collapse" id={data_target}>
                                        <div class="card card-body">
                                            <p>Detail</p>
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