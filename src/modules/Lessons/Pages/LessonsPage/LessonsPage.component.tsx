
import { useEffect, useState } from "react"
import { AppLayout } from "../../../../shared/components/AppLayout"
import { LeadershipCard } from "../../components/LeadershipCard/LeadershipCard.component"
import styles from "./LessonsPage.module.css"
import { Chapter, User, useLessons } from "../../api"
//import { useAuthStore } from "../../../auth/stores/useAuthStore.hook"
import { StatisticsCard } from "../../components/StatisticsCard/StatisticsCard.component"
import { NextAchievementCard } from "../../components/NextAchievementCard"
import { ChaptersCard } from "../../components/LessonsCard/LessonsCard.component"
import { useParams } from "react-router-dom"
import { useAuthStore } from "../../../auth/stores/useAuthStore.hook"



export const LessonsPage = () => {
  const { user } = useAuthStore();
  const { getLeaderBoard, getChapters } = useLessons();
  const [users, setUsers] = useState<User[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const {courseid} = useParams()
  

  async function fetchLeaderboard() {
    const response = await getLeaderBoard();
    setUsers(response.data);
  }

  async function fetchLessons() {
    const response = await getChapters()
    setChapters(response.data)
  }

  useEffect(() => {
    fetchLeaderboard()
    fetchLessons()
  }, [])

  return <AppLayout >
    <div className={styles.lessonContent}>
    <div className={styles.chaptersCardsBar} >
      <LeadershipCard users={users} />
      <NextAchievementCard />
      <StatisticsCard courseid={parseInt(courseid as string)}/>
    </div>

    <div className={styles.chaptersWrapper}>
      {user && 
      <ChaptersCard userid={user.id} courseid={parseInt(courseid as string)}chapters={chapters}/>
      }
    </div>
    </div>
  </AppLayout>
}