
import { useEffect, useState } from "react"
import { AppLayout } from "../../../shared/components/AppLayout"
import { LeadershipCard } from "../components/LeadershipCard/LeadershipCard.component"
import styles from "./LessonsPage.module.css"
import { User, useLessons } from "../api"
import { useAuthStore } from "../../auth/stores/useAuthStore.hook"
import { StatisticsCard } from "../components/StatisticsCard/StatisticsCard.component"
import { NextAchievementCard } from "../components/NextAchievementCard"
import { LessonsCard } from "../components/LessonsCard/LessonsCard.component"

export const LessonsPage = () => {

  
  //const { token } = useAuthStore()
  //console.log(token);

  const {user} = useAuthStore();
  //console.log(user);
  //const {getStatistics} = useLessons();
  
  const {getLeaderBoard} = useLessons();
  const [users, setUsers] = useState<User[]>([]);
  
  async function fetchLeaderboard () {
    const response = await getLeaderBoard();
    setUsers(response.data);
  }
  
   useEffect(() => {
     fetchLeaderboard()
   }, [])
  
  return <AppLayout>
    <div className={styles.lessonsCardsBar} >
      <LeadershipCard users={users} />
      <NextAchievementCard/>
      <StatisticsCard />
    </div>

    <div className={styles.lessonsWrapper}>
      <LessonsCard/>
    </div>
  </AppLayout>
}