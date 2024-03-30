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
}

interface LeaderBoardResponse {
  data: User[]
}

// interface statisticsResponse {
//   data: User
// }

interface LessonsResponse {
  data: Lesson[]
}

interface ChapterResponse {
  data: Chapter
}

export const useLessons = () => {

  const { http } = useHttp()

  const getLeaderBoard = (): Promise<LeaderBoardResponse> => {
    return http.get('/leaderBoard')
  }

  const getLessons = (): Promise<LessonsResponse> => {
    return http.get('/lesson/all')
  }

  interface ChapterResponse {
    data: {
        id: number,
        name: string,
        text: string
    }
  }

const getChapter = (chapterID: number): Promise<ChapterResponse> => {
    return http.get('/chapter/'+chapterID)
  }
  /*
    const getStatistics = () : Promise<statisticsResponse> => {
      //return http.get("/statistics/" + userId)
      return[];
    }*/

  return {
    getLeaderBoard,
    getLessons,
    getChapter
  }
}
