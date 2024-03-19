import { FunctionComponent } from "react"
import { BrowserRouter, useRoutes } from "react-router-dom"
import { LoginPage } from "../modules/auth/pages/LoginPage"
import { PrivateRoute } from "./PrivateRoute.component"
import { LessonsPage } from "../modules/Lessons/Pages"
import { SignUpPage } from "../modules/auth/pages/SignUpPage"

export enum RouteEnum {
  LESSONS = '/lessons',
  LOGIN = '/login',
  SIGNUP = '/signup'
}

const privateRoutes = [
  {
    element: <PrivateRoute/>,
    children: [
      {
        path: '/',
        element: <LessonsPage />
      },
      {
        path: RouteEnum.LESSONS,
        element: <LessonsPage />
      },
    ]
  }
]

const publicRoutes = [
  {
    path: RouteEnum.LOGIN,
    element: <LoginPage />
  },
  {
    path: RouteEnum.SIGNUP,
    element: <SignUpPage />
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