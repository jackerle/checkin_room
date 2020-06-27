import React, { useState } from 'react'

function Home(prop){
    
    const {isToken} = prop

    return(
        
        <div style={{
            padding:"30px",
            color:"gray",
            textAlign:"center",
            
        }}>
        <h2>ยินดีต้อนรับเข้าสู่ระบบบันทึกการใช้งานห้องเรียน</h2>
        {isToken()?<h4>ท่านเข้าสู่ระบบเรียบร้อยแล้ว</h4>:<h4>ท่านยังไม่ได้เข้าสู่ระบบกรุณาเข้าสู่ระบบก่อน</h4>}
        </div>
    )
}

export default Home;