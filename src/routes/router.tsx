import { FunctionComponent } from "react"
import { BrowserRouter, useRoutes } from "react-router-dom"
import { LoginPage } from "../modules/auth/pages/LoginPage"
import { PrivateRoute } from "./PrivateRoute.component"
import { LessonPage, LessonsPage, UserPage } from "../modules/Lessons/Pages"
import { SignUpPage } from "../modules/auth/pages/SignUpPage"
import { QuizPage } from "../modules/Lessons/Pages/QuizPage/QuizPage.component"

import { EditQuizPage } from "../modules/Lessons/Pages/EditQuizPage/EditQuizPage.component"
import { CreateQuizPage } from "../modules/Lessons/Pages/CreateQuizPage/CreateQuizPage.component"

import { CoursesPage } from "../modules/Lessons/Pages/CoursesPage"
import { ArenaPage } from "../modules/Lessons/Pages/ArenaPage"
import { CreateLessonPage } from "../modules/Lessons/Pages/CreateLessonPage"
import { EditLessonPage } from "../modules/Lessons/Pages/EditLessonPage"
import { CreateCoursePage } from "../modules/Lessons/Pages/CreateCoursePage"
import { EditCoursePage } from "../modules/Lessons/Pages/EditCoursePage"
import { SeeAllCourses } from "../modules/Lessons/Pages/SeeAllCoursesPage/SeeAllCoursesPage.component"
import { CoursePage } from "../modules/Lessons/Pages/CoursePage"


export const RouteList = {
  LESSONS: '/lessons',
  LOGIN: '/login',
  SIGNUP: '/signup',
  USER: '/user',
  ARENA: '/arena',
  COURSES: '/courses',
  CHAPTER: '/chapter',
  LESSON: '/lesson',
  COURSE_ID: '/courses/:courseid',
  LESSON_ID: '/lesson/:id',
  LESSON_ID_QUIZ_ID: '/lesson/:lessonid/quiz/:quizid',
  CREATE_COURSE: '/courses/add',
  CREATE_CHAPTER: '',
  CREATE_LESSON: '/chapter/:chapterid/lesson/add',
  CREATE_QUIZ: '/lesson/:lessonid/quiz/add',
  EDITCOURSE: '/courses/edit/:courseid',
  SELLALLCOURSES: '/courses/all',
  EDITCHAPTER: '',
  EDITORLESSON_ID: '/lesson/edit/:id',
  EDITORQUIZ_ID: '/edit/lesson/:lessonid/quiz/:quizid',
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
        path: RouteList.COURSE_ID,
        element: < CoursePage />
      },
      {
        path: RouteList.LESSON_ID,
        element: <LessonPage/>
      },
      {
        path: RouteList.LESSON_ID_QUIZ_ID,
        element: <QuizPage />
      },
      {
        path: RouteList.COURSES,
        element: <CoursesPage/>
      },
      {
        path: RouteList.SELLALLCOURSES,
        element: < SeeAllCourses />
      },      
      {
        path: RouteList.CREATE_COURSE,
        element: < CreateCoursePage />
      },
      {
        path: RouteList.EDITCOURSE,
        element: <EditCoursePage/>
      }, 
      {
        path: RouteList.CREATE_LESSON,
        element: <CreateLessonPage/>
      },
      {
        path: RouteList.CREATE_QUIZ,
        element: <CreateQuizPage />
      },
      
      {
        path: RouteList.EDITORLESSON_ID,
        element: <EditLessonPage/>
      },
      {
        path: RouteList.EDITORQUIZ_ID,
        element: <EditQuizPage />
      },   
      {
        path: RouteList.LESSON,
        element: <LessonPage />
      },
      
      {
        path: RouteList.LESSON,
        element: <LessonsPage />
      },
      
      
      {
        path: RouteList.ARENA,
        element: <ArenaPage/>
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