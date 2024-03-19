
import { useEffect, useState } from "react"
import { AppLayout } from "../../../shared/components/AppLayout"
import { LeadershipCard } from "../components/LeadershipCard/LeadershipCard.component"
import styles from "./LessonsPage.module.css"
import { User, useLessons } from "../api"

export const LessonsPage = () => {
  
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
    </div>


  </AppLayout>
}