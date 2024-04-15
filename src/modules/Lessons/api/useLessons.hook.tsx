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

export type QuizPOST = {
  id: number,
  chapter: {
    id: number
  }
  name: string,
  text: string,
  image: string[],
  correctAnswer: number,
  answer: {
    id: number,
    text: string
  }[]
}

interface LeaderBoardResponse {
  data: User[]
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

  const getChapters = (): Promise<ChaptersResponse> => {
    return http.get('/chapter/all')
  }

  const getChapter = (chapterID: number): Promise<ChapterResponse> => {
    return http.get('/lesson/' + chapterID)
  }

  const getLesson = (lessonID: number): Promise<LessonResponse> => {
    return http.get('/lesson/' + lessonID)
  }

  const editLesson = (payload: Lesson): Promise<LessonResponse> => {
    return http.put('/lesson/'+payload.id, payload)
  }

  const createLesson = (payload: Lesson, chapterid: number): Promise<LessonResponse> => {
    // chapter/{id}/add/lessons
    return http.post(`chapter/${chapterid}/add/lessons`, payload)
  }

  const getQuiz = (quizID: number): Promise<QuizResponse> => {
    return http.get('/quiz/' + quizID)
  }

  const editQuiz = (payload: Quiz): Promise<QuizResponse> => {
    return http.put('/quiz/'+payload.id, payload)
  }

  const createQuiz = (payload: Quiz, ): Promise<QuizResponse> => {
    return http.post('/quiz/add', payload)
  }

  return {
    getLeaderBoard,
    getChapters,
    getLesson,
    editLesson,
    createLesson,
    getQuiz,
    editQuiz,
    createQuiz
  }
}
