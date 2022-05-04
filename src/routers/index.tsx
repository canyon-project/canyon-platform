import React from 'react'
import MainBox from '../components/MainBox/indexNew'
import { Navigate } from 'react-router-dom'
import Admin from '../pages/admin'
import ProjectCreateAndUpdate from '../pages/Project/CreateAndUpdate'
import Project from '../pages/Project'
import CodeHouseCreateAndUpdate from '../pages/CodeHouse/CreateAndUpdate'
import CodeHouse from '../pages/CodeHouse'
import Ex404 from '../pages/exception/404'
import ProjectCoverageReport from '../pages/ProjectCoverageReport'
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
      // {
      //   path: '/',
      //   element: <Navigate to={'/'} replace />,
      // },
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/:group/:repo',
        element: <Repo />,
      },
      {
        path: '/:group/:repo/:commitSha/:path',
        element: <RepoCoverageReport />,
      },
      {
        path: 'project/:id',
        element: <ProjectCreateAndUpdate />,
      },
      {
        path: 'project',
        element: <Project />,
      },
      {
        path: '/code-house/:id',
        element: <CodeHouseCreateAndUpdate />,
      },
      {
        path: '/code-house',
        element: <CodeHouse />,
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
