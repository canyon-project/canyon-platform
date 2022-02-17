import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { set } from './redux/action/userinfo'
import { UserService } from './services/UserService'
import { useTranslation } from 'react-i18next'
import routerConfig from "./routers";
import { useRoutes } from "react-router-dom";

interface IProps{
}

const App:React.FC<IProps> = () => {
  // const dispatch = useDispatch()
  // const userinfo: any = useSelector((state) => state)
  // const { t, i18n } = useTranslation()
  // // 首次加载拉取userinfo，存入redux
  // function getuserinfo() {
  //   if (localStorage.getItem('token')) {
  //     UserService.getuserinfo().then((res) => {
  //       dispatch(set(res))
  //     })
  //   }
  // }
  //
  // useEffect(() => {
  //   getuserinfo()
  // }, [])

  const useRoutesRouterConfig = useRoutes(routerConfig)
  return <div>
    {
      (useRoutesRouterConfig)
    }
  </div>
}

export default App
