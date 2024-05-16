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
import { CourseStatisticsPage } from "../modules/Lessons/Pages/CourseStatisticsPage"
import { SubscriptionsPage } from "../modules/Lessons/Pages/SubscriptionsPage"
import { FinishedQuizPage } from "../modules/Lessons/Pages/FinishedQuizPage"
import { SearchCoursesPage } from "../modules/Lessons/Pages/SearchCoursesPage"
import { EditUserPage } from "../modules/Lessons/Pages/EditUserPage"
import { CreatedCoursesPage } from "../modules/Lessons/Pages/CreatedCoursesPage"
import { CourseLessonsPage } from "../modules/Lessons/Pages/CourseLessonsPage"
import { EditUserNamePage } from "../modules/Lessons/Pages/EditUserNamePage"
import { EditUserEmailPage } from "../modules/Lessons/Pages/EditUserEmailPage"
import { EditUserPasswordPage } from "../modules/Lessons/Pages/EditUserPasswordPage"
import { HomePage } from "../modules/Lessons/Pages/HomePage"


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
  COURSE_STATISTICS: '/courses/statistics/:courseid',
  LESSON_ID: '/lesson/:id',
  LESSON_ID_QUIZ_ID: '/lesson/:lessonid/quiz/:quizid',
  CREATE_COURSE: '/courses/add',
  SEARCH_COURSE: '/courses/search/:search',
  COURSE_OWNERSHIP: '/courses/ownership',
  CREATE_CHAPTER: '',
  CREATE_LESSON: '/chapter/:chapterid/lesson/add',
  CREATE_QUIZ: '/lesson/:lessonid/quiz/add',
  EDITCOURSE: '/courses/edit/:courseid',
  SELLALLCOURSES: '/courses/all',
  COURSE_LESSONS: '/courses/:courseid/lessons',
  SUBSCRIPTIONS: '/courses/subscriptions',
  EDITCHAPTER: '',
  EDITORLESSON_ID: '/lesson/edit/:id',
  EDITORQUIZ_ID: '/edit/lesson/:lessonid/quiz/:quizid',
  LESSON_FINISHED: '/lesson/finished/:lessonid/',
  EDIT_USER: '/user/edit',
  EDIT_USER_NAME: '/user/name/edit',
  EDIT_USER_PASSWORD: '/user/password/edit',
  EDIT_USER_EMAIL: '/user/email/edit',
  TEST: '/test'
}

const privateRoutes = [
  {
    element: <PrivateRoute/>,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path:  RouteList.TEST,
        element: <HomePage />
      },
      {
        path: RouteList.USER,
        element: <UserPage/>
      },
      {
        path: RouteList.LESSONS,
        element: <HomePage />
      },
      {
        path: RouteList.COURSE_ID,
        element: < CoursePage />
      },
      {
        path: RouteList.COURSE_STATISTICS,
        element: < CourseStatisticsPage />
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
        path: RouteList.COURSE_OWNERSHIP,
        element: < CreatedCoursesPage />
      }, 
      {
        path: RouteList.SUBSCRIPTIONS,
        element: < SubscriptionsPage />
      }, 
      {
        path: RouteList.CREATE_COURSE,
        element: < CreateCoursePage />
      },

      {
        path: RouteList.COURSE_LESSONS,
        element: < CourseLessonsPage />
      }, 
      {
        path: RouteList.EDITCOURSE,
        element: <EditCoursePage/>
      }, 
      
      {
        path: RouteList.SEARCH_COURSE,
        element: <SearchCoursesPage/>
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
        path: RouteList.EDIT_USER,
        element: <EditUserPage />
      }, 
      {
        path: RouteList.EDIT_USER_NAME,
        element: <EditUserNamePage />
      }, 
      {
        path: RouteList.EDIT_USER_EMAIL,
        element: <EditUserEmailPage />
      }, 
      {
        path: RouteList.EDIT_USER_PASSWORD,
        element: <EditUserPasswordPage />
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
        path: RouteList.LESSON_FINISHED,
        element: <FinishedQuizPage/>
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