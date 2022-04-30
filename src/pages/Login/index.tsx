import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import request from "../../utils/request";


function getValue(search:any,key:any) {
//找出key第一次出现的位置
  var start = search.indexOf(key);
  if(start == -1) {
    return;
  }
//找出key最后出现的位置
  var end = search.indexOf("&",start);
  if(end == -1) {
    end = search.length;
  }
//取出键值对
  var str = search.substring(start,end);
//获取getValue
  var arr = str.split("=");
  return arr;
}



const Login=(props:any)=> {
  const location = useLocation()
  const nav = useNavigate()
  useEffect(()=>{
    // console.log(getValue(location.search,"code"))

    const [_,code] = getValue(location.search,"code")

    console.log(code)

    request.post('/api/oauth/token',{code}).then((res:any)=>{
      // console.log(res,123)
      localStorage.setItem('token',res.token)
      nav('/dashboard')
    })


  },[])
  return <div>
    login
  </div>
}


export default Login
