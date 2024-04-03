import { FunctionComponent } from "react"
import { BrowserRouter, useRoutes } from "react-router-dom"
import { LoginPage } from "../modules/auth/pages/LoginPage"
import { PrivateRoute } from "./PrivateRoute.component"
import { ChapterPage, LessonsPage, UserPage } from "../modules/Lessons/Pages"
import { SignUpPage } from "../modules/auth/pages/SignUpPage"
import { QuizPage } from "../modules/Lessons/Pages/QuizPage/QuizPage.component"


export const RouteList = {
  LESSONS: '/lessons',
  LOGIN: '/login',
  SIGNUP: '/signup',
  USER: '/user',
  CHAPTER: '/chapter',
  CHAPTER_ID: '/chapter/:id',
  QUIZ_ID: '/quiz/:id',
  CHAPTERQUIZ_ID: '/chapter/:chapterid/quiz/:quizid'
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
        path: RouteList.CHAPTER_ID,
        element: <ChapterPage/>
      },
      {
        path: RouteList.QUIZ_ID,
        element: <QuizPage />
      },
      {
        path: RouteList.CHAPTERQUIZ_ID,
        element: <QuizPage />
      },
      {
        path: RouteList.CHAPTER,
        element: <ChapterPage />
      },

      
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
