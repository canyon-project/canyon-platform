import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import request from "../../utils/request";





const Dashboard = (props:any)=> {
    const [msg,setMsg] = useState({})
    useEffect(()=>{
        request.get('/api/user').then(res=>{
            console.log(res)
            setMsg(res)
        })
    },[])
    return <div>
        Dashboard
        <p>{JSON.stringify(msg)}</p>
    </div>
}

export default Dashboard
