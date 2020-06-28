import React, { useState } from "react";
/**
 *
 *
 * @returns
 */
function Class (){

    
    const [keyword,setKeyword] = useState('');


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
        </div>
    )
}

export default Class;