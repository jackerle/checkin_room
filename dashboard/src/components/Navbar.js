import React ,{useState, useCallback}from 'react';
import Axios from 'axios'
import { useCookies } from "react-cookie";




function Login(){

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [jwt,setjwt] = useState({})
  console.log(jwt)

    const onChangeUsername = function(event){
      setUsername(event.target.value);
    }

    const onChangePassword = function(event){
      setPassword(event.target.value);
    }

    /*const getLogin = useCallback(()=>{
      Axios.post('https://jackerle.bike:8888/login',{
        username:username,
        password:password
      }).then((res)=>{
        setjwt(res)
      })
    },)*/

    const [cookie,setCookie] = useCookies(['jwt']);

    const getLogin = useCallback(function(){



        Axios({
          method:'post',
          url:'https://jackerle.bike:8888/login',
          data:{
            username:username,
            password:password
          },
        }).then((res)=>{
          console.log(res)
          setCookie('jwt',res.data.token,{path:'/'});
      })
    })


    return(
      <form class="form-inline my-2 my-lg-0" action="#">
          <input class="form-control mr-sm-2" type="text"  placeholder="Username" value={username} onChange={onChangeUsername}></input>
          <input class="form-control mr-sm-2" type="password" id = "password" placeholder="Password" value={password} onChange={onChangePassword}></input>
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={getLogin}>เข้าสู่ระบบ</button>
        </form>
    )
}


function Navbar() {

  




  return (
    <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">หน้าแรก</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
        </ul>
        <Login/>
      </div>
    </nav>
    </div>
  )
}

export default Navbar;