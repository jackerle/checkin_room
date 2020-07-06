import React ,{useState}from "react";



function ADD_CLASS() {

    const [timeValue,setTimeValue] = useState('')


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
            <br/>
            
            <div class="row">
            <div class="col-2"/>
            <div class="col-4">
            <label for="start_time">เลือกเวลาที่เริ่มต้น:</label>
            <input type="time" id="start_time" name="start_time"></input>
            </div>
            <div class="col-4">
            <label for="end_time">เลือกเวลาที่จบคาบ:</label>
            <input type="time" id="start_time" name="end_time"></input>
            </div>
            <div class="col-2">
            <button type="button" class="btn btn-outline-primary">เพิ่มเวลา</button>
            </div>
            </div>
        </div>
    )
}

export default ADD_CLASS;