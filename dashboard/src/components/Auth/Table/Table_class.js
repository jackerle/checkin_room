import React, { useState, useEffect } from "react";
import Axios from "axios";
import env from './../../../../../env.json';
import Show_all_student from "./Table_class/Show_all_student";


function Table_class (){

    const [class_select,setClassSelect] = useState(null)
    const [class_list,setClassList] = useState([])
    const [student_list,setStudent] = useState([])


    const handleClassSelect = function (event){
        let target = event.target.value;
        setClassSelect({
            class_id: target.split('-')[0],
            class_sect:  target.split('-')[1]
        })
    }


    useEffect(()=>{
            Axios.get(env.API+'/getClass')
            .then(res=>{
                setClassList(res.data)
                
            }).catch(err=>{
                console.log(err)
            })
        
        
    },[])



    useEffect(()=>{
        if(class_select!=null){
        console.log(class_select)
        Axios({
            method: 'post',
            url: env.API + '/get_room_from_class',
            data: {
                class_id: class_select.class_id,
                class_sect: class_select.class_sect
            },
        }).then(res => {
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
    },[class_select])


    





    const createClass_list = class_list && class_list.map(class_l =>{
        return(
            <option value={class_l.class_id +"-"+class_l.class_sect}>{class_l.class_id+"-"+class_l.class_sect+" "+class_l.class_name}</option>

        )
    })




    return(
        <div class="container">
            <br/>
            <h2 style={{ textAlign: "center" }}>บันทึกการใช้งานรายวิชา</h2>
            <br />
            <select style={{ width: "50%", margin: "auto", textAlign: "center" }} class="form-control" id="class_select" onChange={handleClassSelect}>
                <option value="-- กรุณาเลือกวิชา --" >--กรุณาเลือกวิชา--</option>
                {createClass_list}
            </select>
            <br/>
            <Student_all/>
            <div class="row">
                <div class="col">
                    <div class="collapse multi-collapse" id = "student_all">
                        <div class="card card-body">
                            <Show_all_student student_list={student_list}/>
                        </div>
                    </div>
                </div>
            </div>
            


        </div>
    )
}

export default Table_class;




function Student_all (){


    const handle_student_list = ()=>{
        console.log('click!!')
    }

    
    return(
        <div class="row p-3 shadow rounded " data-toggle="collapse" role="button" style={{backgroundColor:"#ededeb"}} onClick={handle_student_list} data-target="#student_all">
                <div class="col-10">
                    <h5 class="p-2 text-secondary">- รายชื่อนักเรียน</h5>
                </div>
                <div class="col-1">
                    <h5 class="p-2 text-secondary">+</h5>
                </div>
            </div>
    )
}