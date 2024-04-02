import { FunctionComponent } from "react"
import { BrowserRouter, useRoutes } from "react-router-dom"
import { LoginPage } from "../modules/auth/pages/LoginPage"
import { PrivateRoute } from "./PrivateRoute.component"
import { ChapterPage, LessonsPage, UserPage } from "../modules/Lessons/Pages"
import { SignUpPage } from "../modules/auth/pages/SignUpPage"


export const RouteList = {
  LESSONS: '/lessons',
  LOGIN: '/login',
  SIGNUP: '/signup',
  USER: '/user',
  CHAPTER: '/chapter',
  CHAPTER_ID: '/chapter/id/:id'
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
        path: RouteList.USER,
        element: <UserPage/>
      },
      {
        path: RouteList.LESSONS,
        element: <LessonsPage />
      },
      {
        path: RouteList.CHAPTER,
        element: <ChapterPage />
      },

      {
        path: RouteList.CHAPTER_ID,
        Element: <ChapterPage/>
      }
    ]
  }
]

const publicRoutes = [
  {
    path: RouteList.LOGIN,
    element: <LoginPage />
  },
  {
    path: RouteList.SIGNUP,
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
