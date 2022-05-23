import React from 'react'
import Welcome from '../pages/Welcome'
import ToDoList from '../pages/ToDoList'
import MainBox from '../components/MainBox/indexNew'
import Dashboard from '../pages/Dashboard'
import Repo from '../pages/Repo'
import RepoCoverageReport from '../pages/RepoCoverageReport'
import Admin from '../pages/admin'
import Ex404 from '../pages/exception/404'
import Login from '../pages/Login'

export default [
  {
    path: '/welcome',
    element: <Welcome />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/todolist',
    element: <ToDoList />,
  },
  {
    path: '/',
    element: <MainBox />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/:group/:repo',
        element: <Repo />,
      },
      {
        path: '/:group/:repo/:commitSha',
        element: <RepoCoverageReport />,
      },
      {
        path: '/user',
        element: <Admin />,
      },
      {
        path: '*',
        element: <Ex404 />,
      },
    ],
  },
]
