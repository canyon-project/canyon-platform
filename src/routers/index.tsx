import React from 'react'
import Welcome from '../pages/Welcome'
import ToDoList from '../pages/ToDoList'
import MainBox from '../components/MainBox/indexNew'
import Dashboard from '../pages/Dashboard'
import Repo from '../pages/Repo'

export default [
  {
    path: '/welcome',
    element: <Welcome />,
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
    ],
  },
]
