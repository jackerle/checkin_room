import React, { useState, useEffect } from "react";
import Axios from "axios";
import env from "./../../../../../env.json";



/**
 *
 *
 * @returns
 */
function Class() {


    const [keyword, setKeyword] = useState('');
    const [class_list, setClass_list] = useState([]);
    const [add_class_button, set_add_Toggle] = useState(false)



    useEffect(() => {
        Axios.get(env.API + '/getAllClass')
            .then(res => {
                setClass_list(res.data);
                console.log(class_list)
                console.log(add_class_button)
            })
    }, [add_class_button])


    const handleKeyword = (event) => {
        setKeyword(event.target.value);
    }


    const show_class_list = class_list && class_list.map(obj => {
        const { class_id, class_sect, class_name } = obj

        if (keyword == '' || class_name.indexOf(keyword) != -1) {
            return (
                <tr class="d-flex">
                    <th scope="row" class="col-3">{class_id}</th>
                    <td class="col-1">{class_sect}</td>
                    <td class="col-6">{class_name}</td>
                    <td class="col-2"></td>
                </tr>
            )
        }
    })


    const add_class_button_element = () => {
        if (add_class_button) {
            return (
                <br />

            )
        }
        else {
            return (
                <ADD_CLASS/>
                
            )
        }
    }

    const handle_add_button = () => {
        set_add_Toggle(!add_class_button)
    }






    return (
        <div>
            <br />
            <h2 style={{ textAlign: "center" }}>จัดการรายวิชาเรียน</h2>
            <br />
            <div class="container">
                <div class="row">
                    <div class="col-2"></div>
                    <div class="col-8">
                        <input style={{ width: "100%", margin: "auto", textAlign: "center" }} class="form-control" type="text" placeholder="ค้นหาวิชาที่นี่" value={keyword} onChange={handleKeyword} />
                    </div>
                    <div class="col-2">
                        <button type="button" class={add_class_button ? "btn btn-success" : "btn btn-danger"} onClick={handle_add_button}>{add_class_button ? "เพิ่มวิชาเรียน" : "ยกเลิก"}</button>
                    </div>
                </div>
            </div>
            {add_class_button_element()}
            <div style={{ width: "80%", margin: "auto", textAlign: "center" }} class="table-responsive">
                <table class="table">
                    <thead>
                        <tr class="d-flex">
                            <th class="col-3" scope="col">รหัสวิชา</th>
                            <th class="col-1" scope="col">sect</th>
                            <th class="col-6" scope="col">ชื่อวิชา</th>
                            <th class="col-2" scope="col">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {show_class_list}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


function ADD_CLASS() {


    const [form_input,set_Form_input] = useState({
        class_id : "",
        class_sect : '',
        class_name : ""
    })

    const handle_classs_id_form = (event)=>{
        let dummy = {...form_input}
        dummy.class_id = event.target.value
        set_Form_input(dummy);
    }

    const handle_classs_sect_form = (event)=>{
        let dummy = {...form_input}
        dummy.class_sect = event.target.value
        set_Form_input(dummy);
    }

    const handle_classs_name_form = (event)=>{
        let dummy = {...form_input}
        dummy.class_name = event.target.value
        set_Form_input(dummy);
    }

    


    return (
        <div class="container">
            <br/>
            <h5 style={{textAlign:"center"}}>เพิ่มรายวิชาเรียน</h5>
            <hr/>
            <div class="row">
                <div class="col-1" />
                <div class="col-3">
                <input style={{ width: "100%", margin: "auto", textAlign: "center" }} class="form-control" type="text" placeholder="รหัสวิชา" value={form_input.class_id} onChange={handle_classs_id_form}/>
                </div>
                <div class="col-1">
                <input style={{ width: "100%", margin: "auto", textAlign: "center" }} class="form-control" type="text" placeholder="sect" value={form_input.class_sect} onChange={handle_classs_sect_form}/>
                </div>
                <div class="col-7">
                <input style={{ width: "100%", margin: "auto", textAlign: "center" }} class="form-control" type="text" placeholder="ชื่อวิชา" value={form_input.class_name} onChange={handle_classs_name_form}/>
                </div>
                
            </div>

        </div>
    )
}

export default Class;