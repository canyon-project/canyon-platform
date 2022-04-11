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

export default [
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
        element: <Navigate to={'/project'} replace />,
      },
      {
        path: '/admin',
        element: <Admin />,
      },
      {
        path: 'project/:id/commit/:commitSha/tree/:catalogue',
        element: <ProjectCoverageReport />,
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