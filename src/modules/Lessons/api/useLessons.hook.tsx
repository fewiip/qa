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

interface leaderBoardResponse {
  data: User[]
}

interface statisticsResponse {
  data : User 
}

export const useLessons = () => {

  const { http } = useHttp()

  const getLeaderBoard = (): Promise<leaderBoardResponse> => {
    return http.get('/leaderBoard')
  }
/*
  const getStatistics = () : Promise<statisticsResponse> => {
    //return http.get("/statistics/" + userId)
    return[];
  }*/

  return {
    getLeaderBoard,
  }
}
