import React, { useState } from 'react'
import InfoRoom from './Card/infoRoom'


function Home(prop) {

    const { isToken } = prop

    if (!isToken())
        return (
            <div style={{
                padding: "30px",
                color: "gray",
                textAlign: "center",

            }}>
                <h2>ยินดีต้อนรับเข้าสู่ระบบบันทึกการใช้งานห้องเรียน</h2>
                <h4>ท่านยังไม่ได้เข้าสู่ระบบกรุณาเข้าสู่ระบบก่อน</h4>
            </div>
        )

    // Auth Success
    return (
        <div className="container" style={{
            padding: "30px",
            color: "gray",
            textAlign: "center",

        }}>
            <h2>ยินดีต้อนรับเข้าสู่ระบบบันทึกการใช้งานห้องเรียน</h2>
            <h4>ท่านเข้าสู่ระบบเรียบร้อยแล้ว</h4>
            <div className="row">
                <div className="col">
                    <InfoRoom />
                </div>
            </div>

        </div>
    )
}

export default Home;