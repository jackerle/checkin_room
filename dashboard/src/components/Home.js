import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

function Home(){

    let location = useLocation();

    const [from,setForm] = useState(location.state||{from:{pathname:'/'}}) 

    

    return(
        
        <div style={{
            padding:"30px",
            color:"gray",
            textAlign:"center",
            
        }}>
        <h2>ยินดีต้อนรับเข้าสู่ระบบบันทึกการใช้งานห้องเรียน</h2>
        <h4>หากยังไม่ได้เข้าสู่ระบบกรุณาเข้าสู่ระบบก่อน</h4>
        </div>
    )
}

export default Home;