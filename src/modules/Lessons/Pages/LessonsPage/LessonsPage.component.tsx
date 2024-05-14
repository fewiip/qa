
import { useEffect, useState } from "react"
import { AppLayout } from "../../../../shared/components/AppLayout"
import { LeadershipCard } from "../../components/LeadershipCard/LeadershipCard.component"
import styles from "./LessonsPage.module.css"
import { Chapter, User, useLessons } from "../../api"
//import { useAuthStore } from "../../../auth/stores/useAuthStore.hook"
import { StatisticsCard } from "../../components/StatisticsCard/StatisticsCard.component"
import { NextAchievementCard } from "../../components/NextAchievementCard"
import { ChaptersCard } from "../../components/LessonsCard/LessonsCard.component"



export const LessonsPage = () => {

  const { getLeaderBoard, getChapters } = useLessons();
  const [users, setUsers] = useState<User[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);

  

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
      <StatisticsCard />
    </div>

    <div className={styles.chaptersWrapper}>
      <ChaptersCard chapters={chapters}/>
    </div>
    </div>
  </AppLayout>
}