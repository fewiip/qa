import { useHttp } from "../../../config/useHttp.hook"


export type User = {
  firstName: string
  lastName: string
  bug: number
  coin: number,
  refill: number,
  victory: number
  id: number
}

export type Subscription = {
  course: Course,
  grade: number,
  id: number
}

export type Course = {
  id: number,
  name: string,
  owner: number,
  ownerName: string,
  ownerLastName: string, 
  description: string,
  chapters: Chapter[]
}

export type Chapter = {
  id: number,
  name: string
  owner: string,
  lessons: Lesson[]
}

export type Lesson = {
  id: number,
  name: string,
  text: string
  quizzes: Quiz[]
}

export type Quiz = {
  id: number,
  name: string,
  text: string,
  image: string[],
  correctAnswer: number,
  answer: {
    id: number,
    text: string
  }[]
}

export type subscribePOST = {
  courseId: number
}

export type CoursePOST = {
  name?: string, 
  owner?: number,
  description?: string, 
}

export type ChapterPOST = {
  name: string
}

export type LessonPOST = { 
  name: string,
  text: string 
}

export type QuizPOST = {
  name: string,
  text: string,
  image: string[],
  correctAnswer: number,
  answerRequests: {
    text: string
  }[]
}

interface LeaderBoardResponse {
  data: User[]
}

interface CoursesResponse {
  data: Course[]
}

interface CourseResponse {
  data: Course
}

interface ChaptersResponse {
  data: Chapter[]
}

interface ChapterResponse {
  data: Chapter
}

interface LessonResponse {
  data: Lesson
}

interface QuizResponse {
  data: Quiz
} 

interface SubscriptionResponse {
  data: Subscription[]
}

interface isSubscribed {
  data: {
    isSubscribed:boolean
  }
}

interface isOwner {
  data: {
    isOwner:boolean
  }
} 

export interface SignUpProps {
  firstName: string
  lastName: string
  email: string
  password: string
}

export const useLessons = () => {

  const { http } = useHttp()

  const getLeaderBoard = (): Promise<LeaderBoardResponse> => {
    return http.get('/leaderBoard')
  }

  const getCourseLeaderBoard = (courseID: number): Promise<LeaderBoardResponse> => {
    return http.get(`/leaderBoard/${courseID}`)
  }
  
  const getCourses = (): Promise<CoursesResponse> => {
    return http.get(`/course/all`)
  } 
  
  const getCourse = (courseid: number): Promise<CourseResponse> => { 
    return http.get(`/course/${courseid}`)
  } 

  const getCoursesByOwner = (userID: number): Promise<CoursesResponse> => { 
    return http.get(`/user/${userID}/course/ownership`)
  } 

  const getCourseSubscribers = (courseID: number): Promise<User> => {
    return http.get(`/course/${courseID}/users`)
  }
  
  const subscribeToCourse = (payload: subscribePOST, userID: number): Promise<User> => {
    return  http.post(`/user/${userID}/course/subscribe`, payload)
  } 
  
  const unSubscribeToCourse = (payload: subscribePOST, userID: number): Promise<User> => {
    return  http.post(`/user/${userID}/course/unSubscribe`, payload)
  }
  
  const isSubscribed = (userID: number, courseID: number): Promise<isSubscribed> =>  {
    return http.get(`/user/${userID}/course/${courseID}/subscription`)
  }
 
  const isCourseOwner = (userID: number, courseID: number): Promise<isOwner> => { 
    return http.get(`/user/${userID}/course/${courseID}/ownership`)
  }  

  const getSubscribedCourses = (userID: number): Promise<SubscriptionResponse> => {
    return  http.get(`user/${userID}/subscriptions/all`)
  }

  const createCourse = (payload: CoursePOST): Promise<CourseResponse> => {
    return http.post(`/course/add`, payload)
  } 
  
  const getChapters = (): Promise<ChaptersResponse> => {
    return http.get('/chapter/all')
  }

  //http://193.123.119.217:8080/api/v1/course/?name=Teste
  const searchCourses = (search: string) : Promise<CoursesResponse> => {
    return http.get('/course/?name='+search)
  }
  
  const editCourse = (courseID: number, payload: CoursePOST): Promise<CourseResponse> => {
    return http.put(`/course/${courseID}`, payload);
  }

  const deleteCourse = (courseID: number ):Promise<string> => {
    return http.delete('/course/'+courseID)
  }
  
  const createChapter = (payload: ChapterPOST, courseid: number): Promise<ChapterResponse> => {
    return http.post(`/course/${courseid}/create/chapter`, payload)
  }
  
  const getChapter = (chapterID: number): Promise<ChapterResponse> => {
    return http.get('/chapter/' + chapterID)
  }
  
  const editChapter = (payload: ChapterPOST, chapterID: number): Promise<ChapterResponse> => {
    return http.put(`/chapter/${chapterID}`, payload)
  }

  const deleteChapter = (chapterID: number) : Promise<string> => {
    return http.delete('/chapter/'+chapterID)
  }

  const getLesson = (lessonID: number): Promise<LessonResponse> => {
    return http.get('/lesson/' + lessonID)
  }

  const createLesson = (payload: LessonPOST, chapterid: number): Promise<LessonResponse> => {
    return http.post(`chapter/${chapterid}/create/lesson`, payload)
  }

  const editLesson = (payload: LessonPOST, lessonID: number): Promise<LessonResponse> => {
    return http.put('/lesson/'+lessonID, payload)
  }

  const deleteLesson = (lessonID: number): Promise<string> => {
    return http.delete('/lesson/'+lessonID)
  }

  const createQuiz = (payload: QuizPOST, lessonid: number): Promise<QuizResponse> => {
    return http.post(`lesson/${lessonid}/create/quizzes`, payload)
  }

  const getQuiz = (quizID: number): Promise<QuizResponse> => {
    return http.get('/quiz/' + quizID)
  }

  const editQuiz = (payload: QuizPOST, quizID: number): Promise<QuizResponse> => {
    return http.put('/quiz/'+quizID, payload)
  }

  const deleteQuiz = (quizID: number): Promise<string> => {
    return http.delete('/quiz/'+quizID)
  }


  return {
    getLeaderBoard,
    getCourseLeaderBoard,
    getChapters,
    getCourses,
    searchCourses,
    getSubscribedCourses,
    getCourseSubscribers,
    createCourse,
    getCourse,
    editCourse,
    deleteCourse,
    subscribeToCourse,
    unSubscribeToCourse,
    getCoursesByOwner,
    isSubscribed,
    isCourseOwner,
    createChapter,
    getChapter,
    editChapter,
    deleteChapter,
    createLesson,
    getLesson,
    editLesson,
    deleteLesson,
    getQuiz,
    editQuiz,
    createQuiz,
    deleteQuiz
  }
}
