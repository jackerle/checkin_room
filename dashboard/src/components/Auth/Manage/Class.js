import React, { useState, useEffect } from "react";
import Axios from "axios";
import env from "./../../../../../env.json"; 



/**
 *
 *
 * @returns
 */
function Class (){

    
    const [keyword,setKeyword] = useState('');
    const [class_list,setClass_list] = useState([]);


    useEffect(()=>{
        Axios.get(env.API+'/getAllClass')
        .then(res=>{
            setClass_list(res.data);
            console.log(class_list)
        })
    })


    const handleKeyword = (event)=>{
        setKeyword(event.target.value);
    }













    return(
        <div>
             <br />
            <h2 style={{ textAlign: "center" }}>จัดการรายวิชาเรียน</h2>
            <br />
            <input style={{ width: "50%", margin: "auto", textAlign: "center" }} class="form-control" type="text" placeholder="ค้นหาวิชาที่นี่" value={keyword} onChange={handleKeyword}/>
            <br/>
            <div style ={{width:"80%",margin:"auto",textAlign:"center"}}class="table-responsive"> 
                <table class = "table">
                    <thead>
                        <tr class="d-flex">
                            <th class ="col-3" scope="col">รหัสวิชา</th>
                            <th class ="col-1" scope="col">sect</th>
                            <th class ="col-6"scope = "col">ชื่อวิชา</th>
                            <th class ="col-2"scope = "col">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Class;