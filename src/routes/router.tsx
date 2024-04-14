import { FunctionComponent } from "react"
import { BrowserRouter, useRoutes } from "react-router-dom"
import { LoginPage } from "../modules/auth/pages/LoginPage"
import { PrivateRoute } from "./PrivateRoute.component"
import { ChapterPage, LessonsPage, UserPage } from "../modules/Lessons/Pages"
import { SignUpPage } from "../modules/auth/pages/SignUpPage"
import { QuizPage } from "../modules/Lessons/Pages/QuizPage/QuizPage.component"
import { EditChapterPage } from "../modules/Lessons/Pages/EditChapterPage/EditChapterPage.component"
import { EditQuizPage } from "../modules/Lessons/Pages/EditQuizPage/EditQuizPage.component"
import { CreateQuizPage } from "../modules/Lessons/Pages/CreateQuizPage/CreateQuizPage.component"
import { CreateChapterPage } from "../modules/Lessons/Pages/CreateChapterPage/CreateChapterPage.component"


export const RouteList = {
  LESSONS: '/lessons',
  LOGIN: '/login',
  SIGNUP: '/signup',
  USER: '/user',
  CHAPTER: '/chapter',
  CHAPTER_ID: '/chapter/:id',
  EDITORCHAPER_ID: '/edit/chapter/:id',
  CHAPTER_ID_QUIZ_ID: '/chapter/:chapterid/quiz/:quizid',
  EDITORQUIZ_ID: '/edit/chapter/:chapterid/quiz/:quizid',
  CREATE_QUIZ: '/chapter/:chapterid/quiz/add',
  LESSON: '/lesson',
  CREATE_QUAPTER: '/lesson/:lessonid/chapter/add'
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
        path: RouteList.EDITORCHAPER_ID,
        element: <EditChapterPage/>
      },
      {
        path: RouteList.CHAPTER_ID_QUIZ_ID,
        element: <QuizPage />
      },
      {
        path: RouteList.EDITORQUIZ_ID,
        element: <EditQuizPage />
      },
      
      {
        path: RouteList.CHAPTER,
        element: <ChapterPage />
      },
      {
        path: RouteList.CREATE_QUIZ,
        element: <CreateQuizPage />
      },
      {
        path: RouteList.LESSON,
        element: <LessonsPage />
      },
      {
        path: RouteList.CREATE_QUAPTER,
        element: <CreateChapterPage/>
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