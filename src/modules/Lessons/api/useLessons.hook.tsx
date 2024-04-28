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

export type Course = {
  id: number,
  name: string,
  owner: string,
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
  courseId: number[]
}

export type CoursePOST = {
  name?: string, 
  owner?: number
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

  
  const getCourses = (): Promise<CoursesResponse> => {
    return http.get(`/course/all`)
  } 
  
  const getCourse = (courseid: number): Promise<CourseResponse> => {
    
    return http.get(`/course/${courseid}`)
  } 

  const subscribeToCourse = (payload: subscribePOST): Promise<User> => {
    return  http.post('')
  } 
  /* 
  
  const unSubscribeToCourse = () {
    return  http.get('')
  }
  
  const isSubscribed = (): {
    return  http.get('')
  }
  
  const getSubscribedCourses = () => {
    return  http.get('')
  }*/

  const createCourse = (payload: CoursePOST): Promise<CourseResponse> => {
    return http.post(`/course/add`, payload)
  } 
  
  const getChapters = (): Promise<ChaptersResponse> => {
    return http.get('/chapter/all')
  }
  
  const editCourse = (courseID: number, payload: CoursePOST): Promise<CourseResponse> => {
    return http.put(`/course/${courseID}`, payload);
  }

  const deleteCourse = (courseID: number ):Promise<string> => {
    return http.delete('/courses/'+courseID)
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

  const editLesson = (payload: Lesson): Promise<LessonResponse> => {
    return http.put('/lesson/'+payload.id)
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

  const editQuiz = (payload: Quiz): Promise<QuizResponse> => {
    return http.put('/quiz/'+payload.id, payload)
  }

  const deleteQuiz = (quizID: number): Promise<string> => {
    return http.delete('/quiz/'+quizID)
  }


  return {
    getLeaderBoard,
    getChapters,
    getCourses,
    createCourse,
    getCourse,
    editCourse,
    deleteCourse,
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
