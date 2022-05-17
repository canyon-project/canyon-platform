import React from 'react'
import MainBox from '../components/MainBox/indexNew'
import Admin from '../pages/admin'
import Ex404 from '../pages/exception/404'
import Login from "../pages/Login";
import Welcome from "../pages/Welcome";
import Dashboard from "../pages/Dashboard";
import Repo from '../pages/Repo'
import RepoCoverageReport from "../pages/RepoCoverageReport";

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
