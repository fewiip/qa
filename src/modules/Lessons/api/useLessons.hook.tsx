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

export type CoursePOST = {
  name: string, 
  owner: number
}

export type Chapter = {
  id: number,
  name: string
  owner: string,
  lessons: Lesson[]
}

/*
export type Chapter = {
  id: number,
  name: string
  lessons: {
    id: number,
    name: string,
    text: string
  }[]
}*/


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

export type LessonPOST = { 
  name: string,
  text: string 
}

export type ChapterPOST = {
  name: string
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

  const createCourse = (payload: CoursePOST): Promise<CourseResponse> => {
    
    return http.post(`/course/add`, payload)
  } 

  const getCourses = (): Promise<CoursesResponse> => {
    return http.get(`/course/all`)
  } 

  const getCourse = (courseid: number): Promise<CourseResponse> => {
    
    return http.get(`/course/${courseid}`)
  } 

  const editCourse = (courseid: number): Promise<CourseResponse> => {
    return http.put(`/course/${courseid}`);
  }

  const getChapters = (): Promise<ChaptersResponse> => {
    return http.get('/chapter/all')
  }

  const createChapter = (payload: ChapterPOST, courseid: number): Promise<ChapterResponse> => {
    return http.post(`/course/${courseid}/create/chapter`, payload)
  }

  const getChapter = (chapterID: number): Promise<ChapterResponse> => {
    return http.get('/lesson/' + chapterID)
  }

  const createLesson = (payload: LessonPOST, chapterid: number): Promise<LessonResponse> => {
    // chapter/{id}/add/lessons
    return http.post(`chapter/${chapterid}/create/lesson`, payload)
  }

  const getLesson = (lessonID: number): Promise<LessonResponse> => {
    return http.get('/lesson/' + lessonID)
  }

  const editLesson = (payload: Lesson): Promise<LessonResponse> => {
    return http.put('/lesson/'+payload.id, payload)
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


  return {
    getLeaderBoard,
    getChapters,
    createCourse,
    getCourses,
    getCourse,
    editCourse,
    createChapter,
    getChapter,
    getLesson,
    editLesson,
    createLesson,
    getQuiz,
    editQuiz,
    createQuiz
  }
}
