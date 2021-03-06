import React, { useState, useEffect } from "react";
import Axios from "axios";
import env from "../../../../../../env.json";
import { Link } from "react-router-dom";
import ADD_CLASS from "./Add_class";


/**
 *
 *
 * @returns
 */
function Class() {


    const [keyword, setKeyword] = useState('');
    const [class_list, setClass_list] = useState([]);
    const [add_class_button, set_add_Toggle] = useState(false)
    const [keyword_id, setKeyword_id] = useState('');
    const [term, set_term] = useState([])
    const [current_term, set_current_term] = useState('');


    useEffect(() => {
        Axios({
            method: 'post',
            url: env.API + '/get_class',
            data: {
                term: current_term.term
            }
        }).then(res => {
            console.log(res.data);
                setClass_list(res.data);
            })
    }, [add_class_button,current_term])


    useEffect(() => {
        Axios({
            method: 'post',
            url: env.API + '/get_term',
        }).then(res => {
            set_term(res.data)
            set_current_term(res.data[res.data.length - 1])
        }).catch(err => {
            console.log(err)
        })
    }, [])


    const handleKeyword = (event) => {
        setKeyword(event.target.value);
    }

    const handleKeyword_id = (event) => {
        setKeyword_id(event.target.value);
    }


    const show_class_list = class_list && class_list.map(obj => {
        const { class_id, class_name } = obj
        let to_ = `/class_schedule?class_id=${class_id}`

        if ((keyword == '' && keyword_id == '') || (class_name.toUpperCase().indexOf(keyword.toUpperCase()) != -1 && class_id.indexOf(keyword_id) != -1)) {
            return (
                <tr class="d-flex">
                    <th scope="row" class="col-3">{class_id}</th>
                    <td style={{ textAlign: "left" }} class="col-6">
                        <a href={to_}>{class_name.split('(')[0]}</a>
                    </td>
                    <td class="col-2"></td>
                </tr>
            )
        }
    })


    const add_class_button_element = () => {
        if (add_class_button) {
            return (
                <ADD_CLASS current_term={current_term}/>

            )
        }
        else {
            return (
                <br />

            )
        }
    }

    const handle_add_button = () => {
        set_add_Toggle(!add_class_button)
    }


    const handle_term_change = (event)=>{
        set_current_term({"term":event.target.value})
        console.log(event.target.value);
    }



    return (
        <div>
            <br />
            <h2 style={{ textAlign: "center" }}>จัดการรายวิชาเรียน</h2>
            <br />
            <div class="container">
                <div class="row">
                    <div class="col-2">
                        <select class="form-control" value={current_term.term} onChange={handle_term_change}>
                            {
                                term && term.map((ele) => {
                                    return (
                                        <option value={ele.term}>{ele.term}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div class="col-2">
                        <input style={{ width: "100%", margin: "auto", textAlign: "center" }} class="form-control" type="text" placeholder="ค้นหารหัสวิชาที่นี่" value={keyword_id} onChange={handleKeyword_id} />
                    </div>
                    <div class="col-6">
                        <input style={{ width: "100%", margin: "auto", textAlign: "center" }} class="form-control" type="text" placeholder="ค้นหาชื่อวิชาที่นี่" value={keyword} onChange={handleKeyword} />
                    </div>
                    <div class="col-2">
                        <button type="button" class={add_class_button ? "btn btn-danger" : "btn btn-success"} onClick={handle_add_button}>{add_class_button ? "ยกเลิก" : "เพิ่มวิชาเรียน"}</button>
                    </div>
                </div>
            </div>
            {add_class_button_element()}
            <div style={{ width: "80%", margin: "auto", textAlign: "center" }} class="table-responsive">
                <table class="table">
                    <thead>
                        <tr class="d-flex">
                            <th class="col-3" scope="col">รหัสวิชา</th>
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




export default Class;