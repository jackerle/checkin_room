import React, { useState, useCallback, useEffect } from 'react'
import { useCookies } from "react-cookie";
import jwt from "jsonwebtoken";
import Navbar from './components/Navbar'
import { 
    Switch,
    Route } from "react-router-dom";
import Home from './components/Home';
import Table from './components/Auth/Table';



// STATE isLogin!
// SET STATE FN


function App(){

    const [cookie,setCookie,removeCookie] = useCookies(['jwt']);
  
    

    const isToken =  ()=>{
        console.log(cookie.jwt!='undefined'&&cookie.jwt!=undefined)
        return (cookie.jwt!='undefined'&&cookie.jwt!=undefined)
    }


    const setToken = (token)=>{    
        setCookie('jwt',token,{path:'/'});
        console.log('setCookie success')
    }


    const removeToken = ()=>{
        console.log("remove success");
        removeCookie('jwt',{path:'/'});
    }
    
    //Autherication
    
    const checkLogin = ()=>{
        if(isToken()){
            return(
                <Route exact path = "/table">
                    <Table/>
                </Route>
            )
        }
    }



    return(
    <div className = "App">
        <Navbar
            setToken = {setToken} 
            token = {cookie.jwt}
            removeToken = {removeToken}
            isToken = {isToken}
            />
        <Switch>
        <Route exact path="/">
            <Home/>
         </Route>
        {checkLogin()}
        </Switch>
    </div>
        
    )
    
    




}




export default App;