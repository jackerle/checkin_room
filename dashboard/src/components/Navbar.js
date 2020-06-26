import React from 'react';


function Navbar() {

  const [jwt,setjwt] = useState( document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1"))
  console.log("jwt = "+jwt)

  return (
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
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="text" placeholder="Username" aria-label="Search"></input>
          <input class="form-control mr-sm-2" type="password" placeholder="Password" aria-label="Search"></input>
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">เข้าสู่ระบบ</button>
        </form>
      </div>
    </nav>
  )
}

export default Navbar;