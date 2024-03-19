import { useHttp } from "../../../config/useHttp.hook"

export type User = {
  firstName: string
  lastName: string
  score: number
}

interface leaderBoardResponse {
  data: User[]
}


export const useLessons = () => {

  const { http } = useHttp()

  const getLeaderBoard = (): Promise<leaderBoardResponse> => {
    return http.get('/leaderBoard')
  }

  return {
    getLeaderBoard,
  }
}
