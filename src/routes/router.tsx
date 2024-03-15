import { FunctionComponent } from "react"
import { BrowserRouter, useRoutes } from "react-router-dom"
import { LoginPage } from "../modules/auth/pages/LoginPage"
import { PrivateRoute } from "./PrivateRoute.component"
import { LessonsPage } from "../modules/Lessons/Pages"

const privateRoutes = [
  {
    element: <PrivateRoute/>,
    children: [
      {
        path: 'lessons',
        element: <LessonsPage />
      },
    ]
  }
]

const publicRoutes = [
  {
    path: '/login',
    element: <LoginPage />
  }
]

const AllRoutes: FunctionComponent = () => {
  
  return useRoutes([
    ...publicRoutes,
    ...privateRoutes
  ])
}

export const Router = () => {
  return (
    <BrowserRouter>
      <AllRoutes />
    </BrowserRouter>
  )
}

// const array1 = ["arroz", "feijao"];
// const array2 = [...array1];//spread 