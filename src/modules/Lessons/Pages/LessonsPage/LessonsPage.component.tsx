
import { useEffect, useState } from "react"
import { AppLayout } from "../../../../shared/components/AppLayout"
import { LeadershipCard } from "../../components/LeadershipCard/LeadershipCard.component"
import styles from "./LessonsPage.module.css"
import { Lesson, User, useLessons } from "../../api"
//import { useAuthStore } from "../../../auth/stores/useAuthStore.hook"
import { StatisticsCard } from "../../components/StatisticsCard/StatisticsCard.component"
import { NextAchievementCard } from "../../components/NextAchievementCard"
import { LessonsCard } from "../../components/LessonsCard/LessonsCard.component" 

export const LessonsPage = () => {


  //const { token } = useAuthStore()
  //console.log(token);

  //const { user } = useAuthStore();
  //console.log(user);
  //const {getStatistics} = useLessons();

  const { getLeaderBoard, getLessons } = useLessons();
  const [users, setUsers] = useState<User[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);

  async function fetchLeaderboard() {
    const response = await getLeaderBoard();
    setUsers(response.data);
  }

  async function fetchLessons() {
    const response = await getLessons()
    setLessons(response.data)
  }

  useEffect(() => {
    fetchLeaderboard()
    fetchLessons()
  }, [])

  return <AppLayout>
    <div className={styles.lessonsCardsBar} >
      <LeadershipCard users={users} />
      <NextAchievementCard />
      <StatisticsCard />
    </div>

    <div className={styles.lessonsWrapper}>
      <LessonsCard lessons={lessons}/>
    </div>
  </AppLayout>
}