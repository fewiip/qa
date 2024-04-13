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
export type Lesson = {
  id: number,
  name: string
  chapters: {
    id: number,
    name: string,
    text: string
  }[]
}

export type Chapter = {
  id: number,
  name: string,
  text: string
  quizzes: Quiz[]
}

export type Quiz = {
  id: number,
  lesson_id: number,
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

interface LessonsResponse {
  data: Lesson[]
}

interface ChapterResponse {
  data: Chapter
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

  const getLessons = (): Promise<LessonsResponse> => {
    return http.get('/lesson/all')
  }

  const getChapter = (chapterID: number): Promise<ChapterResponse> => {
    return http.get('/chapter/' + chapterID)
  }

  const putChapter = (payload: Chapter): Promise<ChapterResponse> => {
    return http.put('/chapter/'+payload.id, payload)
  }

  const getQuiz = (quizID: number): Promise<QuizResponse> => {
    return http.get('/quiz/' + quizID)
  }

  const putQuiz = (payload: Quiz): Promise<QuizResponse> => {
    return http.put('/quiz/'+payload.id, payload)
  }

  return {
    getLeaderBoard,
    getLessons,
    getChapter,
    putChapter,
    getQuiz,
    putQuiz
  }
}
