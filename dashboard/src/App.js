import React, { useState, useCallback, useEffect } from 'react'
import { useCookies } from "react-cookie";
import Navbar from './components/Navbar'
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Home from './components/Home';
import Table from './components/Auth/Table';
import History from './components/Auth/History';
import Room from './components/Auth/Manage/Room';
import Class from './components/Auth/Manage/Class';
import Class_student from './components/Auth/Manage/Class_student';



function App() {

    const [cookie, setCookie, removeCookie] = useCookies(['jwt']);



    const isToken = () => {
        return (cookie.jwt != 'undefined' && cookie.jwt != undefined)
    }


    const setToken = (token) => {
        setCookie('jwt', token, { path: '/' });
        console.log('setCookie success')
    }


    const removeToken = () => {
        console.log("remove success");
        removeCookie('jwt', { path: '/' });
    }

    //Autherication

    const checkLogin = () => {
        if (isToken()) {
            return (
                <div className="AuthRoute">
                    <Route exact path="/table">
                        <Table />
                    </Route>
                    <Route exact path="/history">
                        <History />
                    </Route>
                    <Route exact path="/manage_room">
                        <Room/>
                    </Route>
                    <Route exact path="/manage_class">
                        <Class/>
                    </Route>
                    <Route exact path ="/class_student">
                        <Class_student/>
                    </Route>
                </div>
            )
        }
        else {
            return (
                <Redirect to={{ pathname: '/' }} />
            )
        }
    }



    return (
        <div className="App">
            <Navbar
                setToken={setToken}
                token={cookie.jwt}
                removeToken={removeToken}
                isToken={isToken}
            />
            <Switch>
                <Route exact path="/">
                    <Home
                        isToken={isToken}
                    />
                </Route>
                {checkLogin()}
            </Switch>
        </div>

    )






}




export default App;




//Day = ['Monday,Tuesday']

//hour = [1,2,3,4,5,6,7]

/*
    1 = 8.30-9.20
    2 = 9.25 - 10.40
    3 = 10.50 - 12.05
*/


//Date.now  => Day? hour?


//select from Class_table
//where day = day_input and hour = hour_input
//and room_id = room_id


/*
Class Table
-class_name
-Day_
-Hour = [1,2,3,4,5,6,7]
-class_id

Regis_Class_Tran
-class_id
-student_id

send_checkin(room_id){
    Date=>{Day,hour} -->Class Table --> Checkin 

}




*/